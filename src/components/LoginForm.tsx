'use client';

import React, { useState, useRef } from 'react';
import { Mail, Lock, Eye, EyeOff, Users, Check, Loader2, CheckCircle2 } from 'lucide-react';
import { Translations } from '../translations';
import { FitvisorLogo } from './FitvisorLogo';

interface LoginFormProps {
  t: Translations;
  onLoginSuccess?: (brandName: string) => void;
  onApplyPartnership?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ t, onLoginSuccess, onApplyPartnership }) => {
  const [email, setEmail] = useState('merchant@brand.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState<string[]>(['1', '2', '3', '4', '5', '6']);
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const chars = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      chars.forEach((c, i) => {
        if (i < 6) newOtp[i] = c;
      });
      setOtp(newOtp);
      const nextIdx = Math.min(chars.length, 5);
      setActiveOtpIndex(nextIdx);
      otpInputRefs.current[nextIdx]?.focus();
      return;
    }

    const cleaned = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleaned;
    setOtp(newOtp);

    if (cleaned && index < 5) {
      setActiveOtpIndex(index + 1);
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        setActiveOtpIndex(index - 1);
        otpInputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveOtpIndex(index - 1);
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      setActiveOtpIndex(index + 1);
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        // Extract brand from email or default to Zalando SE
        let detectedBrand = 'Zalando SE';
        if (email.includes('@')) {
          const domainPart = email.split('@')[1].split('.')[0];
          if (domainPart && domainPart !== 'brand') {
            detectedBrand = domainPart.charAt(0).toUpperCase() + domainPart.slice(1) + ' Fashion';
          }
        }
        if (onLoginSuccess) {
          onLoginSuccess(detectedBrand);
        }
      }, 900);
    }, 1000);
  };

  return (
    <div className="sign-in-card">
      {/* Mobile-Only Fitvisor Logo */}
      <div className="mobile-form-logo">
        <FitvisorLogo variant="dark" height={32} />
      </div>

      {/* Top Access Pill */}
      <div className="partner-pill">
        <Users size={14} strokeWidth={2.5} />
        <span>{t.partnerAccessPortal}</span>
      </div>

      {/* Header Titles */}
      <h2 className="card-title">{t.signInHeading}</h2>
      <p className="card-subtitle">{t.signInSubheading}</p>

      {/* Form Body */}
      <form onSubmit={handleSubmit} noValidate>
        {/* Work Email Address */}
        <div className="form-group">
          <label htmlFor="email-input" className="form-label">
            {t.emailLabel}
          </label>
          <div className="input-container">
            <span className="input-prefix-icon">
              <Mail size={17} strokeWidth={1.8} />
            </span>
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="form-input"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password-input" className="form-label">
            {t.passwordLabel}
          </label>
          <div className="input-container">
            <span className="input-prefix-icon">
              <Lock size={17} strokeWidth={1.8} />
            </span>
            <input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              className="form-input"
              required
            />
            <button
              type="button"
              className="input-suffix-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff size={18} strokeWidth={1.8} />
              ) : (
                <Eye size={18} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>

        {/* Remember Workstation Checkbox */}
        <div
          className="remember-row"
          onClick={() => setRememberMe(!rememberMe)}
          role="checkbox"
          aria-checked={rememberMe}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              setRememberMe(!rememberMe);
            }
          }}
        >
          <div className={`custom-checkbox ${rememberMe ? 'checked' : ''}`}>
            {rememberMe && <Check size={12} strokeWidth={3} />}
          </div>
          <span className="remember-text">{t.rememberWorkstation}</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-btn"
          id="verify-submit-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>{t.submitting}</span>
            </>
          ) : (
            <span>{t.verifyButton}</span>
          )}
        </button>

      </form>

      {/* Success Toast */}
      {showToast && (
        <div className="alert-toast" role="alert">
          <div className="toast-icon">
            <CheckCircle2 size={20} />
          </div>
          <div className="toast-content">
            <span className="toast-title">{t.successTitle}</span>
            <span className="toast-desc">{t.successMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};
