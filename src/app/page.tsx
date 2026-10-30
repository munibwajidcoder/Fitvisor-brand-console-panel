'use client';

import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { LoginForm } from '../components/LoginForm';
import { LanguageSelector } from '../components/LanguageSelector';
import { BrandSetupConsole } from '../components/BrandSetupConsole';
import { BrandDashboard } from '../components/BrandDashboard';
import { GarmentCatalog } from '../components/GarmentCatalog';
import { InventorySync } from '../components/InventorySync';
import { InStoreKiosks } from '../components/InStoreKiosks';
import { CampaignsAds } from '../components/CampaignsAds';
import { SalesEarnings } from '../components/SalesEarnings';
import { DeveloperSettings } from '../components/DeveloperSettings';
import { OTPVerification } from '../components/OTPVerification';
import { PartnershipLanding } from '../components/PartnershipLanding';
import { translations, Language } from '../translations';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams?: {
    screen?: string;
    lang?: string;
    brand?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default function BrandConsolePage() {
  // isMounted prevents SSR/hydration mismatch — server always renders neutral shell,
  // client hydrates and immediately shows the correct screen from the URL.
  const [isMounted, setIsMounted] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('fr');
  const [activeScreen, setActiveScreen] = useState<'signin' | 'otp' | 'partnership' | 'setup' | 'dashboard' | 'catalog' | 'inventory' | 'instore' | 'campaigns' | 'sales' | 'devsettings'>('signin');
  const [activeBrandName, setActiveBrandName] = useState('Zalando SE');
  const [catalogSubTab, setCatalogSubTab] = useState<'products' | 'sizing' | 'assets'>('products');

  const syncFromUrl = () => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const scr = params.get('screen');

    if (scr === 'catalog' || scr === 'dashboard' || scr === 'setup' || scr === 'inventory' || scr === 'instore' || scr === 'campaigns' || scr === 'sales' || scr === 'devsettings' || scr === 'otp' || scr === 'partnership') {
      setActiveScreen(scr);
    } else {
      setActiveScreen('signin');
    }

    if (params.get('lang') === 'fr') setCurrentLang('fr');
    else if (params.get('lang') === 'en') setCurrentLang('en');

    if (params.get('brand')) setActiveBrandName(params.get('brand') || 'Zalando SE');

    const tab = params.get('tab');
    if (tab === 'sizing' || tab === 'assets') setCatalogSubTab(tab);
    else setCatalogSubTab('products');
  };

  useEffect(() => {
    // Read URL state synchronously before painting — eliminates the flash
    syncFromUrl();
    setIsMounted(true);
    window.addEventListener('popstate', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // During SSR / before hydration: render a neutral shell that matches the
  // app's background so there is zero visible flash. We intentionally do NOT
  // render the spinner or a loader here — we just stay invisible until the
  // client has read the URL and set the correct screen.
  if (!isMounted) {
    return (
      <div
        style={{ minHeight: '100vh', background: '#F8F9FB' }}
        aria-hidden="true"
      />
    );
  }

  const t = translations[currentLang];

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (lang === 'en') {
        // Store English explicitly — French is the default so no param needed for French
        url.searchParams.set('lang', 'en');
      } else {
        // French is default — remove the lang param so refresh defaults to French
        url.searchParams.delete('lang');
      }
      window.history.replaceState({ screen: activeScreen, lang }, '', url.toString());
    }
  };

  const updateScreen = (newScreen: 'signin' | 'otp' | 'partnership' | 'setup' | 'dashboard' | 'catalog' | 'inventory' | 'instore' | 'campaigns' | 'sales' | 'devsettings', brandOverride?: string) => {
    setActiveScreen(newScreen);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (newScreen === 'signin') {
        url.searchParams.delete('screen');
        url.searchParams.delete('brand');
      } else {
        url.searchParams.set('screen', newScreen);
        // Persist brand name so refresh restores the correct brand
        const brand = brandOverride || activeBrandName;
        if (brand && brand !== 'Zalando SE') {
          url.searchParams.set('brand', brand);
        }
      }
      if (currentLang === 'en') {
        // Only persist lang param when English — French is the default
        url.searchParams.set('lang', 'en');
      } else {
        url.searchParams.delete('lang');
      }
      window.history.pushState({ screen: newScreen }, '', url.toString());
    }
  };

  const handleLoginSuccess = (brand: string) => {
    setActiveBrandName(brand);
    updateScreen('otp', brand);   // Login → OTP
  };

  const handleLaunchDashboard = () => {
    updateScreen('dashboard');
  };

  const handleNavigateToCatalog = () => {
    setCatalogSubTab('products');
    updateScreen('catalog');
  };

  const handleNavigateToInventory = () => {
    updateScreen('inventory');
  };

  const handleNavigateToInStore = () => {
    updateScreen('instore');
  };

  const handleNavigateToCampaigns = () => {
    updateScreen('campaigns');
  };

  const handleNavigateToSales = () => {
    updateScreen('sales');
  };

  const handleNavigateToDevSettings = () => {
    updateScreen('devsettings');
  };

  const handleNavigateToCatalogTab = (tab: 'products' | 'sizing' | 'assets') => {
    setCatalogSubTab(tab);
    setActiveScreen('catalog');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('screen', 'catalog');
      url.searchParams.set('tab', tab);
      const brand = activeBrandName;
      if (brand && brand !== 'Zalando SE') url.searchParams.set('brand', brand);
      if (currentLang === 'en') url.searchParams.set('lang', 'en');
      else url.searchParams.delete('lang');
      window.history.pushState({ screen: 'catalog', tab }, '', url.toString());
    }
  };

  const handleNavigateToOverview = () => {
    updateScreen('dashboard');
  };

  const handleBackToLogin = () => {
    updateScreen('signin');
  };

  return (
    <>
      {activeScreen === 'signin' && (
        <main className="page-container">
          <HeroSection t={t} />
          <section className="form-section">
            <LanguageSelector currentLang={currentLang} onLanguageChange={handleLanguageChange} />
            <LoginForm t={t} onLoginSuccess={handleLoginSuccess} onApplyPartnership={() => updateScreen('partnership')} />
          </section>
        </main>
      )}

      {activeScreen === 'otp' && (
        <OTPVerification
          t={t}
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onVerifySuccess={() => updateScreen('setup')}
          onBackToLogin={handleBackToLogin}
        />
      )}

      {activeScreen === 'setup' && (
        <BrandSetupConsole
          t={t} currentLang={currentLang} onLanguageChange={handleLanguageChange}
          brandName={activeBrandName} onBackToLogin={handleBackToLogin} onLaunchDashboard={handleLaunchDashboard}
        />
      )}

      {activeScreen === 'dashboard' && (
        <BrandDashboard
          t={t} currentLang={currentLang} onLanguageChange={handleLanguageChange}
          brandName={activeBrandName}
          onNavigateToSetup={() => updateScreen('setup')}
          onNavigateToCatalog={handleNavigateToCatalog}
          onNavigateToCatalogTab={handleNavigateToCatalogTab}
          onNavigateToInventory={handleNavigateToInventory}
          onNavigateToInStore={handleNavigateToInStore}
          onNavigateToCampaigns={handleNavigateToCampaigns}
          onNavigateToSales={handleNavigateToSales}
          onNavigateToDevSettings={handleNavigateToDevSettings}
          onSignOut={handleBackToLogin}
        />
      )}

      {activeScreen === 'catalog' && (
        <GarmentCatalog
          t={t} currentLang={currentLang} onLanguageChange={handleLanguageChange}
          brandName={activeBrandName}
          onNavigateToOverview={handleNavigateToOverview}
          onNavigateToInventory={handleNavigateToInventory}
          onNavigateToInStore={handleNavigateToInStore}
          onNavigateToCampaigns={handleNavigateToCampaigns}
          onNavigateToSales={handleNavigateToSales}
          onNavigateToDevSettings={handleNavigateToDevSettings}
          onSignOut={handleBackToLogin}
          initialSubcategory={catalogSubTab}
        />
      )}

      {activeScreen === 'inventory' && (
        <InventorySync
          t={t} currentLang={currentLang} onLanguageChange={handleLanguageChange}
          brandName={activeBrandName}
          onNavigateToOverview={handleNavigateToOverview}
          onNavigateToCatalog={handleNavigateToCatalog}
          onNavigateToInStore={handleNavigateToInStore}
          onNavigateToCampaigns={handleNavigateToCampaigns}
          onNavigateToSales={handleNavigateToSales}
          onNavigateToDevSettings={handleNavigateToDevSettings}
          onSignOut={handleBackToLogin}
        />
      )}

      {activeScreen === 'instore' && (
        <InStoreKiosks
          t={t} currentLang={currentLang} onLanguageChange={handleLanguageChange}
          brandName={activeBrandName}
          onNavigateToOverview={handleNavigateToOverview}
          onNavigateToCatalog={handleNavigateToCatalog}
          onNavigateToInventory={handleNavigateToInventory}
          onNavigateToCampaigns={handleNavigateToCampaigns}
          onNavigateToSales={handleNavigateToSales}
          onNavigateToDevSettings={handleNavigateToDevSettings}
          onSignOut={handleBackToLogin}
        />
      )}

      {activeScreen === 'campaigns' && (
        <CampaignsAds
          t={t} currentLang={currentLang} onLanguageChange={handleLanguageChange}
          brandName={activeBrandName}
          onNavigateToOverview={handleNavigateToOverview}
          onNavigateToCatalog={handleNavigateToCatalog}
          onNavigateToInventory={handleNavigateToInventory}
          onNavigateToInStore={handleNavigateToInStore}
          onNavigateToSales={handleNavigateToSales}
          onNavigateToDevSettings={handleNavigateToDevSettings}
          onSignOut={handleBackToLogin}
        />
      )}

      {activeScreen === 'sales' && (
        <SalesEarnings
          t={t} currentLang={currentLang} onLanguageChange={handleLanguageChange}
          brandName={activeBrandName}
          onNavigateToOverview={handleNavigateToOverview}
          onNavigateToCatalog={handleNavigateToCatalog}
          onNavigateToInventory={handleNavigateToInventory}
          onNavigateToInStore={handleNavigateToInStore}
          onNavigateToCampaigns={handleNavigateToCampaigns}
          onNavigateToDevSettings={handleNavigateToDevSettings}
          onSignOut={handleBackToLogin}
        />
      )}

      {activeScreen === 'devsettings' && (
        <DeveloperSettings
          t={t} currentLang={currentLang} onLanguageChange={handleLanguageChange}
          brandName={activeBrandName}
          onNavigateToOverview={handleNavigateToOverview}
          onNavigateToCatalog={handleNavigateToCatalog}
          onNavigateToInventory={handleNavigateToInventory}
          onNavigateToInStore={handleNavigateToInStore}
          onNavigateToCampaigns={handleNavigateToCampaigns}
          onNavigateToSales={handleNavigateToSales}
          onSignOut={handleBackToLogin}
        />
      )}
    </>
  );
}
