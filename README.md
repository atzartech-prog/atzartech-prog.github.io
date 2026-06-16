# 🚀 Atzartech Hub | Welcome Portal

A premium, modern, and high-performance landing page/welcome portal designed for [atzartech-prog.github.io](https://atzartech-prog.github.io/). This portal centralizes access to your web tools, notes, apps, and repositories using an elegant, glassmorphic layout.

---

## ✨ Features

*   **🌓 Persisted Theme Toggle**: Switch seamlessly between Dark Mode and Light Mode. The portal saves the user's preference using browser `localStorage` so it persists across page reloads.
*   **🔍 Live Search Filter**: Filter the application cards in real-time as you type. Searches match titles, descriptions, categories, and paths.
*   **🏷️ Dynamic Categories**: Filter buttons (All, Utilities, Apps, Personal, Reference) are generated automatically based on categories declared in your JavaScript dataset.
*   **💎 Glassmorphic Styling**: Elegant layout featuring semi-transparent cards with backdrop blur filters, smooth scale transitions, and custom color-coded glowing drop-shadows on hover.
*   **📱 Fully Responsive**: Tailored grid layout that scales beautifully from mobile viewports to ultra-wide desktop monitors.
*   **🎨 Lucide Icons Integration**: Powered by dynamic crisp SVG vectors loaded via Lucide CDN, making icons lightweight and easy to swap.

---

## 📂 File Structure

```bash
homepage/
├── index.html     # HTML5 structure (Header, Search box, dynamic Grid, and Help modal)
├── style.css      # Custom styling, design tokens, light mode defaults, and dark mode overrides
├── script.js      # App configurations, links database, search & category filtering logic
└── README.md      # Documentation and startup guide
```

---

## 🛠️ How to Customize

All page links and settings are managed directly inside the code for easy maintenance.

### 1. Changing the Base URL
By default, the pages redirect to `https://atzartech-prog.github.io/<path>`. If you wish to host it on another domain or point to a different URL, open `script.js` and modify the `BASE_URL` constant:
```javascript
const BASE_URL = 'https://atzartech-prog.github.io/';
```

### 2. Adding or Editing Pages
To insert new cards or edit current listings, modify the `PAGES_DATA` array inside `script.js`. Each entry is structured as follows:
```javascript
{
    title: "App Name",
    path: "repo-name/",           // combined with BASE_URL -> https://domain.com/repo-name/
    // OR absolute: "https://xyz.com", // use this for external domains
    description: "Write a short summary of the app's functionality.",
    icon: "lucide-icon-name",     // Any icon name from https://lucide.dev/icons
    category: "Utility",          // e.g., 'Utility', 'App', 'Personal', 'Reference'
    accentColor: "indigo"         // Choose from: 'indigo', 'violet', 'cyan', 'emerald', 'amber', 'rose', 'blue'
}
```

*Note: If you add an app with a completely new category (e.g. `"Education"`), a new filter button will automatically render in the filter section without writing any HTML or CSS!*

### 3. Icon Setup
We use [Lucide Icons](https://lucide.dev/icons). Browse their library and input the lowercase hyphenated name in the `icon` field of your page object (e.g., `file-text`, `rocket`, `graduation-cap`, `sprout`).

---

## 🚀 How to Run & Deploy

### Run Locally
Simply locate the directory in your explorer and double-click **`index.html`** to open it instantly in any modern web browser. No server configuration or installation is required!

### Host on GitHub Pages
1. Push the files in the `homepage/` directory to a GitHub repository (e.g., named `atzartech-prog.github.io` or another repo name).
2. Enable **GitHub Pages** in your repository settings under the `Pages` tab.
3. Your landing portal will go live instantly at your configured address.

---

## 💡 Note
*   The terminal logo icon in the header has a subtle easter egg hidden behind it.

