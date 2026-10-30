'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Home, Shirt, Package, Store, Megaphone, BarChart3, Settings,
  Search, Bell, ChevronDown, ChevronUp, User, Menu, X, LogOut,
  RefreshCw, Hash, AlertTriangle, MapPin, Smartphone, Wifi,
  Settings2, Plus, CheckCircle2, Loader2, Monitor, Calendar,
  ShoppingBag, Clock, CheckSquare, Archive,
  TrendingUp, FileText,
} from 'lucide-react';
import { Translations, Language } from '../translations';
import { FitvisorLogo } from './FitvisorLogo';
import { LanguageSelector } from './LanguageSelector';

type InStoreTab = 'stores' | 'fitting';

interface InStoreKiosksProps {
  t: Translations;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  brandName?: string;
  onNavigateToOverview: () => void;
  onNavigateToCatalog: () => void;
  onNavigateToInventory: () => void;
  onNavigateToCampaigns?: () => void;
  onNavigateToSales?: () => void;
  onNavigateToDevSettings?: () => void;
  onSignOut?: () => void;
  initialTab?: InStoreTab;
}

interface StoreLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  terminalCount: number;
  terminalNotes: string;
  feedStatus: 'connected' | 'disconnected';
  hardwareStatus: 'online' | 'firmware' | 'offline';
  appVersion?: string;
  image: string;
}

const STORE_DATA: StoreLocation[] = [
  {
    id: 'store-001',
    name: 'Zalando Hub Paris',
    city: 'Paris',
    address: '14 Rue de Rivoli, 75001 Paris',
    terminalCount: 3,
    terminalNotes: 'Terminals #1, #2, #3',
    feedStatus: 'connected',
    hardwareStatus: 'online',
    appVersion: 'App v2.4',
    image: '🏪',
  },
  {
    id: 'store-002',
    name: 'Zalando Outlet Lyon',
    city: 'Lyon',
    address: '45 Rue de la République, 69002 Lyon',
    terminalCount: 2,
    terminalNotes: 'Terminals #4, #5',
    feedStatus: 'connected',
    hardwareStatus: 'online',
    image: '🏬',
  },
  {
    id: 'store-003',
    name: 'Zalando Marseille',
    city: 'Marseille',
    address: '82 La Canebière, 13001 Marseille',
    terminalCount: 1,
    terminalNotes: 'Terminal #6',
    feedStatus: 'connected',
    hardwareStatus: 'firmware',
    image: '🏣',
  },
];

interface RegFormErrors {
  name?: string;
  city?: string;
  address?: string;
  terminals?: string;
}

export const InStoreKiosks: React.FC<InStoreKiosksProps> = ({
  t,
  currentLang,
  onLanguageChange,
  brandName = 'Zalando SE',
  onNavigateToOverview,
  onNavigateToCatalog,
  onNavigateToInventory,
  onNavigateToCampaigns,
  onNavigateToSales,
  onNavigateToDevSettings,
  onSignOut,
  initialTab = 'stores',
}) => {
  const [activeTab, setActiveTab] = useState<InStoreTab>(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [catalogMenuOpen, setCatalogMenuOpen] = useState(false);
  const [inventoryMenuOpen, setInventoryMenuOpen] = useState(false);
  const [instoreMenuOpen, setInstoreMenuOpen] = useState(true);
  const [salesDropdownOpen, setSalesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [registerOpen, setRegisterOpen] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regCity, setRegCity] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regTerminals, setRegTerminals] = useState('');
  const [regErrors, setRegErrors] = useState<RegFormErrors>({});
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [stores, setStores] = useState<StoreLocation[]>(STORE_DATA);

  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => { mainWrapperRef.current?.scrollTo({ top: 0 }); }, []);

  useEffect(() => {
    if (!notifPanelOpen) return;
    const handle = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifPanelOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [notifPanelOpen]);

  const filteredStores = stores.filter(s => {
    const q = searchQuery.toLowerCase();
    return !q || s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q);
  });

  const totalTerminals = stores.reduce((sum, s) => sum + s.terminalCount, 0);
  const totalScans = 14200;

  // Register form validation
  const validateReg = (): RegFormErrors => {
    const e: RegFormErrors = {};
    if (!regName.trim()) e.name = t.instoreRegErrName;
    if (!regCity.trim()) e.city = t.instoreRegErrCity;
    if (!regAddress.trim()) e.address = t.instoreRegErrAddress;
    const n = parseInt(regTerminals, 10);
    if (!regTerminals.trim() || isNaN(n) || n < 1) e.terminals = t.instoreRegErrTerminals;
    return e;
  };

  const handleRegisterSubmit = () => {
    const errs = validateReg();
    if (Object.keys(errs).length > 0) { setRegErrors(errs); return; }
    setRegErrors({});
    setRegSubmitting(true);
    setTimeout(() => {
      const n = parseInt(regTerminals, 10);
      const newStore: StoreLocation = {
        id: `store-${Date.now()}`,
        name: regName.trim(),
        city: regCity.trim(),
        address: regAddress.trim(),
        terminalCount: n,
        terminalNotes: `Terminal${n > 1 ? 's' : ''} #${totalTerminals + 1}${n > 1 ? `–#${totalTerminals + n}` : ''}`,
        feedStatus: 'connected',
        hardwareStatus: 'online',
        image: '🏪',
      };
      setStores(prev => [...prev, newStore]);
      setRegSubmitting(false);
      setRegSubmitted(true);
      setTimeout(() => {
        setRegisterOpen(false);
        setRegName(''); setRegCity(''); setRegAddress(''); setRegTerminals('');
        setRegErrors({}); setRegSubmitting(false); setRegSubmitted(false);
      }, 1000);
    }, 1000);
  };

  const handleRegClose = () => {
    setRegisterOpen(false);
    setRegName(''); setRegCity(''); setRegAddress(''); setRegTerminals('');
    setRegErrors({}); setRegSubmitting(false); setRegSubmitted(false);
  };

  return (
    <div className="dashboard-layout">
      {/* Register Modal */}
      {registerOpen && (
        <div className="modal-backdrop" onClick={handleRegClose}>
          <div className="ist-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            {/* Header */}
            <div className="ist-modal-header">
              <div>
                <h2 className="ist-modal-title">{t.instoreRegModalTitle}</h2>
                <p className="ist-modal-subtitle">{t.instoreRegModalSubtitle}</p>
              </div>
              <button type="button" className="modal-close-btn" onClick={handleRegClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="ist-modal-body">
              <div className="ist-modal-grid">
                {/* Store Name */}
                <div className="apg-field">
                  <label className="apg-label">{t.instoreRegStoreName} <span className="apg-required">*</span></label>
                  <div className={`apg-input-wrap ${regErrors.name ? 'apg-err' : ''}`}>
                    <Store size={15} className="apg-icon" />
                    <input type="text" className="apg-input" placeholder={t.instoreRegStoreNamePlaceholder}
                      value={regName} onChange={e => { setRegName(e.target.value); setRegErrors(p => ({ ...p, name: undefined })); }} />
                  </div>
                  {regErrors.name && <span className="apg-error">{regErrors.name}</span>}
                </div>

                {/* City */}
                <div className="apg-field">
                  <label className="apg-label">{t.instoreRegCity} <span className="apg-required">*</span></label>
                  <div className={`apg-input-wrap ${regErrors.city ? 'apg-err' : ''}`}>
                    <MapPin size={15} className="apg-icon" />
                    <input type="text" className="apg-input" placeholder={t.instoreRegCityPlaceholder}
                      value={regCity} onChange={e => { setRegCity(e.target.value); setRegErrors(p => ({ ...p, city: undefined })); }} />
                  </div>
                  {regErrors.city && <span className="apg-error">{regErrors.city}</span>}
                </div>

                {/* Address — full width */}
                <div className="apg-field ist-modal-full">
                  <label className="apg-label">{t.instoreRegAddress} <span className="apg-required">*</span></label>
                  <div className={`apg-input-wrap ${regErrors.address ? 'apg-err' : ''}`}>
                    <MapPin size={15} className="apg-icon" />
                    <input type="text" className="apg-input" placeholder={t.instoreRegAddressPlaceholder}
                      value={regAddress} onChange={e => { setRegAddress(e.target.value); setRegErrors(p => ({ ...p, address: undefined })); }} />
                  </div>
                  {regErrors.address && <span className="apg-error">{regErrors.address}</span>}
                </div>

                {/* Terminal count */}
                <div className="apg-field">
                  <label className="apg-label">{t.instoreRegTerminalCount} <span className="apg-required">*</span></label>
                  <div className={`apg-input-wrap ${regErrors.terminals ? 'apg-err' : ''}`}>
                    <Monitor size={15} className="apg-icon" />
                    <input type="number" min={1} className="apg-input" placeholder={t.instoreRegTerminalCountPlaceholder}
                      value={regTerminals} onChange={e => { setRegTerminals(e.target.value); setRegErrors(p => ({ ...p, terminals: undefined })); }} />
                  </div>
                  {regErrors.terminals && <span className="apg-error">{regErrors.terminals}</span>}
                </div>
              </div>

              {regSubmitted && (
                <div className="apg-success" style={{ marginTop: 12 }}>
                  <CheckCircle2 size={18} /><span>{t.instoreRegSuccessMsg}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="ist-modal-footer">
              <button type="button" className="apg-cancel" onClick={handleRegClose} disabled={regSubmitting}>
                {t.instoreRegCancelBtn}
              </button>
              <button type="button" className="apg-save" onClick={handleRegisterSubmit} disabled={regSubmitting || regSubmitted}>
                {regSubmitting ? <><Loader2 size={16} className="animate-spin" /><span>{t.instoreRegSavingBtn}</span></>
                  : regSubmitted ? <><CheckCircle2 size={16} /><span>{t.instoreRegSavedBtn}</span></>
                  : <><Plus size={16} /><span>{t.instoreRegSaveBtn}</span></>}
              </button>
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`dashboard-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="mobile-drawer-header">
          <FitvisorLogo variant="light" height={28} />
          <button type="button" className="mobile-drawer-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close">
            <X size={20} />
          </button>
        </div>
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

          {/* 2. Catalogue */}
          <div className="nav-dropdown-group">
            <button type="button" className="nav-item has-dropdown" onClick={() => setCatalogMenuOpen(v => !v)}>
              <Shirt size={19} className="nav-icon" />
              <div className="nav-label-box">
                <span className="nav-label-title">2. {t.navCatalogue}</span>
                <span className="nav-label-sub">{t.navCatalogueSub}</span>
              </div>
              <span className="nav-dropdown-arrow">{catalogMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
            </button>
            {catalogMenuOpen && (
              <div className="sidebar-subcategories-list">
                <button type="button" className="sub-nav-item" onClick={() => { setMobileMenuOpen(false); onNavigateToCatalog(); }}>
                  <Shirt size={15} /><span>{t.tabProductCatalog}</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Inventory */}
          <div className="nav-dropdown-group">
            <button type="button" className="nav-item has-dropdown" onClick={() => setInventoryMenuOpen(v => !v)}>
              <Package size={19} className="nav-icon" />
              <div className="nav-label-box">
                <span className="nav-label-title">3. {t.navInventory}</span>
                <span className="nav-label-sub">{t.invNavSub}</span>
              </div>
              <span className="nav-dropdown-arrow">{inventoryMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
            </button>
            {inventoryMenuOpen && (
              <div className="sidebar-subcategories-list">
                <button type="button" className="sub-nav-item" onClick={() => { onNavigateToInventory(); setMobileMenuOpen(false); }}>
                  <RefreshCw size={15} /><span>{t.invTabStock}</span>
                </button>
                <button type="button" className="sub-nav-item" onClick={() => { onNavigateToInventory(); setMobileMenuOpen(false); }}>
                  <Hash size={15} /><span>{t.invTabQuantities}</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. In-Store & Kiosks — ACTIVE */}
          <div className="nav-dropdown-group">
            <button type="button" className="nav-item active has-dropdown" onClick={() => setInstoreMenuOpen(v => !v)}>
              <Store size={19} className="nav-icon" />
              <div className="nav-label-box">
                <span className="nav-label-title">4. {t.navInStore}</span>
                <span className="nav-label-sub">{t.instoreNavSub}</span>
              </div>
              <span className="nav-dropdown-arrow">{instoreMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
            </button>
            {instoreMenuOpen && (
              <div className="sidebar-subcategories-list">
                <button type="button"
                  className={`sub-nav-item ${activeTab === 'stores' ? 'active-sub' : ''}`}
                  onClick={() => { setActiveTab('stores'); setMobileMenuOpen(false); }}>
                  <Store size={15} /><span>{t.instoreTabStores}</span>
                </button>
                <button type="button"
                  className={`sub-nav-item ${activeTab === 'fitting' ? 'active-sub' : ''}`}
                  onClick={() => { setActiveTab('fitting'); setMobileMenuOpen(false); }}>
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
              <span className="breadcrumb-link">{t.navInStore}</span>
              <span className="breadcrumb-divider">›</span>
              <span className="breadcrumb-current">
                {activeTab === 'stores' ? t.instoreTabStores : t.instoreTabFitting}
              </span>
              {activeTab === 'fitting' && (
                <span style={{
                  background: '#E85050', color: '#fff', borderRadius: '9999px',
                  fontSize: '10px', fontWeight: 700, padding: '2px 7px',
                }}>8 Pending</span>
              )}
            </div>
            <div className="topbar-search">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder={t.searchPlaceholder} value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)} className="search-input" />
            </div>
          </div>

          <div className="topbar-right">
            <div className="feed-status-pill">
              <span className="feed-status-dot" /><span>{t.catalogFeedActive}</span>
            </div>
            <div className="notif-wrapper" ref={notifRef}>
              <button type="button" className={`notification-bell-btn ${notifPanelOpen ? 'active' : ''}`}
                aria-label="Notifications" onClick={() => setNotifPanelOpen(v => !v)}>
                <Bell size={18} /><span className="bell-red-badge" />
              </button>
              {notifPanelOpen && (
                <div className="notif-panel" role="dialog">
                  <div className="notif-panel-header">
                    <span className="notif-panel-title">Notifications</span>
                    <span className="notif-unread-badge">2 {t.notifNew}</span>
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
                  <button type="button" className="user-dropdown-item signout-item"
                    onClick={() => { setUserMenuOpen(false); if (onSignOut) onSignOut(); }}>
                    <LogOut size={16} /><span>{t.signOut}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="dashboard-content-area inv-content-area">

          {/* Sub-tab bar */}
          <div className="inv-tab-bar">
            <button type="button" className={`inv-tab-btn ${activeTab === 'stores' ? 'inv-tab-active' : ''}`}
              onClick={() => setActiveTab('stores')}>
              <Store size={14} /><span>{t.instoreTabStores}</span>
            </button>
            <button type="button" className={`inv-tab-btn ${activeTab === 'fitting' ? 'inv-tab-active' : ''}`}
              onClick={() => setActiveTab('fitting')}>
              <Calendar size={14} />
              <span>{t.instoreTabFitting}</span>
              <span style={{
                background: '#E85050', color: '#fff', borderRadius: '9999px',
                fontSize: '10px', fontWeight: 700, padding: '1px 6px', marginLeft: 4,
              }}>8</span>
            </button>
          </div>

          {/* ── STORE LOCATIONS & KIOSKS TAB ── */}
          {activeTab === 'stores' && (
            <>
              {/* Page header */}
              <div className="inv-page-header">
                <div className="inv-page-header-left">
                  <h1 className="inv-page-title">{t.instorePageTitle}</h1>
                  <p className="inv-page-subtitle">{t.instorePageSubtitle}</p>
                </div>
                <button type="button" className="ist-register-btn" onClick={() => setRegisterOpen(true)}>
                  <Plus size={16} strokeWidth={2.5} />
                  <span>{t.instoreRegisterBtn}</span>
                </button>
              </div>

              {/* KPI row */}
              <div className="inv-kpi-row">
                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box" style={{ background: '#EFF6FF', color: '#3B82F6' }}>
                    <Store size={22} />
                  </div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.instoreKpiStores}</span>
                    <span className="inv-kpi-value">{stores.length} {currentLang === 'fr' ? 'Boutiques' : 'Stores'}</span>
                  </div>
                </div>
                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box" style={{ background: '#F0FDF4', color: '#16A34A' }}>
                    <Smartphone size={22} />
                  </div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.instoreKpiTerminals}</span>
                    <span className="inv-kpi-value">{totalTerminals} {currentLang === 'fr' ? 'Terminaux' : 'Terminals'}</span>
                  </div>
                </div>
                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box" style={{ background: '#FDF4FF', color: '#9333EA' }}>
                    <Wifi size={22} />
                  </div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.instoreKpiScans}</span>
                    <span className="inv-kpi-value">{totalScans.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Stores table */}
              <div className="inv-table-card">
                <div className="inv-table-scroll">
                  <table className="inv-table" style={{ minWidth: 800 }}>
                    <thead>
                      <tr>
                        <th>{t.instoreColLocation}</th>
                        <th>{t.instoreColAddress}</th>
                        <th>{t.instoreColKiosks}</th>
                        <th>{t.instoreColFeed}</th>
                        <th>{t.instoreColHardware}</th>
                        <th>{t.instoreColAction}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStores.map(store => (
                        <tr key={store.id} className="inv-table-row">
                          {/* Store name + city */}
                          <td className="inv-product-cell">
                            <div className="inv-product-inner">
                              <div className="ist-store-thumb">
                                <span style={{ fontSize: 22 }}>{store.image}</span>
                              </div>
                              <div className="inv-product-text">
                                <span style={{ fontSize: 13.5, fontWeight: 700, color: '#172554' }}>{store.name}</span>
                                <span style={{ fontSize: 12, color: '#64748B' }}>{store.city}</span>
                              </div>
                            </div>
                          </td>

                          {/* Address */}
                          <td>
                            <div className="ist-address-cell">
                              <MapPin size={13} className="ist-pin-icon" />
                              <span>{store.address}</span>
                            </div>
                          </td>

                          {/* Kiosk terminals */}
                          <td>
                            <div className="ist-terminal-cell">
                              <Smartphone size={14} className="ist-terminal-icon" />
                              <div>
                                <span className="ist-terminal-count">
                                  {store.terminalCount} {store.terminalCount === 1 ? t.instoreTerminalsSingle : t.instoreTerminals}
                                </span>
                                <span className="ist-terminal-notes">({store.terminalNotes})</span>
                              </div>
                            </div>
                          </td>

                          {/* Feed status */}
                          <td>
                            <span className={`ist-feed-pill ${store.feedStatus === 'connected' ? 'ist-feed-connected' : 'ist-feed-disconnected'}`}>
                              <span className="ist-feed-dot" />
                              {store.feedStatus === 'connected' ? t.instoreConnected : 'Disconnected'}
                            </span>
                          </td>

                          {/* Hardware status */}
                          <td>
                            {store.hardwareStatus === 'online' && (
                              <span className="ist-hw-pill ist-hw-online">
                                {t.instoreOnline}{store.appVersion ? ` (${store.appVersion})` : ''}
                              </span>
                            )}
                            {store.hardwareStatus === 'firmware' && (
                              <span className="ist-hw-pill ist-hw-firmware">
                                <AlertTriangle size={12} />{t.instoreFirmwareUpdate}
                              </span>
                            )}
                            {store.hardwareStatus === 'offline' && (
                              <span className="ist-hw-pill ist-hw-offline">Offline</span>
                            )}
                          </td>

                          {/* Action */}
                          <td>
                            <button type="button" className="ist-manage-btn"
                              onClick={() => alert(`Managing kiosks for ${store.name}`)}>
                              <Settings2 size={13} />
                              <span>{t.instoreManageBtn}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ── FITTING RESERVATIONS TAB ── */}
          {activeTab === 'fitting' && (
            <>
              {/* Page header */}
              <div className="inv-page-header">
                <div className="inv-page-header-left">
                  <h1 className="inv-page-title">{t.instoreFittingTitle}</h1>
                  <p className="inv-page-subtitle">{t.instoreFittingSubtitle}</p>
                </div>
              </div>

              {/* Filter bar */}
              <div className="ist-filter-bar">
                {/* Location filter */}
                <div className="ist-filter-group">
                  <div className="ist-filter-label-row">
                    <MapPin size={14} className="ist-filter-icon" />
                    <span className="ist-filter-label">{t.instoreFitFilterLocation}</span>
                  </div>
                  <div className="apg-input-wrap apg-select-wrap" style={{ marginTop: 6 }}>
                    <Store size={14} className="apg-icon" />
                    <select className="apg-select" style={{ height: 40, fontSize: 13 }}>
                      <option value="all">{t.instoreFitAllStores}</option>
                      {stores.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Status filter */}
                <div className="ist-filter-group">
                  <div className="ist-filter-label-row">
                    <span className="ist-filter-label">{t.instoreFitFilterStatus}</span>
                  </div>
                  <div className="ist-status-filter-pills">
                    <button type="button" className="ist-status-pill ist-status-pill-active">
                      <CheckSquare size={13} />
                      <span>{t.instoreFitPendingHold}</span>
                    </button>
                    <button type="button" className="ist-status-pill">
                      <ShoppingBag size={13} />
                      <span>{t.instoreFitPreparedRoom}</span>
                    </button>
                    <button type="button" className="ist-status-pill">
                      <Archive size={13} />
                      <span>{t.instoreFitCompleted}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Reservations table */}
              <div className="inv-table-card">
                <div className="inv-table-scroll">
                  <table className="inv-table" style={{ minWidth: 860 }}>
                    <thead>
                      <tr>
                        <th>{t.instoreFitColHoldId}</th>
                        <th>{t.instoreFitColCustomer}</th>
                        <th>{t.instoreFitColGarment}</th>
                        <th>{t.instoreFitColBoutique}</th>
                        <th>{t.instoreFitColTime}</th>
                        <th>{t.instoreFitColStatus}</th>
                        <th>{t.instoreFitColAction}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Row 1 — Hold in Fitting Room 2 */}
                      <tr className="inv-table-row">
                        <td><span className="ist-hold-id">RES-8921</span></td>
                        <td><span className="ist-customer-id">usr_99a12</span></td>
                        <td>
                          <div className="ist-garment-cell">
                            <div className="ist-garment-thumb" style={{ background: '#D9C8B4' }}>
                              <span style={{ fontSize: 18 }}>🧥</span>
                            </div>
                            <div>
                              <span className="ist-garment-name">Tailored Wool Blazer</span>
                              <span className="ist-garment-size">(Size EU 38, Camel)</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ist-boutique-cell">
                            <MapPin size={12} className="ist-pin-icon" />
                            <div>
                              <span className="ist-boutique-name">Paris Rivoli</span>
                              <span className="ist-boutique-addr">14 Rue de Rivoli,<br />75001 Paris</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ist-time-cell">
                            <Calendar size={13} className="ist-time-icon" />
                            <span>Today at 16:30</span>
                          </div>
                        </td>
                        <td>
                          <span className="ist-hold-status ist-status-hold">
                            <Clock size={12} />{t.instoreFitStatusHold} 2
                          </span>
                        </td>
                        <td>
                          <button type="button" className="ist-action-btn-outline" onClick={() => alert('Marking as picked up…')}>
                            <CheckSquare size={13} />
                            <span>{t.instoreFitBtnPickedUp}</span>
                          </button>
                        </td>
                      </tr>

                      {/* Row 2 — Store Staff Preparing */}
                      <tr className="inv-table-row">
                        <td><span className="ist-hold-id">RES-8919</span></td>
                        <td><span className="ist-customer-id">usr_44c80</span></td>
                        <td>
                          <div className="ist-garment-cell">
                            <div className="ist-garment-thumb" style={{ background: '#93B3D2' }}>
                              <span style={{ fontSize: 18 }}>👖</span>
                            </div>
                            <div>
                              <span className="ist-garment-name">Wide-Leg Denim</span>
                              <span className="ist-garment-size">(Size EU 40)</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ist-boutique-cell">
                            <MapPin size={12} className="ist-pin-icon" />
                            <div>
                              <span className="ist-boutique-name">Paris Rivoli</span>
                              <span className="ist-boutique-addr">14 Rue de Rivoli,<br />75001 Paris</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ist-time-cell">
                            <Calendar size={13} className="ist-time-icon" />
                            <span>Today at 17:15</span>
                          </div>
                        </td>
                        <td>
                          <span className="ist-hold-status ist-status-preparing">
                            <Settings2 size={12} />{t.instoreFitStatusPreparing}
                          </span>
                        </td>
                        <td>
                          <button type="button" className="ist-action-btn-outline ist-action-btn-navy" onClick={() => alert('Assigning to fitting room…')}>
                            <ShoppingBag size={13} />
                            <span>{t.instoreFitBtnAssign}</span>
                          </button>
                        </td>
                      </tr>

                      {/* Row 3 — Confirmed */}
                      <tr className="inv-table-row">
                        <td><span className="ist-hold-id">RES-8910</span></td>
                        <td><span className="ist-customer-id">usr_12e91</span></td>
                        <td>
                          <div className="ist-garment-cell">
                            <div className="ist-garment-thumb" style={{ background: '#E8D4C0' }}>
                              <span style={{ fontSize: 18 }}>🧣</span>
                            </div>
                            <div>
                              <span className="ist-garment-name">Cashmere Crewneck</span>
                              <span className="ist-garment-size">(Size M)</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ist-boutique-cell">
                            <MapPin size={12} className="ist-pin-icon" />
                            <div>
                              <span className="ist-boutique-name">Lyon Store</span>
                              <span className="ist-boutique-addr">45 Rue de la République,<br />69002 Lyon</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ist-time-cell">
                            <Calendar size={13} className="ist-time-icon" />
                            <span>Tomorrow at 11:00</span>
                          </div>
                        </td>
                        <td>
                          <span className="ist-hold-status ist-status-confirmed">
                            <CheckCircle2 size={12} />{t.instoreFitStatusConfirmed}
                          </span>
                        </td>
                        <td>
                          <button type="button" className="ist-action-btn-ghost" onClick={() => alert('Managing hold…')}>
                            <CheckSquare size={13} />
                            <span>{t.instoreFitBtnManage}</span>
                          </button>
                        </td>
                      </tr>
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
