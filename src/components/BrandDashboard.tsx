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
  Calendar,
  ChevronDown,
  ChevronUp,
  User,
  Users,
  MousePointerClick,
  Database,
  Shield,
  Flame,
  ChevronRight,
  AlertTriangle,
  ArrowUpRight,
  Menu,
  X,
  Ruler,
  CloudUpload,
  LogOut,
  RefreshCw,
  Hash,
  Smartphone,
  TrendingUp,
  FileText,
} from 'lucide-react';
import { Translations, Language } from '../translations';
import { FitvisorLogo } from './FitvisorLogo';
import { LanguageSelector } from './LanguageSelector';
import { DateRangeModal } from './DateRangeModal';

interface BrandDashboardProps {
  t: Translations;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  brandName?: string;
  onNavigateToSetup?: () => void;
  onNavigateToCatalog?: () => void;
  onNavigateToCatalogTab?: (tab: 'products' | 'sizing' | 'assets') => void;
  onNavigateToInventory?: () => void;
  onNavigateToInStore?: () => void;
  onNavigateToCampaigns?: () => void;
  onNavigateToSales?: () => void;
  onNavigateToDevSettings?: () => void;
  onSignOut?: () => void;
}

export const BrandDashboard: React.FC<BrandDashboardProps> = ({
  t,
  currentLang,
  onLanguageChange,
  brandName = 'Zalando SE',
  onNavigateToSetup,
  onNavigateToCatalog,
  onNavigateToCatalogTab,
  onNavigateToInventory,
  onNavigateToInStore,
  onNavigateToCampaigns,
  onNavigateToSales,
  onNavigateToDevSettings,
  onSignOut,
}) => {
  const [activeNav, setActiveNav] = useState('overview');
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [inventoryDropdownOpen, setInventoryDropdownOpen] = useState(false);
  const [instoreDropdownOpen, setInstoreDropdownOpen] = useState(false);
  const [salesDropdownOpen, setSalesDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 Days (Oct 2026)');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const mainWrapperRef = useRef<HTMLDivElement>(null);

  // Scroll content area to top whenever this screen mounts
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

  // SVG Chart data points for Oct 01 - Oct 31 (11 ticks)
  const dates = ['Oct 01', 'Oct 04', 'Oct 07', 'Oct 10', 'Oct 13', 'Oct 16', 'Oct 19', 'Oct 22', 'Oct 25', 'Oct 28', 'Oct 31'];
  const tryOns = [4900, 5200, 6100, 5900, 6400, 6200, 7500, 7200, 7800, 8900, 10020];
  const clicks = [2200, 3100, 3300, 3900, 3400, 3900, 4800, 4300, 5100, 5300, 6840];

  const chartW = 580;
  const chartH = 220;
  const maxY = 12000;

  const getX = (idx: number) => 35 + (idx / (dates.length - 1)) * (chartW - 55);
  const getY = (val: number) => chartH - 25 - (val / maxY) * (chartH - 45);

  const createSmoothPath = (data: number[]) => {
    const pts = data.map((v, i) => ({ x: getX(i), y: getY(v) }));
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      d += ` C ${cpX1} ${p0.y}, ${cpX2} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const tryOnPath = createSmoothPath(tryOns);
  const clickPath = createSmoothPath(clicks);

  const tryOnArea = `${tryOnPath} L ${getX(dates.length - 1)} ${chartH - 25} L ${getX(0)} ${chartH - 25} Z`;
  const clickArea = `${clickPath} L ${getX(dates.length - 1)} ${chartH - 25} L ${getX(0)} ${chartH - 25} Z`;

  return (
    <div className="dashboard-layout">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Date Range Modal */}
      <DateRangeModal
        isOpen={dateModalOpen}
        onClose={() => setDateModalOpen(false)}
        onApply={(range) => setSelectedDateRange(range)}
        t={t}
      />

      {/* ==================== LEFT SIDEBAR ==================== */}
      <aside className={`dashboard-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* Mobile Header with Close Button */}
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

        {/* Desktop Brand Header — balanced medium size */}
        <div className="sidebar-brand-header desktop-only">
          <FitvisorLogo
            variant="light"
            height={30}
            showConsoleSubtext={false}
          />
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          <button
            type="button"
            className={`nav-item ${activeNav === 'overview' ? 'active' : ''}`}
            onClick={() => {
              setActiveNav('overview');
              setMobileMenuOpen(false);
            }}
          >
            <Home size={19} className="nav-icon" />
            <div className="nav-label-box">
              <span className="nav-label-title">1. {t.navOverview}</span>
              <span className="nav-label-sub">{t.navOverviewSub}</span>
            </div>
          </button>

          {/* Item 2: Catalogue & 3D with Dropdown */}
          <div className="nav-dropdown-group">
            <button
              type="button"
              className={`nav-item has-dropdown ${activeNav === 'catalogue' ? 'active' : ''}`}
              onClick={() => {
                setCatalogDropdownOpen(!catalogDropdownOpen);
              }}
            >
              <Shirt size={19} className="nav-icon" />
              <div className="nav-label-box">
                <span className="nav-label-title">2. {t.navCatalogue}</span>
                <span className="nav-label-sub">{t.navCatalogueSub}</span>
              </div>
              <span className="nav-dropdown-arrow">
                {catalogDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>

            {catalogDropdownOpen && (
              <div className="sidebar-subcategories-list">
                <button
                  type="button"
                  className="sub-nav-item active-sub"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateToCatalogTab) onNavigateToCatalogTab('products');
                    else if (onNavigateToCatalog) onNavigateToCatalog();
                  }}
                >
                  <Shirt size={15} />
                  <span>{t.tabProductCatalog}</span>
                </button>
                <button
                  type="button"
                  className="sub-nav-item"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateToCatalogTab) onNavigateToCatalogTab('sizing');
                    else if (onNavigateToCatalog) onNavigateToCatalog();
                  }}
                >
                  <Ruler size={15} />
                  <span>{t.tabSizeMapping}</span>
                </button>
                <button
                  type="button"
                  className="sub-nav-item"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateToCatalogTab) onNavigateToCatalogTab('assets');
                    else if (onNavigateToCatalog) onNavigateToCatalog();
                  }}
                >
                  <CloudUpload size={15} />
                  <span>{t.tabAssetUpload}</span>
                </button>
              </div>
            )}
          </div>

          {/* Item 3: Inventory & Sync with dropdown */}
          <div className="nav-dropdown-group">
            <button
              type="button"
              className={`nav-item has-dropdown ${activeNav === 'inventory' ? 'active' : ''}`}
              onClick={() => {
                setInventoryDropdownOpen(v => !v);
                setActiveNav('inventory');
                setMobileMenuOpen(false);
                if (onNavigateToInventory) onNavigateToInventory();
              }}
            >
              <Package size={19} className="nav-icon" />
              <div className="nav-label-box">
                <span className="nav-label-title">3. {t.navInventory}</span>
                <span className="nav-label-sub">{t.invNavSub}</span>
              </div>
              <span className="nav-dropdown-arrow">
                {inventoryDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>
            {inventoryDropdownOpen && (
              <div className="sidebar-subcategories-list">
                <button
                  type="button"
                  className="sub-nav-item"
                  onClick={() => {
                    setActiveNav('inventory');
                    setMobileMenuOpen(false);
                    if (onNavigateToInventory) onNavigateToInventory();
                  }}
                >
                  <RefreshCw size={15} /><span>{t.invTabStock}</span>
                </button>
                <button
                  type="button"
                  className="sub-nav-item"
                  onClick={() => {
                    setActiveNav('inventory');
                    setMobileMenuOpen(false);
                    if (onNavigateToInventory) onNavigateToInventory();
                  }}
                >
                  <Hash size={15} /><span>{t.invTabQuantities}</span>
                </button>
              </div>
            )}
          </div>

          {/* Item 4: In-Store & Kiosks with dropdown */}
          <div className="nav-dropdown-group">
            <button
              type="button"
              className={`nav-item has-dropdown ${activeNav === 'instore' ? 'active' : ''}`}
              onClick={() => {
                setInstoreDropdownOpen(!instoreDropdownOpen);
              }}
            >
              <Store size={19} className="nav-icon" />
              <div className="nav-label-box">
                <span className="nav-label-title">4. {t.navInStore}</span>
                <span className="nav-label-sub">{t.instoreNavSub}</span>
              </div>
              <span className="nav-dropdown-arrow">
                {instoreDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>
            {instoreDropdownOpen && (
              <div className="sidebar-subcategories-list">
                <button type="button" className="sub-nav-item"
                  onClick={() => { 
                    setActiveNav('instore'); 
                    setMobileMenuOpen(false); 
                    if (onNavigateToInStore) onNavigateToInStore(); 
                  }}>
                  <Store size={15} /><span>{t.instoreTabStores}</span>
                </button>
                <button type="button" className="sub-nav-item"
                  onClick={() => { 
                    setActiveNav('instore'); 
                    setMobileMenuOpen(false); 
                    if (onNavigateToInStore) onNavigateToInStore(); 
                  }}>
                  <Smartphone size={15} /><span>{t.instoreTabFitting}</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className={`nav-item ${activeNav === 'campaigns' ? 'active' : ''}`}
            onClick={() => {
              setActiveNav('campaigns');
              setMobileMenuOpen(false);
              if (onNavigateToCampaigns) onNavigateToCampaigns();
            }}
          >
            <Megaphone size={19} className="nav-icon" />
            <div className="nav-label-box">
              <span className="nav-label-title">5. {t.navCampaigns}</span>
              <span className="nav-label-sub">{t.navCampaignsSub}</span>
            </div>
          </button>

          {/* 6. Sales & Earnings with dropdown */}
          <div className="nav-dropdown-group">
            <button
              type="button"
              className={`nav-item has-dropdown ${activeNav === 'sales' ? 'active' : ''}`}
              onClick={() => { setSalesDropdownOpen(!salesDropdownOpen); }}
            >
              <BarChart3 size={19} className="nav-icon" />
              <div className="nav-label-box">
                <span className="nav-label-title">6. {t.navSales}</span>
                <span className="nav-label-sub">{t.salesNavSub}</span>
              </div>
              <span className="nav-dropdown-arrow">{salesDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
            </button>
            {salesDropdownOpen && (
              <div className="sidebar-subcategories-list">
                <button type="button" className="sub-nav-item"
                  onClick={() => { setActiveNav('sales'); setMobileMenuOpen(false); if (onNavigateToSales) onNavigateToSales(); }}>
                  <TrendingUp size={15} /><span>{t.salesTabAttribution}</span>
                </button>
                <button type="button" className="sub-nav-item"
                  onClick={() => { setActiveNav('sales'); setMobileMenuOpen(false); if (onNavigateToSales) onNavigateToSales(); }}>
                  <FileText size={15} /><span>{t.salesTabInvoices}</span>
                </button>
                <button type="button" className="sub-nav-item"
                  onClick={() => { setActiveNav('sales'); setMobileMenuOpen(false); if (onNavigateToSales) onNavigateToSales(); }}>
                  <BarChart3 size={15} /><span>{t.salesTabFitInsights}</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className={`nav-item ${activeNav === 'settings' ? 'active' : ''}`}
            onClick={() => {
              setActiveNav('settings');
              setMobileMenuOpen(false);
              if (onNavigateToDevSettings) onNavigateToDevSettings();
            }}
          >
            <Settings size={19} className="nav-icon" />
            <div className="nav-label-box">
              <span className="nav-label-title">{t.navSettings}</span>
              <span className="nav-label-sub">{t.navSettingsSub}</span>
            </div>
          </button>
        </nav>
      </aside>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="dashboard-main-wrapper" ref={mainWrapperRef}>
        {/* Top Navbar — single row on all screen sizes */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            {/* Mobile Hamburger Button */}
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
              <span className="breadcrumb-link">{brandName.split(' ')[0]}</span>
              <span className="breadcrumb-divider">›</span>
              <span className="breadcrumb-current">Dashboard</span>
            </div>

            <div className="topbar-search">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="search-input"
              />
            </div>
          </div>

          {/* Right side — all in one row */}
          <div className="topbar-right">
            {/* Catalog Feed Status */}
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
                    <button
                      type="button"
                      className="notif-mark-all-btn"
                      onClick={() => setNotifPanelOpen(false)}
                    >
                      {t.notifMarkAllRead}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Earth / Globe Language Switcher */}
            <LanguageSelector
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
            />

            {/* User Profile with Sign Out Dropdown */}
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
                    onClick={() => {
                      setUserMenuOpen(false);
                      if (onSignOut) onSignOut();
                    }}
                  >
                    <LogOut size={16} />
                    <span>{t.signOut}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="dashboard-content-area">
          {/* Page Title & Time Filter Header */}
          <div className="dashboard-header-row">
            <h1 className="dashboard-main-heading">{t.dashboardTitle}</h1>

            <div className="date-controls-group">
              {/* Today Button */}
              <button
                type="button"
                className="today-pill-btn"
                onClick={() => setSelectedDateRange('Today (Oct 26, 2026)')}
              >
                Today
              </button>

              {/* Date Range Selector Pill */}
              <div
                className="date-picker-dropdown"
                onClick={() => setDateModalOpen(true)}
                role="button"
                tabIndex={0}
              >
                <Calendar size={16} className="date-icon" />
                <span>{selectedDateRange}</span>
                <ChevronDown size={14} className="date-chevron" />
              </div>
            </div>
          </div>

          {/* 4 Top KPI Cards */}
          <div className="kpi-cards-grid">
            {/* Card 1: Virtual Try-Ons */}
            <div className="kpi-card">
              <div className="kpi-icon-box purple-bg">
                <Users size={20} className="kpi-icon-purple" />
              </div>
              <span className="kpi-label">{t.kpiVirtualTryOns}</span>
              <div className="kpi-metric-row">
                <span className="kpi-metric-value">84,210</span>
              </div>
              <div className="kpi-trend-row">
                <span className="trend-green">
                  <ArrowUpRight size={14} strokeWidth={2.8} />
                  +22.4% MoM
                </span>
              </div>
              <span className="kpi-subtext">{t.kpiVirtualTryOnsSub}</span>
            </div>

            {/* Card 2: Click-Through to Store (CTR) */}
            <div className="kpi-card">
              <div className="kpi-icon-box pink-bg">
                <MousePointerClick size={20} className="kpi-icon-red" />
              </div>
              <span className="kpi-label">{t.kpiCtr}</span>
              <div className="kpi-metric-row">
                <span className="kpi-metric-value">24.8%</span>
              </div>
              <div className="kpi-trend-row">
                <span className="trend-green">
                  <ArrowUpRight size={14} strokeWidth={2.8} />
                  +3.1%
                </span>
              </div>
              <span className="kpi-subtext">{t.kpiCtrSub}</span>
            </div>

            {/* Card 3: Attributed Gross Sales (GMV) */}
            <div className="kpi-card">
              <div className="kpi-icon-box green-bg">
                <Database size={20} className="kpi-icon-green" />
              </div>
              <span className="kpi-label">{t.kpiGmv}</span>
              <div className="kpi-metric-row">
                <span className="kpi-metric-value">€182,400</span>
              </div>
              <div className="kpi-spacer" />
              <span className="kpi-subtext">{t.kpiGmvSub}</span>
            </div>

            {/* Card 4: Post-Try-On Return Rate */}
            <div className="kpi-card">
              <div className="kpi-icon-box indigo-bg">
                <Shield size={20} className="kpi-icon-indigo" />
              </div>
              <span className="kpi-label">{t.kpiReturnRate}</span>
              <div className="kpi-metric-row">
                <span className="kpi-metric-value">11.2%</span>
              </div>
              <div className="kpi-pill-badge-row">
                <span className="industry-saving-pill">{t.kpiReturnRatePill}</span>
              </div>
            </div>
          </div>

          {/* Main Visuals: Chart & Trending Garments */}
          <div className="charts-and-trending-grid">
            {/* Left: Try-On Engagement vs Store Redirections */}
            <div className="dashboard-panel chart-panel">
              <div className="panel-header">
                <div className="panel-title-group">
                  <BarChart3 size={18} className="panel-icon" />
                  <h2 className="panel-title">{t.chartTitle}</h2>
                </div>

                <div className="chart-legend-row">
                  <div className="legend-item">
                    <span className="legend-dot blue-dot" />
                    <span>{t.chartLegendTryOns}</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot red-dot" />
                    <span>{t.chartLegendClicks}</span>
                  </div>
                </div>
              </div>

              {/* Chart SVG */}
              <div className="chart-svg-container">
                <svg
                  viewBox={`0 0 ${chartW} ${chartH}`}
                  className="spline-chart-svg"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2E3A59" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#2E3A59" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E85050" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#E85050" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  {[12000, 10000, 8000, 6000, 4000, 2000, 0].map((val) => {
                    const y = getY(val);
                    return (
                      <g key={val}>
                        <text
                          x="25"
                          y={y + 4}
                          className="chart-axis-text"
                          textAnchor="end"
                        >
                          {val.toLocaleString()}
                        </text>
                        <line
                          x1="35"
                          y1={y}
                          x2={chartW - 20}
                          y2={y}
                          className="chart-grid-line"
                        />
                      </g>
                    );
                  })}

                  {/* Shaded Areas */}
                  <path d={tryOnArea} fill="url(#blueGradient)" />
                  <path d={clickArea} fill="url(#redGradient)" />

                  {/* Lines */}
                  <path
                    d={tryOnPath}
                    fill="none"
                    stroke="#202A44"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d={clickPath}
                    fill="none"
                    stroke="#E85050"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Terminal dots at Oct 31 */}
                  <circle
                    cx={getX(10)}
                    cy={getY(tryOns[10])}
                    r="4.5"
                    fill="#202A44"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <circle
                    cx={getX(10)}
                    cy={getY(clicks[10])}
                    r="4.5"
                    fill="#E85050"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />

                  {/* X Axis dates */}
                  {dates.map((d, i) => (
                    <text
                      key={d}
                      x={getX(i)}
                      y={chartH - 6}
                      className="chart-axis-text"
                      textAnchor="middle"
                    >
                      {d}
                    </text>
                  ))}
                </svg>
              </div>
            </div>

            {/* Right: Top Trending Garments */}
            <div className="dashboard-panel trending-panel">
              <div className="panel-header">
                <div className="panel-title-group">
                  <Flame size={19} className="trending-fire-icon" />
                  <h2 className="panel-title">{t.trendingTitle}</h2>
                </div>
              </div>

              <div className="garments-list">
                {/* Item 1 */}
                <div className="garment-row">
                  <div className="garment-thumb blazer-thumb">
                    <span className="garment-thumb-icon">🧥</span>
                  </div>
                  <div className="garment-info">
                    <span className="garment-name">{t.garment1Title}</span>
                    <span className="garment-tryons">{t.garment1TryOns}</span>
                  </div>
                  <div className="garment-meta-right">
                    <span className="garment-ctr-badge">28.4% CTR</span>
                    <ChevronRight size={16} className="garment-arrow" />
                  </div>
                </div>

                {/* Item 2 */}
                <div className="garment-row">
                  <div className="garment-thumb denim-thumb">
                    <span className="garment-thumb-icon">👖</span>
                  </div>
                  <div className="garment-info">
                    <span className="garment-name">{t.garment2Title}</span>
                    <span className="garment-tryons">{t.garment2TryOns}</span>
                  </div>
                  <div className="garment-meta-right">
                    <span className="garment-ctr-badge">24.1% CTR</span>
                    <ChevronRight size={16} className="garment-arrow" />
                  </div>
                </div>

                {/* Item 3 */}
                <div className="garment-row">
                  <div className="garment-thumb sweater-thumb">
                    <span className="garment-thumb-icon">🧶</span>
                  </div>
                  <div className="garment-info">
                    <span className="garment-name">{t.garment3Title}</span>
                    <span className="garment-tryons">{t.garment3TryOns}</span>
                  </div>
                  <div className="garment-meta-right">
                    <span className="garment-ctr-badge">22.0% CTR</span>
                    <ChevronRight size={16} className="garment-arrow" />
                  </div>
                </div>

                {/* Item 4 */}
                <div className="garment-row">
                  <div className="garment-thumb trench-thumb">
                    <span className="garment-thumb-icon">🧥</span>
                  </div>
                  <div className="garment-info">
                    <span className="garment-name">{t.garment4Title}</span>
                    <span className="garment-tryons">{t.garment4TryOns}</span>
                  </div>
                  <div className="garment-meta-right">
                    <span className="garment-ctr-badge">19.5% CTR</span>
                    <ChevronRight size={16} className="garment-arrow" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Warning Alert Banner */}
          <div className="sync-quarantine-notice">
            <div className="notice-left">
              <AlertTriangle size={20} className="notice-warning-icon" />
              <span className="notice-text">{t.syncNoticeText}</span>
            </div>

            <div className="notice-right">
              <button
                type="button"
                className="resolve-notice-btn"
                onClick={() => alert('Opening Screen 9: Sizing Specs & Quarantine Resolver...')}
              >
                <span>{t.resolveQuarantinedBtn}</span>
                <span className="btn-arrow">→</span>
              </button>
              <span className="screen-ref-note">{t.clickToScreen9}</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
