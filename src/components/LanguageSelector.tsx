'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../translations';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const toggleLanguage = () => {
    onLanguageChange(currentLang === 'en' ? 'fr' : 'en');
  };

  return (
    <div className="top-nav-bar">
      <button
        type="button"
        className="lang-toggle-btn"
        onClick={toggleLanguage}
        title={currentLang === 'en' ? 'Basculer en Français' : 'Switch to English'}
        aria-label="Change Language"
      >
        <Globe className="globe-icon" size={17} />
        <span>{currentLang === 'en' ? 'English' : 'Français'}</span>
        <span className="lang-badge">{currentLang === 'en' ? 'FR' : 'EN'}</span>
      </button>
    </div>
  );
};
