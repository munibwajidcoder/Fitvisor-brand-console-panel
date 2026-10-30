'use client';

import React from 'react';
import Image from 'next/image';

interface FitvisorLogoProps {
  /**
   * 'dark'  — light/white background  → uses fitvisor-logo.png (full icon + red Fit + navy Visor)
   * 'light' — dark/navy background    → uses fitvisor-logo-light.png (white version for dark bg)
   * 'text'  — pure CSS text mark      → red "Fit" + navy "Visor", no image (mobile fallback)
   */
  variant?: 'light' | 'dark' | 'text';
  height?: number;
  showConsoleSubtext?: boolean;
  subtext?: string;
  isLogin?: boolean;
}

export const FitvisorLogo: React.FC<FitvisorLogoProps> = ({
  variant = 'dark',
  height = 42,
  showConsoleSubtext = false,
  subtext = 'Brand Console',
}) => {

  // Mobile logo — uses the same fitvisor-logo.png as 'dark' but constrained for small headers
  if (variant === 'text') {
    const imgWidth = Math.round(height * 4.72);
    return (
      <div className="fitvisor-brand-logo-container text" style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src="/fitvisor-logo.png"
          alt="FitVisor"
          width={imgWidth}
          height={height}
          priority
          style={{
            objectFit: 'contain',
            height: `${height}px`,
            width: 'auto',
            maxWidth: '100%',
          }}
        />
        {showConsoleSubtext && (
          <>
            <span className="brand-logo-separator" style={{ margin: '0 8px' }}>|</span>
            <span className="brand-console-tag">{subtext}</span>
          </>
        )}
      </div>
    );
  }

  // For dark backgrounds (sidebar navy, hero overlay): use fitvisor-lockup.png
  // Transparent background, icon + red "Fit" + white "Visor" — correct for dark overlays.
  // Aspect ratio of fitvisor-lockup.png is 798:181 ≈ 4.41:1
  if (variant === 'light') {
    const imgWidth = Math.round(height * 4.41);
    return (
      <div className="fitvisor-brand-logo-container light" style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src="/fitvisor-lockup.png"
          alt="FitVisor"
          width={imgWidth}
          height={height}
          priority
          style={{
            objectFit: 'contain',
            height: `${height}px`,
            width: 'auto',
            maxWidth: '100%',
            background: 'transparent',
          }}
        />
        {showConsoleSubtext && (
          <>
            <span className="brand-logo-separator" style={{ margin: '0 10px', color: 'rgba(255,255,255,0.35)' }}>|</span>
            <span className="brand-console-tag" style={{ color: 'rgba(255,255,255,0.9)' }}>{subtext}</span>
          </>
        )}
      </div>
    );
  }

  // variant === 'dark': light/white background — use the complete fitvisor-logo.png asset
  // This is the full logo: rounded square icon + "Fit" (red) + "Visor" (navy)
  // Aspect ratio of fitvisor-logo.png is 775:164 ≈ 4.72:1
  const imgWidth = Math.round(height * 4.72);

  return (
    <div className="fitvisor-brand-logo-container dark" style={{ display: 'flex', alignItems: 'center' }}>
      <Image
        src="/fitvisor-logo.png"
        alt="FitVisor"
        width={imgWidth}
        height={height}
        priority
        style={{
          objectFit: 'contain',
          height: `${height}px`,
          width: 'auto',
          maxWidth: '100%',
        }}
      />
      {showConsoleSubtext && (
        <>
          <span className="brand-logo-separator" style={{ margin: '0 10px' }}>|</span>
          <span className="brand-console-tag">{subtext}</span>
        </>
      )}
    </div>
  );
};
