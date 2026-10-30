'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Home, Shirt, Package, Store, Megaphone, BarChart3, Settings,
  Search, Bell, ChevronDown, ChevronUp, User, Menu, X, LogOut,
  RefreshCw, Hash, Smartphone, Plus, CheckCircle2, Loader2,
  Pause, Pencil, Eye, Calendar, Coins, MapPin, Sparkles,
  MousePointerClick, TrendingUp, Settings2, AlertCircle, Zap, FileText,
} from 'lucide-react';
import { Translations, Language } from '../translations';
import { FitvisorLogo } from './FitvisorLogo';
import { LanguageSelector } from './LanguageSelector';

type CampTab = 'overview' | 'create';

interface CampaignsAdsProps {
  t: Translations;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  brandName?: string;
  onNavigateToOverview: () => void;
  onNavigateToCatalog: () => void;
  onNavigateToInventory: () => void;
  onNavigateToInStore: () => void;
  onNavigateToSales?: () => void;
  onNavigateToDevSettings?: () => void;
  onSignOut?: () => void;
  initialTab?: CampTab;
}

interface Campaign {
  id: string;
  name: string;
  creative: string;
  thumbEmoji: string;
  thumbBg: string;
  placement: string;
  budget: string;
  spent: string;
  startDate: string;
  endDate: string;
  impressions?: string;
  tryOns?: string;
  status: 'live' | 'pending' | 'draft';
}

const CAMPAIGNS: Campaign[] = [
  {
    id: 'C-001',
    name: 'Autumn Outerwear Showcase',
    creative: 'Featured collection banner + product carousel',
    thumbEmoji: '🧥',
    thumbBg: '#D9C8B4',
    placement: 'Home Screen Featured Rack',
    budget: '€5,000',
    spent: '€3,120',
    startDate: 'Oct 01',
    endDate: 'Oct 31',
    impressions: '42,000',
    tryOns: '3,210',
    status: 'live',
  },
  {
    id: 'C-002',
    name: 'Denim Fit Capsule',
    creative: 'Lifestyle + fit suggestions banner',
    thumbEmoji: '👖',
    thumbBg: '#93B3D2',
    placement: 'Post-Try-On Outfit Suggestions',
    budget: '€3,000',
    spent: '€1,840',
    startDate: 'Oct 10',
    endDate: 'Oct 25',
    impressions: '28,500',
    tryOns: '2,410',
    status: 'live',
  },
  {
    id: 'C-003',
    name: 'Winter Cashmere Preview',
    creative: 'AI stylist recommendation banner',
    thumbEmoji: '🧣',
    thumbBg: '#E8D4C0',
    placement: 'AI Stylist Recommendation Chatbot',
    budget: '€4,000',
    spent: '€0',
    startDate: 'Nov 01',
    endDate: 'Nov 30',
    impressions: undefined,
    tryOns: undefined,
    status: 'pending',
  },
];

type Placement = 'home' | 'posttryon' | 'ai' | '';

interface CampFormErrors {
  name?: string;
  startDate?: string;
  endDate?: string;
  placement?: string;
  budget?: string;
}

const PRODUCTS_FEATURED = [
  { emoji: '🧥', name: 'Tailored Wool Blazer' },
  { emoji: '👖', name: 'Wide-Leg Denim Jeans' },
  { emoji: '👗', name: 'Silk Slip Dress' },
  { emoji: '👕', name: 'Oversized Tee' },
];

export const CampaignsAds: React.FC<CampaignsAdsProps> = ({
  t,
  currentLang,
  onLanguageChange,
  brandName = 'Zalando SE',
  onNavigateToOverview,
  onNavigateToCatalog,
  onNavigateToInventory,
  onNavigateToInStore,
  onNavigateToSales,
  onNavigateToDevSettings,
  onSignOut,
  initialTab = 'overview',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [inventoryDropdownOpen, setInventoryDropdownOpen] = useState(false);
  const [instoreDropdownOpen, setInstoreDropdownOpen] = useState(false);
  const [salesDropdownOpen, setSalesDropdownOpen] = useState(false);
  const [launchOpen, setLaunchOpen] = useState(false);

  // Form state
  const [campName, setCampName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [placement, setPlacement] = useState<Placement>('');
  const [budget, setBudget] = useState('');
  const [dailyCap, setDailyCap] = useState('');
  const [formErrors, setFormErrors] = useState<CampFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>(CAMPAIGNS);

  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => { mainWrapperRef.current?.scrollTo({ top: 0 }); }, []);
  useEffect(() => {
    if (!notifPanelOpen) return;
    const h = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifPanelOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [notifPanelOpen]);

  const liveCampaigns = campaigns.filter(c => c.status === 'live').length;

  const validateForm = (): CampFormErrors => {
    const e: CampFormErrors = {};
    if (!campName.trim()) e.name = t.campErrName;
    if (!startDate) e.startDate = t.campErrStartDate;
    if (!endDate) e.endDate = t.campErrEndDate;
    if (!placement) e.placement = t.campErrPlacement;
    if (!budget.trim()) e.budget = t.campErrBudget;
    return e;
  };

  const handleSubmit = () => {
    const errs = validateForm();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setFormErrors({});
    setSubmitting(true);
    setTimeout(() => {
      const newCamp: Campaign = {
        id: `C-${Date.now()}`,
        name: campName.trim(),
        creative: placement === 'home' ? t.campPlacementHomeDesc : placement === 'posttryon' ? t.campPlacementPostTryonDesc : t.campPlacementAIDesc,
        thumbEmoji: '📣',
        thumbBg: '#EDE9FE',
        placement: placement === 'home' ? t.campPlacementHome : placement === 'posttryon' ? t.campPlacementPostTryon : t.campPlacementAI,
        budget,
        spent: '€0',
        startDate: startDate,
        endDate: endDate,
        status: 'pending',
      };
      setCampaigns(prev => [...prev, newCamp]);
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setLaunchOpen(false);
        setCampName(''); setStartDate(''); setEndDate('');
        setPlacement(''); setBudget(''); setDailyCap('');
        setFormErrors({}); setSubmitting(false); setSubmitted(false);
      }, 1200);
    }, 1000);
  };

  const handleSaveDraft = () => {
    const newDraft: Campaign = {
      id: `C-draft-${Date.now()}`,
      name: campName.trim() || 'Untitled Draft',
      creative: '',
      thumbEmoji: '📋',
      thumbBg: '#F1F5F9',
      placement: placement === 'home' ? t.campPlacementHome : placement === 'posttryon' ? t.campPlacementPostTryon : placement === 'ai' ? t.campPlacementAI : '—',
      budget: budget || '€0',
      spent: '€0',
      startDate: startDate || '—',
      endDate: endDate || '—',
      status: 'draft',
    };
    setCampaigns(prev => [...prev, newDraft]);
    setLaunchOpen(false);
    setCampName(''); setStartDate(''); setEndDate('');
    setPlacement(''); setBudget(''); setDailyCap('');
    setFormErrors({});
  };

  const handleCloseModal = () => {
    setLaunchOpen(false);
    setCampName(''); setStartDate(''); setEndDate('');
    setPlacement(''); setBudget(''); setDailyCap('');
    setFormErrors({}); setSubmitting(false); setSubmitted(false);
  };

  return (
    <div className="dashboard-layout">
      {/* ── Launch Campaign Modal ── */}
      {launchOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="camp-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="camp-modal-header">
              <div>
                <h2 className="camp-modal-title">{t.campModalTitle}</h2>
                <p className="camp-modal-subtitle">{t.campModalSubtitle}</p>
              </div>
              <button type="button" className="modal-close-btn" onClick={handleCloseModal} aria-label="Close"><X size={18} /></button>
            </div>

            <div className="camp-modal-body">
              {/* Section 1: Campaign Details */}
              <div className="camp-modal-section">
                <h3 className="camp-modal-sec-title">{t.campModalSec1}</h3>
                <div className="camp-modal-grid-2">
                  {/* Name */}
                  <div className="apg-field" style={{ gridColumn: '1 / -1' }}>
                    <label className="apg-label">{t.campModalNameLabel} <span className="apg-required">*</span></label>
                    <div className={`apg-input-wrap ${formErrors.name ? 'apg-err' : ''}`}>
                      <Megaphone size={15} className="apg-icon" />
                      <input type="text" className="apg-input" placeholder={t.campModalNamePlaceholder}
                        value={campName} onChange={e => { setCampName(e.target.value); setFormErrors(p => ({ ...p, name: undefined })); }} />
                    </div>
                    {formErrors.name && <span className="apg-error">{formErrors.name}</span>}
                  </div>

                  {/* Start Date */}
                  <div className="apg-field">
                    <label className="apg-label">{t.campModalStartDate} <span className="apg-required">*</span></label>
                    <div className={`apg-input-wrap ${formErrors.startDate ? 'apg-err' : ''}`}>
                      <Calendar size={15} className="apg-icon" />
                      <input type="date" className="apg-input" value={startDate}
                        onChange={e => { setStartDate(e.target.value); setFormErrors(p => ({ ...p, startDate: undefined })); }} />
                    </div>
                    {formErrors.startDate && <span className="apg-error">{formErrors.startDate}</span>}
                  </div>

                  {/* End Date */}
                  <div className="apg-field">
                    <label className="apg-label">{t.campModalEndDate} <span className="apg-required">*</span></label>
                    <div className={`apg-input-wrap ${formErrors.endDate ? 'apg-err' : ''}`}>
                      <Calendar size={15} className="apg-icon" />
                      <input type="date" className="apg-input" value={endDate}
                        onChange={e => { setEndDate(e.target.value); setFormErrors(p => ({ ...p, endDate: undefined })); }} />
                    </div>
                    {formErrors.endDate && <span className="apg-error">{formErrors.endDate}</span>}
                  </div>
                </div>
              </div>

              {/* Section 2: Placement */}
              <div className="camp-modal-section">
                <h3 className="camp-modal-sec-title">{t.campModalSec2}</h3>
                <p className="camp-modal-sec-sub">{t.campModalSec2Sub}</p>
                {formErrors.placement && <span className="apg-error" style={{ marginBottom: 8, display: 'block' }}>{formErrors.placement}</span>}
                <div className="camp-placement-grid">
                  {[
                    { key: 'home' as Placement, icon: <Home size={26} />, title: t.campPlacementHome, desc: t.campPlacementHomeDesc },
                    { key: 'posttryon' as Placement, icon: <Shirt size={26} />, title: t.campPlacementPostTryon, desc: t.campPlacementPostTryonDesc },
                    { key: 'ai' as Placement, icon: <Sparkles size={26} />, title: t.campPlacementAI, desc: t.campPlacementAIDesc },
                  ].map(opt => (
                    <button key={opt.key} type="button"
                      className={`camp-placement-card ${placement === opt.key ? 'camp-placement-selected' : ''}`}
                      onClick={() => { setPlacement(opt.key); setFormErrors(p => ({ ...p, placement: undefined })); }}>
                      <div className="camp-placement-radio">
                        {placement === opt.key ? <span className="camp-radio-dot" /> : null}
                      </div>
                      <div className="camp-placement-icon">{opt.icon}</div>
                      <span className="camp-placement-title">{opt.title}</span>
                      <span className="camp-placement-desc">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 3: Products */}
              <div className="camp-modal-section">
                <h3 className="camp-modal-sec-title">{t.campModalSec3}</h3>
                <p className="camp-modal-sec-sub">{t.campModalSec3Sub}</p>
                <div className="camp-product-tags">
                  {PRODUCTS_FEATURED.map(p => (
                    <span key={p.name} className="camp-product-tag">
                      <span>{p.emoji}</span>
                      <span>{p.name}</span>
                      <button type="button" className="camp-tag-remove" aria-label="Remove"><X size={11} /></button>
                    </span>
                  ))}
                  <span className="camp-product-more">+1 more</span>
                </div>
              </div>

              {/* Section 4: Budget */}
              <div className="camp-modal-section">
                <h3 className="camp-modal-sec-title">{t.campModalSec4}</h3>
                <p className="camp-modal-sec-sub">{t.campModalSec4Sub}</p>
                <div className="camp-modal-grid-2">
                  <div className="apg-field">
                    <label className="apg-label">{t.campBudgetLabel} <span className="apg-required">*</span></label>
                    <div className={`apg-input-wrap ${formErrors.budget ? 'apg-err' : ''}`}>
                      <Coins size={15} className="apg-icon" />
                      <input type="text" className="apg-input" placeholder={t.campBudgetPlaceholder}
                        value={budget} onChange={e => { setBudget(e.target.value); setFormErrors(p => ({ ...p, budget: undefined })); }} />
                    </div>
                    {formErrors.budget && <span className="apg-error">{formErrors.budget}</span>}
                  </div>
                  <div className="apg-field">
                    <label className="apg-label">{t.campDailyCapLabel}</label>
                    <div className="apg-input-wrap">
                      <Calendar size={15} className="apg-icon" />
                      <input type="text" className="apg-input" placeholder={t.campDailyCapPlaceholder}
                        value={dailyCap} onChange={e => setDailyCap(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              {submitted && (
                <div className="apg-success" style={{ marginTop: 4 }}>
                  <CheckCircle2 size={18} /><span>{t.campSubmitSuccess}</span>
                </div>
              )}
            </div>

            <div className="camp-modal-footer">
              <button type="button" className="camp-draft-btn" onClick={handleSaveDraft} disabled={submitting}>{t.campSaveDraft}</button>
              <button type="button" className="apg-save" onClick={handleSubmit} disabled={submitting || submitted}>
                {submitting ? <><Loader2 size={16} className="animate-spin" /><span>{t.campSubmitting}</span></>
                  : submitted ? <><CheckCircle2 size={16} /><span>{t.campSubmitted}</span></>
                  : <span>{t.campSubmit}</span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />}

      {/* ── SIDEBAR ── */}
      <aside className={`dashboard-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="mobile-drawer-header">
          <FitvisorLogo variant="light" height={28} />
          <button type="button" className="mobile-drawer-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close"><X size={20} /></button>
        </div>
        <div className="sidebar-brand-header desktop-only">
          <FitvisorLogo variant="light" height={30} />
        </div>

        <nav className="sidebar-nav">
          {/* 1. Overview */}
          <button type="button" className="nav-item" onClick={() => { onNavigateToOverview(); setMobileMenuOpen(false); }}>
            <Home size={19} className="nav-icon" />
            <div className="nav-label-box">
              <span className="nav-label-title">1. {t.navOverview}</span>
              <span className="nav-label-sub">{t.navOverviewSub}</span>
            </div>
          </button>

          {/* 2. Catalogue */}
          <div className="nav-dropdown-group">
            <button type="button" className="nav-item has-dropdown" onClick={() => setCatalogDropdownOpen(!catalogDropdownOpen)}>
              <Shirt size={19} className="nav-icon" />
              <div className="nav-label-box">
                <span className="nav-label-title">2. {t.navCatalogue}</span>
                <span className="nav-label-sub">{t.navCatalogueSub}</span>
              </div>
              <span className="nav-dropdown-arrow">{catalogDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
            </button>
            {catalogDropdownOpen && (
              <div className="sidebar-subcategories-list">
                <button type="button" className="sub-nav-item" onClick={() => { onNavigateToCatalog(); setMobileMenuOpen(false); }}>
                  <Shirt size={15} /><span>{t.tabProductCatalog}</span>
                </button>
                <button type="button" className="sub-nav-item" onClick={() => { onNavigateToCatalog(); setMobileMenuOpen(false); }}>
                  <Hash size={15} /><span>{t.tabSizeMapping}</span>
                </button>
                <button type="button" className="sub-nav-item" onClick={() => { onNavigateToCatalog(); setMobileMenuOpen(false); }}>
                  <Package size={15} /><span>{t.tabAssetUpload}</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Inventory */}
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
                <button type="button" className="sub-nav-item" onClick={() => { onNavigateToInventory(); setMobileMenuOpen(false); }}>
                  <RefreshCw size={15} /><span>{t.invTabStock}</span>
                </button>
                <button type="button" className="sub-nav-item" onClick={() => { onNavigateToInventory(); setMobileMenuOpen(false); }}>
                  <Hash size={15} /><span>{t.invTabQuantities}</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. In-Store */}
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
                <button type="button" className="sub-nav-item" onClick={() => { onNavigateToInStore(); setMobileMenuOpen(false); }}>
                  <Store size={15} /><span>{t.instoreTabStores}</span>
                </button>
                <button type="button" className="sub-nav-item" onClick={() => { onNavigateToInStore(); setMobileMenuOpen(false); }}>
                  <Smartphone size={15} /><span>{t.instoreTabFitting}</span>
                </button>
              </div>
            )}
          </div>

          {/* 5. Campaigns — ACTIVE */}
          <button type="button" className="nav-item active">
            <Megaphone size={19} className="nav-icon" />
            <div className="nav-label-box">
              <span className="nav-label-title">5. {t.navCampaigns}</span>
              <span className="nav-label-sub">{t.campNavSub}</span>
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
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button type="button" className="mobile-hamburger-btn" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
            <div className="breadcrumb-nav">
              <Home size={15} className="breadcrumb-icon" />
              <span className="breadcrumb-link">{t.navCampaigns}</span>
              <span className="breadcrumb-divider">›</span>
              <span className="breadcrumb-current">{t.campTabOverview}</span>
            </div>
            <div className="topbar-search">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder={t.searchPlaceholder} className="search-input" readOnly />
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
                    <button type="button" className="notif-mark-all-btn" onClick={() => setNotifPanelOpen(false)}>{t.notifMarkAllRead}</button>
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
          {/* ── CAMPAIGNS OVERVIEW ── */}
          <>
              {/* Page header */}
              <div className="inv-page-header">
                <div className="inv-page-header-left">
                  <h1 className="inv-page-title">{t.campPageTitle}</h1>
                  <p className="inv-page-subtitle">{t.campPageSubtitle}</p>
                </div>
                <button type="button" className="ist-register-btn" onClick={() => setLaunchOpen(true)}>
                  <Plus size={16} strokeWidth={2.5} /><span>{t.campLaunchBtn}</span>
                </button>
              </div>

              {/* KPI cards */}
              <div className="inv-kpi-row">
                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box" style={{ background: '#EFF6FF', color: '#3B82F6' }}>
                    <Megaphone size={22} />
                  </div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.campKpiActive}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="inv-kpi-value">{liveCampaigns} {currentLang === 'fr' ? 'En Direct' : 'Live'}</span>
                      <span className="camp-live-dot" />
                    </div>
                  </div>
                </div>
                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box" style={{ background: '#F0FDF4', color: '#16A34A' }}>
                    <Coins size={22} />
                  </div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.campKpiSpend}</span>
                    <span className="inv-kpi-value">€8,400</span>
                  </div>
                </div>
                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box" style={{ background: '#FDF4FF', color: '#9333EA' }}>
                    <MousePointerClick size={22} />
                  </div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.campKpiCtr}</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                      <span className="inv-kpi-value">4.8%</span>
                      <span style={{ fontSize: 12, color: '#64748B' }}>({t.campKpiBenchmark})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaigns table */}
              <div className="inv-table-card">
                <div className="inv-table-scroll">
                  <table className="inv-table camp-table">
                    <thead>
                      <tr>
                        <th>{t.campColName}</th>
                        <th>{t.campColPlacement}</th>
                        <th>{t.campColBudget}</th>
                        <th>{t.campColDates}</th>
                        <th>{t.campColImpressions}</th>
                        <th>{t.campColStatus}</th>
                        <th>{t.campColActions}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map(camp => (
                        <tr key={camp.id} className="inv-table-row">
                          {/* Name + creative */}
                          <td className="inv-product-cell">
                            <div className="inv-product-inner">
                              <div className="inv-thumb" style={{ background: camp.thumbBg }}>
                                <span className="inv-thumb-emoji">{camp.thumbEmoji}</span>
                              </div>
                              <div className="inv-product-text">
                                <span style={{ fontWeight: 700, color: '#101828', fontSize: 13 }}>{camp.name}</span>
                                <span style={{ fontSize: 11.5, color: '#64748B' }}>{camp.creative}</span>
                              </div>
                            </div>
                          </td>

                          {/* Placement */}
                          <td>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                              <MapPin size={13} style={{ color: '#64748B', flexShrink: 0, marginTop: 2 }} />
                              <span style={{ fontSize: 12.5, color: '#344054' }}>{camp.placement}</span>
                            </div>
                          </td>

                          {/* Budget */}
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: 700, fontSize: 13.5 }}>{camp.budget}</span>
                              <span style={{ fontSize: 11.5, color: '#64748B' }}>({camp.spent} {t.campSpent})</span>
                            </div>
                          </td>

                          {/* Dates */}
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                              <Calendar size={13} style={{ color: '#64748B', flexShrink: 0 }} />
                              <span style={{ fontSize: 12.5 }}>{camp.startDate} – {camp.endDate}</span>
                            </div>
                          </td>

                          {/* Impressions */}
                          <td>
                            {camp.impressions ? (
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                  <Eye size={13} style={{ color: '#64748B' }} />
                                  <span style={{ fontSize: 12.5 }}>{camp.impressions} {t.campViews}</span>
                                </div>
                                <span style={{ fontSize: 11.5, color: '#64748B', paddingLeft: 18 }}>{camp.tryOns} {t.campTryOns}</span>
                              </div>
                            ) : (
                              <span style={{ fontSize: 12, color: '#94A3B8' }}>{t.campAwaitingData}</span>
                            )}
                          </td>

                          {/* Status */}
                          <td>
                            {camp.status === 'live' && (
                              <span className="camp-status-pill camp-status-live">
                                <span className="camp-live-dot" />{t.campStatusLive}
                              </span>
                            )}
                            {camp.status === 'pending' && (
                              <span className="camp-status-pill camp-status-pending">
                                <AlertCircle size={12} />{t.campStatusPending}
                              </span>
                            )}
                            {camp.status === 'draft' && (
                              <span className="camp-status-pill camp-status-draft">
                                {t.campStatusDraft}
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td>
                            {camp.status === 'live' && (
                              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                <button type="button" className="camp-action-btn camp-action-outline" onClick={() => alert(`Pausing ${camp.name}`)}>
                                  <Pause size={12} /><span>{t.campBtnPause}</span>
                                </button>
                                <button type="button" className="camp-action-btn camp-action-outline" onClick={() => alert(`Editing ${camp.name}`)}>
                                  <Pencil size={12} /><span>{t.campBtnEdit}</span>
                                </button>
                              </div>
                            )}
                            {camp.status === 'pending' && (
                              <button type="button" className="camp-action-btn camp-action-settings" onClick={() => alert(`Editing settings for ${camp.name}`)}>
                                <Settings2 size={12} /><span>{t.campBtnEditSettings}</span>
                              </button>
                            )}
                            {camp.status === 'draft' && (
                              <button type="button" className="camp-action-btn camp-action-outline" onClick={() => alert(`Editing draft ${camp.name}`)}>
                                <Pencil size={12} /><span>{t.campBtnEdit}</span>
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
        </main>
      </div>
    </div>
  );
};
