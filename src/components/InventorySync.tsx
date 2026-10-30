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
  Menu,
  X,
  LogOut,
  RefreshCw,
  Zap,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
  RotateCcw,
  ArrowUpDown,
  Ruler,
  Upload,
  Pencil,
  Hash,
  Smartphone,
  TrendingUp,
  FileText,
} from 'lucide-react';
import { Translations, Language } from '../translations';
import { FitvisorLogo } from './FitvisorLogo';
import { LanguageSelector } from './LanguageSelector';

type TabType = 'stock' | 'quarantine' | 'quantities';

interface InventorySyncProps {
  t: Translations;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  brandName?: string;
  onNavigateToOverview: () => void;
  onNavigateToCatalog: () => void;
  onNavigateToInStore?: () => void;
  onNavigateToCampaigns?: () => void;
  onNavigateToSales?: () => void;
  onNavigateToDevSettings?: () => void;
  onSignOut?: () => void;
  initialTab?: TabType;
}

interface StockItem {
  sku: string;
  name: string;
  webStock: number;
  boutiqueStock: number;
  boutiqueNote?: string;
  price: string;
  lastSynced: number; // minutes ago
  status: 'fresh' | 'depleted';
  thumbEmoji: string;
  thumbBg: string;
}

interface QuarantineItem {
  sku: string;
  name: string;
  issue: string;
  severity: 'high' | 'medium';
  detected: string;
  status: 'blocked' | 'pending';
}

const STOCK_DATA: StockItem[] = [
  {
    sku: 'SKU-ZAL-091',
    name: 'Tailored Wool Blazer',
    webStock: 142,
    boutiqueStock: 42,
    boutiqueNote: '5 boutiques',
    price: '€129.90',
    lastSynced: 4,
    status: 'fresh',
    thumbEmoji: '🧥',
    thumbBg: '#D9C8B4',
  },
  {
    sku: 'SKU-ZAL-044',
    name: 'Wide-Leg Denim Jeans',
    webStock: 84,
    boutiqueStock: 8,
    boutiqueNote: 'Paris flagship',
    price: '€69.90',
    lastSynced: 4,
    status: 'fresh',
    thumbEmoji: '👖',
    thumbBg: '#93B3D2',
  },
  {
    sku: 'SKU-ZAL-899',
    name: 'Floral Wrap Blouse',
    webStock: 0,
    boutiqueStock: 0,
    price: '€45.00',
    lastSynced: 12,
    status: 'depleted',
    thumbEmoji: '👗',
    thumbBg: '#F2C6C6',
  },
];

const QUARANTINE_DATA: QuarantineItem[] = [
  {
    sku: 'SKU-ZAL-102',
    name: 'Silk Slip Midi Dress',
    issue: 'Missing size mapping data',
    severity: 'high',
    detected: '18 mins ago',
    status: 'blocked',
  },
  {
    sku: 'SKU-ZAL-781',
    name: 'Oversized Cotton Tee',
    issue: 'Price sync failure',
    severity: 'medium',
    detected: '1 hour ago',
    status: 'pending',
  },
];

interface QuantityErrorItem {
  sku: string;
  name: string;
  errType: 'sizing' | 'texture' | 'price';
  errSummary: string;
  detected: string;
  thumbEmoji: string;
  thumbBg: string;
}

const QUANTITY_ERROR_DATA: QuantityErrorItem[] = [
  {
    sku: 'SKU-ZAL-9901',
    name: 'Linen Blend Blazer',
    errType: 'sizing',
    errSummary: 'Size table lacks chest and shoulder circumference',
    detected: '14 mins ago',
    thumbEmoji: '🧥',
    thumbBg: '#D9C8B4',
  },
  {
    sku: 'SKU-ZAL-9904',
    name: 'Stretch Denim Shorts',
    errType: 'texture',
    errSummary: 'Diffuse texture map resolution under 1024x1024 minimum',
    detected: '22 mins ago',
    thumbEmoji: '👖',
    thumbBg: '#93B3D2',
  },
  {
    sku: 'SKU-ZAL-9912',
    name: 'Cashmere Scarf',
    errType: 'price',
    errSummary: 'Price currency missing in XML feed payload',
    detected: '1 hour ago',
    thumbEmoji: '🧣',
    thumbBg: '#E8D4C0',
  },
];

export const InventorySync: React.FC<InventorySyncProps> = ({
  t,
  currentLang,
  onLanguageChange,
  brandName = 'Zalando SE',
  onNavigateToOverview,
  onNavigateToCatalog,
  onNavigateToInStore,
  onNavigateToCampaigns,
  onNavigateToSales,
  onNavigateToDevSettings,
  onSignOut,
  initialTab = 'stock',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [catalogMenuOpen, setCatalogMenuOpen] = useState(false);
  const [inventoryMenuOpen, setInventoryMenuOpen] = useState(true);
  const [instoreDropdownOpen, setInstoreDropdownOpen] = useState(false);
  const [salesDropdownOpen, setSalesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mainWrapperRef.current?.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (!notifPanelOpen) return;
    const handle = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [notifPanelOpen]);

  const filteredStock = STOCK_DATA.filter(item => {
    const q = searchQuery.toLowerCase();
    return !q || item.sku.toLowerCase().includes(q) || item.name.toLowerCase().includes(q);
  });

  return (
    <div className="dashboard-layout">
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`dashboard-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* Mobile header */}
        <div className="mobile-drawer-header">
          <FitvisorLogo variant="light" height={28} />
          <button type="button" className="mobile-drawer-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Desktop logo */}
        <div className="sidebar-brand-header desktop-only">
          <FitvisorLogo variant="light" height={30} />
        </div>

        <nav className="sidebar-nav">
          {/* 1. Overview */}
          <button type="button" className="nav-item" onClick={() => { setMobileMenuOpen(false); onNavigateToOverview(); }}>
            <Home size={19} className="nav-icon" />
            <div className="nav-label-box">
              <span className="nav-label-title">1. {t.navOverview}</span>
              <span className="nav-label-sub">{t.navOverviewSub}</span>
            </div>
          </button>

          {/* 2. Catalogue & 3D */}
          <div className="nav-dropdown-group">
            <button type="button" className="nav-item has-dropdown" onClick={() => setCatalogMenuOpen(v => !v)}>
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
                <button type="button" className="sub-nav-item" onClick={() => { setMobileMenuOpen(false); onNavigateToCatalog(); }}>
                  <Shirt size={15} /><span>{t.tabProductCatalog}</span>
                </button>
                <button type="button" className="sub-nav-item" onClick={() => { setMobileMenuOpen(false); onNavigateToCatalog(); }}>
                  <ArrowUpDown size={15} /><span>{t.tabSizeMapping}</span>
                </button>
                <button type="button" className="sub-nav-item" onClick={() => { setMobileMenuOpen(false); onNavigateToCatalog(); }}>
                  <Package size={15} /><span>{t.tabAssetUpload}</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Inventory & Sync — ACTIVE with dropdown */}
          <div className="nav-dropdown-group">
            <button type="button" className="nav-item active has-dropdown" onClick={() => setInventoryMenuOpen(v => !v)}>
              <Package size={19} className="nav-icon" />
              <div className="nav-label-box">
                <span className="nav-label-title">3. {t.navInventory}</span>
                <span className="nav-label-sub">{t.invNavSub}</span>
              </div>
              <span className="nav-dropdown-arrow">
                {inventoryMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>
            {inventoryMenuOpen && (
              <div className="sidebar-subcategories-list">
                <button
                  type="button"
                  className={`sub-nav-item ${activeTab === 'stock' ? 'active-sub' : ''}`}
                  onClick={() => { setActiveTab('stock'); setMobileMenuOpen(false); }}
                >
                  <RefreshCw size={15} /><span>{t.invTabStock}</span>
                </button>
                <button
                  type="button"
                  className={`sub-nav-item ${activeTab === 'quantities' ? 'active-sub' : ''}`}
                  onClick={() => { setActiveTab('quantities'); setMobileMenuOpen(false); }}
                >
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
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="dashboard-main-wrapper" ref={mainWrapperRef}>
        {/* Topbar */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button type="button" className="mobile-hamburger-btn" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>

            <div className="breadcrumb-nav">
              <Home size={15} className="breadcrumb-icon" />
              <span className="breadcrumb-link">{t.navInventory}</span>
              <span className="breadcrumb-divider">›</span>
              <span className="breadcrumb-current">
                {activeTab === 'stock' ? t.invTabStock
                  : activeTab === 'quarantine' ? t.invTabQuarantine
                  : t.invTabQuantities}
              </span>
            </div>

            <div className="topbar-search">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="topbar-right">
            <div className="feed-status-pill">
              <span className="feed-status-dot" />
              <span>{t.catalogFeedActive}</span>
            </div>

            {/* Notification bell */}
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
                  </div>
                  <div className="notif-panel-footer">
                    <button type="button" className="notif-mark-all-btn" onClick={() => setNotifPanelOpen(false)}>
                      {t.notifMarkAllRead}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <LanguageSelector currentLang={currentLang} onLanguageChange={onLanguageChange} />

            <div className="topbar-user-profile-wrapper">
              <button type="button" className="topbar-user-profile" onClick={() => setUserMenuOpen(v => !v)}>
                <div className="topbar-user-avatar"><User size={17} strokeWidth={2.2} /></div>
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
                  <button type="button" className="user-dropdown-item signout-item" onClick={() => { setUserMenuOpen(false); if (onSignOut) onSignOut(); }}>
                    <LogOut size={16} /><span>{t.signOut}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="dashboard-content-area inv-content-area">

          {/* ── STOCK & PRICES TAB ── */}
          {activeTab === 'stock' && (
            <>
              {/* Page header */}
              <div className="inv-page-header">
                <div className="inv-page-header-left">
                  <h1 className="inv-page-title">{t.invPageTitle}</h1>
                  <p className="inv-page-subtitle">{t.invPageSubtitle}</p>
                </div>
                <div className="inv-webhook-badge">
                  <CheckCircle2 size={15} className="inv-webhook-icon" />
                  <div className="inv-webhook-text">
                    <span className="inv-webhook-label">{t.invWebhookConnected}</span>
                    <span className="inv-webhook-sub">{t.invWebhookSyncAgo}</span>
                  </div>
                </div>
              </div>

              {/* KPI cards */}
              <div className="inv-kpi-row">
                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box inv-icon-blue">
                    <Package size={22} />
                  </div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.invTotalLiveSku}</span>
                    <span className="inv-kpi-value">48,200</span>
                  </div>
                </div>

                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box inv-icon-red">
                    <AlertTriangle size={22} />
                  </div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.invOutOfStockSku}</span>
                    <span className="inv-kpi-value">142</span>
                    <span className="inv-kpi-note">({t.invOutOfStockNote})</span>
                  </div>
                </div>

                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box inv-icon-purple">
                    <Zap size={22} />
                  </div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.invAvgLatency}</span>
                    <span className="inv-kpi-value">120ms</span>
                  </div>
                </div>
              </div>

              {/* Stock table */}
              <div className="inv-table-card">
                <div className="inv-table-scroll">
                  <table className="inv-table">
                    <thead>
                      <tr>
                        <th>{t.invColSku}</th>
                        <th>{t.invColWebStock}</th>
                        <th>{t.invColBoutiqueStock}</th>
                        <th>{t.invColPrice}</th>
                        <th>{t.invColLastSynced}</th>
                        <th>{t.invColFreshness}</th>
                        <th>{t.invColAction}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStock.map(item => (
                        <tr key={item.sku} className="inv-table-row">
                          {/* SKU & Name */}
                          <td className="inv-product-cell">
                            <div className="inv-product-inner">
                              <div className="inv-thumb" style={{ background: item.thumbBg }}>
                                <span className="inv-thumb-emoji">{item.thumbEmoji}</span>
                              </div>
                              <div className="inv-product-text">
                                <span className="inv-sku-id">{item.sku}</span>
                                <span className="inv-sku-name">{item.name}</span>
                              </div>
                            </div>
                          </td>

                          {/* Web stock */}
                          <td className={item.webStock === 0 ? 'inv-zero' : ''}>
                            {item.webStock === 0 ? `0 ${currentLang === 'fr' ? 'unités' : 'units'}` : `${item.webStock} ${currentLang === 'fr' ? 'unités' : 'units'}`}
                          </td>

                          {/* Boutique stock */}
                          <td className={item.boutiqueStock === 0 ? 'inv-zero' : ''}>
                            <span>{item.boutiqueStock === 0 ? `0 ${currentLang === 'fr' ? 'unités' : 'units'}` : `${item.boutiqueStock} ${currentLang === 'fr' ? 'unités' : 'units'}`}</span>
                            {item.boutiqueNote && (
                              <span className="inv-boutique-note">({item.boutiqueNote})</span>
                            )}
                          </td>

                          {/* Price */}
                          <td className="inv-price-cell">{item.price}</td>

                          {/* Last synced */}
                          <td className="inv-synced-cell">{item.lastSynced} {t.invMinsAgo}</td>

                          {/* Freshness */}
                          <td>
                            {item.status === 'fresh' ? (
                              <span className="inv-status-pill inv-fresh">
                                <span className="inv-status-dot" />
                                {t.invStatusFresh}
                              </span>
                            ) : (
                              <span className="inv-status-pill inv-depleted">
                                <span className="inv-status-dot" />
                                {t.invStatusDepleted}
                              </span>
                            )}
                          </td>

                          {/* Action */}
                          <td>
                            {item.status === 'fresh' ? (
                              <button type="button" className="inv-btn-adjust" onClick={() => alert(`Adjusting thresholds for ${item.sku}`)}>
                                <SlidersHorizontal size={13} />
                                <span>{t.invBtnAdjust}</span>
                              </button>
                            ) : (
                              <button type="button" className="inv-btn-restock" onClick={() => alert(`Sending restock notice for ${item.sku}`)}>
                                <RotateCcw size={13} />
                                <span>{t.invBtnRestock}</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ── QUARANTINE & ERRORS TAB ── */}
          {activeTab === 'quarantine' && (
            <>
              <div className="inv-page-header">
                <div className="inv-page-header-left">
                  <h1 className="inv-page-title">{t.invQuarantineTitle}</h1>
                  <p className="inv-page-subtitle">{t.invQuarantineSubtitle}</p>
                </div>
              </div>

              <div className="inv-table-card">
                <div className="inv-table-scroll">
                  {QUARANTINE_DATA.length === 0 ? (
                    <p className="catalog-empty-row">{t.invQEmpty}</p>
                  ) : (
                    <table className="inv-table">
                      <thead>
                        <tr>
                          <th>{t.invQColSku}</th>
                          <th>{t.invQColIssue}</th>
                          <th>{t.invQColSeverity}</th>
                          <th>{t.invQColDetected}</th>
                          <th>{t.invQColStatus}</th>
                          <th>{t.invQColAction}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {QUARANTINE_DATA.map(item => (
                          <tr key={item.sku} className="inv-table-row">
                            <td className="inv-product-cell">
                              <div className="inv-product-text" style={{ paddingLeft: 0 }}>
                                <span className="inv-sku-id">{item.sku}</span>
                                <span className="inv-sku-name">{item.name}</span>
                              </div>
                            </td>
                            <td className="inv-issue-cell">{item.issue}</td>
                            <td>
                              <span className={`inv-severity-pill ${item.severity === 'high' ? 'inv-sev-high' : 'inv-sev-medium'}`}>
                                {item.severity === 'high' ? t.invQSevHigh : t.invQSevMedium}
                              </span>
                            </td>
                            <td className="inv-synced-cell">{item.detected}</td>
                            <td>
                              <span className={`inv-qstatus-pill ${item.status === 'blocked' ? 'inv-qstatus-blocked' : 'inv-qstatus-pending'}`}>
                                {item.status === 'blocked' ? t.invQStatusBlocked : t.invQStatusPending}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className={item.status === 'blocked' ? 'inv-btn-restock' : 'inv-btn-adjust'}
                                onClick={() => alert(`${item.status === 'blocked' ? 'Resolving' : 'Reviewing'} ${item.sku}`)}
                              >
                                {item.status === 'blocked' ? (
                                  <><RotateCcw size={13} /><span>{t.invQBtnResolve}</span></>
                                ) : (
                                  <><SlidersHorizontal size={13} /><span>{t.invQBtnReview}</span></>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ── QUANTITIES & ERRORS TAB ── */}
          {activeTab === 'quantities' && (
            <>
              {/* Ingestion notice banner */}
              <div className="inv-ingestion-notice">
                <AlertTriangle size={18} className="inv-ingestion-icon" />
                <p className="inv-ingestion-text">
                  <strong>{t.invIngestionNoticeBold}</strong>{' '}{t.invIngestionNotice}
                </p>
              </div>

              {/* KPI row — 3 cards */}
              <div className="inv-kpi-row">
                {/* Success rate */}
                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box" style={{ background: '#ECFDF3', color: '#12B76A' }}>
                    <CheckCircle2 size={22} />
                  </div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.invQtySuccessRate}</span>
                    <span className="inv-kpi-value">99.95%</span>
                  </div>
                </div>

                {/* Quarantined SKUs */}
                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box inv-icon-red">
                    <AlertTriangle size={22} />
                  </div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.invQtyQuarantinedSkus}</span>
                    <span className="inv-kpi-value">23</span>
                  </div>
                </div>

                {/* Auto Retry Queue */}
                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box inv-icon-blue">
                    <RefreshCw size={22} />
                  </div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">Automatic Retry Queue</span>
                    <span className="inv-kpi-value-active">{t.invQtyRetryQueue}</span>
                    <span className="inv-kpi-note-sm">{t.invQtyRetryQueueSub}</span>
                  </div>
                </div>
              </div>

              {/* Table header row */}
              <div className="inv-q-header-row">
                <h2 className="inv-q-title">{t.invQtyTableTitle} (23)</h2>
                <button
                  type="button"
                  className="inv-retry-btn"
                  onClick={() => alert('Retrying ingestion for all 23 items…')}
                >
                  <RotateCcw size={14} />
                  <span>{t.invQtyRetryAll}</span>
                </button>
              </div>

              {/* Quarantine errors table */}
              <div className="inv-table-card">
                <div className="inv-table-scroll">
                  <table className="inv-table" style={{ minWidth: 820 }}>
                    <thead>
                      <tr>
                        <th>{t.invQtyColIngested}</th>
                        <th>{t.invQtyColTitle}</th>
                        <th>{t.invQtyColErrCategory}</th>
                        <th>{t.invQtyColErrSummary}</th>
                        <th>{t.invQtyColDetected}</th>
                        <th>{t.invQtyColResolution}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {QUANTITY_ERROR_DATA.map(item => (
                        <tr key={item.sku} className="inv-table-row">
                          {/* SKU + thumb */}
                          <td className="inv-product-cell">
                            <div className="inv-product-inner">
                              <div className="inv-thumb" style={{ background: item.thumbBg }}>
                                <span className="inv-thumb-emoji">{item.thumbEmoji}</span>
                              </div>
                              <div className="inv-product-text">
                                <span className="inv-sku-id">{item.sku}</span>
                              </div>
                            </div>
                          </td>

                          {/* Product title */}
                          <td style={{ fontWeight: 600, color: '#101828' }}>{item.name}</td>

                          {/* Error category pill */}
                          <td>
                            {item.errType === 'sizing' && (
                              <span className="inv-errcategory-pill inv-err-sizing">
                                <AlertTriangle size={11} />{t.invQtyErrMissingSizing}
                              </span>
                            )}
                            {item.errType === 'texture' && (
                              <span className="inv-errcategory-pill inv-err-texture">
                                <AlertTriangle size={11} />{t.invQtyErrBadTexture}
                              </span>
                            )}
                            {item.errType === 'price' && (
                              <span className="inv-errcategory-pill inv-err-price">
                                <AlertTriangle size={11} />{t.invQtyErrInvalidPrice}
                              </span>
                            )}
                          </td>

                          {/* Technical summary */}
                          <td>
                            <span className="inv-tech-summary">{item.errSummary}</span>
                          </td>

                          {/* Detected */}
                          <td className="inv-synced-cell">{item.detected}</td>

                          {/* Resolution action */}
                          <td>
                            {item.errType === 'sizing' && (
                              <button
                                type="button"
                                className="inv-action-btn-red"
                                onClick={() => alert(`Fixing sizing for ${item.sku}`)}
                              >
                                <Ruler size={13} />
                                <span>{t.invQtyBtnFixSizing}</span>
                              </button>
                            )}
                            {item.errType === 'texture' && (
                              <button
                                type="button"
                                className="inv-action-btn-outline"
                                onClick={() => alert(`Re-uploading texture for ${item.sku}`)}
                              >
                                <Upload size={13} />
                                <span>{t.invQtyBtnReuploadTexture}</span>
                              </button>
                            )}
                            {item.errType === 'price' && (
                              <button
                                type="button"
                                className="inv-action-btn-outline"
                                onClick={() => alert(`Editing price currency for ${item.sku}`)}
                              >
                                <Pencil size={13} />
                                <span>{t.invQtyBtnEditPrice}</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
};
