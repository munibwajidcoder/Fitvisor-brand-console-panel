'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  Shirt,
  Package,
  Store,
  Megaphone,
  BarChart3,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ChevronUp,
  User,
  Plus,
  Ruler,
  CloudUpload,
  Eye,
  ChevronRight,
  Menu,
  X,
  Check,
  Clock,
  Minus,
  LogOut,
  FileDown,
  Save,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Hash,
  Smartphone,
  TrendingUp,
  FileText,
} from 'lucide-react';
import { Translations, Language } from '../translations';
import { FitvisorLogo } from './FitvisorLogo';
import { LanguageSelector } from './LanguageSelector';
import { AddProductModal, Product } from './AddProductModal';

interface GarmentCatalogProps {
  t: Translations;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  brandName?: string;
  onNavigateToOverview: () => void;
  onNavigateToInventory?: () => void;
  onNavigateToInStore?: () => void;
  onNavigateToCampaigns?: () => void;
  onNavigateToSales?: () => void;
  onNavigateToDevSettings?: () => void;
  onSignOut?: () => void;
  initialSubcategory?: 'products' | 'sizing' | 'assets';
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'SKU-ZAL-091',
    name: 'Tailored Wool Blazer',
    category: 'Outerwear',
    categoryClass: 'cat-pill-blue',
    variants: '5 Colors • EU 36-46',
    price: '€129.90',
    stock: 184,
    status: 'Live 3D (Rigged)',
    statusType: 'live',
    thumbEmoji: '🧥',
    thumbBg: '#D9C8B4',
  },
  {
    id: 'SKU-ZAL-044',
    name: 'Wide-Leg Denim Jeans',
    category: 'Pants',
    categoryClass: 'cat-pill-purple',
    variants: '3 Washes • EU 34-44',
    price: '€69.90',
    stock: 92,
    status: 'Live 3D (Rigged)',
    statusType: 'live',
    thumbEmoji: '👖',
    thumbBg: '#93B3D2',
  },
  {
    id: 'SKU-ZAL-102',
    name: 'Silk Slip Midi Dress',
    category: 'Dresses',
    categoryClass: 'cat-pill-pink',
    variants: '2 Colors • EU 36-42',
    price: '€89.00',
    stock: 14,
    status: '3D Baking (LOD 2)',
    statusType: 'baking',
    thumbEmoji: '👗',
    thumbBg: '#C2596A',
  },
  {
    id: 'SKU-ZAL-781',
    name: 'Oversized Cotton Tee',
    category: 'Tops',
    categoryClass: 'cat-pill-teal',
    variants: '4 Colors • XS-XL',
    price: '€29.90',
    stock: 0,
    status: 'Draft',
    statusType: 'draft',
    thumbEmoji: '👕',
    thumbBg: '#E8ECEF',
  },
];

export const GarmentCatalog: React.FC<GarmentCatalogProps> = ({
  t,
  currentLang,
  onLanguageChange,
  brandName = 'Zalando SE',
  onNavigateToOverview,
  onNavigateToInventory,
  onNavigateToInStore,
  onNavigateToCampaigns,
  onNavigateToSales,
  onNavigateToDevSettings,
  onSignOut,
  initialSubcategory = 'products',
}) => {
  const [catalogMenuOpen, setCatalogMenuOpen] = useState(true);
  const [inventoryDropdownOpen, setInventoryDropdownOpen] = useState(false);
  const [instoreDropdownOpen, setInstoreDropdownOpen] = useState(false);
  const [salesDropdownOpen, setSalesDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeSubcategory, setActiveSubcategory] = useState<'products' | 'sizing' | 'assets'>(initialSubcategory);
  const [searchTableQuery, setSearchTableQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedStock, setSelectedStock] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [fitPref, setFitPref] = useState<'exact' | 'relaxed'>('exact');
  const [sizeSaving, setSizeSaving] = useState(false);
  const [sizeSaved, setSizeSaved] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [csvImporting, setCsvImporting] = useState(false);
  const [csvImported, setCsvImported] = useState(false);
  const csvFileRef = useRef<HTMLInputElement>(null);

  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mainWrapperRef.current?.scrollTo({ top: 0 });
  }, []);

  // Close notification panel on outside click
  useEffect(() => {
    if (!notifPanelOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [notifPanelOpen]);

  // ---- Filter products ----
  const filteredProducts = products.filter(item => {
    const q = searchTableQuery.trim().toLowerCase();
    const matchesSearch = !q ||
      item.name.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q);
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Live' && item.statusType === 'live') ||
      (selectedStatus === 'Baking' && item.statusType === 'baking') ||
      (selectedStatus === 'Draft' && item.statusType === 'draft');
    const matchesStock =
      selectedStock === 'All' ||
      (selectedStock === 'InStock' && item.stock > 0) ||
      (selectedStock === 'OutOfStock' && item.stock === 0);
    return matchesSearch && matchesCat && matchesStatus && matchesStock;
  });

  const handleProductAdded = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleCsvFile = (file: File) => {
    if (!file || !file.name.endsWith('.csv')) return;
    setCsvImporting(true);
    // Parse CSV: expects header row then data rows
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      // Skip header, parse up to 20 rows
      const imported: Product[] = lines.slice(1, 21).map((line, idx) => {
        const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
        const size = cols[0] || 'EU 38 (M)';
        return {
          id: `CSV-${Date.now()}-${idx}`,
          name: `Imported Size ${size}`,
          category: 'Outerwear',
          categoryClass: 'cat-pill-blue',
          variants: size,
          price: cols[1] ? `€${cols[1]}` : '€0.00',
          stock: parseInt(cols[2] || '0', 10),
          status: 'Draft',
          statusType: 'draft',
          thumbEmoji: '📦',
          thumbBg: '#E8ECEF',
        };
      });
      setCsvImporting(false);
      setCsvImported(true);
      // For size mapping: just show success — no catalog entries added
      setTimeout(() => setCsvImported(false), 3000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="dashboard-layout catalog-layout">
      {/* Add Product Modal */}
      <AddProductModal
        isOpen={addProductOpen}
        onClose={() => setAddProductOpen(false)}
        onProductAdded={handleProductAdded}
        t={t}
      />

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* ==================== SIDEBAR ==================== */}
      <aside className={`dashboard-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* Mobile Header */}
        <div className="mobile-drawer-header">
          <FitvisorLogo variant="light" height={28} showConsoleSubtext={false} />
          <button
            type="button"
            className="mobile-drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Desktop Brand Header — reduced logo size */}
        <div className="sidebar-brand-header desktop-only">
          <FitvisorLogo variant="light" height={30} showConsoleSubtext={false} />
        </div>

        {/* Sidebar Nav */}
        <nav className="sidebar-nav">
          <button
            type="button"
            className="nav-item"
            onClick={() => { setMobileMenuOpen(false); onNavigateToOverview(); }}
          >
            <Home size={19} className="nav-icon" />
            <div className="nav-label-box">
              <span className="nav-label-title">1. {t.navOverview}</span>
              <span className="nav-label-sub">{t.navOverviewSub}</span>
            </div>
          </button>

          <div className="nav-dropdown-group">
            <button
              type="button"
              className="nav-item active has-dropdown"
              onClick={() => setCatalogMenuOpen(!catalogMenuOpen)}
            >
              <Shirt size={19} className="nav-icon" />
              <div className="nav-label-box">
                <span className="nav-label-title">2. {t.navCatalogue}</span>
                <span className="nav-label-sub">{t.navCatalogueSub}</span>
              </div>
              <span className="nav-dropdown-arrow">
                {catalogMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>

            {catalogMenuOpen && (
              <div className="sidebar-subcategories-list">
                <button
                  type="button"
                  className={`sub-nav-item ${activeSubcategory === 'products' ? 'active-sub' : ''}`}
                  onClick={() => { setActiveSubcategory('products'); setMobileMenuOpen(false); }}
                >
                  <Shirt size={15} /><span>{t.tabProductCatalog}</span>
                </button>
                <button
                  type="button"
                  className={`sub-nav-item ${activeSubcategory === 'sizing' ? 'active-sub' : ''}`}
                  onClick={() => { setActiveSubcategory('sizing'); setMobileMenuOpen(false); }}
                >
                  <Ruler size={15} /><span>{t.tabSizeMapping}</span>
                </button>
                <button
                  type="button"
                  className={`sub-nav-item ${activeSubcategory === 'assets' ? 'active-sub' : ''}`}
                  onClick={() => { setActiveSubcategory('assets'); setMobileMenuOpen(false); }}
                >
                  <CloudUpload size={15} /><span>{t.tabAssetUpload}</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Inventory & Sync dropdown */}
          <div className="nav-dropdown-group">
            <button type="button" className="nav-item has-dropdown" onClick={() => setInventoryDropdownOpen(!inventoryDropdownOpen)}>
              <Package size={19} className="nav-icon" />
              <div className="nav-label-box">
                <span className="nav-label-title">3. {t.navInventory}</span>
                <span className="nav-label-sub">{t.invNavSub}</span>
              </div>
              <span className="nav-dropdown-arrow">{inventoryDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
            </button>
            {inventoryDropdownOpen && (
              <div className="sidebar-subcategories-list">
                <button type="button" className="sub-nav-item" onClick={() => { if (onNavigateToInventory) onNavigateToInventory(); setMobileMenuOpen(false); }}>
                  <RefreshCw size={15} /><span>{t.invTabStock}</span>
                </button>
                <button type="button" className="sub-nav-item" onClick={() => { if (onNavigateToInventory) onNavigateToInventory(); setMobileMenuOpen(false); }}>
                  <Hash size={15} /><span>{t.invTabQuantities}</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. In-Store & Kiosks dropdown */}
          <div className="nav-dropdown-group">
            <button type="button" className="nav-item has-dropdown" onClick={() => setInstoreDropdownOpen(!instoreDropdownOpen)}>
              <Store size={19} className="nav-icon" />
              <div className="nav-label-box">
                <span className="nav-label-title">4. {t.navInStore}</span>
                <span className="nav-label-sub">{t.instoreNavSub}</span>
              </div>
              <span className="nav-dropdown-arrow">{instoreDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
            </button>
            {instoreDropdownOpen && (
              <div className="sidebar-subcategories-list">
                <button type="button" className="sub-nav-item" onClick={() => { if (onNavigateToInStore) onNavigateToInStore(); setMobileMenuOpen(false); }}>
                  <Store size={15} /><span>{t.instoreTabStores}</span>
                </button>
                <button type="button" className="sub-nav-item" onClick={() => { if (onNavigateToInStore) onNavigateToInStore(); setMobileMenuOpen(false); }}>
                  <Smartphone size={15} /><span>{t.instoreTabFitting}</span>
                </button>
              </div>
            )}
          </div>

          {/* 5. Campaigns & Ads */}
          <button type="button" className="nav-item" onClick={() => { if (onNavigateToCampaigns) onNavigateToCampaigns(); setMobileMenuOpen(false); }}>
            <Megaphone size={19} className="nav-icon" />
            <div className="nav-label-box">
              <span className="nav-label-title">5. {t.navCampaigns}</span>
              <span className="nav-label-sub">{t.navCampaignsSub}</span>
            </div>
          </button>

          {/* 6. Sales & Earnings dropdown */}
          <div className="nav-dropdown-group">
            <button type="button" className="nav-item has-dropdown" onClick={() => setSalesDropdownOpen(!salesDropdownOpen)}>
              <BarChart3 size={19} className="nav-icon" />
              <div className="nav-label-box">
                <span className="nav-label-title">6. {t.navSales}</span>
                <span className="nav-label-sub">{t.salesNavSub}</span>
              </div>
              <span className="nav-dropdown-arrow">{salesDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
            </button>
            {salesDropdownOpen && (
              <div className="sidebar-subcategories-list">
                <button type="button" className="sub-nav-item" onClick={() => { if (onNavigateToSales) onNavigateToSales(); setMobileMenuOpen(false); }}>
                  <TrendingUp size={15} /><span>{t.salesTabAttribution}</span>
                </button>
                <button type="button" className="sub-nav-item" onClick={() => { if (onNavigateToSales) onNavigateToSales(); setMobileMenuOpen(false); }}>
                  <FileText size={15} /><span>{t.salesTabInvoices}</span>
                </button>
                <button type="button" className="sub-nav-item" onClick={() => { if (onNavigateToSales) onNavigateToSales(); setMobileMenuOpen(false); }}>
                  <BarChart3 size={15} /><span>{t.salesTabFitInsights}</span>
                </button>
              </div>
            )}
          </div>

          <button type="button" className="nav-item" onClick={() => { if (onNavigateToDevSettings) onNavigateToDevSettings(); setMobileMenuOpen(false); }}>
            <Settings size={19} className="nav-icon" />
            <div className="nav-label-box">
              <span className="nav-label-title">{t.navSettings}</span>
              <span className="nav-label-sub">{t.navSettingsSub}</span>
            </div>
          </button>
        </nav>

        {/* Bottom sign-out — compact, no "Brand Partner" label */}
      </aside>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="dashboard-main-wrapper" ref={mainWrapperRef}>
        {/* Top Navbar */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            <div className="breadcrumb-nav">
              <Home size={15} className="breadcrumb-icon" />
              <span className="breadcrumb-link">{t.navCatalogue}</span>
              <span className="breadcrumb-divider">›</span>
              <span className="breadcrumb-current">
                {activeSubcategory === 'products' ? t.tabProductCatalog :
                 activeSubcategory === 'sizing'   ? t.tabSizeMapping :
                                                    t.tabAssetUpload}
              </span>
            </div>

            <div className="topbar-search">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTableQuery}
                onChange={e => setSearchTableQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="topbar-right">
            <div className="feed-status-pill">
              <span className="feed-status-dot" />
              <span>{t.catalogFeedActive}</span>
            </div>

            {/* Notification Bell + Panel */}
            <div className="notif-wrapper" ref={notifRef}>
              <button
                type="button"
                className={`notification-bell-btn ${notifPanelOpen ? 'active' : ''}`}
                aria-label="Notifications"
                onClick={() => setNotifPanelOpen(v => !v)}
              >
                <Bell size={18} />
                <span className="bell-red-badge" />
              </button>

              {notifPanelOpen && (
                <div className="notif-panel" role="dialog" aria-label="Notifications">
                  <div className="notif-panel-header">
                    <span className="notif-panel-title">Notifications</span>
                    <span className="notif-unread-badge">3 {t.notifNew}</span>
                  </div>
                  <div className="notif-list">
                    <div className="notif-item notif-unread">
                      <div className="notif-dot" />
                      <div className="notif-content">
                        <span className="notif-item-title">{t.notifCatalogSyncTitle}</span>
                        <span className="notif-item-desc">{t.notifCatalogSyncDesc}</span>
                        <span className="notif-item-time">{t.notifTimeMinutes}</span>
                      </div>
                    </div>
                    <div className="notif-item notif-unread">
                      <div className="notif-dot notif-dot-orange" />
                      <div className="notif-content">
                        <span className="notif-item-title">{t.notifSkuQuarantineTitle}</span>
                        <span className="notif-item-desc">{t.notifSkuQuarantineDesc}</span>
                        <span className="notif-item-time">{t.notifTime18Min}</span>
                      </div>
                    </div>
                    <div className="notif-item notif-unread">
                      <div className="notif-dot notif-dot-green" />
                      <div className="notif-content">
                        <span className="notif-item-title">{t.notifMilestoneTitle}</span>
                        <span className="notif-item-desc">{t.notifMilestoneDesc}</span>
                        <span className="notif-item-time">{t.notifTime1Hour}</span>
                      </div>
                    </div>
                    <div className="notif-item">
                      <div className="notif-dot notif-dot-muted" />
                      <div className="notif-content">
                        <span className="notif-item-title">{t.notifSlaReportTitle}</span>
                        <span className="notif-item-desc">{t.notifSlaReportDesc}</span>
                        <span className="notif-item-time">{t.notifTimeYesterday}</span>
                      </div>
                    </div>
                  </div>
                  <div className="notif-panel-footer">
                    <button type="button" className="notif-mark-all-btn" onClick={() => setNotifPanelOpen(false)}>
                      {t.notifMarkAllRead}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <LanguageSelector
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
            />

            <div className="topbar-user-profile-wrapper">
              <button
                type="button"
                className="topbar-user-profile"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-expanded={userMenuOpen}
              >
                <div className="topbar-user-avatar">
                  <User size={17} strokeWidth={2.2} />
                </div>
                <div className="topbar-user-meta">
                  <span className="topbar-user-name">{brandName}</span>
                  <span className="topbar-user-tag">{t.brandPartnerRole}</span>
                </div>
                <ChevronDown size={14} className="user-dropdown-arrow" />
              </button>

              {userMenuOpen && (
                <div className="user-dropdown-menu">
                  <div className="user-dropdown-header">
                    <span className="dropdown-brand-title">{brandName}</span>
                    <span className="dropdown-brand-role">{t.brandPartnerRole}</span>
                  </div>
                  <div className="user-dropdown-divider" />
                  <button
                    type="button"
                    className="user-dropdown-item signout-item"
                    onClick={() => { setUserMenuOpen(false); if (onSignOut) onSignOut(); }}
                  >
                    <LogOut size={16} />
                    <span>{t.signOut}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Catalog Body */}
        <main className="dashboard-content-area catalog-content-area">

          {/* ==================== PRODUCTS CATALOG TAB ==================== */}
          {activeSubcategory === 'products' && (
            <>
              {/* Title Row */}
              <div className="catalog-header-row">
                <div className="catalog-title-group">
                  <h1 className="catalog-main-title">{t.catalogPageTitle}</h1>
                  <p className="catalog-sub-title">{t.catalogPageSubtitle}</p>
                </div>
                <button
                  type="button"
                  className="add-single-product-btn"
                  onClick={() => setAddProductOpen(true)}
                >
                  <Plus size={18} strokeWidth={2.4} />
                  <span>{t.addSingleProductBtn}</span>
                </button>
              </div>

              {/* Filter Bar */}
              <div className="catalog-filter-card">
                <div className="filter-search-box">
                  <Search size={16} className="filter-search-icon" />
                  <input
                    type="text"
                    placeholder={t.filterSearchPlaceholder}
                    value={searchTableQuery}
                    onChange={e => setSearchTableQuery(e.target.value)}
                    className="filter-text-input"
                  />
                </div>
                <div className="filter-dropdowns-row">
                  <div className="filter-select-group">
                    <span className="filter-field-label">{t.filterCategoryLabel}</span>
                    <div className="filter-select-box">
                      <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="filter-select">
                        <option value="All">{t.filterAllCategories}</option>
                        <option value="Outerwear">{t.filterOuterwear}</option>
                        <option value="Pants">{t.filterPants}</option>
                        <option value="Dresses">{t.filterDresses}</option>
                        <option value="Tops">{t.filterTops}</option>
                        <option value="Footwear">{t.filterFootwear}</option>
                        <option value="Accessories">{t.filterAccessories}</option>
                      </select>
                      <ChevronDown size={14} className="filter-select-chevron" />
                    </div>
                  </div>
                  <div className="filter-select-group">
                    <span className="filter-field-label">{t.filter3dStatusLabel}</span>
                    <div className="filter-select-box">
                      <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="filter-select">
                        <option value="All">{t.filterAllStatuses}</option>
                        <option value="Live">{t.filterStatusLive}</option>
                        <option value="Baking">{t.filterStatusBaking}</option>
                        <option value="Draft">{t.filterStatusDraft}</option>
                      </select>
                      <ChevronDown size={14} className="filter-select-chevron" />
                    </div>
                  </div>
                  <div className="filter-select-group">
                    <span className="filter-field-label">{t.filterStockLabel}</span>
                    <div className="filter-select-box">
                      <select value={selectedStock} onChange={e => setSelectedStock(e.target.value)} className="filter-select">
                        <option value="All">{t.filterAllStock}</option>
                        <option value="InStock">{t.filterInStock}</option>
                        <option value="OutOfStock">{t.filterOutOfStock}</option>
                      </select>
                      <ChevronDown size={14} className="filter-select-chevron" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Catalog Table */}
              <div className="catalog-table-container">
                <div className="table-responsive-scroll">
                  <table className="catalog-table">
                    <thead>
                      <tr>
                        <th>{t.colProductSku}</th>
                        <th>{t.colCategory}</th>
                        <th>{t.colVariantsSizes}</th>
                        <th>{t.colPriceEur}</th>
                        <th>{t.colRealTimeStock}</th>
                        <th>{t.col3dStatus}</th>
                        <th>{t.colActions}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="catalog-empty-row">
                            {t.noProductsFound}
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map(item => (
                          <tr key={item.id} className="catalog-table-row">
                            <td className="product-col-cell">
                              <div className="product-meta-cell">
                                <div className="product-thumb-box" style={{ backgroundColor: item.thumbBg }}>
                                  <span className="product-thumb-emoji">{item.thumbEmoji}</span>
                                </div>
                                <div className="product-text-details">
                                  <span className="product-name-title">{item.name}</span>
                                  <span className="product-sku-code">{item.id}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={`category-pill ${item.categoryClass}`}>{item.category}</span>
                            </td>
                            <td className="variants-cell">{item.variants}</td>
                            <td className="price-cell">{item.price}</td>
                            <td>
                              {item.stock > 0 ? (
                                <div className="stock-status-cell in-stock">
                                  <span className="stock-dot green-dot" />
                                  <span>{item.stock} {t.inStockLabel}</span>
                                </div>
                              ) : (
                                <div className="stock-status-cell out-of-stock">
                                  <span className="stock-dot red-dot" />
                                  <span>{t.outOfStockLabel}</span>
                                </div>
                              )}
                            </td>
                            <td>
                              {item.statusType === 'live' && (
                                <div className="simulation-status-pill status-live">
                                  <Check size={13} strokeWidth={3} className="status-icon" />
                                  <span>{t.filterStatusLive}</span>
                                </div>
                              )}
                              {item.statusType === 'baking' && (
                                <div className="simulation-status-pill status-baking">
                                  <Clock size={13} strokeWidth={2.4} className="status-icon" />
                                  <span>{t.filterStatusBaking}</span>
                                </div>
                              )}
                              {item.statusType === 'draft' && (
                                <div className="simulation-status-pill status-draft">
                                  <Minus size={13} strokeWidth={2.5} className="status-icon" />
                                  <span>{t.filterStatusDraft}</span>
                                </div>
                              )}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="action-view-3d-btn"
                                onClick={() => alert(`${t.viewDetails3dBtn}: ${item.name} (${item.id})`)}
                              >
                                <Eye size={15} />
                                <span>{t.viewDetails3dBtn}</span>
                                <ChevronRight size={14} className="action-chevron" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="table-pagination-footer">
                  <span className="pagination-count-label">
                    {t.showingProducts} {filteredProducts.length} / {products.length}
                  </span>
                  <div className="pagination-controls">
                    <button type="button" className="pagination-arrow-btn" aria-label="Previous page">‹</button>
                    <button type="button" className="pagination-page-btn active">1</button>
                    <button type="button" className="pagination-page-btn">2</button>
                    <button type="button" className="pagination-page-btn">3</button>
                    <button type="button" className="pagination-arrow-btn" aria-label="Next page">›</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ==================== SIZE MAPPING TAB ==================== */}
          {activeSubcategory === 'sizing' && (
            <>
              {/* Page Header */}
              <div className="sm-page-header">
                <div className="sm-title-group">
                  <h1 className="catalog-main-title">{t.sizeMappingTitle}</h1>
                  <p className="catalog-sub-title">{t.sizeMappingSubtitle}</p>
                </div>
                <button
                  type="button"
                  className="sm-import-btn"
                  disabled={csvImporting}
                  onClick={() => csvFileRef.current?.click()}
                >
                  <FileDown size={16} strokeWidth={2.2} />
                  <span>
                    {csvImporting ? '…' : csvImported ? '✓ ' : ''}{t.importSizeChartBtn}
                  </span>
                </button>
                {/* Hidden file input for real CSV selection */}
                <input
                  ref={csvFileRef}
                  type="file"
                  accept=".csv"
                  style={{ display: 'none' }}
                  onChange={e => { if (e.target.files?.[0]) handleCsvFile(e.target.files[0]); e.target.value = ''; }}
                />
              </div>

              {/* Size Mapping Matrix Card */}
              <div className="sm-card">
                <div className="sm-card-header">
                  <div className="sm-card-icon-wrap">
                    <Ruler size={18} />
                  </div>
                  <h2 className="sm-card-title">{t.sizeMappingMatrixTitle}</h2>
                </div>

                <div className="sm-table-scroll">
                  <table className="sm-table">
                    <thead>
                      <tr>
                        <th>{t.colBrandSize}</th>
                        <th>{t.colChestBust}</th>
                        <th>{t.colWaistRange}</th>
                        <th>{t.colHipRange}</th>
                        <th>{t.colRecommendedHeight}</th>
                        <th>{t.colFitCutTolerance}</th>
                        <th>{t.colMappingConfidence}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { size: 'EU 36 (S)',  chest: '82 – 86 cm', waist: '64 – 68 cm', hip: '88 – 92 cm',   height: '162 – 168 cm', fitCut: 'Regular (±1.5cm)' },
                        { size: 'EU 38 (M)',  chest: '86 – 90 cm', waist: '68 – 72 cm', hip: '92 – 96 cm',   height: '165 – 172 cm', fitCut: 'Regular (±1.5cm)' },
                        { size: 'EU 40 (L)',  chest: '90 – 94 cm', waist: '72 – 76 cm', hip: '96 – 100 cm',  height: '168 – 175 cm', fitCut: 'Regular (±1.5cm)' },
                        { size: 'EU 42 (XL)', chest: '94 – 100 cm',waist: '76 – 82 cm', hip: '100 – 106 cm', height: '170 – 178 cm', fitCut: 'Loose / Oversized' },
                      ].map(row => (
                        <tr key={row.size} className="sm-table-row">
                          <td className="sm-td-size">{row.size}</td>
                          <td className="sm-td">{row.chest}</td>
                          <td className="sm-td">{row.waist}</td>
                          <td className="sm-td">{row.hip}</td>
                          <td className="sm-td">{row.height}</td>
                          <td className="sm-td">{row.fitCut}</td>
                          <td className="sm-td">
                            <span className="sm-calibrated-pill">
                              <CheckCircle2 size={13} strokeWidth={2.5} />
                              {t.calibratedLabel}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fit Recommendation Preferences Card */}
              <div className="sm-card sm-pref-card">
                <div className="sm-card-header">
                  <div className="sm-card-icon-wrap">
                    <Ruler size={18} />
                  </div>
                  <h2 className="sm-card-title">{t.fitPreferencesTitle}</h2>
                </div>

                <div className="sm-pref-row">
                  {/* Option 1 — Exact anatomical fit */}
                  <button
                    type="button"
                    className={`sm-pref-option ${fitPref === 'exact' ? 'sm-pref-selected' : ''}`}
                    onClick={() => setFitPref('exact')}
                  >
                    <span className={`sm-radio-dot ${fitPref === 'exact' ? 'sm-radio-active' : ''}`}>
                      {fitPref === 'exact' && <span className="sm-radio-inner" />}
                    </span>
                    <span className="sm-pref-label">{t.fitPrefExact}</span>
                  </button>

                  {/* Option 2 — Relaxed fit */}
                  <button
                    type="button"
                    className={`sm-pref-option ${fitPref === 'relaxed' ? 'sm-pref-selected' : ''}`}
                    onClick={() => setFitPref('relaxed')}
                  >
                    <span className={`sm-radio-dot ${fitPref === 'relaxed' ? 'sm-radio-active' : ''}`}>
                      {fitPref === 'relaxed' && <span className="sm-radio-inner" />}
                    </span>
                    <span className="sm-pref-label">{t.fitPrefRelaxed}</span>
                  </button>

                  {/* Save Button */}
                  <button
                    type="button"
                    className="sm-save-btn"
                    disabled={sizeSaving || sizeSaved}
                    onClick={() => {
                      setSizeSaving(true);
                      setTimeout(() => {
                        setSizeSaving(false);
                        setSizeSaved(true);
                        setTimeout(() => setSizeSaved(false), 2500);
                      }, 900);
                    }}
                  >
                    {sizeSaving ? (
                      <><Loader2 size={16} className="animate-spin" /><span>Saving…</span></>
                    ) : sizeSaved ? (
                      <><CheckCircle2 size={16} /><span>Saved!</span></>
                    ) : (
                      <><Save size={16} /><span>{t.saveCalibrationBtn}</span></>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ==================== ASSET UPLOAD TAB ==================== */}
          {activeSubcategory === 'assets' && (
            <div className="sm-card" style={{ marginTop: 0 }}>
              <div className="sm-card-header">
                <div className="sm-card-icon-wrap">
                  <CloudUpload size={18} />
                </div>
                <h2 className="sm-card-title">{t.assetUploadTitle}</h2>
              </div>
              <div className="catalog-empty-row" style={{ padding: '48px 0' }}>
                {t.assetUploadComingSoon}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
