const STORAGE_KEY = 'inventorypro_products';

const INITIAL_CATALOG = [
  {
    id: 'prod-001',
    sku: 'DL-INS-15-001',
    name: 'Dell Inspiron 15 Laptop',
    category: 'Laptops',
    quantity: 25,
    price: 749.00,
    supplier: 'Dell Inc.',
    description: '15.6" FHD Laptop with Intel Core i5, 8GB RAM, 512GB SSD.',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-002',
    sku: 'LOG-M-MX3-002',
    name: 'Logitech Mouse MX 3S',
    category: 'Accessories',
    quantity: 6,
    price: 25.00,
    supplier: 'Logitech',
    description: 'Ergonomic wireless mouse with ultra-fast scrolling.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-003',
    sku: 'FURN-CHR-003',
    name: 'Office Chair Pro',
    category: 'Furniture',
    quantity: 0,
    price: 120.00,
    supplier: 'FurniCo',
    description: 'High-back mesh chair with adjustable lumbar support.',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-004',
    sku: 'SAM-MON-27-004',
    name: 'Samsung 27" Curved Monitor',
    category: 'Monitors',
    quantity: 18,
    price: 199.00,
    supplier: 'Samsung',
    description: '1080p 75Hz borderless curved gaming and office display.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-005',
    sku: 'KB-MECH-RGB-005',
    name: 'Mechanical RGB Keyboard',
    category: 'Accessories',
    quantity: 10,
    price: 85.00,
    supplier: 'KeyTech',
    description: 'Custom hot-swappable mechanical switches with PBT caps.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-006',
    sku: 'HP-LJ-PRO-006',
    name: 'HP LaserJet Printer',
    category: 'Printers',
    quantity: 7,
    price: 299.00,
    supplier: 'HP Inc.',
    description: 'High-speed wireless monochrome laser printer for office.',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-007',
    sku: 'FURN-DSK-007',
    name: 'Wooden Desk Workstation',
    category: 'Furniture',
    quantity: 15,
    price: 150.00,
    supplier: 'FurniCo',
    description: 'Sturdy oak finish desk with cable management tray.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-008',
    sku: 'SNY-WH-1000-008',
    name: 'Sony Wireless Headphones',
    category: 'Audio',
    quantity: 3,
    price: 99.00,
    supplier: 'Sony',
    description: 'Active noise cancellation headphones with 30-hour battery.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&auto=format&fit=crop&q=80'
  }
];

let products = [];
let pendingDeleteId = null;
let currentPage = 1;
const itemsPerPage = 8;
let isSidebarCollapsed = false;

let activeFilters = {
  search: '',
  category: 'all',
  status: 'all',
  sort: 'newest'
};

const dom = {
  statTotalProducts: document.getElementById('statTotalProducts'),
  statLowStock: document.getElementById('statLowStock'),
  statTotalCategories: document.getElementById('statTotalCategories'),
  statStockValue: document.getElementById('statStockValue'),
  navProductCount: document.getElementById('navProductCount'),

  tabCountAll: document.getElementById('tabCountAll'),
  tabCountInStock: document.getElementById('tabCountInStock'),
  tabCountLowStock: document.getElementById('tabCountLowStock'),
  tabCountOutOfStock: document.getElementById('tabCountOutOfStock'),

  tableSearchInput: document.getElementById('tableSearchInput'),
  categoryFilterSelect: document.getElementById('categoryFilterSelect'),
  statusFilterSelect: document.getElementById('statusFilterSelect'),
  sortBySelect: document.getElementById('sortBySelect'),
  filterTabs: document.querySelectorAll('.tab-pill'),

  productTableBody: document.getElementById('productTableBody'),
  emptyState: document.getElementById('emptyState'),
  clearFiltersBtn: document.getElementById('clearFiltersBtn'),

  paginationInfo: document.getElementById('paginationInfo'),
  paginationNav: document.getElementById('paginationNav'),

  productDrawerBackdrop: document.getElementById('productDrawerBackdrop'),
  productDrawerPanel: document.getElementById('productDrawerPanel'),
  drawerTitle: document.getElementById('drawerTitle'),
  drawerSubtitle: document.getElementById('drawerSubtitle'),
  closeDrawerBtn: document.getElementById('closeDrawerBtn'),
  cancelDrawerBtn: document.getElementById('cancelDrawerBtn'),
  saveProductBtn: document.getElementById('saveProductBtn'),
  productForm: document.getElementById('productForm'),

  formProductId: document.getElementById('formProductId'),
  formProductImageFile: document.getElementById('formProductImageFile'),
  formProductImageData: document.getElementById('formProductImageData'),
  formImagePreview: document.getElementById('formImagePreview'),
  formImagePlaceholder: document.getElementById('formImagePlaceholder'),
  imagePreviewContainer: document.getElementById('imagePreviewContainer'),
  removeImageBtn: document.getElementById('removeImageBtn'),
  formProductName: document.getElementById('formProductName'),
  formProductSku: document.getElementById('formProductSku'),
  formProductCategory: document.getElementById('formProductCategory'),
  formProductQty: document.getElementById('formProductQty'),
  formProductPrice: document.getElementById('formProductPrice'),
  formProductSupplier: document.getElementById('formProductSupplier'),
  formProductDesc: document.getElementById('formProductDesc'),

  openAddProductBtn: document.getElementById('openAddProductBtn'),

  deleteModalBackdrop: document.getElementById('deleteModalBackdrop'),
  deleteModalProductName: document.getElementById('deleteModalProductName'),
  deleteModalProductSku: document.getElementById('deleteModalProductSku'),
  cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),
  confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),

  toastContainer: document.getElementById('toastContainer'),
  globalSearchInput: document.getElementById('globalSearchInput'),
  currentDateDisplay: document.getElementById('currentDateDisplay'),

  menuToggleBtn: document.getElementById('menuToggleBtn'),
  sidebar: document.getElementById('sidebar'),
  sidebarHeader: document.getElementById('sidebarHeader'),
  sidebarBrandBlock: document.getElementById('sidebarBrandBlock'),
  sidebarOverlay: document.getElementById('sidebarOverlay'),
  toggleSidebarCollapse: document.getElementById('toggleSidebarCollapse'),
  collapseIcon: document.getElementById('collapseIcon'),

  navDashboardBtn: document.getElementById('navDashboardBtn'),
  navProductsBtn: document.getElementById('navProductsBtn'),
  navCategoriesBtn: document.getElementById('navCategoriesBtn'),
  navSuppliersBtn: document.getElementById('navSuppliersBtn'),
  navOrdersBtn: document.getElementById('navOrdersBtn'),
  navReportsBtn: document.getElementById('navReportsBtn'),
  navSettingsBtn: document.getElementById('navSettingsBtn'),
  navHelpBtn: document.getElementById('navHelpBtn'),
  navLogoutBtn: document.getElementById('navLogoutBtn')
};

function determineStockStatus(quantity) {
  const q = Number(quantity);
  if (isNaN(q) || q <= 0) return 'Out of Stock';
  if (q <= 10) return 'Low Stock';
  return 'In Stock';
}

function formatCurrency(amount) {
  const val = Number(amount) || 0;
  return '₹' + val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function loadCatalog() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      products = JSON.parse(raw);
      let updated = false;
      products.forEach(p => {
        if (!p.image) {
          const initMatch = INITIAL_CATALOG.find(init => init.sku === p.sku || init.id === p.id);
          if (initMatch && initMatch.image) {
            p.image = initMatch.image;
            updated = true;
          }
        }
      });
      if (updated) {
        saveCatalog();
      }
    } catch {
      products = [...INITIAL_CATALOG];
      saveCatalog();
    }
  } else {
    products = [...INITIAL_CATALOG];
    saveCatalog();
  }
}

function saveCatalog() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function getCategoryIcon(category) {
  const cat = (category || '').toLowerCase();
  if (cat.includes('laptop') || cat.includes('computer')) return { icon: 'fa-laptop', bg: 'bg-ice-light', text: 'text-deep-700' };
  if (cat.includes('monitor') || cat.includes('screen')) return { icon: 'fa-desktop', bg: 'bg-ice-light', text: 'text-pacific' };
  if (cat.includes('chair') || cat.includes('desk') || cat.includes('furniture')) return { icon: 'fa-chair', bg: 'bg-amber-light', text: 'text-amber-dark' };
  if (cat.includes('printer')) return { icon: 'fa-print', bg: 'bg-parchment', text: 'text-deep-800' };
  if (cat.includes('audio') || cat.includes('headphone')) return { icon: 'fa-headphones', bg: 'bg-ice-light', text: 'text-deep-600' };
  if (cat.includes('keyboard') || cat.includes('mouse') || cat.includes('accessory') || cat.includes('accessories')) {
    return { icon: 'fa-keyboard', bg: 'bg-parchment', text: 'text-deep-800' };
  }
  return { icon: 'fa-box', bg: 'bg-ice-light', text: 'text-deep-700' };
}

function renderDashboardSummary() {
  const total = products.length;
  const lowCount = products.filter(p => determineStockStatus(p.quantity) === 'Low Stock' || determineStockStatus(p.quantity) === 'Out of Stock').length;
  const categoriesSet = new Set(products.map(p => p.category.trim()).filter(Boolean));
  const totalValue = products.reduce((acc, p) => acc + ((Number(p.quantity) || 0) * (Number(p.price) || 0)), 0);

  dom.statTotalProducts.textContent = total;
  dom.statLowStock.textContent = lowCount;
  dom.statTotalCategories.textContent = categoriesSet.size;
  dom.statStockValue.textContent = formatCurrency(totalValue);

  if (dom.navProductCount) {
    dom.navProductCount.textContent = total;
  }

  const inStockCount = products.filter(p => determineStockStatus(p.quantity) === 'In Stock').length;
  const onlyLowCount = products.filter(p => determineStockStatus(p.quantity) === 'Low Stock').length;
  const outOfStockCount = products.filter(p => determineStockStatus(p.quantity) === 'Out of Stock').length;

  dom.tabCountAll.textContent = total;
  dom.tabCountInStock.textContent = inStockCount;
  dom.tabCountLowStock.textContent = onlyLowCount;
  dom.tabCountOutOfStock.textContent = outOfStockCount;

  populateCategoryDropdown();
}

function populateCategoryDropdown() {
  const currentVal = dom.categoryFilterSelect.value;
  const categories = [...new Set(products.map(p => p.category.trim()).filter(Boolean))].sort();

  dom.categoryFilterSelect.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    dom.categoryFilterSelect.appendChild(opt);
  });

  if ([...dom.categoryFilterSelect.options].some(o => o.value === currentVal)) {
    dom.categoryFilterSelect.value = currentVal;
  } else {
    dom.categoryFilterSelect.value = 'all';
    activeFilters.category = 'all';
  }
}

function getFilteredAndSortedProducts() {
  let list = products.filter(item => {
    const matchesSearch = !activeFilters.search ||
      item.name.toLowerCase().includes(activeFilters.search) ||
      item.sku.toLowerCase().includes(activeFilters.search) ||
      item.supplier.toLowerCase().includes(activeFilters.search);

    const matchesCategory = activeFilters.category === 'all' || item.category === activeFilters.category;

    const status = determineStockStatus(item.quantity);
    const matchesStatus = activeFilters.status === 'all' || status === activeFilters.status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  switch (activeFilters.sort) {
    case 'name-asc':
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      list.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'qty-asc':
      list.sort((a, b) => a.quantity - b.quantity);
      break;
    case 'qty-desc':
      list.sort((a, b) => b.quantity - a.quantity);
      break;
    case 'price-asc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      list.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  return list;
}

function renderTable() {
  const filtered = getFilteredAndSortedProducts();
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, total);
  const pageItems = filtered.slice(startIndex, endIndex);

  dom.productTableBody.innerHTML = '';

  if (total === 0) {
    dom.emptyState.classList.remove('hidden');
    dom.emptyState.classList.add('flex');
  } else {
    dom.emptyState.classList.add('hidden');
    dom.emptyState.classList.remove('flex');

    pageItems.forEach(prod => {
      const status = determineStockStatus(prod.quantity);
      let statusClasses = 'bg-ice-light text-deep-800 border border-ice';
      let dotColor = 'bg-pacific';
      let meterBg = 'bg-pacific';
      let meterWidth = Math.min(100, Math.round((prod.quantity / 30) * 100));

      if (status === 'Low Stock') {
        statusClasses = 'bg-amber-light text-amber-dark border border-amber/50';
        dotColor = 'bg-amber';
        meterBg = 'bg-amber';
      } else if (status === 'Out of Stock') {
        statusClasses = 'bg-coral-light text-coral border border-coral/30';
        dotColor = 'bg-coral';
        meterBg = 'bg-coral';
        meterWidth = 0;
      }

      const iconMeta = getCategoryIcon(prod.category);
      const imageMarkup = prod.image
        ? `<img src="${escapeHtml(prod.image)}" alt="${escapeHtml(prod.name)}" class="w-9 h-9 rounded-lg object-cover border border-ice-border bg-white shrink-0 shadow-xs" onerror="this.onerror=null;this.classList.add('hidden');this.nextElementSibling.classList.remove('hidden');"><div class="w-9 h-9 rounded-lg ${iconMeta.bg} ${iconMeta.text} hidden items-center justify-center text-xs shrink-0 border border-ice-border"><i class="fa-solid ${iconMeta.icon}"></i></div>`
        : `<div class="w-9 h-9 rounded-lg ${iconMeta.bg} ${iconMeta.text} flex items-center justify-center text-xs shrink-0 border border-ice-border"><i class="fa-solid ${iconMeta.icon}"></i></div>`;

      const tr = document.createElement('tr');
      tr.className = 'hover:bg-ice-light/50 transition-colors';
      tr.innerHTML = `
        <td class="px-5 py-3 whitespace-nowrap">
          <button type="button" onclick="copySkuToClipboard('${escapeHtml(prod.sku)}')" title="Click to copy SKU" class="font-mono text-xs font-semibold text-deep-800 bg-white hover:bg-ice-light hover:text-deep-900 px-2 py-0.5 rounded border border-ice-border hover:border-pacific transition-all inline-flex items-center gap-1 cursor-pointer">
            <span>${escapeHtml(prod.sku)}</span>
            <i class="fa-regular fa-copy text-[10px] text-deep-700/50"></i>
          </button>
        </td>
        <td class="px-5 py-3">
          <div class="flex items-center gap-2.5">
            ${imageMarkup}
            <div class="flex flex-col min-w-0">
              <span class="font-bold text-deep-900 truncate">${escapeHtml(prod.name)}</span>
              <span class="text-[11px] text-deep-700/60 truncate max-w-[210px]">${escapeHtml(prod.description || 'No description')}</span>
            </div>
          </div>
        </td>
        <td class="px-5 py-3 whitespace-nowrap">
          <span class="text-xs font-semibold text-deep-800 bg-parchment px-2 py-0.5 rounded border border-ice-border">${escapeHtml(prod.category)}</span>
        </td>
        <td class="px-5 py-3 whitespace-nowrap">
          <div class="flex flex-col gap-1 min-w-[70px]">
            <span class="font-bold text-xs text-deep-900">${prod.quantity}</span>
            <div class="w-full h-1.5 bg-ice-border/60 rounded overflow-hidden">
              <div class="h-full rounded transition-all duration-300 ${meterBg}" style="width: ${meterWidth}%;"></div>
            </div>
          </div>
        </td>
        <td class="px-5 py-3 whitespace-nowrap">
          <span class="font-bold text-xs text-deep-900">${formatCurrency(prod.price)}</span>
        </td>
        <td class="px-5 py-3 whitespace-nowrap">
          <span class="text-xs text-deep-700 font-medium">${escapeHtml(prod.supplier)}</span>
        </td>
        <td class="px-5 py-3 whitespace-nowrap text-center">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold ${statusClasses}">
            <span class="w-1.5 h-1.5 rounded-full ${dotColor}"></span>
            ${status}
          </span>
        </td>
        <td class="px-5 py-3 whitespace-nowrap text-right">
          <div class="flex items-center justify-end gap-1">
            <button type="button" class="w-7 h-7 rounded-md text-deep-700 hover:text-deep-900 hover:bg-ice-light flex items-center justify-center transition-all cursor-pointer" onclick="openEditProductDrawer('${prod.id}')" title="Edit product">
              <i class="fa-solid fa-pen-to-square text-xs"></i>
            </button>
            <button type="button" class="w-7 h-7 rounded-md text-coral hover:text-white hover:bg-coral flex items-center justify-center transition-all cursor-pointer" onclick="initiateDeleteProduct('${prod.id}')" title="Delete product">
              <i class="fa-solid fa-trash-can text-xs"></i>
            </button>
          </div>
        </td>
      `;
      dom.productTableBody.appendChild(tr);
    });
  }

  renderPagination(total, totalPages, startIndex, endIndex);
}

function renderPagination(total, totalPages, start, end) {
  if (total === 0) {
    dom.paginationInfo.textContent = 'Showing 0 to 0 of 0 entries';
    dom.paginationNav.innerHTML = '';
    return;
  }

  dom.paginationInfo.textContent = `Showing ${start + 1} to ${end} of ${total} entries`;
  dom.paginationNav.innerHTML = '';

  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = `px-2.5 py-1 rounded-md border border-ice-border text-xs font-bold transition-all cursor-pointer ${currentPage === 1 ? 'opacity-40 cursor-not-allowed bg-parchment-subtle text-deep-700/50' : 'bg-white hover:bg-ice-light text-deep-800'}`;
  prevBtn.disabled = currentPage === 1;
  prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left text-[9px]"></i>';
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  };
  dom.paginationNav.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      const pageBtn = document.createElement('button');
      pageBtn.type = 'button';
      pageBtn.className = `px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${i === currentPage ? 'bg-deep-700 text-white shadow-xs' : 'bg-white border border-ice-border text-deep-800 hover:bg-ice-light'}`;
      pageBtn.textContent = i;
      pageBtn.onclick = () => {
        currentPage = i;
        renderTable();
      };
      dom.paginationNav.appendChild(pageBtn);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      const span = document.createElement('span');
      span.className = 'px-1 text-deep-700/40 text-xs font-bold';
      span.textContent = '...';
      dom.paginationNav.appendChild(span);
    }
  }

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = `px-2.5 py-1 rounded-md border border-ice-border text-xs font-bold transition-all cursor-pointer ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed bg-parchment-subtle text-deep-700/50' : 'bg-white hover:bg-ice-light text-deep-800'}`;
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right text-[9px]"></i>';
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
    }
  };
  dom.paginationNav.appendChild(nextBtn);
}

function copySkuToClipboard(sku) {
  navigator.clipboard.writeText(sku).then(() => {
    showToast('Copied to Clipboard', `SKU ${sku} copied`, 'info');
  }).catch(() => {});
}

function clearValidationErrors() {
  const inputs = [
    dom.formProductName,
    dom.formProductSku,
    dom.formProductCategory,
    dom.formProductQty,
    dom.formProductPrice,
    dom.formProductSupplier
  ];

  inputs.forEach(input => {
    input.classList.remove('border-coral', 'bg-coral-light/30');
  });
  document.querySelectorAll('.error-text').forEach(el => el.classList.add('hidden'));
}

function setFormImagePreview(url) {
  if (url) {
    dom.formProductImageData.value = url;
    dom.formImagePreview.src = url;
    dom.formImagePreview.classList.remove('hidden');
    dom.formImagePlaceholder.classList.add('hidden');
    dom.removeImageBtn.classList.remove('hidden');
  } else {
    dom.formProductImageFile.value = '';
    dom.formProductImageData.value = '';
    dom.formImagePreview.src = '';
    dom.formImagePreview.classList.add('hidden');
    dom.formImagePlaceholder.classList.remove('hidden');
    dom.removeImageBtn.classList.add('hidden');
  }
}

function openAddProductDrawer() {
  clearValidationErrors();
  dom.productForm.reset();
  setFormImagePreview('');
  dom.formProductId.value = '';
  dom.formProductQty.value = '0';
  dom.formProductPrice.value = '0.00';
  dom.drawerTitle.textContent = 'Add Product';
  dom.drawerSubtitle.textContent = 'Enter product details to record inventory';

  dom.productDrawerBackdrop.classList.remove('hidden');
  dom.productDrawerPanel.classList.remove('translate-x-full');
  setTimeout(() => dom.formProductName.focus(), 150);
}

function openEditProductDrawer(id) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;

  clearValidationErrors();
  dom.formProductId.value = prod.id;
  setFormImagePreview(prod.image || '');
  dom.formProductName.value = prod.name;
  dom.formProductSku.value = prod.sku;
  dom.formProductCategory.value = prod.category;
  dom.formProductQty.value = prod.quantity;
  dom.formProductPrice.value = prod.price;
  dom.formProductSupplier.value = prod.supplier;
  dom.formProductDesc.value = prod.description || '';

  dom.drawerTitle.textContent = 'Edit Product';
  dom.drawerSubtitle.textContent = `Modifying details for SKU: ${prod.sku}`;

  dom.productDrawerBackdrop.classList.remove('hidden');
  dom.productDrawerPanel.classList.remove('translate-x-full');
  setTimeout(() => dom.formProductName.focus(), 150);
}

function closeProductDrawer() {
  dom.productDrawerPanel.classList.add('translate-x-full');
  setTimeout(() => {
    dom.productDrawerBackdrop.classList.add('hidden');
  }, 200);
  clearValidationErrors();
}

function validateProductForm() {
  clearValidationErrors();
  let isValid = true;

  const name = dom.formProductName.value.trim();
  const sku = dom.formProductSku.value.trim();
  const category = dom.formProductCategory.value.trim();
  const qtyRaw = dom.formProductQty.value.trim();
  const priceRaw = dom.formProductPrice.value.trim();
  const supplier = dom.formProductSupplier.value.trim();
  const editingId = dom.formProductId.value;

  if (!name) {
    dom.formProductName.classList.add('border-coral', 'bg-coral-light/30');
    document.getElementById('errorName').classList.remove('hidden');
    isValid = false;
  }

  if (!sku) {
    dom.formProductSku.classList.add('border-coral', 'bg-coral-light/30');
    const err = document.getElementById('errorSku');
    err.innerHTML = '<i class="fa-solid fa-circle-exclamation mr-1"></i>Valid SKU required';
    err.classList.remove('hidden');
    isValid = false;
  } else {
    const isDuplicate = products.some(p => p.sku && p.sku.toLowerCase() === sku.toLowerCase() && p.id !== editingId);
    if (isDuplicate) {
      dom.formProductSku.classList.add('border-coral', 'bg-coral-light/30');
      const err = document.getElementById('errorSku');
      err.innerHTML = '<i class="fa-solid fa-circle-exclamation mr-1"></i>SKU already exists in catalog';
      err.classList.remove('hidden');
      isValid = false;
    }
  }

  if (!category) {
    dom.formProductCategory.classList.add('border-coral', 'bg-coral-light/30');
    document.getElementById('errorCategory').classList.remove('hidden');
    isValid = false;
  }

  const parsedQty = Number(qtyRaw);
  if (qtyRaw === '' || isNaN(parsedQty) || parsedQty < 0 || !Number.isInteger(parsedQty)) {
    dom.formProductQty.classList.add('border-coral', 'bg-coral-light/30');
    document.getElementById('errorQty').classList.remove('hidden');
    isValid = false;
  }

  const parsedPrice = Number(priceRaw);
  if (priceRaw === '' || isNaN(parsedPrice) || parsedPrice < 0) {
    dom.formProductPrice.classList.add('border-coral', 'bg-coral-light/30');
    document.getElementById('errorPrice').classList.remove('hidden');
    isValid = false;
  }

  if (!supplier) {
    dom.formProductSupplier.classList.add('border-coral', 'bg-coral-light/30');
    document.getElementById('errorSupplier').classList.remove('hidden');
    isValid = false;
  }

  if (!isValid) {
    showToast('Required Fields', 'Please complete all highlighted fields marked with *', 'danger');
    const firstInvalid = dom.productForm.querySelector('.border-coral');
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return false;
  }

  return isValid;
}

function handleSaveProduct() {
  if (!validateProductForm()) return;

  const editingId = dom.formProductId.value;
  const payload = {
    name: dom.formProductName.value.trim(),
    sku: dom.formProductSku.value.trim(),
    category: dom.formProductCategory.value.trim(),
    quantity: parseInt(dom.formProductQty.value, 10),
    price: parseFloat(dom.formProductPrice.value),
    supplier: dom.formProductSupplier.value.trim(),
    description: dom.formProductDesc.value.trim(),
    image: dom.formProductImageData.value.trim()
  };

  if (editingId) {
    const index = products.findIndex(p => p.id === editingId);
    if (index !== -1) {
      products[index] = { ...products[index], ...payload };
      saveCatalog();
      renderDashboardSummary();
      renderTable();
      closeProductDrawer();
      showToast('Product Updated', `"${payload.name}" updated successfully`, 'success');
    }
  } else {
    const newProduct = {
      id: 'prod-' + Date.now(),
      ...payload
    };
    products.unshift(newProduct);
    saveCatalog();
    activeFilters.search = '';
    activeFilters.category = 'all';
    activeFilters.status = 'all';
    currentPage = 1;
    dom.tableSearchInput.value = '';
    dom.categoryFilterSelect.value = 'all';
    dom.statusFilterSelect.value = 'all';
    updateFilterTabClasses();
    renderDashboardSummary();
    renderTable();
    closeProductDrawer();
    showToast('Product Added', `"${payload.name}" added to catalog`, 'success');
  }
}

function initiateDeleteProduct(id) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;

  pendingDeleteId = id;
  dom.deleteModalProductName.textContent = prod.name;
  dom.deleteModalProductSku.textContent = prod.sku;

  dom.deleteModalBackdrop.classList.remove('hidden');
  dom.deleteModalBackdrop.classList.add('flex');
}

function closeDeleteModal() {
  dom.deleteModalBackdrop.classList.add('hidden');
  dom.deleteModalBackdrop.classList.remove('flex');
  pendingDeleteId = null;
}

function handleConfirmDelete() {
  if (!pendingDeleteId) return;

  const prod = products.find(p => p.id === pendingDeleteId);
  const name = prod ? prod.name : 'Product';

  products = products.filter(p => p.id !== pendingDeleteId);
  saveCatalog();
  closeDeleteModal();
  renderDashboardSummary();
  renderTable();
  showToast('Product Deleted', `"${name}" removed from catalog`, 'danger');
}

function showToast(title, message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto min-w-[260px] max-w-sm bg-white rounded-lg shadow-xl border border-ice-border p-3.5 flex items-center gap-3 transform translate-x-full opacity-0 transition-all duration-200 ease-out';

  let icon = 'fa-check';
  let iconBg = 'bg-ice-light text-deep-800 border border-ice';
  if (type === 'danger') {
    icon = 'fa-trash-can';
    iconBg = 'bg-coral-light text-coral border border-coral/30';
  } else if (type === 'info') {
    icon = 'fa-circle-info';
    iconBg = 'bg-amber-light text-amber-dark border border-amber/40';
  }

  toast.innerHTML = `
    <div class="w-7 h-7 rounded-md ${iconBg} flex items-center justify-center text-xs shrink-0 font-bold">
      <i class="fa-solid ${icon}"></i>
    </div>
    <div class="flex flex-col min-w-0 flex-1">
      <span class="text-xs font-bold text-deep-900 leading-tight">${escapeHtml(title)}</span>
      <span class="text-[11px] text-deep-700/70 truncate mt-0.5">${escapeHtml(message)}</span>
    </div>
    <button type="button" class="text-deep-700/50 hover:text-deep-900 p-1 cursor-pointer" aria-label="Close notification">
      <i class="fa-solid fa-xmark text-xs"></i>
    </button>
  `;

  const closeBtn = toast.querySelector('button');
  closeBtn.onclick = () => {
    toast.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => toast.remove(), 200);
  };

  dom.toastContainer.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove('translate-x-full', 'opacity-0');
  });

  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => toast.remove(), 200);
    }
  }, 3200);
}

function updateFilterTabClasses() {
  dom.filterTabs.forEach(tab => {
    const isSelected = tab.dataset.statusFilter === activeFilters.status;
    const countBadge = tab.querySelector('span:last-child');

    if (isSelected) {
      tab.className = 'tab-pill active px-3 py-1.5 rounded-md text-xs font-bold text-deep-900 bg-white shadow-xs border border-ice-border flex items-center gap-1.5 transition-all cursor-pointer';
      if (activeFilters.status === 'In Stock') {
        countBadge.className = 'px-1.5 py-0.2 rounded text-[10px] font-mono bg-ice-light text-deep-800';
      } else if (activeFilters.status === 'Low Stock') {
        countBadge.className = 'px-1.5 py-0.2 rounded text-[10px] font-mono bg-amber-light text-amber-dark';
      } else if (activeFilters.status === 'Out of Stock') {
        countBadge.className = 'px-1.5 py-0.2 rounded text-[10px] font-mono bg-coral-light text-coral';
      } else {
        countBadge.className = 'px-1.5 py-0.2 rounded text-[10px] font-mono bg-parchment text-deep-800 border border-ice-border';
      }
    } else {
      tab.className = 'tab-pill px-3 py-1.5 rounded-md text-xs font-semibold text-deep-700 hover:text-deep-900 hover:bg-white/70 flex items-center gap-1.5 transition-all cursor-pointer';
      countBadge.className = 'px-1.5 py-0.2 rounded text-[10px] font-mono bg-ice-light/60 text-deep-700';
    }
  });
}

function updateSidebarCollapsedState() {
  const brandTexts = document.querySelectorAll('.sidebar-brand-text');
  const navButtons = document.querySelectorAll('.nav-item-btn');
  const footerButtons = [dom.navHelpBtn, dom.navLogoutBtn];

  if (isSidebarCollapsed) {
    dom.sidebar.classList.remove('w-60');
    dom.sidebar.classList.add('w-[72px]');
    dom.collapseIcon.className = 'fa-solid fa-angles-right text-xs';
    dom.toggleSidebarCollapse.title = 'Expand sidebar';
    dom.toggleSidebarCollapse.className = 'w-10 h-10 rounded-lg hover:bg-deep-700 text-ice hover:text-white flex items-center justify-center transition-colors cursor-pointer';

    dom.sidebarBrandBlock.classList.add('hidden');
    dom.sidebarHeader.className = 'h-16 flex items-center justify-center border-b border-deep-700 px-0';

    brandTexts.forEach(el => el.classList.add('hidden'));

    navButtons.forEach(btn => {
      const isActive = btn.classList.contains('active-nav');
      if (isActive) {
        btn.className = 'nav-item-btn active-nav w-10 h-10 mx-auto rounded-lg bg-deep-700 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm';
      } else {
        btn.className = 'nav-item-btn w-10 h-10 mx-auto rounded-lg text-ice hover:text-white hover:bg-deep-700/60 flex items-center justify-center transition-all cursor-pointer';
      }
    });

    footerButtons.forEach(btn => {
      const isLogout = btn === dom.navLogoutBtn;
      if (isLogout) {
        btn.className = 'w-10 h-10 mx-auto rounded-lg text-coral hover:text-white hover:bg-coral/20 flex items-center justify-center transition-all cursor-pointer';
      } else {
        btn.className = 'w-10 h-10 mx-auto rounded-lg text-ice hover:text-white hover:bg-deep-700/60 flex items-center justify-center transition-all cursor-pointer';
      }
    });
  } else {
    dom.sidebar.classList.remove('w-[72px]');
    dom.sidebar.classList.add('w-60');
    dom.collapseIcon.className = 'fa-solid fa-angles-left text-xs';
    dom.toggleSidebarCollapse.title = 'Collapse sidebar';
    dom.toggleSidebarCollapse.className = 'text-ice hover:text-white p-1.5 rounded-md hover:bg-deep-700 transition-colors cursor-pointer';

    dom.sidebarBrandBlock.classList.remove('hidden');
    dom.sidebarHeader.className = 'h-16 px-4 flex items-center justify-between border-b border-deep-700';

    brandTexts.forEach(el => el.classList.remove('hidden'));

    navButtons.forEach(btn => {
      const isActive = btn.classList.contains('active-nav');
      if (isActive) {
        btn.className = btn === dom.navProductsBtn
          ? 'nav-item-btn active-nav w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold bg-deep-700 text-white shadow-sm transition-all text-left cursor-pointer'
          : 'nav-item-btn active-nav w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold bg-deep-700 text-white shadow-sm transition-all text-left cursor-pointer';
      } else {
        btn.className = btn === dom.navProductsBtn
          ? 'nav-item-btn w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-ice hover:text-white hover:bg-deep-700/60 transition-all text-left cursor-pointer'
          : 'nav-item-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-ice hover:text-white hover:bg-deep-700/60 transition-all text-left cursor-pointer';
      }
    });

    footerButtons.forEach(btn => {
      const isLogout = btn === dom.navLogoutBtn;
      if (isLogout) {
        btn.className = 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-coral hover:text-white hover:bg-coral/20 transition-all text-left cursor-pointer';
      } else {
        btn.className = 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-ice hover:text-white hover:bg-deep-700/60 transition-all text-left cursor-pointer';
      }
    });
  }
}

function setActiveNavButton(activeBtn) {
  const navButtons = document.querySelectorAll('.nav-item-btn');
  navButtons.forEach(btn => {
    if (btn === activeBtn) {
      btn.classList.add('active-nav');
    } else {
      btn.classList.remove('active-nav');
    }
  });
  updateSidebarCollapsedState();
}

function setupEventListeners() {
  dom.openAddProductBtn.addEventListener('click', openAddProductDrawer);
  dom.closeDrawerBtn.addEventListener('click', closeProductDrawer);
  dom.cancelDrawerBtn.addEventListener('click', closeProductDrawer);
  dom.productDrawerBackdrop.addEventListener('click', closeProductDrawer);
  dom.saveProductBtn.addEventListener('click', handleSaveProduct);
  dom.productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSaveProduct();
  });

  dom.imagePreviewContainer.addEventListener('click', () => {
    dom.formProductImageFile.click();
  });

  dom.formProductImageFile.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Invalid File', 'Please select a valid image file', 'error');
      return;
    }

    if (file.size > 2.5 * 1024 * 1024) {
      showToast('File Too Large', 'Please choose an image under 2MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      setFormImagePreview(loadEvt.target.result);
    };
    reader.readAsDataURL(file);
  });

  dom.removeImageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setFormImagePreview('');
  });

  [
    dom.formProductName,
    dom.formProductSku,
    dom.formProductCategory,
    dom.formProductQty,
    dom.formProductPrice,
    dom.formProductSupplier
  ].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('border-coral', 'bg-coral-light/30');
      const err = input.parentElement.querySelector('.error-text') || input.parentElement.parentElement.querySelector('.error-text');
      if (err) err.classList.add('hidden');
    });
  });

  dom.tableSearchInput.addEventListener('input', (e) => {
    activeFilters.search = e.target.value.trim().toLowerCase();
    currentPage = 1;
    renderTable();
  });

  dom.categoryFilterSelect.addEventListener('change', (e) => {
    activeFilters.category = e.target.value;
    currentPage = 1;
    renderTable();
  });

  dom.statusFilterSelect.addEventListener('change', (e) => {
    activeFilters.status = e.target.value;
    updateFilterTabClasses();
    currentPage = 1;
    renderTable();
  });

  dom.filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activeFilters.status = tab.dataset.statusFilter;
      dom.statusFilterSelect.value = activeFilters.status;
      updateFilterTabClasses();
      currentPage = 1;
      renderTable();
    });
  });

  dom.sortBySelect.addEventListener('change', (e) => {
    activeFilters.sort = e.target.value;
    currentPage = 1;
    renderTable();
  });

  document.querySelectorAll('thead th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const field = th.dataset.sort;
      if (field === 'name') {
        activeFilters.sort = activeFilters.sort === 'name-asc' ? 'name-desc' : 'name-asc';
      } else if (field === 'qty') {
        activeFilters.sort = activeFilters.sort === 'qty-asc' ? 'qty-desc' : 'qty-asc';
      } else if (field === 'price') {
        activeFilters.sort = activeFilters.sort === 'price-asc' ? 'price-desc' : 'price-asc';
      }
      dom.sortBySelect.value = activeFilters.sort;
      renderTable();
    });
  });

  dom.clearFiltersBtn.addEventListener('click', () => {
    activeFilters.search = '';
    activeFilters.category = 'all';
    activeFilters.status = 'all';
    activeFilters.sort = 'newest';

    dom.tableSearchInput.value = '';
    dom.globalSearchInput.value = '';
    dom.categoryFilterSelect.value = 'all';
    dom.statusFilterSelect.value = 'all';
    dom.sortBySelect.value = 'newest';

    updateFilterTabClasses();
    currentPage = 1;
    renderTable();
  });

  dom.globalSearchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();
    activeFilters.search = val;
    dom.tableSearchInput.value = val;
    currentPage = 1;
    renderTable();
  });

  dom.cancelDeleteBtn.addEventListener('click', closeDeleteModal);
  dom.deleteModalBackdrop.addEventListener('click', (e) => {
    if (e.target === dom.deleteModalBackdrop) closeDeleteModal();
  });
  dom.confirmDeleteBtn.addEventListener('click', handleConfirmDelete);

  dom.menuToggleBtn.addEventListener('click', () => {
    dom.sidebar.classList.remove('-translate-x-full');
    dom.sidebarOverlay.classList.remove('hidden');
  });

  dom.sidebarOverlay.addEventListener('click', () => {
    dom.sidebar.classList.add('-translate-x-full');
    dom.sidebarOverlay.classList.add('hidden');
  });

  dom.toggleSidebarCollapse.addEventListener('click', () => {
    isSidebarCollapsed = !isSidebarCollapsed;
    updateSidebarCollapsedState();
  });

  dom.navDashboardBtn.addEventListener('click', () => {
    setActiveNavButton(dom.navDashboardBtn);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.innerWidth < 768) {
      dom.sidebar.classList.add('-translate-x-full');
      dom.sidebarOverlay.classList.add('hidden');
    }
  });

  dom.navProductsBtn.addEventListener('click', () => {
    setActiveNavButton(dom.navProductsBtn);
    document.getElementById('productsTablePanel').scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth < 768) {
      dom.sidebar.classList.add('-translate-x-full');
      dom.sidebarOverlay.classList.add('hidden');
    }
  });

  dom.navCategoriesBtn.addEventListener('click', () => {
    setActiveNavButton(dom.navCategoriesBtn);
    document.getElementById('productsTablePanel').scrollIntoView({ behavior: 'smooth' });
    dom.categoryFilterSelect.focus();
    if (window.innerWidth < 768) {
      dom.sidebar.classList.add('-translate-x-full');
      dom.sidebarOverlay.classList.add('hidden');
    }
  });

  dom.navSuppliersBtn.addEventListener('click', () => {
    setActiveNavButton(dom.navSuppliersBtn);
    document.getElementById('productsTablePanel').scrollIntoView({ behavior: 'smooth' });
    dom.tableSearchInput.focus();
    if (window.innerWidth < 768) {
      dom.sidebar.classList.add('-translate-x-full');
      dom.sidebarOverlay.classList.add('hidden');
    }
  });

  dom.navOrdersBtn.addEventListener('click', () => {
    setActiveNavButton(dom.navOrdersBtn);
    if (window.innerWidth < 768) {
      dom.sidebar.classList.add('-translate-x-full');
      dom.sidebarOverlay.classList.add('hidden');
    }
  });

  dom.navReportsBtn.addEventListener('click', () => {
    setActiveNavButton(dom.navReportsBtn);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.innerWidth < 768) {
      dom.sidebar.classList.add('-translate-x-full');
      dom.sidebarOverlay.classList.add('hidden');
    }
  });

  dom.navSettingsBtn.addEventListener('click', () => {
    setActiveNavButton(dom.navSettingsBtn);
    if (window.innerWidth < 768) {
      dom.sidebar.classList.add('-translate-x-full');
      dom.sidebarOverlay.classList.add('hidden');
    }
  });

  dom.navHelpBtn.addEventListener('click', () => {
    showToast('Inventory Help', 'Press / to search anytime or use filters to manage catalog.', 'info');
    if (window.innerWidth < 768) {
      dom.sidebar.classList.add('-translate-x-full');
      dom.sidebarOverlay.classList.add('hidden');
    }
  });

  dom.navLogoutBtn.addEventListener('click', () => {
    showToast('Administrator Session', 'Logged in as John Doe (Admin).', 'info');
    if (window.innerWidth < 768) {
      dom.sidebar.classList.add('-translate-x-full');
      dom.sidebarOverlay.classList.add('hidden');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!dom.deleteModalBackdrop.classList.contains('hidden')) {
        closeDeleteModal();
      } else if (!dom.productDrawerPanel.classList.contains('translate-x-full')) {
        closeProductDrawer();
      }
    }

    if (e.key === '/' && document.activeElement !== dom.globalSearchInput && document.activeElement !== dom.tableSearchInput && dom.productDrawerPanel.classList.contains('translate-x-full')) {
      e.preventDefault();
      dom.globalSearchInput.focus();
    }
  });

  const now = new Date();
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  dom.currentDateDisplay.textContent = now.toLocaleDateString('en-US', options);
}

window.openEditProductDrawer = openEditProductDrawer;
window.initiateDeleteProduct = initiateDeleteProduct;
window.copySkuToClipboard = copySkuToClipboard;

function init() {
  loadCatalog();
  setupEventListeners();
  renderDashboardSummary();
  renderTable();
}

document.addEventListener('DOMContentLoaded', init);
