# 🧹 DFA Image Cleaner

A powerful Node.js utility specifically designed for RSG Framework developers to automatically clean up unused item images by parsing your `items.lua` file and removing orphaned image files.

## 🎯 Why Use This Tool?

When developing RSG resources, you often accumulate unused item images over time. This tool:
- ✅ **Parses your items.lua directly** - Reads `RSGShared.Items` table automatically
- ✅ **Removes orphaned images** - Deletes images not referenced in your items.lua
- ✅ **Keeps your resources clean** - Reduces server resource size and loading times
- ✅ **100% Safe** - Only processes image files, detailed logging before deletion
- ✅ **Zero configuration** - Works out of the box with standard RSG structure

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- RSG Framework with `items.lua` file
- Images stored in `imgs/` folder

### Installation & Usage

1. **Download the script**
   ```bash
   git clone https://github.com/rehanniz/dfa-imagecleaner.git
   cd dfa-imagecleaner
   ```

2. **Place in your resource folder**
   ```
   dfa-imagecleaner/
   ├── imgs/           # Your item images
   ├── items.lua       # Your RSG items file
   └── cleaner.js      # This script
   ```

3. **Run the cleaner**
   ```bash
   node cleaner.js
   ```

4. **Review and confirm** - The script shows exactly what will be deleted before doing it!

## 📋 How It Works

The script intelligently parses your `items.lua` file:

```lua
RSGShared.Items = {
    compass = { 
        name = 'compass', 
        label = 'Compass', 
        image = 'compass.png',  -- ✅ Will keep compass.png
        -- ... other properties
    },
    -- ... more items
}
```

**Process:**
1. 🔍 Scans `items.lua` for all `image = 'filename.png'` entries
2. 📁 Lists all image files in your `imgs/` folder  
3. ⚖️ Compares and identifies orphaned images
4. 🗑️ Removes images not referenced in your items.lua
5. 📊 Provides detailed summary of actions taken

## 🛡️ Safety Features

- **Dry-run logging** - See exactly what will be deleted before it happens
- **Image-only processing** - Only touches image files (.png, .jpg, .gif, etc.)
- **Directory preservation** - Skips subdirectories and non-image files
- **Error handling** - Comprehensive validation and error reporting
- **Backup recommendation** - Always suggests backing up before running

## 📊 Example Output

```
Starting RSG items.lua file processing...
Extracted 45 image names from ./items.lua
Found 67 files in folder

✅ KEEPING: compass.png (referenced in items.lua)
✅ KEEPING: cash.png (referenced in items.lua)
❌ DELETING: old_unused_item.png (not referenced in items.lua)

📊 SUMMARY:
Files kept: 45
Files deleted: 22
```

## ⚙️ Configuration

Easy to customize for different folder structures:

```javascript
// Edit these paths in the script
const folderPath = './imgs/';        // Your images folder
const itemsLuaPath = './items.lua';  // Your items.lua file
```

## 🎮 Perfect for RSG Framework

**Ideal for:**
- 📦 Resource optimization before release
- 🧹 Cleaning up after item removal/updates  
- 📉 Reducing server resource bloat
- ⚡ Faster resource loading times
- 🎯 Maintaining organized inventories

**Works with:**
- RSG-Core items.lua structure
- Custom RSG resource items
- Any RSGShared.Items format
- Standard image formats (PNG, JPG, GIF, WebP, etc.)

## 🤝 Contributing

Contributions welcome! Please feel free to:
- 🐛 Report bugs
- 💡 Suggest features  
- 🔧 Submit pull requests
- ⭐ Star the repo if it helps you!

## 📄 License

MIT License - Free to use in your RSG projects!

## ⚠️ Important Notes

- **Always backup your images** before running the script
- Review the console output before confirming any deletions
- The script is case-insensitive for better compatibility
- Only processes files, skips directories automatically

---

<div align="center">

**Made with ❤️ for the RSG Framework Community**

*Script development assisted by Claude (Anthropic)*
</div>
