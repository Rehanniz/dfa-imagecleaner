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

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RSG Items.lua Image Cleaner</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #1a1a1a;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .banner {
            width: 1200px;
            height: 630px;
            background: linear-gradient(135deg, #2c1810 0%, #8B4513 25%, #CD853F  50%, #DEB887 75%, #F4A460 100%);
            border-radius: 20px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 2px, transparent 2px),
                radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 2px, transparent 2px),
                radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 50px 50px, 30px 30px, 20px 20px;
        }

        .content {
            position: relative;
            z-index: 2;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 40px;
        }

        .icon-container {
            margin-bottom: 30px;
            position: relative;
        }

        .main-icon {
            font-size: 120px;
            color: #fff;
            text-shadow: 0 4px 8px rgba(0,0,0,0.3);
            animation: pulse 2s ease-in-out infinite;
        }

        .lua-badge {
            position: absolute;
            top: -10px;
            right: -10px;
            background: #000080;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        .title {
            font-size: 48px;
            font-weight: 900;
            color: #fff;
            margin-bottom: 15px;
            text-shadow: 0 4px 8px rgba(0,0,0,0.4);
            letter-spacing: -1px;
        }

        .subtitle {
            font-size: 24px;
            color: #f0f0f0;
            margin-bottom: 30px;
            font-weight: 300;
            opacity: 0.9;
        }

        .features {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        .feature {
            background: rgba(255,255,255,0.1);
            padding: 15px 25px;
            border-radius: 25px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            font-weight: 600;
            font-size: 16px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            transition: transform 0.3s ease;
        }

        .feature:hover {
            transform: translateY(-2px);
        }

        .rsg-badge {
            position: absolute;
            top: 30px;
            right: 30px;
            background: #dc3545;
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: bold;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }

        .version-badge {
            position: absolute;
            bottom: 30px;
            left: 30px;
            background: rgba(0,0,0,0.5);
            color: white;
            padding: 8px 15px;
            border-radius: 15px;
            font-size: 12px;
            backdrop-filter: blur(10px);
        }

        .code-snippet {
            position: absolute;
            bottom: 30px;
            right: 30px;
            background: rgba(0,0,0,0.7);
            color: #00ff00;
            padding: 10px 15px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0,255,0,0.3);
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        .floating-elements {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
        }

        .floating-icon {
            position: absolute;
            opacity: 0.1;
            animation: float 6s ease-in-out infinite;
        }

        .floating-icon:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
        .floating-icon:nth-child(2) { top: 20%; right: 15%; animation-delay: 1s; }
        .floating-icon:nth-child(3) { bottom: 20%; left: 15%; animation-delay: 2s; }
        .floating-icon:nth-child(4) { bottom: 30%; right: 20%; animation-delay: 3s; }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(5deg); }
            66% { transform: translateY(-10px) rotate(-5deg); }
        }
    </style>
</head>
<body>
    <div class="banner">
        <div class="pattern"></div>
        
        <div class="floating-elements">
            <div class="floating-icon" style="font-size: 60px;">🖼️</div>
            <div class="floating-icon" style="font-size: 50px;">📁</div>
            <div class="floating-icon" style="font-size: 40px;">⚙️</div>
            <div class="floating-icon" style="font-size: 45px;">🗑️</div>
        </div>

        <div class="rsg-badge">RSG Framework</div>
        <div class="version-badge">Node.js Tool</div>
        <div class="code-snippet">node cleaner.js</div>

        <div class="content">
            <div class="icon-container">
                <div class="main-icon">🧹</div>
                <div class="lua-badge">.lua</div>
            </div>

            <h1 class="title">Items.lua Image Cleaner</h1>
            <p class="subtitle">Automatically clean unused item images from your RSG resources</p>

            <div class="features">
                <div class="feature">✅ Parse items.lua</div>
                <div class="feature">🗑️ Remove unused images</div>
                <div class="feature">⚡ Zero config</div>
                <div class="feature">🛡️ 100% Safe</div>
            </div>
        </div>
    </div>

    <script>
        // Add some interactive sparkle effect
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            sparkle.style.fontSize = Math.random() * 20 + 10 + 'px';
            sparkle.style.opacity = '0.7';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.animation = 'sparkleFloat 3s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 3000);
        }

        // Add sparkles periodically
        setInterval(createSparkle, 2000);

        // CSS for sparkle animation
        const sparkleStyle = document.createElement('style');
        sparkleStyle.textContent = `
            @keyframes sparkleFloat {
                0% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
                100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(sparkleStyle);
    </script>
</body>
</html>


<div align="center">

**Made with ❤️ for the RSG Framework Community**

*Script development assisted by Claude (Anthropic)*
</div>
