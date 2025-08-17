const fs = require('fs');
const path = require('path');

// Function to read and parse items from items.lua file
const readItemsFromLua = (filePath) => {
  return new Promise((resolve, reject) => {
    // Check if file exists first
    if (!fs.existsSync(filePath)) {
      return reject(new Error(`Items.lua file does not exist: ${filePath}`));
    }
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      
      const items = [];
      
      // Regular expression to match image = 'filename.png' or image = "filename.png"
      const imageRegex = /image\s*=\s*['"]([^'"]+)['"][,\s]/g;
      
      let match;
      while ((match = imageRegex.exec(data)) !== null) {
        const imageName = match[1];
        if (imageName && !items.includes(imageName)) {
          items.push(imageName);
        }
      }
      
      console.log(`Extracted ${items.length} image names from ${filePath}`);
      resolve(items);
    });
  });
};

// Function to remove a file
const removeFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Failed to remove file: ${filePath}`, err);
    } else {
      // console.log(`Removed file: ${filePath}`);
    }
  });
};

// Function to check if the file is an image (based on common image extensions)
const isImageFile = (fileName) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
  return imageExtensions.includes(path.extname(fileName).toLowerCase());
};

// Main function to process the folder and remove unwanted files
const processFiles = async (folderPath, itemsLuaPath) => {
  try {
    // Check if folder exists
    const resolvedFolderPath = path.resolve(folderPath);
    console.log(`Checking folder: ${resolvedFolderPath}`);
    
    if (!fs.existsSync(resolvedFolderPath)) {
      throw new Error(`Folder does not exist: ${resolvedFolderPath}`);
    }

    // Check if it's actually a directory
    const stats = fs.statSync(resolvedFolderPath);
    if (!stats.isDirectory()) {
      throw new Error(`Path is not a directory: ${resolvedFolderPath}`);
    }

    // Read the image names from the items.lua file
    const imageNames = await readItemsFromLua(itemsLuaPath);
    console.log(`Image names loaded from items.lua: ${imageNames.length} images found.`);
    console.log('Image list:', imageNames);

    // Read the files in the folder (using promises for better error handling)
    const files = await new Promise((resolve, reject) => {
      fs.readdir(resolvedFolderPath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });

    console.log(`Found ${files.length} files in folder`);
    console.log('Files in the folder:', files);

    if (files.length === 0) {
      console.log('No files found in the directory');
      return;
    }

    let keptFiles = 0;
    let deletedFiles = 0;

    files.forEach(file => {
      const filePath = path.join(resolvedFolderPath, file);
      
      // Skip directories
      const fileStats = fs.statSync(filePath);
      if (fileStats.isDirectory()) {
        console.log(`Skipping directory: ${filePath}`);
        return;
      }

      // Only process image files
      if (!isImageFile(file)) {
        console.log(`Skipping non-image file: ${file}`);
        return;
      }

      // Debug: Log the file being checked
      const fileNameLower = file.toLowerCase();
      console.log(`\nChecking image file: ${file}`);
      console.log(`Full path: ${filePath}`);

      // Check if the image file matches any image name from items.lua
      const imageMatch = imageNames.some(imageName => {
        return imageName.toLowerCase() === fileNameLower;
      });

      console.log(`Image match found: ${imageMatch ? 'YES' : 'NO'}`);
      if (imageMatch) {
        const matchedImage = imageNames.find(img => img.toLowerCase() === fileNameLower);
        console.log(`Matched against: ${matchedImage}`);
      }

      // Decide whether to delete the file
      if (!imageMatch) {
        console.log(`❌ DELETING: ${file} (not referenced in items.lua)`);
        removeFile(filePath);
        deletedFiles++;
      } else {
        console.log(`✅ KEEPING: ${file} (referenced in items.lua)`);
        keptFiles++;
      }
    });

    console.log(`\n📊 SUMMARY:`);
    console.log(`Files kept: ${keptFiles}`);
    console.log(`Files deleted: ${deletedFiles}`);

  } catch (err) {
    console.error('Error processing files:', err.message);
  }
};

// Set your folder path and items.lua file path here
const folderPath = './imgs/'; // Your images folder
const itemsLuaPath = './items.lua'; // Path to your items.lua file

// Add some validation before running
console.log('Starting RSGCore items.lua file processing...');
console.log(`Images folder path: ${path.resolve(folderPath)}`);
console.log(`Items.lua file path: ${path.resolve(itemsLuaPath)}`);

// Run the process
processFiles(folderPath, itemsLuaPath);