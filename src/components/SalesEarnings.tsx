'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Home, Shirt, Package, Store, Megaphone, BarChart3, Settings,
  Search, Bell, ChevronDown, ChevronUp, User, Menu, X, LogOut,
  RefreshCw, Hash, Smartphone, Download, Eye, Link2,
  ShoppingCart, Coins, ArrowRight, FileText, TrendingUp,
  Monitor, CheckCircle, Clock, ChevronRight, AlertTriangle,
  ZoomIn, ZoomOut, CheckCircle2, Loader2,
} from 'lucide-react';
import { Translations, Language } from '../translations';
import { FitvisorLogo } from './FitvisorLogo';
import { LanguageSelector } from './LanguageSelector';

type SalesTab = 'attribution' | 'invoices' | 'fitinsights';

interface SalesEarningsProps {
  t: Translations;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  brandName?: string;
  onNavigateToOverview: () => void;
  onNavigateToCatalog: () => void;
  onNavigateToInventory: () => void;
  onNavigateToInStore: () => void;
  onNavigateToCampaigns: () => void;
  onNavigateToDevSettings?: () => void;
  onSignOut?: () => void;
  initialTab?: SalesTab;
}

interface Order {
  id: string;
  timestamp: string;
  refSku: string;
  refSkuDesc: string;
  itemsCount: number;
  itemsDesc: string;
  total: string;
  channel: 'app' | 'web' | 'kiosk';
  customerStatus: 'new' | 'returning';
}

const ORDERS: Order[] = [
  { id: 'ORD-ZAL-9921', timestamp: 'Oct 18, 14:22', refSku: 'SKU-ZAL-091', refSkuDesc: '(Blazer)', itemsCount: 2, itemsDesc: '(Blazer + Trouser)', total: '€189.80', channel: 'app', customerStatus: 'new' },
  { id: 'ORD-ZAL-9918', timestamp: 'Oct 18, 13:40', refSku: 'SKU-ZAL-044', refSkuDesc: '(Jeans)',  itemsCount: 1, itemsDesc: '', total: '€69.90',  channel: 'web',   customerStatus: 'returning' },
  { id: 'ORD-ZAL-9905', timestamp: 'Oct 18, 12:15', refSku: 'SKU-ZAL-102', refSkuDesc: '(Dress)',  itemsCount: 1, itemsDesc: '', total: '€89.00',  channel: 'kiosk', customerStatus: 'new' },
];

interface InvoiceRow {
  id: string;
  period: string;
  orders: string;
  gmv: string;
  commission: string;
  returns: string;
  returnCount: number;
  netFee: string;
  status: 'accrual' | 'settled';
  current?: boolean;
  pdfUrl?: string;
}

const INVOICE_ROWS: InvoiceRow[] = [
  {
    id: 'INV-2026-10', period: 'October 2026', orders: '4,810', gmv: '€182,400',
    commission: '8.5%', returns: '-€1,240', returnCount: 31, netFee: '€14,264',
    status: 'accrual', current: true,
  },
  {
    id: 'INV-2026-09', period: 'September 2026', orders: '4,120', gmv: '€156,200',
    commission: '8.5%', returns: '-€980',   returnCount: 24, netFee: '€12,297',
    status: 'settled', pdfUrl: 'INV-2026-09.pdf',
  },
  {
    id: 'INV-2026-08', period: 'August 2026', orders: '3,840', gmv: '€142,000',
    commission: '8.5%', returns: '-€840',   returnCount: 20, netFee: '€11,230',
    status: 'settled', pdfUrl: 'INV-2026-08.pdf',
  },
];

interface FitGarment {
  emoji: string;
  label: string;
  labelKey: 'fitGarmentBlazers' | 'fitGarmentJeans' | 'fitGarmentDresses';
  trueToSize: number;
  tooTight: number;
  tooLoose: number;
}

const FIT_GARMENTS: FitGarment[] = [
  { emoji: '🧥', label: 'Blazers',  labelKey: 'fitGarmentBlazers', trueToSize: 82, tooTight: 11, tooLoose: 7  },
  { emoji: '👖', label: 'Jeans',    labelKey: 'fitGarmentJeans',   trueToSize: 82, tooTight: 10, tooLoose: 8  },
  { emoji: '👗', label: 'Dresses',  labelKey: 'fitGarmentDresses', trueToSize: 81, tooTight: 12, tooLoose: 7  },
];

function buildCsv(orders: Order[], t: Translations): string {
  const headers = [t.salesColOrderId, t.salesColTimestamp, t.salesColSku, t.salesColItems, t.salesColTotal, t.salesColChannel, t.salesColCustomer].join(',');
  const rows = orders.map(o => [
    o.id, o.timestamp,
    `${o.refSku} ${o.refSkuDesc}`,
    `${o.itemsCount}${o.itemsDesc ? ' ' + o.itemsDesc : ''}`,
    o.total,
    o.channel === 'app' ? t.salesChannelApp : o.channel === 'web' ? t.salesChannelWeb : t.salesChannelKiosk,
    o.customerStatus === 'new' ? t.salesNewCustomer : t.salesReturning,
  ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));
  return [headers, ...rows].join('\r\n');
}

function buildFitCsv(t: Translations): string {
  const headers = ['SKU / Garment', t.fitLegendTrue, t.fitLegendTight, t.fitLoose].join(',');
  const rows = [
    ['SKU-ZAL-091 / ' + t.fitGarmentBlazers, '82%', '11%', '7%'],
    ['SKU-ZAL-044 / ' + t.fitGarmentJeans,   '82%', '10%', '8%'],
    ['SKU-ZAL-102 / ' + t.fitGarmentDresses, '81%', '12%', '7%'],
  ].map(r => r.map(v => `"${v}"`).join(','));
  return [headers, ...rows].join('\r\n');
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob(['\uFEFF' + content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const SalesEarnings: React.FC<SalesEarningsProps> = ({
  t,
  currentLang,
  onLanguageChange,
  brandName = 'Zalando SE',
  onNavigateToOverview,
  onNavigateToCatalog,
  onNavigateToInventory,
  onNavigateToInStore,
  onNavigateToCampaigns,
  onNavigateToDevSettings,
  onSignOut,
  initialTab = 'attribution',
}) => {
  const [activeTab, setActiveTab] = useState<SalesTab>(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [inventoryDropdownOpen, setInventoryDropdownOpen] = useState(false);
  const [instoreDropdownOpen, setInstoreDropdownOpen] = useState(false);
  const [salesDropdownOpen, setSalesDropdownOpen] = useState(true);

  // Viewer state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerInvoiceId, setViewerInvoiceId] = useState('');
  const [viewerZoom, setViewerZoom] = useState(1);

  // Fit export state
  const [fitExporting, setFitExporting] = useState<'pdf' | 'excel' | null>(null);
  const [fitExportDone, setFitExportDone] = useState<'pdf' | 'excel' | null>(null);
  const [fitExportMenuOpen, setFitExportMenuOpen] = useState(false);

  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const fitExportRef = useRef<HTMLDivElement>(null);

  useEffect(() => { mainWrapperRef.current?.scrollTo({ top: 0 }); }, [activeTab]);

  useEffect(() => {
    if (!notifPanelOpen) return;
    const h = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifPanelOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [notifPanelOpen]);

  useEffect(() => {
    if (!fitExportMenuOpen) return;
    const h = (e: MouseEvent) => {
      if (fitExportRef.current && !fitExportRef.current.contains(e.target as Node)) setFitExportMenuOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [fitExportMenuOpen]);

  const handleExportCsv = () => {
    const csv = buildCsv(ORDERS, t);
    downloadFile(csv, `fitvisor-orders-${new Date().toISOString().slice(0,10)}.csv`, 'text/csv;charset=utf-8;');
  };

  const openViewer = (invoiceId: string) => {
    setViewerInvoiceId(invoiceId);
    setViewerZoom(1);
    setViewerOpen(true);
  };

  const handleFitExport = (type: 'pdf' | 'excel') => {
    setFitExportMenuOpen(false);
    setFitExporting(type);
    const csv = buildFitCsv(t);
    setTimeout(() => {
      if (type === 'excel') {
        downloadFile(csv, `fitvisor-morphology-report-${new Date().toISOString().slice(0,10)}.csv`, 'text/csv;charset=utf-8;');
      } else {
        // Generate a minimal valid PDF as text — opens correctly in browsers
        const pdfContent = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/MediaBox[0 0 595 842]/Parent 2 0 R/Resources<</Font<</F1<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>>>>>/Contents 4 0 R>>endobj
4 0 obj<</Length 600>>
stream
BT /F1 18 Tf 40 800 Td (Fitvisor - Morphological Sizing Report) Tj
/F1 12 Tf 0 -30 Td (${t.fitPageTitle}) Tj
0 -20 Td (${t.fitPageSubtitle}) Tj
0 -40 Td (${t.fitGarmentBlazers}: True to Size 82% | Too Tight 11% | Too Loose 7%) Tj
0 -20 Td (${t.fitGarmentJeans}: True to Size 82% | Too Tight 10% | Too Loose 8%) Tj
0 -20 Td (${t.fitGarmentDresses}: True to Size 81% | Too Tight 12% | Too Loose 7%) Tj
0 -40 Td (${t.fitAlertBlazerId}: ${t.fitAlertBlazerText}) Tj
0 -20 Td (${t.fitAlertJeansId}: ${t.fitAlertJeansText}) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
trailer<</Size 5/Root 1 0 R>>
startxref
924
%%EOF`;
        downloadFile(pdfContent, `fitvisor-morphology-report-${new Date().toISOString().slice(0,10)}.pdf`, 'application/pdf');
      }
      setFitExporting(null);
      setFitExportDone(type);
      setTimeout(() => setFitExportDone(null), 2500);
    }, 800);
  };

  const channelIcon = (ch: Order['channel']) => {
    if (ch === 'app')   return <Smartphone size={14} style={{ color: '#6366F1', flexShrink: 0 }} />;
    if (ch === 'web')   return <Monitor size={14} style={{ color: '#0EA5E9', flexShrink: 0 }} />;
    return <Eye size={14} style={{ color: '#10B981', flexShrink: 0 }} />;
  };

  const channelLabel = (ch: Order['channel']) => {
    if (ch === 'app') return t.salesChannelApp;
    if (ch === 'web') return t.salesChannelWeb;
    return t.salesChannelKiosk;
  };

  const currentInvoice = INVOICE_ROWS.find(r => r.id === viewerInvoiceId);

  // ── Sidebar shared block ──────────────────────────────────────────────────
  const Sidebar = (
    <aside className={`dashboard-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="mobile-drawer-header">
        <FitvisorLogo variant="light" height={28} />
        <button type="button" className="mobile-drawer-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close"><X size={20} /></button>
      </div>
      <div className="sidebar-brand-header desktop-only">
        <FitvisorLogo variant="light" height={30} />
      </div>

      <nav className="sidebar-nav">
        <button type="button" className="nav-item" onClick={() => { onNavigateToOverview(); setMobileMenuOpen(false); }}>
          <Home size={19} className="nav-icon" />
          <div className="nav-label-box">
            <span className="nav-label-title">1. {t.navOverview}</span>
            <span className="nav-label-sub">{t.navOverviewSub}</span>
          </div>
        </button>

        <div className="nav-dropdown-group">
          <button type="button" className="nav-item has-dropdown" onClick={() => setCatalogDropdownOpen(!catalogDropdownOpen)}>
            <Shirt size={19} className="nav-icon" />
            <div className="nav-label-box">
              <span className="nav-label-title">2. {t.navCatalogue}</span>
              <span className="nav-label-sub">{t.navCatalogueSub}</span>
            </div>
            <span className="nav-dropdown-arrow">{catalogDropdownOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</span>
          </button>
          {catalogDropdownOpen && (
            <div className="sidebar-subcategories-list">
              <button type="button" className="sub-nav-item" onClick={() => { onNavigateToCatalog(); setMobileMenuOpen(false); }}><Shirt size={15}/><span>{t.tabProductCatalog}</span></button>
              <button type="button" className="sub-nav-item" onClick={() => { onNavigateToCatalog(); setMobileMenuOpen(false); }}><Hash size={15}/><span>{t.tabSizeMapping}</span></button>
              <button type="button" className="sub-nav-item" onClick={() => { onNavigateToCatalog(); setMobileMenuOpen(false); }}><Package size={15}/><span>{t.tabAssetUpload}</span></button>
            </div>
          )}
        </div>

        <div className="nav-dropdown-group">
          <button type="button" className="nav-item has-dropdown" onClick={() => setInventoryDropdownOpen(!inventoryDropdownOpen)}>
            <Package size={19} className="nav-icon" />
            <div className="nav-label-box">
              <span className="nav-label-title">3. {t.navInventory}</span>
              <span className="nav-label-sub">{t.invNavSub}</span>
            </div>
            <span className="nav-dropdown-arrow">{inventoryDropdownOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</span>
          </button>
          {inventoryDropdownOpen && (
            <div className="sidebar-subcategories-list">
              <button type="button" className="sub-nav-item" onClick={() => { onNavigateToInventory(); setMobileMenuOpen(false); }}><RefreshCw size={15}/><span>{t.invTabStock}</span></button>
              <button type="button" className="sub-nav-item" onClick={() => { onNavigateToInventory(); setMobileMenuOpen(false); }}><Hash size={15}/><span>{t.invTabQuantities}</span></button>
            </div>
          )}
        </div>

        <div className="nav-dropdown-group">
          <button type="button" className="nav-item has-dropdown" onClick={() => setInstoreDropdownOpen(!instoreDropdownOpen)}>
            <Store size={19} className="nav-icon" />
            <div className="nav-label-box">
              <span className="nav-label-title">4. {t.navInStore}</span>
              <span className="nav-label-sub">{t.instoreNavSub}</span>
            </div>
            <span className="nav-dropdown-arrow">{instoreDropdownOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</span>
          </button>
          {instoreDropdownOpen && (
            <div className="sidebar-subcategories-list">
              <button type="button" className="sub-nav-item" onClick={() => { onNavigateToInStore(); setMobileMenuOpen(false); }}><Store size={15}/><span>{t.instoreTabStores}</span></button>
              <button type="button" className="sub-nav-item" onClick={() => { onNavigateToInStore(); setMobileMenuOpen(false); }}><Smartphone size={15}/><span>{t.instoreTabFitting}</span></button>
            </div>
          )}
        </div>

        <button type="button" className="nav-item" onClick={() => { onNavigateToCampaigns(); setMobileMenuOpen(false); }}>
          <Megaphone size={19} className="nav-icon" />
          <div className="nav-label-box">
            <span className="nav-label-title">5. {t.navCampaigns}</span>
            <span className="nav-label-sub">{t.navCampaignsSub}</span>
          </div>
        </button>

        <div className="nav-dropdown-group">
          <button type="button" className="nav-item active has-dropdown" onClick={() => setSalesDropdownOpen(!salesDropdownOpen)}>
            <BarChart3 size={19} className="nav-icon" />
            <div className="nav-label-box">
              <span className="nav-label-title">6. {t.navSales}</span>
              <span className="nav-label-sub">{t.salesNavSub}</span>
            </div>
            <span className="nav-dropdown-arrow">{salesDropdownOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</span>
          </button>
          {salesDropdownOpen && (
            <div className="sidebar-subcategories-list">
              <button type="button" className={`sub-nav-item ${activeTab === 'attribution' ? 'active-sub' : ''}`}
                onClick={() => { setActiveTab('attribution'); setMobileMenuOpen(false); }}>
                <TrendingUp size={15}/><span>{t.salesTabAttribution}</span>
              </button>
              <button type="button" className={`sub-nav-item ${activeTab === 'invoices' ? 'active-sub' : ''}`}
                onClick={() => { setActiveTab('invoices'); setMobileMenuOpen(false); }}>
                <FileText size={15}/><span>{t.salesTabInvoices}</span>
              </button>
              <button type="button" className={`sub-nav-item ${activeTab === 'fitinsights' ? 'active-sub' : ''}`}
                onClick={() => { setActiveTab('fitinsights'); setMobileMenuOpen(false); }}>
                <ChevronRight size={15}/><span>{t.salesTabFitInsights}</span>
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
  );

  // ── Topbar shared block ───────────────────────────────────────────────────
  const Topbar = (
    <header className="dashboard-topbar">
      <div className="topbar-left">
        <button type="button" className="mobile-hamburger-btn" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
        <div className="breadcrumb-nav">
          <Home size={15} className="breadcrumb-icon" />
          <span className="breadcrumb-link">{t.navSales}</span>
          <span className="breadcrumb-divider">›</span>
          <span className="breadcrumb-current">
            {activeTab === 'attribution' ? t.salesTabAttribution : activeTab === 'invoices' ? t.salesTabInvoices : t.salesTabFitInsights}
          </span>
        </div>
        <div className="topbar-search">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder={t.searchPlaceholder} className="search-input" readOnly />
        </div>
      </div>
      <div className="topbar-right">
        <div className="feed-status-pill"><span className="feed-status-dot" /><span>{t.catalogFeedActive}</span></div>
        <div className="notif-wrapper" ref={notifRef}>
          <button type="button" className={`notification-bell-btn ${notifPanelOpen ? 'active' : ''}`}
            aria-label="Notifications" onClick={() => setNotifPanelOpen(v => !v)}>
            <Bell size={18}/><span className="bell-red-badge"/>
          </button>
          {notifPanelOpen && (
            <div className="notif-panel" role="dialog">
              <div className="notif-panel-header">
                <span className="notif-panel-title">Notifications</span>
                <span className="notif-unread-badge">2 {t.notifNew}</span>
              </div>
              <div className="notif-list">
                <div className="notif-item notif-unread">
                  <div className="notif-dot"/>
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
            <div className="topbar-user-avatar"><User size={17} strokeWidth={2.2}/></div>
            <div className="topbar-user-meta">
              <span className="topbar-user-name">{brandName}</span>
              <span className="topbar-user-tag">{t.brandPartnerRole}</span>
            </div>
            <ChevronDown size={14} className="user-dropdown-arrow"/>
          </button>
          {userMenuOpen && (
            <div className="user-dropdown-menu">
              <div className="user-dropdown-header">
                <span className="dropdown-brand-title">{brandName}</span>
                <span className="dropdown-brand-role">{t.brandPartnerRole}</span>
              </div>
              <div className="user-dropdown-divider"/>
              <button type="button" className="user-dropdown-item signout-item"
                onClick={() => { setUserMenuOpen(false); if (onSignOut) onSignOut(); }}>
                <LogOut size={16}/><span>{t.signOut}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );

  return (
    <div className="dashboard-layout">
      {/* ── Invoice Viewer Modal ── */}
      {viewerOpen && (
        <div className="modal-backdrop" onClick={() => setViewerOpen(false)}>
          <div className="inv-viewer-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="inv-viewer-header">
              <div className="inv-viewer-title-group">
                <FileText size={18} style={{ color: '#E85050' }} />
                <span className="inv-viewer-title">{t.invViewerTitle} — {viewerInvoiceId}</span>
              </div>
              <div className="inv-viewer-controls">
                <button type="button" className="inv-viewer-ctrl-btn" onClick={() => setViewerZoom(z => Math.max(0.5, z - 0.2))} title={t.invViewerZoomOut}><ZoomOut size={16}/></button>
                <span className="inv-viewer-zoom-label">{Math.round(viewerZoom * 100)}%</span>
                <button type="button" className="inv-viewer-ctrl-btn" onClick={() => setViewerZoom(z => Math.min(2, z + 0.2))} title={t.invViewerZoomIn}><ZoomIn size={16}/></button>
                {currentInvoice?.pdfUrl && (
                  <button type="button" className="inv-viewer-ctrl-btn" title={t.invBtnDownloadPdf}
                    onClick={() => alert(`Downloading: ${currentInvoice.pdfUrl}`)}>
                    <Download size={16}/>
                  </button>
                )}
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setViewerOpen(false)} aria-label={t.invViewerClose}><X size={18}/></button>
            </div>
            <div className="inv-viewer-body">
              <div className="inv-viewer-doc" style={{ transform: `scale(${viewerZoom})`, transformOrigin: 'top center' }}>
                <div className="inv-viewer-doc-header">
                  <div>
                    <span className="inv-viewer-doc-brand">Fitvisor</span>
                    <span className="inv-viewer-doc-sub">Brand Console</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="inv-viewer-doc-id">{viewerInvoiceId}</span>
                    <span className="inv-viewer-doc-date">{currentInvoice?.period}</span>
                  </div>
                </div>
                <div className="inv-viewer-doc-divider"/>
                <table className="inv-viewer-doc-table">
                  <tbody>
                    <tr><td>{t.invColOrders}</td><td><strong>{currentInvoice?.orders} {t.invOrders}</strong></td></tr>
                    <tr><td>{t.invColGrossSales}</td><td><strong>{currentInvoice?.gmv}</strong></td></tr>
                    <tr><td>{t.invColCommission}</td><td><strong>{currentInvoice?.commission}</strong></td></tr>
                    <tr><td>{t.invColReturns}</td><td style={{ color: '#E85050' }}><strong>{currentInvoice?.returns} ({currentInvoice?.returnCount} returns)</strong></td></tr>
                    <tr className="inv-viewer-total-row"><td>{t.invColNetFee}</td><td><strong>{currentInvoice?.netFee}</strong></td></tr>
                  </tbody>
                </table>
                <div className="inv-viewer-doc-footer">
                  <CheckCircle size={16} style={{ color: '#16A34A' }} />
                  <span>Fitvisor Technologies — {currentInvoice?.period}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />}
      {Sidebar}

      {/* ── MAIN CONTENT ── */}
      <div className="dashboard-main-wrapper" ref={mainWrapperRef}>
        {Topbar}

        <main className="dashboard-content-area inv-content-area">

          {/* ══ ATTRIBUTION TAB ══════════════════════════════════════════ */}
          {activeTab === 'attribution' && (
            <>
              <div className="inv-page-header">
                <div className="inv-page-header-left">
                  <h1 className="inv-page-title">{t.salesPageTitle}</h1>
                  <p className="inv-page-subtitle">{t.salesPageSubtitle}</p>
                </div>
                <button type="button" className="sales-export-btn" onClick={handleExportCsv}>
                  <Download size={16}/><span>{t.salesExportBtn}</span>
                </button>
              </div>

              <div className="sales-funnel-row">
                <div className="sales-funnel-card">
                  <div className="sales-funnel-step-badge" style={{ background: '#EFF6FF', color: '#3B82F6' }}>1</div>
                  <div className="sales-funnel-icon" style={{ color: '#3B82F6' }}><Eye size={26}/></div>
                  <span className="sales-funnel-label">{t.salesKpi1Label}</span>
                  <span className="sales-funnel-value">84,210</span>
                  <span className="sales-funnel-sub">{t.salesKpi1Sub}</span>
                </div>
                <ArrowRight size={20} className="sales-funnel-arrow"/>
                <div className="sales-funnel-card">
                  <div className="sales-funnel-step-badge" style={{ background: '#EFF6FF', color: '#3B82F6' }}>2</div>
                  <div className="sales-funnel-icon" style={{ color: '#6366F1' }}><Link2 size={26}/></div>
                  <span className="sales-funnel-label">{t.salesKpi2Label}</span>
                  <span className="sales-funnel-value">20,880</span>
                  <span className="sales-funnel-sub">{t.salesKpi2Sub}</span>
                </div>
                <ArrowRight size={20} className="sales-funnel-arrow"/>
                <div className="sales-funnel-card">
                  <div className="sales-funnel-step-badge" style={{ background: '#ECFDF3', color: '#16A34A' }}>3</div>
                  <div className="sales-funnel-icon" style={{ color: '#16A34A' }}><ShoppingCart size={26}/></div>
                  <span className="sales-funnel-label">{t.salesKpi3Label}</span>
                  <span className="sales-funnel-value">4,810</span>
                  <span className="sales-funnel-sub">{t.salesKpi3Sub}</span>
                </div>
                <ArrowRight size={20} className="sales-funnel-arrow"/>
                <div className="sales-funnel-card sales-funnel-card-gmv">
                  <div className="sales-funnel-step-badge" style={{ background: '#FEF3F2', color: '#E85050' }}>4</div>
                  <div className="sales-funnel-icon" style={{ color: '#E85050' }}><Coins size={26}/></div>
                  <span className="sales-funnel-label">{t.salesKpi4Label}</span>
                  <span className="sales-funnel-value sales-gmv-value">€182,400</span>
                </div>
              </div>

              <h2 className="sales-orders-title">{t.salesOrdersTitle}</h2>
              <div className="inv-table-card">
                <div className="inv-table-scroll">
                  <table className="inv-table" style={{ minWidth: 820 }}>
                    <thead>
                      <tr>
                        <th>{t.salesColOrderId}</th><th>{t.salesColTimestamp}</th><th>{t.salesColSku}</th>
                        <th>{t.salesColItems}</th><th>{t.salesColTotal}</th><th>{t.salesColChannel}</th><th>{t.salesColCustomer}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ORDERS.map(order => (
                        <tr key={order.id} className="inv-table-row">
                          <td><span className="sales-order-id">{order.id}</span></td>
                          <td><span style={{ fontSize: 13, color: '#344054' }}>{order.timestamp}</span></td>
                          <td>
                            <div className="sales-sku-cell">
                              <span className="sales-sku-code">{order.refSku}</span>
                              <span className="sales-sku-desc">{order.refSkuDesc}</span>
                            </div>
                          </td>
                          <td>
                            <div className="sales-items-cell">
                              <span style={{ fontWeight: 600, fontSize: 13 }}>
                                {order.itemsCount} {order.itemsCount === 1 ? (currentLang === 'fr' ? 'article' : 'item') : (currentLang === 'fr' ? 'articles' : 'items')}
                              </span>
                              {order.itemsDesc && <span style={{ fontSize: 11.5, color: '#64748B' }}>{order.itemsDesc}</span>}
                            </div>
                          </td>
                          <td><span style={{ fontWeight: 700, fontSize: 13.5, color: '#101828' }}>{order.total}</span></td>
                          <td>
                            <div className="sales-channel-cell">
                              {channelIcon(order.channel)}
                              <span style={{ fontSize: 12.5, color: '#344054' }}>{channelLabel(order.channel)}</span>
                            </div>
                          </td>
                          <td>
                            {order.customerStatus === 'new'
                              ? <span className="sales-customer-pill sales-customer-new">{t.salesNewCustomer}</span>
                              : <span className="sales-customer-pill sales-customer-returning">{t.salesReturning}</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ══ INVOICES & FEES TAB ══════════════════════════════════════ */}
          {activeTab === 'invoices' && (
            <>
              <div className="inv-page-header" style={{ marginBottom: 20 }}>
                <div className="inv-page-header-left">
                  <h1 className="inv-page-title">{t.salesInvoicesTitle}</h1>
                  <p className="inv-page-subtitle">{t.invStmtSubtitle}</p>
                </div>
              </div>

              {/* KPI cards — 4 in one row on desktop */}
              <div className="inv-kpi-row inv-kpi-row-4" style={{ marginBottom: 22 }}>
                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box" style={{ background: '#EFF6FF', color: '#3B82F6' }}><ShoppingCart size={22}/></div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.invKpi1Label}</span>
                    <span className="inv-kpi-value">€182,400</span>
                  </div>
                </div>
                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box" style={{ background: '#FDF4FF', color: '#E85050' }}><Coins size={22}/></div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.invKpi2Label}</span>
                    <span className="inv-kpi-value">€15,504</span>
                  </div>
                </div>
                <div className="inv-kpi-card">
                  <div className="inv-kpi-icon-box" style={{ background: '#FFF8F0', color: '#F59E0B' }}><RefreshCw size={22}/></div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.invKpi3Label}</span>
                    <span className="inv-kpi-value" style={{ color: '#E85050' }}>-€1,240</span>
                    <span style={{ fontSize: 11.5, color: '#64748B' }}>{t.invKpi3Sub}</span>
                  </div>
                </div>
                <div className="inv-kpi-card" style={{ border: '1.5px solid #A7F3D0', background: '#F0FDF4' }}>
                  <div className="inv-kpi-icon-box" style={{ background: '#ECFDF5', color: '#059669' }}><CheckCircle size={22}/></div>
                  <div className="inv-kpi-body">
                    <span className="inv-kpi-label">{t.invKpi4Label}</span>
                    <span className="inv-kpi-value" style={{ color: '#059669' }}>€14,264</span>
                    <span style={{ fontSize: 11.5, color: '#64748B' }}>{t.invKpi4Sub}</span>
                  </div>
                </div>
              </div>

              {/* Monthly statement table */}
              <h2 className="sales-orders-title">{t.invStmtTitle}</h2>
              <div className="inv-table-card">
                <div className="inv-table-scroll">
                  <table className="inv-table inv-stmt-table">
                    <thead>
                      <tr>
                        <th>{t.invColBillingCycle}</th>
                        <th>{t.invColOrders}</th>
                        <th>{t.invColGrossSales}</th>
                        <th>{t.invColCommission}</th>
                        <th>{t.invColReturns}</th>
                        <th>{t.invColNetFee}</th>
                        <th>{t.invColStatus}</th>
                        <th>{t.invColInvoiceDl}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {INVOICE_ROWS.map(row => (
                        <tr key={row.id} className="inv-table-row">
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                              <span style={{ fontWeight: 700, fontSize: 13.5, color: '#0F172A' }}>{row.period}</span>
                              {row.current && <span className="inv-current-badge">{t.invCurrentBadge}</span>}
                            </div>
                          </td>
                          <td><span style={{ fontSize: 13 }}>{row.orders} {t.invOrders}</span></td>
                          <td><span style={{ fontWeight: 700, fontSize: 13.5 }}>{row.gmv}</span></td>
                          <td><span style={{ fontSize: 13 }}>{row.commission}</span></td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: 700, fontSize: 13, color: '#E85050' }}>{row.returns}</span>
                              <span style={{ fontSize: 11.5, color: '#64748B' }}>({row.returnCount} returns)</span>
                            </div>
                          </td>
                          <td><span style={{ fontWeight: 700, fontSize: 13.5 }}>{row.netFee}</span></td>
                          <td>
                            {row.status === 'accrual' ? (
                              <span className="inv-status-pill inv-accrual">
                                <Clock size={12}/>{t.invStatusAccrual}
                              </span>
                            ) : (
                              <span className="inv-status-pill inv-settled">
                                <CheckCircle2 size={12}/>{t.invStatusSettled}
                              </span>
                            )}
                          </td>
                          <td>
                            {row.status === 'accrual' ? (
                              <button type="button" className="inv-view-stmt-btn" onClick={() => openViewer(row.id)}>
                                <FileText size={13}/><span>{t.invBtnViewStatement}</span>
                              </button>
                            ) : (
                              <button type="button" className="inv-dl-pdf-btn" onClick={() => openViewer(row.id)}>
                                <Download size={13}/><span>{t.invBtnDownloadPdf}</span>
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

          {/* ══ FIT INSIGHTS TAB ═════════════════════════════════════════ */}
          {activeTab === 'fitinsights' && (
            <>
              <div className="inv-page-header" style={{ marginBottom: 16 }}>
                <div className="inv-page-header-left">
                  <h1 className="inv-page-title">{t.fitPageTitle}</h1>
                  <p className="inv-page-subtitle">{t.fitPageSubtitle}</p>
                </div>
              </div>

              {/* Return rate banner */}
              <div className="fit-banner">
                <span className="fit-banner-icon">↘</span>
                <span className="fit-banner-text">{t.fitBannerText}</span>
              </div>

              {/* Two-column layout */}
              <div className="fit-content-grid">
                {/* Left: Sizing Sentiment */}
                <div className="inv-table-card fit-sizing-card">
                  <h2 className="sales-orders-title">{t.fitSizingTitle}</h2>
                  <div className="fit-legend-row">
                    <span className="fit-legend-dot fit-green"/><span className="fit-legend-label">{t.fitLegendTrue}</span>
                    <span className="fit-legend-dot fit-orange" style={{ marginLeft: 12 }}/><span className="fit-legend-label">{t.fitLegendTight}</span>
                    <span className="fit-legend-dot fit-red" style={{ marginLeft: 12 }}/><span className="fit-legend-label">{t.fitLoose}</span>
                  </div>
                  <div className="fit-garments-list">
                    {FIT_GARMENTS.map(g => (
                      <div key={g.label} className="fit-garment-row">
                        <div className="fit-garment-img">
                          <span style={{ fontSize: 28 }}>{g.emoji}</span>
                        </div>
                        <div className="fit-garment-info">
                          <span className="fit-garment-label">{t[g.labelKey]}</span>
                          <div className="fit-bar-track">
                            <div className="fit-bar-seg fit-bar-green" style={{ width: `${g.trueToSize}%` }}>
                              <span className="fit-bar-pct">{g.trueToSize}%</span>
                            </div>
                            <div className="fit-bar-seg fit-bar-orange" style={{ width: `${g.tooTight}%` }}>
                              <span className="fit-bar-pct">{g.tooTight}%</span>
                            </div>
                            <div className="fit-bar-seg fit-bar-red" style={{ width: `${g.tooLoose}%` }}>
                              <span className="fit-bar-pct">{g.tooLoose}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Garment Fit Alerts */}
                <div className="inv-table-card fit-alerts-card">
                  <h2 className="sales-orders-title">{t.fitAlertsTitle}</h2>
                  <div className="fit-alert-item fit-alert-warning">
                    <div className="fit-alert-header">
                      <AlertTriangle size={16} className="fit-alert-icon-warn"/>
                      <span className="fit-alert-sku">{t.fitAlertBlazerId}</span>
                    </div>
                    <p className="fit-alert-text">{t.fitAlertBlazerText}</p>
                    <div className="fit-alert-rec">
                      <Eye size={12} style={{ color: '#E85050', flexShrink: 0 }}/>
                      <span>{t.fitAlertBlazerRec}</span>
                    </div>
                  </div>
                  <div className="fit-alert-item fit-alert-success" style={{ marginTop: 14 }}>
                    <div className="fit-alert-header">
                      <CheckCircle size={16} className="fit-alert-icon-ok"/>
                      <span className="fit-alert-sku">{t.fitAlertJeansId}</span>
                    </div>
                    <p className="fit-alert-text">{t.fitAlertJeansText}</p>
                  </div>
                </div>
              </div>

              {/* Export button — bottom right */}
              <div className="fit-export-row">
                <div className="fit-export-wrapper" ref={fitExportRef}>
                  <button type="button" className="fit-export-btn"
                    onClick={() => setFitExportMenuOpen(!fitExportMenuOpen)}
                    disabled={fitExporting !== null}>
                    {fitExporting ? (
                      <><Loader2 size={16} className="animate-spin"/><span>{t.fitExporting}</span></>
                    ) : fitExportDone ? (
                      <><CheckCircle2 size={16}/><span>{t.fitExportDone}</span></>
                    ) : (
                      <><Download size={16}/><span>{t.fitExportBtn}</span><ChevronDown size={14}/></>
                    )}
                  </button>
                  {fitExportMenuOpen && (
                    <div className="fit-export-menu">
                      <button type="button" className="fit-export-menu-item" onClick={() => handleFitExport('pdf')}>
                        <FileText size={14}/><span>{t.fitExportPdf}</span>
                      </button>
                      <button type="button" className="fit-export-menu-item" onClick={() => handleFitExport('excel')}>
                        <Download size={14}/><span>{t.fitExportExcel}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
};
