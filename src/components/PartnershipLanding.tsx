'use client';

import React from 'react';
import { Sparkles, RefreshCw, BarChart3, ArrowRight, ChevronRight } from 'lucide-react';
import { Translations, Language } from '../translations';
import { FitvisorLogo } from './FitvisorLogo';
import { LanguageSelector } from './LanguageSelector';

interface PartnershipLandingProps {
  t: Translations;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  brandName?: string;
  onBeginSetup: () => void;
  onSkipToDashboard: () => void;
}

const FEATURES = [
  { icon: Sparkles,   titleKey: 'partnerFeature1Title' as const, descKey: 'partnerFeature1Desc' as const, color: '#E85050', bg: '#FEF2F2' },
  { icon: RefreshCw,  titleKey: 'partnerFeature2Title' as const, descKey: 'partnerFeature2Desc' as const, color: '#3B82F6', bg: '#EFF6FF' },
  { icon: BarChart3,  titleKey: 'partnerFeature3Title' as const, descKey: 'partnerFeature3Desc' as const, color: '#059669', bg: '#ECFDF5' },
];

export const PartnershipLanding: React.FC<PartnershipLandingProps> = ({
  t,
  currentLang,
  onLanguageChange,
  brandName = 'Zalando SE',
  onBeginSetup,
  onSkipToDashboard,
}) => {
  return (
    <div className="partner-landing-wrapper">
      {/* Language selector */}
      <div className="otp-lang-wrap">
        <LanguageSelector currentLang={currentLang} onLanguageChange={onLanguageChange} />
      </div>

      <div className="partner-landing-card">
        {/* Logo */}
        <div className="otp-logo-wrap" style={{ marginBottom: 8 }}>
          <FitvisorLogo variant="dark" height={38} showConsoleSubtext={false} />
        </div>

        {/* Badge */}
        <div className="partner-landing-badge">
          <span className="partner-landing-badge-dot" />
          <span>{t.partnerLandingBadge}</span>
        </div>

        {/* Title */}
        <h1 className="partner-landing-title">{t.partnerLandingTitle}</h1>
        <p className="partner-landing-subtitle">{t.partnerLandingSubtitle}</p>

        {/* Feature cards */}
        <div className="partner-feature-list">
          {FEATURES.map(f => {
            const Icon = f.icon;
            return (
              <div key={f.titleKey} className="partner-feature-row">
                <div className="partner-feature-icon" style={{ background: f.bg, color: f.color }}>
                  <Icon size={20} />
                </div>
                <div className="partner-feature-text">
                  <span className="partner-feature-title">{t[f.titleKey]}</span>
                  <span className="partner-feature-desc">{t[f.descKey]}</span>
                </div>
                <ChevronRight size={16} className="partner-feature-chevron" />
              </div>
            );
          })}
        </div>

        {/* Primary CTA — Pearl Pink */}
        <button type="button" className="partner-cta-btn" onClick={onBeginSetup}>
          <span className="partner-cta-text">{t.partnerCtaBtn}</span>
          <ArrowRight size={18} />
          {/* Three animated indicators */}
          <span className="otp-btn-dots">
            <span className="otp-btn-dot" style={{ animationDelay: '0s' }} />
            <span className="otp-btn-dot" style={{ animationDelay: '0.2s' }} />
            <span className="otp-btn-dot" style={{ animationDelay: '0.4s' }} />
          </span>
        </button>
        <p className="partner-cta-sub">{t.partnerCtaBtnSub}</p>

        {/* Skip link */}
        <button type="button" className="partner-skip-btn" onClick={onSkipToDashboard}>
          {t.partnerSkipBtn} →
        </button>
      </div>
    </div>
  );
};
