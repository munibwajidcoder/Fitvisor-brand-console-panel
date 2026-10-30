'use client';

import React, { useState } from 'react';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Translations } from '../translations';

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (rangeText: string) => void;
  t: Translations;
}

export const DateRangeModal: React.FC<DateRangeModalProps> = ({
  isOpen,
  onClose,
  onApply,
  t,
}) => {
  const [startDate, setStartDate] = useState('10/01/2026');
  const [endDate, setEndDate] = useState('10/25/2026');
  const [selectedPreset, setSelectedPreset] = useState<'7d' | '30d' | '3m' | '6m'>('30d');

  if (!isOpen) return null;

  // October 2026 starts on Thursday
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const leadingBlanks = [null, null, null, null];

  const isSelected = (day: number) => day >= 1 && day <= 25;
  const isStart = (day: number) => day === 1;
  const isEnd = (day: number) => day === 25;

  const handleApply = () => {
    onApply(`Oct 01 - Oct 25, 2026`);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="date-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="date-modal-header">
          <div className="date-modal-title">
            <Calendar size={18} className="modal-cal-icon" />
            <span>Select Custom Date Range</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Start / End Date Inputs */}
        <div className="date-inputs-row">
          <div className="date-input-col">
            <span className="date-input-label">START DATE</span>
            <div className="date-field-box">
              <Calendar size={14} className="field-cal-icon" />
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="date-text-input"
              />
            </div>
          </div>

          <div className="date-input-col">
            <span className="date-input-label">END DATE</span>
            <div className="date-field-box">
              <Calendar size={14} className="field-cal-icon" />
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="date-text-input"
              />
            </div>
          </div>
        </div>

        {/* Calendar Grid Container */}
        <div className="calendar-sheet">
          {/* Month Header */}
          <div className="calendar-sheet-header">
            <button type="button" className="cal-nav-btn" aria-label="Previous month">
              <ChevronLeft size={16} />
            </button>
            <span className="cal-month-title">October 2026</span>
            <button type="button" className="cal-nav-btn" aria-label="Next month">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day Names */}
          <div className="cal-days-header">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Days Grid */}
          <div className="cal-grid">
            {leadingBlanks.map((_, i) => (
              <div key={`blank-${i}`} className="cal-cell blank" />
            ))}
            {daysInMonth.map((day) => {
              const selected = isSelected(day);
              const start = isStart(day);
              const end = isEnd(day);
              return (
                <div
                  key={day}
                  className={`cal-cell ${selected ? 'in-range' : ''} ${start ? 'range-start' : ''} ${end ? 'range-end' : ''}`}
                >
                  <span className="day-number">{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Select Presets */}
        <div className="quick-select-section">
          <span className="quick-select-label">QUICK SELECT</span>
          <div className="quick-select-grid">
            <button
              type="button"
              className={`preset-btn ${selectedPreset === '7d' ? 'active' : ''}`}
              onClick={() => setSelectedPreset('7d')}
            >
              Last 7 days
            </button>
            <button
              type="button"
              className={`preset-btn ${selectedPreset === '30d' ? 'active' : ''}`}
              onClick={() => setSelectedPreset('30d')}
            >
              Last 30 days
            </button>
            <button
              type="button"
              className={`preset-btn ${selectedPreset === '3m' ? 'active' : ''}`}
              onClick={() => setSelectedPreset('3m')}
            >
              Last 3 months
            </button>
            <button
              type="button"
              className={`preset-btn ${selectedPreset === '6m' ? 'active' : ''}`}
              onClick={() => setSelectedPreset('6m')}
            >
              Last 6 months
            </button>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="date-modal-actions">
          <button type="button" className="modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="modal-apply-btn" onClick={handleApply}>
            Apply Range
          </button>
        </div>
      </div>
    </div>
  );
};
