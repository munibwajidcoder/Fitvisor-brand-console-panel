export type Language = 'en' | 'fr';

export interface Translations {
  // Screen 1: Sign-In
  partnerConsole: string;
  heroHeadline: string;
  heroHeadlinePart1: string;
  heroHeadlinePart2: string;
  heroSubtitle: string;
  badgeOauth: string;
  badgeOauthLine2: string;
  badgeStock: string;
  badgeStockLine2: string;
  badgeSla: string;
  partnerAccessPortal: string;
  signInHeading: string;
  signInSubheading: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  twoFactorLabel: string;
  rememberWorkstation: string;
  verifyButton: string;
  newBrand: string;
  applyPartnership: string;
  submitting: string;

  // OTP Verification Screen
  otpTitle: string;
  otpSubtitle: string;
  otpPhone: string;
  otpResendLabel: string;
  otpResendBtn: string;
  otpVerifyBtn: string;
  otpVerifying: string;
  otpSuccess: string;
  otpErrInvalid: string;
  otpErrExpired: string;
  otpSecurity: string;

  // Partnership Landing Screen
  partnerLandingTitle: string;
  partnerLandingSubtitle: string;
  partnerLandingBadge: string;
  partnerFeature1Title: string;
  partnerFeature1Desc: string;
  partnerFeature2Title: string;
  partnerFeature2Desc: string;
  partnerFeature3Title: string;
  partnerFeature3Desc: string;
  partnerCtaBtn: string;
  partnerCtaBtnSub: string;
  partnerSkipBtn: string;
  successTitle: string;
  successMessage: string;
  languageName: string;

  // Screen 2: Brand Setup Console
  brandConsoleTitle: string;
  stepIndicator: string;
  step1Title: string;
  step1Status: string;
  step2Title: string;
  step2Status: string;
  step3Title: string;
  step3Status: string;

  sec1Heading: string;
  sec1Subheading: string;
  brandDisplayName: string;
  legalEntityName: string;
  vatNumber: string;
  brandPrimaryCategory: string;
  catApparel: string;
  catFootwear: string;
  catAccessories: string;
  catLuxury: string;
  catBeauty: string;

  sec2Heading: string;
  sec2Subheading: string;
  conn1Title: string;
  conn1Badge: string;
  conn1Desc: string;
  conn2Title: string;
  conn2Desc: string;
  conn3Title: string;
  conn3Subtitle: string;
  conn3Desc: string;

  sec3Heading: string;
  sec3Subheading: string;
  agreedCommissionRate: string;
  commissionPlaceholder: string;
  attributionWindow: string;
  attributionOption30: string;
  attributionOption60: string;
  attributionOption90: string;
  termsCheckboxTextPre: string;
  termsSla: string;
  termsDpa: string;
  termsGuidelines: string;

  saveDraftBtn: string;
  signAndLaunchBtn: string;
  draftSavedToast: string;
  agreementSignedToast: string;
  backToLogin: string;

  // Screen 3: Brand Performance & Try-On Analytics Dashboard
  dashboardTitle: string;
  navOverview: string;
  navOverviewSub: string;
  navCatalogue: string;
  navCatalogueSub: string;
  navInventory: string;
  navInventorySub: string;
  navInStore: string;
  navInStoreSub: string;
  navCampaigns: string;
  navCampaignsSub: string;
  navSales: string;
  navSalesSub: string;
  navSettings: string;
  navSettingsSub: string;
  brandPartnerRole: string;
  searchPlaceholder: string;
  catalogFeedActive: string;
  dateRangeLast30: string;

  kpiVirtualTryOns: string;
  kpiVirtualTryOnsSub: string;
  kpiCtr: string;
  kpiCtrSub: string;
  kpiGmv: string;
  kpiGmvSub: string;
  kpiReturnRate: string;
  kpiReturnRatePill: string;

  chartTitle: string;
  chartLegendTryOns: string;
  chartLegendClicks: string;

  trendingTitle: string;
  garment1Title: string;
  garment1TryOns: string;
  garment2Title: string;
  garment2TryOns: string;
  garment3Title: string;
  garment3TryOns: string;
  garment4Title: string;
  garment4TryOns: string;

  syncNoticeText: string;
  resolveQuarantinedBtn: string;
  clickToScreen9: string;
  signOut: string;

  // Screen 4b: Size Mapping
  sizeMappingTitle: string;
  sizeMappingSubtitle: string;
  importSizeChartBtn: string;
  sizeMappingMatrixTitle: string;
  colBrandSize: string;
  colChestBust: string;
  colWaistRange: string;
  colHipRange: string;
  colRecommendedHeight: string;
  colFitCutTolerance: string;
  colMappingConfidence: string;
  calibratedLabel: string;
  fitPreferencesTitle: string;
  fitPrefExact: string;
  fitPrefRelaxed: string;
  saveCalibrationBtn: string;

  // Screen 4: Product Catalog
  tabProductCatalog: string;
  tabSizeMapping: string;
  tabAssetUpload: string;
  catalogPageTitle: string;
  catalogPageSubtitle: string;
  addSingleProductBtn: string;
  filterSearchPlaceholder: string;
  filterCategoryLabel: string;
  filterAllCategories: string;
  filterOuterwear: string;
  filterPants: string;
  filterDresses: string;
  filterTops: string;
  filterFootwear: string;
  filterAccessories: string;
  filter3dStatusLabel: string;
  filterAllStatuses: string;
  filterStatusLive: string;
  filterStatusBaking: string;
  filterStatusDraft: string;
  filterStockLabel: string;
  filterAllStock: string;
  filterInStock: string;
  filterOutOfStock: string;
  colProductSku: string;
  colCategory: string;
  colVariantsSizes: string;
  colPriceEur: string;
  colRealTimeStock: string;
  col3dStatus: string;
  colActions: string;
  inStockLabel: string;
  outOfStockLabel: string;
  viewDetails3dBtn: string;
  noProductsFound: string;
  showingProducts: string;
  assetUploadTitle: string;
  assetUploadComingSoon: string;
  notifCatalogSyncTitle: string;
  notifCatalogSyncDesc: string;
  notifSkuQuarantineTitle: string;
  notifSkuQuarantineDesc: string;
  notifMilestoneTitle: string;
  notifMilestoneDesc: string;
  notifSlaReportTitle: string;
  notifSlaReportDesc: string;
  notifMarkAllRead: string;
  notifNew: string;
  notifTimeMinutes: string;
  notifTime18Min: string;
  notifTime1Hour: string;
  notifTimeYesterday: string;

  // Add Product Modal
  apModalTitle: string;
  apModalSubtitle: string;
  apSection1: string;
  apProductTitle: string;
  apProductTitlePlaceholder: string;
  apBrandSku: string;
  apBrandSkuPlaceholder: string;
  apCategory: string;
  apCategoryPlaceholder: string;
  apRetailPrice: string;
  apRetailPricePlaceholder: string;
  apSection2: string;
  apDropZoneTitle: string;
  apDropZoneSubtitle: string;
  apBrowseFiles: string;
  apSection3: string;
  apSizesAvailable: string;
  apSection4: string;
  apColorName: string;
  apAddColorVariant: string;
  apCancelBtn: string;
  apSaveBtn: string;
  apSavingBtn: string;
  apSavedBtn: string;
  apSuccessMsg: string;
  apErrName: string;
  apErrCategory: string;
  apErrPrice: string;
  apErrStock: string;
  apErrVariants: string;
  apCatOuterwear: string;
  apCatPants: string;
  apCatDresses: string;
  apCatTops: string;
  apCatFootwear: string;
  apCatAccessories: string;
  apColorCamelBeige: string;
  apColorBlack: string;
  apColorWhite: string;
  apColorNavy: string;
  apColorRed: string;
  apColorBeige: string;
  apColorGrey: string;
  apColorOlive: string;
  apColorBrown: string;

  // Screen 5: Inventory & Sync
  invNavSub: string;
  invTabStock: string;
  invTabQuarantine: string;
  invPageTitle: string;
  invPageSubtitle: string;
  invWebhookConnected: string;
  invWebhookSyncAgo: string;
  invTotalLiveSku: string;
  invOutOfStockSku: string;
  invOutOfStockNote: string;
  invAvgLatency: string;
  invColSku: string;
  invColWebStock: string;
  invColBoutiqueStock: string;
  invColPrice: string;
  invColLastSynced: string;
  invColFreshness: string;
  invColAction: string;
  invStatusFresh: string;
  invStatusDepleted: string;
  invBtnAdjust: string;
  invBtnRestock: string;
  invMinsAgo: string;
  invQuarantineTitle: string;
  invQuarantineSubtitle: string;
  invQColSku: string;
  invQColIssue: string;
  invQColSeverity: string;
  invQColDetected: string;
  invQColStatus: string;
  invQColAction: string;
  invQSevHigh: string;
  invQSevMedium: string;
  invQStatusBlocked: string;
  invQStatusPending: string;
  invQBtnResolve: string;
  invQBtnReview: string;
  invQEmpty: string;

  // Quantities & Errors tab
  invTabQuantities: string;
  invIngestionNotice: string;
  invIngestionNoticeBold: string;
  invQtySuccessRate: string;
  invQtyQuarantinedSkus: string;
  invQtyRetryQueue: string;
  invQtyRetryQueueSub: string;
  invQtyTableTitle: string;
  invQtyRetryAll: string;
  invQtyColIngested: string;
  invQtyColTitle: string;
  invQtyColErrCategory: string;
  invQtyColErrSummary: string;
  invQtyColDetected: string;
  invQtyColResolution: string;
  invQtyErrMissingSizing: string;
  invQtyErrBadTexture: string;
  invQtyErrInvalidPrice: string;
  invQtyBtnFixSizing: string;
  invQtyBtnReuploadTexture: string;
  invQtyBtnEditPrice: string;

  // Screen 6: In-Store & Kiosks
  instoreNavSub: string;
  instoreTabStores: string;
  instoreTabFitting: string;
  instorePageTitle: string;
  instorePageSubtitle: string;
  instoreRegisterBtn: string;
  instoreKpiStores: string;
  instoreKpiTerminals: string;
  instoreKpiScans: string;
  instoreColLocation: string;
  instoreColAddress: string;
  instoreColKiosks: string;
  instoreColFeed: string;
  instoreColHardware: string;
  instoreColAction: string;
  instoreConnected: string;
  instoreOnline: string;
  instoreFirmwareUpdate: string;
  instoreManageBtn: string;
  instoreTerminals: string;
  instoreTerminalsSingle: string;
  instoreRegModalTitle: string;
  instoreRegModalSubtitle: string;
  instoreRegStoreName: string;
  instoreRegStoreNamePlaceholder: string;
  instoreRegCity: string;
  instoreRegCityPlaceholder: string;
  instoreRegAddress: string;
  instoreRegAddressPlaceholder: string;
  instoreRegTerminalCount: string;
  instoreRegTerminalCountPlaceholder: string;
  instoreRegCancelBtn: string;
  instoreRegSaveBtn: string;
  instoreRegSavingBtn: string;
  instoreRegSavedBtn: string;
  instoreRegSuccessMsg: string;
  instoreRegErrName: string;
  instoreRegErrCity: string;
  instoreRegErrAddress: string;
  instoreRegErrTerminals: string;
  instoreFittingTitle: string;
  instoreFittingSubtitle: string;
  instoreFittingEmpty: string;

  // Fitting Reservations data
  instoreFitColHoldId: string;
  instoreFitColCustomer: string;
  instoreFitColGarment: string;
  instoreFitColBoutique: string;
  instoreFitColTime: string;
  instoreFitColStatus: string;
  instoreFitColAction: string;
  instoreFitStatusHold: string;
  instoreFitStatusPreparing: string;
  instoreFitStatusConfirmed: string;
  instoreFitBtnPickedUp: string;
  instoreFitBtnAssign: string;
  instoreFitBtnManage: string;
  instoreFitFilterLocation: string;
  instoreFitAllStores: string;
  instoreFitFilterStatus: string;
  instoreFitPendingHold: string;
  instoreFitPreparedRoom: string;
  instoreFitCompleted: string;
  instoreFitPendingCount: string;

  // Screen 7: Campaigns & Ads
  campNavSub: string;
  campTabOverview: string;
  campTabCreate: string;
  campPageTitle: string;
  campPageSubtitle: string;
  campLaunchBtn: string;
  campKpiActive: string;
  campKpiSpend: string;
  campKpiCtr: string;
  campKpiBenchmark: string;
  campColName: string;
  campColPlacement: string;
  campColBudget: string;
  campColDates: string;
  campColImpressions: string;
  campColStatus: string;
  campColActions: string;
  campStatusLive: string;
  campStatusPending: string;
  campStatusDraft: string;
  campBtnPause: string;
  campBtnEdit: string;
  campBtnEditSettings: string;
  campViews: string;
  campTryOns: string;
  campSpent: string;
  campAwaitingData: string;
  // Create campaign modal
  campModalTitle: string;
  campModalSubtitle: string;
  campModalSec1: string;
  campModalNameLabel: string;
  campModalNamePlaceholder: string;
  campModalDatesLabel: string;
  campModalStartDate: string;
  campModalEndDate: string;
  campModalSec2: string;
  campModalSec2Sub: string;
  campPlacementHome: string;
  campPlacementHomeDesc: string;
  campPlacementPostTryon: string;
  campPlacementPostTryonDesc: string;
  campPlacementAI: string;
  campPlacementAIDesc: string;
  campModalSec3: string;
  campModalSec3Sub: string;
  campModalSec4: string;
  campModalSec4Sub: string;
  campBudgetLabel: string;
  campBudgetPlaceholder: string;
  campDailyCapLabel: string;
  campDailyCapPlaceholder: string;
  campSaveDraft: string;
  campSubmit: string;
  campSubmitting: string;
  campSubmitted: string;
  campSubmitSuccess: string;
  campErrName: string;
  campErrStartDate: string;
  campErrEndDate: string;
  campErrPlacement: string;
  campErrBudget: string;

  // Screen 8: Sales & Earnings
  salesNavSub: string;
  salesTabAttribution: string;
  salesTabInvoices: string;
  salesTabFitInsights: string;
  salesPageTitle: string;
  salesPageSubtitle: string;
  salesExportBtn: string;
  salesKpi1Label: string;
  salesKpi1Sub: string;
  salesKpi2Label: string;
  salesKpi2Sub: string;
  salesKpi3Label: string;
  salesKpi3Sub: string;
  salesKpi4Label: string;
  salesOrdersTitle: string;
  salesColOrderId: string;
  salesColTimestamp: string;
  salesColSku: string;
  salesColItems: string;
  salesColTotal: string;
  salesColChannel: string;
  salesColCustomer: string;
  salesNewCustomer: string;
  salesReturning: string;
  salesChannelApp: string;
  salesChannelWeb: string;
  salesChannelKiosk: string;
  // Invoices tab
  salesInvoicesTitle: string;
  salesInvoicesSubtitle: string;
  salesInvoicesEmpty: string;
  salesColInvoiceId: string;
  salesColPeriod: string;
  salesColGmv: string;
  salesColCommission: string;
  salesColStatus: string;
  salesColDownload: string;
  salesInvoicePaid: string;
  salesInvoicePending: string;
  salesDownloadBtn: string;
  // Fit Insights tab
  salesFitTitle: string;
  salesFitSubtitle: string;
  salesFitEmpty: string;

  // Invoices & Fees — full rebuilt page
  invKpi1Label: string;
  invKpi2Label: string;
  invKpi3Label: string;
  invKpi3Sub: string;
  invKpi4Label: string;
  invKpi4Sub: string;
  invStmtTitle: string;
  invStmtSubtitle: string;
  invColBillingCycle: string;
  invColOrders: string;
  invColGrossSales: string;
  invColCommission: string;
  invColReturns: string;
  invColNetFee: string;
  invColStatus: string;
  invColInvoiceDl: string;
  invStatusAccrual: string;
  invStatusSettled: string;
  invCurrentBadge: string;
  invBtnViewStatement: string;
  invBtnDownloadPdf: string;
  invViewerTitle: string;
  invViewerClose: string;
  invViewerLoading: string;
  invViewerError: string;
  invViewerZoomIn: string;
  invViewerZoomOut: string;
  invOrders: string;

  // Fit Insights — full rebuilt page
  fitPageTitle: string;
  fitPageSubtitle: string;
  fitBannerText: string;
  fitSizingTitle: string;
  fitLegendTrue: string;
  fitLegendTight: string;
  fitLoose: string;
  fitAlertsTitle: string;
  fitAlertBlazerId: string;
  fitAlertBlazerText: string;
  fitAlertBlazerRec: string;
  fitAlertJeansId: string;
  fitAlertJeansText: string;
  fitExportBtn: string;
  fitExportPdf: string;
  fitExportExcel: string;
  fitExporting: string;
  fitExportDone: string;
  fitExportError: string;
  fitGarmentBlazers: string;
  fitGarmentJeans: string;
  fitGarmentDresses: string;

  // Developer & Settings
  devSettingsNavSub: string;
  devTabApiKeys: string;
  devTabBrandProfile: string;
  devPageTitle: string;
  devPageSubtitle: string;
  devSec1Title: string;
  devClientIdLabel: string;
  devSecretKeyLabel: string;
  devCopyBtn: string;
  devCopied: string;
  devRegenerateBtn: string;
  devRegenerating: string;
  devRateLimitNote: string;
  devSec2Title: string;
  devWebhookUrlLabel: string;
  devWebhookUrlPlaceholder: string;
  devWebhookSecretLabel: string;
  devSubscribedEvents: string;
  devEventStock: string;
  devEventStockDesc: string;
  devEventPrice: string;
  devEventPriceDesc: string;
  devEventTryon: string;
  devEventTryonDesc: string;
  devSendPingBtn: string;
  devSendingPing: string;
  devPingSent: string;
  devPingError: string;
  devSaveWebhookBtn: string;
  devSavingWebhook: string;
  devWebhookSaved: string;
  devWebhookErrUrl: string;

  // Brand Profile & Team
  bpPageTitle: string;
  bpPageSubtitle: string;
  bpSec1Title: string;
  bpLogoLabel: string;
  bpLogoHint: string;
  bpLogoRec: string;
  bpLogoMax: string;
  bpChangeLogoBtn: string;
  bpBrandNameLabel: string;
  bpStorefrontLabel: string;
  bpStorefrontPlaceholder: string;
  bpSupportLabel: string;
  bpSupportPlaceholder: string;
  bpSaveProfileBtn: string;
  bpSavingProfile: string;
  bpProfileSaved: string;
  bpErrBrandName: string;
  bpSec2Title: string;
  bpInviteBtn: string;
  bpColName: string;
  bpColRole: string;
  bpColAccess: string;
  bpColStatus: string;
  bpStatusActive: string;
  bpStatusInactive: string;
  bpRoleAdmin: string;
  bpRoleMerchandiser: string;
  bpRoleDeveloper: string;
  bpAccessFull: string;
  bpAccessCatalog: string;
  bpAccessApi: string;
  bpInviteModalTitle: string;
  bpInviteNameLabel: string;
  bpInviteEmailLabel: string;
  bpInviteRoleLabel: string;
  bpInviteSendBtn: string;
  bpInviteSending: string;
  bpInviteSent: string;
  bpInviteErrName: string;
  bpInviteErrEmail: string;
  bpInviteErrRole: string;
  bpInviteCancel: string;

  // Three-dot menu & edit/deactivate
  bpMenuEdit?: string;
  bpMenuDeactivate?: string;
  bpDeactivateTitle?: string;
  bpDeactivateMsg?: string;
  bpDeactivateBtn?: string;
  bpDeactivating?: string;
  bpEditModalTitle?: string;
  bpLogoUploading?: string;
  bpLogoErrType?: string;
  bpLogoErrSize?: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Screen 1: Sign-In
    partnerConsole: "Partner Console",
    heroHeadline: "Connect Your Brand Catalog to Virtual Try-On.",
    heroHeadlinePart1: "Connect Your Brand",
    heroHeadlinePart2: "Catalog to Virtual Try-On.",
    heroSubtitle: "Enterprise portal for fashion brands, retailers, and in-store boutique partners.",
    badgeOauth: "OAuth 2.0 &",
    badgeOauthLine2: "MFA Enforced",
    badgeStock: "Real-Time",
    badgeStockLine2: "Stock Sync",
    badgeSla: "SLA Protected",
    partnerAccessPortal: "Partner Access Portal",
    signInHeading: "Brand Partner Sign-In",
    signInSubheading: "Enter your registered merchant credentials",
    emailLabel: "Work Email Address",
    emailPlaceholder: "merchant@brand.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    twoFactorLabel: "Authenticator 2FA Code",
    rememberWorkstation: "Remember this workstation for 14 days",
    verifyButton: "Verify & Enter Portal",
    newBrand: "New brand?",
    applyPartnership: "Apply for Fitvisor Partnership",
    submitting: "Verifying credentials...",

    // OTP Verification Screen (EN)
    otpTitle: "Two-Factor Authentication (MFA)",
    otpSubtitle: "We sent a 6-digit verification code via SMS to",
    otpPhone: "+1 (555) ***-8921.",
    otpResendLabel: "Resend code in",
    otpResendBtn: "Resend now",
    otpVerifyBtn: "Verify and Continue",
    otpVerifying: "Verifying…",
    otpSuccess: "Verified! Redirecting…",
    otpErrInvalid: "Invalid code. Please check and try again.",
    otpErrExpired: "Code expired. Please request a new one.",
    otpSecurity: "End-to-end encrypted biometric vault / TLS 1.3 compliant",

    // Partnership Landing Screen (EN)
    partnerLandingTitle: "Welcome to Fitvisor Brand Console",
    partnerLandingSubtitle: "Your gateway to AI-powered virtual try-on and global fashion commerce.",
    partnerLandingBadge: "Fitvisor Brand Partner",
    partnerFeature1Title: "AI Virtual Try-On",
    partnerFeature1Desc: "Let shoppers experience your garments in 3D before buying.",
    partnerFeature2Title: "Live Catalog Sync",
    partnerFeature2Desc: "Real-time stock, pricing, and product feed integration.",
    partnerFeature3Title: "Attributed Sales Analytics",
    partnerFeature3Desc: "Track every conversion driven by Fitvisor placements.",
    partnerCtaBtn: "Begin Brand Setup",
    partnerCtaBtnSub: "Takes less than 5 minutes",
    partnerSkipBtn: "Go to Dashboard",
    successTitle: "Authentication Successful",
    successMessage: "Launching Brand Console Setup...",
    languageName: "English",

    // Screen 2: Brand Setup Console
    brandConsoleTitle: "Brand Console",
    stepIndicator: "Step 1 of 3: Brand Setup",
    step1Title: "1. Legal Profile",
    step1Status: "Completed",
    step2Title: "Catalog Feed",
    step2Status: "Active",
    step3Title: "Contract SLA",
    step3Status: "Pending",

    sec1Heading: "1. Brand Identity & Legal Entity",
    sec1Subheading: "Provide your brand information and legal details for verification.",
    brandDisplayName: "Brand Display Name *",
    legalEntityName: "Legal Entity Name *",
    vatNumber: "VAT Number *",
    brandPrimaryCategory: "Brand Primary Category *",
    catApparel: "Apparel",
    catFootwear: "Footwear",
    catAccessories: "Accessories",
    catLuxury: "Luxury & Couture",
    catBeauty: "Beauty & Cosmetics",

    sec2Heading: "2. Catalog Connector Selection",
    sec2Subheading: "Choose how you will provide your product catalog to Fitvisor.",
    conn1Title: "Direct REST API / Webhooks",
    conn1Badge: "Recommended",
    conn1Desc: "Real-time sync with your product catalog via secure API endpoints.",
    conn2Title: "GraphQL Feed Connector",
    conn2Desc: "Flexible querying and real-time updates using GraphQL.",
    conn3Title: "Automated Catalog Scraper",
    conn3Subtitle: "(For legacy sites without API)",
    conn3Desc: "We handle the scraping and normalization of your product data.",

    sec3Heading: "3. Commercial Terms & Attribution SLA (PDF Page 10)",
    sec3Subheading: "Set your commercial terms and attribution settings.",
    agreedCommissionRate: "Agreed Commission Rate *",
    commissionPlaceholder: "8.5% on Attributed Sales",
    attributionWindow: "Attribution Window *",
    attributionOption30: "30-Day Referral Cookie",
    attributionOption60: "60-Day Referral Cookie",
    attributionOption90: "90-Day Referral Cookie",
    termsCheckboxTextPre: "I accept Fitvisor ",
    termsSla: "B2B Partner SLA",
    termsDpa: "Data Processing Agreement (DPA)",
    termsGuidelines: "Content Guidelines.",

    saveDraftBtn: "Save Draft & Exit",
    signAndLaunchBtn: "Sign Agreement & Launch Console",
    draftSavedToast: "Draft saved successfully",
    agreementSignedToast: "Agreement signed! Launching Brand Console Dashboard...",
    backToLogin: "Back to Sign-In",

    // Screen 3: Brand Performance & Try-On Analytics Dashboard
    dashboardTitle: "Brand Performance & Try-On Analytics",
    navOverview: "Overview",
    navOverviewSub: "Live Brand Performance & KPIs",
    navCatalogue: "Catalogue & 3D",
    navCatalogueSub: "Products, 3D Meshes, Sizing",
    navInventory: "Inventory & Sync",
    navInventorySub: "Stock, Prices, Quarantine",
    navInStore: "In-Store & Kiosks",
    navInStoreSub: "Physical Boutiques & Reservations",
    navCampaigns: "Campaigns & Ads",
    navCampaignsSub: "Sponsored Look Ads",
    navSales: "Sales & Earnings",
    navSalesSub: "Attribution, Invoices, Fit Report",
    navSettings: "Developer & Settings",
    navSettingsSub: "API Keys, Webhooks, Profile",
    brandPartnerRole: "Brand Partner",
    searchPlaceholder: "Search anything...",
    catalogFeedActive: "Catalog Feed: Active (48,200 SKUs)",
    dateRangeLast30: "Last 30 Days (Oct 2026)",

    kpiVirtualTryOns: "Total Virtual Try-Ons",
    kpiVirtualTryOnsSub: "Shoppers tried your garments",
    kpiCtr: "Click-Through to Store (CTR)",
    kpiCtrSub: "Redirected to your checkout",
    kpiGmv: "Attributed Gross Sales (GMV)",
    kpiGmvSub: "From Fitvisor referrals",
    kpiReturnRate: "Post-Try-On Return Rate",
    kpiReturnRatePill: "↓ -58% vs industry average!",

    chartTitle: "Try-On Engagement vs Store Redirections",
    chartLegendTryOns: "Virtual Try-Ons",
    chartLegendClicks: "Clicks to Buy",

    trendingTitle: "Top Trending Garments in Fitvisor App",
    garment1Title: "Slim Fit Wool Blazer",
    garment1TryOns: "12,410 try-ons",
    garment2Title: "High-Rise Straight Denim",
    garment2TryOns: "9,840 try-ons",
    garment3Title: "Cashmere Crewneck Sweater",
    garment3TryOns: "7,920 try-ons",
    garment4Title: "Oversized Trench Coat",
    garment4TryOns: "6,110 try-ons",

    syncNoticeText: "Sync Notice: 23 SKUs quarantined due to missing sizing specs.",
    resolveQuarantinedBtn: "Resolve Quarantined Items",
    clickToScreen9: "(Click to Screen 9)",
    signOut: "Sign Out",

    // Screen 4b: Size Mapping
    sizeMappingTitle: "Size Conversion Charts & Fit Rules",
    sizeMappingSubtitle: "Map your brand's sizing dimensions to Fitvisor's universal body measurement engine (PDF Page 8).",
    importSizeChartBtn: "Import Size Chart (CSV)",
    sizeMappingMatrixTitle: "Size Mapping Matrix",
    colBrandSize: "Brand Size",
    colChestBust: "Chest / Bust (cm)",
    colWaistRange: "Waist Range (cm)",
    colHipRange: "Hip Range (cm)",
    colRecommendedHeight: "Recommended Height",
    colFitCutTolerance: "Fit Cut Tolerance",
    colMappingConfidence: "Mapping Confidence",
    calibratedLabel: "100% Calibrated",
    fitPreferencesTitle: "Fit Recommendation Preferences",
    fitPrefExact: "Recommend exact anatomical fit",
    fitPrefRelaxed: "Bias toward relaxed fit for comfort",
    saveCalibrationBtn: "Save Calibration Rules",

    // Screen 4: Product Catalog
    tabProductCatalog: "Products Catalog",
    tabSizeMapping: "Size Mapping",
    tabAssetUpload: "Asset Upload",
    catalogPageTitle: "Garment Catalog & 3D Ingestion",
    catalogPageSubtitle: "Manage your active wardrobe collection, verify 3D mesh readiness, and monitor pricing.",
    addSingleProductBtn: "Add Single Product",
    filterSearchPlaceholder: "Search SKU, Product Name...",
    filterCategoryLabel: "Category",
    filterAllCategories: "All Categories",
    filterOuterwear: "Outerwear",
    filterPants: "Pants",
    filterDresses: "Dresses",
    filterTops: "Tops",
    filterFootwear: "Footwear",
    filterAccessories: "Accessories",
    filter3dStatusLabel: "3D Status",
    filterAllStatuses: "All Statuses",
    filterStatusLive: "Live 3D (Rigged)",
    filterStatusBaking: "3D Baking",
    filterStatusDraft: "Draft",
    filterStockLabel: "Stock",
    filterAllStock: "All Stock",
    filterInStock: "In Stock (>0)",
    filterOutOfStock: "Out of Stock",
    colProductSku: "Product & SKU",
    colCategory: "Category",
    colVariantsSizes: "Variants & Sizes",
    colPriceEur: "Price (EUR)",
    colRealTimeStock: "Real-Time Stock",
    col3dStatus: "3D Simulation Status",
    colActions: "Actions",
    inStockLabel: "in stock",
    outOfStockLabel: "0 in stock",
    viewDetails3dBtn: "View Details & 3D",
    noProductsFound: "No products match the current filters.",
    showingProducts: "Showing",
    assetUploadTitle: "Asset Upload",
    assetUploadComingSoon: "Asset upload functionality coming soon.",
    notifCatalogSyncTitle: "Catalog Sync Completed",
    notifCatalogSyncDesc: "48,200 SKUs successfully synced from your REST feed.",
    notifSkuQuarantineTitle: "23 SKUs Quarantined",
    notifSkuQuarantineDesc: "Missing size mapping data. Review required before 3D baking.",
    notifMilestoneTitle: "New Try-On Milestone",
    notifMilestoneDesc: "Your catalog reached 10,000 virtual try-ons this month.",
    notifSlaReportTitle: "SLA Report Ready",
    notifSlaReportDesc: "Your October performance report is available for download.",
    notifMarkAllRead: "Mark all as read",
    notifNew: "new",
    notifTimeMinutes: "2 minutes ago",
    notifTime18Min: "18 minutes ago",
    notifTime1Hour: "1 hour ago",
    notifTimeYesterday: "Yesterday",

    // Add Product Modal
    apModalTitle: "Add New Garment to Wardrobe Catalog",
    apModalSubtitle: "Upload product metadata, pricing, size variants, and 3D simulation assets.",
    apSection1: "Basic Details",
    apProductTitle: "Product Title",
    apProductTitlePlaceholder: "Oversized Trench Coat",
    apBrandSku: "Brand Internal SKU",
    apBrandSkuPlaceholder: "ZAL-TRN-2026",
    apCategory: "Category",
    apCategoryPlaceholder: "Select category…",
    apRetailPrice: "Retail Price (EUR)",
    apRetailPricePlaceholder: "€189.90",
    apSection2: "3D Mesh Upload",
    apDropZoneTitle: "Drag and drop 3D garment asset here (.GLB, .OBJ, or .FBX)",
    apDropZoneSubtitle: "Maximum file size 40MB. Must include diffuse, normal, and roughness PBR textures.",
    apBrowseFiles: "Browse Files",
    apSection3: "Sizing Variants",
    apSizesAvailable: "Sizes Available",
    apSection4: "Colorways & Swatches",
    apColorName: "Color Name",
    apAddColorVariant: "+ Add Color Variant",
    apCancelBtn: "Cancel",
    apSaveBtn: "Save & Start 3D Rig Validation",
    apSavingBtn: "Saving…",
    apSavedBtn: "Saved!",
    apSuccessMsg: "Product added successfully! Updating catalog…",
    apErrName: "Product title is required.",
    apErrCategory: "Please select a category.",
    apErrPrice: "Enter a valid price (e.g. 49.90).",
    apErrStock: "Select at least one size.",
    apErrVariants: "Select at least one color.",
    apCatOuterwear: "Outerwear",
    apCatPants: "Pants",
    apCatDresses: "Dresses",
    apCatTops: "Tops",
    apCatFootwear: "Footwear",
    apCatAccessories: "Accessories",
    apColorCamelBeige: "Camel Beige",
    apColorBlack: "Black",
    apColorWhite: "White",
    apColorNavy: "Navy",
    apColorRed: "Red",
    apColorBeige: "Beige",
    apColorGrey: "Grey",
    apColorOlive: "Olive",
    apColorBrown: "Brown",

    // Screen 5: Inventory & Sync
    invNavSub: "Stock, Prices, Quarantine",
    invTabStock: "Stock & Prices",
    invTabQuarantine: "Quarantine & Errors",
    invPageTitle: "Inventory Stock Levels & Pricing Freshness",
    invPageSubtitle: "Live stock balance across web commerce and physical retail stores.",
    invWebhookConnected: "Webhook Stream: Connected",
    invWebhookSyncAgo: "Last sync 4 mins ago",
    invTotalLiveSku: "Total Live SKUs",
    invOutOfStockSku: "Out-of-Stock SKUs",
    invOutOfStockNote: "Auto-hidden from app try-on",
    invAvgLatency: "Avg Webhook Sync Latency",
    invColSku: "SKU & Product Name",
    invColWebStock: "Web Store Stock",
    invColBoutiqueStock: "Boutique Store Stock",
    invColPrice: "Current Retail Price",
    invColLastSynced: "Last Synced",
    invColFreshness: "Freshness Status",
    invColAction: "Channel Action",
    invStatusFresh: "Fresh",
    invStatusDepleted: "Depleted / Inactive",
    invBtnAdjust: "Adjust Thresholds",
    invBtnRestock: "Restock Notice",
    invMinsAgo: "mins ago",
    invQuarantineTitle: "Quarantined SKUs & Sync Errors",
    invQuarantineSubtitle: "Items blocked from virtual try-on due to data quality or sync failures.",
    invQColSku: "SKU & Product",
    invQColIssue: "Issue Type",
    invQColSeverity: "Severity",
    invQColDetected: "Detected",
    invQColStatus: "Status",
    invQColAction: "Action",
    invQSevHigh: "High",
    invQSevMedium: "Medium",
    invQStatusBlocked: "Blocked",
    invQStatusPending: "Pending Review",
    invQBtnResolve: "Resolve",
    invQBtnReview: "Review",
    invQEmpty: "No quarantined items found.",

    // Quantities & Errors tab
    invTabQuantities: "Quantities & Errors",
    invIngestionNotice: "23 SKUs from your latest catalog feed were quarantined. Invalid items will NOT appear in virtual try-on until resolved.",
    invIngestionNoticeBold: "Ingestion Notice:",
    invQtySuccessRate: "Ingestion Success Rate",
    invQtyQuarantinedSkus: "Quarantined SKUs",
    invQtyRetryQueue: "Active",
    invQtyRetryQueueSub: "(Retrying every 30m)",
    invQtyTableTitle: "Quarantined Items",
    invQtyRetryAll: "Retry Ingestion on All 23 Items",
    invQtyColIngested: "Ingested SKU",
    invQtyColTitle: "Product Title",
    invQtyColErrCategory: "Error Category",
    invQtyColErrSummary: "Technical Error Summary",
    invQtyColDetected: "Detected Timestamp",
    invQtyColResolution: "Resolution Action",
    invQtyErrMissingSizing: "Missing Sizing",
    invQtyErrBadTexture: "Bad 3D Texture",
    invQtyErrInvalidPrice: "Invalid Price",
    invQtyBtnFixSizing: "Fix Sizing Now",
    invQtyBtnReuploadTexture: "Re-upload Texture",
    invQtyBtnEditPrice: "Edit Price Currency",

    // Screen 6: In-Store & Kiosks
    instoreNavSub: "Physical Boutiques & Reservations",
    instoreTabStores: "Store Locations & Kiosks",
    instoreTabFitting: "Fitting Reservations",
    instorePageTitle: "Physical Retail Boutiques & Smart Kiosks",
    instorePageSubtitle: "Manage brick-and-mortar stores equipped with Fitvisor interactive try-on terminals (PDF Page 10).",
    instoreRegisterBtn: "+ Register New Store Boutique",
    instoreKpiStores: "Partner Boutiques Integrated",
    instoreKpiTerminals: "Active In-Store Kiosks",
    instoreKpiScans: "Total In-Store Scans This Month",
    instoreColLocation: "Store Location & City",
    instoreColAddress: "Address",
    instoreColKiosks: "Active Kiosk Terminals",
    instoreColFeed: "Local Stock Feed",
    instoreColHardware: "Hardware Status",
    instoreColAction: "Terminal Action",
    instoreConnected: "Connected",
    instoreOnline: "Online",
    instoreFirmwareUpdate: "Firmware Update Available",
    instoreManageBtn: "Manage Kiosks",
    instoreTerminals: "Terminals",
    instoreTerminalsSingle: "Terminal",
    instoreRegModalTitle: "Register New Store Boutique",
    instoreRegModalSubtitle: "Add a new physical boutique to the Fitvisor kiosk network.",
    instoreRegStoreName: "Store Name",
    instoreRegStoreNamePlaceholder: "e.g. Zalando Hub Berlin",
    instoreRegCity: "City",
    instoreRegCityPlaceholder: "e.g. Berlin",
    instoreRegAddress: "Address",
    instoreRegAddressPlaceholder: "e.g. 12 Friedrichstraße, 10117 Berlin",
    instoreRegTerminalCount: "Number of Kiosk Terminals",
    instoreRegTerminalCountPlaceholder: "e.g. 3",
    instoreRegCancelBtn: "Cancel",
    instoreRegSaveBtn: "Register Boutique",
    instoreRegSavingBtn: "Registering…",
    instoreRegSavedBtn: "Registered!",
    instoreRegSuccessMsg: "Store boutique registered successfully.",
    instoreRegErrName: "Store name is required.",
    instoreRegErrCity: "City is required.",
    instoreRegErrAddress: "Address is required.",
    instoreRegErrTerminals: "Enter a valid number of terminals (1 or more).",
    instoreFittingTitle: "Fitting Room Reservations",
    instoreFittingSubtitle: "View and manage customer fitting room bookings across your boutique network.",
    instoreFittingEmpty: "No fitting reservations found.",

    // Fitting Reservations data
    instoreFitColHoldId: "Hold ID",
    instoreFitColCustomer: "Customer Pseudonym",
    instoreFitColGarment: "Reserved Garments & Sizes",
    instoreFitColBoutique: "Target Boutique",
    instoreFitColTime: "Reservation Time",
    instoreFitColStatus: "Hold Status",
    instoreFitColAction: "Store Action",
    instoreFitStatusHold: "Hold in Fitting Room",
    instoreFitStatusPreparing: "Store Staff Preparing",
    instoreFitStatusConfirmed: "Confirmed",
    instoreFitBtnPickedUp: "Mark as Picked Up",
    instoreFitBtnAssign: "Assign to Fitting Room",
    instoreFitBtnManage: "Manage Hold",
    instoreFitFilterLocation: "Filter by Boutique Location",
    instoreFitAllStores: "All Stores",
    instoreFitFilterStatus: "Filter by Status",
    instoreFitPendingHold: "Pending Hold",
    instoreFitPreparedRoom: "Prepared in Fitting Room",
    instoreFitCompleted: "Completed",
    instoreFitPendingCount: "8 Pending",

    // Screen 7: Campaigns & Ads
    campNavSub: "Sponsored Look Ads",
    campTabOverview: "Campaigns Overview",
    campTabCreate: "Create Campaign",
    campPageTitle: "Sponsored Capsule Collections & Native Ads",
    campPageSubtitle: "Manage contextual brand placements in app outfit recommendations (PDF Page 10).",
    campLaunchBtn: "+ Launch New Campaign",
    campKpiActive: "Active Campaigns",
    campKpiSpend: "Total Ad Spend",
    campKpiCtr: "Sponsored Look Click-Through Rate",
    campKpiBenchmark: "Benchmark: 2.1%",
    campColName: "Campaign Name & Creative",
    campColPlacement: "Targeted Placement",
    campColBudget: "Budget & Pacing",
    campColDates: "Dates",
    campColImpressions: "Impressions & Try-Ons",
    campColStatus: "Status",
    campColActions: "Actions",
    campStatusLive: "Live",
    campStatusPending: "Pending Approval",
    campStatusDraft: "Draft",
    campBtnPause: "Pause",
    campBtnEdit: "Edit",
    campBtnEditSettings: "Edit Settings",
    campViews: "views",
    campTryOns: "try-ons",
    campSpent: "spent",
    campAwaitingData: "— (awaiting data)",
    campModalTitle: "Create Sponsored Ad Campaign",
    campModalSubtitle: "Launch a targeted campaign to showcase your collection across Fitvisor's in-app touchpoints.",
    campModalSec1: "1. Campaign Details",
    campModalNameLabel: "Campaign Name",
    campModalNamePlaceholder: "Winter Holiday Partywear Capsule",
    campModalDatesLabel: "Target Dates",
    campModalStartDate: "Start Date",
    campModalEndDate: "End Date",
    campModalSec2: "2. Placement Selection",
    campModalSec2Sub: "Choose where your campaign will appear in the Fitvisor app.",
    campPlacementHome: "Home Screen Featured Rack",
    campPlacementHomeDesc: "High visibility banner",
    campPlacementPostTryon: "Post-Try-On Smart Outfit Pairings",
    campPlacementPostTryonDesc: "Contextual suggestions",
    campPlacementAI: "AI Stylist Chatbot Recommendations",
    campPlacementAIDesc: "\"Ce blazer te va bien…\"",
    campModalSec3: "3. Product Selection",
    campModalSec3Sub: "Select the SKUs you want to feature in this campaign.",
    campModalSec4: "4. Budget & Bidding",
    campModalSec4Sub: "Set your campaign budget and daily spend limit.",
    campBudgetLabel: "Total Campaign Budget",
    campBudgetPlaceholder: "€5,000",
    campDailyCapLabel: "Daily Cap",
    campDailyCapPlaceholder: "€250 / day",
    campSaveDraft: "Save as Draft",
    campSubmit: "Submit Campaign for Review",
    campSubmitting: "Submitting…",
    campSubmitted: "Submitted!",
    campSubmitSuccess: "Campaign submitted for review successfully.",
    campErrName: "Campaign name is required.",
    campErrStartDate: "Start date is required.",
    campErrEndDate: "End date is required.",
    campErrPlacement: "Please select a placement.",
    campErrBudget: "Enter a valid budget amount.",

    // Screen 8: Sales & Earnings
    salesNavSub: "Attribution, Invoices, Fit Report",
    salesTabAttribution: "Sales Attribution",
    salesTabInvoices: "Invoices & Fees",
    salesTabFitInsights: "Fit Insights",
    salesPageTitle: "Attributed E-Commerce Sales",
    salesPageSubtitle: "Track purchases generated through Fitvisor virtual try-on redirects to your website.",
    salesExportBtn: "Export Orders CSV",
    salesKpi1Label: "Virtual Try-Ons",
    salesKpi1Sub: "sessions",
    salesKpi2Label: "Clicked 'Buy on Brand Website'",
    salesKpi2Sub: "redirects (24.8% CTR)",
    salesKpi3Label: "Completed Purchases",
    salesKpi3Sub: "orders (23.0% conversion)",
    salesKpi4Label: "Gross Attributed GMV",
    salesOrdersTitle: "Attributed Orders",
    salesColOrderId: "Order ID",
    salesColTimestamp: "Timestamp",
    salesColSku: "Referral SKU Tried On",
    salesColItems: "Purchased Items",
    salesColTotal: "Order Total (EUR)",
    salesColChannel: "Attribution Channel",
    salesColCustomer: "Customer Status",
    salesNewCustomer: "New Customer",
    salesReturning: "Returning Shopper",
    salesChannelApp: "Mobile App Deep Link",
    salesChannelWeb: "Web Extension",
    salesChannelKiosk: "In-Store Kiosk QR",
    salesInvoicesTitle: "Invoices & Platform Fees",
    salesInvoicesSubtitle: "Monthly commission invoices and platform fee statements.",
    salesInvoicesEmpty: "No invoices found.",
    salesColInvoiceId: "Invoice ID",
    salesColPeriod: "Billing Period",
    salesColGmv: "Attributed GMV",
    salesColCommission: "Commission (8.5%)",
    salesColStatus: "Status",
    salesColDownload: "Download",
    salesInvoicePaid: "Paid",
    salesInvoicePending: "Pending",
    salesDownloadBtn: "Download PDF",
    salesFitTitle: "Fit Insights & Conversion Analytics",
    salesFitSubtitle: "Understand how fit accuracy drives conversion and reduces returns.",
    salesFitEmpty: "Fit Insights data is being processed. Check back shortly.",

    // Invoices & Fees — full rebuilt page (EN)
    invKpi1Label: "Total October Attributed GMV",
    invKpi2Label: "Fitvisor Commission (8.5%)",
    invKpi3Label: "Reconciled Return Deductions",
    invKpi3Sub: "Refunds offset from commission",
    invKpi4Label: "Net Payable Fee for October",
    invKpi4Sub: "Due Nov 15",
    invStmtTitle: "Monthly Invoices Statement",
    invStmtSubtitle: "Track attributed sales, commission fees, return deductions, and monthly payout statements.",
    invColBillingCycle: "Billing Cycle",
    invColOrders: "Total Attributed Orders",
    invColGrossSales: "Gross Sales GMV",
    invColCommission: "Contract Commission %",
    invColReturns: "Returns Reconciled",
    invColNetFee: "Net Commission Fee",
    invColStatus: "Status",
    invColInvoiceDl: "Invoice Download",
    invStatusAccrual: "Current Accrual",
    invStatusSettled: "Settled & Paid",
    invCurrentBadge: "Current",
    invBtnViewStatement: "View Statement",
    invBtnDownloadPdf: "Download PDF",
    invViewerTitle: "Invoice Statement",
    invViewerClose: "Close",
    invViewerLoading: "Loading document…",
    invViewerError: "Unable to load document. Please try again.",
    invViewerZoomIn: "Zoom in",
    invViewerZoomOut: "Zoom out",
    invOrders: "orders",

    // Fit Insights — full rebuilt page (EN)
    fitPageTitle: "Morphological Fit & Returns Analysis",
    fitPageSubtitle: "Actionable sizing feedback collected from shopper body scans and post-purchase reviews.",
    fitBannerText: "E-Commerce Return Rate Reduced from 68% down to 11.2% for customers using Fitvisor 3D virtual try-on.",
    fitSizingTitle: "Sizing Sentiment Breakdown by Garment Category",
    fitLegendTrue: "True to Size (82%)",
    fitLegendTight: "Feels Too Tight (11%)",
    fitLoose: "Feels Too Loose (7%)",
    fitAlertsTitle: "Specific Garment Fit Alerts",
    fitAlertBlazerId: "SKU-ZAL-091 (Blazer)",
    fitAlertBlazerText: "18% of shoppers with shoulder width >42cm reported tight shoulder armholes.",
    fitAlertBlazerRec: "Recommendation: Recommend sizing up for athletic builds.",
    fitAlertJeansId: "SKU-ZAL-044 (Jeans)",
    fitAlertJeansText: "94% reported perfect waist-to-hip ratio.",
    fitExportBtn: "Export Full Morphological Sizing Report (PDF/Excel)",
    fitExportPdf: "Export PDF",
    fitExportExcel: "Export Excel",
    fitExporting: "Exporting…",
    fitExportDone: "Exported!",
    fitExportError: "Export failed. Please try again.",
    fitGarmentBlazers: "Blazers",
    fitGarmentJeans: "Jeans",
    fitGarmentDresses: "Dresses",

    // Developer & Settings (EN)
    devSettingsNavSub: "API Keys, Webhooks, Profile",
    devTabApiKeys: "API Keys & Webhooks",
    devTabBrandProfile: "Brand Profile & Team",
    devPageTitle: "Developer Credentials & Webhooks",
    devPageSubtitle: "Manage OAuth 2.0 client keys, configure stock change webhooks, and test endpoints.",
    devSec1Title: "REST & GraphQL API Keys",
    devClientIdLabel: "Client ID",
    devSecretKeyLabel: "Secret Key",
    devCopyBtn: "Copy",
    devCopied: "Copied!",
    devRegenerateBtn: "Regenerate Key",
    devRegenerating: "Regenerating…",
    devRateLimitNote: "API Rate Limit: 10,000 requests / minute (Current usage: 14%)",
    devSec2Title: "Webhooks Configuration",
    devWebhookUrlLabel: "Webhook Delivery URL",
    devWebhookUrlPlaceholder: "https://api.yourbrand.com/fitvisor/webhooks/v1",
    devWebhookSecretLabel: "Webhook Secret Signing Key",
    devSubscribedEvents: "Subscribed Events",
    devEventStock: "stock.depleted",
    devEventStockDesc: "Triggers real-time out-of-stock",
    devEventPrice: "product.price_updated",
    devEventPriceDesc: "Reflects discount instantly",
    devEventTryon: "tryon.converted",
    devEventTryonDesc: "Attributed purchase signal",
    devSendPingBtn: "Send Test Ping Webhook",
    devSendingPing: "Sending…",
    devPingSent: "Ping sent!",
    devPingError: "Ping failed. Check your URL.",
    devSaveWebhookBtn: "Save Webhook Settings",
    devSavingWebhook: "Saving…",
    devWebhookSaved: "Settings saved!",
    devWebhookErrUrl: "Please enter a valid webhook URL.",

    // Brand Profile & Team (EN)
    bpPageTitle: "Brand Profile & Team Access",
    bpPageSubtitle: "Manage your brand information and team members with appropriate access levels.",
    bpSec1Title: "Brand Profile",
    bpLogoLabel: "Brand Logo",
    bpLogoHint: "Upload your brand logo (PNG, JPG).",
    bpLogoRec: "Recommended size: 400 × 400px",
    bpLogoMax: "Max size: 2MB",
    bpChangeLogoBtn: "Change Logo",
    bpBrandNameLabel: "Brand Display Name",
    bpStorefrontLabel: "Storefront URL",
    bpStorefrontPlaceholder: "https://yourbrand.com",
    bpSupportLabel: "Support Contact",
    bpSupportPlaceholder: "support@yourbrand.com",
    bpSaveProfileBtn: "Save Profile",
    bpSavingProfile: "Saving…",
    bpProfileSaved: "Profile saved!",
    bpErrBrandName: "Brand display name is required.",
    bpSec2Title: "Authorized Merchant Team Users",
    bpInviteBtn: "+ Invite Team Member",
    bpColName: "Name & Email",
    bpColRole: "Role",
    bpColAccess: "Access Level",
    bpColStatus: "Status",
    bpStatusActive: "Active",
    bpStatusInactive: "Inactive",
    bpRoleAdmin: "Brand Admin",
    bpRoleMerchandiser: "Catalog Merchandiser",
    bpRoleDeveloper: "Developer / Technical",
    bpAccessFull: "Full Portal Access",
    bpAccessCatalog: "Products & 3D Only",
    bpAccessApi: "API & Webhooks Only",
    bpInviteModalTitle: "Invite Team Member",
    bpInviteNameLabel: "Full Name",
    bpInviteEmailLabel: "Work Email",
    bpInviteRoleLabel: "Role",
    bpInviteSendBtn: "Send Invite",
    bpInviteSending: "Sending…",
    bpInviteSent: "Invite sent!",
    bpInviteErrName: "Name is required.",
    bpInviteErrEmail: "A valid email is required.",
    bpInviteErrRole: "Please select a role.",
    bpInviteCancel: "Cancel",
    bpMenuEdit: "Edit",
    bpMenuDeactivate: "Deactivate",
    bpDeactivateTitle: "Deactivate Member?",
    bpDeactivateMsg: "This will revoke portal access for {name}. You can reactivate them at any time.",
    bpDeactivateBtn: "Deactivate",
    bpDeactivating: "Deactivating…",
    bpEditModalTitle: "Edit Team Member",
    bpLogoUploading: "Uploading…",
    bpLogoErrType: "Invalid file type. Use PNG, JPG, or WebP.",
    bpLogoErrSize: "File exceeds the 2MB size limit.",
  },
  fr: {
    // Screen 1: Sign-In
    partnerConsole: "Console Partenaire",
    heroHeadline: "Connectez Votre Catalogue de Marque à l'Essayage Virtuel.",
    heroHeadlinePart1: "Connectez Votre",
    heroHeadlinePart2: "Catalogue de Marque à l'Essayage Virtuel.",
    heroSubtitle: "Portail d'entreprise pour les marques de mode, détaillants et boutiques partenaires.",
    badgeOauth: "OAuth 2.0 &",
    badgeOauthLine2: "2FA Renforcée",
    badgeStock: "Synchronisation",
    badgeStockLine2: "Stocks en Direct",
    badgeSla: "Protégé par SLA",
    partnerAccessPortal: "Portail d'Accès Partenaire",
    signInHeading: "Connexion Partenaire Marque",
    signInSubheading: "Saisissez vos identifiants marchands enregistrés",
    emailLabel: "Adresse E-mail Professionnelle",
    emailPlaceholder: "marchand@marque.fr",
    passwordLabel: "Mot de passe",
    passwordPlaceholder: "••••••••",
    twoFactorLabel: "Code 2FA Authenticator",
    rememberWorkstation: "Mémoriser ce poste pendant 14 jours",
    verifyButton: "Vérifier & Entrer sur le Portail",
    newBrand: "Nouvelle marque ?",
    applyPartnership: "Demander un Partenariat Fitvisor",
    submitting: "Vérification des identifiants...",

    // OTP Verification Screen (FR)
    otpTitle: "Authentification à Deux Facteurs (MFA)",
    otpSubtitle: "Nous avons envoyé un code de vérification à 6 chiffres par SMS au",
    otpPhone: "+1 (555) ***-8921.",
    otpResendLabel: "Renvoyer le code dans",
    otpResendBtn: "Renvoyer maintenant",
    otpVerifyBtn: "Vérifier et Continuer",
    otpVerifying: "Vérification…",
    otpSuccess: "Vérifié ! Redirection…",
    otpErrInvalid: "Code invalide. Veuillez vérifier et réessayer.",
    otpErrExpired: "Code expiré. Veuillez en demander un nouveau.",
    otpSecurity: "Coffre-fort biométrique chiffré de bout en bout / Conforme TLS 1.3",

    // Partnership Landing Screen (FR)
    partnerLandingTitle: "Bienvenue dans la Console Marque Fitvisor",
    partnerLandingSubtitle: "Votre passerelle vers l'essayage virtuel IA et le commerce de mode mondial.",
    partnerLandingBadge: "Partenaire Marque Fitvisor",
    partnerFeature1Title: "Essayage Virtuel IA",
    partnerFeature1Desc: "Permettez aux acheteurs d'essayer vos vêtements en 3D avant d'acheter.",
    partnerFeature2Title: "Synchronisation Catalogue en Direct",
    partnerFeature2Desc: "Intégration en temps réel des stocks, prix et flux produits.",
    partnerFeature3Title: "Analytiques de Ventes Attribuées",
    partnerFeature3Desc: "Suivez chaque conversion générée par les placements Fitvisor.",
    partnerCtaBtn: "Démarrer la Configuration Marque",
    partnerCtaBtnSub: "Prend moins de 5 minutes",
    partnerSkipBtn: "Aller au Tableau de Bord",
    successTitle: "Authentification Réussie",
    successMessage: "Lancement de la Configuration Console Marque...",
    languageName: "Français",

    // Screen 2: Brand Setup Console
    brandConsoleTitle: "Console Marque",
    stepIndicator: "Étape 1 sur 3 : Configuration Marque",
    step1Title: "1. Profil Juridique",
    step1Status: "Complété",
    step2Title: "Flux Catalogue",
    step2Status: "Actif",
    step3Title: "SLA Contractuel",
    step3Status: "En attente",

    sec1Heading: "1. Identité de la Marque & Entité Juridique",
    sec1Subheading: "Renseignez les informations de votre marque et vos données légales pour vérification.",
    brandDisplayName: "Nom Public de la Marque *",
    legalEntityName: "Raison Sociale / Entité Légale *",
    vatNumber: "Numéro de TVA Intracommunautaire *",
    brandPrimaryCategory: "Catégorie Principale de la Marque *",
    catApparel: "Vêtements & Prêt-à-porter",
    catFootwear: "Chaussures",
    catAccessories: "Accessoires",
    catLuxury: "Luxe & Haute Couture",
    catBeauty: "Beauté & Cosmétiques",

    sec2Heading: "2. Sélection du Connecteur de Catalogue",
    sec2Subheading: "Choisissez le mode de transmission de votre catalogue produits vers Fitvisor.",
    conn1Title: "API Directe REST / Webhooks",
    conn1Badge: "Recommandé",
    conn1Desc: "Synchronisation temps réel avec votre catalogue produits via des endpoints sécurisés.",
    conn2Title: "Connecteur de Flux GraphQL",
    conn2Desc: "Requêtes flexibles et mises à jour en direct grâce à GraphQL.",
    conn3Title: "Scraper Automatisé de Catalogue",
    conn3Subtitle: "(Pour sites anciens sans API)",
    conn3Desc: "Nous prenons en charge l'extraction et la normalisation de vos données produits.",

    sec3Heading: "3. Conditions Commerciales & SLA d'Attribution (PDF Page 10)",
    sec3Subheading: "Définissez vos conditions commerciales et paramètres d'attribution.",
    agreedCommissionRate: "Taux de Commission Convenu *",
    commissionPlaceholder: "8.5% sur les Ventes Attribuées",
    attributionWindow: "Fenêtre d'Attribution *",
    attributionOption30: "Cookie de Parrainage 30 Jours",
    attributionOption60: "Cookie de Parrainage 60 Jours",
    attributionOption90: "Cookie de Parrainage 90 Jours",
    termsCheckboxTextPre: "J'accepte le ",
    termsSla: "SLA Partenaire B2B Fitvisor",
    termsDpa: "l'Accord sur le Traitement des Données (DPA)",
    termsGuidelines: "Directives de Contenu.",

    saveDraftBtn: "Sauvegarder Brouillon & Quitter",
    signAndLaunchBtn: "Signer le Contrat & Lancer la Console",
    draftSavedToast: "Brouillon enregistré avec succès",
    agreementSignedToast: "Contrat signé ! Lancement du Tableau de Bord Marque...",
    backToLogin: "Retour à la Connexion",

    // Screen 3: Brand Performance & Try-On Analytics Dashboard
    dashboardTitle: "Performance de Marque & Statistiques d'Essayage",
    navOverview: "Vue d'ensemble",
    navOverviewSub: "KPIs & Performance en Direct",
    navCatalogue: "Catalogue & 3D",
    navCatalogueSub: "Produits, Maillages 3D, Tailles",
    navInventory: "Stocks & Sync",
    navInventorySub: "Stocks, Prix, Quarantaine",
    navInStore: "En Boutique & Bornes",
    navInStoreSub: "Boutiques Physiques & Réservations",
    navCampaigns: "Campagnes & Pubs",
    navCampaignsSub: "Annonces Look Sponsorisé",
    navSales: "Ventes & Revenus",
    navSalesSub: "Attribution, Factures, Rapport Fit",
    navSettings: "Développeur & Paramètres",
    navSettingsSub: "Clés API, Webhooks, Profil",
    brandPartnerRole: "Partenaire Marque",
    searchPlaceholder: "Rechercher...",
    catalogFeedActive: "Flux Catalogue : Actif (48 200 SKUs)",
    dateRangeLast30: "30 Derniers Jours (Oct 2026)",

    kpiVirtualTryOns: "Total des Essayages Virtuels",
    kpiVirtualTryOnsSub: "Acheteurs ayant essayé vos vêtements",
    kpiCtr: "Taux de Clic vers Boutique (CTR)",
    kpiCtrSub: "Redirigés vers votre panier",
    kpiGmv: "Volume d'Affaires Brut Attribué (GMV)",
    kpiGmvSub: "Issu des recommandations Fitvisor",
    kpiReturnRate: "Taux de Retour Post-Essayage",
    kpiReturnRatePill: "↓ -58% par rapport à la moyenne du secteur !",

    chartTitle: "Engagement d'Essayage vs Redirections Boutique",
    chartLegendTryOns: "Essayages Virtuels",
    chartLegendClicks: "Clics d'Achat",

    trendingTitle: "Vêtements Tendance dans l'App Fitvisor",
    garment1Title: "Blazer en Laine Coupe Ajustée",
    garment1TryOns: "12 410 essayages",
    garment2Title: "Jean Droit Taille Haute",
    garment2TryOns: "9 840 essayages",
    garment3Title: "Pull Ras-du-Cou en Cachemire",
    garment3TryOns: "7 920 essayages",
    garment4Title: "Trench-Coat Oversize",
    garment4TryOns: "6 110 essayages",

    syncNoticeText: "Avis de Sync : 23 SKUs mis en quarantaine pour absence de spécifications de taille.",
    resolveQuarantinedBtn: "Résoudre les Articles en Quarantaine",
    clickToScreen9: "(Cliquer vers Écran 9)",
    signOut: "Déconnexion",

    // Screen 4b: Size Mapping
    sizeMappingTitle: "Tableaux de Conversion des Tailles & Règles d'Ajustement",
    sizeMappingSubtitle: "Associez les dimensions de taille de votre marque au moteur universel de mesure corporelle de Fitvisor (PDF Page 8).",
    importSizeChartBtn: "Importer le Tableau des Tailles (CSV)",
    sizeMappingMatrixTitle: "Matrice de Correspondance des Tailles",
    colBrandSize: "Taille Marque",
    colChestBust: "Tour de Poitrine (cm)",
    colWaistRange: "Tour de Taille (cm)",
    colHipRange: "Tour de Hanches (cm)",
    colRecommendedHeight: "Hauteur Recommandée",
    colFitCutTolerance: "Tolérance de Coupe",
    colMappingConfidence: "Confiance de Correspondance",
    calibratedLabel: "100% Calibré",
    fitPreferencesTitle: "Préférences de Recommandation d'Ajustement",
    fitPrefExact: "Recommander un ajustement anatomique exact",
    fitPrefRelaxed: "Privilégier un ajustement détendu pour le confort",
    saveCalibrationBtn: "Enregistrer les Règles de Calibration",

    // Screen 4: Product Catalog
    tabProductCatalog: "Catalogue Produits",
    tabSizeMapping: "Correspondance des Tailles",
    tabAssetUpload: "Téléchargement d'Actifs",
    catalogPageTitle: "Catalogue Vêtements & Intégration 3D",
    catalogPageSubtitle: "Gérez votre collection de garde-robe active, vérifiez la préparation des maillages 3D et surveillez les prix.",
    addSingleProductBtn: "Ajouter un Produit",
    filterSearchPlaceholder: "Rechercher SKU, Nom du produit...",
    filterCategoryLabel: "Catégorie",
    filterAllCategories: "Toutes les Catégories",
    filterOuterwear: "Vêtements d'Extérieur",
    filterPants: "Pantalons",
    filterDresses: "Robes",
    filterTops: "Hauts",
    filterFootwear: "Chaussures",
    filterAccessories: "Accessoires",
    filter3dStatusLabel: "Statut 3D",
    filterAllStatuses: "Tous les Statuts",
    filterStatusLive: "3D En Direct (Riggé)",
    filterStatusBaking: "Cuisson 3D",
    filterStatusDraft: "Brouillon",
    filterStockLabel: "Stock",
    filterAllStock: "Tout le Stock",
    filterInStock: "En Stock (>0)",
    filterOutOfStock: "Rupture de Stock",
    colProductSku: "Produit & SKU",
    colCategory: "Catégorie",
    colVariantsSizes: "Variantes & Tailles",
    colPriceEur: "Prix (EUR)",
    colRealTimeStock: "Stock en Temps Réel",
    col3dStatus: "Statut Simulation 3D",
    colActions: "Actions",
    inStockLabel: "en stock",
    outOfStockLabel: "0 en stock",
    viewDetails3dBtn: "Voir Détails & 3D",
    noProductsFound: "Aucun produit ne correspond aux filtres actuels.",
    showingProducts: "Affichage",
    assetUploadTitle: "Téléchargement d'Actifs",
    assetUploadComingSoon: "Fonctionnalité de téléchargement d'actifs bientôt disponible.",
    notifCatalogSyncTitle: "Synchronisation Catalogue Terminée",
    notifCatalogSyncDesc: "48 200 SKUs synchronisés avec succès depuis votre flux REST.",
    notifSkuQuarantineTitle: "23 SKUs en Quarantaine",
    notifSkuQuarantineDesc: "Données de taille manquantes. Révision requise avant la cuisson 3D.",
    notifMilestoneTitle: "Nouveau Jalon d'Essayages",
    notifMilestoneDesc: "Votre catalogue a atteint 10 000 essayages virtuels ce mois-ci.",
    notifSlaReportTitle: "Rapport SLA Disponible",
    notifSlaReportDesc: "Votre rapport de performance d'octobre est disponible au téléchargement.",
    notifMarkAllRead: "Tout marquer comme lu",
    notifNew: "nouveau",
    notifTimeMinutes: "il y a 2 minutes",
    notifTime18Min: "il y a 18 minutes",
    notifTime1Hour: "il y a 1 heure",
    notifTimeYesterday: "Hier",

    // Add Product Modal
    apModalTitle: "Ajouter un Nouveau Vêtement au Catalogue Garde-Robe",
    apModalSubtitle: "Téléchargez les métadonnées produit, la tarification, les variantes de taille et les actifs de simulation 3D.",
    apSection1: "Informations de Base",
    apProductTitle: "Titre du Produit",
    apProductTitlePlaceholder: "Trench-Coat Oversize",
    apBrandSku: "SKU Interne de la Marque",
    apBrandSkuPlaceholder: "ZAL-TRN-2026",
    apCategory: "Catégorie",
    apCategoryPlaceholder: "Sélectionner une catégorie…",
    apRetailPrice: "Prix de Vente (EUR)",
    apRetailPricePlaceholder: "€189.90",
    apSection2: "Téléchargement du Maillage 3D",
    apDropZoneTitle: "Glissez-déposez l'actif 3D du vêtement ici (.GLB, .OBJ, ou .FBX)",
    apDropZoneSubtitle: "Taille maximale 40 Mo. Doit inclure les textures PBR diffuse, normale et rugosité.",
    apBrowseFiles: "Parcourir les Fichiers",
    apSection3: "Variantes de Taille",
    apSizesAvailable: "Tailles Disponibles",
    apSection4: "Coloris & Nuanciers",
    apColorName: "Nom de la Couleur",
    apAddColorVariant: "+ Ajouter un Coloris",
    apCancelBtn: "Annuler",
    apSaveBtn: "Enregistrer & Lancer la Validation Rig 3D",
    apSavingBtn: "Enregistrement…",
    apSavedBtn: "Enregistré !",
    apSuccessMsg: "Produit ajouté avec succès ! Mise à jour du catalogue…",
    apErrName: "Le titre du produit est obligatoire.",
    apErrCategory: "Veuillez sélectionner une catégorie.",
    apErrPrice: "Saisissez un prix valide (ex : 49.90).",
    apErrStock: "Sélectionnez au moins une taille.",
    apErrVariants: "Sélectionnez au moins une couleur.",
    apCatOuterwear: "Vêtements d'Extérieur",
    apCatPants: "Pantalons",
    apCatDresses: "Robes",
    apCatTops: "Hauts",
    apCatFootwear: "Chaussures",
    apCatAccessories: "Accessoires",
    apColorCamelBeige: "Beige Camel",
    apColorBlack: "Noir",
    apColorWhite: "Blanc",
    apColorNavy: "Marine",
    apColorRed: "Rouge",
    apColorBeige: "Beige",
    apColorGrey: "Gris",
    apColorOlive: "Olive",
    apColorBrown: "Marron",

    // Screen 5: Inventory & Sync
    invNavSub: "Stocks, Prix, Quarantaine",
    invTabStock: "Stocks & Prix",
    invTabQuarantine: "Quarantaine & Erreurs",
    invPageTitle: "Niveaux de Stock & Fraîcheur des Prix",
    invPageSubtitle: "Solde de stock en direct sur le commerce web et les boutiques physiques.",
    invWebhookConnected: "Flux Webhook : Connecté",
    invWebhookSyncAgo: "Dernière sync il y a 4 min",
    invTotalLiveSku: "Total SKUs Actifs",
    invOutOfStockSku: "SKUs en Rupture de Stock",
    invOutOfStockNote: "Masqués automatiquement de l'essayage",
    invAvgLatency: "Latence Moy. Sync Webhook",
    invColSku: "SKU & Nom du Produit",
    invColWebStock: "Stock Boutique Web",
    invColBoutiqueStock: "Stock Boutique Physique",
    invColPrice: "Prix de Vente Actuel",
    invColLastSynced: "Dernière Synchro",
    invColFreshness: "Fraîcheur",
    invColAction: "Action Canal",
    invStatusFresh: "Frais",
    invStatusDepleted: "Épuisé / Inactif",
    invBtnAdjust: "Ajuster les Seuils",
    invBtnRestock: "Avis de Réapprovisionnement",
    invMinsAgo: "min passées",
    invQuarantineTitle: "SKUs en Quarantaine & Erreurs de Sync",
    invQuarantineSubtitle: "Articles bloqués de l'essayage virtuel en raison de problèmes de qualité des données.",
    invQColSku: "SKU & Produit",
    invQColIssue: "Type de Problème",
    invQColSeverity: "Gravité",
    invQColDetected: "Détecté",
    invQColStatus: "Statut",
    invQColAction: "Action",
    invQSevHigh: "Élevé",
    invQSevMedium: "Moyen",
    invQStatusBlocked: "Bloqué",
    invQStatusPending: "Révision en attente",
    invQBtnResolve: "Résoudre",
    invQBtnReview: "Réviser",
    invQEmpty: "Aucun article en quarantaine trouvé.",

    // Quantities & Errors tab
    invTabQuantities: "Quantités & Erreurs",
    invIngestionNotice: "23 SKUs de votre dernier flux catalogue ont été mis en quarantaine. Les articles invalides N'APPARAÎTRONT PAS dans l'essayage virtuel avant résolution.",
    invIngestionNoticeBold: "Avis d'Ingestion :",
    invQtySuccessRate: "Taux de Succès d'Ingestion",
    invQtyQuarantinedSkus: "SKUs en Quarantaine",
    invQtyRetryQueue: "Actif",
    invQtyRetryQueueSub: "(Relance toutes les 30 min)",
    invQtyTableTitle: "Articles en Quarantaine",
    invQtyRetryAll: "Relancer l'Ingestion sur les 23 Articles",
    invQtyColIngested: "SKU Ingéré",
    invQtyColTitle: "Titre du Produit",
    invQtyColErrCategory: "Catégorie d'Erreur",
    invQtyColErrSummary: "Résumé Technique de l'Erreur",
    invQtyColDetected: "Horodatage de Détection",
    invQtyColResolution: "Action de Résolution",
    invQtyErrMissingSizing: "Taille Manquante",
    invQtyErrBadTexture: "Mauvaise Texture 3D",
    invQtyErrInvalidPrice: "Prix Invalide",
    invQtyBtnFixSizing: "Corriger la Taille",
    invQtyBtnReuploadTexture: "Ré-uploader la Texture",
    invQtyBtnEditPrice: "Modifier la Devise du Prix",

    // Screen 6: In-Store & Kiosks
    instoreNavSub: "Boutiques Physiques & Réservations",
    instoreTabStores: "Boutiques & Kiosques",
    instoreTabFitting: "Réservations Cabine",
    instorePageTitle: "Boutiques Physiques & Kiosques Intelligents",
    instorePageSubtitle: "Gérez les magasins physiques équipés de terminaux d'essayage interactifs Fitvisor (PDF Page 10).",
    instoreRegisterBtn: "+ Enregistrer une Boutique",
    instoreKpiStores: "Boutiques Partenaires Intégrées",
    instoreKpiTerminals: "Kiosques Actifs en Boutique",
    instoreKpiScans: "Total des Scans en Boutique ce Mois",
    instoreColLocation: "Boutique & Ville",
    instoreColAddress: "Adresse",
    instoreColKiosks: "Terminaux Kiosque Actifs",
    instoreColFeed: "Flux Stock Local",
    instoreColHardware: "État du Matériel",
    instoreColAction: "Action Terminal",
    instoreConnected: "Connecté",
    instoreOnline: "En Ligne",
    instoreFirmwareUpdate: "Mise à Jour Firmware",
    instoreManageBtn: "Gérer les Kiosques",
    instoreTerminals: "Bornes",
    instoreTerminalsSingle: "Borne",
    instoreRegModalTitle: "Enregistrer une Nouvelle Boutique",
    instoreRegModalSubtitle: "Ajoutez une nouvelle boutique physique au réseau de kiosques Fitvisor.",
    instoreRegStoreName: "Nom de la Boutique",
    instoreRegStoreNamePlaceholder: "ex. Zalando Hub Berlin",
    instoreRegCity: "Ville",
    instoreRegCityPlaceholder: "ex. Berlin",
    instoreRegAddress: "Adresse",
    instoreRegAddressPlaceholder: "ex. 12 Friedrichstraße, 10117 Berlin",
    instoreRegTerminalCount: "Nombre de Terminaux Kiosque",
    instoreRegTerminalCountPlaceholder: "ex. 3",
    instoreRegCancelBtn: "Annuler",
    instoreRegSaveBtn: "Enregistrer la Boutique",
    instoreRegSavingBtn: "Enregistrement…",
    instoreRegSavedBtn: "Enregistré !",
    instoreRegSuccessMsg: "Boutique enregistrée avec succès.",
    instoreRegErrName: "Le nom de la boutique est requis.",
    instoreRegErrCity: "La ville est requise.",
    instoreRegErrAddress: "L'adresse est requise.",
    instoreRegErrTerminals: "Entrez un nombre valide de terminaux (1 ou plus).",
    instoreFittingTitle: "Réservations de Cabines d'Essayage",
    instoreFittingSubtitle: "Consultez et gérez les réservations de cabines clients dans votre réseau de boutiques.",
    instoreFittingEmpty: "Aucune réservation de cabine trouvée.",

    // Fitting Reservations data
    instoreFitColHoldId: "ID Réservation",
    instoreFitColCustomer: "Pseudonyme Client",
    instoreFitColGarment: "Vêtements & Tailles Réservés",
    instoreFitColBoutique: "Boutique Cible",
    instoreFitColTime: "Heure de Réservation",
    instoreFitColStatus: "Statut de la Réservation",
    instoreFitColAction: "Action Boutique",
    instoreFitStatusHold: "Réservé en Cabine",
    instoreFitStatusPreparing: "Préparation par le Personnel",
    instoreFitStatusConfirmed: "Confirmé",
    instoreFitBtnPickedUp: "Marquer comme Récupéré",
    instoreFitBtnAssign: "Attribuer à la Cabine",
    instoreFitBtnManage: "Gérer la Réservation",
    instoreFitFilterLocation: "Filtrer par Boutique",
    instoreFitAllStores: "Toutes les Boutiques",
    instoreFitFilterStatus: "Filtrer par Statut",
    instoreFitPendingHold: "En Attente",
    instoreFitPreparedRoom: "Préparé en Cabine",
    instoreFitCompleted: "Terminé",
    instoreFitPendingCount: "8 En attente",

    // Screen 7: Campaigns & Ads
    campNavSub: "Publicités Look Sponsorisé",
    campTabOverview: "Vue d'ensemble",
    campTabCreate: "Créer une Campagne",
    campPageTitle: "Collections Capsule Sponsorisées & Publicités Natives",
    campPageSubtitle: "Gérez les placements de marque contextuels dans les recommandations de tenues de l'application (PDF Page 10).",
    campLaunchBtn: "+ Lancer une Campagne",
    campKpiActive: "Campagnes Actives",
    campKpiSpend: "Total des Dépenses Pub",
    campKpiCtr: "Taux de Clics Look Sponsorisé",
    campKpiBenchmark: "Référence : 2,1%",
    campColName: "Nom de la Campagne & Créatif",
    campColPlacement: "Placement Ciblé",
    campColBudget: "Budget & Cadence",
    campColDates: "Dates",
    campColImpressions: "Impressions & Essayages",
    campColStatus: "Statut",
    campColActions: "Actions",
    campStatusLive: "En Direct",
    campStatusPending: "En Attente d'Approbation",
    campStatusDraft: "Brouillon",
    campBtnPause: "Mettre en Pause",
    campBtnEdit: "Modifier",
    campBtnEditSettings: "Modifier les Paramètres",
    campViews: "vues",
    campTryOns: "essayages",
    campSpent: "dépensé",
    campAwaitingData: "— (en attente de données)",
    campModalTitle: "Créer une Campagne Publicitaire Sponsorisée",
    campModalSubtitle: "Lancez une campagne ciblée pour présenter votre collection sur les points de contact in-app de Fitvisor.",
    campModalSec1: "1. Détails de la Campagne",
    campModalNameLabel: "Nom de la Campagne",
    campModalNamePlaceholder: "Capsule Fêtes Hiver",
    campModalDatesLabel: "Dates Cibles",
    campModalStartDate: "Date de Début",
    campModalEndDate: "Date de Fin",
    campModalSec2: "2. Sélection du Placement",
    campModalSec2Sub: "Choisissez où votre campagne apparaîtra dans l'application Fitvisor.",
    campPlacementHome: "Rack Vedette Écran d'Accueil",
    campPlacementHomeDesc: "Bannière haute visibilité",
    campPlacementPostTryon: "Paires de Tenues Post-Essayage",
    campPlacementPostTryonDesc: "Suggestions contextuelles",
    campPlacementAI: "Recommandations Chatbot Styliste IA",
    campPlacementAIDesc: "\"Ce blazer te va bien…\"",
    campModalSec3: "3. Sélection des Produits",
    campModalSec3Sub: "Sélectionnez les SKUs à mettre en avant dans cette campagne.",
    campModalSec4: "4. Budget & Enchères",
    campModalSec4Sub: "Définissez votre budget de campagne et la limite de dépenses quotidiennes.",
    campBudgetLabel: "Budget Total de la Campagne",
    campBudgetPlaceholder: "€5 000",
    campDailyCapLabel: "Plafond Quotidien",
    campDailyCapPlaceholder: "€250 / jour",
    campSaveDraft: "Enregistrer comme Brouillon",
    campSubmit: "Soumettre la Campagne pour Révision",
    campSubmitting: "Soumission en cours…",
    campSubmitted: "Soumis !",
    campSubmitSuccess: "Campagne soumise pour révision avec succès.",
    campErrName: "Le nom de la campagne est requis.",
    campErrStartDate: "La date de début est requise.",
    campErrEndDate: "La date de fin est requise.",
    campErrPlacement: "Veuillez sélectionner un placement.",
    campErrBudget: "Entrez un montant de budget valide.",

    // Screen 8: Sales & Earnings
    salesNavSub: "Attribution, Factures, Rapport Fit",
    salesTabAttribution: "Attribution des Ventes",
    salesTabInvoices: "Factures & Frais",
    salesTabFitInsights: "Insights Fitting",
    salesPageTitle: "Ventes E-Commerce Attribuées",
    salesPageSubtitle: "Suivez les achats générés via les redirections d'essayage virtuel Fitvisor vers votre site.",
    salesExportBtn: "Exporter Commandes CSV",
    salesKpi1Label: "Essayages Virtuels",
    salesKpi1Sub: "sessions",
    salesKpi2Label: "Cliqué 'Acheter sur le Site Marque'",
    salesKpi2Sub: "redirections (24,8% CTR)",
    salesKpi3Label: "Achats Complétés",
    salesKpi3Sub: "commandes (23,0% conversion)",
    salesKpi4Label: "GMV Brut Attribué",
    salesOrdersTitle: "Commandes Attribuées",
    salesColOrderId: "ID Commande",
    salesColTimestamp: "Horodatage",
    salesColSku: "SKU Référent Essayé",
    salesColItems: "Articles Achetés",
    salesColTotal: "Total Commande (EUR)",
    salesColChannel: "Canal d'Attribution",
    salesColCustomer: "Statut Client",
    salesNewCustomer: "Nouveau Client",
    salesReturning: "Client Régulier",
    salesChannelApp: "Lien Profond App Mobile",
    salesChannelWeb: "Extension Web",
    salesChannelKiosk: "QR Kiosque en Boutique",
    salesInvoicesTitle: "Factures & Frais Plateforme",
    salesInvoicesSubtitle: "Factures de commission mensuelles et relevés de frais plateforme.",
    salesInvoicesEmpty: "Aucune facture trouvée.",
    salesColInvoiceId: "ID Facture",
    salesColPeriod: "Période de Facturation",
    salesColGmv: "GMV Attribué",
    salesColCommission: "Commission (8,5%)",
    salesColStatus: "Statut",
    salesColDownload: "Téléchargement",
    salesInvoicePaid: "Payé",
    salesInvoicePending: "En Attente",
    salesDownloadBtn: "Télécharger PDF",
    salesFitTitle: "Insights Fitting & Analytiques de Conversion",
    salesFitSubtitle: "Comprenez comment la précision du fitting améliore la conversion et réduit les retours.",
    salesFitEmpty: "Les données Fit Insights sont en cours de traitement. Revenez prochainement.",

    // Invoices & Fees — full rebuilt page (FR)
    invKpi1Label: "GMV Total Attribué en Octobre",
    invKpi2Label: "Commission Fitvisor (8,5%)",
    invKpi3Label: "Déductions Retours Réconciliées",
    invKpi3Sub: "Remboursements déduits de la commission",
    invKpi4Label: "Frais Net à Payer pour Octobre",
    invKpi4Sub: "Échéance 15 Nov",
    invStmtTitle: "Relevé de Factures Mensuel",
    invStmtSubtitle: "Suivez les ventes attribuées, commissions, déductions retours et relevés de paiement mensuels.",
    invColBillingCycle: "Cycle de Facturation",
    invColOrders: "Total Commandes Attribuées",
    invColGrossSales: "GMV Ventes Brutes",
    invColCommission: "Commission Contractuelle %",
    invColReturns: "Retours Réconciliés",
    invColNetFee: "Frais Net de Commission",
    invColStatus: "Statut",
    invColInvoiceDl: "Téléchargement Facture",
    invStatusAccrual: "Accumulation en Cours",
    invStatusSettled: "Réglé & Payé",
    invCurrentBadge: "En Cours",
    invBtnViewStatement: "Voir le Relevé",
    invBtnDownloadPdf: "Télécharger PDF",
    invViewerTitle: "Relevé de Facture",
    invViewerClose: "Fermer",
    invViewerLoading: "Chargement du document…",
    invViewerError: "Impossible de charger le document. Veuillez réessayer.",
    invViewerZoomIn: "Zoom avant",
    invViewerZoomOut: "Zoom arrière",
    invOrders: "commandes",

    // Fit Insights — full rebuilt page (FR)
    fitPageTitle: "Analyse Morphologique & Retours Fitting",
    fitPageSubtitle: "Retours actionables sur les tailles collectés depuis les scans corporels et avis post-achat.",
    fitBannerText: "Taux de retour e-commerce réduit de 68% à 11,2% pour les clients utilisant l'essayage virtuel 3D Fitvisor.",
    fitSizingTitle: "Analyse des Sentiments de Taille par Catégorie de Vêtement",
    fitLegendTrue: "Taille Correcte (82%)",
    fitLegendTight: "Trop Serré (11%)",
    fitLoose: "Trop Large (7%)",
    fitAlertsTitle: "Alertes Spécifiques de Fitting",
    fitAlertBlazerId: "SKU-ZAL-091 (Blazer)",
    fitAlertBlazerText: "18% des acheteurs avec largeur d'épaules >42cm ont signalé des emmanchures serrées.",
    fitAlertBlazerRec: "Recommandation : Conseiller une taille supérieure pour les morphologies athlétiques.",
    fitAlertJeansId: "SKU-ZAL-044 (Jeans)",
    fitAlertJeansText: "94% ont signalé un rapport taille-hanches parfait.",
    fitExportBtn: "Exporter le Rapport Complet de Tailles Morphologiques (PDF/Excel)",
    fitExportPdf: "Exporter PDF",
    fitExportExcel: "Exporter Excel",
    fitExporting: "Exportation…",
    fitExportDone: "Exporté !",
    fitExportError: "Échec de l'exportation. Veuillez réessayer.",
    fitGarmentBlazers: "Blazers",
    fitGarmentJeans: "Jeans",
    fitGarmentDresses: "Robes",

    // Developer & Settings (FR)
    devSettingsNavSub: "Clés API, Webhooks, Profil",
    devTabApiKeys: "Clés API & Webhooks",
    devTabBrandProfile: "Profil Marque & Équipe",
    devPageTitle: "Identifiants Développeur & Webhooks",
    devPageSubtitle: "Gérez les clés client OAuth 2.0, configurez les webhooks de stock et testez les endpoints.",
    devSec1Title: "Clés API REST & GraphQL",
    devClientIdLabel: "Identifiant Client",
    devSecretKeyLabel: "Clé Secrète",
    devCopyBtn: "Copier",
    devCopied: "Copié !",
    devRegenerateBtn: "Régénérer la Clé",
    devRegenerating: "Régénération…",
    devRateLimitNote: "Limite API : 10 000 requêtes / minute (Utilisation actuelle : 14%)",
    devSec2Title: "Configuration des Webhooks",
    devWebhookUrlLabel: "URL de Livraison Webhook",
    devWebhookUrlPlaceholder: "https://api.votremarque.com/fitvisor/webhooks/v1",
    devWebhookSecretLabel: "Clé Secrète de Signature Webhook",
    devSubscribedEvents: "Événements Abonnés",
    devEventStock: "stock.depleted",
    devEventStockDesc: "Déclenche une alerte rupture de stock en temps réel",
    devEventPrice: "product.price_updated",
    devEventPriceDesc: "Reflète immédiatement les remises",
    devEventTryon: "tryon.converted",
    devEventTryonDesc: "Signal d'achat attribué",
    devSendPingBtn: "Envoyer un Test Ping Webhook",
    devSendingPing: "Envoi…",
    devPingSent: "Ping envoyé !",
    devPingError: "Échec du ping. Vérifiez votre URL.",
    devSaveWebhookBtn: "Enregistrer les Paramètres Webhook",
    devSavingWebhook: "Enregistrement…",
    devWebhookSaved: "Paramètres sauvegardés !",
    devWebhookErrUrl: "Veuillez saisir une URL de webhook valide.",

    // Brand Profile & Team (FR)
    bpPageTitle: "Profil Marque & Accès Équipe",
    bpPageSubtitle: "Gérez les informations de votre marque et les membres de l'équipe avec les niveaux d'accès appropriés.",
    bpSec1Title: "Profil de la Marque",
    bpLogoLabel: "Logo de la Marque",
    bpLogoHint: "Téléchargez votre logo de marque (PNG, JPG).",
    bpLogoRec: "Taille recommandée : 400 × 400px",
    bpLogoMax: "Taille max : 2 Mo",
    bpChangeLogoBtn: "Changer le Logo",
    bpBrandNameLabel: "Nom Public de la Marque",
    bpStorefrontLabel: "URL de la Boutique",
    bpStorefrontPlaceholder: "https://votremarque.com",
    bpSupportLabel: "Contact Support",
    bpSupportPlaceholder: "support@votremarque.com",
    bpSaveProfileBtn: "Enregistrer le Profil",
    bpSavingProfile: "Enregistrement…",
    bpProfileSaved: "Profil enregistré !",
    bpErrBrandName: "Le nom public de la marque est requis.",
    bpSec2Title: "Utilisateurs Équipe Marchande Autorisés",
    bpInviteBtn: "+ Inviter un Membre",
    bpColName: "Nom & E-mail",
    bpColRole: "Rôle",
    bpColAccess: "Niveau d'Accès",
    bpColStatus: "Statut",
    bpStatusActive: "Actif",
    bpStatusInactive: "Inactif",
    bpRoleAdmin: "Administrateur Marque",
    bpRoleMerchandiser: "Merchandiseur Catalogue",
    bpRoleDeveloper: "Développeur / Technique",
    bpAccessFull: "Accès Portail Complet",
    bpAccessCatalog: "Produits & 3D Uniquement",
    bpAccessApi: "API & Webhooks Uniquement",
    bpInviteModalTitle: "Inviter un Membre de l'Équipe",
    bpInviteNameLabel: "Nom Complet",
    bpInviteEmailLabel: "E-mail Professionnel",
    bpInviteRoleLabel: "Rôle",
    bpInviteSendBtn: "Envoyer l'Invitation",
    bpInviteSending: "Envoi…",
    bpInviteSent: "Invitation envoyée !",
    bpInviteErrName: "Le nom est requis.",
    bpInviteErrEmail: "Un e-mail valide est requis.",
    bpInviteErrRole: "Veuillez sélectionner un rôle.",
    bpInviteCancel: "Annuler",
    bpMenuEdit: "Modifier",
    bpMenuDeactivate: "Désactiver",
    bpDeactivateTitle: "Désactiver le membre ?",
    bpDeactivateMsg: "Cela révoquera l'accès au portail pour {name}. Vous pouvez le réactiver à tout moment.",
    bpDeactivateBtn: "Désactiver",
    bpDeactivating: "Désactivation…",
    bpEditModalTitle: "Modifier le Membre",
    bpLogoUploading: "Téléversement…",
    bpLogoErrType: "Type de fichier invalide. Utilisez PNG, JPG ou WebP.",
    bpLogoErrSize: "Le fichier dépasse la limite de 2 Mo.",
  },
};
