'use client';

import React, { useState, useRef } from 'react';
import {
  X,
  Box,
  Tag,
  Barcode,
  Layers,
  CircleDollarSign,
  Upload,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { Translations } from '../translations';

// ---- Product type matching GarmentCatalog product model ----
export interface Product {
  id: string;
  name: string;
  category: string;
  categoryClass: string;
  variants: string;
  price: string;
  stock: number;
  status: string;
  statusType: 'live' | 'baking' | 'draft';
  thumbEmoji: string;
  thumbBg: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: (product: Product) => void;
  t: Translations;
}

// Maps category key → pill class, emoji, bg color
const CATEGORY_META: Record<string, { cls: string; emoji: string; bg: string }> = {
  Outerwear:   { cls: 'cat-pill-blue',   emoji: '🧥', bg: '#D9C8B4' },
  Pants:       { cls: 'cat-pill-purple', emoji: '👖', bg: '#93B3D2' },
  Dresses:     { cls: 'cat-pill-pink',   emoji: '👗', bg: '#C2596A' },
  Tops:        { cls: 'cat-pill-teal',   emoji: '👕', bg: '#E8ECEF' },
  Footwear:    { cls: 'cat-pill-blue',   emoji: '👟', bg: '#C8D8C4' },
  Accessories: { cls: 'cat-pill-purple', emoji: '👜', bg: '#D4C8D8' },
};

// EU sizes shown in the screenshot
const EU_SIZES = ['EU 34', 'EU 36', 'EU 38', 'EU 40', 'EU 42', 'EU 44'];

// Color dot mapping
const COLOR_DOTS: Record<string, string> = {
  apColorCamelBeige: '#C8A882',
  apColorBlack: '#1A1A1A',
  apColorWhite: '#F5F5F5',
  apColorNavy: '#1B2A4A',
  apColorRed: '#E02D1B',
  apColorBeige: '#E8D8C0',
  apColorGrey: '#9B9B9B',
  apColorOlive: '#6B7B3A',
  apColorBrown: '#7B4E2D',
};

// Color key → internal English value (used for variant string building)
const COLOR_EN: Record<string, string> = {
  apColorCamelBeige: 'Camel Beige',
  apColorBlack: 'Black',
  apColorWhite: 'White',
  apColorNavy: 'Navy',
  apColorRed: 'Red',
  apColorBeige: 'Beige',
  apColorGrey: 'Grey',
  apColorOlive: 'Olive',
  apColorBrown: 'Brown',
};

let skuCounter = 2025;
function generateSku(sku: string, category: string): string {
  if (sku.trim()) return sku.trim().toUpperCase();
  skuCounter++;
  const prefix = category.slice(0, 3).toUpperCase();
  return `ZAL-${prefix}-${skuCounter}`;
}

interface FormErrors {
  name?: string;
  category?: string;
  price?: string;
  sizes?: string;
  colors?: string;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen, onClose, onProductAdded, t,
}) => {
  // Form state
  const [name, setName]               = useState('');
  const [sku, setSku]                 = useState('');
  const [category, setCategory]       = useState('');
  const [price, setPrice]             = useState('');
  const [meshFile, setMeshFile]       = useState<File | null>(null);
  const [isDragging, setIsDragging]   = useState(false);
  const [selectedSizes, setSizes]     = useState<string[]>([]);
  const [selectedColor, setColor]     = useState('apColorCamelBeige');

  // UI state
  const [errors,     setErrors]       = useState<FormErrors>({});
  const [submitting, setSubmitting]   = useState(false);
  const [submitted,  setSubmitted]    = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const getCategoryOptions = () => [
    { key: 'Outerwear',   label: t.apCatOuterwear },
    { key: 'Pants',       label: t.apCatPants },
    { key: 'Dresses',     label: t.apCatDresses },
    { key: 'Tops',        label: t.apCatTops },
    { key: 'Footwear',    label: t.apCatFootwear },
    { key: 'Accessories', label: t.apCatAccessories },
  ];

  const getColorOptions = () => Object.keys(COLOR_DOTS).map(key => ({
    key,
    label: t[key as keyof Translations] as string,
    dot: COLOR_DOTS[key],
  }));

  const toggleSize = (s: string) =>
    setSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const resetForm = () => {
    setName(''); setSku(''); setCategory(''); setPrice('');
    setMeshFile(null); setSizes([]); setColor('apColorCamelBeige');
    setErrors({}); setSubmitting(false); setSubmitted(false);
  };

  const handleClose = () => { resetForm(); onClose(); };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setMeshFile(file);
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!name.trim()) errs.name = t.apErrName;
    if (!category)    errs.category = t.apErrCategory;
    const p = parseFloat(price.replace(',', '.'));
    if (!price.trim() || isNaN(p) || p < 0) errs.price = t.apErrPrice;
    if (selectedSizes.length === 0) errs.sizes = t.apErrStock;
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setErrors({});
    setSubmitting(true);

    setTimeout(() => {
      const meta = CATEGORY_META[category] ?? { cls: 'cat-pill-blue', emoji: '🧷', bg: '#E8ECEF' };
      const sizesPart = selectedSizes.length > 0 ? selectedSizes.join(' / ') : '';
      const colorPart = COLOR_EN[selectedColor] ?? selectedColor;
      const variants = [colorPart, sizesPart].filter(Boolean).join(' • ');

      const newProduct: Product = {
        id:            generateSku(sku, category),
        name:          name.trim(),
        category,
        categoryClass: meta.cls,
        variants,
        price:         `€${parseFloat(price.replace(',', '.')).toFixed(2)}`,
        stock:         100,
        status:        'Draft',
        statusType:    'draft',
        thumbEmoji:    meta.emoji,
        thumbBg:       meta.bg,
      };

      setSubmitting(false);
      setSubmitted(true);

      setTimeout(() => {
        onProductAdded(newProduct);
        handleClose();
      }, 900);
    }, 1000);
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="apg-container"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t.apModalTitle}
      >
        {/* ── HEADER ── */}
        <div className="apg-header">
          <div className="apg-header-text">
            <h2 className="apg-title">{t.apModalTitle}</h2>
            <p className="apg-subtitle">{t.apModalSubtitle}</p>
          </div>
          <button type="button" className="modal-close-btn" onClick={handleClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="apg-body">

          {/* ① Basic Details */}
          <section className="apg-section">
            <div className="apg-section-title">
              <span className="apg-section-num">1</span>
              <span>{t.apSection1}</span>
            </div>

            <div className="apg-grid-2">
              {/* Product Title */}
              <div className="apg-field">
                <label className="apg-label">
                  {t.apProductTitle} <span className="apg-required">*</span>
                </label>
                <div className={`apg-input-wrap ${errors.name ? 'apg-err' : ''}`}>
                  <Tag size={15} className="apg-icon" />
                  <input
                    type="text"
                    className="apg-input"
                    placeholder={t.apProductTitlePlaceholder}
                    value={name}
                    onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
                    maxLength={80}
                  />
                </div>
                {errors.name && <span className="apg-error">{errors.name}</span>}
              </div>

              {/* Brand Internal SKU */}
              <div className="apg-field">
                <label className="apg-label">
                  {t.apBrandSku} <span className="apg-required">*</span>
                </label>
                <div className="apg-input-wrap">
                  <Barcode size={15} className="apg-icon" />
                  <input
                    type="text"
                    className="apg-input"
                    placeholder={t.apBrandSkuPlaceholder}
                    value={sku}
                    onChange={e => setSku(e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="apg-field">
                <label className="apg-label">
                  {t.apCategory} <span className="apg-required">*</span>
                </label>
                <div className={`apg-input-wrap apg-select-wrap ${errors.category ? 'apg-err' : ''}`}>
                  <Layers size={15} className="apg-icon" />
                  <select
                    className="apg-select"
                    value={category}
                    onChange={e => { setCategory(e.target.value); setErrors(p => ({ ...p, category: undefined })); }}
                  >
                    <option value="">{t.apCategoryPlaceholder}</option>
                    {getCategoryOptions().map(o => (
                      <option key={o.key} value={o.key}>{o.label}</option>
                    ))}
                  </select>
                </div>
                {errors.category && <span className="apg-error">{errors.category}</span>}
              </div>

              {/* Retail Price */}
              <div className="apg-field">
                <label className="apg-label">
                  {t.apRetailPrice} <span className="apg-required">*</span>
                </label>
                <div className={`apg-input-wrap ${errors.price ? 'apg-err' : ''}`}>
                  <CircleDollarSign size={15} className="apg-icon" />
                  <input
                    type="text"
                    inputMode="decimal"
                    className="apg-input"
                    placeholder={t.apRetailPricePlaceholder}
                    value={price}
                    onChange={e => { setPrice(e.target.value); setErrors(p => ({ ...p, price: undefined })); }}
                  />
                </div>
                {errors.price && <span className="apg-error">{errors.price}</span>}
              </div>
            </div>
          </section>

          {/* ② 3D Mesh Upload */}
          <section className="apg-section">
            <div className="apg-section-title">
              <span className="apg-section-num">2</span>
              <span>{t.apSection2}</span>
            </div>

            <div
              className={`apg-dropzone ${isDragging ? 'apg-dropzone-active' : ''}`}
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".glb,.obj,.fbx"
                style={{ display: 'none' }}
                onChange={e => { if (e.target.files?.[0]) setMeshFile(e.target.files[0]); }}
              />
              {meshFile ? (
                <div className="apg-dropzone-filename">
                  <CheckCircle2 size={20} className="apg-dropzone-check" />
                  <span>{meshFile.name}</span>
                </div>
              ) : (
                <>
                  <Box size={36} className="apg-dropzone-icon" strokeWidth={1.4} />
                  <p className="apg-dropzone-title">{t.apDropZoneTitle}</p>
                  <p className="apg-dropzone-sub">{t.apDropZoneSubtitle}</p>
                </>
              )}
              <button
                type="button"
                className="apg-browse-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={15} />
                <span>{t.apBrowseFiles}</span>
              </button>
            </div>
          </section>

          {/* ③ Sizing Variants */}
          <section className="apg-section">
            <div className="apg-section-title">
              <span className="apg-section-num">3</span>
              <span>{t.apSection3}</span>
            </div>

            <div className="apg-field">
              <label className="apg-label">
                {t.apSizesAvailable} <span className="apg-required">*</span>
              </label>
              {errors.sizes && <span className="apg-error">{errors.sizes}</span>}
              <div className="apg-sizes-row">
                {EU_SIZES.map(sz => {
                  const active = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      type="button"
                      className={`apg-size-chip ${active ? 'apg-size-chip-active' : ''}`}
                      onClick={() => { toggleSize(sz); setErrors(p => ({ ...p, sizes: undefined })); }}
                    >
                      {active && <span className="apg-size-check">✓</span>}
                      <span>{sz}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ④ Colorways & Swatches */}
          <section className="apg-section">
            <div className="apg-section-title">
              <span className="apg-section-num">4</span>
              <span>{t.apSection4}</span>
            </div>

            <div className="apg-field">
              <label className="apg-label">{t.apColorName}</label>
              <div className="apg-color-row">
                {/* Color selector dropdown with dot */}
                <div className="apg-color-select-wrap">
                  <span
                    className="apg-color-dot"
                    style={{ background: COLOR_DOTS[selectedColor] }}
                  />
                  <select
                    className="apg-color-select"
                    value={selectedColor}
                    onChange={e => setColor(e.target.value)}
                  >
                    {getColorOptions().map(o => (
                      <option key={o.key} value={o.key}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* Add Color Variant button */}
                <button
                  type="button"
                  className="apg-add-color-btn"
                  onClick={() => {/* future: add multi-color support */}}
                >
                  {t.apAddColorVariant}
                </button>
              </div>
            </div>
          </section>

          {/* Success banner */}
          {submitted && (
            <div className="apg-success">
              <CheckCircle2 size={18} />
              <span>{t.apSuccessMsg}</span>
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <div className="apg-footer">
          <button type="button" className="apg-cancel" onClick={handleClose} disabled={submitting}>
            {t.apCancelBtn}
          </button>
          <button
            type="button"
            className="apg-save"
            onClick={handleSubmit}
            disabled={submitting || submitted}
          >
            {submitting ? (
              <><Loader2 size={16} className="animate-spin" /><span>{t.apSavingBtn}</span></>
            ) : submitted ? (
              <><CheckCircle2 size={16} /><span>{t.apSavedBtn}</span></>
            ) : (
              <><span>{t.apSaveBtn}</span><ArrowRight size={16} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
