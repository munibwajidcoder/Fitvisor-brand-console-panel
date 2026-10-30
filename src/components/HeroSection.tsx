'use client';

import React from 'react';
import Image from 'next/image';
import { Lock, Zap, ShieldCheck } from 'lucide-react';
import { Translations } from '../translations';
import { FitvisorLogo } from './FitvisorLogo';

interface HeroSectionProps {
  t: Translations;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ t }) => {
  return (
    <section className="hero-section">
      {/* Background Image Container */}
      <div className="hero-background-wrapper">
        <Image
          src="/hero-bg.jpg"
          alt="Fitvisor Boutique Dressing Room"
          fill
          priority
          className="hero-bg-image"
          sizes="(max-width: 1080px) 100vw, 55vw"
          quality={95}
        />
        <div className="hero-overlay" />
      </div>

      {/* Foreground Content */}
      <div className="hero-content">
        {/* Top Header Logo using official Fitvisor Logo */}
        <header className="hero-header">
          <FitvisorLogo
            isLogin={true}
            variant="light"
            height={44}
            showConsoleSubtext={false}
          />
        </header>

        {/* Hero Central Titles */}
        <div className="hero-body">
          <h1 className="hero-title">
            {t.heroHeadlinePart1}
            <br />
            {t.heroHeadlinePart2}
          </h1>
          <p className="hero-subtitle">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Floating Frosted Glass Trust Bar */}
        <div className="hero-badges-bar">
          <div className="badge-item">
            <div className="badge-icon-box" aria-hidden="true">
              <Lock size={16} strokeWidth={2.5} />
            </div>
            <span className="badge-text">
              {t.badgeOauth}
              {'\n'}
              {t.badgeOauthLine2}
            </span>
          </div>

          <div className="badge-divider" />

          <div className="badge-item">
            <div className="badge-icon-box" aria-hidden="true">
              <Zap size={16} strokeWidth={2.5} />
            </div>
            <span className="badge-text">
              {t.badgeStock}
              {'\n'}
              {t.badgeStockLine2}
            </span>
          </div>

          <div className="badge-divider" />

          <div className="badge-item">
            <div className="badge-icon-box" aria-hidden="true">
              <ShieldCheck size={16} strokeWidth={2.5} />
            </div>
            <span className="badge-text">
              {t.badgeSla}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
