'use client';

import React, { useState } from 'react';
import {
  Building2,
  Tag,
  CreditCard,
  Link as LinkIcon,
  CloudUpload,
  GitBranch,
  Globe,
  FileText,
  Percent,
  Calendar,
  Check,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { Translations, Language } from '../translations';
import { FitvisorLogo } from './FitvisorLogo';
import { LanguageSelector } from './LanguageSelector';

interface BrandSetupConsoleProps {
  t: Translations;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  brandName?: string;
  onBackToLogin: () => void;
  onLaunchDashboard?: () => void;
}

export const BrandSetupConsole: React.FC<BrandSetupConsoleProps> = ({
  t,
  currentLang,
  onLanguageChange,
  brandName = 'Zalando SE',
  onBackToLogin,
  onLaunchDashboard,
}) => {
  // Form States
  const [displayName, setDisplayName] = useState(brandName);
  const [legalName, setLegalName] = useState(brandName);
  const [vat, setVat] = useState('DE123456789');
  const [category, setCategory] = useState('Apparel');

  // Connector Selection
  const [selectedConnector, setSelectedConnector] = useState<'rest' | 'graphql' | 'scraper'>('rest');

  // Commercial Terms
  const [commissionRate, setCommissionRate] = useState('8.5% on Attributed Sales');
  const [attributionWindow, setAttributionWindow] = useState('30-Day Referral Cookie');
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  // Loading & Toast
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveDraft = () => {
    triggerToast(t.draftSavedToast);
  };

  const handleSignAndLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert(currentLang === 'en' ? 'Please accept the terms to proceed.' : 'Veuillez accepter les conditions pour continuer.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      triggerToast(t.agreementSignedToast);
      setTimeout(() => {
        if (onLaunchDashboard) {
          onLaunchDashboard();
        }
      }, 700);
    }, 1000);
  };

  return (
    <div className="setup-console-wrapper">
      {/* Top Navigation Bar */}
      <header className="setup-header">
        <div className="setup-header-left">
          {/* Full image logo — hidden on mobile via CSS */}
          <div className="setup-logo-desktop">
            <FitvisorLogo
              variant="dark"
              height={38}
              showConsoleSubtext={true}
              subtext={t.brandConsoleTitle}
            />
          </div>
          {/* Text logo — shown on mobile via CSS */}
          <div className="setup-logo-mobile">
            <FitvisorLogo
              variant="text"
              height={32}
              showConsoleSubtext={false}
            />
          </div>
        </div>

        <div className="setup-header-center">
          <span className="step-badge-text">{t.stepIndicator}</span>
        </div>

        <div className="setup-header-right">
          {/* Earth / Globe Language Selector */}
          <LanguageSelector
            currentLang={currentLang}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </header>

      {/* Main Container */}
      <main className="setup-main-content">
        {/* Progress Stepper Card */}
        <section className="stepper-card" aria-label="Progress Stepper">
          {/* Step 1: Legal Profile (Completed) */}
          <div className="stepper-step completed">
            <div className="step-circle step-green">
              <Check size={16} strokeWidth={3} />
            </div>
            <div className="step-info">
              <span className="step-name">{t.step1Title}</span>
              <span className="step-status status-green">{t.step1Status}</span>
            </div>
          </div>

          <div className="stepper-arrow-connector">
            <div className="arrow-line" />
            <span className="arrow-head">›</span>
          </div>

          {/* Step 2: Catalog Feed (Active) */}
          <div className="stepper-step active">
            <div className="step-circle step-red">
              <span>2</span>
            </div>
            <div className="step-info">
              <span className="step-name">{t.step2Title}</span>
              <span className="step-status status-red">{t.step2Status}</span>
            </div>
          </div>

          <div className="stepper-arrow-connector">
            <div className="arrow-line" />
            <span className="arrow-head">›</span>
          </div>

          {/* Step 3: Contract SLA (Pending) */}
          <div className="stepper-step pending">
            <div className="step-circle step-gray">
              <span>3</span>
            </div>
            <div className="step-info">
              <span className="step-name">{t.step3Title}</span>
              <span className="step-status status-gray">{t.step3Status}</span>
            </div>
          </div>
        </section>

        <form onSubmit={handleSignAndLaunch} className="setup-form">
          {/* Section 1: Brand Identity & Legal Entity */}
          <section className="setup-card">
            <div className="card-section-header">
              <div className="section-icon-badge">
                <Building2 size={20} strokeWidth={2} />
              </div>
              <div className="section-title-group">
                <h2 className="section-heading">{t.sec1Heading}</h2>
                <p className="section-subheading">{t.sec1Subheading}</p>
              </div>
            </div>

            <div className="section-fields-grid three-col">
              {/* Brand Display Name */}
              <div className="setup-field-group">
                <label className="setup-label">
                  {t.brandDisplayName}
                </label>
                <div className="setup-input-wrapper">
                  <Tag size={16} className="setup-input-icon" />
                  <input
                    type="text"
                    className="setup-text-input"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Zalando SE"
                    required
                  />
                </div>
              </div>

              {/* Legal Entity Name */}
              <div className="setup-field-group">
                <label className="setup-label">
                  {t.legalEntityName}
                </label>
                <div className="setup-input-wrapper">
                  <Building2 size={16} className="setup-input-icon" />
                  <input
                    type="text"
                    className="setup-text-input"
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    placeholder="e.g. Zalando SE"
                    required
                  />
                </div>
              </div>

              {/* VAT Number */}
              <div className="setup-field-group">
                <label className="setup-label">
                  {t.vatNumber}
                </label>
                <div className="setup-input-wrapper">
                  <CreditCard size={16} className="setup-input-icon" />
                  <input
                    type="text"
                    className="setup-text-input"
                    value={vat}
                    onChange={(e) => setVat(e.target.value)}
                    placeholder="DE123456789"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Brand Primary Category */}
            <div className="section-fields-grid one-col" style={{ marginTop: '18px' }}>
              <div className="setup-field-group single-field">
                <label className="setup-label">
                  {t.brandPrimaryCategory}
                </label>
                <div className="setup-input-wrapper select-wrapper">
                  <Tag size={16} className="setup-input-icon" />
                  <select
                    className="setup-select-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Apparel">{t.catApparel}</option>
                    <option value="Footwear">{t.catFootwear}</option>
                    <option value="Accessories">{t.catAccessories}</option>
                    <option value="Luxury">{t.catLuxury}</option>
                    <option value="Beauty">{t.catBeauty}</option>
                  </select>
                  <ChevronDown size={16} className="select-dropdown-chevron" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Catalog Connector Selection */}
          <section className="setup-card">
            <div className="card-section-header">
              <div className="section-icon-badge">
                <LinkIcon size={20} strokeWidth={2} />
              </div>
              <div className="section-title-group">
                <h2 className="section-heading">{t.sec2Heading}</h2>
                <p className="section-subheading">{t.sec2Subheading}</p>
              </div>
            </div>

            <div className="connector-options-grid">
              {/* Option 1: Direct REST API / Webhooks */}
              <div
                className={`connector-card ${selectedConnector === 'rest' ? 'selected' : ''}`}
                onClick={() => setSelectedConnector('rest')}
                role="radio"
                aria-checked={selectedConnector === 'rest'}
                tabIndex={0}
              >
                <div className="connector-radio-row">
                  <div className={`radio-dot-indicator ${selectedConnector === 'rest' ? 'active' : ''}`}>
                    {selectedConnector === 'rest' && <span className="inner-dot" />}
                  </div>
                </div>

                <div className="connector-icon-box">
                  <CloudUpload size={24} strokeWidth={1.8} />
                </div>

                <h3 className="connector-title">{t.conn1Title}</h3>
                <span className="connector-badge-pill">{t.conn1Badge}</span>
                <p className="connector-desc">{t.conn1Desc}</p>
              </div>

              {/* Option 2: GraphQL Feed Connector */}
              <div
                className={`connector-card ${selectedConnector === 'graphql' ? 'selected' : ''}`}
                onClick={() => setSelectedConnector('graphql')}
                role="radio"
                aria-checked={selectedConnector === 'graphql'}
                tabIndex={0}
              >
                <div className="connector-radio-row">
                  <div className={`radio-dot-indicator ${selectedConnector === 'graphql' ? 'active' : ''}`}>
                    {selectedConnector === 'graphql' && <span className="inner-dot" />}
                  </div>
                </div>

                <div className="connector-icon-box">
                  <GitBranch size={24} strokeWidth={1.8} />
                </div>

                <h3 className="connector-title">{t.conn2Title}</h3>
                <p className="connector-desc">{t.conn2Desc}</p>
              </div>

              {/* Option 3: Automated Catalog Scraper */}
              <div
                className={`connector-card ${selectedConnector === 'scraper' ? 'selected' : ''}`}
                onClick={() => setSelectedConnector('scraper')}
                role="radio"
                aria-checked={selectedConnector === 'scraper'}
                tabIndex={0}
              >
                <div className="connector-radio-row">
                  <div className={`radio-dot-indicator ${selectedConnector === 'scraper' ? 'active' : ''}`}>
                    {selectedConnector === 'scraper' && <span className="inner-dot" />}
                  </div>
                </div>

                <div className="connector-icon-box">
                  <Globe size={24} strokeWidth={1.8} />
                </div>

                <h3 className="connector-title">{t.conn3Title}</h3>
                <span className="connector-sub-note">{t.conn3Subtitle}</span>
                <p className="connector-desc">{t.conn3Desc}</p>
              </div>
            </div>
          </section>

          {/* Section 3: Commercial Terms & Attribution SLA */}
          <section className="setup-card">
            <div className="card-section-header">
              <div className="section-icon-badge">
                <FileText size={20} strokeWidth={2} />
              </div>
              <div className="section-title-group">
                <h2 className="section-heading">{t.sec3Heading}</h2>
                <p className="section-subheading">{t.sec3Subheading}</p>
              </div>
            </div>

            <div className="section-fields-grid two-col">
              {/* Agreed Commission Rate */}
              <div className="setup-field-group">
                <label className="setup-label">
                  {t.agreedCommissionRate}
                </label>
                <div className="setup-input-wrapper">
                  <Percent size={16} className="setup-input-icon" />
                  <input
                    type="text"
                    className="setup-text-input"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                    placeholder={t.commissionPlaceholder}
                    required
                  />
                </div>
              </div>

              {/* Attribution Window */}
              <div className="setup-field-group">
                <label className="setup-label">
                  {t.attributionWindow}
                </label>
                <div className="setup-input-wrapper select-wrapper">
                  <Calendar size={16} className="setup-input-icon" />
                  <select
                    className="setup-select-input"
                    value={attributionWindow}
                    onChange={(e) => setAttributionWindow(e.target.value)}
                  >
                    <option value="30-Day Referral Cookie">{t.attributionOption30}</option>
                    <option value="60-Day Referral Cookie">{t.attributionOption60}</option>
                    <option value="90-Day Referral Cookie">{t.attributionOption90}</option>
                  </select>
                  <ChevronDown size={16} className="select-dropdown-chevron" />
                </div>
              </div>
            </div>

            {/* Terms Acceptance Checkbox */}
            <div
              className="terms-checkbox-row"
              onClick={() => setAcceptedTerms(!acceptedTerms)}
              role="checkbox"
              aria-checked={acceptedTerms}
              tabIndex={0}
            >
              <div className={`terms-checkbox-box ${acceptedTerms ? 'checked' : ''}`}>
                {acceptedTerms && <Check size={12} strokeWidth={3.2} />}
              </div>
              <span className="terms-label-text">
                {t.termsCheckboxTextPre}
                <a href="#sla" className="terms-link" onClick={(e) => e.stopPropagation()}>
                  {t.termsSla}
                </a>
                ,{' '}
                <a href="#dpa" className="terms-link" onClick={(e) => e.stopPropagation()}>
                  {t.termsDpa}
                </a>
                , and{' '}
                <a href="#guidelines" className="terms-link" onClick={(e) => e.stopPropagation()}>
                  {t.termsGuidelines}
                </a>
              </span>
            </div>
          </section>

          {/* Bottom Action Footer Bar */}
          <footer className="setup-actions-bar">
            <button
              type="button"
              className="draft-exit-btn"
              onClick={handleSaveDraft}
            >
              <FileText size={16} />
              <span>{t.saveDraftBtn}</span>
            </button>

            <button
              type="submit"
              className="sign-launch-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>{t.submitting}</span>
                </>
              ) : (
                <>
                  <span>{t.signAndLaunchBtn}</span>
                  <ArrowRight size={17} strokeWidth={2.4} />
                </>
              )}
            </button>
          </footer>
        </form>
      </main>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="alert-toast setup-toast" role="alert">
          <div className="toast-icon">
            <CheckCircle2 size={20} />
          </div>
          <div className="toast-content">
            <span className="toast-title">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};
