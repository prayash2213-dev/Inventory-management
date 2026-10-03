# InventoryPro

A clean, responsive stock and inventory management dashboard built with vanilla JavaScript, HTML5, and Tailwind CSS. It runs entirely in your web browser with zero build steps or server setup required.

---

## What is InventoryPro?

Managing inventory should be straightforward, not frustrating. InventoryPro was built to give small businesses, warehouse managers, and store owners an intuitive interface to keep track of their products, stock levels, suppliers, and inventory value in real time.

All your data is saved automatically to your browser local storage (`localStorage`), so your catalog stays intact even after closing the browser tab or refreshing the page.

---

## Key Features

- **Live Summary Metrics**
  - Instant overview cards for Total Products, Low Stock items, Active Categories, and Total Stock Value (calculated in Indian Rupees, ₹).
  - Cards update dynamically the moment you add, edit, or delete any product.

- **Automated Stock Status Logic**
  - **In Stock**: More than 10 units in inventory.
  - **Low Stock**: Between 1 and 10 units remaining (triggers visual warning badges).
  - **Out of Stock**: Exactly 0 units available.

- **Visual Product Catalog**
  - High quality product photos instead of generic category icons.
  - Built-in photo uploader for new products (supports PNG, JPG, and WEBP with instant preview).
  - One-click SKU copy button that copies the product code straight to your clipboard.
  - Interactive table sorting by Product Name, Quantity, and Price.

- **Fast Search and Filtering**
  - Search as you type across product names and SKU codes.
  - Quick filter tabs: All, In Stock, Low Stock, and Out of Stock with item count badges.
  - Dropdown filter by product category (Laptops, Monitors, Audio, Furniture, etc.).

- **Slide-Over Add and Edit Drawer**
  - Smooth slide-out panel for adding or updating inventory.
  - Field validation prevents duplicate SKU codes and negative numbers.
  - Pre-loads existing product data when editing.

- **Safe Delete Modal**
  - Dedicated confirmation prompt showing the specific product name and SKU before removal to prevent accidental deletions.

- **Responsive Collapsible Sidebar**
  - Collapse the navigation bar into compact icon mode with 1 click for maximum table viewing space.

---

## Project Structure

```text
Invenrory-Management/
├── index.html              # Main single-page application structure
├── README.md               # Project documentation
└── assets/
    ├── css/
    │   └── style.css       # Custom scrollbars and typography imports
    └── js/
        └── script.js       # App logic, state management, and localStorage
```

---

## How to Run the App

No `npm install`, dependencies, or backend server required.

### Option 1: Direct File Open
Double-click `index.html` or drag it into any modern web browser (Google Chrome, Firefox, Microsoft Edge, Safari).

### Option 2: Live Server (Recommended for local dev)
If you use Visual Studio Code:
1. Install the **Live Server** extension.
2. Right-click `index.html` and choose **Open with Live Server**.
3. The dashboard opens at `http://127.0.0.1:5500`.

---

## Design and Color Palette

The user interface uses a curated, high-contrast palette from Coolors:

- **Deep Teal** (`#16697a` / `#0f4c5c`): Primary headers and active navigation.
- **Pacific Cyan** (`#489fb5`): Accent badges and interactive highlights.
- **Ice Blue** (`#82c0cc` / `#d8e2dc`): Subtle borders and background layers.
- **Alabaster Canvas** (`#ede7e3` / `#f8f7f5`): Light canvas for clear reading contrast.
- **Warm Amber** (`#ffa62b`): Call-to-action buttons like Add Product.
- **Coral Red** (`#fc5130`): Delete actions, alerts, and out-of-stock badges.

---

## Browser Support

Works in all modern evergreen browsers:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Apple Safari (latest)

---

## License

Free to use, customize, and adapt for personal or commercial inventory management workflows.
