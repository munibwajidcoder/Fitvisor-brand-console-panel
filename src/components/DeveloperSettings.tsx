'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Home, Shirt, Package, Store, Megaphone, BarChart3, Settings,
  Search, Bell, ChevronDown, ChevronUp, User, Menu, X, LogOut,
  RefreshCw, Hash, Smartphone, Key, Copy, CheckCircle2,
  Loader2, Send, Save, TrendingUp, FileText, AlertCircle, Info,
  Building2, UserPlus, MoreVertical, Upload, Pencil, UserMinus,
  AlertOctagon,
} from 'lucide-react';
import { Translations, Language } from '../translations';
import { FitvisorLogo } from './FitvisorLogo';
import { LanguageSelector } from './LanguageSelector';

type DevTab = 'apikeys' | 'brandprofile';

interface TeamMember {
  id: string;
  initials: string;
  color: string;
  name: string;
  email: string;
  role: string;
  access: string;
  status: 'active' | 'inactive';
}

interface InviteErrors { name?: string; email?: string; role?: string; }
interface EditErrors   { name?: string; email?: string; }

interface DeveloperSettingsProps {
  t: Translations;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  brandName?: string;
  onNavigateToOverview: () => void;
  onNavigateToCatalog: () => void;
  onNavigateToInventory: () => void;
  onNavigateToInStore: () => void;
  onNavigateToCampaigns: () => void;
  onNavigateToSales: () => void;
  onSignOut?: () => void;
  initialTab?: DevTab;
}

const INITIAL_MEMBERS: TeamMember[] = [
  { id: 'm1', initials: 'MW', color: '#3B82F6', name: 'Marco Weber',   email: 'm.weber@zalando.com',  role: 'bpRoleAdmin',        access: 'bpAccessFull',    status: 'active' },
  { id: 'm2', initials: 'ER', color: '#E85050', name: 'Elena Rossi',   email: 'e.rossi@zalando.com',  role: 'bpRoleMerchandiser', access: 'bpAccessCatalog', status: 'active' },
  { id: 'm3', initials: 'TM', color: '#059669', name: 'Thomas Müller', email: 't.muller@zalando.com', role: 'bpRoleDeveloper',    access: 'bpAccessApi',     status: 'active' },
];

export const DeveloperSettings: React.FC<DeveloperSettingsProps> = ({
  t, currentLang, onLanguageChange, brandName = 'Zalando SE',
  onNavigateToOverview, onNavigateToCatalog, onNavigateToInventory,
  onNavigateToInStore, onNavigateToCampaigns, onNavigateToSales, onSignOut,
  initialTab = 'apikeys',
}) => {
  const [activeTab, setActiveTab] = useState<DevTab>(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [inventoryDropdownOpen, setInventoryDropdownOpen] = useState(false);
  const [instoreDropdownOpen, setInstoreDropdownOpen] = useState(false);
  const [salesDropdownOpen, setSalesDropdownOpen] = useState(false);
  const [devDropdownOpen, setDevDropdownOpen] = useState(true);

  // API Keys
  const clientId = 'fvis_live_zalando_99210a4';
  const [clientIdCopied, setClientIdCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [regenerated, setRegenerating2] = useState(false);

  // Webhook
  const [webhookUrl, setWebhookUrl] = useState('https://api.zalando.com/fitvisor/webhooks/v1');
  const [webhookSecret] = useState('whsec_88921a4f001');
  const [evtStock, setEvtStock] = useState(true);
  const [evtPrice, setEvtPrice] = useState(true);
  const [evtTryon, setEvtTryon] = useState(true);
  const [pingState, setPingState] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [webhookSaveState, setWebhookSaveState] = useState<'idle'|'saving'|'saved'>('idle');
  const [webhookUrlErr, setWebhookUrlErr] = useState('');

  // Brand Profile
  const [bpBrandName, setBpBrandName] = useState(brandName);
  const [bpStorefront, setBpStorefront] = useState('https://zalando.com');
  const [bpSupport, setBpSupport] = useState('merchant-ops@zalando.com');
  const [bpSaveState, setBpSaveState] = useState<'idle'|'saving'|'saved'>('idle');
  const [bpErrName, setBpErrName] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoErr, setLogoErr] = useState('');
  const logoFileRef = useRef<HTMLInputElement>(null);

  // Team
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Invite modal
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('');
  const [inviteErrors, setInviteErrors] = useState<InviteErrors>({});
  const [inviteState, setInviteState] = useState<'idle'|'sending'|'sent'>('idle');

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editMember, setEditMember] = useState<TeamMember | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editErrors, setEditErrors] = useState<EditErrors>({});
  const [editSaving, setEditSaving] = useState(false);

  // Deactivate confirm
  const [deactivateTarget, setDeactivateTarget] = useState<TeamMember | null>(null);
  const [deactivating, setDeactivating] = useState(false);

  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => { mainWrapperRef.current?.scrollTo({ top: 0 }); }, [activeTab]);

  useEffect(() => {
    if (!notifPanelOpen) return;
    const h = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifPanelOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [notifPanelOpen]);

  // Close three-dot menu on outside click
  useEffect(() => {
    if (!openMenuId) return;
    const h = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [openMenuId]);

  // ── API Keys handlers ──────────────────────────────────────────
  const handleCopyClientId = () => {
    if (typeof navigator !== 'undefined') navigator.clipboard.writeText(clientId).catch(() => {});
    setClientIdCopied(true);
    setTimeout(() => setClientIdCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => { setRegenerating(false); setRegenerating2(true); setTimeout(() => setRegenerating2(false), 2000); }, 1200);
  };

  const handleSendPing = () => {
    if (!webhookUrl.trim().startsWith('http')) { setPingState('error'); setTimeout(() => setPingState('idle'), 2500); return; }
    setPingState('sending');
    setTimeout(() => { setPingState('sent'); setTimeout(() => setPingState('idle'), 2000); }, 1200);
  };

  const handleSaveWebhook = () => {
    if (!webhookUrl.trim().startsWith('http')) { setWebhookUrlErr(t.devWebhookErrUrl); return; }
    setWebhookUrlErr('');
    setWebhookSaveState('saving');
    setTimeout(() => { setWebhookSaveState('saved'); setTimeout(() => setWebhookSaveState('idle'), 2000); }, 900);
  };

  // ── Brand Profile handlers ────────────────────────────────────
  const handleLogoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type)) {
      setLogoErr(t.bpLogoErrType ?? 'Invalid file type. Use PNG, JPG, or WebP.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setLogoErr(t.bpLogoErrSize ?? 'File exceeds 2MB limit.');
      return;
    }
    setLogoErr('');
    setLogoUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      // Simulate upload delay
      setTimeout(() => {
        setLogoPreview(ev.target?.result as string);
        setLogoUploading(false);
      }, 700);
    };
    reader.readAsDataURL(file);
    // Reset the input so the same file can be re-selected
    e.target.value = '';
  };

  const handleSaveProfile = () => {
    if (!bpBrandName.trim()) { setBpErrName(t.bpErrBrandName); return; }
    setBpErrName('');
    setBpSaveState('saving');
    setTimeout(() => { setBpSaveState('saved'); setTimeout(() => setBpSaveState('idle'), 2000); }, 900);
  };

  // ── Team handlers ─────────────────────────────────────────────
  const getRoleLabel = (roleKey: string) => {
    const map: Record<string, keyof Translations> = { bpRoleAdmin: 'bpRoleAdmin', bpRoleMerchandiser: 'bpRoleMerchandiser', bpRoleDeveloper: 'bpRoleDeveloper' };
    return (t[map[roleKey] ?? 'bpRoleAdmin'] ?? roleKey) as string;
  };

  const getAccessLabel = (accessKey: string) => {
    const map: Record<string, keyof Translations> = { bpAccessFull: 'bpAccessFull', bpAccessCatalog: 'bpAccessCatalog', bpAccessApi: 'bpAccessApi' };
    return (t[map[accessKey] ?? 'bpAccessFull'] ?? accessKey) as string;
  };

  const openEdit = (m: TeamMember) => {
    setEditMember(m);
    setEditName(m.name);
    setEditEmail(m.email);
    setEditRole(m.role);
    setEditErrors({});
    setEditSaving(false);
    setEditOpen(true);
    setOpenMenuId(null);
  };

  const handleEditSave = () => {
    const errs: EditErrors = {};
    if (!editName.trim()) errs.name = t.bpInviteErrName;
    if (!editEmail.trim() || !editEmail.includes('@')) errs.email = t.bpInviteErrEmail;
    if (Object.keys(errs).length) { setEditErrors(errs); return; }
    setEditErrors({});
    setEditSaving(true);
    setTimeout(() => {
      setMembers(prev => prev.map(m =>
        m.id === editMember?.id
          ? { ...m, name: editName.trim(), email: editEmail.trim(), role: editRole || m.role }
          : m
      ));
      setEditSaving(false);
      setEditOpen(false);
    }, 700);
  };

  const openDeactivate = (m: TeamMember) => {
    setDeactivateTarget(m);
    setOpenMenuId(null);
  };

  const handleDeactivate = () => {
    setDeactivating(true);
    setTimeout(() => {
      setMembers(prev => prev.map(m =>
        m.id === deactivateTarget?.id ? { ...m, status: 'inactive' as const } : m
      ));
      setDeactivating(false);
      setDeactivateTarget(null);
    }, 700);
  };

  // ── Invite handlers ───────────────────────────────────────────
  const validateInvite = (): InviteErrors => {
    const e: InviteErrors = {};
    if (!inviteName.trim()) e.name = t.bpInviteErrName;
    if (!inviteEmail.trim() || !inviteEmail.includes('@')) e.email = t.bpInviteErrEmail;
    if (!inviteRole) e.role = t.bpInviteErrRole;
    return e;
  };

  const handleInvite = () => {
    const errs = validateInvite();
    if (Object.keys(errs).length) { setInviteErrors(errs); return; }
    setInviteErrors({});
    setInviteState('sending');
    setTimeout(() => {
      const initials = inviteName.trim().split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
      const colors = ['#3B82F6', '#E85050', '#059669', '#9333EA', '#F59E0B'];
      const color = colors[members.length % colors.length];
      setMembers(prev => [...prev, {
        id: `m${Date.now()}`, initials, color, name: inviteName.trim(),
        email: inviteEmail.trim(), role: inviteRole, access: 'bpAccessFull', status: 'active',
      }]);
      setInviteState('sent');
      setTimeout(() => {
        setInviteOpen(false);
        setInviteName(''); setInviteEmail(''); setInviteRole('');
        setInviteErrors({}); setInviteState('idle');
      }, 1200);
    }, 900);
  };

  return (
    <div className="dashboard-layout">

      {/* ── Modals ─────────────────────────────────────────────── */}

      {/* Invite Modal */}
      {inviteOpen && (
        <div className="modal-backdrop" onClick={() => setInviteOpen(false)}>
          <div className="dev-invite-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="dev-invite-header">
              <h2 className="dev-invite-title">{t.bpInviteModalTitle}</h2>
              <button type="button" className="modal-close-btn" onClick={() => setInviteOpen(false)}><X size={18}/></button>
            </div>
            <div className="dev-invite-body">
              <div className="dev-field-group">
                <label className="dev-field-label">{t.bpInviteNameLabel} <span style={{ color:'#E85050' }}>*</span></label>
                <input type="text" className={`dev-invite-input ${inviteErrors.name ? 'dev-input-err-border':''}`}
                  value={inviteName} onChange={e => { setInviteName(e.target.value); setInviteErrors(p => ({...p, name:undefined})); }}
                  placeholder="Marco Weber" />
                {inviteErrors.name && <span className="dev-err-msg"><AlertCircle size={12}/>{inviteErrors.name}</span>}
              </div>
              <div className="dev-field-group">
                <label className="dev-field-label">{t.bpInviteEmailLabel} <span style={{ color:'#E85050' }}>*</span></label>
                <input type="email" className={`dev-invite-input ${inviteErrors.email ? 'dev-input-err-border':''}`}
                  value={inviteEmail} onChange={e => { setInviteEmail(e.target.value); setInviteErrors(p => ({...p, email:undefined})); }}
                  placeholder="member@brand.com" />
                {inviteErrors.email && <span className="dev-err-msg"><AlertCircle size={12}/>{inviteErrors.email}</span>}
              </div>
              <div className="dev-field-group">
                <label className="dev-field-label">{t.bpInviteRoleLabel} <span style={{ color:'#E85050' }}>*</span></label>
                <select className={`dev-invite-select ${inviteErrors.role ? 'dev-input-err-border':''}`}
                  value={inviteRole} onChange={e => { setInviteRole(e.target.value); setInviteErrors(p => ({...p, role:undefined})); }}>
                  <option value="">—</option>
                  <option value="bpRoleAdmin">{t.bpRoleAdmin}</option>
                  <option value="bpRoleMerchandiser">{t.bpRoleMerchandiser}</option>
                  <option value="bpRoleDeveloper">{t.bpRoleDeveloper}</option>
                </select>
                {inviteErrors.role && <span className="dev-err-msg"><AlertCircle size={12}/>{inviteErrors.role}</span>}
              </div>
            </div>
            <div className="dev-invite-footer">
              <button type="button" className="dev-invite-cancel" onClick={() => setInviteOpen(false)}>{t.bpInviteCancel}</button>
              <button type="button" className="dev-ping-btn" onClick={handleInvite} disabled={inviteState === 'sending'}>
                {inviteState === 'sending' ? <><Loader2 size={15} className="animate-spin"/><span>{t.bpInviteSending}</span></>
                  : inviteState === 'sent'    ? <><CheckCircle2 size={15}/><span>{t.bpInviteSent}</span></>
                  : <><UserPlus size={15}/><span>{t.bpInviteSendBtn}</span></>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editOpen && editMember && (
        <div className="modal-backdrop" onClick={() => setEditOpen(false)}>
          <div className="dev-invite-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="dev-invite-header">
              <h2 className="dev-invite-title">{t.bpEditModalTitle ?? 'Edit Team Member'}</h2>
              <button type="button" className="modal-close-btn" onClick={() => setEditOpen(false)}><X size={18}/></button>
            </div>
            <div className="dev-invite-body">
              <div className="dev-field-group">
                <label className="dev-field-label">{t.bpInviteNameLabel} <span style={{ color:'#E85050' }}>*</span></label>
                <input type="text" className={`dev-invite-input ${editErrors.name ? 'dev-input-err-border':''}`}
                  value={editName} onChange={e => { setEditName(e.target.value); setEditErrors(p => ({...p, name:undefined})); }} />
                {editErrors.name && <span className="dev-err-msg"><AlertCircle size={12}/>{editErrors.name}</span>}
              </div>
              <div className="dev-field-group">
                <label className="dev-field-label">{t.bpInviteEmailLabel} <span style={{ color:'#E85050' }}>*</span></label>
                <input type="email" className={`dev-invite-input ${editErrors.email ? 'dev-input-err-border':''}`}
                  value={editEmail} onChange={e => { setEditEmail(e.target.value); setEditErrors(p => ({...p, email:undefined})); }} />
                {editErrors.email && <span className="dev-err-msg"><AlertCircle size={12}/>{editErrors.email}</span>}
              </div>
              <div className="dev-field-group">
                <label className="dev-field-label">{t.bpInviteRoleLabel}</label>
                <select className="dev-invite-select" value={editRole}
                  onChange={e => setEditRole(e.target.value)}>
                  <option value="bpRoleAdmin">{t.bpRoleAdmin}</option>
                  <option value="bpRoleMerchandiser">{t.bpRoleMerchandiser}</option>
                  <option value="bpRoleDeveloper">{t.bpRoleDeveloper}</option>
                </select>
              </div>
            </div>
            <div className="dev-invite-footer">
              <button type="button" className="dev-invite-cancel" onClick={() => setEditOpen(false)}>{t.bpInviteCancel}</button>
              <button type="button" className="dev-save-btn" onClick={handleEditSave} disabled={editSaving}>
                {editSaving ? <><Loader2 size={15} className="animate-spin"/><span>{t.bpSavingProfile}</span></>
                  : <><Save size={15}/><span>{t.bpSaveProfileBtn}</span></>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate Confirm Modal */}
      {deactivateTarget && (
        <div className="modal-backdrop" onClick={() => !deactivating && setDeactivateTarget(null)}>
          <div className="dev-confirm-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="dev-confirm-icon"><AlertOctagon size={28} style={{ color: '#E85050' }}/></div>
            <h2 className="dev-confirm-title">{t.bpDeactivateTitle ?? 'Deactivate Member?'}</h2>
            <p className="dev-confirm-msg">
              {(t.bpDeactivateMsg ?? 'This will revoke access for {name}. They can be reactivated later.').replace('{name}', deactivateTarget.name)}
            </p>
            <div className="dev-confirm-actions">
              <button type="button" className="dev-invite-cancel"
                onClick={() => !deactivating && setDeactivateTarget(null)}
                disabled={deactivating}>{t.bpInviteCancel}</button>
              <button type="button" className="dev-deactivate-confirm-btn" onClick={handleDeactivate} disabled={deactivating}>
                {deactivating ? <><Loader2 size={15} className="animate-spin"/><span>{t.bpDeactivating ?? 'Deactivating…'}</span></>
                  : <><UserMinus size={15}/><span>{t.bpDeactivateBtn ?? 'Deactivate'}</span></>}
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
          <button type="button" className="mobile-drawer-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close"><X size={20}/></button>
        </div>
        <div className="sidebar-brand-header desktop-only">
          <FitvisorLogo variant="light" height={30} />
        </div>
        <nav className="sidebar-nav">
          <button type="button" className="nav-item" onClick={() => { onNavigateToOverview(); setMobileMenuOpen(false); }}>
            <Home size={19} className="nav-icon"/>
            <div className="nav-label-box"><span className="nav-label-title">1. {t.navOverview}</span><span className="nav-label-sub">{t.navOverviewSub}</span></div>
          </button>
          <div className="nav-dropdown-group">
            <button type="button" className="nav-item has-dropdown" onClick={() => setCatalogDropdownOpen(!catalogDropdownOpen)}>
              <Shirt size={19} className="nav-icon"/>
              <div className="nav-label-box"><span className="nav-label-title">2. {t.navCatalogue}</span><span className="nav-label-sub">{t.navCatalogueSub}</span></div>
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
              <Package size={19} className="nav-icon"/>
              <div className="nav-label-box"><span className="nav-label-title">3. {t.navInventory}</span><span className="nav-label-sub">{t.invNavSub}</span></div>
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
              <Store size={19} className="nav-icon"/>
              <div className="nav-label-box"><span className="nav-label-title">4. {t.navInStore}</span><span className="nav-label-sub">{t.instoreNavSub}</span></div>
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
            <Megaphone size={19} className="nav-icon"/>
            <div className="nav-label-box"><span className="nav-label-title">5. {t.navCampaigns}</span><span className="nav-label-sub">{t.navCampaignsSub}</span></div>
          </button>
          <div className="nav-dropdown-group">
            <button type="button" className="nav-item has-dropdown" onClick={() => setSalesDropdownOpen(!salesDropdownOpen)}>
              <BarChart3 size={19} className="nav-icon"/>
              <div className="nav-label-box"><span className="nav-label-title">6. {t.navSales}</span><span className="nav-label-sub">{t.salesNavSub}</span></div>
              <span className="nav-dropdown-arrow">{salesDropdownOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</span>
            </button>
            {salesDropdownOpen && (
              <div className="sidebar-subcategories-list">
                <button type="button" className="sub-nav-item" onClick={() => { onNavigateToSales(); setMobileMenuOpen(false); }}><TrendingUp size={15}/><span>{t.salesTabAttribution}</span></button>
                <button type="button" className="sub-nav-item" onClick={() => { onNavigateToSales(); setMobileMenuOpen(false); }}><FileText size={15}/><span>{t.salesTabInvoices}</span></button>
                <button type="button" className="sub-nav-item" onClick={() => { onNavigateToSales(); setMobileMenuOpen(false); }}><ChevronDown size={15}/><span>{t.salesTabFitInsights}</span></button>
              </div>
            )}
          </div>
          <div className="nav-dropdown-group">
            <button type="button" className="nav-item active has-dropdown" onClick={() => setDevDropdownOpen(!devDropdownOpen)}>
              <Settings size={19} className="nav-icon"/>
              <div className="nav-label-box"><span className="nav-label-title">{t.navSettings}</span><span className="nav-label-sub">{t.devSettingsNavSub}</span></div>
              <span className="nav-dropdown-arrow">{devDropdownOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</span>
            </button>
            {devDropdownOpen && (
              <div className="sidebar-subcategories-list">
                <button type="button" className={`sub-nav-item ${activeTab === 'apikeys' ? 'active-sub' : ''}`}
                  onClick={() => { setActiveTab('apikeys'); setMobileMenuOpen(false); }}>
                  <Key size={15}/><span>{t.devTabApiKeys}</span>
                </button>
                <button type="button" className={`sub-nav-item ${activeTab === 'brandprofile' ? 'active-sub' : ''}`}
                  onClick={() => { setActiveTab('brandprofile'); setMobileMenuOpen(false); }}>
                  <User size={15}/><span>{t.devTabBrandProfile}</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="dashboard-main-wrapper" ref={mainWrapperRef}>
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button type="button" className="mobile-hamburger-btn" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu"><Menu size={22}/></button>
            <div className="breadcrumb-nav">
              <Home size={15} className="breadcrumb-icon"/>
              <span className="breadcrumb-link">{t.navSettings}</span>
              <span className="breadcrumb-divider">›</span>
              <span className="breadcrumb-current">{activeTab === 'apikeys' ? t.devTabApiKeys : t.devTabBrandProfile}</span>
            </div>
            <div className="topbar-search">
              <Search size={16} className="search-icon"/>
              <input type="text" placeholder={t.searchPlaceholder} className="search-input" readOnly/>
            </div>
          </div>
          <div className="topbar-right">
            <div className="feed-status-pill"><span className="feed-status-dot"/><span>{t.catalogFeedActive}</span></div>
            <div className="notif-wrapper" ref={notifRef}>
              <button type="button" className={`notification-bell-btn ${notifPanelOpen ? 'active' : ''}`}
                aria-label="Notifications" onClick={() => setNotifPanelOpen(v => !v)}>
                <Bell size={18}/><span className="bell-red-badge"/>
              </button>
              {notifPanelOpen && (
                <div className="notif-panel" role="dialog">
                  <div className="notif-panel-header"><span className="notif-panel-title">Notifications</span><span className="notif-unread-badge">1 {t.notifNew}</span></div>
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
            <LanguageSelector currentLang={currentLang} onLanguageChange={onLanguageChange}/>
            <div className="topbar-user-profile-wrapper">
              <button type="button" className="topbar-user-profile" onClick={() => setUserMenuOpen(v => !v)}>
                <div className="topbar-user-avatar"><User size={17} strokeWidth={2.2}/></div>
                <div className="topbar-user-meta"><span className="topbar-user-name">{brandName}</span><span className="topbar-user-tag">{t.brandPartnerRole}</span></div>
                <ChevronDown size={14} className="user-dropdown-arrow"/>
              </button>
              {userMenuOpen && (
                <div className="user-dropdown-menu">
                  <div className="user-dropdown-header"><span className="dropdown-brand-title">{brandName}</span><span className="dropdown-brand-role">{t.brandPartnerRole}</span></div>
                  <div className="user-dropdown-divider"/>
                  <button type="button" className="user-dropdown-item signout-item" onClick={() => { setUserMenuOpen(false); if (onSignOut) onSignOut(); }}>
                    <LogOut size={16}/><span>{t.signOut}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="dashboard-content-area inv-content-area">

          {/* ══ API KEYS & WEBHOOKS ══════════════════════════════════ */}
          {activeTab === 'apikeys' && (
            <>
              {/* REST & GraphQL API Keys */}
              <div className="dev-section-card">
                <div className="dev-section-header">
                  <div className="dev-section-icon-wrap"><Key size={20} style={{ color: '#E85050' }}/></div>
                  <h2 className="dev-section-title">{t.devSec1Title}</h2>
                </div>

                <div className="dev-field-group">
                  <label className="dev-field-label">{t.devClientIdLabel}</label>
                  <div className="dev-input-row">
                    <div className="dev-input-box dev-input-readonly">
                      <span className="dev-input-value">{clientId}</span>
                    </div>
                    <button type="button" className="dev-copy-btn" onClick={handleCopyClientId}>
                      {clientIdCopied
                        ? <><CheckCircle2 size={15} style={{ color:'#16A34A' }}/><span>{t.devCopied}</span></>
                        : <><Copy size={15}/><span>{t.devCopyBtn}</span></>}
                    </button>
                  </div>
                </div>

                <div className="dev-field-group">
                  <label className="dev-field-label">{t.devSecretKeyLabel}</label>
                  <div className="dev-input-row">
                    <div className="dev-input-box dev-input-readonly">
                      <span className="dev-input-value dev-secret-dots">{'•'.repeat(36)}</span>
                    </div>
                    <button type="button" className="dev-regenerate-btn" onClick={handleRegenerate} disabled={regenerating}>
                      {regenerating
                        ? <><Loader2 size={15} className="animate-spin"/><span>{t.devRegenerating}</span></>
                        : regenerated
                        ? <><CheckCircle2 size={15} style={{ color:'#16A34A' }}/><span>{t.devCopied}</span></>
                        : <><RefreshCw size={15}/><span>{t.devRegenerateBtn}</span></>}
                    </button>
                  </div>
                </div>

                <div className="dev-rate-limit-banner">
                  <Info size={15} style={{ color:'#3B82F6', flexShrink:0 }}/>
                  <span>{t.devRateLimitNote}</span>
                </div>
              </div>

              {/* Webhooks Configuration */}
              <div className="dev-section-card" style={{ marginTop: 20 }}>
                <div className="dev-section-header">
                  <div className="dev-section-icon-wrap"><Send size={20} style={{ color:'#E85050' }}/></div>
                  <h2 className="dev-section-title">{t.devSec2Title}</h2>
                </div>

                {/* Two-column URL + Secret row */}
                <div className="dev-webhook-grid">
                  <div className="dev-field-group">
                    <label className="dev-field-label">{t.devWebhookUrlLabel}</label>
                    <div className={`dev-webhook-input-wrap ${webhookUrlErr ? 'dev-input-err-border' : ''}`}>
                      <input type="url" className="dev-webhook-input" value={webhookUrl}
                        onChange={e => { setWebhookUrl(e.target.value); setWebhookUrlErr(''); }}
                        placeholder={t.devWebhookUrlPlaceholder}/>
                    </div>
                    {webhookUrlErr && <span className="dev-err-msg"><AlertCircle size={12}/>{webhookUrlErr}</span>}
                  </div>
                  <div className="dev-field-group">
                    <label className="dev-field-label">{t.devWebhookSecretLabel}</label>
                    <div className="dev-webhook-input-wrap">
                      <input type="text" className="dev-webhook-input" value={webhookSecret} readOnly/>
                    </div>
                  </div>
                </div>

                {/* Subscribed Events */}
                <div className="dev-events-section">
                  <span className="dev-events-label">{t.devSubscribedEvents}</span>
                  <div className="dev-events-list">
                    {[
                      { state: evtStock, setter: setEvtStock, key: t.devEventStock, desc: t.devEventStockDesc },
                      { state: evtPrice, setter: setEvtPrice, key: t.devEventPrice, desc: t.devEventPriceDesc },
                      { state: evtTryon, setter: setEvtTryon, key: t.devEventTryon, desc: t.devEventTryonDesc },
                    ].map(ev => (
                      <label key={ev.key} className="dev-event-row">
                        <input type="checkbox" className="dev-event-checkbox" checked={ev.state} onChange={e => ev.setter(e.target.checked)}/>
                        <span className="dev-event-key">{ev.key}</span>
                        <span className="dev-event-desc">{ev.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="dev-actions-row">
                  <button type="button" className="dev-ping-btn" onClick={handleSendPing} disabled={pingState === 'sending'}>
                    {pingState === 'sending' ? <><Loader2 size={15} className="animate-spin"/><span>{t.devSendingPing}</span></>
                      : pingState === 'sent'    ? <><CheckCircle2 size={15}/><span>{t.devPingSent}</span></>
                      : pingState === 'error'   ? <><AlertCircle size={15}/><span>{t.devPingError}</span></>
                      : <><Send size={15}/><span>{t.devSendPingBtn}</span></>}
                  </button>
                  <button type="button" className="dev-save-btn" onClick={handleSaveWebhook} disabled={webhookSaveState === 'saving'}>
                    {webhookSaveState === 'saving' ? <><Loader2 size={15} className="animate-spin"/><span>{t.devSavingWebhook}</span></>
                      : webhookSaveState === 'saved'  ? <><CheckCircle2 size={15}/><span>{t.devWebhookSaved}</span></>
                      : <><Save size={15}/><span>{t.devSaveWebhookBtn}</span></>}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ══ BRAND PROFILE & TEAM ════════════════════════════════ */}
          {activeTab === 'brandprofile' && (
            <>
              {/* Brand Profile section */}
              <div className="dev-section-card">
                <div className="dev-section-header">
                  <div className="dev-section-icon-wrap"><Building2 size={20} style={{ color:'#E85050' }}/></div>
                  <h2 className="dev-section-title">{t.bpSec1Title}</h2>
                </div>

                <div className="bp-profile-layout">
                  {/* Logo column */}
                  <div className="bp-logo-col">
                    <div className="bp-logo-preview">
                      {logoUploading ? (
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                          <Loader2 size={24} className="animate-spin" style={{ color:'#E85050' }}/>
                        </div>
                      ) : logoPreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={logoPreview} alt="Brand logo preview" style={{ width:'100%', height:'100%', objectFit:'contain' }}/>
                      ) : (
                        <div className="bp-logo-placeholder">
                          <span style={{ fontSize:22, color:'#E85050', fontWeight:900 }}>▶ {brandName.split(' ')[0].toLowerCase()}</span>
                        </div>
                      )}
                    </div>
                    <div className="bp-logo-meta">
                      <span className="dev-field-label">{t.bpLogoLabel}</span>
                      <span style={{ fontSize:12, color:'#64748B' }}>{t.bpLogoHint}</span>
                      {/* Hidden file input */}
                      <input
                        ref={logoFileRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        style={{ display:'none' }}
                        onChange={handleLogoFile}
                      />
                      <button type="button" className="bp-change-logo-btn"
                        onClick={() => logoFileRef.current?.click()}
                        disabled={logoUploading}>
                        <Upload size={14}/>
                        <span>{logoUploading ? (t.bpLogoUploading ?? 'Uploading…') : t.bpChangeLogoBtn}</span>
                      </button>
                      {logoErr && <span className="dev-err-msg"><AlertCircle size={12}/>{logoErr}</span>}
                      <span style={{ fontSize:11, color:'#94A3B8' }}>{t.bpLogoRec}</span>
                      <span style={{ fontSize:11, color:'#94A3B8' }}>{t.bpLogoMax}</span>
                    </div>
                  </div>

                  {/* Fields column */}
                  <div className="bp-fields-col">
                    <div className="dev-field-group">
                      <label className="dev-field-label">{t.bpBrandNameLabel}</label>
                      <div className={`bp-field-input-wrap ${bpErrName ? 'bp-field-err' : ''}`}>
                        <input type="text" className="bp-text-input" value={bpBrandName}
                          onChange={e => { setBpBrandName(e.target.value); setBpErrName(''); }}
                          placeholder={brandName}/>
                      </div>
                      {bpErrName && <span className="dev-err-msg"><AlertCircle size={12}/>{bpErrName}</span>}
                    </div>
                    <div className="dev-field-group">
                      <label className="dev-field-label">{t.bpStorefrontLabel}</label>
                      <div className="bp-field-input-wrap">
                        <input type="url" className="bp-text-input" value={bpStorefront}
                          onChange={e => setBpStorefront(e.target.value)}
                          placeholder={t.bpStorefrontPlaceholder}/>
                      </div>
                    </div>
                    <div className="dev-field-group">
                      <label className="dev-field-label">{t.bpSupportLabel}</label>
                      <div className="bp-field-input-wrap">
                        <input type="email" className="bp-text-input" value={bpSupport}
                          onChange={e => setBpSupport(e.target.value)}
                          placeholder={t.bpSupportPlaceholder}/>
                      </div>
                    </div>
                    <div style={{ display:'flex', justifyContent:'flex-end', marginTop: 8 }}>
                      <button type="button" className="dev-save-btn" onClick={handleSaveProfile} disabled={bpSaveState === 'saving'}>
                        {bpSaveState === 'saving' ? <><Loader2 size={15} className="animate-spin"/><span>{t.bpSavingProfile}</span></>
                          : bpSaveState === 'saved'  ? <><CheckCircle2 size={15}/><span>{t.bpProfileSaved}</span></>
                          : <><Save size={15}/><span>{t.bpSaveProfileBtn}</span></>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Users section */}
              <div className="dev-section-card" style={{ marginTop: 20 }}>
                <div className="bp-team-header">
                  <div className="dev-section-header" style={{ marginBottom: 0 }}>
                    <div className="dev-section-icon-wrap"><User size={20} style={{ color:'#E85050' }}/></div>
                    <h2 className="dev-section-title">{t.bpSec2Title}</h2>
                  </div>
                  <button type="button" className="dev-ping-btn bp-invite-btn" onClick={() => setInviteOpen(true)}>
                    <UserPlus size={15}/><span>{t.bpInviteBtn}</span>
                  </button>
                </div>

                <div className="inv-table-scroll" style={{ marginTop: 16 }}>
                  <table className="inv-table bp-team-table">
                    <thead>
                      <tr>
                        <th>{t.bpColName}</th>
                        <th>{t.bpColRole}</th>
                        <th>{t.bpColAccess}</th>
                        <th>{t.bpColStatus}</th>
                        <th style={{ width: 40 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map(m => (
                        <tr key={m.id} className="inv-table-row">
                          <td>
                            <div className="bp-member-cell">
                              <div className="bp-avatar" style={{ background: m.color }}>{m.initials}</div>
                              <div className="bp-member-info">
                                <span className="bp-member-name">{m.name}</span>
                                <span className="bp-member-email">{m.email}</span>
                              </div>
                            </div>
                          </td>
                          <td><span style={{ fontSize:13, color:'#344054' }}>{getRoleLabel(m.role)}</span></td>
                          <td><span style={{ fontSize:13, color:'#344054' }}>{getAccessLabel(m.access)}</span></td>
                          <td>
                            <span className={`bp-status-pill ${m.status === 'active' ? 'bp-status-active' : 'bp-status-inactive'}`}>
                              <span className="bp-status-dot"/>
                              {m.status === 'active' ? t.bpStatusActive : t.bpStatusInactive}
                            </span>
                          </td>
                          <td style={{ position: 'relative' }}>
                            <button type="button" className="bp-more-btn" aria-label="More options"
                              onClick={() => setOpenMenuId(openMenuId === m.id ? null : m.id)}>
                              <MoreVertical size={16}/>
                            </button>
                            {openMenuId === m.id && (
                              <div className="bp-dot-menu" ref={menuRef} role="menu">
                                <button type="button" className="bp-dot-menu-item" onClick={() => openEdit(m)}>
                                  <Pencil size={14}/><span>{t.bpMenuEdit ?? 'Edit'}</span>
                                </button>
                                {m.status === 'active' && (
                                  <button type="button" className="bp-dot-menu-item bp-dot-deactivate" onClick={() => openDeactivate(m)}>
                                    <UserMinus size={14}/><span>{t.bpMenuDeactivate ?? 'Deactivate'}</span>
                                  </button>
                                )}
                              </div>
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
