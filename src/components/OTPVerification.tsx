'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Shield, Clock, Lock, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Translations } from '../translations';
import { FitvisorLogo } from './FitvisorLogo';
import { LanguageSelector } from './LanguageSelector';
import { Language } from '../translations';

interface OTPVerificationProps {
  t: Translations;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onVerifySuccess: () => void;
  onBackToLogin: () => void;
}

const OTP_LENGTH = 6;
const RESEND_SECONDS = 43;

export const OTPVerification: React.FC<OTPVerificationProps> = ({
  t,
  currentLang,
  onLanguageChange,
  onVerifySuccess,
  onBackToLogin,
}) => {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [activeIdx, setActiveIdx] = useState(0);
  const [verifyState, setVerifyState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(id);
  }, [countdown]);

  const focusInput = (idx: number) => {
    const clamped = Math.max(0, Math.min(OTP_LENGTH - 1, idx));
    setActiveIdx(clamped);
    inputRefs.current[clamped]?.focus();
  };

  const handleChange = (idx: number, val: string) => {
    const clean = val.replace(/\D/g, '');
    if (!clean && val !== '') return;

    if (clean.length > 1) {
      // Handle paste
      const chars = clean.slice(0, OTP_LENGTH).split('');
      const next = [...digits];
      chars.forEach((c, i) => { if (idx + i < OTP_LENGTH) next[idx + i] = c; });
      setDigits(next);
      const nextFocus = Math.min(idx + chars.length, OTP_LENGTH - 1);
      focusInput(nextFocus);
      return;
    }

    const next = [...digits];
    next[idx] = clean;
    setDigits(next);
    setErrorMsg('');

    if (clean && idx < OTP_LENGTH - 1) focusInput(idx + 1);
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (!digits[idx] && idx > 0) {
        const next = [...digits];
        next[idx - 1] = '';
        setDigits(next);
        focusInput(idx - 1);
      } else {
        const next = [...digits];
        next[idx] = '';
        setDigits(next);
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      focusInput(idx - 1);
    } else if (e.key === 'ArrowRight' && idx < OTP_LENGTH - 1) {
      focusInput(idx + 1);
    }
  };

  const handleVerify = useCallback(() => {
    const code = digits.join('');
    if (code.length < OTP_LENGTH) {
      setErrorMsg(t.otpErrInvalid);
      return;
    }
    setVerifyState('loading');
    setErrorMsg('');

    // Simulate verification — any 6-digit code passes
    setTimeout(() => {
      setVerifyState('success');
      setTimeout(() => { onVerifySuccess(); }, 900);
    }, 1000);
  }, [digits, t.otpErrInvalid, onVerifySuccess]);

  const handleResend = () => {
    setDigits(Array(OTP_LENGTH).fill(''));
    setCountdown(RESEND_SECONDS);
    setErrorMsg('');
    setVerifyState('idle');
    focusInput(0);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="otp-screen-wrapper">
      {/* Language selector top-right */}
      <div className="otp-lang-wrap">
        <LanguageSelector currentLang={currentLang} onLanguageChange={onLanguageChange} />
      </div>

      <div className="otp-card">
        {/* Logo */}
        <div className="otp-logo-wrap">
          <FitvisorLogo variant="dark" height={38} showConsoleSubtext={false} />
        </div>

        {/* Shield icon */}
        <div className="otp-shield-wrap">
          <div className="otp-shield-bg">
            <Shield size={22} className="otp-shield-icon" />
          </div>
        </div>

        {/* Title */}
        <h1 className="otp-title">{t.otpTitle}</h1>

        {/* Subtitle */}
        <p className="otp-subtitle">
          {t.otpSubtitle}<br />
          <strong className="otp-phone">{t.otpPhone}</strong>
        </p>

        {/* OTP Digit inputs */}
        <div className="otp-digits-row">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={d}
              className={`otp-digit ${activeIdx === i ? 'otp-digit-active' : ''} ${errorMsg ? 'otp-digit-err' : ''} ${verifyState === 'success' ? 'otp-digit-ok' : ''}`}
              onFocus={() => setActiveIdx(i)}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              aria-label={`Digit ${i + 1}`}
              disabled={verifyState === 'loading' || verifyState === 'success'}
            />
          ))}
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="otp-error-msg">
            <AlertCircle size={14} /><span>{errorMsg}</span>
          </div>
        )}

        {/* Resend row */}
        <div className="otp-resend-row">
          <Clock size={14} className="otp-clock-icon" />
          {countdown > 0 ? (
            <span className="otp-resend-label">{t.otpResendLabel} <strong>00:{pad(countdown)}</strong></span>
          ) : (
            <button type="button" className="otp-resend-btn" onClick={handleResend}>
              {t.otpResendBtn}
            </button>
          )}
        </div>

        {/* Verify button — Pearl Pink */}
        <button
          type="button"
          className="otp-verify-btn"
          onClick={handleVerify}
          disabled={verifyState === 'loading' || verifyState === 'success'}
        >
          {verifyState === 'loading' ? (
            <><Loader2 size={18} className="animate-spin" /><span>{t.otpVerifying}</span></>
          ) : verifyState === 'success' ? (
            <><CheckCircle2 size={18} /><span>{t.otpSuccess}</span></>
          ) : (
            <>
              <span>{t.otpVerifyBtn}</span>
              <ArrowRight size={18} />
              {/* Three animated indicators */}
              <span className="otp-btn-dots">
                <span className="otp-btn-dot" style={{ animationDelay: '0s' }} />
                <span className="otp-btn-dot" style={{ animationDelay: '0.2s' }} />
                <span className="otp-btn-dot" style={{ animationDelay: '0.4s' }} />
              </span>
            </>
          )}
        </button>

        {/* Security note */}
        <div className="otp-security-note">
          <Lock size={12} className="otp-lock-icon" />
          <span>{t.otpSecurity}</span>
        </div>

        {/* Back link */}
        <button type="button" className="otp-back-link" onClick={onBackToLogin}>
          ← {currentLang === 'fr' ? 'Retour' : 'Back'}
        </button>
      </div>
    </div>
  );
};
