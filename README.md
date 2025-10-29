# Markdown Page Exporter

[ [English](README.md) | [Italiano](README.it.md) ]

WordPress plugin to export your posts to Markdown format with a single click.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![WordPress](https://img.shields.io/badge/wordpress-5.0%2B-green.svg)
![PHP](https://img.shields.io/badge/php-7.0%2B-purple.svg)
![License](https://img.shields.io/badge/license-GPL%20v2-red.svg)

## 📋 Description

Markdown Page Exporter is a lightweight and powerful WordPress plugin that allows you to export your articles to Markdown format with a single click.
Perfect for:

- 🔄 Migrating content to other platforms that support Markdown
- 📝 Creating text backups of your posts, without HTML dependencies and with a format that will last over time, independent of WordPress
- 🤖 Feeding artificial intelligence systems (ideal format for LLMs like ChatGPT, Claude, etc.)
- 📚 Archiving content in standard and portable format. Readable by any text editor (Notepad, VS Code, Obsidian, etc.)
- ✍️ Reworking your articles in Markdown editors

## ✨ Features

### Main Features

- **Quick Copy**: Single click on the main button to copy Markdown to clipboard
- **Preview Display**: Dropdown menu to view Markdown before copying
- **Professional Conversion**: Uses Turndown 7.2.2 library (the most used and reliable for HTML→Markdown)
- **Accurate Title**: Uses official WordPress API to always get the correct post title
- **Universal Compatibility**: Works with any WordPress theme
- **Zero Configuration**: Install, activate, and it works immediately. No configuration. No database.

### Supported Elements

The plugin uses [Turndown](https://github.com/mixmark-io/turndown), the most reliable JavaScript library for converting HTML to Markdown.
Supports:

- ✅ Headings (H1 to H6)
- ✅ Bold and italic
- ✅ Links (with optional titles)
- ✅ Images (with alt text)
- ✅ Ordered and unordered lists (including nested)
- ✅ Complete tables
- ✅ Blockquotes (including nested)
- ✅ Inline code and code blocks
- ✅ Horizontal rules
- ✅ Paragraphs and line breaks

### Design and UX

Minimalist Design: discreet button in the top right of the post that doesn't distract.

- 🎨 **Modern dropdown menu**: Clean and professional interface
- ⚡ **Quick Copy**: Main action with a single click
- 📱 **Responsive**: Perfect on desktop, tablet, and mobile
- 🎯 **Optimal positioning**: Above content, aligned right
- 💬 **Visual feedback**: Toast notifications to confirm actions
- 🖱️ **Dual click area**: Main button (copy) + arrow (menu)

## 🚀 Installation

### Method 1: ZIP Upload (Recommended)

1. Download `markdown-page-exporter.zip`
2. Go to **WordPress Admin** > **Plugins** > **Add New**
3. Click **"Upload Plugin"**
4. Select the ZIP file
5. Click **"Install Now"**
6. Click **"Activate"**
7. ✅ Done!

### Method 2: FTP

1. Extract `markdown-page-exporter.zip`
2. Upload the `markdown-page-exporter` folder to `/wp-content/plugins/`
3. Go to **WordPress Admin** > **Plugins**
4. Activate **"Markdown Page Exporter Simple"**

## 📖 Usage

### Quick Copy (Quick Use)

1. Open a post on your site
2. You'll find the **"Copy Markdown"** button in the top right
3. **Click the button** → Markdown copied to clipboard! ✅
4. Paste wherever you want (Ctrl+V / Cmd+V)

### Complete Menu

1. **Click the arrow (▼)** → Menu opens with:
   - 📋 **Copy Markdown** (copy to clipboard)
   - 👁️ **View Markdown** (show preview in a window)

2. In the preview window you can:
   - Read the formatted Markdown
   - Copy it with the "Copy" button

## 🎯 How It Works

### Plugin Architecture

```
┌─────────────────────────────────────┐
│  WordPress Post (HTML)              │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  PHP Plugin (Inserts buttons)       │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  JavaScript (Collects content)      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Turndown Library (Converts)        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Markdown Output                     │
└─────────────────────────────────────┘
```

### Technical Details

1. **PHP (Backend)**:
   - Inserts buttons into post content via `the_content` filter
   - Passes title and raw content to JavaScript with `wp_localize_script`
   - Uses official WordPress APIs (`get_the_title()`, `get_the_content()`)

2. **JavaScript (Frontend)**:
   - Searches for content on page with multiple selectors (universal compatibility)
   - Automatic fallback to raw content if DOM not found
   - Handles click events on buttons
   - Copies to clipboard with `navigator.clipboard` (with fallback for old browsers)

3. **Turndown (Conversion)**:
   - Standard JavaScript library for HTML→Markdown
   - Version 7.2.2 (latest stable)
   - Loaded from unpkg CDN
   - Optimized configuration for WordPress

## 🛠️ Requirements

### Minimum

- **WordPress**: 5.0 or higher
- **PHP**: 7.0 or higher
- **Browser**: Chrome, Firefox, Safari, Edge (recent versions)
- **Internet Connection**: Required to load Turndown from CDN

### Recommended

- **WordPress**: 6.0+
- **PHP**: 8.0+
- **HTTPS**: For complete clipboard functionality

## 📁 File Structure

### GitHub Repository
```
markdown-page-exporter/
├── markdown-page-exporter.php    # Main plugin (PHP)
├── style.css                     # Button and UI styles
├── script.js                     # JavaScript logic
├── README.md                     # Documentation (GitHub only)
└── README.it.md                  # Italian documentation
```

### WordPress Plugin ZIP (for installation)
```
markdown-page-exporter/
├── markdown-page-exporter.php    # Main plugin file
├── style.css                     # Styles
└── script.js                     # JavaScript
```

**Note**: The README files are for GitHub documentation only and are not included in the installable ZIP package.

## 🎯 Design Philosophy

### Functional Minimalism

This plugin does **one thing** and does it **well**: convert WordPress posts to Markdown. No control panels, no redundant options, no feature bloat.

### Zero Database

The plugin doesn't write anything to the database. It doesn't create tables, doesn't save preferences, leaves no traces. Activate → it works. Deactivate → it's gone.

### External Libraries via CDN

Turndown (the conversion library) is loaded from [unpkg.com](https://unpkg.com/turndown@7.2.2/dist/turndown.js) instead of being included in the plugin.

**Why this choice?**

1. **Reduced size**: The plugin weighs ~20 KB instead of ~50 KB
2. **Automatic updates**: Bug fixes and improvements to Turndown arrive without updating the plugin
3. **Global CDN**: Turndown is served from fast servers worldwide
4. **Shared cache**: If other sites use Turndown from unpkg, the browser already has it in cache

**Considerations:**

- Requires internet connection (but if you're reading a WordPress post, you already have one)
- External dependency (but from a reliable CDN used by millions of sites)

If you prefer a self-hosted version, simply modify the link in `markdown-page-exporter.php`.

### Universal Compatibility

The plugin uses multiple fallback techniques to find content in any theme:

1. Searches with 8 different CSS selectors in the DOM
2. If nothing found, uses raw content from PHP
3. Always works, with any theme

## 📊 Performance

- **Plugin size**: ~20 KB (3 core files)
- **External libraries**: Turndown (~30 KB from CDN)
- **Total loading**: ~50 KB
- **Performance impact**: Minimal (loads only on single posts)
- **Database queries**: 0 (doesn't use database)

## 🎨 Customization

### Changing Colors

Edit `style.css`:

```css
/* Main button color */
.md-btn-main {
    background: white;       /* Background color */
    border: 1px solid #ddd;  /* Border color */
}

/* Menu hover color */
.md-dropdown-item:hover {
    background: #f5f5f5;     /* Hover color */
}
```

### Changing Position

Edit `style.css`:

```css
/* Button on left instead of right */
.md-exporter-buttons {
    justify-content: flex-start;  /* Instead of flex-end */
}
```

### Turndown Options

Edit `script.js` (line ~6):

```javascript
turndown = new TurndownService({
    headingStyle: 'atx',         // or 'setext'
    codeBlockStyle: 'fenced',    // or 'indented'
    bulletListMarker: '*'        // or '-' or '+'
});
```

### Changing Turndown Version

Edit `markdown-page-exporter.php`:

```php
wp_enqueue_script(
    'turndown-lib',
    'https://unpkg.com/turndown@7.2.2/dist/turndown.js',  // ← Change here
    array(),
    '7.2.2',
    true
);
```

### Using Self-Hosted Turndown

1. Download Turndown from [GitHub](https://github.com/mixmark-io/turndown)
2. Put `turndown.js` in the plugin folder
3. Modify the path:

```php
wp_enqueue_script(
    'turndown-lib',
    plugins_url('turndown.js', __FILE__),  // ← Local path
    array(),
    '7.2.2',
    true
);
```

### Modifying Markdown Style

Edit `script.js` (line ~6):

```javascript
turndown = new TurndownService({
    headingStyle: 'atx',         // 'atx' (#) or 'setext' (===)
    codeBlockStyle: 'fenced',    // 'fenced' (```) or 'indented' (    )
    bulletListMarker: '*'        // '*', '-', or '+'
});
```

## 📸 Screenshots

### Quick Copy Button
![Quick Copy Button](screenshot-1.png)
*Single click to copy Markdown*

### Dropdown Menu
![Dropdown Menu](screenshot-2.png)
*Click the arrow to access all options*

### Preview Window
![Preview Modal](screenshot-3.png)
*View Markdown before copying*

### Mobile Responsive
![Mobile View](screenshot-4.png)
*Perfectly usable on smartphones and tablets*

## ❓ FAQ

### Does it work with my theme?

Yes. The plugin has been tested with dozens of themes and uses fallback techniques to ensure universal compatibility.

### Does it work with Gutenberg / Elementor / Other page builders?

Yes. The plugin converts any HTML to Markdown, regardless of how it was created.

### Do I need to configure anything?

No. Install, activate, it works.

### Can I export pages or custom post types?

Currently only standard "posts". Support for other content types may come in the future.

### Does the plugin save anything to the database?

No. Zero write queries. Completely stateless.

### Can I customize the button appearance?

Yes. Edit `style.css` as you like. The code is clean and commented.

### What if I don't have internet connection?

Turndown is loaded from CDN, so connection is needed. If you want a self-hosted version, download Turndown and modify the path in `markdown-page-exporter.php`.

### Do you support images?

Yes. Images are converted to Markdown format `![alt text](url)`. The image file stays on the server, the Markdown contains only the link.

### Does Markdown include post metadata?

Currently only title and content. Date, author, categories could be added in the future.

## 🔍 Troubleshooting

### Buttons don't appear

**Possible causes:**
- You're not on a single post (only works on `is_single()`)
- The post is not of type "post" (doesn't work on pages or custom post types)
- There's a JavaScript conflict (check browser console with F12)

**Solution:**
1. Verify you're on a single post (not homepage, not archives)
2. Open browser console (F12) and look for errors in red
3. Temporarily deactivate other plugins to find conflicts

### Markdown contains only the title

**Cause:** JavaScript doesn't find post content in DOM

**Solution:**
The plugin has an automatic fallback that uses raw content from PHP. If you only see the title:
1. Open browser console (F12)
2. Look for messages like "Content not found"
3. Report the theme you're using so I can add support

### Copy doesn't work

**Cause:** Clipboard API blocked (HTTPS required on some browsers)

**Solution:**
1. Use HTTPS instead of HTTP
2. The plugin has an automatic fallback with `document.execCommand`
3. Try with a different browser

### Menu doesn't open

**Cause:** JavaScript conflict with other plugins/themes

**Solution:**
1. Open console (F12) and look for errors
2. Temporarily deactivate other plugins
3. Reload with Ctrl+F5 to clear cache

## 🤝 Compatibility

### Tested Themes

✅ Twenty Twenty-Four
✅ Astra
✅ GeneratePress
✅ OceanWP
✅ Neve
✅ Kadence

### Page Builders

✅ Gutenberg (Block Editor)
⚠️ Elementor (works, but may require CSS customization)
⚠️ Divi (works, but may require CSS customization)

### Plugins

✅ Yoast SEO
✅ Rank Math
✅ WooCommerce (doesn't interfere)
✅ Contact Form 7
✅ Jetpack

## 📊 Performance

- **Plugin size**: ~20 KB
- **External libraries**: Turndown (~30 KB from CDN)
- **Loading**: ~50 KB total
- **Performance impact**: Minimal (loads only on single posts)
- **Database queries**: 0 (doesn't use database)

## 🔐 Security

- ✅ No data saved to database
- ✅ Uses standard WordPress functions (`wp_enqueue_script`, `plugins_url`)
- ✅ Validation with `is_single()`, `get_post_type()`
- ✅ Doesn't execute user-provided server-side code
- ✅ Loads libraries from reliable CDN (unpkg.com)

## 📝 Changelog

### v1.0.0 (2025-10-28)

**First stable release! 🎉**

- ✨ Quick Copy: copy with single click
- ✨ Modern dropdown menu
- ✨ Accurate title with WordPress API
- ✨ Conversion with Turndown 7.2.2
- ✨ Optimized positioning above content
- ✨ Responsive design
- ✨ Universal compatibility with WordPress themes
- ✨ Automatic fallback for content
- ✨ Toast notifications
- ✨ Zero configuration

## 📄 License

This plugin is distributed under GPL v2 or later license.

This plugin is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 2 of the license or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY, without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

## 👨‍💻 Author

**Antonio Troise (Levysoft.it)**

Developed with ❤️ to simplify exporting WordPress content to Markdown and make WordPress more markdown-friendly.

## 🌟 Support

If the plugin is useful to you:
- ⭐ Leave a review
- 🐛 Report bugs
- 💡 Suggest new features
- 🤝 Contribute to the code

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔮 Future Roadmap

Possible features for upcoming versions:

- [ ] Custom post types support
- [ ] Direct .md file download
- [ ] Batch export (export all posts)
- [ ] Shortcode for manual positioning
- [ ] Admin panel for configuration
- [ ] Support for post metadata (date, author, categories)
- [ ] Automatic export on save
- [ ] Integration with cloud services (Dropbox, Google Drive)

**Philosophy:** Add features only if truly useful, keeping the plugin lightweight and simple.

## 🙏 Credits

- [Turndown](https://github.com/mixmark-io/turndown) by Dom Christie: the library that makes conversion possible
- Icons from [Feather Icons](https://feathericons.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/): UI inspiration for the copy button design
- WordPress community for feedback and testing

## 📚 Useful Resources

- **Turndown Library**: https://github.com/mixmark-io/turndown
- **WordPress Plugin Handbook**: https://developer.wordpress.org/plugins/
- **Markdown Guide**: https://www.markdownguide.org/

## 🔗 Useful Links

- [Plugin on WordPress.org](https://wordpress.org/plugins/markdown-page-exporter/) *(coming soon)*
- [Report a bug](https://github.com/yourusername/markdown-page-exporter/issues)
- [Turndown Documentation](https://github.com/mixmark-io/turndown)
- [Markdown Guide](https://www.markdownguide.org/)

---
**If this plugin is useful to you, leave a ⭐ on GitHub or a review on WordPress.org!**

**Thank you for using Markdown Page Exporter!** 🚀
