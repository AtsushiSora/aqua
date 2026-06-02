const STORAGE_KEY = "aquanote-state-v3";
const LEGACY_STORAGE_KEY = "aquanote-state-v2";
const VIDEO_UPLOAD_LIMIT_BYTES = 4 * 1024 * 1024;
const EXPORT_VERSION = 1;
const MEDIA_BUCKET = "aquanote-media";
const MEDIA_SIGNED_URL_EXPIRES_SECONDS = 60 * 60;
const AI_ANALYSIS_ENDPOINT = "/api/ai-analysis";

const viewLinks = document.querySelectorAll("[data-view-link]");
const directViewButtons = document.querySelectorAll("[data-view-target]");
const views = document.querySelectorAll(".view");
const modal = document.querySelector("#post-modal");
const timeline = document.querySelector("#timeline");
const postGrid = document.querySelector("#post-grid");
const tankList = document.querySelector("#tank-list");
const tankPostList = document.querySelector("#tank-post-list");
const tankAlbumGrid = document.querySelector("#tank-album-grid");
const albumMonthFilter = document.querySelector("#album-month-filter");
const albumSortSelect = document.querySelector("#album-sort-select");
const albumCountLabel = document.querySelector("#album-count-label");
const logForm = document.querySelector("#log-form");
const tankForm = document.querySelector("#tank-form");
const tankEditForm = document.querySelector("#tank-edit-form");
const tankIdentifyPhotoInput = document.querySelector("#tank-identify-photo-input");
const tankIdentifyPreview = document.querySelector("#tank-identify-preview");
const tankIdentifyStatus = document.querySelector("#tank-identify-status");
const postForm = document.querySelector("#post-form");
const postTankSelect = document.querySelector("#post-tank-select");
const postTankFilter = document.querySelector("#post-tank-filter");
const communityTagSearch = document.querySelector("#community-tag-search");
const communitySortSelect = document.querySelector("#community-sort-select");
const communityRankingList = document.querySelector("#community-ranking-list");
const postImageInput = document.querySelector("#post-image-input");
const postImagePreview = document.querySelector("#post-image-preview");
const postModalTitle = document.querySelector("#post-modal-title");
const postSubmitButton = document.querySelector("#post-submit-button");
const replacePostImageInput = document.querySelector("#replace-post-image-input");
const mediaDetailModal = document.querySelector("#media-detail-modal");
const mediaDetailBody = document.querySelector("#media-detail-body");
const aiForm = document.querySelector("#ai-form");
const aiApiCheckButton = document.querySelector("#ai-api-check-button");
const aiApiStatusGrid = document.querySelector("#ai-api-status-grid");
const aiEvaluationLog = document.querySelector("#ai-evaluation-log");
const aiEvaluationSourceFilter = document.querySelector("#ai-evaluation-source-filter");
const aiEvaluationStatusFilter = document.querySelector("#ai-evaluation-status-filter");
const aiEvaluationReviewFilter = document.querySelector("#ai-evaluation-review-filter");
const aiEvaluationFromFilter = document.querySelector("#ai-evaluation-from-filter");
const aiEvaluationToFilter = document.querySelector("#ai-evaluation-to-filter");
const aiPromptImprovementNote = document.querySelector("#ai-prompt-improvement-note");
const aiPromptNoteSaveButton = document.querySelector("#ai-prompt-note-save-button");
const aiPromptNoteHistory = document.querySelector("#ai-prompt-note-history");
const aiEvaluationSummary = document.querySelector("#ai-evaluation-summary");
const aiPromptDraft = document.querySelector("#ai-prompt-draft");
const aiImageValidationSummary = document.querySelector("#ai-image-validation-summary");
const aiReviewExportCsvButton = document.querySelector("#ai-review-export-csv-button");
const aiReviewExportJsonButton = document.querySelector("#ai-review-export-json-button");
const logDateInput = document.querySelector("#log-date");
const heroPhoto = document.querySelector("#hero-photo");
const heroPhotoButton = document.querySelector("#hero-photo-button");
const heroPhotoInput = document.querySelector("#hero-photo-input");
const heroMedia = document.querySelector(".hero-media");
const heroPhotoStatus = document.querySelector("#hero-photo-status");
const heroTankName = document.querySelector("#hero-tank-name");
const heroPhotoNote = document.querySelector("#hero-photo-note");
const notificationButton = document.querySelector("#notification-button");
const installAppButton = document.querySelector("#install-app-button");
const enableNotificationsButton = document.querySelector("#enable-notifications-button");
const reminderList = document.querySelector("#reminder-list");
const sidebarNextTime = document.querySelector("#sidebar-next-time");
const sidebarNextTask = document.querySelector("#sidebar-next-task");
const globalSearchInput = document.querySelector("#global-search");
const searchResults = document.querySelector("#search-results");
const sidebarAccountName = document.querySelector("#sidebar-account-name");
const sidebarAccountHandle = document.querySelector("#sidebar-account-handle");
const sidebarAccountPlan = document.querySelector("#sidebar-account-plan");
const syncStatusButton = document.querySelector("#sync-status-button");
const syncStatusDot = document.querySelector("#sync-status-dot");
const syncStatusLabel = document.querySelector("#sync-status-label");
const accountForm = document.querySelector("#account-form");
const mockSyncButton = document.querySelector("#mock-sync-button");
const accountSyncChip = document.querySelector("#account-sync-chip");
const syncSummary = document.querySelector("#sync-summary");
const exportDataButton = document.querySelector("#export-data-button");
const importDataButton = document.querySelector("#import-data-button");
const importDataInput = document.querySelector("#import-data-input");
const authForm = document.querySelector("#auth-form");
const authStatusChip = document.querySelector("#auth-status-chip");
const authEmailInput = document.querySelector("#auth-email-input");
const authPasswordInput = document.querySelector("#auth-password-input");
const authSignOutButton = document.querySelector("#auth-sign-out-button");
const authNote = document.querySelector("#auth-note");
const notificationPreferenceSummary = document.querySelector("#notification-preference-summary");
const notificationDeliveryFilter = document.querySelector("#notification-delivery-filter");
const notificationDeliveryRefreshButton = document.querySelector("#notification-delivery-refresh-button");
const notificationDeliveryLog = document.querySelector("#notification-delivery-log");
const notificationVerificationList = document.querySelector("#notification-verification-list");
const notificationProductionCheckForm = document.querySelector("#notification-production-check-form");
const notificationProductionSummary = document.querySelector("#notification-production-summary");
const notificationApplyDeliveryResultButton = document.querySelector("#notification-apply-delivery-result-button");
const pwaTestForm = document.querySelector("#pwa-test-form");
const pwaTestReview = document.querySelector("#pwa-test-review");
const pwaTestLog = document.querySelector("#pwa-test-log");
const pwaTestExportButton = document.querySelector("#pwa-test-export-button");
const pwaTestScopeInput = document.querySelector("#pwa-test-scope-input");
const pwaTestScopeHint = document.querySelector("#pwa-test-scope-hint");
const pwaTestNoteInput = document.querySelector("#pwa-test-note-input");
const pwaTestNoteTemplateButton = document.querySelector("#pwa-test-note-template-button");
const pwaReleaseDecisionForm = document.querySelector("#pwa-release-decision-form");
const pwaReleaseDecisionChip = document.querySelector("#pwa-release-decision-chip");
const pwaReleaseDecisionSummary = document.querySelector("#pwa-release-decision-summary");
const monitorReadinessChip = document.querySelector("#monitor-readiness-chip");
const monitorReadinessNext = document.querySelector("#monitor-readiness-next");
const monitorReadinessSummary = document.querySelector("#monitor-readiness-summary");
const monitorGuideCopyButton = document.querySelector("#monitor-guide-copy-button");
const monitorGuideCopyPreview = document.querySelector("#monitor-guide-copy-preview");
const monitorFeedbackForm = document.querySelector("#monitor-feedback-form");
const monitorFeedbackSummary = document.querySelector("#monitor-feedback-summary");
const monitorFeedbackNext = document.querySelector("#monitor-feedback-next");
const monitorFeedbackList = document.querySelector("#monitor-feedback-list");
const monitorFeedbackExportCsvButton = document.querySelector("#monitor-feedback-export-csv-button");
const monitorFeedbackExportButton = document.querySelector("#monitor-feedback-export-button");
const monitorFeedbackStatusFilter = document.querySelector("#monitor-feedback-status-filter");
const monitorFeedbackKindFilter = document.querySelector("#monitor-feedback-kind-filter");
const monitorFeedbackPriorityFilter = document.querySelector("#monitor-feedback-priority-filter");
const monitorFeedbackFilterReset = document.querySelector("#monitor-feedback-filter-reset");
const productionSetupNextAction = document.querySelector("#production-setup-next-action");
const productionSetupSummary = document.querySelector("#production-setup-summary");
const productionSetupExportButton = document.querySelector("#production-setup-export-button");
const productionSupabaseCheckForm = document.querySelector("#production-supabase-check-form");
const productionStorageCheckForm = document.querySelector("#production-storage-check-form");
const productionAiCheckForm = document.querySelector("#production-ai-check-form");
const productionNotificationCheckForm = document.querySelector("#production-notification-check-form");
const accountUiModeInput = document.querySelector("#account-ui-mode-input");
const homeUiModeInput = document.querySelector("#home-ui-mode-input");
const homeUiModeCycleButton = document.querySelector("#home-ui-mode-cycle-button");
const accountBackgroundImageInput = document.querySelector("#account-background-image-input");
const accountButtonImageInput = document.querySelector("#account-button-image-input");
const accountBackgroundImageButton = document.querySelector("#account-background-image-button");
const accountButtonImageButton = document.querySelector("#account-button-image-button");
const accountBackgroundImageClearButton = document.querySelector("#account-background-image-clear-button");
const accountButtonImageClearButton = document.querySelector("#account-button-image-clear-button");
const accountBackgroundPreview = document.querySelector("#account-background-preview");
const accountButtonPreview = document.querySelector("#account-button-preview");
const accountBackgroundStatus = document.querySelector("#account-background-status");
const accountButtonStatus = document.querySelector("#account-button-status");
const dashboardTitle = document.querySelector("#dashboard-title");
const homeUiModeNote = document.querySelector("#home-ui-mode-note");
const heroTitle = document.querySelector(".hero-copy h2");
const heroLead = document.querySelector(".hero-copy h2 + p");
const quickDockButtons = document.querySelectorAll(".quick-dock button");
const pushConfig = window.AQUANOTE_PUSH_CONFIG || {};
const UI_MODES = ["standard", "simple", "adult", "live"];
const MONITOR_FEEDBACK_KINDS = ["impression", "bug", "ui", "request"];
const MONITOR_FEEDBACK_PRIORITIES = ["watch", "high", "low"];
const MONITOR_FEEDBACK_STATUSES = ["open", "doing", "done"];
const PWA_REQUIRED_SCOPES = ["login", "install", "notification", "offline", "ui_modes", "custom_images"];
const PWA_SCOPE_QA_HINTS = {
  login: ["ログイン状態", "プロフィール同期", "再読み込み後の維持"],
  install: ["ホーム画面追加", "アイコン起動", "スタンドアロン表示"],
  notification: ["通知許可", "Push購読", "dry-run解除後の受信"],
  offline: ["機内モード再読み込み", "オフラインページ", "復帰後の再表示"],
  ui_modes: ["ベーシック", "かんたん", "管理重視", "投稿重視", "横スクロールなし", "動きを減らす設定"],
  custom_images: ["背景画像", "ボタン背面", "文字の読みやすさ"],
};
const PWA_SCOPE_NOTE_TEMPLATES = {
  login: "ログイン状態: OK / プロフィール同期: OK / 再読み込み後の維持: OK",
  install: "ホーム画面追加: OK / アイコン起動: OK / スタンドアロン表示: OK",
  notification: "通知許可: OK / Push購読: OK / dry-run解除後の受信: 未確認",
  offline: "機内モード再読み込み: OK / オフラインページ: OK / 復帰後の再表示: OK",
  ui_modes: "ベーシック: OK / かんたん: OK / 管理重視: OK / 投稿重視: OK / 横スクロールなし: OK / 動きを減らす設定: OK",
  custom_images: "背景画像: OK / ボタン背面: OK / 文字の読みやすさ: OK",
};
const AI_REQUIRED_PHOTO_CONDITIONS = ["dark", "small_fish", "algae", "reflection"];
const AI_REQUIRED_SAMPLES_PER_CONDITION = 2;

const taskLabels = {
  feedMorning: "朝の餌やり",
  checkTemp: "水温チェック",
  checkAlgae: "ガラス面のコケ確認",
  filterCare: "フィルター管理",
};

const homeModeCopy = {
  standard: {
    title: "今日のアクアノート",
    note: "毎日の記録、写真、AI確認をバランスよく使う基本表示です。",
    heroTitle: "水槽管理を、きれいに続ける。",
    heroLead: "水温、pH、写真、気づいた変化をひとつにまとめて、毎日の管理を軽くします。",
    dock: [
      ["記録", "水温・pH"],
      ["投稿", "写真を共有"],
      ["AI", "状態チェック"],
      ["ガイド", "飼育のヒント"],
    ],
  },
  simple: {
    title: "今日やること",
    note: "小学生でも迷わないよう、言葉と操作を大きくした表示です。",
    heroTitle: "水槽のようすをかんたんチェック",
    heroLead: "写真をえらんで、温度や気づいたことを入れるだけ。次に見るところがすぐわかります。",
    dock: [
      ["きろく", "温度を書く"],
      ["しゃしん", "見せる"],
      ["AIチェック", "みてもらう"],
      ["ヒント", "こまった時"],
    ],
  },
  adult: {
    title: "水槽ダッシュボード",
    note: "落ち着いた密度で、管理と公開前確認を静かに進める表示です。",
    heroTitle: "日々の管理を静かに整える。",
    heroLead: "水質、写真、タスク、レビューを落ち着いた画面で確認し、公開前の判断までつなげます。",
    dock: [
      ["管理記録", "水温・pH"],
      ["写真投稿", "共有"],
      ["AI確認", "分析"],
      ["飼育ガイド", "参照"],
    ],
  },
  live: {
    title: "投稿フィード",
    note: "写真投稿と共有を前面に出し、水槽の変化を見せやすくする表示です。",
    heroTitle: "今日の水槽を、すぐ投稿。",
    heroLead: "トップ写真を大きく見せながら、投稿、共有、AI確認へすぐ進めます。",
    dock: [
      ["記録", "Log"],
      ["投稿", "Share"],
      ["AI確認", "Scan"],
      ["ガイド", "Tips"],
    ],
  },
};

const weekdayLabels = ["日", "月", "火", "水", "木", "金", "土"];

const defaultReminders = {
  feedMorning: {
    time: "08:00",
    enabled: true,
    schedule: "daily",
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    intervalDays: 1,
    startDate: getDateKey(new Date()),
    lastNotifiedOn: null,
  },
  checkTemp: {
    time: "18:00",
    enabled: true,
    schedule: "daily",
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    intervalDays: 1,
    startDate: getDateKey(new Date()),
    lastNotifiedOn: null,
  },
  checkAlgae: {
    time: "20:00",
    enabled: false,
    schedule: "weekly",
    weekdays: [0],
    intervalDays: 7,
    startDate: getDateKey(new Date()),
    lastNotifiedOn: null,
  },
  filterCare: {
    time: "19:30",
    enabled: true,
    schedule: "interval",
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    intervalDays: 30,
    startDate: getDateKey(new Date()),
    lastNotifiedOn: null,
  },
};

const defaultState = {
  activeTankId: "tank-main",
  heroPhotoDataUrl: null,
  account: {
    signedIn: false,
    name: "ゲストユーザー",
    handle: "guest",
    email: "",
    visibility: "public",
    plan: "free",
    uiMode: "standard",
    notificationChannel: "browser",
    browserNotifications: true,
    emailNotifications: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
    backgroundImageDataUrl: null,
    buttonImageDataUrl: null,
    syncStatus: "local",
    lastSyncedAt: null,
  },
  pwaTestResults: [],
  monitorFeedback: [],
  productionSetupCheck: {
    supabaseStatus: "unchecked",
    supabaseReviewer: "",
    supabaseNote: "",
    supabaseCheckedAt: null,
    storageStatus: "unchecked",
    storageReviewer: "",
    storageNote: "",
    storageCheckedAt: null,
    aiStatus: "unchecked",
    aiReviewer: "",
    aiNote: "",
    aiCheckedAt: null,
  },
  notificationProductionCheck: {
    envStatus: "unchecked",
    dryRunStatus: "unchecked",
    sendStatus: "unchecked",
    reviewer: "",
    note: "",
    checkedAt: null,
  },
  pwaReleaseDecision: {
    status: "draft",
    reviewStatus: "not_started",
    resultStatus: "unchecked",
    reviewer: "",
    productionUrl: "",
    note: "",
    decidedAt: null,
    reviewExportedAt: null,
  },
  tanks: [
    {
      id: "tank-main",
      name: "はじめての水槽",
      kind: "水草水槽",
      size: "サイズ未設定",
      volume: "容量未設定",
      animals: "",
      plants: "",
      residents: "",
      equipment: "",
      filter: {
        type: "",
        lastCleanedAt: "",
        intervalDays: 30,
        flowStatus: "unchecked",
        note: "",
      },
      tags: [],
      logs: [],
      latestAi: null,
      featuredPostId: null,
      albumOrder: [],
    },
  ],
  posts: [],
  tasks: {
    feedMorning: false,
    checkTemp: false,
    checkAlgae: false,
    filterCare: false,
  },
  taskDate: getDateKey(new Date()),
  reminders: cloneState(defaultReminders),
  aiEvaluationLog: [],
  aiPromptImprovementNote: "",
  aiPromptNotes: [],
};

const persistenceAdapter = {
  load: loadLocalState,
  save: saveLocalState,
};

let state = loadAppState();
let pendingPostImageDataUrl = null;
let pendingPostVideoDataUrl = null;
let pendingPostVideoThumbnailDataUrl = null;
let pendingPostVideoDuration = null;
let pendingPostMediaType = null;
let pendingTankIdentifyImageDataUrl = null;
let replacingPostId = null;
let editingPostId = null;
let activeAlbumMonth = "all";
let activeAlbumSort = "featured";
let highlightedSearchResult = null;
let supabaseClient = createSupabaseClient();
let authSession = null;
let cloudSyncInProgress = false;
let lastProfileSyncErrorMessage = "";
let notificationDeliveryHistory = [];
let activeNotificationDeliveryFilter = "all";
let activeNotificationDeliveryDetailId = null;
let deferredInstallPrompt = null;
let aiEvaluationSyncTimer = null;
let activeAiEvaluationSourceFilter = "all";
let activeAiEvaluationStatusFilter = "all";
let activeAiEvaluationReviewFilter = "all";
let activeAiEvaluationFromFilter = "";
let activeAiEvaluationToFilter = "";
let activeMonitorFeedbackStatusFilter = "all";
let activeMonitorFeedbackKindFilter = "all";
let activeMonitorFeedbackPriorityFilter = "all";
let aiApiStatus = {
  checkedAt: null,
  configured: null,
  model: "未確認",
  promptVersion: "未確認",
  gateway: "未確認",
  auth: "未確認",
  imageAnalysis: "未確認",
  lastSource: "ローカル分析",
};

function showView(id) {
  views.forEach((view) => {
    view.classList.toggle("is-visible", view.id === id);
  });

  viewLinks.forEach((link) => {
    const linkTarget = link.getAttribute("href").replace("#", "");
    link.classList.toggle("is-active", linkTarget === id);
  });

  if (window.location.hash !== `#${id}`) {
    history.replaceState(null, "", `#${id}`);
  }
}

viewLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showView(link.getAttribute("href").replace("#", ""));
  });
});

directViewButtons.forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.viewTarget));
});

globalSearchInput.addEventListener("input", renderSearchResults);
globalSearchInput.addEventListener("focus", renderSearchResults);
globalSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    clearSearchResults();
  }
});

searchResults.addEventListener("click", (event) => {
  const button = event.target.closest("[data-search-type]");
  if (!button) {
    return;
  }

  openSearchResult(button.dataset.searchType, button.dataset.searchId);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".search-box")) {
    clearSearchResults();
  }
});

window.addEventListener("hashchange", () => {
  const nextView = window.location.hash.replace("#", "");
  if (document.getElementById(nextView)) {
    showView(nextView);
  }
});

document.querySelectorAll("[data-open-post]").forEach((button) => {
  button.addEventListener("click", () => {
    openPostModal();
  });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closePostModal);
});

document.querySelectorAll("[data-task]").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    state.tasks[checkbox.dataset.task] = checkbox.checked;
    state.taskDate = getDateKey(new Date());
    saveState();
    renderTasks();
    renderReminders();
  });
});

notificationButton.addEventListener("click", () => {
  const nextReminder = getNextReminder();
  if (!nextReminder) {
    showToast("有効なリマインダーはありません");
    return;
  }

  if (state.account.notificationChannel === "none") {
    showToast("アカウント設定で通知がオフです");
    return;
  }

  if (state.account.notificationChannel === "email") {
    showToast(`メール通知予定: ${formatReminderDate(nextReminder.date)} ${nextReminder.label}`);
    return;
  }

  if (!canUseNotifications()) {
    showToast(`${formatReminderDate(nextReminder.date)} ${nextReminder.label}`);
    return;
  }

  requestNotificationPermission();
});

enableNotificationsButton.addEventListener("click", requestNotificationPermission);

installAppButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) {
    showToast("ブラウザの共有メニューからホーム画面に追加できます");
    return;
  }

  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installAppButton.hidden = true;
});

postTankFilter.addEventListener("change", renderPosts);
communityTagSearch.addEventListener("input", renderPosts);
communitySortSelect.addEventListener("change", renderPosts);
pwaTestScopeInput.addEventListener("change", renderPwaTestScopeHint);
pwaTestNoteTemplateButton.addEventListener("click", applyPwaTestNoteTemplate);

albumMonthFilter.addEventListener("change", () => {
  activeAlbumMonth = albumMonthFilter.value;
  renderTankAlbum();
});

albumSortSelect.addEventListener("change", () => {
  activeAlbumSort = albumSortSelect.value;
  renderTankAlbum();
});

document.querySelectorAll("[data-close-media-detail]").forEach((button) => {
  button.addEventListener("click", closeMediaDetailModal);
});

accountForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  state.account = {
    ...state.account,
    signedIn: true,
    name: document.querySelector("#account-name-input").value.trim() || defaultState.account.name,
    handle: normalizeHandle(document.querySelector("#account-handle-input").value),
    email: document.querySelector("#account-email-input").value.trim() || defaultState.account.email,
    visibility: document.querySelector("#account-visibility-input").value,
    plan: document.querySelector("#account-plan-input").value,
    uiMode: accountUiModeInput.value,
    notificationChannel: document.querySelector("#account-notification-channel-input").value,
    browserNotifications: document.querySelector("#account-browser-notifications-input").checked,
    emailNotifications: document.querySelector("#account-email-notifications-input").checked,
    quietHoursStart: document.querySelector("#account-quiet-start-input").value || defaultState.account.quietHoursStart,
    quietHoursEnd: document.querySelector("#account-quiet-end-input").value || defaultState.account.quietHoursEnd,
  };
  saveState();

  if (authSession?.user) {
    const cloudSynced = await syncCloudState();
    if (cloudSynced && state.account.notificationChannel === "push") {
      await syncPushSubscriptionToSupabase({ silent: true });
    }
    return;
  }

  renderAccount();
  showToast("プロフィールを保存しました");
});

accountUiModeInput.addEventListener("change", () => {
  updateUiMode(accountUiModeInput.value);
});

homeUiModeInput.addEventListener("change", () => {
  updateUiMode(homeUiModeInput.value);
});

homeUiModeCycleButton.addEventListener("click", () => {
  const currentIndex = UI_MODES.indexOf(getAllowedValue(state.account.uiMode, UI_MODES, "standard"));
  updateUiMode(UI_MODES[(currentIndex + 1) % UI_MODES.length]);
});

accountBackgroundImageButton.addEventListener("click", () => accountBackgroundImageInput.click());
accountButtonImageButton.addEventListener("click", () => accountButtonImageInput.click());

accountBackgroundImageInput.addEventListener("change", async () => {
  const file = accountBackgroundImageInput.files?.[0];
  if (!file) {
    return;
  }

  state.account.backgroundImageDataUrl = await resizeImageFile(file, 1800, 0.82);
  state.account.syncStatus = "local";
  saveState({ keepSyncStatus: true });
  renderAccount();
  showToast("背景画像を変更しました");
  accountBackgroundImageInput.value = "";
});

accountButtonImageInput.addEventListener("change", async () => {
  const file = accountButtonImageInput.files?.[0];
  if (!file) {
    return;
  }

  state.account.buttonImageDataUrl = await resizeImageFile(file, 900, 0.78);
  state.account.syncStatus = "local";
  saveState({ keepSyncStatus: true });
  renderAccount();
  showToast("ボタン背面画像を変更しました");
  accountButtonImageInput.value = "";
});

accountBackgroundImageClearButton.addEventListener("click", () => {
  state.account.backgroundImageDataUrl = null;
  state.account.syncStatus = "local";
  saveState({ keepSyncStatus: true });
  renderAccount();
  showToast("背景画像をリセットしました");
});

accountButtonImageClearButton.addEventListener("click", () => {
  state.account.buttonImageDataUrl = null;
  state.account.syncStatus = "local";
  saveState({ keepSyncStatus: true });
  renderAccount();
  showToast("ボタン背面画像をリセットしました");
});

mockSyncButton.addEventListener("click", async () => {
  if (authSession?.user) {
    await syncCloudState();
    return;
  }

  state.account.signedIn = true;
  state.account.syncStatus = "synced";
  state.account.lastSyncedAt = new Date().toISOString();
  saveState({ keepSyncStatus: true });
  renderAccount();
  showToast("同期状態を記録しました");
});

exportDataButton.addEventListener("click", exportAppData);
importDataButton.addEventListener("click", () => importDataInput.click());
importDataInput.addEventListener("change", importAppData);
pwaTestForm.addEventListener("submit", handlePwaTestSubmit);
pwaTestExportButton.addEventListener("click", exportPwaTestResults);
monitorFeedbackForm.addEventListener("submit", handleMonitorFeedbackSubmit);
monitorFeedbackExportCsvButton.addEventListener("click", exportMonitorFeedbackCsv);
monitorFeedbackExportButton.addEventListener("click", exportMonitorFeedback);
monitorGuideCopyButton.addEventListener("click", copyMonitorGuideText);
monitorFeedbackStatusFilter.addEventListener("change", () => {
  activeMonitorFeedbackStatusFilter = monitorFeedbackStatusFilter.value;
  renderMonitorFeedback();
});
monitorFeedbackKindFilter.addEventListener("change", () => {
  activeMonitorFeedbackKindFilter = monitorFeedbackKindFilter.value;
  renderMonitorFeedback();
});
monitorFeedbackPriorityFilter.addEventListener("change", () => {
  activeMonitorFeedbackPriorityFilter = monitorFeedbackPriorityFilter.value;
  renderMonitorFeedback();
});
monitorFeedbackFilterReset.addEventListener("click", () => {
  activeMonitorFeedbackStatusFilter = "all";
  activeMonitorFeedbackKindFilter = "all";
  activeMonitorFeedbackPriorityFilter = "all";
  renderMonitorFeedback();
});
productionSetupExportButton.addEventListener("click", exportProductionSetupStatus);
pwaReleaseDecisionForm.addEventListener("submit", handlePwaReleaseDecisionSubmit);
productionSupabaseCheckForm.addEventListener("submit", handleProductionSupabaseCheckSubmit);
productionStorageCheckForm.addEventListener("submit", handleProductionStorageCheckSubmit);
productionAiCheckForm.addEventListener("submit", handleProductionAiCheckSubmit);
productionNotificationCheckForm.addEventListener("submit", handleProductionNotificationCheckSubmit);
pwaTestLog.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-pwa-test-delete]");
  if (!button) {
    return;
  }

  const current = state.pwaTestResults.find((result) => result.id === button.dataset.pwaTestDelete);
  state.pwaTestResults = state.pwaTestResults.filter((result) => result.id !== button.dataset.pwaTestDelete);
  saveState();
  renderPwaTestResults();
  if (current?.cloudId && authSession?.user) {
    await deletePwaDeviceTestFromSupabase(current.cloudId, { silent: true });
  }
  showToast("PWA実機テスト結果を削除しました");
});

monitorFeedbackList.addEventListener("click", (event) => {
  const statusButton = event.target.closest("[data-monitor-feedback-status]");
  if (statusButton) {
    state.monitorFeedback = (state.monitorFeedback || []).map((entry) =>
      entry.id === statusButton.dataset.monitorFeedbackStatus
        ? normalizeMonitorFeedback({
            ...entry,
            status: statusButton.dataset.monitorFeedbackNextStatus,
            resolvedAt: statusButton.dataset.monitorFeedbackNextStatus === "done" ? new Date().toISOString() : null,
          })
        : entry,
    );
    saveState();
    renderMonitorFeedback();
    showToast("対応状況を更新しました");
    return;
  }

  const button = event.target.closest("[data-monitor-feedback-delete]");
  if (!button) {
    return;
  }

  state.monitorFeedback = (state.monitorFeedback || []).filter((entry) => entry.id !== button.dataset.monitorFeedbackDelete);
  saveState();
  renderMonitorFeedback();
  showToast("フィードバックを削除しました");
});

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const action = event.submitter?.value || "sign-in";
  await handleAuthSubmit(action);
});

authSignOutButton.addEventListener("click", signOutSupabase);
aiApiCheckButton.addEventListener("click", () => checkAiAnalysisApi());
aiEvaluationSourceFilter.addEventListener("change", () => {
  activeAiEvaluationSourceFilter = aiEvaluationSourceFilter.value;
  renderAiEvaluationLog();
});
aiEvaluationStatusFilter.addEventListener("change", () => {
  activeAiEvaluationStatusFilter = aiEvaluationStatusFilter.value;
  renderAiEvaluationLog();
});
aiEvaluationReviewFilter.addEventListener("change", () => {
  activeAiEvaluationReviewFilter = aiEvaluationReviewFilter.value;
  renderAiEvaluationLog();
});
aiEvaluationFromFilter.addEventListener("change", () => {
  activeAiEvaluationFromFilter = aiEvaluationFromFilter.value;
  renderAiEvaluationLog();
});
aiEvaluationToFilter.addEventListener("change", () => {
  activeAiEvaluationToFilter = aiEvaluationToFilter.value;
  renderAiEvaluationLog();
});
aiPromptImprovementNote.addEventListener("input", () => {
  state.aiPromptImprovementNote = aiPromptImprovementNote.value;
  saveState();
});
aiPromptNoteSaveButton.addEventListener("click", () => saveAiPromptNote());
aiImageValidationSummary.addEventListener("click", (event) => {
  const needsFixNoteButton = event.target.closest("[data-ai-needs-fix-note]");
  if (needsFixNoteButton) {
    applyAiNeedsFixEntryNote(needsFixNoteButton.dataset.aiNeedsFixNote);
    return;
  }

  const retestConditionNoteButton = event.target.closest("[data-ai-retest-condition-note]");
  if (retestConditionNoteButton) {
    applyAiRetestConditionNote(retestConditionNoteButton.dataset.aiRetestConditionNote);
    return;
  }

  const reviewButton = event.target.closest("[data-ai-quick-review]");
  if (reviewButton) {
    updateAiEvaluationReview(reviewButton.dataset.aiQuickReview, reviewButton.dataset.aiQuickReviewValue);
    return;
  }

  const conditionButton = event.target.closest("[data-ai-quick-condition]");
  if (conditionButton) {
    updateAiEvaluationReview(conditionButton.dataset.aiQuickCondition, null, conditionButton.dataset.aiQuickConditionValue);
    return;
  }

  const button = event.target.closest("[data-ai-weak-condition-note]");
  if (!button) {
    return;
  }

  applyAiWeakConditionNote(button.dataset.aiWeakConditionNote);
});
aiReviewExportCsvButton.addEventListener("click", () => exportAiReviewData("csv"));
aiReviewExportJsonButton.addEventListener("click", () => exportAiReviewData("json"));
aiEvaluationLog.addEventListener("input", (event) => {
  const field = event.target.closest("[data-ai-evaluation-note]");
  if (!field) {
    return;
  }

  const item = state.aiEvaluationLog.find((entry) => entry.id === field.dataset.aiEvaluationNote);
  if (!item) {
    return;
  }

  item.note = field.value;
  saveState();
  if (authSession?.user) {
    scheduleAiEvaluationSync();
  }
});
aiEvaluationLog.addEventListener("click", (event) => {
  const retestButton = event.target.closest("[data-ai-draft-retest]");
  if (!retestButton) {
    return;
  }

  updateAiPromptDraftRetest(retestButton.dataset.aiDraftRetest, retestButton.dataset.aiDraftRetestStatus);
});
aiEvaluationLog.addEventListener("change", (event) => {
  const reviewField = event.target.closest("[data-ai-evaluation-review]");
  const conditionField = event.target.closest("[data-ai-evaluation-condition]");
  const field = reviewField || conditionField;
  if (!field) {
    return;
  }

  const itemId = reviewField ? reviewField.dataset.aiEvaluationReview : conditionField.dataset.aiEvaluationCondition;
  const item = state.aiEvaluationLog.find((entry) => entry.id === itemId);
  if (!item) {
    return;
  }

  updateAiEvaluationReview(itemId, reviewField ? reviewField.value : null, conditionField ? conditionField.value : null);
});

notificationDeliveryRefreshButton.addEventListener("click", () => loadNotificationDeliveryHistory());
notificationDeliveryFilter.addEventListener("change", () => {
  activeNotificationDeliveryFilter = notificationDeliveryFilter.value;
  renderNotificationDeliveryLog();
});

notificationProductionCheckForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.notificationProductionCheck = normalizeNotificationProductionCheck({
    envStatus: document.querySelector("#notification-env-status-input").value,
    dryRunStatus: document.querySelector("#notification-dry-run-status-input").value,
    sendStatus: document.querySelector("#notification-send-status-input").value,
    reviewer: document.querySelector("#notification-check-reviewer-input").value,
    note: document.querySelector("#notification-check-note-input").value,
    checkedAt: new Date().toISOString(),
  });
  saveState();
  renderNotificationVerificationChecklist();
  renderProductionSetupSummary();
  showToast("通知本番チェックを保存しました");
});

notificationApplyDeliveryResultButton.addEventListener("click", () => {
  const deliveryState = getNotificationDeliveryVerificationState();
  state.notificationProductionCheck = normalizeNotificationProductionCheck({
    ...state.notificationProductionCheck,
    sendStatus: deliveryState.status,
    note: mergeNotificationProductionNote(state.notificationProductionCheck?.note, deliveryState.note),
    checkedAt: new Date().toISOString(),
  });
  saveState();
  renderNotificationVerificationChecklist();
  renderProductionSetupSummary();
  showToast("配信ログの結果を通知本番チェックに反映しました");
});

notificationDeliveryLog.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-retry-delivery]");
  if (button) {
    await retryNotificationDelivery(button.dataset.retryDelivery);
    return;
  }

  const detailButton = event.target.closest("[data-delivery-detail]");
  if (detailButton) {
    activeNotificationDeliveryDetailId =
      activeNotificationDeliveryDetailId === detailButton.dataset.deliveryDetail
        ? null
        : detailButton.dataset.deliveryDetail;
    renderNotificationDeliveryLog();
  }
});

postImageInput.addEventListener("change", async () => {
  const file = postImageInput.files[0];
  if (!file) {
    clearPendingPostMedia();
    return;
  }

  if (!isSupportedPostMedia(file)) {
    showToast("画像または動画ファイルを選んでください");
    postImageInput.value = "";
    clearPendingPostMedia();
    return;
  }

  if (file.type.startsWith("video/") && file.size > VIDEO_UPLOAD_LIMIT_BYTES) {
    showToast("動画は4MBまでにしてください");
    postImageInput.value = "";
    clearPendingPostMedia();
    return;
  }

  try {
    await setPendingPostMedia(file);
    renderPostImagePreview();
  } catch {
    showToast("投稿メディアを読み込めませんでした");
    postImageInput.value = "";
    clearPendingPostMedia();
  }
});

replacePostImageInput.addEventListener("change", async () => {
  const file = replacePostImageInput.files[0];
  const post = state.posts.find((item) => item.id === replacingPostId);

  if (!file || !post) {
    replacePostImageInput.value = "";
    replacingPostId = null;
    return;
  }

  if (!isSupportedPostMedia(file)) {
    showToast("画像または動画ファイルを選んでください");
    replacePostImageInput.value = "";
    replacingPostId = null;
    return;
  }

  if (file.type.startsWith("video/") && file.size > VIDEO_UPLOAD_LIMIT_BYTES) {
    showToast("動画は4MBまでにしてください");
    replacePostImageInput.value = "";
    replacingPostId = null;
    return;
  }

  try {
    const media = await preparePostMedia(file);
    applyPostMedia(post, media);
    addPostToTankAlbumOrder(post);
    saveState();
    renderApp();
    showToast("投稿メディアを差し替えました");
    if (authSession?.user) {
      await syncCloudState({ silent: true });
    }
  } catch {
    showToast("メディアを読み込めませんでした");
  } finally {
    replacePostImageInput.value = "";
    replacingPostId = null;
  }
});

heroPhotoButton.addEventListener("click", () => {
  heroPhotoInput.click();
});

heroPhotoInput.addEventListener("change", async () => {
  const file = heroPhotoInput.files[0];
  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    showToast("画像ファイルを選んでください");
    heroPhotoInput.value = "";
    return;
  }

  try {
    state.heroPhotoDataUrl = await resizeImageFile(file, 1400, 0.84);
    saveState();
    renderHeroPhoto();
    showToast("トップ写真を変更しました");
  } catch {
    showToast("写真を読み込めませんでした");
  } finally {
    heroPhotoInput.value = "";
  }
});

tankIdentifyPhotoInput.addEventListener("change", handleTankIdentifyPhotoChange);
document.querySelectorAll("[data-species-add]").forEach((button) => {
  button.addEventListener("click", () => {
    const list = document.getElementById(button.dataset.speciesAdd);
    const row = addSpeciesRow(list);
    row.querySelector("input")?.focus();
  });
});

tankForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#tank-name-input").value.trim();
  const kind = document.querySelector("#tank-kind-input").value;
  const size = document.querySelector("#tank-size-input").value.trim() || "サイズ未設定";
  const volume = document.querySelector("#tank-volume-input").value.trim() || "容量未設定";
  const residents = getSpeciesListValue("tank-species-list");
  const equipment = getSpeciesListValue("tank-equipment-list");
  const filter = getFilterFormValue("tank");
  const { animals, plants } = getTankResidentParts({ residents });
  const tank = {
    id: createId("tank"),
    name,
    kind,
    size,
    volume,
    animals,
    plants,
    residents,
    equipment,
    filter,
    tags: [kind],
    logs: [],
    latestAi: null,
    featuredPostId: null,
    albumOrder: [],
  };

  state.tanks.unshift(tank);
  state.activeTankId = tank.id;
  saveState();
  tankForm.reset();
  resetSpeciesList("tank-species-list");
  resetSpeciesList("tank-equipment-list");
  resetFilterForm("tank");
  resetTankIdentifyAssist();
  renderApp();
  showToast("水槽を追加しました");
});

tankEditForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const tank = getActiveTank();
  const tags = document
    .querySelector("#edit-tank-tags")
    .value.split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  tank.name = document.querySelector("#edit-tank-name").value.trim() || tank.name;
  tank.kind = document.querySelector("#edit-tank-kind").value;
  tank.size = document.querySelector("#edit-tank-size").value.trim() || "サイズ未設定";
  tank.volume = document.querySelector("#edit-tank-volume").value.trim() || "容量未設定";
  tank.residents = getSpeciesListValue("edit-tank-species-list");
  tank.equipment = getSpeciesListValue("edit-tank-equipment-list");
  tank.filter = getFilterFormValue("edit-tank");
  const residentParts = getTankResidentParts({ residents: tank.residents });
  tank.animals = residentParts.animals;
  tank.plants = residentParts.plants;
  tank.tags = tags.length ? tags : [tank.kind];

  saveState();
  renderApp();
  showToast("水槽プロフィールを更新しました");
});

document.querySelector("#delete-tank-button").addEventListener("click", () => {
  if (state.tanks.length <= 1) {
    showToast("最後の水槽は削除できません");
    return;
  }

  const tank = getActiveTank();
  if (!confirm(`${tank.name} を削除しますか？この水槽のログも削除されます。`)) {
    return;
  }

  state.tanks = state.tanks.filter((item) => item.id !== tank.id);
  state.activeTankId = state.tanks[0].id;
  state.posts.forEach((post) => {
    if (post.tankId === tank.id) {
      post.tankId = state.activeTankId;
    }
  });
  saveState();
  renderApp();
  showToast("水槽を削除しました");
});

logForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const tank = getActiveTank();
  const log = {
    id: createId("log"),
    type: document.querySelector("#log-type").value,
    temp: document.querySelector("#temp-input").value,
    ph: document.querySelector("#ph-input").value,
    note: document.querySelector("#log-note").value || "水槽の状態を記録しました。",
    createdAt: new Date(logDateInput.value || Date.now()).toISOString(),
  };

  tank.logs.unshift(log);
  tank.logs = tank.logs.slice(0, 30);
  applyFilterLogToTank(tank, log);
  saveState();
  renderApp();
  document.querySelector("#log-note").value = "";
  setDefaultLogDate();
  showToast(`${tank.name} の管理ログを保存しました`);

  if (authSession?.user) {
    await syncCloudState({ silent: true });
  }
});

document.querySelectorAll("[data-add-log]").forEach((button) => {
  button.addEventListener("click", () => {
    showView("tanks");
    document.querySelector("#log-note").focus();
  });
});

document.querySelector("[data-reset-logs]").addEventListener("click", () => {
  if (!confirm("水槽、ログ、投稿を初期状態に戻しますか？")) {
    return;
  }

  state = cloneState(defaultState);
  saveState();
  renderApp();
  showToast("初期状態に戻しました");
});

aiForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const tank = getActiveTank();
  const water = document.querySelector("#water-state").value;
  const fish = document.querySelector("#fish-state").value;
  const algae = document.querySelector("#algae-state").value;
  const days = Number(document.querySelector("#water-days").value);
  const fallbackResult = analyzeTank({ water, fish, algae, days });
  const result = await analyzeTankWithApi({ tank, water, fish, algae, days, fallbackResult });

  tank.latestAi = createAiResultState(result);
  saveState();
  renderAiResult(result);
  renderDashboard();

  if (authSession?.user) {
    await syncCloudState({ silent: true });
  }
});

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const existingPost = state.posts.find((item) => item.id === editingPostId);
  if (existingPost) {
    const previousTankId = existingPost.tankId;
    existingPost.tankId = postTankSelect.value || state.activeTankId;
    existingPost.title = document.querySelector("#post-title").value.trim() || "新しい投稿";
    existingPost.tag = document.querySelector("#post-tag").value.trim() || "水槽";
    existingPost.text = document.querySelector("#post-text").value.trim() || "水槽の様子を投稿しました。";
    if (pendingPostMediaType) {
      applyPostMedia(existingPost, {
        type: pendingPostMediaType,
        imageDataUrl: pendingPostImageDataUrl,
        videoDataUrl: pendingPostVideoDataUrl,
        videoThumbnailDataUrl: pendingPostVideoThumbnailDataUrl,
        videoDuration: pendingPostVideoDuration,
      });
      addPostToTankAlbumOrder(existingPost);
    }
    existingPost.updatedAt = new Date().toISOString();

    if (previousTankId !== existingPost.tankId) {
      const previousTank = state.tanks.find((tank) => tank.id === previousTankId);
      if (previousTank?.featuredPostId === existingPost.id) {
        previousTank.featuredPostId = null;
      }
      removePostFromTankAlbumOrder(previousTankId, existingPost.id);
      addPostToTankAlbumOrder(existingPost);
    }

    saveState();
    renderApp();
    closePostModal();
    showView("community");
    showToast("投稿を更新しました");
    if (authSession?.user) {
      await syncCloudState({ silent: true });
    }
    return;
  }

  const post = {
    id: createId("post"),
    tankId: postTankSelect.value || state.activeTankId,
    title: document.querySelector("#post-title").value.trim() || "新しい投稿",
    tag: document.querySelector("#post-tag").value.trim() || "水槽",
    text: document.querySelector("#post-text").value.trim() || "水槽の様子を投稿しました。",
    imageClass: "reef",
    imageDataUrl: pendingPostImageDataUrl,
    videoDataUrl: pendingPostVideoDataUrl,
    videoThumbnailDataUrl: pendingPostVideoThumbnailDataUrl,
    videoDuration: pendingPostVideoDuration,
    mediaType: pendingPostMediaType || (pendingPostImageDataUrl ? "image" : null),
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString(),
  };

  state.posts.unshift(post);
  addPostToTankAlbumOrder(post);
  saveState();
  renderApp();
  resetPostForm();
  closePostModal();
  showView("community");
  showToast("投稿を追加しました");
  if (authSession?.user) {
    await syncCloudState({ silent: true });
  }
});

document.querySelectorAll("[data-guide-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.guideFilter;

    document.querySelectorAll("[data-guide-filter]").forEach((tab) => {
      tab.classList.toggle("is-active", tab === button);
    });

    document.querySelectorAll("[data-guide-kind]").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.guideKind !== filter;
    });
  });
});

function renderApp() {
  ensureActiveTank();
  ensureDailyTasks();
  applyUiMode();
  renderHeroPhoto();
  renderTankList();
  renderTankProfile();
  renderTimeline();
  renderPostControls();
  renderPosts();
  renderCommunityRanking();
  renderTankPosts();
  renderTankAlbum();
  renderTasks();
  renderReminders();
  renderDashboard();
  renderAccount();
  renderPwaTestScopeHint();
  renderAiApiStatus();
  renderAiEvaluationLog();
}

function renderPostControls() {
  const currentFilter = postTankFilter.value || "all";
  const options = state.tanks
    .map((tank) => `<option value="${escapeHtml(tank.id)}">${escapeHtml(tank.name)}</option>`)
    .join("");

  postTankSelect.innerHTML = options;
  postTankSelect.value = state.activeTankId;
  postTankFilter.innerHTML = `<option value="all">すべての水槽・池</option>${options}`;
  postTankFilter.value = currentFilter;

  if (!state.tanks.some((tank) => tank.id === postTankFilter.value) && postTankFilter.value !== "all") {
    postTankFilter.value = "all";
  }
}

function renderHeroPhoto() {
  const tank = getActiveTank();
  const featuredPost = state.posts.find(
    (post) => post.id === tank.featuredPostId && !String(post.id).startsWith("sample-") && getPostThumbnailSrc(post),
  );
  const featuredImage = featuredPost ? getPostThumbnailSrc(featuredPost) : null;
  const heroImage = state.heroPhotoDataUrl || featuredImage;

  heroPhoto.src = heroImage || "assets/site-concept.png";
  heroPhoto.alt = heroImage ? `${tank.name} の水槽写真` : "水槽写真未設定";
  heroMedia.classList.toggle("is-placeholder", !heroImage);
  heroPhotoStatus.textContent = state.heroPhotoDataUrl ? "トップ写真" : featuredImage ? "メイン水槽写真" : "写真未設定";
  heroTankName.textContent = tank.name;
  heroPhotoNote.textContent = heroImage
    ? "この水槽をTOPに大きく表示しています"
    : "写真を設定すると、ここに自分の水槽が大きく表示されます";
}

function renderAccount() {
  const account = state.account;
  const syncLabel = getSyncStatusLabel(account);
  const planLabel = getPlanLabel(account.plan);
  const hasRemoteSession = Boolean(authSession?.user);

  sidebarAccountName.textContent = account.name;
  sidebarAccountHandle.textContent = `@${account.handle}`;
  sidebarAccountPlan.textContent = `${planLabel} / ${getVisibilityLabel(account.visibility)}`;
  syncStatusLabel.textContent = syncLabel;
  syncStatusButton.className = `sync-status-button ${account.syncStatus === "synced" ? "is-synced" : ""}`;
  syncStatusDot.className = account.syncStatus === "synced" ? "is-synced" : "";
  accountSyncChip.textContent = syncLabel;
  accountSyncChip.className = `account-sync-chip ${account.syncStatus === "synced" ? "is-synced" : ""}`;
  mockSyncButton.textContent = hasRemoteSession ? "クラウド同期" : "同期を記録";

  document.querySelector("#account-name-input").value = account.name;
  document.querySelector("#account-handle-input").value = account.handle;
  document.querySelector("#account-email-input").value = account.email;
  document.querySelector("#account-visibility-input").value = account.visibility;
  document.querySelector("#account-plan-input").value = account.plan;
  accountUiModeInput.value = getAllowedValue(account.uiMode, UI_MODES, "standard");
  homeUiModeInput.value = getAllowedValue(account.uiMode, UI_MODES, "standard");
  document.querySelector("#account-notification-channel-input").value = account.notificationChannel;
  document.querySelector("#account-browser-notifications-input").checked = Boolean(account.browserNotifications);
  document.querySelector("#account-email-notifications-input").checked = Boolean(account.emailNotifications);
  document.querySelector("#account-quiet-start-input").value = account.quietHoursStart;
  document.querySelector("#account-quiet-end-input").value = account.quietHoursEnd;
  renderCustomAppearance();
  notificationPreferenceSummary.textContent = getNotificationPreferenceSummary();
  renderNotificationDeliveryLog();
  renderNotificationVerificationChecklist();
  renderPwaTestResults();
  renderPwaReleaseDecision();
  renderMonitorReadiness();
  renderMonitorFeedback();
  renderProductionSetupSummary();

  const mediaCount = state.posts.filter((post) => hasPostMedia(post)).length;
  const commentCount = state.posts.reduce((total, post) => total + getDisplayCommentCount(post), 0);
  const logCount = state.tanks.reduce((total, tank) => total + tank.logs.length, 0);
  const pwaTestCount = Array.isArray(state.pwaTestResults) ? state.pwaTestResults.length : 0;
  const monitorFeedbackCount = Array.isArray(state.monitorFeedback) ? state.monitorFeedback.length : 0;
  const exportedSize = Math.ceil(JSON.stringify(state).length / 1024);

  syncSummary.innerHTML = `
    <article>
      <span>保存状態</span>
      <strong>${escapeHtml(syncLabel)}</strong>
      <small>${account.lastSyncedAt ? `${formatFullDate(account.lastSyncedAt)} に同期` : "まだ同期記録はありません"}</small>
    </article>
    <article>
      <span>データ量</span>
      <strong>${state.tanks.length}水槽 / ${state.posts.length}投稿</strong>
      <small>ログ ${logCount}件、コメント ${commentCount}件、メディア ${mediaCount}件、PWA確認 ${pwaTestCount}件、感想 ${monitorFeedbackCount}件</small>
    </article>
    <article>
      <span>移行ファイル</span>
      <strong>約 ${exportedSize}KB</strong>
      <small>JSONで書き出して、次のDB設計に使えます</small>
    </article>
  `;

  renderAuthPanel();
}

function renderProductionSetupSummary() {
  if (!productionSetupSummary) {
    return;
  }

  const setupSummary = getProductionSetupSummaryState();
  const setupCheck = normalizeProductionSetupCheck(state.productionSetupCheck || {});
  if (productionSupabaseCheckForm) {
    document.querySelector("#production-supabase-status-input").value = setupCheck.supabaseStatus;
    document.querySelector("#production-supabase-reviewer-input").value = setupCheck.supabaseReviewer || state.account.name || "";
    document.querySelector("#production-supabase-note-input").value = setupCheck.supabaseNote;
  }
  if (productionStorageCheckForm) {
    document.querySelector("#production-storage-status-input").value = setupCheck.storageStatus;
    document.querySelector("#production-storage-reviewer-input").value = setupCheck.storageReviewer || state.account.name || "";
    document.querySelector("#production-storage-note-input").value = setupCheck.storageNote;
  }
  if (productionAiCheckForm) {
    document.querySelector("#production-ai-status-input").value = setupCheck.aiStatus;
    document.querySelector("#production-ai-reviewer-input").value = setupCheck.aiReviewer || state.account.name || "";
    document.querySelector("#production-ai-note-input").value = setupCheck.aiNote;
  }
  if (productionNotificationCheckForm) {
    const productionCheck = normalizeNotificationProductionCheck(state.notificationProductionCheck || {});
    document.querySelector("#production-notification-env-status-input").value = productionCheck.envStatus;
    document.querySelector("#production-notification-dry-run-status-input").value = productionCheck.dryRunStatus;
    document.querySelector("#production-notification-send-status-input").value = productionCheck.sendStatus;
    document.querySelector("#production-notification-reviewer-input").value = productionCheck.reviewer || state.account.name || "";
    document.querySelector("#production-notification-note-input").value = productionCheck.note;
  }
  if (productionSetupNextAction) {
    productionSetupNextAction.className = `production-setup-next ${setupSummary.ready ? "ready" : "pending"}`;
    productionSetupNextAction.innerHTML = `
      <span>${escapeHtml(setupSummary.ready ? "本番前セットアップOK" : "次の作業")}</span>
      <strong>${escapeHtml(setupSummary.nextAction)}</strong>
    `;
  }
  productionSetupSummary.innerHTML = setupSummary.items
    .map(
      (item) => `
        <article class="${escapeHtml(item.status)}">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
          <small>${escapeHtml(item.note)}</small>
        </article>
      `,
    )
    .join("");
}

function handleProductionSupabaseCheckSubmit(event) {
  event.preventDefault();
  state.productionSetupCheck = normalizeProductionSetupCheck({
    ...state.productionSetupCheck,
    supabaseStatus: document.querySelector("#production-supabase-status-input").value,
    supabaseReviewer: document.querySelector("#production-supabase-reviewer-input").value,
    supabaseNote: document.querySelector("#production-supabase-note-input").value,
    supabaseCheckedAt: new Date().toISOString(),
  });
  saveState();
  renderProductionSetupSummary();
  showToast("Supabase確認を保存しました");
}

function handleProductionStorageCheckSubmit(event) {
  event.preventDefault();
  state.productionSetupCheck = normalizeProductionSetupCheck({
    ...state.productionSetupCheck,
    storageStatus: document.querySelector("#production-storage-status-input").value,
    storageReviewer: document.querySelector("#production-storage-reviewer-input").value,
    storageNote: document.querySelector("#production-storage-note-input").value,
    storageCheckedAt: new Date().toISOString(),
  });
  saveState();
  renderProductionSetupSummary();
  showToast("Storage確認を保存しました");
}

function handleProductionAiCheckSubmit(event) {
  event.preventDefault();
  state.productionSetupCheck = normalizeProductionSetupCheck({
    ...state.productionSetupCheck,
    aiStatus: document.querySelector("#production-ai-status-input").value,
    aiReviewer: document.querySelector("#production-ai-reviewer-input").value,
    aiNote: document.querySelector("#production-ai-note-input").value,
    aiCheckedAt: new Date().toISOString(),
  });
  saveState();
  renderProductionSetupSummary();
  showToast("AI Gateway確認を保存しました");
}

function handleProductionNotificationCheckSubmit(event) {
  event.preventDefault();
  state.notificationProductionCheck = normalizeNotificationProductionCheck({
    envStatus: document.querySelector("#production-notification-env-status-input").value,
    dryRunStatus: document.querySelector("#production-notification-dry-run-status-input").value,
    sendStatus: document.querySelector("#production-notification-send-status-input").value,
    reviewer: document.querySelector("#production-notification-reviewer-input").value,
    note: document.querySelector("#production-notification-note-input").value,
    checkedAt: new Date().toISOString(),
  });
  saveState();
  renderNotificationVerificationChecklist();
  renderProductionSetupSummary();
  showToast("通知確認を保存しました");
}

function getProductionSetupSummaryState(results = state.pwaTestResults || []) {
  const items = getProductionSetupSummaryItems(results);
  const counts = items.reduce(
    (summary, item) => ({
      ...summary,
      [item.status]: summary[item.status] + 1,
    }),
    { ready: 0, manual: 0, missing: 0 },
  );

  return {
    ready: counts.ready === items.length,
    readyCount: counts.ready,
    manualCount: counts.manual,
    missingCount: counts.missing,
    totalCount: items.length,
    nextAction: getProductionSetupNextAction(items),
    items: items.map((item) => ({
      ...item,
      statusLabel: getProductionSetupStatusLabel(item.status),
    })),
  };
}

function getProductionSetupSummaryItems(results = state.pwaTestResults || []) {
  const setupStatus = getSupabaseSetupStatus();
  const pwaCoverage = getPwaReleaseCoverage(results);
  const gatewayReady = aiApiStatus.configured === true;
  const setupCheck = normalizeProductionSetupCheck(state.productionSetupCheck || {});
  const supabaseReady = setupCheck.supabaseStatus === "confirmed";
  const supabaseIssue = setupCheck.supabaseStatus === "issues";
  const storageReady = setupCheck.storageStatus === "confirmed";
  const storageIssue = setupCheck.storageStatus === "issues";
  const aiReady = setupCheck.aiStatus === "confirmed";
  const aiIssue = setupCheck.aiStatus === "issues";
  const productionCheck = normalizeNotificationProductionCheck(state.notificationProductionCheck || {});
  const notificationReady =
    productionCheck.envStatus === "confirmed" &&
    productionCheck.dryRunStatus === "confirmed" &&
    productionCheck.sendStatus === "confirmed";
  const mediaCount = state.posts.filter((post) => hasPostMedia(post)).length;
  const pwaTestCount = Array.isArray(results) ? results.length : 0;
  return [
    {
      label: "Supabase",
      status: supabaseReady ? "ready" : supabaseIssue ? "missing" : setupStatus.ready && authSession?.user ? "ready" : setupStatus.ready ? "manual" : "missing",
      value: supabaseReady ? "SQL確認済み" : supabaseIssue ? "要対応" : authSession?.user ? "ログイン中" : setupStatus.ready ? "接続準備済み" : "未設定",
      note: setupCheck.supabaseNote || (authSession?.user ? "プロフィール同期まで確認できます" : setupStatus.message),
      reviewer: setupCheck.supabaseReviewer,
      checkedAt: setupCheck.supabaseCheckedAt,
    },
    {
      label: "Storage",
      status: storageReady ? "ready" : storageIssue ? "missing" : mediaCount ? "manual" : "missing",
      value: storageReady ? "OK" : storageIssue ? "要対応" : mediaCount ? `${mediaCount}件のメディア` : "未確認",
      note: setupCheck.storageNote || (mediaCount ? "Supabase Storage bucket側の保存確認が残ります" : "水槽写真または投稿メディアで確認します"),
      reviewer: setupCheck.storageReviewer,
      checkedAt: setupCheck.storageCheckedAt,
    },
    {
      label: "AI Gateway",
      status: aiReady ? "ready" : aiIssue ? "missing" : gatewayReady ? "ready" : aiApiStatus.checkedAt ? "missing" : "manual",
      value: aiReady ? "確認済み" : aiIssue ? "要対応" : gatewayReady ? "OK" : aiApiStatus.checkedAt ? "要確認" : "未確認",
      note: setupCheck.aiNote || (gatewayReady ? `${aiApiStatus.gateway} / ${aiApiStatus.model}` : "AI画面のAI API検証で確認します"),
      reviewer: setupCheck.aiReviewer,
      checkedAt: setupCheck.aiCheckedAt,
    },
    {
      label: "通知",
      status: notificationReady ? "ready" : "manual",
      value: notificationReady ? "OK" : getNotificationProductionNextAction(productionCheck),
      note: productionCheck.checkedAt ? `${formatFullDate(productionCheck.checkedAt)} に確認` : "通知本番チェックの確認メモを保存します",
      reviewer: productionCheck.reviewer,
      checkedAt: productionCheck.checkedAt,
    },
    {
      label: "PWA実機QA",
      status: pwaCoverage.ready ? "ready" : pwaTestCount ? "manual" : "missing",
      value: pwaCoverage.ready ? "OK" : `${pwaCoverage.passedCount}/${pwaCoverage.scopes.length} OK`,
      note: pwaTestCount ? `${pwaTestCount}件の実機テスト記録` : "本番URLで実機テスト結果を保存します",
    },
  ];
}

function getProductionSetupNextAction(items) {
  const nextItem = items.find((item) => item.status === "missing") || items.find((item) => item.status === "manual");
  if (!nextItem) {
    return "公開前セットアップはすべてOKです。PWA最終リリース判定とレビューJSONを書き出してください。";
  }

  return `${nextItem.label}: ${nextItem.note}`;
}

function getProductionSetupStatusLabel(status) {
  const labels = {
    ready: "OK",
    manual: "要確認",
    missing: "未確認",
  };
  return labels[status] || labels.missing;
}

function renderMonitorReadiness() {
  if (!monitorReadinessSummary || !monitorReadinessNext || !monitorReadinessChip) {
    return;
  }

  const readiness = getMonitorReadinessState();
  monitorReadinessChip.textContent = readiness.ready ? "モニター開始OK" : `${readiness.readyCount}/${readiness.totalCount}`;
  monitorReadinessChip.className = `monitor-readiness-chip ${readiness.ready ? "ready" : "pending"}`;
  monitorReadinessNext.className = `monitor-readiness-next ${readiness.ready ? "ready" : "pending"}`;
  monitorReadinessNext.innerHTML = `
    <span>${escapeHtml(readiness.ready ? "次の作業" : "優先タスク")}</span>
    <strong>${escapeHtml(readiness.nextAction)}</strong>
  `;
  monitorReadinessSummary.innerHTML = readiness.items
    .map(
      (item) => `
        <article class="${escapeHtml(item.status)}">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
          <small>${escapeHtml(item.note)}</small>
        </article>
      `,
    )
    .join("");
  renderMonitorGuideCopyPreview(readiness);
}

function renderMonitorGuideCopyPreview(readiness = getMonitorReadinessState()) {
  if (!monitorGuideCopyPreview) {
    return;
  }

  const guideText = getMonitorGuideText(readiness);
  monitorGuideCopyPreview.innerHTML = `
    <strong>送付文の内容</strong>
    <p>${escapeHtml(guideText.split("\n").slice(0, 3).join(" "))}</p>
  `;
}

async function copyMonitorGuideText() {
  const text = getMonitorGuideText();
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("モニター案内文をコピーしました");
      return;
    } catch (error) {
      console.warn("Clipboard copy failed", error);
    }
  }

  downloadFile(
    `aquanote-monitor-guide-${getDateKey(new Date())}.txt`,
    text,
    "text/plain;charset=utf-8",
  );
  showToast("コピーできないため案内文を書き出しました");
}

function getMonitorGuideText(readiness = getMonitorReadinessState()) {
  const decision = normalizePwaReleaseDecision(state.pwaReleaseDecision || {});
  const urlLine = decision.productionUrl ? `モニターURL: ${decision.productionUrl}` : "モニターURL: これから共有します";
  const nextLine = readiness.ready
    ? "準備状況: モニター開始OKです"
    : `準備状況: ${readiness.readyCount}/${readiness.totalCount}項目確認済み、優先確認は「${readiness.nextAction}」です`;

  return [
    "AquaNote モニター確認のお願い",
    urlLine,
    nextLine,
    "",
    "試してほしいこと:",
    "1. 新規登録またはログインをして、プロフィールを保存する",
    "2. 自分の水槽を1つ登録し、写真をTOPに設定する",
    "3. 水温、pH、水換え、フィルター掃除を1回ずつ記録する",
    "4. 投稿またはアルバムに写真を1枚追加する",
    "5. ベーシック、かんたん、管理重視、投稿重視モードを切り替えて感想を残す",
    "",
    "見てほしいポイント:",
    "- 初めてでも次に押す場所が分かるか",
    "- 文字の見切れ、押しにくいボタン、戻りにくい画面がないか",
    "- 水槽写真、投稿、記録、表示モード変更が自然に使えるか",
    "",
    "気づいたことは、端末名と画面名も一緒に教えてください。",
  ].join("\n");
}

function handleMonitorFeedbackSubmit(event) {
  event.preventDefault();
  const note = document.querySelector("#monitor-feedback-note-input").value.trim();
  if (!note) {
    showToast("内容を入力してください");
    return;
  }

  const entry = normalizeMonitorFeedback({
    id: createId("monitor-feedback"),
    createdAt: new Date().toISOString(),
    participant: document.querySelector("#monitor-feedback-name-input").value,
    device: document.querySelector("#monitor-feedback-device-input").value,
    kind: document.querySelector("#monitor-feedback-kind-input").value,
    priority: document.querySelector("#monitor-feedback-priority-input").value,
    status: document.querySelector("#monitor-feedback-status-input").value,
    note,
  });

  state.monitorFeedback = [entry, ...(state.monitorFeedback || [])].slice(0, 80);
  saveState();
  monitorFeedbackForm.reset();
  renderMonitorFeedback();
  showToast("フィードバックを保存しました");
}

function renderMonitorFeedback() {
  if (!monitorFeedbackSummary || !monitorFeedbackList) {
    return;
  }

  const entries = Array.isArray(state.monitorFeedback) ? state.monitorFeedback.map(normalizeMonitorFeedback) : [];
  const filteredEntries = getFilteredMonitorFeedback(entries).sort(compareMonitorFeedbackForTriage);
  const bugCount = entries.filter((entry) => entry.kind === "bug").length;
  const uiCount = entries.filter((entry) => entry.kind === "ui").length;
  const highCount = entries.filter((entry) => entry.priority === "high").length;
  const openCount = entries.filter((entry) => entry.status === "open").length;
  const doingCount = entries.filter((entry) => entry.status === "doing").length;
  const doneCount = entries.filter((entry) => entry.status === "done").length;
  const latest = entries[0]?.createdAt ? formatFullDate(entries[0].createdAt) : "まだ記録なし";
  monitorFeedbackStatusFilter.value = activeMonitorFeedbackStatusFilter;
  monitorFeedbackKindFilter.value = activeMonitorFeedbackKindFilter;
  monitorFeedbackPriorityFilter.value = activeMonitorFeedbackPriorityFilter;

  monitorFeedbackSummary.innerHTML = `
    <article>
      <span>記録数</span>
      <strong>${entries.length}件</strong>
      <small>未対応 ${openCount}件 / 対応中 ${doingCount}件</small>
    </article>
    <article>
      <span>不具合/UI</span>
      <strong>${bugCount + uiCount}件</strong>
      <small>不具合 ${bugCount}件 / UI ${uiCount}件</small>
    </article>
    <article>
      <span>優先度高</span>
      <strong>${highCount}件</strong>
      <small>モニター中に先に直す候補</small>
    </article>
    <article>
      <span>表示中</span>
      <strong>${filteredEntries.length}件</strong>
      <small>対応済み ${doneCount}件 / 最新 ${escapeHtml(latest)}</small>
    </article>
  `;
  renderMonitorFeedbackNext(entries);

  if (!entries.length) {
    monitorFeedbackList.innerHTML = `
      <article class="monitor-feedback-empty">
        <strong>まだフィードバックはありません</strong>
        <span>モニター参加者から聞いたことを、端末と一緒にここへ残します。</span>
      </article>
    `;
    return;
  }

  if (!filteredEntries.length) {
    monitorFeedbackList.innerHTML = `
      <article class="monitor-feedback-empty">
        <strong>条件に合うフィードバックはありません</strong>
        <span>絞り込みを解除すると全件を確認できます。</span>
      </article>
    `;
    return;
  }

  monitorFeedbackList.innerHTML = filteredEntries
    .map(
      (entry) => `
        <article class="monitor-feedback-item ${escapeHtml(entry.priority)}">
          <div class="monitor-feedback-main">
            <div class="monitor-feedback-meta">
              <span>${escapeHtml(getMonitorFeedbackKindLabel(entry.kind))}</span>
              <span>${escapeHtml(getMonitorFeedbackPriorityLabel(entry.priority))}</span>
              <span class="${escapeHtml(entry.status)}">${escapeHtml(getMonitorFeedbackStatusLabel(entry.status))}</span>
              <small>${escapeHtml(formatFullDate(entry.createdAt))}</small>
            </div>
            <strong>${escapeHtml(entry.participant || "参加者未設定")} / ${escapeHtml(entry.device || "端末未設定")}</strong>
            <p>${escapeHtml(entry.note)}</p>
          </div>
          <div class="monitor-feedback-actions">
            ${getMonitorFeedbackStatusActions(entry)}
            <button class="text-button" type="button" data-monitor-feedback-delete="${escapeHtml(entry.id)}">削除</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderMonitorFeedbackNext(entries) {
  if (!monitorFeedbackNext) {
    return;
  }

  const triage = getMonitorFeedbackTriage(entries);
  monitorFeedbackNext.className = `monitor-feedback-next ${triage.next ? "active" : "clear"}`;
  monitorFeedbackNext.innerHTML = triage.next
    ? `
      <span>次に直す候補</span>
      <strong>${escapeHtml(triage.next.title)}</strong>
      <small>${escapeHtml(triage.next.note)}</small>
    `
    : `
      <span>次に直す候補</span>
      <strong>未対応の高優先度はありません</strong>
      <small>新しい不具合やUI指摘が入ったらここに表示します。</small>
    `;
}

function getMonitorFeedbackTriage(entries) {
  const normalizedEntries = entries.map(normalizeMonitorFeedback);
  const unresolved = normalizedEntries
    .filter((entry) => entry.status !== "done")
    .sort(compareMonitorFeedbackForTriage);
  const highUnresolved = unresolved.filter((entry) => entry.priority === "high");
  const next = highUnresolved[0] || unresolved.find((entry) => entry.kind === "bug" || entry.kind === "ui") || unresolved[0] || null;

  return {
    unresolvedCount: unresolved.length,
    highUnresolvedCount: highUnresolved.length,
    next: next
      ? {
          id: next.id,
          title: `${getMonitorFeedbackPriorityLabel(next.priority)} / ${getMonitorFeedbackKindLabel(next.kind)} / ${next.participant || "参加者未設定"}`,
          note: `${next.device || "端末未設定"}: ${next.note}`,
        }
      : null,
  };
}

function compareMonitorFeedbackForTriage(a, b) {
  const statusRank = { open: 0, doing: 1, done: 2 };
  const priorityRank = { high: 0, watch: 1, low: 2 };
  const kindRank = { bug: 0, ui: 1, request: 2, impression: 3 };
  return (
    (statusRank[a.status] ?? 3) - (statusRank[b.status] ?? 3) ||
    (priorityRank[a.priority] ?? 3) - (priorityRank[b.priority] ?? 3) ||
    (kindRank[a.kind] ?? 4) - (kindRank[b.kind] ?? 4) ||
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

function getFilteredMonitorFeedback(entries) {
  return entries.filter((entry) => {
    const statusMatch = activeMonitorFeedbackStatusFilter === "all" || entry.status === activeMonitorFeedbackStatusFilter;
    const kindMatch = activeMonitorFeedbackKindFilter === "all" || entry.kind === activeMonitorFeedbackKindFilter;
    const priorityMatch = activeMonitorFeedbackPriorityFilter === "all" || entry.priority === activeMonitorFeedbackPriorityFilter;
    return statusMatch && kindMatch && priorityMatch;
  });
}

function exportMonitorFeedback() {
  const entries = Array.isArray(state.monitorFeedback) ? state.monitorFeedback.map(normalizeMonitorFeedback) : [];
  if (!entries.length) {
    showToast("書き出すフィードバックがありません");
    return;
  }

  const payload = {
    app: "AquaNote",
    type: "monitor-feedback",
    exportedAt: new Date().toISOString(),
    count: entries.length,
    triage: getMonitorFeedbackTriage(entries),
    items: entries,
  };

  downloadFile(
    `aquanote-monitor-feedback-${getDateKey(new Date())}.json`,
    JSON.stringify(payload, null, 2),
    "application/json;charset=utf-8",
  );
  showToast("モニターフィードバックを書き出しました");
}

function exportMonitorFeedbackCsv() {
  const entries = Array.isArray(state.monitorFeedback) ? state.monitorFeedback.map(normalizeMonitorFeedback) : [];
  if (!entries.length) {
    showToast("書き出すフィードバックがありません");
    return;
  }

  const triage = getMonitorFeedbackTriage(entries);
  const rows = [
    ["kind", "priority", "status", "createdAt", "participant", "device", "note", "nextCandidate"],
    ...entries.sort(compareMonitorFeedbackForTriage).map((entry) => [
      getMonitorFeedbackKindLabel(entry.kind),
      getMonitorFeedbackPriorityLabel(entry.priority),
      getMonitorFeedbackStatusLabel(entry.status),
      entry.createdAt,
      entry.participant,
      entry.device,
      entry.note,
      triage.next?.id === entry.id ? "yes" : "",
    ]),
  ];

  downloadFile(`aquanote-monitor-feedback-${getDateKey(new Date())}.csv`, toCsv(rows), "text/csv;charset=utf-8");
  showToast("モニターフィードバックをCSVで書き出しました");
}

function normalizeMonitorFeedback(entry = {}) {
  return {
    id: entry.id || createId("monitor-feedback"),
    createdAt: entry.createdAt || new Date().toISOString(),
    participant: String(entry.participant || entry.name || "").trim(),
    device: String(entry.device || "").trim(),
    kind: getAllowedValue(entry.kind, MONITOR_FEEDBACK_KINDS, "impression"),
    priority: getAllowedValue(entry.priority, MONITOR_FEEDBACK_PRIORITIES, "watch"),
    status: getAllowedValue(entry.status, MONITOR_FEEDBACK_STATUSES, "open"),
    resolvedAt: entry.resolvedAt || null,
    note: String(entry.note || "").trim(),
  };
}

function getMonitorFeedbackKindLabel(kind) {
  const labels = {
    impression: "感想",
    bug: "不具合",
    ui: "UI/デザイン",
    request: "要望",
  };
  return labels[kind] || labels.impression;
}

function getMonitorFeedbackPriorityLabel(priority) {
  const labels = {
    watch: "確認",
    high: "高",
    low: "低",
  };
  return labels[priority] || labels.watch;
}

function getMonitorFeedbackStatusLabel(status) {
  const labels = {
    open: "未対応",
    doing: "対応中",
    done: "対応済み",
  };
  return labels[status] || labels.open;
}

function getMonitorFeedbackStatusActions(entry) {
  const actions = MONITOR_FEEDBACK_STATUSES.filter((status) => status !== entry.status);
  return actions
    .map(
      (status) => `
        <button
          class="text-button"
          type="button"
          data-monitor-feedback-status="${escapeHtml(entry.id)}"
          data-monitor-feedback-next-status="${escapeHtml(status)}"
        >${escapeHtml(getMonitorFeedbackStatusLabel(status))}</button>
      `,
    )
    .join("");
}

function getMonitorReadinessState() {
  const items = getMonitorReadinessItems();
  const readyCount = items.filter((item) => item.status === "ready").length;
  const nextItem = items.find((item) => item.status === "missing") || items.find((item) => item.status === "manual");
  return {
    ready: readyCount === items.length,
    readyCount,
    totalCount: items.length,
    nextAction: nextItem ? `${nextItem.label}: ${nextItem.note}` : "モニター参加者へURLと案内文を渡して、実機フィードバックを集めます。",
    items,
  };
}

function getMonitorReadinessItems() {
  const setup = getProductionSetupSummaryState();
  const pwaCoverage = getPwaReleaseCoverage(state.pwaTestResults || []);
  const decision = normalizePwaReleaseDecision(state.pwaReleaseDecision || {});
  const setupReadyCount = setup.items.filter((item) => item.status === "ready").length;
  const mediaCount = state.posts.filter((post) => hasPostMedia(post)).length;
  const filterReady = state.tanks.some((tank) => {
    const filter = normalizeTankFilter(tank.filter);
    return Boolean(filter.type || filter.lastCleanedAt || filter.note);
  });
  const hasCoreUserFlow = state.tanks.length > 0 && typeof getTankResidentValue(getActiveTank()) === "string";

  return [
    {
      label: "初回導線",
      status: hasCoreUserFlow ? "ready" : "missing",
      value: hasCoreUserFlow ? "OK" : "未確認",
      note: hasCoreUserFlow ? "水槽登録、記録、投稿へ進める構成です" : "水槽登録から記録までの流れを確認します",
    },
    {
      label: "フィルター管理",
      status: filterReady ? "ready" : "manual",
      value: filterReady ? "入力あり" : "要確認",
      note: filterReady ? "フィルター種類、掃除日、流量メモを表示できます" : "モニター前に1水槽でフィルター管理を入力します",
    },
    {
      label: "写真/メディア",
      status: mediaCount ? "ready" : "manual",
      value: mediaCount ? `${mediaCount}件` : "未投稿",
      note: mediaCount ? "写真または動画の表示確認ができます" : "モニター前に写真投稿またはTOP画像を1件確認します",
    },
    {
      label: "本番前設定",
      status: setup.ready ? "ready" : setupReadyCount >= 3 ? "manual" : "missing",
      value: `${setupReadyCount}/${setup.totalCount}`,
      note: setup.ready ? "Supabase、Storage、AI、通知、PWA QAが揃っています" : setup.nextAction,
    },
    {
      label: "実機UI",
      status: pwaCoverage.ready ? "ready" : pwaCoverage.passedCount ? "manual" : "missing",
      value: `${pwaCoverage.passedCount}/${pwaCoverage.scopes.length}`,
      note: pwaCoverage.ready ? "必須実機QAはOKです" : "スマホでログイン、4モード、画像カスタムを保存します",
    },
    {
      label: "判定メモ",
      status: decision.productionUrl && decision.reviewer && decision.note ? "ready" : "manual",
      value: decision.productionUrl ? "URLあり" : "URL未記録",
      note: decision.productionUrl ? "モニターURL、確認者、残タスクを判定メモに残します" : "モニターで使うURLを最終リリース判定に保存します",
    },
  ];
}

function renderCustomAppearance() {
  const backgroundImage = state.account.backgroundImageDataUrl;
  const buttonImage = state.account.buttonImageDataUrl;

  accountBackgroundPreview.style.backgroundImage = backgroundImage ? `url("${backgroundImage}")` : "";
  accountButtonPreview.style.backgroundImage = buttonImage ? `url("${buttonImage}")` : "";
  accountBackgroundPreview.classList.toggle("has-image", Boolean(backgroundImage));
  accountButtonPreview.classList.toggle("has-image", Boolean(buttonImage));
  accountBackgroundStatus.textContent = backgroundImage ? "背景に反映中" : "未設定";
  accountButtonStatus.textContent = buttonImage ? "ボタン背面に反映中" : "未設定";
  accountBackgroundImageClearButton.disabled = !backgroundImage;
  accountButtonImageClearButton.disabled = !buttonImage;
  applyCustomAppearance();
}

async function handlePwaTestSubmit(event) {
  event.preventDefault();
  const result = normalizePwaTestResult({
    id: createId("pwa-test"),
    createdAt: new Date().toISOString(),
    device: document.querySelector("#pwa-test-device-input").value,
    browser: document.querySelector("#pwa-test-browser-input").value,
    status: document.querySelector("#pwa-test-status-input").value,
    scope: document.querySelector("#pwa-test-scope-input").value,
    note: document.querySelector("#pwa-test-note-input").value,
  });

  state.pwaTestResults = [result, ...state.pwaTestResults].slice(0, 20);
  saveState();
  pwaTestForm.reset();
  renderPwaTestScopeHint();
  renderPwaTestResults();
  if (authSession?.user) {
    await syncPwaDeviceTestsToSupabase({ silent: true });
  }
  showToast("PWA実機テスト結果を保存しました");
}

function renderPwaTestResults() {
  if (!pwaTestLog) {
    return;
  }

  const results = Array.isArray(state.pwaTestResults) ? state.pwaTestResults : [];
  renderPwaTestReview(results);
  if (!results.length) {
    pwaTestLog.innerHTML = `
      <article class="pwa-test-empty">
        <strong>まだ記録はありません</strong>
        <span>本番URLで確認した端末、ブラウザ、結果をここに残せます。</span>
      </article>
    `;
    return;
  }

  pwaTestLog.innerHTML = results
    .map(
      (result) => `
        <article class="pwa-test-item ${escapeHtml(result.status)}">
          <div>
            <span>${escapeHtml(getPwaTestScopeLabel(result.scope))} / ${escapeHtml(getPwaTestStatusLabel(result.status))}</span>
            <strong>${escapeHtml(result.device)} / ${escapeHtml(result.browser)}</strong>
            <small>${escapeHtml(formatFullDate(result.createdAt))}</small>
          </div>
          <p>${escapeHtml(result.note || "メモなし")}</p>
          <button class="text-button" type="button" data-pwa-test-delete="${escapeHtml(result.id)}">削除</button>
        </article>
      `,
    )
    .join("");
}

function renderPwaTestScopeHint() {
  if (!pwaTestScopeInput || !pwaTestScopeHint) {
    return;
  }

  const scope = getAllowedValue(pwaTestScopeInput.value, PWA_REQUIRED_SCOPES, "install");
  const hints = PWA_SCOPE_QA_HINTS[scope] || [];
  pwaTestScopeHint.innerHTML = `
    <span>${escapeHtml(getPwaTestScopeLabel(scope))}の記録観点</span>
    <div>
      ${hints.map((hint) => `<small>${escapeHtml(hint)}</small>`).join("")}
    </div>
  `;
}

function applyPwaTestNoteTemplate() {
  if (!pwaTestScopeInput || !pwaTestNoteInput) {
    return;
  }

  const scope = getAllowedValue(pwaTestScopeInput.value, PWA_REQUIRED_SCOPES, "install");
  const template = PWA_SCOPE_NOTE_TEMPLATES[scope] || "";
  pwaTestNoteInput.value = pwaTestNoteInput.value ? `${pwaTestNoteInput.value}\n${template}` : template;
  pwaTestNoteInput.focus();
}

function renderPwaTestReview(results) {
  if (!pwaTestReview) {
    return;
  }

  const scopes = PWA_REQUIRED_SCOPES;
  const scopeStatuses = getPwaScopeStatuses(results);
  const watchCount = scopes.filter((scope) => scopeStatuses[scope] === "watch").length;
  const failedCount = scopes.filter((scope) => scopeStatuses[scope] === "failed").length;
  const passedCount = scopes.filter((scope) => scopeStatuses[scope] === "passed").length;
  const totalCount = results.length;
  const latestResult = results[0] || null;
  const modeQa = getPwaModeQaSummary(results);
  const actionItems = getPwaDeviceQaActionItems(results);
  const resolvedActionCount = getPwaDeviceQaActionItems(results, { includeResolved: true }).filter((item) => item.resolved).length;
  const ready = passedCount === scopes.length && failedCount === 0;
  const reviewLabel = ready ? "公開前OK" : totalCount ? "確認中" : "未記録";
  const reviewNote = ready
    ? "必須項目はOKです。最後に本番URLで再読み込みして、通知、オフライン復帰、画像カスタムをもう一度確認します。"
    : "本番URLでログイン、ホーム追加、通知受信、オフライン復帰、4モード表示、画像カスタムを確認して記録します。";

  pwaTestReview.innerHTML = `
    <div class="pwa-test-score ${ready ? "ready" : "pending"}">
      <span>${escapeHtml(reviewLabel)}</span>
      <strong>${passedCount}/${scopes.length}</strong>
      <small>${escapeHtml(reviewNote)}</small>
    </div>
    <div class="pwa-test-scope-grid">
      ${scopes
        .map((scope) => {
          const status = scopeStatuses[scope];
          return `
            <article class="${escapeHtml(status)}">
              <span>${escapeHtml(getPwaTestScopeLabel(scope))}</span>
              <strong>${escapeHtml(getPwaTestStatusLabel(status))}</strong>
            </article>
          `;
        })
        .join("")}
    </div>
    <p class="pwa-test-review-note">
      ${escapeHtml(`記録 ${totalCount}件 / 要確認 ${watchCount}件 / NG ${failedCount}件${latestResult ? ` / 最新 ${formatFullDate(latestResult.createdAt)}` : ""}`)}
    </p>
    <div class="pwa-mode-qa-list">
      ${modeQa
        .map(
          (item) => `
            <article class="${item.ready ? "passed" : "missing"}">
              <span>${escapeHtml(item.label)}</span>
              <strong>${escapeHtml(item.ready ? "確認済み" : "未確認")}</strong>
              <small>${escapeHtml(item.note)}</small>
            </article>
          `,
        )
        .join("")}
    </div>
    <div class="pwa-device-action-list ${actionItems.length ? "has-actions" : "is-clear"}">
      <span>${actionItems.length ? "実機QAの未解消メモ" : "実機QAの未解消メモなし"}${resolvedActionCount ? ` / 解消済み${resolvedActionCount}件` : ""}</span>
      ${
        actionItems.length
          ? actionItems
              .map(
                (item) => `
                  <article class="${escapeHtml(item.status)}">
                    <strong>${escapeHtml(item.label)}</strong>
                    <small>${escapeHtml(item.device)} / ${escapeHtml(item.browser)} / ${escapeHtml(formatFullDate(item.createdAt))}</small>
                    <p>${escapeHtml(item.note)}</p>
                  </article>
                `,
              )
              .join("")
          : "<p>要確認またはNGの実機テスト結果はありません。</p>"
      }
    </div>
  `;
}

function getPwaModeQaSummary(results) {
  const scopeStatuses = getPwaScopeStatuses(results);
  const latestModeResult = results.find((result) => result.scope === "ui_modes");
  const latestImageResult = results.find((result) => result.scope === "custom_images");
  return [
    {
      label: "4モード表示",
      ready: scopeStatuses.ui_modes === "passed",
      note: latestModeResult?.note || "ベーシック、かんたん、管理重視、投稿重視モードでホーム、投稿、AI、アカウントを確認",
      checks: PWA_SCOPE_QA_HINTS.ui_modes,
      noteTemplate: PWA_SCOPE_NOTE_TEMPLATES.ui_modes,
    },
    {
      label: "画像カスタム",
      ready: scopeStatuses.custom_images === "passed",
      note: latestImageResult?.note || "背景画像とボタン背面画像を設定し、各モードで文字の読みやすさを確認",
      checks: PWA_SCOPE_QA_HINTS.custom_images,
      noteTemplate: PWA_SCOPE_NOTE_TEMPLATES.custom_images,
    },
  ];
}

function getPwaDeviceQaActionItems(results, options = {}) {
  const includeResolved = Boolean(options.includeResolved);
  const sortedResults = [...results].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return sortedResults
    .filter((result) => ["watch", "failed"].includes(result.status))
    .map((result) => {
      const resolvedBy = sortedResults.find(
        (candidate) =>
          candidate.scope === result.scope &&
          candidate.status === "passed" &&
          new Date(candidate.createdAt) > new Date(result.createdAt),
      );
      return {
        result,
        resolvedBy,
      };
    })
    .filter((item) => includeResolved || !item.resolvedBy)
    .slice(0, 5)
    .map(({ result, resolvedBy }) => ({
      id: result.id,
      status: result.status,
      label: `${getPwaTestScopeLabel(result.scope)} / ${getPwaTestStatusLabel(result.status)}`,
      device: result.device || "端末未記録",
      browser: result.browser || "ブラウザ未記録",
      note: result.note || "原因、再現手順、次の修正内容を追記してください。",
      createdAt: result.createdAt,
      resolved: Boolean(resolvedBy),
      resolvedAt: resolvedBy?.createdAt || null,
    }));
}

function getPwaScopeStatuses(results) {
  return PWA_REQUIRED_SCOPES.reduce((statuses, scope) => {
    const latest = [...results]
      .filter((result) => result.scope === scope)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    statuses[scope] = latest ? latest.status : "missing";
    return statuses;
  }, {});
}

function getPwaReleaseCoverage(results = state.pwaTestResults || []) {
  const scopes = PWA_REQUIRED_SCOPES;
  const scopeStatuses = getPwaScopeStatuses(results);
  const failedCount = scopes.filter((scope) => scopeStatuses[scope] === "failed").length;
  return {
    scopes,
    passedCount: scopes.filter((scope) => scopeStatuses[scope] === "passed").length,
    failedCount,
    ready: scopes.every((scope) => scopeStatuses[scope] === "passed") && failedCount === 0,
  };
}

async function handlePwaReleaseDecisionSubmit(event) {
  event.preventDefault();
  state.pwaReleaseDecision = normalizePwaReleaseDecision({
    status: document.querySelector("#pwa-release-decision-status-input").value,
    reviewStatus: document.querySelector("#pwa-release-review-status-input").value,
    resultStatus: document.querySelector("#pwa-release-result-status-input").value,
    reviewer: document.querySelector("#pwa-release-decision-reviewer-input").value,
    productionUrl: document.querySelector("#pwa-release-decision-url-input").value,
    note: document.querySelector("#pwa-release-decision-note-input").value,
    decidedAt: new Date().toISOString(),
  });
  saveState();
  renderPwaReleaseDecision();
  if (authSession?.user) {
    await syncPwaReleaseDecisionToSupabase({ silent: true });
  }
  showToast("PWA最終リリース判定を保存しました");
}

function renderPwaReleaseDecision() {
  if (!pwaReleaseDecisionForm || !pwaReleaseDecisionChip || !pwaReleaseDecisionSummary) {
    return;
  }

  const decision = normalizePwaReleaseDecision(state.pwaReleaseDecision || {});
  const coverage = getPwaReleaseCoverage();
  const evidenceItems = getPwaReleaseEvidenceItems(decision, coverage);
  const handoff = getPwaReleaseHandoffState(evidenceItems);
  const qaState = getPwaReleaseQaState(evidenceItems);
  const appearanceQa = getPwaModeQaSummary(state.pwaTestResults || []);
  const deviceQaActions = getPwaDeviceQaActionItems(state.pwaTestResults || []);
  const resolvedDeviceQaActionCount = getPwaDeviceQaActionItems(state.pwaTestResults || [], { includeResolved: true }).filter(
    (item) => item.resolved,
  ).length;
  const gatewayDecision = getAiGatewayProductionDecisionEvidence();
  const gatewayExportEvidence = getPwaGatewayDecisionExportEvidence(gatewayDecision);
  const handoffChecklist = getPwaReleaseHandoffChecklist({
    decision,
    coverage,
    deviceQaActions,
    gatewayDecision,
  });
  const handoffMemo = getPwaReleaseHandoffMemo({
    decision,
    coverage,
    handoffChecklist,
    gatewayDecision,
    deviceQaActions,
    appearanceQa,
  });
  const testerScript = getPwaReleaseTesterScript({ decision, coverage });
  const cloudReview = getPwaReleaseCloudReview({
    decision,
    results: state.pwaTestResults || [],
  });
  document.querySelector("#pwa-release-decision-status-input").value = decision.status;
  document.querySelector("#pwa-release-review-status-input").value = decision.reviewStatus;
  document.querySelector("#pwa-release-result-status-input").value = decision.resultStatus;
  document.querySelector("#pwa-release-decision-reviewer-input").value = decision.reviewer || state.account.name || "";
  document.querySelector("#pwa-release-decision-url-input").value = decision.productionUrl;
  document.querySelector("#pwa-release-decision-note-input").value = decision.note;
  pwaReleaseDecisionChip.textContent = getPwaReleaseDecisionLabel(decision.status);
  pwaReleaseDecisionChip.className = `release-decision-chip ${escapeHtml(decision.status)}`;

  const coverageText = `${coverage.passedCount}/${coverage.scopes.length} OK`;
  const readinessNote = coverage.ready
    ? "必須項目はOKです。公開OKにする場合は確認者と判断メモを残します。"
    : "公開OKにする前に、未OKまたはNGのPWA確認項目を解消します。";

  pwaReleaseDecisionSummary.innerHTML = `
    <article class="pwa-release-handoff ${handoff.ready ? "ready" : "pending"}">
      <span>${escapeHtml(handoff.ready ? "公開前レビュー完了" : "次アクション")}</span>
      <strong>${escapeHtml(handoff.title)}</strong>
      <small>${escapeHtml(handoff.note)}</small>
    </article>
    <article class="pwa-release-qa ${qaState.ready ? "ready" : "pending"}">
      <span>最終QA</span>
      <strong>${escapeHtml(qaState.title)}</strong>
      <small>${escapeHtml(qaState.note)}</small>
    </article>
    <article class="${escapeHtml(decision.status)}">
      <span>判定状況</span>
      <strong>${escapeHtml(getPwaReleaseDecisionLabel(decision.status))}</strong>
      <small>${escapeHtml(decision.decidedAt ? `${formatFullDate(decision.decidedAt)} / ${decision.reviewer || "確認者未記録"}` : "まだ保存されていません")}</small>
    </article>
    <article class="${decision.reviewStatus === "done" ? "ready" : "pending"}">
      <span>実機レビュー</span>
      <strong>${escapeHtml(getPwaReleaseReviewStatusLabel(decision.reviewStatus))}</strong>
      <small>本番URLを実機で確認した進捗</small>
    </article>
    <article class="${decision.resultStatus === "confirmed" ? "ready" : "pending"}">
      <span>結果確認</span>
      <strong>${escapeHtml(getPwaReleaseResultStatusLabel(decision.resultStatus))}</strong>
      <small>実機結果、最終判定、JSON証跡の確認状態</small>
    </article>
    <article class="${coverage.ready ? "ready" : "pending"}">
      <span>必須項目</span>
      <strong>${escapeHtml(coverageText)}</strong>
      <small>${escapeHtml(readinessNote)}</small>
    </article>
    <article>
      <span>本番URL</span>
      <strong>${escapeHtml(decision.productionUrl || "未記録")}</strong>
      <small>実機レビュー対象の公開URL</small>
    </article>
    <article>
      <span>メモ</span>
      <strong>${escapeHtml(decision.note || "未記録")}</strong>
      <small>本番URL、残タスク、公開判断の理由を残します</small>
    </article>
    <div class="pwa-appearance-evidence">
      <span>表示モードQA</span>
      <strong>${escapeHtml(appearanceQa.every((item) => item.ready) ? "4モードと画像カスタム確認済み" : "表示モード確認が未完了")}</strong>
      <div>
        ${appearanceQa
          .map(
            (item) => `
              <article class="${item.ready ? "ready" : "pending"}">
                <span>${escapeHtml(item.label)}</span>
                <strong>${escapeHtml(item.ready ? "OK" : "未完了")}</strong>
                <small>${escapeHtml(item.note)}</small>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
    <div class="pwa-device-action-evidence ${deviceQaActions.length ? "pending" : "ready"}">
      <span>実機QA対応</span>
      <strong>${escapeHtml(deviceQaActions.length ? `${deviceQaActions.length}件の未解消` : "未解消なし")}</strong>
      <small>${escapeHtml(resolvedDeviceQaActionCount ? `後続OKで解消済み: ${resolvedDeviceQaActionCount}件` : "後続OKで解消した項目はまだありません")}</small>
      ${
        deviceQaActions.length
          ? deviceQaActions
              .map(
                (item) => `
                  <article class="${escapeHtml(item.status)}">
                    <span>${escapeHtml(item.label)}</span>
                    <small>${escapeHtml(item.device)} / ${escapeHtml(item.browser)}</small>
                    <p>${escapeHtml(item.note)}</p>
                  </article>
                `,
              )
              .join("")
          : "<p>実機QAで要確認またはNGになった項目はありません。</p>"
      }
    </div>
    <div class="pwa-gateway-evidence ${gatewayDecision.ready ? "ready" : "pending"}">
      <span>Gateway本番判定</span>
      <strong>${escapeHtml(gatewayExportEvidence.title)}</strong>
      <ul>
        ${gatewayExportEvidence.checklist
          .map((item) => `<li class="${item.ready ? "ready" : "pending"}">${escapeHtml(item.label)}: ${escapeHtml(item.note)}</li>`)
          .join("")}
      </ul>
      <div class="pwa-gateway-actions">
        <span>${gatewayDecision.ready ? "次の確認" : "未完了アクション"}</span>
        ${gatewayExportEvidence.incompleteActions.map((action) => `<p>${escapeHtml(action)}</p>`).join("")}
      </div>
    </div>
    <div class="pwa-release-handoff-checklist ${handoffChecklist.ready ? "ready" : "pending"}">
      <span>公開引き渡し</span>
      <strong>${escapeHtml(handoffChecklist.title)}</strong>
      <small>${escapeHtml(handoffChecklist.note)}</small>
      <ol>
        ${handoffChecklist.items
          .map(
            (item) => `
              <li class="${item.ready ? "ready" : "pending"}">
                <strong>${escapeHtml(item.label)}</strong>
                <span>${escapeHtml(item.note)}</span>
              </li>
            `,
          )
          .join("")}
      </ol>
    </div>
    <div class="pwa-release-handoff-memo ${handoffMemo.ready ? "ready" : "pending"}">
      <span>引き渡しメモ</span>
      <strong>${escapeHtml(handoffMemo.title)}</strong>
      <ul>
        ${handoffMemo.lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
      </ul>
      <small>${escapeHtml(handoffMemo.note)}</small>
    </div>
    <div class="pwa-release-tester-script">
      <span>テスター手順</span>
      <strong>${escapeHtml(testerScript.title)}</strong>
      <ol>
        ${testerScript.steps
          .map(
            (step) => `
              <li>
                <strong>${escapeHtml(step.label)}</strong>
                <span>${escapeHtml(step.action)}</span>
                <small>${escapeHtml(step.record)}</small>
              </li>
            `,
          )
          .join("")}
      </ol>
    </div>
    <div class="pwa-release-cloud-review ${cloudReview.ready ? "ready" : "pending"}">
      <span>クラウド確認</span>
      <strong>${escapeHtml(cloudReview.title)}</strong>
      <small>${escapeHtml(cloudReview.note)}</small>
      <div>
        ${cloudReview.items
          .map(
            (item) => `
              <article class="${item.ready ? "ready" : "pending"}">
                <span>${escapeHtml(item.label)}</span>
                <strong>${escapeHtml(item.value)}</strong>
                <small>${escapeHtml(item.note)}</small>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
    <div class="pwa-release-evidence-grid">
      ${evidenceItems
        .map(
          (item) => `
            <article class="${item.ready ? "ready" : "pending"}">
              <span>${escapeHtml(item.label)}</span>
              <strong>${escapeHtml(item.ready ? "OK" : "未完了")}</strong>
              <small>${escapeHtml(item.note)}</small>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function getPwaReleaseEvidenceItems(decision, coverage) {
  const results = Array.isArray(state.pwaTestResults) ? state.pwaTestResults : [];
  const gatewayDecision = getAiGatewayProductionDecisionEvidence();
  return [
    {
      label: "実機レビュー",
      ready: decision.reviewStatus === "done",
      note: getPwaReleaseReviewStatusLabel(decision.reviewStatus),
    },
    {
      label: "結果確認",
      ready: decision.resultStatus === "confirmed",
      note: getPwaReleaseResultStatusLabel(decision.resultStatus),
    },
    {
      label: "実機記録",
      ready: results.length > 0,
      note: `${results.length}件のPWA実機テスト結果`,
    },
    {
      label: "必須項目",
      ready: coverage.ready,
      note: `${coverage.passedCount}/${coverage.scopes.length}項目OK`,
    },
    {
      label: "NGなし",
      ready: coverage.failedCount === 0,
      note: coverage.failedCount ? `${coverage.failedCount}件の未解消NGがあります` : "未解消NGはありません",
    },
    {
      label: "本番URL",
      ready: Boolean(decision.productionUrl),
      note: decision.productionUrl || "本番URL未記録",
    },
    {
      label: "公開判断",
      ready: decision.status === "ready",
      note: getPwaReleaseDecisionLabel(decision.status),
    },
    {
      label: "Gateway判定",
      ready: gatewayDecision.ready,
      note: gatewayDecision.summary,
    },
    {
      label: "確認者",
      ready: Boolean(decision.reviewer),
      note: decision.reviewer || "確認者未記録",
    },
    {
      label: "クラウド保存",
      ready: Boolean(decision.cloudId),
      note: decision.cloudId ? "Supabase同期済み" : "ローカル保存のみ",
    },
    {
      label: "レビューJSON",
      ready: Boolean(decision.reviewExportedAt),
      note: decision.reviewExportedAt ? `${formatFullDate(decision.reviewExportedAt)} に書き出し` : "レビューJSON未書き出し",
    },
  ];
}

function getAiGatewayProductionDecisionEvidence() {
  const entries = Array.isArray(state.aiEvaluationLog) ? state.aiEvaluationLog : [];
  const notes = Array.isArray(state.aiPromptNotes) ? state.aiPromptNotes : [];
  const retestAdjustmentConditions = getAiPromptNoteConditions(getAiRetestAdjustmentPromptNotes(notes));
  const reReviewSummary = getAiDraftReReviewSummary(entries, retestAdjustmentConditions);
  const decision = getAiDraftReReviewDecision(reReviewSummary);

  return {
    status: decision.status,
    ready: decision.ready,
    summary: decision.ready ? "Gateway公開OK" : decision.summary,
    nextAction: decision.nextAction,
    targetConditions: reReviewSummary.targetConditions,
    targetConditionLabels: reReviewSummary.targetConditionLabels,
    reReviewed: reReviewSummary.reReviewed,
    good: reReviewSummary.good,
    needsFix: reReviewSummary.needsFix,
    watch: reReviewSummary.watch,
  };
}

function getPwaGatewayDecisionExportEvidence(gatewayDecision) {
  const incompleteActions = getPwaGatewayDecisionIncompleteActions(gatewayDecision);
  return {
    ...gatewayDecision,
    title: gatewayDecision.ready ? "AI Gateway本番判定OK" : "AI Gateway本番判定は確認中",
    evidenceSummary: [
      `判定: ${gatewayDecision.status}`,
      `再レビュー済み: ${gatewayDecision.reReviewed}件`,
      `良い例: ${gatewayDecision.good}件`,
      `要修正: ${gatewayDecision.needsFix}件`,
      gatewayDecision.targetConditionLabels.length
        ? `対象条件: ${gatewayDecision.targetConditionLabels.join(" / ")}`
        : "対象条件: 未記録",
    ],
    checklist: [
      {
        label: "再レビュー済み",
        ready: gatewayDecision.reReviewed > 0,
        note: `${gatewayDecision.reReviewed}件`,
      },
      {
        label: "要修正なし",
        ready: gatewayDecision.needsFix === 0,
        note: `${gatewayDecision.needsFix}件`,
      },
      {
        label: "公開OK判定",
        ready: gatewayDecision.ready,
        note: gatewayDecision.status,
      },
    ],
    incompleteActions,
  };
}

function getPwaGatewayDecisionIncompleteActions(gatewayDecision) {
  if (gatewayDecision.ready) {
    return ["Gateway本番判定は公開OKです。PWA最終QAと本番URL確認へ進めます。"];
  }

  const actions = [];
  const conditionText = gatewayDecision.targetConditionLabels.length
    ? gatewayDecision.targetConditionLabels.join(" / ")
    : "対象条件未記録";

  if (gatewayDecision.reReviewed === 0) {
    actions.push(`再強化後のGateway写真を再レビューしてください。対象条件: ${conditionText}`);
  }

  if (gatewayDecision.needsFix > 0) {
    actions.push(`要修正が${gatewayDecision.needsFix}件あります。改善メモへ戻して、草案を再調整します。`);
  }

  if (!gatewayDecision.ready) {
    actions.push(gatewayDecision.nextAction || "Gateway本番判定を公開OKにしてから最終公開へ進みます。");
  }

  return [...new Set(actions)];
}

function getPwaReleaseQaState(evidenceItems) {
  const pendingItems = evidenceItems.filter((item) => !item.ready);
  if (!pendingItems.length) {
    return {
      ready: true,
      title: "全チェック完了",
      note: "本番URL、実機結果、最終判定、クラウド保存、レビューJSONが揃っています。",
    };
  }

  return {
    ready: false,
    title: `${pendingItems.length}件の未完了`,
    note: pendingItems.map((item) => item.label).join(" / "),
  };
}

function getPwaReleaseHandoffState(evidenceItems) {
  const missingItems = evidenceItems.filter((item) => !item.ready);
  if (!missingItems.length) {
    return {
      ready: true,
      title: "公開前レビューは完了です",
      note: "本番URLレビューJSONを書き出し、リリースノートや公開前チェックに添付できます。",
    };
  }

  const actionLabels = {
    実機レビュー: "実機レビューを完了に更新",
    結果確認: "実機結果、最終判定、レビューJSONを確認済みに更新",
    実機記録: "本番URLを実機で確認し、PWA実機テスト結果を保存",
    必須項目: "ログイン、ホーム追加、通知受信、オフライン復帰、4モード表示、画像カスタムをOKにする",
    NGなし: "NG記録の原因を解消し、再テスト結果を保存",
    本番URL: "本番URLを入力して判定メモを保存",
    公開判断: "判定を公開OKに更新",
    確認者: "確認者名を入力して判定メモを保存",
    クラウド保存: "Supabaseログイン中に判定メモを保存して同期",
    レビューJSON: "JSONボタンで本番URLレビュー結果を書き出す",
  };
  const nextActions = missingItems.map((item) => actionLabels[item.label] || `${item.label}を確認`);

  return {
    ready: false,
    title: nextActions[0],
    note: nextActions.length > 1 ? `残り ${nextActions.length}件: ${nextActions.slice(1).join(" / ")}` : "この項目が完了すると公開前レビューに近づきます。",
  };
}

function getPwaReleaseHandoffChecklist({ decision, coverage, deviceQaActions, gatewayDecision }) {
  const items = [
    {
      label: "本番URLを固定",
      ready: Boolean(decision.productionUrl),
      note: decision.productionUrl || "最終確認する公開URLを入力",
    },
    {
      label: "実機QAを完了",
      ready: coverage.ready && deviceQaActions.length === 0,
      note: coverage.ready
        ? deviceQaActions.length
          ? `${deviceQaActions.length}件の要確認/NGを後続OKで解消`
          : "必須項目はすべてOK"
        : `${coverage.passedCount}/${coverage.scopes.length}項目OK`,
    },
    {
      label: "Gateway判定を確認",
      ready: gatewayDecision.ready,
      note: gatewayDecision.ready ? "AI Gateway本番判定OK" : gatewayDecision.nextAction || gatewayDecision.summary,
    },
    {
      label: "公開判断を保存",
      ready: decision.status === "ready" && Boolean(decision.reviewer) && Boolean(decision.note),
      note:
        decision.status === "ready" && decision.reviewer
          ? decision.note || "判断理由をメモに残す"
          : "公開OK、確認者、判断理由を保存",
    },
    {
      label: "証跡JSONを書き出し",
      ready: Boolean(decision.reviewExportedAt),
      note: decision.reviewExportedAt ? `${formatFullDate(decision.reviewExportedAt)} に書き出し済み` : "JSONボタンでレビュー結果を書き出す",
    },
    {
      label: "クラウド同期を確認",
      ready: Boolean(decision.cloudId),
      note: decision.cloudId ? "Supabase同期済み" : "ログイン中に判定メモを保存して同期",
    },
  ];
  const pending = items.filter((item) => !item.ready);

  return {
    ready: pending.length === 0,
    title: pending.length ? `残り${pending.length}件で引き渡し完了` : "公開引き渡し準備OK",
    note: pending.length ? pending.map((item) => item.label).join(" / ") : "本番URL、QA、判定、証跡、同期が揃っています。",
    items,
  };
}

function getPwaReleaseHandoffMemo({ decision, coverage, handoffChecklist, gatewayDecision, deviceQaActions, appearanceQa }) {
  const pendingLabels = handoffChecklist.items.filter((item) => !item.ready).map((item) => item.label);
  const appearanceReady = appearanceQa.every((item) => item.ready);
  const gatewayNote = gatewayDecision.ready ? "AI Gateway本番判定OK" : gatewayDecision.summary;
  const qaNote = `${coverage.passedCount}/${coverage.scopes.length}項目OK${deviceQaActions.length ? ` / 未解消${deviceQaActions.length}件` : ""}`;
  const ready = handoffChecklist.ready;

  return {
    ready,
    title: ready ? "リリースノートに転記できます" : "残タスク付きで共有できます",
    note: ready
      ? "公開作業者へこの内容を渡せます。"
      : "未完了項目を解消したら、もう一度JSONを書き出します。",
    lines: [
      `判定: ${getPwaReleaseDecisionLabel(decision.status)} / ${getPwaReleaseReviewStatusLabel(decision.reviewStatus)} / ${getPwaReleaseResultStatusLabel(decision.resultStatus)}`,
      `本番URL: ${decision.productionUrl || "未記録"}`,
      `実機QA: ${qaNote}`,
      `表示QA: ${appearanceReady ? "4モードと画像カスタム確認済み" : "4モードまたは画像カスタムが未完了"}`,
      `Gateway: ${gatewayNote}`,
      `確認者: ${decision.reviewer || "未記録"}`,
      `残タスク: ${pendingLabels.length ? pendingLabels.join(" / ") : "なし"}`,
    ],
  };
}

function getPwaReleaseTesterScript({ decision, coverage }) {
  const productionUrl = decision.productionUrl || "本番URL未記録";
  return {
    title: productionUrl === "本番URL未記録" ? "本番URLを入れてから実機確認" : `${productionUrl} を実機確認`,
    steps: PWA_REQUIRED_SCOPES.map((scope, index) => ({
      scope,
      label: `${index + 1}. ${getPwaTestScopeLabel(scope)}`,
      action: PWA_SCOPE_QA_HINTS[scope].join(" / "),
      record: `${getPwaTestScopeLabel(scope)}の結果を${coverage.scopes.includes(scope) ? "OK・要確認・NGで保存" : "実機テスト結果に保存"}`,
    })),
  };
}

function getPwaReleaseCloudReview({ decision, results }) {
  const syncedTestCount = results.filter((result) => result.cloudId).length;
  const totalTestCount = results.length;
  const allTestsSynced = totalTestCount > 0 && syncedTestCount === totalTestCount;
  const decisionSynced = Boolean(decision.cloudId);
  const lastSync = state.account.lastSyncedAt ? formatFullDate(state.account.lastSyncedAt) : "未記録";
  const items = [
    {
      label: "実機テスト",
      ready: allTestsSynced,
      value: `${syncedTestCount}/${totalTestCount}`,
      note: totalTestCount ? "Supabase同期済み件数" : "実機テスト結果未記録",
    },
    {
      label: "最終判定",
      ready: decisionSynced,
      value: decisionSynced ? "同期済み" : "未同期",
      note: decisionSynced ? "pwa_release_decisions に保存済み" : "ログイン中に判定メモを保存",
    },
    {
      label: "最終同期",
      ready: state.account.syncStatus === "synced",
      value: getSyncStatusLabel(state.account),
      note: lastSync,
    },
    {
      label: "レビューJSON",
      ready: Boolean(decision.reviewExportedAt),
      value: decision.reviewExportedAt ? "書き出し済み" : "未書き出し",
      note: decision.reviewExportedAt ? formatFullDate(decision.reviewExportedAt) : "JSONボタンで証跡を書き出す",
    },
  ];
  const pending = items.filter((item) => !item.ready);

  return {
    ready: pending.length === 0,
    title: pending.length ? `クラウド確認 ${items.length - pending.length}/${items.length}` : "クラウド証跡OK",
    note: pending.length ? pending.map((item) => item.label).join(" / ") : "同期済みデータとJSON証跡を確認できます。",
    items,
  };
}

function getPwaReleaseDecisionLabel(status) {
  const labels = {
    draft: "確認中",
    ready: "公開OK",
    hold: "保留",
  };
  return labels[status] || labels.draft;
}

function getPwaReleaseReviewStatusLabel(status) {
  const labels = {
    not_started: "未開始",
    running: "実行中",
    done: "完了",
  };
  return labels[status] || labels.not_started;
}

function getPwaReleaseResultStatusLabel(status) {
  const labels = {
    unchecked: "未確認",
    confirmed: "確認済み",
    issues: "要対応あり",
  };
  return labels[status] || labels.unchecked;
}

function getPwaTestScopeLabel(scope) {
  const labels = {
    install: "ホーム追加",
    notification: "通知受信",
    offline: "オフライン復帰",
    ui_modes: "4モード表示",
    custom_images: "画像カスタム",
    login: "ログイン",
  };
  return labels[scope] || labels.install;
}

function getPwaTestStatusLabel(status) {
  const labels = {
    passed: "OK",
    watch: "要確認",
    failed: "NG",
    missing: "未記録",
  };
  return labels[status] || labels.watch;
}

function applyUiMode() {
  const uiMode = getAllowedValue(state.account?.uiMode, UI_MODES, "standard");
  document.body.dataset.uiMode = uiMode;
  if (accountUiModeInput) {
    accountUiModeInput.value = uiMode;
  }
  if (homeUiModeInput) {
    homeUiModeInput.value = uiMode;
  }
  applyHomeModeCopy(uiMode);
  applyCustomAppearance();
}

function applyHomeModeCopy(uiMode) {
  const copy = homeModeCopy[uiMode] || homeModeCopy.standard;
  if (dashboardTitle) {
    dashboardTitle.textContent = copy.title;
  }
  if (homeUiModeNote) {
    homeUiModeNote.textContent = copy.note;
  }
  if (heroTitle) {
    heroTitle.textContent = copy.heroTitle;
  }
  if (heroLead) {
    heroLead.textContent = copy.heroLead;
  }
  quickDockButtons.forEach((button, index) => {
    const item = copy.dock[index];
    if (!item) {
      return;
    }
    const title = button.querySelector("strong");
    const note = button.querySelector("small");
    if (title) {
      title.textContent = item[0];
    }
    if (note) {
      note.textContent = item[1];
    }
  });
}

function applyCustomAppearance() {
  const backgroundImage = state.account?.backgroundImageDataUrl || "";
  const buttonImage = state.account?.buttonImageDataUrl || "";

  document.body.dataset.customBackground = backgroundImage ? "true" : "false";
  document.body.dataset.customButtons = buttonImage ? "true" : "false";
  document.body.style.setProperty("--custom-background-image", backgroundImage ? `url("${backgroundImage}")` : "none");
  document.body.style.setProperty("--custom-button-image", buttonImage ? `url("${buttonImage}")` : "none");
}

function updateUiMode(value) {
  state.account.uiMode = getAllowedValue(value, UI_MODES, "standard");
  applyUiMode();
  saveState();
  showToast(`${getUiModeLabel(state.account.uiMode)}に切り替えました`);
}

function getUiModeLabel(value) {
  const labels = {
    standard: "ベーシックモード",
    simple: "かんたんモード",
    adult: "管理重視モード",
    live: "投稿重視モード",
  };
  return labels[value] || labels.standard;
}

function renderAuthPanel() {
  const setupStatus = getSupabaseSetupStatus();
  const configured = Boolean(supabaseClient);
  const signedIn = Boolean(authSession?.user);

  authEmailInput.value = authEmailInput.value || state.account.email;
  authStatusChip.textContent = signedIn ? "ログイン中" : configured ? "接続準備済み" : "未設定";
  authStatusChip.className = `auth-status-chip ${signedIn ? "is-signed-in" : configured ? "is-ready" : ""}`;
  authSignOutButton.disabled = !signedIn;

  if (!configured) {
    authNote.textContent = setupStatus.message;
    return;
  }

  authNote.textContent = signedIn
    ? `${authSession.user.email || state.account.email} でログインしています。`
    : "Supabase Authへメールとパスワードで接続します。";
}

function renderNotificationDeliveryLog() {
  if (!notificationDeliveryLog) {
    return;
  }

  if (!supabaseClient) {
    notificationDeliveryLog.innerHTML = `<p class="empty-state">Supabase設定後に通知配信ログを表示します。</p>`;
    notificationDeliveryFilter.disabled = true;
    notificationDeliveryRefreshButton.disabled = true;
    return;
  }

  if (!authSession?.user) {
    notificationDeliveryLog.innerHTML = `<p class="empty-state">ログインするとPush/メール配信の予約と結果を確認できます。</p>`;
    notificationDeliveryFilter.disabled = true;
    notificationDeliveryRefreshButton.disabled = true;
    return;
  }

  notificationDeliveryFilter.disabled = false;
  notificationDeliveryFilter.value = activeNotificationDeliveryFilter;
  notificationDeliveryRefreshButton.disabled = false;
  const visibleDeliveries =
    activeNotificationDeliveryFilter === "all"
      ? notificationDeliveryHistory
      : notificationDeliveryHistory.filter((delivery) => delivery.status === activeNotificationDeliveryFilter);

  if (!visibleDeliveries.length) {
    const message = notificationDeliveryHistory.length
      ? "条件に合う通知配信ログはありません。"
      : "通知配信ログはまだありません。";
    notificationDeliveryLog.innerHTML = `<p class="empty-state">${message}</p>`;
    return;
  }

  notificationDeliveryLog.innerHTML = visibleDeliveries
    .map((delivery) => {
      const status = getDeliveryStatusLabel(delivery.status);
      const channel = delivery.channel === "email" ? "メール" : "Push";
      const lastError = delivery.last_error ? `<small>${escapeHtml(delivery.last_error)}</small>` : "";
      const retryButton =
        delivery.status === "failed"
          ? `<button class="text-button" type="button" data-retry-delivery="${escapeHtml(delivery.id)}">再送予約</button>`
          : "";
      const detailPanel =
        activeNotificationDeliveryDetailId === delivery.id
          ? getNotificationDeliveryDetailMarkup(delivery, channel, status)
          : "";
      return `
        <article class="notification-delivery-item">
          <div>
            <span>${escapeHtml(channel)} / ${escapeHtml(delivery.label || delivery.task_key)}</span>
            <strong>${escapeHtml(formatReminderDate(delivery.scheduled_for))}</strong>
            ${lastError}
          </div>
          <div class="delivery-meta">
            <span class="delivery-status ${escapeHtml(delivery.status || "pending")}">${escapeHtml(status)}</span>
            <small>試行 ${Number(delivery.attempt_count || 0)}回</small>
            <button class="text-button" type="button" data-delivery-detail="${escapeHtml(delivery.id)}">
              ${activeNotificationDeliveryDetailId === delivery.id ? "閉じる" : "詳細"}
            </button>
            ${retryButton}
          </div>
          ${detailPanel}
        </article>
      `;
    })
    .join("");
}

function getNotificationDeliveryDetailMarkup(delivery, channel, status) {
  const updatedAt = delivery.updated_at ? formatFullDate(delivery.updated_at) : "未更新";
  const errorText = delivery.last_error || "記録なし";
  return `
    <dl class="notification-delivery-detail">
      <div>
        <dt>状態</dt>
        <dd>${escapeHtml(status)}</dd>
      </div>
      <div>
        <dt>配信先</dt>
        <dd>${escapeHtml(channel)}</dd>
      </div>
      <div>
        <dt>タスク</dt>
        <dd>${escapeHtml(delivery.task_key || "-")}</dd>
      </div>
      <div>
        <dt>更新</dt>
        <dd>${escapeHtml(updatedAt)}</dd>
      </div>
      <div>
        <dt>エラー</dt>
        <dd>${escapeHtml(errorText)}</dd>
      </div>
      <div>
        <dt>運用メモ</dt>
        <dd>${escapeHtml(getDeliveryOperationNote(delivery))}</dd>
      </div>
    </dl>
  `;
}

function renderNotificationVerificationChecklist() {
  if (!notificationVerificationList || !notificationProductionCheckForm || !notificationProductionSummary) {
    return;
  }

  const hasNotificationApi = canUseNotifications();
  const hasPushKey = Boolean(getPushApplicationServerKey());
  const hasPushSupport = canUsePushNotifications();
  const environmentItems = getNotificationProductionEnvironmentChecklist();
  const productionCheck = normalizeNotificationProductionCheck(state.notificationProductionCheck || {});
  const deliveryStats = getNotificationDeliveryStats();
  const productionReady = productionCheck.envStatus === "confirmed" && productionCheck.dryRunStatus === "confirmed" && productionCheck.sendStatus === "confirmed";
  document.querySelector("#notification-env-status-input").value = productionCheck.envStatus;
  document.querySelector("#notification-dry-run-status-input").value = productionCheck.dryRunStatus;
  document.querySelector("#notification-send-status-input").value = productionCheck.sendStatus;
  document.querySelector("#notification-check-reviewer-input").value = productionCheck.reviewer || state.account.name || "";
  document.querySelector("#notification-check-note-input").value = productionCheck.note;
  notificationApplyDeliveryResultButton.disabled = deliveryStats.total === 0;
  const items = [
    {
      label: "Supabase接続",
      note: supabaseClient ? "接続設定あり" : "supabase-config.jsを確認",
      status: supabaseClient ? "ready" : "missing",
    },
    {
      label: "ログイン状態",
      note: authSession?.user ? "ユーザー確認済み" : "Authログインが必要",
      status: authSession?.user ? "ready" : "missing",
    },
    {
      label: "PWA Push公開鍵",
      note: hasPushKey ? "ブラウザ設定済み" : "AQUANOTE_PUSH_CONFIG.publicKeyが必要",
      status: hasPushKey ? "ready" : "missing",
    },
    {
      label: "Service Worker / Push API",
      note: hasPushSupport ? "このブラウザで利用可能" : "対応ブラウザとHTTPSで確認",
      status: hasPushSupport ? "ready" : "missing",
    },
    {
      label: "通知権限",
      note: hasNotificationApi ? getNotificationPermissionLabel() : "通知API非対応",
      status: hasNotificationApi && Notification.permission === "granted" ? "ready" : "missing",
    },
    {
      label: "配信ログ",
      note: notificationDeliveryHistory.length ? `${notificationDeliveryHistory.length}件読み込み済み` : "ログイン後に予約を同期",
      status: notificationDeliveryHistory.length ? "ready" : "missing",
    },
    {
      label: "Netlify環境変数",
      note: getNotificationProductionStatusLabel(productionCheck.envStatus),
      status: productionCheck.envStatus === "confirmed" ? "ready" : productionCheck.envStatus === "issues" ? "missing" : "manual",
    },
    {
      label: "dry-run解除",
      note: getNotificationProductionStatusLabel(productionCheck.dryRunStatus),
      status: productionCheck.dryRunStatus === "confirmed" ? "ready" : productionCheck.dryRunStatus === "issues" ? "missing" : "manual",
    },
    {
      label: "本番送信結果",
      note: getNotificationProductionStatusLabel(productionCheck.sendStatus),
      status: productionCheck.sendStatus === "confirmed" ? "ready" : productionCheck.sendStatus === "issues" ? "missing" : "manual",
    },
  ];

  notificationVerificationList.innerHTML = items
    .map(
      (item) => `
        <article class="verification-item ${escapeHtml(item.status)}">
          <span>${escapeHtml(getVerificationStatusLabel(item.status))}</span>
          <strong>${escapeHtml(item.label)}</strong>
          <small>${escapeHtml(item.note)}</small>
        </article>
      `,
    )
    .join("");

  notificationVerificationList.parentElement
    ?.querySelector(".notification-production-config")
    ?.remove();
  notificationVerificationList.insertAdjacentHTML(
    "afterend",
    `
      <div class="notification-production-config">
        <span>Netlify production env</span>
        <ul>
          ${environmentItems
            .map(
              (item) => `
                <li>
                  <strong>${escapeHtml(item.name)}</strong>
                  <small>${escapeHtml(item.note)}</small>
                </li>
              `,
            )
            .join("")}
        </ul>
        <p>dry-runのまま配信予約を確認してから、最後にNOTIFICATION_DELIVERY_DRY_RUN=falseへ切り替えます。</p>
      </div>
    `,
  );
  notificationProductionSummary.innerHTML = `
    <article class="${productionReady ? "ready" : "pending"}">
      <span>${escapeHtml(productionReady ? "本番通知OK" : "本番通知確認中")}</span>
      <strong>${escapeHtml(productionReady ? "環境変数、dry-run解除、送信結果を確認済み" : getNotificationProductionNextAction(productionCheck))}</strong>
      <small>${escapeHtml(productionCheck.checkedAt ? `${formatFullDate(productionCheck.checkedAt)} / ${productionCheck.reviewer || "確認者未記録"}` : "まだ確認メモは保存されていません")}</small>
    </article>
    <article>
      <span>配信ログ</span>
      <strong>${escapeHtml(`送信済み ${deliveryStats.sent} / 失敗 ${deliveryStats.failed} / スキップ ${deliveryStats.skipped}`)}</strong>
      <small>${escapeHtml(deliveryStats.total ? `最新${deliveryStats.total}件の通知配信ログ` : "配信ログを更新すると実機送信結果を確認できます")}</small>
    </article>
    <article>
      <span>確認メモ</span>
      <strong>${escapeHtml(productionCheck.note || "未記録")}</strong>
      <small>Netlify設定、VAPID鍵、配信ログの確認結果を残します</small>
    </article>
  `;
}

function getNotificationDeliveryStats() {
  return notificationDeliveryHistory.reduce(
    (stats, delivery) => {
      const status = delivery.status || "pending";
      return {
        ...stats,
        total: stats.total + 1,
        sent: stats.sent + (status === "sent" ? 1 : 0),
        failed: stats.failed + (status === "failed" ? 1 : 0),
        skipped: stats.skipped + (status === "skipped" ? 1 : 0),
        pending: stats.pending + (status === "pending" ? 1 : 0),
      };
    },
    { total: 0, sent: 0, failed: 0, skipped: 0, pending: 0 },
  );
}

function getNotificationDeliveryVerificationState() {
  const stats = getNotificationDeliveryStats();
  if (!stats.total) {
    return {
      status: "unchecked",
      note: "通知配信ログがまだありません。",
    };
  }

  if (stats.failed > 0) {
    return {
      status: "issues",
      note: `配信ログ確認: 送信済み${stats.sent}件、失敗${stats.failed}件、スキップ${stats.skipped}件。失敗ログの詳細確認と再送予約が必要です。`,
    };
  }

  if (stats.sent > 0) {
    return {
      status: "confirmed",
      note: `配信ログ確認: 送信済み${stats.sent}件、失敗${stats.failed}件、スキップ${stats.skipped}件。実機受信結果を確認済みです。`,
    };
  }

  return {
    status: "unchecked",
    note: `配信ログ確認: 送信済み${stats.sent}件、失敗${stats.failed}件、スキップ${stats.skipped}件。送信済みログを待っています。`,
  };
}

function mergeNotificationProductionNote(currentNote, nextNote) {
  const current = String(currentNote || "").trim();
  if (!current) {
    return nextNote;
  }

  if (current.includes(nextNote)) {
    return current;
  }

  return `${current}\n${nextNote}`;
}

function getNotificationProductionEnvironmentChecklist() {
  return [
    { name: "SUPABASE_URL", note: "Supabase REST APIの接続先。VITE_SUPABASE_URLでも代用できます。" },
    { name: "SUPABASE_SERVICE_ROLE_KEY", note: "配信ワーカー専用。ブラウザには出さない秘密キーです。" },
    { name: "NOTIFICATION_DELIVERY_DRY_RUN", note: "本番送信時だけfalse。未設定なら送信しないdry-runです。" },
    { name: "RESEND_API_KEY / NOTIFICATION_EMAIL_FROM", note: "メール通知を送る場合に設定します。" },
    { name: "WEB_PUSH_VAPID_SUBJECT", note: "mailto: またはサイトURL。Push署名の連絡先です。" },
    { name: "WEB_PUSH_VAPID_PUBLIC_KEY", note: "supabase-config.jsのAQUANOTE_PUSH_CONFIG.publicKeyと同じ値です。" },
    { name: "WEB_PUSH_VAPID_PRIVATE_KEY", note: "Netlifyだけに置くPush署名用の秘密キーです。" },
    { name: "WEB_PUSH_TTL_SECONDS", note: "任意。未設定なら24時間です。" },
  ];
}

function getNotificationProductionStatusLabel(status) {
  const labels = {
    unchecked: "未確認",
    confirmed: "確認済み",
    issues: "要対応あり",
  };
  return labels[status] || labels.unchecked;
}

function getNotificationProductionNextAction(check) {
  if (check.envStatus !== "confirmed") {
    return "Netlify環境変数を確認";
  }

  if (check.dryRunStatus !== "confirmed") {
    return "dry-run解除を確認";
  }

  if (check.sendStatus !== "confirmed") {
    return "本番送信結果を確認";
  }

  return "本番通知チェックを確認";
}

async function handleAuthSubmit(action) {
  if (!supabaseClient) {
    supabaseClient = await ensureSupabaseClient();
  }

  if (!supabaseClient) {
    showToast(getSupabaseSetupStatus().message);
    renderAuthPanel();
    return;
  }

  const email = authEmailInput.value.trim();
  const password = authPasswordInput.value;

  if (!email || password.length < 8) {
    showToast("メールと8文字以上のパスワードを入力してください");
    return;
  }

  const method = action === "sign-up" ? "signUp" : "signInWithPassword";
  const { data, error } = await supabaseClient.auth[method]({ email, password });

  if (error) {
    showToast(error.message || "認証に失敗しました");
    return;
  }

  authSession = data.session || authSession;
  state.account = {
    ...state.account,
    signedIn: Boolean(authSession?.user),
    email,
    syncStatus: "local",
  };
  saveState({ keepSyncStatus: true });

  if (authSession?.user) {
    await loadCloudStateFromSupabase({ silent: true });
    await syncProfileToSupabase({ silent: true });
  }

  renderAccount();
  showToast(action === "sign-up" ? "登録メールを確認してください" : "ログインしました");
}

async function signOutSupabase() {
  if (!supabaseClient) {
    supabaseClient = await ensureSupabaseClient();
  }

  if (!supabaseClient) {
    showToast(getSupabaseSetupStatus().message);
    return;
  }

  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    showToast(error.message || "ログアウトに失敗しました");
    return;
  }

  authSession = null;
  notificationDeliveryHistory = [];
  state.account.signedIn = false;
  state.account.syncStatus = "local";
  clearCurrentUserLikes();
  saveState({ keepSyncStatus: true });
  renderAccount();
  showToast("ログアウトしました");
}

async function syncCloudState(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    if (!options.silent) {
      showToast("Supabaseにログインしてください");
    }
    return false;
  }

  if (cloudSyncInProgress) {
    if (!options.silent) {
      showToast("クラウド同期中です");
    }
    return true;
  }

  cloudSyncInProgress = true;

  try {
    const profileSynced = await syncProfileToSupabase({ silent: true });
    if (!profileSynced) {
      if (!options.silent) {
        showToast(lastProfileSyncErrorMessage || "プロフィール同期に失敗しました");
      }
      return false;
    }

    const tanksSynced = await syncTanksToSupabase({ silent: true });
    if (!tanksSynced) {
      if (!options.silent) {
        showToast("水槽同期に失敗しました");
      }
      return false;
    }

    const logsSynced = await syncLogsToSupabase({ silent: true });
    if (!logsSynced) {
      if (!options.silent) {
        showToast("管理ログ同期に失敗しました");
      }
      return false;
    }

    const remindersSynced = await syncRemindersToSupabase({ silent: true });
    if (!remindersSynced) {
      if (!options.silent) {
        showToast("リマインダー同期に失敗しました");
      }
      return false;
    }

    const notificationDeliveriesSynced = await syncNotificationDeliveriesToSupabase({ silent: true });
    if (!notificationDeliveriesSynced) {
      if (!options.silent) {
        showToast("通知配信予約の同期に失敗しました");
      }
      return false;
    }

    const communitySynced = await syncCommunityToSupabase({ silent: true });
    if (!communitySynced) {
      if (!options.silent) {
        showToast("投稿とコメントの同期に失敗しました");
      }
      return false;
    }

    const aiSynced = await syncAiResultsToSupabase({ silent: true });
    if (!aiSynced) {
      if (!options.silent) {
        showToast("AI分析結果の同期に失敗しました");
      }
      return false;
    }

    const aiEvaluationsSynced = await syncAiEvaluationsToSupabase({ silent: true });
    if (!aiEvaluationsSynced) {
      if (!options.silent) {
        showToast("AI評価メモの同期に失敗しました");
      }
      return false;
    }

    const aiPromptNotesSynced = await syncAiPromptNotesToSupabase({ silent: true });
    if (!aiPromptNotesSynced) {
      if (!options.silent) {
        showToast("プロンプト改善メモの同期に失敗しました");
      }
      return false;
    }

    const pwaDeviceTestsSynced = await syncPwaDeviceTestsToSupabase({ silent: true });
    if (!pwaDeviceTestsSynced) {
      if (!options.silent) {
        showToast("PWA実機テスト結果の同期に失敗しました");
      }
      return false;
    }

    const pwaReleaseDecisionSynced = await syncPwaReleaseDecisionToSupabase({ silent: true });
    if (!pwaReleaseDecisionSynced) {
      if (!options.silent) {
        showToast("PWA最終リリース判定の同期に失敗しました");
      }
      return false;
    }

    state.account.syncStatus = "synced";
    state.account.lastSyncedAt = new Date().toISOString();
    saveState({ keepSyncStatus: true });
    renderApp();

    if (!options.silent) {
      showToast("AquaNoteデータをSupabaseに同期しました");
    }

    return true;
  } finally {
    cloudSyncInProgress = false;
  }
}

async function loadCloudStateFromSupabase(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    return false;
  }

  await loadProfileFromSupabase();
  await loadTanksFromSupabase();
  await loadLogsFromSupabase();
  await loadRemindersFromSupabase();
  await loadNotificationDeliveryHistory({ silent: true });
  await loadCommunityFromSupabase();
  await loadAiResultsFromSupabase();
  await loadAiEvaluationsFromSupabase();
  await loadAiPromptNotesFromSupabase();
  await loadPwaDeviceTestsFromSupabase();
  await loadPwaReleaseDecisionFromSupabase();

  if (!options.silent) {
    showToast("Supabaseからデータを読み込みました");
  }

  return true;
}

async function loadProfileFromSupabase() {
  if (!supabaseClient || !authSession?.user) {
    return null;
  }

  const { data, error } = await supabaseClient
    .from("profiles")
    .select("display_name, handle, email, visibility, plan, ui_mode, notification_channel, browser_notifications_enabled, email_notifications_enabled, quiet_hours_start, quiet_hours_end, updated_at")
    .eq("id", authSession.user.id)
    .maybeSingle();

  if (error) {
    showToast(error.message || "プロフィールを読み込めませんでした");
    return null;
  }

  if (!data) {
    return null;
  }

  applyRemoteProfile(data);
  saveState({ keepSyncStatus: true });
  return data;
}

async function loadTanksFromSupabase() {
  if (!supabaseClient || !authSession?.user) {
    return [];
  }

  let { data, error } = await supabaseClient
    .from("tanks")
    .select("id, local_id, name, kind, size_label, volume_label, residents, animal_names, plant_names, equipment_names, filter_profile, tags, featured_post_id, updated_at")
    .eq("owner_id", authSession.user.id)
    .order("created_at", { ascending: true });

  if (isMissingTankFilterProfileColumnError(error)) {
    ({ data, error } = await supabaseClient
      .from("tanks")
      .select("id, local_id, name, kind, size_label, volume_label, residents, animal_names, plant_names, equipment_names, tags, featured_post_id, updated_at")
      .eq("owner_id", authSession.user.id)
      .order("created_at", { ascending: true }));
  }

  if (isMissingTankSplitColumnsError(error)) {
    ({ data, error } = await supabaseClient
      .from("tanks")
      .select("id, local_id, name, kind, size_label, volume_label, residents, tags, featured_post_id, updated_at")
      .eq("owner_id", authSession.user.id)
      .order("created_at", { ascending: true }));
  }

  if (error) {
    showToast(error.message || "水槽を読み込めませんでした");
    return [];
  }

  if (Array.isArray(data) && data.length) {
    applyRemoteTanks(data);
    saveState({ keepSyncStatus: true });
  }

  return data || [];
}

async function loadLogsFromSupabase() {
  if (!supabaseClient || !authSession?.user) {
    return [];
  }

  const tankIds = state.tanks.map((tank) => tank.cloudId).filter(Boolean);
  if (!tankIds.length) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from("logs")
    .select("id, tank_id, local_id, log_type, temp_c, ph, note, recorded_at, created_at")
    .eq("owner_id", authSession.user.id)
    .in("tank_id", tankIds)
    .order("recorded_at", { ascending: false });

  if (error) {
    showToast(error.message || "管理ログを読み込めませんでした");
    return [];
  }

  if (Array.isArray(data) && data.length) {
    applyRemoteLogs(data);
    saveState({ keepSyncStatus: true });
  }

  return data || [];
}

async function loadRemindersFromSupabase() {
  if (!supabaseClient || !authSession?.user) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from("reminders")
    .select("task_key, label, enabled, schedule, weekdays, interval_days, start_date, notify_time, last_notified_on")
    .eq("owner_id", authSession.user.id);

  if (error) {
    showToast(error.message || "リマインダーを読み込めませんでした");
    return [];
  }

  if (Array.isArray(data) && data.length) {
    applyRemoteReminders(data);
    saveState({ keepSyncStatus: true });
  }

  return data || [];
}

async function loadCommunityFromSupabase() {
  if (!supabaseClient || !authSession?.user) {
    return [];
  }

  const { data: remotePosts, error: postError } = await supabaseClient
    .from("posts")
    .select("id, tank_id, owner_id, local_id, title, tag, body, album_position, created_at, updated_at")
    .eq("owner_id", authSession.user.id)
    .order("created_at", { ascending: false });

  if (postError) {
    showToast(postError.message || "投稿を読み込めませんでした");
    return [];
  }

  if (Array.isArray(remotePosts) && remotePosts.length) {
    applyRemotePosts(remotePosts);
    await loadMediaFromSupabase(remotePosts.map((post) => post.id));
    await loadCommentsFromSupabase(remotePosts.map((post) => post.id));
    await loadPostStatsFromSupabase(remotePosts.map((post) => post.id));
    await loadPostLikesFromSupabase(remotePosts.map((post) => post.id));
    saveState({ keepSyncStatus: true });
  }

  return remotePosts || [];
}

async function loadMediaFromSupabase(postCloudIds) {
  const ids = postCloudIds.filter(Boolean);
  if (!supabaseClient || !authSession?.user || !ids.length) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from("media")
    .select("id, post_id, kind, storage_path, thumbnail_path, duration_seconds, width, height, created_at")
    .in("post_id", ids)
    .order("created_at", { ascending: false });

  if (error) {
    showToast(error.message || "メディアを読み込めませんでした");
    return [];
  }

  await applyRemoteMedia(data || []);
  return data || [];
}

async function loadCommentsFromSupabase(postCloudIds) {
  const ids = postCloudIds.filter(Boolean);
  if (!supabaseClient || !authSession?.user || !ids.length) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from("comments")
    .select("id, post_id, author_id, local_id, body, created_at, updated_at")
    .in("post_id", ids)
    .order("created_at", { ascending: true });

  if (error) {
    showToast(error.message || "コメントを読み込めませんでした");
    return [];
  }

  applyRemoteComments(data || []);
  return data || [];
}

function getPostCloudIds(posts = state.posts) {
  return posts.map((post) => post.cloudId).filter(Boolean);
}

function getSyncablePosts() {
  return state.posts.filter((post) => !isSampleRecordId(post.id));
}

function isSampleRecordId(id) {
  return String(id || "").startsWith("sample-");
}

async function loadPostStatsFromSupabase(postCloudIds = getPostCloudIds()) {
  const ids = [...new Set(postCloudIds.filter(Boolean))];
  if (!supabaseClient || !ids.length) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from("post_stats")
    .select("post_id, likes_count, comments_count, ranking_score")
    .in("post_id", ids);

  if (error) {
    showToast(error.message || "投稿ランキングを読み込めませんでした");
    return [];
  }

  applyRemotePostStats(data || []);
  return data || [];
}

async function loadPostLikesFromSupabase(postCloudIds = getPostCloudIds()) {
  const ids = [...new Set(postCloudIds.filter(Boolean))];
  if (!supabaseClient || !authSession?.user || !ids.length) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from("post_likes")
    .select("post_id")
    .eq("user_id", authSession.user.id)
    .in("post_id", ids);

  if (error) {
    showToast(error.message || "いいね状態を読み込めませんでした");
    return [];
  }

  applyRemotePostLikes(ids, data || []);
  return data || [];
}

async function loadAiResultsFromSupabase() {
  if (!supabaseClient || !authSession?.user) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from("ai_results")
    .select("id, tank_id, post_id, local_id, status, level, summary, items, checked_at, updated_at")
    .eq("owner_id", authSession.user.id)
    .order("checked_at", { ascending: false });

  if (error) {
    showToast(error.message || "AI分析結果を読み込めませんでした");
    return [];
  }

  applyRemoteAiResults(data || []);
  saveState({ keepSyncStatus: true });
  return data || [];
}

async function loadAiEvaluationsFromSupabase() {
  if (!supabaseClient || !authSession?.user) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from("ai_evaluations")
    .select("id, local_id, target, source, model, prompt_version, status, fallback_status, summary, fallback_summary, difference, retake_tips, photo_condition, review_label, note, evaluated_at, updated_at")
    .eq("owner_id", authSession.user.id)
    .order("evaluated_at", { ascending: false })
    .limit(20);

  if (error) {
    showToast(error.message || "AI評価メモを読み込めませんでした");
    return [];
  }

  applyRemoteAiEvaluations(data || []);
  saveState({ keepSyncStatus: true });
  renderAiEvaluationLog();
  return data || [];
}

async function loadAiPromptNotesFromSupabase() {
  if (!supabaseClient || !authSession?.user) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from("ai_prompt_notes")
    .select("id, local_id, prompt_version, note, created_at, updated_at")
    .eq("owner_id", authSession.user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    showToast(error.message || "プロンプト改善メモを読み込めませんでした");
    return [];
  }

  applyRemoteAiPromptNotes(data || []);
  saveState({ keepSyncStatus: true });
  renderAiEvaluationLog();
  return data || [];
}

async function loadPwaDeviceTestsFromSupabase() {
  if (!supabaseClient || !authSession?.user) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from("pwa_device_tests")
    .select("id, local_id, device, browser, test_scope, status, note, tested_at, updated_at")
    .eq("owner_id", authSession.user.id)
    .order("tested_at", { ascending: false })
    .limit(20);

  if (error) {
    showToast(error.message || "PWA実機テスト結果を読み込めませんでした");
    return [];
  }

  applyRemotePwaDeviceTests(data || []);
  saveState({ keepSyncStatus: true });
  renderPwaTestResults();
  return data || [];
}

async function loadPwaReleaseDecisionFromSupabase() {
  if (!supabaseClient || !authSession?.user) {
    return null;
  }

  const { data, error } = await supabaseClient
    .from("pwa_release_decisions")
    .select("id, status, review_status, result_status, reviewer, production_url, note, decided_at, review_exported_at, updated_at")
    .eq("owner_id", authSession.user.id)
    .maybeSingle();

  if (error) {
    showToast(error.message || "PWA最終リリース判定を読み込めませんでした");
    return null;
  }

  if (data) {
    applyRemotePwaReleaseDecision(data);
    saveState({ keepSyncStatus: true });
    renderPwaReleaseDecision();
  }

  return data || null;
}

async function syncTanksToSupabase(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    if (!options.silent) {
      showToast("Supabaseにログインしてください");
    }
    return false;
  }

  const payloads = state.tanks.map((tank) => getTankPayload(tank, authSession.user));
  let { data, error } = await supabaseClient
    .from("tanks")
    .upsert(payloads, { onConflict: "owner_id,local_id" })
    .select("id, local_id, name, kind, size_label, volume_label, residents, animal_names, plant_names, equipment_names, filter_profile, tags, featured_post_id, updated_at");

  if (isMissingTankFilterProfileColumnError(error)) {
    const filterlessPayloads = payloads.map(({ filter_profile, ...payload }) => payload);
    ({ data, error } = await supabaseClient
      .from("tanks")
      .upsert(filterlessPayloads, { onConflict: "owner_id,local_id" })
      .select("id, local_id, name, kind, size_label, volume_label, residents, animal_names, plant_names, equipment_names, tags, featured_post_id, updated_at"));
  }

  if (isMissingTankSplitColumnsError(error)) {
    const legacyPayloads = payloads.map(({ animal_names, plant_names, equipment_names, filter_profile, ...payload }) => payload);
    ({ data, error } = await supabaseClient
      .from("tanks")
      .upsert(legacyPayloads, { onConflict: "owner_id,local_id" })
      .select("id, local_id, name, kind, size_label, volume_label, residents, tags, featured_post_id, updated_at"));
  }

  if (error) {
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(error.message || "水槽同期に失敗しました");
    }
    return false;
  }

  applyRemoteTanks(data || []);
  state.account.syncStatus = "synced";
  state.account.lastSyncedAt = new Date().toISOString();
  saveState({ keepSyncStatus: true });
  renderApp();

  if (!options.silent) {
    showToast("水槽をSupabaseに同期しました");
  }

  return true;
}

async function syncLogsToSupabase(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    if (!options.silent) {
      showToast("Supabaseにログインしてください");
    }
    return false;
  }

  const payloads = state.tanks.flatMap((tank) => {
    if (!tank.cloudId) {
      return [];
    }

    return tank.logs.map((log) => getLogPayload(log, tank, authSession.user));
  });

  if (!payloads.length) {
    return true;
  }

  const { data, error } = await supabaseClient
    .from("logs")
    .upsert(payloads, { onConflict: "owner_id,tank_id,local_id" })
    .select("id, tank_id, local_id, log_type, temp_c, ph, note, recorded_at, created_at");

  if (error) {
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(error.message || "管理ログ同期に失敗しました");
    }
    return false;
  }

  applyRemoteLogs(data || []);
  state.account.syncStatus = "synced";
  state.account.lastSyncedAt = new Date().toISOString();
  saveState({ keepSyncStatus: true });
  renderApp();

  if (!options.silent) {
    showToast("管理ログをSupabaseに同期しました");
  }

  return true;
}

async function syncRemindersToSupabase(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    if (!options.silent) {
      showToast("Supabaseにログインしてください");
    }
    return false;
  }

  const payloads = Object.entries(taskLabels).map(([taskId, label]) =>
    getReminderPayload(taskId, label, state.reminders[taskId] || defaultReminders[taskId], authSession.user),
  );
  const { data, error } = await supabaseClient
    .from("reminders")
    .upsert(payloads, { onConflict: "owner_id,task_key" })
    .select("task_key, label, enabled, schedule, weekdays, interval_days, start_date, notify_time, last_notified_on");

  if (error) {
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(error.message || "リマインダー同期に失敗しました");
    }
    return false;
  }

  applyRemoteReminders(data || []);
  state.account.syncStatus = "synced";
  state.account.lastSyncedAt = new Date().toISOString();
  saveState({ keepSyncStatus: true });
  renderApp();

  if (!options.silent) {
    showToast("リマインダーをSupabaseに同期しました");
  }

  return true;
}

async function syncNotificationDeliveriesToSupabase(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    if (!options.silent) {
      showToast("Supabaseにログインしてください");
    }
    return false;
  }

  const { error: deleteError } = await supabaseClient
    .from("notification_deliveries")
    .delete()
    .eq("owner_id", authSession.user.id)
    .eq("status", "pending");

  if (deleteError) {
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(deleteError.message || "通知配信予約の更新に失敗しました");
    }
    return false;
  }

  const payloads = getNotificationDeliveryPayloads(authSession.user);
  if (!payloads.length) {
    await loadNotificationDeliveryHistory({ silent: true });
    return true;
  }

  const { error } = await supabaseClient.from("notification_deliveries").insert(payloads);

  if (error) {
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(error.message || "通知配信予約の同期に失敗しました");
    }
    return false;
  }

  state.account.syncStatus = "synced";
  state.account.lastSyncedAt = new Date().toISOString();
  await loadNotificationDeliveryHistory({ silent: true });
  saveState({ keepSyncStatus: true });
  renderAccount();

  if (!options.silent) {
    showToast("通知配信予約をSupabaseに同期しました");
  }

  return true;
}

async function loadNotificationDeliveryHistory(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    notificationDeliveryHistory = [];
    renderNotificationDeliveryLog();
    renderNotificationVerificationChecklist();
    return false;
  }

  const { data, error } = await supabaseClient
    .from("notification_deliveries")
    .select("id, task_key, label, channel, scheduled_for, status, attempt_count, last_error, updated_at")
    .eq("owner_id", authSession.user.id)
    .order("scheduled_for", { ascending: false })
    .limit(12);

  if (error) {
    if (!options.silent) {
      showToast(error.message || "通知配信ログを読み込めませんでした");
    }
    renderNotificationDeliveryLog();
    renderNotificationVerificationChecklist();
    return false;
  }

  notificationDeliveryHistory = data || [];
  renderNotificationDeliveryLog();
  renderNotificationVerificationChecklist();

  if (!options.silent) {
    showToast("通知配信ログを更新しました");
  }

  return true;
}

async function retryNotificationDelivery(deliveryId) {
  if (!supabaseClient || !authSession?.user) {
    showToast("Supabaseにログインしてください");
    return false;
  }

  const { error } = await supabaseClient
    .from("notification_deliveries")
    .update({
      status: "pending",
      scheduled_for: new Date().toISOString(),
      attempt_count: 0,
      last_error: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", deliveryId)
    .eq("owner_id", authSession.user.id);

  if (error) {
    showToast(error.message || "通知配信の再送予約に失敗しました");
    return false;
  }

  await loadNotificationDeliveryHistory({ silent: true });
  showToast("通知配信を再送予約しました");
  return true;
}

async function syncPushSubscriptionToSupabase(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    if (!options.silent) {
      showToast("Supabaseにログインしてください");
    }
    return false;
  }

  if (state.account.notificationChannel !== "push") {
    return true;
  }

  if (!canUsePushNotifications()) {
    if (!options.silent) {
      showToast("このブラウザではPWA Pushに対応していません");
    }
    return false;
  }

  const applicationServerKey = getPushApplicationServerKey();
  if (!applicationServerKey) {
    if (!options.silent) {
      showToast("PWA Pushの公開鍵が未設定です");
    }
    return false;
  }

  let subscription;
  try {
    const registration = await navigator.serviceWorker.ready;
    subscription =
      (await registration.pushManager.getSubscription()) ||
      (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      }));
  } catch (error) {
    if (!options.silent) {
      showToast(error.message || "PWA Push購読の作成に失敗しました");
    }
    return false;
  }

  const payload = getPushSubscriptionPayload(subscription, authSession.user);

  const { error } = await supabaseClient
    .from("push_subscriptions")
    .upsert(payload, { onConflict: "owner_id,endpoint" });

  if (error) {
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(error.message || "PWA Push購読の同期に失敗しました");
    }
    return false;
  }

  if (!options.silent) {
    showToast("PWA Push購読をSupabaseに同期しました");
  }

  return true;
}

async function syncCommunityToSupabase(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    if (!options.silent) {
      showToast("Supabaseにログインしてください");
    }
    return false;
  }

  const postsSynced = await syncPostsToSupabase({ silent: true });
  if (!postsSynced) {
    if (!options.silent) {
      showToast("投稿同期に失敗しました");
    }
    return false;
  }

  const commentsSynced = await syncCommentsToSupabase({ silent: true });
  if (!commentsSynced) {
    if (!options.silent) {
      showToast("コメント同期に失敗しました");
    }
    return false;
  }

  const mediaSynced = await syncMediaToSupabase({ silent: true });
  if (!mediaSynced) {
    if (!options.silent) {
      showToast("メディア同期に失敗しました");
    }
    return false;
  }

  const postCloudIds = getPostCloudIds(getSyncablePosts());
  await loadMediaFromSupabase(postCloudIds);
  await loadPostStatsFromSupabase(postCloudIds);
  await loadPostLikesFromSupabase(postCloudIds);

  state.account.syncStatus = "synced";
  state.account.lastSyncedAt = new Date().toISOString();
  saveState({ keepSyncStatus: true });
  renderApp();

  if (!options.silent) {
    showToast("投稿とコメントをSupabaseに同期しました");
  }

  return true;
}

async function syncPostsToSupabase(options = {}) {
  const payloads = getSyncablePosts().map((post) => getPostPayload(post, authSession.user));
  if (!payloads.length) {
    return true;
  }

  const { data, error } = await supabaseClient
    .from("posts")
    .upsert(payloads, { onConflict: "owner_id,local_id" })
    .select("id, tank_id, owner_id, local_id, title, tag, body, album_position, created_at, updated_at");

  if (error) {
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(error.message || "投稿同期に失敗しました");
    }
    return false;
  }

  applyRemotePosts(data || []);
  return true;
}

async function syncCommentsToSupabase(options = {}) {
  const payloads = getSyncablePosts().flatMap((post) => {
    if (!post.cloudId) {
      return [];
    }

    return post.comments.map((comment) => getCommentPayload(comment, post, authSession.user));
  });

  if (!payloads.length) {
    return true;
  }

  const { data, error } = await supabaseClient
    .from("comments")
    .upsert(payloads, { onConflict: "author_id,post_id,local_id" })
    .select("id, post_id, author_id, local_id, body, created_at, updated_at");

  if (error) {
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(error.message || "コメント同期に失敗しました");
    }
    return false;
  }

  applyRemoteComments(data || []);
  return true;
}

async function syncMediaToSupabase(options = {}) {
  const postsWithMedia = getSyncablePosts().filter((post) => post.cloudId && hasLocalPostMedia(post));
  if (!postsWithMedia.length) {
    return true;
  }

  const syncedRows = [];

  for (const post of postsWithMedia) {
    const signature = getLocalMediaSignature(post);
    if (post.mediaStoragePath && post.mediaStorageSignature === signature) {
      continue;
    }

    try {
      const uploaded = await uploadPostMediaToStorage(post, authSession.user);
      const { data, error } = await supabaseClient
        .from("media")
        .upsert(getMediaPayload(post, uploaded, authSession.user), { onConflict: "post_id" })
        .select("id, post_id, kind, storage_path, thumbnail_path, duration_seconds, width, height, created_at")
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (data) {
        syncedRows.push(data);
      }

      post.mediaStoragePath = uploaded.storagePath;
      post.mediaThumbnailPath = uploaded.thumbnailPath;
      post.mediaStorageSignature = signature;
    } catch (error) {
      state.account.syncStatus = "local";
      saveState({ keepSyncStatus: true });
      renderAccount();
      if (!options.silent) {
        showToast(error.message || "メディア同期に失敗しました");
      }
      return false;
    }
  }

  await applyRemoteMedia(syncedRows);
  return true;
}

async function syncAiResultsToSupabase(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    if (!options.silent) {
      showToast("Supabaseにログインしてください");
    }
    return false;
  }

  const payloads = getAiResultPayloads(authSession.user);
  if (!payloads.length) {
    return true;
  }

  const { data, error } = await supabaseClient
    .from("ai_results")
    .upsert(payloads, { onConflict: "owner_id,local_id" })
    .select("id, tank_id, post_id, local_id, status, level, summary, items, checked_at, updated_at");

  if (error) {
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(error.message || "AI分析結果の同期に失敗しました");
    }
    return false;
  }

  applyRemoteAiResults(data || []);
  state.account.syncStatus = "synced";
  state.account.lastSyncedAt = new Date().toISOString();
  saveState({ keepSyncStatus: true });
  renderApp();

  if (!options.silent) {
    showToast("AI分析結果をSupabaseに同期しました");
  }

  return true;
}

async function syncAiEvaluationsToSupabase(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    if (!options.silent) {
      showToast("Supabaseにログインしてください");
    }
    return false;
  }

  const payloads = getAiEvaluationPayloads(authSession.user);
  if (!payloads.length) {
    return true;
  }

  const { data, error } = await supabaseClient
    .from("ai_evaluations")
    .upsert(payloads, { onConflict: "owner_id,local_id" })
    .select("id, local_id, target, source, model, prompt_version, status, fallback_status, summary, fallback_summary, difference, retake_tips, photo_condition, review_label, note, evaluated_at, updated_at");

  if (error) {
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(error.message || "AI評価メモの同期に失敗しました");
    }
    return false;
  }

  applyRemoteAiEvaluations(data || []);
  state.account.syncStatus = "synced";
  state.account.lastSyncedAt = new Date().toISOString();
  saveState({ keepSyncStatus: true });
  renderAiEvaluationLog();

  if (!options.silent) {
    showToast("AI評価メモをSupabaseに同期しました");
  }

  return true;
}

async function syncAiPromptNotesToSupabase(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    if (!options.silent) {
      showToast("Supabaseにログインしてください");
    }
    return false;
  }

  const payloads = getAiPromptNotePayloads(authSession.user);
  if (!payloads.length) {
    return true;
  }

  const { data, error } = await supabaseClient
    .from("ai_prompt_notes")
    .upsert(payloads, { onConflict: "owner_id,local_id" })
    .select("id, local_id, prompt_version, note, created_at, updated_at");

  if (error) {
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(error.message || "プロンプト改善メモの同期に失敗しました");
    }
    return false;
  }

  applyRemoteAiPromptNotes(data || []);
  saveState({ keepSyncStatus: true });
  renderAiEvaluationLog();

  if (!options.silent) {
    showToast("プロンプト改善メモをSupabaseに同期しました");
  }

  return true;
}

async function syncPwaDeviceTestsToSupabase(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    if (!options.silent) {
      showToast("Supabaseにログインしてください");
    }
    return false;
  }

  const payloads = getPwaDeviceTestPayloads(authSession.user);
  if (!payloads.length) {
    return true;
  }

  const { data, error } = await supabaseClient
    .from("pwa_device_tests")
    .upsert(payloads, { onConflict: "owner_id,local_id" })
    .select("id, local_id, device, browser, test_scope, status, note, tested_at, updated_at");

  if (error) {
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(error.message || "PWA実機テスト結果の同期に失敗しました");
    }
    return false;
  }

  applyRemotePwaDeviceTests(data || []);
  state.account.syncStatus = "synced";
  state.account.lastSyncedAt = new Date().toISOString();
  saveState({ keepSyncStatus: true });
  renderPwaTestResults();

  if (!options.silent) {
    showToast("PWA実機テスト結果をSupabaseに同期しました");
  }

  return true;
}

async function deletePwaDeviceTestFromSupabase(cloudId, options = {}) {
  if (!supabaseClient || !authSession?.user || !cloudId) {
    return false;
  }

  const { error } = await supabaseClient
    .from("pwa_device_tests")
    .delete()
    .eq("id", cloudId)
    .eq("owner_id", authSession.user.id);

  if (error) {
    if (!options.silent) {
      showToast(error.message || "PWA実機テスト結果の削除同期に失敗しました");
    }
    return false;
  }

  return true;
}

async function syncPwaReleaseDecisionToSupabase(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    if (!options.silent) {
      showToast("Supabaseにログインしてください");
    }
    return false;
  }

  const { data, error } = await supabaseClient
    .from("pwa_release_decisions")
    .upsert(getPwaReleaseDecisionPayload(authSession.user), { onConflict: "owner_id" })
    .select("id, status, review_status, result_status, reviewer, production_url, note, decided_at, review_exported_at, updated_at")
    .maybeSingle();

  if (error) {
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(error.message || "PWA最終リリース判定の同期に失敗しました");
    }
    return false;
  }

  if (data) {
    applyRemotePwaReleaseDecision(data);
  }

  state.account.syncStatus = "synced";
  state.account.lastSyncedAt = new Date().toISOString();
  saveState({ keepSyncStatus: true });
  renderPwaReleaseDecision();

  if (!options.silent) {
    showToast("PWA最終リリース判定をSupabaseに同期しました");
  }

  return true;
}

function scheduleAiEvaluationSync() {
  window.clearTimeout(aiEvaluationSyncTimer);
  aiEvaluationSyncTimer = window.setTimeout(() => {
    syncAiEvaluationsToSupabase({ silent: true });
  }, 700);
}

function getTankPayload(tank, user) {
  return {
    owner_id: user.id,
    local_id: tank.id,
    name: tank.name || "名前未設定の水槽",
    kind: tank.kind || "水槽",
    size_label: tank.size || null,
    volume_label: tank.volume || null,
    residents: getTankResidentValue(tank) || null,
    animal_names: tank.animals || null,
    plant_names: tank.plants || null,
    equipment_names: tank.equipment || null,
    filter_profile: normalizeTankFilter(tank.filter),
    tags: Array.isArray(tank.tags) ? tank.tags : [tank.kind || "水槽"],
    featured_post_id: null,
    updated_at: new Date().toISOString(),
  };
}

function isMissingTankFilterProfileColumnError(error) {
  if (!error) {
    return false;
  }

  return /filter_profile/i.test(`${error.message || ""} ${error.details || ""} ${error.hint || ""}`);
}

function isMissingTankSplitColumnsError(error) {
  if (!error) {
    return false;
  }

  return /animal_names|plant_names|equipment_names/i.test(`${error.message || ""} ${error.details || ""} ${error.hint || ""}`);
}

function getLogPayload(log, tank, user) {
  return {
    owner_id: user.id,
    tank_id: tank.cloudId,
    local_id: log.id,
    log_type: log.type || "記録",
    temp_c: parseOptionalNumber(log.temp),
    ph: parseOptionalNumber(log.ph),
    note: log.note || "",
    recorded_at: log.createdAt || new Date().toISOString(),
  };
}

function getReminderPayload(taskId, label, reminder, user) {
  return {
    owner_id: user.id,
    task_key: taskId,
    label,
    enabled: Boolean(reminder.enabled),
    schedule: getAllowedValue(reminder.schedule, ["daily", "weekly", "interval"], "daily"),
    weekdays: Array.isArray(reminder.weekdays) && reminder.weekdays.length ? reminder.weekdays : defaultReminders[taskId].weekdays,
    interval_days: clampNumber(reminder.intervalDays, 1, getReminderIntervalMax(taskId), defaultReminders[taskId].intervalDays),
    start_date: isValidDateKey(reminder.startDate) ? reminder.startDate : defaultReminders[taskId].startDate,
    notify_time: isValidTimeValue(reminder.time) ? reminder.time : defaultReminders[taskId].time,
    last_notified_on: reminder.lastNotifiedOn || null,
    updated_at: new Date().toISOString(),
  };
}

function getNotificationDeliveryPayloads(user) {
  const channel = getExternalNotificationChannel();
  if (!channel) {
    return [];
  }

  const now = new Date();
  return Object.entries(taskLabels)
    .map(([taskId, label]) => {
      const reminder = state.reminders[taskId] || defaultReminders[taskId];
      const nextReminder = getNextReminderForTask(taskId, reminder, now);
      if (!nextReminder) {
        return null;
      }

      return {
        owner_id: user.id,
        task_key: taskId,
        label,
        channel,
        scheduled_for: nextReminder.date.toISOString(),
        status: "pending",
        attempt_count: 0,
        last_error: null,
        updated_at: new Date().toISOString(),
      };
    })
    .filter(Boolean);
}

function getExternalNotificationChannel() {
  if (state.account.notificationChannel === "push") {
    return "push";
  }

  if (state.account.notificationChannel === "email") {
    return "email";
  }

  return null;
}

function getPushSubscriptionPayload(subscription, user) {
  const json = subscription.toJSON();
  return {
    owner_id: user.id,
    endpoint: json.endpoint || subscription.endpoint,
    p256dh: json.keys?.p256dh || "",
    auth: json.keys?.auth || "",
    user_agent: navigator.userAgent || "",
    enabled: true,
    updated_at: new Date().toISOString(),
  };
}

function getPostPayload(post, user) {
  const tank = state.tanks.find((item) => item.id === post.tankId);
  const albumPosition = tank?.albumOrder?.indexOf(post.id);

  return {
    owner_id: user.id,
    tank_id: tank?.cloudId || null,
    local_id: post.id,
    title: post.title || "新しい投稿",
    tag: post.tag || "水槽",
    body: post.text || "",
    album_position: albumPosition >= 0 ? albumPosition : 0,
    updated_at: new Date().toISOString(),
  };
}

function getCommentPayload(comment, post, user) {
  return {
    post_id: post.cloudId,
    author_id: user.id,
    local_id: comment.id,
    body: String(comment.text || "").slice(0, 240),
    updated_at: new Date().toISOString(),
  };
}

function getMediaPayload(post, uploaded, user) {
  return {
    post_id: post.cloudId,
    owner_id: user.id,
    kind: uploaded.kind,
    storage_path: uploaded.storagePath,
    thumbnail_path: uploaded.thumbnailPath,
    duration_seconds: uploaded.durationSeconds,
    width: null,
    height: null,
  };
}

function getAiResultPayloads(user) {
  const tankResults = state.tanks
    .filter((tank) => tank.cloudId && tank.latestAi)
    .map((tank) => getAiResultPayload({
      user,
      localId: `tank:${tank.id}:latest`,
      tankCloudId: tank.cloudId,
      postCloudId: null,
      result: tank.latestAi,
    }));

  const postResults = state.posts
    .filter((post) => !isSampleRecordId(post.id) && post.cloudId && post.latestAi)
    .map((post) => {
      const tank = state.tanks.find((item) => item.id === post.tankId);
      return getAiResultPayload({
        user,
        localId: `post:${post.id}:latest`,
        tankCloudId: tank?.cloudId || null,
        postCloudId: post.cloudId,
        result: post.latestAi,
      });
    });

  return [...tankResults, ...postResults];
}

function getAiResultPayload({ user, localId, tankCloudId, postCloudId, result }) {
  return {
    owner_id: user.id,
    tank_id: tankCloudId,
    post_id: postCloudId,
    local_id: localId,
    status: result.status || "未記録",
    level: result.levelClass || "",
    summary: result.summary || "",
    items: Array.isArray(result.items) ? result.items : [],
    checked_at: result.checkedAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function getAiEvaluationPayloads(user) {
  return (state.aiEvaluationLog || []).map((entry) => ({
    owner_id: user.id,
    local_id: entry.id,
    target: entry.target || "AI分析",
    source: entry.source || "未確認",
    model: entry.model || null,
    prompt_version: entry.promptVersion || null,
    status: entry.status || "未記録",
    fallback_status: entry.fallbackStatus || null,
    summary: entry.summary || "",
    fallback_summary: entry.fallbackSummary || "",
    difference: entry.difference || "",
    retake_tips: Array.isArray(entry.retakeTips) ? entry.retakeTips : [],
    photo_condition: entry.photoCondition || "unspecified",
    review_label: entry.reviewLabel || "unreviewed",
    note: entry.note || "",
    evaluated_at: entry.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

function getAiPromptNotePayloads(user) {
  return (state.aiPromptNotes || []).map((note) => ({
    owner_id: user.id,
    local_id: note.id,
    prompt_version: note.promptVersion || null,
    note: note.note || "",
    created_at: note.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

function getPwaDeviceTestPayloads(user) {
  return (state.pwaTestResults || []).map((result) => ({
    owner_id: user.id,
    local_id: result.id,
    device: result.device || "未記録",
    browser: result.browser || "未記録",
    test_scope: result.scope || "install",
    status: result.status || "watch",
    note: result.note || "",
    tested_at: result.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

function getPwaReleaseDecisionPayload(user) {
  const decision = normalizePwaReleaseDecision(state.pwaReleaseDecision || {});
  return {
    owner_id: user.id,
    status: decision.status,
    review_status: decision.reviewStatus,
    result_status: decision.resultStatus,
    reviewer: decision.reviewer || "",
    production_url: decision.productionUrl || "",
    note: decision.note || "",
    decided_at: decision.decidedAt || new Date().toISOString(),
    review_exported_at: decision.reviewExportedAt || null,
    updated_at: new Date().toISOString(),
  };
}

async function uploadPostMediaToStorage(post, user) {
  const sourceDataUrl = post.mediaType === "video" ? post.videoDataUrl : post.imageDataUrl;
  if (!sourceDataUrl) {
    throw new Error("アップロードするメディアがありません");
  }

  const mediaBlob = await dataUrlToBlob(sourceDataUrl);
  const mediaPath = getStorageObjectPath(user.id, post.cloudId, "media", mediaBlob.type);
  const mediaError = await uploadStorageObject(mediaPath, mediaBlob);
  if (mediaError) {
    throw mediaError;
  }

  let thumbnailPath = null;
  if (post.videoThumbnailDataUrl) {
    const thumbnailBlob = await dataUrlToBlob(post.videoThumbnailDataUrl);
    thumbnailPath = getStorageObjectPath(user.id, post.cloudId, "thumbnail", thumbnailBlob.type);
    const thumbnailError = await uploadStorageObject(thumbnailPath, thumbnailBlob);
    if (thumbnailError) {
      throw thumbnailError;
    }
  }

  return {
    kind: post.mediaType === "video" ? "video" : "image",
    storagePath: mediaPath,
    thumbnailPath,
    durationSeconds: post.mediaType === "video" ? Math.round(Number(post.videoDuration || 0)) || null : null,
  };
}

async function uploadStorageObject(path, blob) {
  const { error } = await supabaseClient.storage.from(MEDIA_BUCKET).upload(path, blob, {
    contentType: blob.type || "application/octet-stream",
    upsert: true,
  });

  return error || null;
}

function getStorageObjectPath(userId, postCloudId, slot, mimeType) {
  return `${userId}/${postCloudId}/${slot}.${getExtensionFromMimeType(mimeType)}`;
}

function getExtensionFromMimeType(mimeType = "") {
  const type = String(mimeType).toLowerCase();

  if (type.includes("png")) {
    return "png";
  }

  if (type.includes("webp")) {
    return "webp";
  }

  if (type.includes("gif")) {
    return "gif";
  }

  if (type.includes("mp4")) {
    return "mp4";
  }

  if (type.includes("quicktime")) {
    return "mov";
  }

  if (type.includes("webm")) {
    return "webm";
  }

  return type.startsWith("video/") ? "mp4" : "jpg";
}

async function dataUrlToBlob(dataUrl) {
  const response = await fetch(dataUrl);
  return response.blob();
}

function hasLocalPostMedia(post) {
  return Boolean(post.imageDataUrl || post.videoDataUrl);
}

function getLocalMediaSignature(post) {
  const source = post.mediaType === "video" ? post.videoDataUrl : post.imageDataUrl;
  const thumbnail = post.videoThumbnailDataUrl || "";

  return [
    post.mediaType || (post.videoDataUrl ? "video" : post.imageDataUrl ? "image" : "none"),
    source ? source.length : 0,
    source ? source.slice(0, 48) : "",
    source ? source.slice(-48) : "",
    thumbnail ? thumbnail.length : 0,
    Math.round(Number(post.videoDuration || 0)),
  ].join(":");
}

function applyRemoteTanks(remoteTanks) {
  remoteTanks.forEach((remoteTank) => {
    const localId = remoteTank.local_id || `cloud-${remoteTank.id}`;
    const existingTank = state.tanks.find((tank) => tank.cloudId === remoteTank.id || tank.id === localId);
    const nextTank = existingTank || {
      id: localId,
      logs: [],
      latestAi: null,
      featuredPostId: null,
      albumOrder: [],
    };

    nextTank.cloudId = remoteTank.id;
    nextTank.name = remoteTank.name || nextTank.name || "名前未設定の水槽";
    nextTank.kind = remoteTank.kind || nextTank.kind || "水槽";
    nextTank.size = remoteTank.size_label || nextTank.size || "サイズ未設定";
    nextTank.volume = remoteTank.volume_label || nextTank.volume || "容量未設定";
    const remoteParts = getTankResidentParts({
      animals: remoteTank.animal_names,
      plants: remoteTank.plant_names,
      residents: remoteTank.residents,
      kind: remoteTank.kind || nextTank.kind,
    });
    nextTank.animals = remoteParts.animals;
    nextTank.plants = remoteParts.plants;
    nextTank.residents = getTankResidentValue(nextTank);
    nextTank.equipment = remoteTank.equipment_names || nextTank.equipment || "";
    nextTank.filter = normalizeTankFilter(remoteTank.filter_profile || nextTank.filter);
    nextTank.tags = Array.isArray(remoteTank.tags) && remoteTank.tags.length ? remoteTank.tags : [nextTank.kind];

    if (!existingTank) {
      state.tanks.push(nextTank);
    }
  });

  ensureActiveTank();
}

function applyRemoteLogs(remoteLogs) {
  remoteLogs.forEach((remoteLog) => {
    const tank = state.tanks.find((item) => item.cloudId === remoteLog.tank_id);
    if (!tank) {
      return;
    }

    const localId = remoteLog.local_id || `cloud-log-${remoteLog.id}`;
    const existingLog = tank.logs.find((log) => log.cloudId === remoteLog.id || log.id === localId);
    const nextLog = existingLog || {
      id: localId,
    };

    nextLog.cloudId = remoteLog.id;
    nextLog.type = remoteLog.log_type || nextLog.type || "記録";
    nextLog.temp = remoteLog.temp_c === null || remoteLog.temp_c === undefined ? "" : String(remoteLog.temp_c);
    nextLog.ph = remoteLog.ph === null || remoteLog.ph === undefined ? "" : String(remoteLog.ph);
    nextLog.note = remoteLog.note || "";
    nextLog.createdAt = remoteLog.recorded_at || remoteLog.created_at || new Date().toISOString();

    if (!existingLog) {
      tank.logs.push(nextLog);
    }

    tank.logs = tank.logs
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 30);
  });
}

function applyRemoteReminders(remoteReminders) {
  remoteReminders.forEach((remoteReminder) => {
    const taskId = remoteReminder.task_key;
    if (!taskLabels[taskId]) {
      return;
    }

    state.reminders[taskId] = normalizeReminder({
      ...state.reminders[taskId],
      enabled: remoteReminder.enabled,
      schedule: remoteReminder.schedule,
      weekdays: remoteReminder.weekdays,
      intervalDays: remoteReminder.interval_days,
      startDate: remoteReminder.start_date,
      time: remoteReminder.notify_time,
      lastNotifiedOn: remoteReminder.last_notified_on,
    }, defaultReminders[taskId], taskId);
  });
}

function applyRemotePosts(remotePosts) {
  remotePosts.forEach((remotePost) => {
    const localId = remotePost.local_id || `cloud-post-${remotePost.id}`;
    const existingPost = state.posts.find((post) => post.cloudId === remotePost.id || post.id === localId);
    const tank = state.tanks.find((item) => item.cloudId === remotePost.tank_id);
    const nextPost = existingPost || {
      id: localId,
      imageClass: "reef",
      imageDataUrl: null,
      videoDataUrl: null,
      videoThumbnailDataUrl: null,
      videoDuration: null,
      mediaType: null,
      mediaCloudId: null,
      mediaStoragePath: null,
      mediaThumbnailPath: null,
      mediaStorageSignature: null,
      mediaUrl: null,
      mediaThumbnailUrl: null,
      likes: 0,
      cloudLikes: null,
      cloudCommentsCount: null,
      rankingScore: null,
      likedByCurrentUser: false,
      comments: [],
    };

    nextPost.cloudId = remotePost.id;
    nextPost.tankId = tank?.id || nextPost.tankId || state.activeTankId;
    nextPost.title = remotePost.title || nextPost.title || "新しい投稿";
    nextPost.tag = remotePost.tag || nextPost.tag || "水槽";
    nextPost.text = remotePost.body ?? nextPost.text ?? "";
    nextPost.createdAt = remotePost.created_at || nextPost.createdAt || new Date().toISOString();
    nextPost.updatedAt = remotePost.updated_at || nextPost.updatedAt || null;

    if (!existingPost) {
      state.posts.push(nextPost);
    }

    if (tank && Number.isInteger(remotePost.album_position)) {
      ensureTankAlbumOrder(tank);
      if (!tank.albumOrder.includes(nextPost.id)) {
        tank.albumOrder.splice(remotePost.album_position, 0, nextPost.id);
      }
    }
  });

  state.posts.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

function applyRemotePostStats(remoteStats) {
  remoteStats.forEach((stat) => {
    const post = state.posts.find((item) => item.cloudId === stat.post_id);
    if (!post) {
      return;
    }

    post.cloudLikes = Math.max(0, Number(stat.likes_count || 0));
    post.cloudCommentsCount = Math.max(0, Number(stat.comments_count || 0));
    post.rankingScore = Math.max(0, Number(stat.ranking_score || 0));
  });
}

async function applyRemoteMedia(remoteMediaRows) {
  const latestByPost = new Map();

  remoteMediaRows.forEach((media) => {
    if (!media.post_id || latestByPost.has(media.post_id)) {
      return;
    }

    latestByPost.set(media.post_id, media);
  });

  for (const media of latestByPost.values()) {
    const post = state.posts.find((item) => item.cloudId === media.post_id);
    if (!post) {
      continue;
    }

    post.mediaCloudId = media.id;
    post.mediaType = media.kind || post.mediaType;
    post.mediaStoragePath = media.storage_path || post.mediaStoragePath || null;
    post.mediaThumbnailPath = media.thumbnail_path || null;
    post.videoDuration =
      media.duration_seconds === null || media.duration_seconds === undefined
        ? post.videoDuration || null
        : Number(media.duration_seconds);
    post.mediaUrl = post.mediaStoragePath ? await getSignedMediaUrl(post.mediaStoragePath) : null;
    post.mediaThumbnailUrl = post.mediaThumbnailPath ? await getSignedMediaUrl(post.mediaThumbnailPath) : null;
  }
}

async function getSignedMediaUrl(path) {
  const { data, error } = await supabaseClient.storage
    .from(MEDIA_BUCKET)
    .createSignedUrl(path, MEDIA_SIGNED_URL_EXPIRES_SECONDS);

  if (error) {
    return null;
  }

  return data?.signedUrl || null;
}

function applyRemotePostLikes(scopedPostCloudIds, remoteLikes) {
  const scopedIds = new Set(scopedPostCloudIds);
  const likedIds = new Set(remoteLikes.map((like) => like.post_id).filter(Boolean));

  state.posts.forEach((post) => {
    if (post.cloudId && scopedIds.has(post.cloudId)) {
      post.likedByCurrentUser = likedIds.has(post.cloudId);
    }
  });
}

function applyRemoteAiResults(remoteResults) {
  remoteResults.forEach((remoteResult) => {
    const nextResult = {
      cloudId: remoteResult.id,
      status: remoteResult.status || "未記録",
      levelClass: remoteResult.level || "",
      summary: remoteResult.summary || "",
      items: Array.isArray(remoteResult.items) ? remoteResult.items : [],
      checkedAt: remoteResult.checked_at || remoteResult.updated_at || new Date().toISOString(),
    };

    const post = remoteResult.post_id ? state.posts.find((item) => item.cloudId === remoteResult.post_id) : null;
    if (post) {
      if (isNewerAiResult(nextResult, post.latestAi)) {
        post.latestAi = nextResult;
      }

      const tank = state.tanks.find((item) => item.id === post.tankId);
      if (tank && isNewerAiResult(nextResult, tank.latestAi)) {
        tank.latestAi = nextResult;
      }
      return;
    }

    const tank = remoteResult.tank_id ? state.tanks.find((item) => item.cloudId === remoteResult.tank_id) : null;
    if (tank && isNewerAiResult(nextResult, tank.latestAi)) {
      tank.latestAi = nextResult;
    }
  });
}

function applyRemoteAiEvaluations(remoteEntries) {
  const localById = new Map((state.aiEvaluationLog || []).map((entry) => [entry.id, entry]));
  remoteEntries.forEach((remoteEntry) => {
    const localId = remoteEntry.local_id;
    const nextEntry = normalizeAiEvaluationEntry({
      id: localId,
      cloudId: remoteEntry.id,
      createdAt: remoteEntry.evaluated_at || remoteEntry.updated_at,
      source: remoteEntry.source,
      target: remoteEntry.target,
      model: remoteEntry.model,
      promptVersion: remoteEntry.prompt_version,
      status: remoteEntry.status,
      fallbackStatus: remoteEntry.fallback_status,
      summary: remoteEntry.summary,
      fallbackSummary: remoteEntry.fallback_summary,
      difference: remoteEntry.difference,
      retakeTips: remoteEntry.retake_tips,
      photoCondition: remoteEntry.photo_condition,
      reviewLabel: remoteEntry.review_label,
      note: remoteEntry.note,
    });
    const current = localById.get(localId);
    localById.set(localId, {
      ...nextEntry,
      note: current?.note && current.note !== nextEntry.note ? current.note : nextEntry.note,
      promptDraftRetestStatus: current?.promptDraftRetestStatus || nextEntry.promptDraftRetestStatus,
      promptDraftRetestedAt: current?.promptDraftRetestedAt || nextEntry.promptDraftRetestedAt,
    });
  });

  state.aiEvaluationLog = [...localById.values()]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 20);
}

function applyRemoteAiPromptNotes(remoteNotes) {
  const localById = new Map((state.aiPromptNotes || []).map((note) => [note.id, note]));
  remoteNotes.forEach((remoteNote) => {
    const nextNote = normalizeAiPromptNote({
      id: remoteNote.local_id,
      cloudId: remoteNote.id,
      promptVersion: remoteNote.prompt_version,
      note: remoteNote.note,
      createdAt: remoteNote.created_at || remoteNote.updated_at,
    });
    localById.set(nextNote.id, nextNote);
  });

  state.aiPromptNotes = [...localById.values()]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 20);
}

function applyRemotePwaDeviceTests(remoteResults) {
  const localById = new Map((state.pwaTestResults || []).map((result) => [result.id, result]));
  remoteResults.forEach((remoteResult) => {
    const nextResult = normalizePwaTestResult({
      id: remoteResult.local_id,
      cloudId: remoteResult.id,
      device: remoteResult.device,
      browser: remoteResult.browser,
      scope: remoteResult.test_scope,
      status: remoteResult.status,
      note: remoteResult.note,
      createdAt: remoteResult.tested_at || remoteResult.updated_at,
    });
    localById.set(nextResult.id, nextResult);
  });

  state.pwaTestResults = [...localById.values()]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 20);
}

function applyRemotePwaReleaseDecision(remoteDecision) {
  state.pwaReleaseDecision = normalizePwaReleaseDecision({
    cloudId: remoteDecision.id,
    status: remoteDecision.status,
    reviewStatus: remoteDecision.review_status,
    resultStatus: remoteDecision.result_status,
    reviewer: remoteDecision.reviewer,
    productionUrl: remoteDecision.production_url,
    note: remoteDecision.note,
    decidedAt: remoteDecision.decided_at || remoteDecision.updated_at,
    reviewExportedAt: remoteDecision.review_exported_at,
  });
}

function isNewerAiResult(nextResult, currentResult) {
  if (!currentResult?.checkedAt) {
    return true;
  }

  return new Date(nextResult.checkedAt || 0) >= new Date(currentResult.checkedAt || 0);
}

function applyRemoteComments(remoteComments) {
  remoteComments.forEach((remoteComment) => {
    const post = state.posts.find((item) => item.cloudId === remoteComment.post_id);
    if (!post) {
      return;
    }

    const localId = remoteComment.local_id || `cloud-comment-${remoteComment.id}`;
    const existingComment = post.comments.find((comment) => comment.cloudId === remoteComment.id || comment.id === localId);
    const nextComment = existingComment || {
      id: localId,
    };

    nextComment.cloudId = remoteComment.id;
    nextComment.author = existingComment?.author || (remoteComment.author_id === authSession?.user?.id ? state.account.name : "アクアリスト");
    nextComment.text = remoteComment.body ?? "";
    nextComment.createdAt = remoteComment.created_at || new Date().toISOString();

    if (!existingComment) {
      post.comments.push(nextComment);
    }

    post.comments.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
  });
}

async function syncProfileToSupabase(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    if (!options.silent) {
      showToast("Supabaseにログインしてください");
    }
    return false;
  }

  const { data, error } = await supabaseClient
    .from("profiles")
    .upsert(getProfilePayload(authSession.user), { onConflict: "id" })
    .select("display_name, handle, email, visibility, plan, ui_mode, notification_channel, browser_notifications_enabled, email_notifications_enabled, quiet_hours_start, quiet_hours_end, updated_at")
    .maybeSingle();

  if (error) {
    lastProfileSyncErrorMessage = getProfileSyncErrorMessage(error);
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(lastProfileSyncErrorMessage);
    }
    return false;
  }

  lastProfileSyncErrorMessage = "";

  if (data) {
    applyRemoteProfile(data);
  }

  state.account.signedIn = true;
  state.account.syncStatus = "synced";
  state.account.lastSyncedAt = new Date().toISOString();
  saveState({ keepSyncStatus: true });
  renderAccount();

  if (!options.silent) {
    showToast("プロフィールをSupabaseに同期しました");
  }

  return true;
}

function getProfileSyncErrorMessage(error) {
  if (isPostingUiModeConstraintError(error)) {
    return "Supabaseで投稿重視モード用SQLを実行してください。READMEの既存Supabase反映手順を確認してください。";
  }

  return error?.message || "プロフィール同期に失敗しました";
}

function isPostingUiModeConstraintError(error) {
  const text = `${error?.message || ""} ${error?.details || ""} ${error?.hint || ""} ${error?.code || ""}`;
  return /ui_mode|profiles_ui_mode_check|23514/i.test(text) && state.account?.uiMode === "live";
}

function getProfilePayload(user) {
  const handle = normalizeHandle(state.account.handle);

  return {
    id: user.id,
    handle: handle === defaultState.account.handle ? `${handle}_${user.id.slice(0, 6)}` : handle,
    display_name: state.account.name || defaultState.account.name,
    email: state.account.email || user.email || "",
    visibility: getAllowedValue(state.account.visibility, ["public", "friends", "private"], "public"),
    plan: getAllowedValue(state.account.plan, ["free", "plus", "pro"], "free"),
    ui_mode: getAllowedValue(state.account.uiMode, UI_MODES, "standard"),
    notification_channel: getAllowedValue(state.account.notificationChannel, ["browser", "push", "email", "none"], "browser"),
    browser_notifications_enabled: Boolean(state.account.browserNotifications),
    email_notifications_enabled: Boolean(state.account.emailNotifications),
    quiet_hours_start: normalizeTimeValue(state.account.quietHoursStart, defaultState.account.quietHoursStart),
    quiet_hours_end: normalizeTimeValue(state.account.quietHoursEnd, defaultState.account.quietHoursEnd),
    updated_at: new Date().toISOString(),
  };
}

function applyRemoteProfile(profile) {
  state.account = {
    ...state.account,
    signedIn: true,
    name: profile.display_name || state.account.name,
    handle: normalizeHandle(profile.handle || state.account.handle),
    email: profile.email || state.account.email,
    visibility: getAllowedValue(profile.visibility, ["public", "friends", "private"], state.account.visibility),
    plan: getAllowedValue(profile.plan, ["free", "plus", "pro"], state.account.plan),
    uiMode: getAllowedValue(profile.ui_mode, UI_MODES, state.account.uiMode),
    notificationChannel: getAllowedValue(profile.notification_channel, ["browser", "push", "email", "none"], state.account.notificationChannel),
    browserNotifications:
      profile.browser_notifications_enabled === null || profile.browser_notifications_enabled === undefined
        ? state.account.browserNotifications
        : Boolean(profile.browser_notifications_enabled),
    emailNotifications:
      profile.email_notifications_enabled === null || profile.email_notifications_enabled === undefined
        ? state.account.emailNotifications
        : Boolean(profile.email_notifications_enabled),
    quietHoursStart: normalizeTimeValue(profile.quiet_hours_start, state.account.quietHoursStart),
    quietHoursEnd: normalizeTimeValue(profile.quiet_hours_end, state.account.quietHoursEnd),
    syncStatus: "synced",
    lastSyncedAt: profile.updated_at || new Date().toISOString(),
  };
}

function createSupabaseClient() {
  const config = getSupabaseConfig();
  const url = config.url || config.supabaseUrl;
  const key = config.publishableKey || config.anonKey;

  if (!url || !key || !window.supabase?.createClient) {
    return null;
  }

  return window.supabase.createClient(url, key);
}

function getSupabaseConfig() {
  return window.AQUANOTE_SUPABASE_CONFIG || {};
}

function getSupabaseSetupStatus() {
  const config = getSupabaseConfig();
  const hasUrl = Boolean(config.url || config.supabaseUrl);
  const hasKey = Boolean(config.publishableKey || config.anonKey);
  const hasSdk = Boolean(window.supabase?.createClient);

  if (!hasUrl || !hasKey) {
    return {
      ready: false,
      message: "supabase-config.js が読み込まれていません。ローカルサーバーで開き直すか、画面を再読み込みしてください。",
    };
  }

  if (!hasSdk) {
    return {
      ready: false,
      message: "Supabase SDKを読み込めません。ネット接続またはCDN読み込みを確認してください。",
    };
  }

  return {
    ready: true,
    message: "Supabase Authへメールとパスワードで接続します。",
  };
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
}

async function ensureSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  if (!getSupabaseConfig().url && !getSupabaseConfig().supabaseUrl) {
    try {
      await loadScript(`supabase-config.js?ts=${Date.now()}`);
    } catch (error) {
      return null;
    }
  }

  if (!window.supabase?.createClient) {
    try {
      await loadScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");
    } catch (error) {
      return null;
    }
  }

  return createSupabaseClient();
}

async function initSupabaseAuth() {
  if (!supabaseClient) {
    supabaseClient = await ensureSupabaseClient();
  }

  if (!supabaseClient) {
    renderAuthPanel();
    return;
  }

  const { data } = await supabaseClient.auth.getSession();
  authSession = data.session || null;

  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    await applyAuthSession(session);
  });

  await applyAuthSession(authSession);
}

async function applyAuthSession(session) {
  authSession = session;

  if (authSession?.user) {
    state.account.signedIn = true;
    state.account.email = authSession.user.email || state.account.email;
    saveState({ keepSyncStatus: true });
    await loadCloudStateFromSupabase({ silent: true });
  } else {
    state.account.signedIn = false;
    notificationDeliveryHistory = [];
    clearCurrentUserLikes();
    saveState({ keepSyncStatus: true });
  }

  renderAccount();
}

function exportAppData() {
  const payload = {
    app: "AquaNote",
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    state,
  };
  downloadFile(
    `aquanote-backup-${getDateKey(new Date())}.json`,
    JSON.stringify(payload, null, 2),
    "application/json;charset=utf-8",
  );
  showToast("データを書き出しました");
}

function exportProductionSetupStatus() {
  const setupSummary = getProductionSetupSummaryState();
  const payload = {
    app: "AquaNote",
    type: "production-setup-status",
    exportedAt: new Date().toISOString(),
    ready: setupSummary.ready,
    nextAction: setupSummary.nextAction,
    readyCount: setupSummary.readyCount,
    manualCount: setupSummary.manualCount,
    missingCount: setupSummary.missingCount,
    totalCount: setupSummary.totalCount,
    setupCheck: normalizeProductionSetupCheck(state.productionSetupCheck || {}),
    items: setupSummary.items,
  };

  downloadFile(
    `aquanote-production-setup-${getDateKey(new Date())}.json`,
    JSON.stringify(payload, null, 2),
    "application/json;charset=utf-8",
  );
  showToast("本番前セットアップを書き出しました");
}

function exportPwaTestResults() {
  const results = Array.isArray(state.pwaTestResults) ? state.pwaTestResults : [];
  if (!results.length) {
    showToast("書き出すPWA実機テスト結果がありません");
    return;
  }

  state.pwaReleaseDecision = normalizePwaReleaseDecision({
    ...state.pwaReleaseDecision,
    reviewExportedAt: new Date().toISOString(),
  });
  saveState();

  const releaseDecision = normalizePwaReleaseDecision(state.pwaReleaseDecision || {});
  const coverage = getPwaReleaseCoverage(results);
  const scopeStatuses = getPwaScopeStatuses(results);
  const gatewayDecisionEvidence = getAiGatewayProductionDecisionEvidence();
  const prelaunchSetup = getProductionSetupSummaryState(results);
  const appearanceQa = getPwaModeQaSummary(results);
  const deviceQaActions = getPwaDeviceQaActionItems(results);
  const allDeviceQaActions = getPwaDeviceQaActionItems(results, { includeResolved: true });
  const evidence = getPwaReleaseEvidenceItems(releaseDecision, coverage);
  const handoffChecklist = getPwaReleaseHandoffChecklist({
    decision: releaseDecision,
    coverage,
    deviceQaActions,
    gatewayDecision: gatewayDecisionEvidence,
  });
  const handoffMemo = getPwaReleaseHandoffMemo({
    decision: releaseDecision,
    coverage,
    handoffChecklist,
    gatewayDecision: gatewayDecisionEvidence,
    deviceQaActions,
    appearanceQa,
  });
  const testerScript = getPwaReleaseTesterScript({ decision: releaseDecision, coverage });
  const cloudReview = getPwaReleaseCloudReview({
    decision: releaseDecision,
    results,
  });
  const readyForRelease = coverage.ready && releaseDecision.status === "ready" && evidence.every((item) => item.ready);

  const payload = {
    app: "AquaNote",
    type: "pwa-production-review",
    exportedAt: new Date().toISOString(),
    readyForRelease,
    coverage: {
      passedCount: coverage.passedCount,
      requiredCount: coverage.scopes.length,
      failedCount: coverage.failedCount,
      ready: coverage.ready,
      requiredScopes: coverage.scopes.map((scope) => ({
        scope,
        label: getPwaTestScopeLabel(scope),
        status: scopeStatuses[scope],
        statusLabel: getPwaTestStatusLabel(scopeStatuses[scope]),
        passed: scopeStatuses[scope] === "passed",
        checks: PWA_SCOPE_QA_HINTS[scope] || [],
        noteTemplate: PWA_SCOPE_NOTE_TEMPLATES[scope] || "",
      })),
    },
    appearanceQa: {
      ready: appearanceQa.every((item) => item.ready),
      items: appearanceQa,
    },
    deviceQaActions: {
      ready: deviceQaActions.length === 0,
      unresolvedCount: deviceQaActions.length,
      resolvedCount: allDeviceQaActions.filter((item) => item.resolved).length,
      items: deviceQaActions,
      history: allDeviceQaActions,
    },
    prelaunchSetup,
    gatewayDecisionEvidence: getPwaGatewayDecisionExportEvidence(gatewayDecisionEvidence),
    handoffChecklist,
    handoffMemo,
    testerScript,
    cloudReview,
    releaseDecision: {
      ...releaseDecision,
      statusLabel: getPwaReleaseDecisionLabel(releaseDecision.status),
      reviewStatusLabel: getPwaReleaseReviewStatusLabel(releaseDecision.reviewStatus),
      resultStatusLabel: getPwaReleaseResultStatusLabel(releaseDecision.resultStatus),
    },
    evidence,
    results: results.map((result) => ({
      ...result,
      statusLabel: getPwaTestStatusLabel(result.status),
      scopeLabel: getPwaTestScopeLabel(result.scope),
    })),
  };

  downloadFile(
    `aquanote-pwa-production-review-${getDateKey(new Date())}.json`,
    JSON.stringify(payload, null, 2),
    "application/json;charset=utf-8",
  );
  renderPwaReleaseDecision();
  if (authSession?.user) {
    syncPwaReleaseDecisionToSupabase({ silent: true });
  }
  showToast("PWA本番URLレビュー結果を書き出しました");
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function toCsv(rows) {
  return rows.map((row) => row.map(escapeCsvCell).join(",")).join("\n");
}

function escapeCsvCell(value) {
  const text = String(value ?? "");
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
}

function exportAiReviewData(format) {
  const entries = getVisibleAiEvaluationEntries();
  const notes = getVisibleAiPromptNotes();
  const needsFixNotes = getAiNeedsFixPromptNotes(notes);
  const retestAdjustmentNotes = getAiRetestAdjustmentPromptNotes(notes);
  const needsFixNoteConditions = getAiPromptNoteConditions(needsFixNotes);
  const retestAdjustmentConditions = getAiPromptNoteConditions(retestAdjustmentNotes);
  const promptDraftNoteConditions = getUniqueValues([...needsFixNoteConditions, ...retestAdjustmentConditions]);
  const reReviewSummary = getAiDraftReReviewSummary(entries, retestAdjustmentConditions);
  const reReviewDecision = getAiDraftReReviewDecision(reReviewSummary);
  const promptDraftItems = getAiPromptV4DraftItems({
    notes,
    needsFixNotes,
    retestAdjustmentNotes,
    needsFixEntries: entries.filter((entry) => entry.reviewLabel === "needs_fix"),
  });
  const promptDraftReview = getAiPromptDraftReview({
    draftItems: promptDraftItems,
    needsFixNotes: [...needsFixNotes, ...retestAdjustmentNotes],
    needsFixNoteConditions: promptDraftNoteConditions,
  });
  const retestConditionSummary = getAiPromptDraftRetestConditionSummary(entries);
  if (!entries.length && !notes.length && !promptDraftItems.length) {
    showToast("書き出すAI評価レビューがありません");
    return;
  }

  const dateKey = getDateKey(new Date());

  if (format === "csv") {
    const rows = [
      [
        "type",
        "createdAt",
        "target",
        "source",
        "status",
        "difference",
        "reviewLabel",
        "photoCondition",
        "model",
        "promptVersion",
        "promptGeneration",
        "v4ValidationStatus",
        "draftRetestStatus",
        "summary",
        "retakeTips",
        "note",
      ],
      ...entries.map((entry) => [
        "evaluation",
        entry.createdAt,
        entry.target,
        entry.source,
        entry.status,
        entry.difference,
        getAiReviewLabel(entry.reviewLabel),
        getAiPhotoConditionLabel(entry.photoCondition),
        entry.model,
        entry.promptVersion,
        getAiPromptGenerationLabel(getAiPromptGeneration(entry.promptVersion)),
        getAiPromptValidationStatusLabel(getAiPromptValidationStatus(entry)),
        getAiPromptDraftRetestLabel(entry.promptDraftRetestStatus),
        entry.summary,
        Array.isArray(entry.retakeTips) ? entry.retakeTips.join(" / ") : "",
        entry.note || "",
      ]),
      ...notes.map((note) => [
        "prompt_note",
        note.createdAt,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        note.promptVersion || "",
        getAiPromptGenerationLabel(getAiPromptGeneration(note.promptVersion)),
        "",
        "",
        "",
        "",
        note.note,
      ]),
      ...promptDraftItems.map((item) => [
        "prompt_v4_draft",
        new Date().toISOString(),
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "aquanote-care-v4-draft",
        "v4",
        "v4草案",
        "",
        item,
        "",
        "",
      ]),
      ...(promptDraftItems.length || needsFixNotes.length
        ? [
            [
              "prompt_v4_draft_review",
              new Date().toISOString(),
              "",
              "",
              promptDraftReview.status,
              promptDraftReview.nextAction,
              "",
              promptDraftReview.coveredConditionLabels.join(" / "),
              "",
              "aquanote-care-v4-draft",
              "v4",
              promptDraftReview.ready ? "草案反映OK" : "草案反映確認中",
              "",
              promptDraftReview.summary,
              "",
              promptDraftReview.missingConditionLabels.join(" / "),
            ],
          ]
        : []),
      ...retestConditionSummary.map((item) => [
        "prompt_v4_retest_condition",
        new Date().toISOString(),
        "",
        "AI Gateway",
        item.status,
        item.nextAction,
        "",
        item.label,
        "",
        "aquanote-care-v4-draft",
        "v4",
        item.improved ? "再評価改善" : "再評価確認中",
        "",
        `再評価済み${item.retested}件 / 良い例${item.good}件 / 要修正${item.needsFix}件 / 保留${item.watch}件`,
        "",
        `再評価対象${item.retestNeeded}件`,
      ]),
      [
        "prompt_v4_rereview_decision",
        new Date().toISOString(),
        "",
        "AI Gateway",
        reReviewDecision.status,
        reReviewDecision.nextAction,
        "",
        reReviewSummary.targetConditionLabels.join(" / "),
        "",
        "aquanote-care-v4-draft",
        "v4",
        reReviewDecision.ready ? "再レビュー公開OK" : "再レビュー確認中",
        "",
        reReviewDecision.summary,
        "",
        `再レビュー済み${reReviewSummary.reReviewed}件 / 良い例${reReviewSummary.good}件 / 要修正${reReviewSummary.needsFix}件 / 保留${reReviewSummary.watch}件`,
      ],
    ];
    downloadFile(`aquanote-ai-reviews-${dateKey}.csv`, toCsv(rows), "text/csv;charset=utf-8");
    showToast("AI評価レビューをCSVで書き出しました");
    return;
  }

  const payload = {
    app: "AquaNote",
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    filters: {
      source: activeAiEvaluationSourceFilter,
      status: activeAiEvaluationStatusFilter,
      reviewLabel: activeAiEvaluationReviewFilter,
      from: activeAiEvaluationFromFilter,
      to: activeAiEvaluationToFilter,
    },
    evaluations: entries.map((entry) => ({
      ...entry,
      promptGeneration: getAiPromptGeneration(entry.promptVersion),
      promptValidationStatus: getAiPromptValidationStatus(entry),
      promptValidationStatusLabel: getAiPromptValidationStatusLabel(getAiPromptValidationStatus(entry)),
    })),
    promptValidation: getAiPromptValidationExportSummary(entries),
    promptV4ProductionCheck: getAiPromptV4ProductionExport(entries),
    promptImprovementNote: state.aiPromptImprovementNote || "",
    promptNotes: notes,
    promptV4Draft: {
      version: "aquanote-care-v4-draft",
      items: promptDraftItems,
      needsFixNotesCount: needsFixNotes.length,
      needsFixNoteConditions,
      retestAdjustmentNotesCount: retestAdjustmentNotes.length,
      retestAdjustmentConditions,
      review: promptDraftReview,
      retest: getAiPromptDraftRetestExport(entries, promptDraftReview, retestConditionSummary),
      reReview: reReviewSummary,
      reReviewDecision,
    },
  };
  downloadFile(
    `aquanote-ai-reviews-${dateKey}.json`,
    JSON.stringify(payload, null, 2),
    "application/json;charset=utf-8",
  );
  showToast("AI評価レビューをJSONで書き出しました");
}

async function importAppData() {
  const file = importDataInput.files[0];
  if (!file) {
    return;
  }

  try {
    const text = await readFileAsText(file);
    const parsed = JSON.parse(text);
    const importedState = parsed.state || parsed;

    if (!Array.isArray(importedState.tanks) || !Array.isArray(importedState.posts)) {
      throw new Error("Invalid AquaNote data.");
    }

    state = normalizeState(importedState);
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderApp();
    showToast("データを読み込みました");
  } catch {
    showToast("読み込めるAquaNoteデータではありません");
  } finally {
    importDataInput.value = "";
  }
}

function renderSearchResults() {
  const query = normalizeSearchTerm(globalSearchInput.value);
  if (!query) {
    clearSearchResults();
    return;
  }

  const results = getSearchResults(query).slice(0, 8);
  searchResults.hidden = false;

  if (!results.length) {
    searchResults.innerHTML = '<p class="empty-search">該当する水槽、投稿、ガイドはありません</p>';
    return;
  }

  searchResults.innerHTML = results
    .map(
      (result) => `
        <button type="button" data-search-type="${escapeHtml(result.type)}" data-search-id="${escapeHtml(result.id)}">
          <span>${escapeHtml(result.label)}</span>
          <strong>${escapeHtml(result.title)}</strong>
          <small>${escapeHtml(result.description)}</small>
        </button>
      `,
    )
    .join("");
}

function getSearchResults(query) {
  const tankResults = state.tanks.map((tank) => ({
    type: "tank",
    id: tank.id,
    label: "水槽",
    title: tank.name,
    description: `${tank.kind} / ${tank.size} / ${formatTankResidents(tank)}`,
    text: [
      tank.name,
      tank.kind,
      tank.size,
      tank.volume,
      tank.animals,
      tank.plants,
      tank.residents,
      tank.equipment,
      tank.filter?.type,
      tank.filter?.note,
      getFilterFlowLabel(tank.filter?.flowStatus),
      ...tank.tags,
    ].join(" "),
  }));

  const postResults = state.posts.map((post) => ({
    type: "post",
    id: post.id,
    label: "投稿",
    title: post.title,
    description: `${post.tag} / ${getTankName(post.tankId)}`,
    text: [post.title, post.tag, post.text, getTankName(post.tankId), ...post.comments.map((comment) => comment.text)].join(
      " ",
    ),
  }));

  const guideResults = getGuideSearchItems();

  return [...tankResults, ...postResults, ...guideResults].filter((result) =>
    normalizeSearchTerm(result.text).includes(query),
  );
}

function getTankResidentParts(tank = {}) {
  const animals = String(tank.animals || tank.animal_names || "").trim();
  const plants = String(tank.plants || tank.plant_names || "").trim();

  if (animals || plants) {
    return { animals, plants };
  }

  const values = String(tank.residents || "")
    .split(/[、,]/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (!values.length) {
    return { animals: "", plants: "" };
  }

  const plantKeywords = ["水草", "草", "苔", "藻", "睡蓮", "浮草", "アヌビアス", "ミクロソリウム", "ウィローモス", "マツモ", "ホテイ"];
  const plantValues = values.filter((item) => plantKeywords.some((keyword) => item.includes(keyword)));
  const animalValues = values.filter((item) => !plantValues.includes(item));

  return {
    animals: animalValues.join("、"),
    plants: plantValues.join("、"),
  };
}

function formatTankResidents(tank = {}) {
  const value = getTankResidentValue(tank);

  return value || "生き物・水草未設定";
}

function getTankResidentValue(tank = {}) {
  const { animals, plants } = getTankResidentParts(tank);
  const parts = [];

  if (animals) {
    parts.push(animals);
  }

  if (plants) {
    parts.push(plants);
  }

  return parts.join("、");
}

function getTankDetailItems(tank) {
  return [
    { label: "種類", value: tank.kind || "未設定" },
    { label: "サイズ", value: tank.size || "未設定" },
    { label: "容量", value: tank.volume || "未設定" },
    { label: "生き物・水草", value: formatTankResidents(tank) },
    { label: "設備", value: tank.equipment || "未設定" },
  ];
}

function getFilterFormValue(prefix) {
  const interval = Number(document.querySelector(`#${prefix}-filter-interval${prefix === "tank" ? "-input" : ""}`)?.value || 30);
  return normalizeTankFilter({
    type: document.querySelector(`#${prefix}-filter-type${prefix === "tank" ? "-input" : ""}`)?.value || "",
    lastCleanedAt: document.querySelector(`#${prefix}-filter-cleaned${prefix === "tank" ? "-input" : ""}`)?.value || "",
    intervalDays: Number.isFinite(interval) ? interval : 30,
    flowStatus: document.querySelector(`#${prefix}-filter-flow${prefix === "tank" ? "-input" : ""}`)?.value || "unchecked",
    note: document.querySelector(`#${prefix}-filter-note${prefix === "tank" ? "-input" : ""}`)?.value || "",
  });
}

function setFilterFormValue(prefix, filterValue) {
  const filter = normalizeTankFilter(filterValue);
  const suffix = prefix === "tank" ? "-input" : "";
  const typeInput = document.querySelector(`#${prefix}-filter-type${suffix}`);
  const cleanedInput = document.querySelector(`#${prefix}-filter-cleaned${suffix}`);
  const intervalInput = document.querySelector(`#${prefix}-filter-interval${suffix}`);
  const flowInput = document.querySelector(`#${prefix}-filter-flow${suffix}`);
  const noteInput = document.querySelector(`#${prefix}-filter-note${suffix}`);

  if (typeInput) typeInput.value = filter.type;
  if (cleanedInput) cleanedInput.value = filter.lastCleanedAt;
  if (intervalInput) intervalInput.value = filter.intervalDays || "";
  if (flowInput) flowInput.value = filter.flowStatus;
  if (noteInput) noteInput.value = filter.note;
}

function resetFilterForm(prefix) {
  setFilterFormValue(prefix, {
    type: "",
    lastCleanedAt: "",
    intervalDays: 30,
    flowStatus: "unchecked",
    note: "",
  });
}

function normalizeTankFilter(value = {}) {
  const intervalDays = Number(value.intervalDays || value.interval_days || 30);
  const rawFlowStatus = value.flowStatus || value.flow_status || "unchecked";
  const flowStatus = ["normal", "weak", "clogged", "unchecked"].includes(rawFlowStatus) ? rawFlowStatus : "unchecked";

  return {
    type: String(value.type || value.filter_type || "").trim(),
    lastCleanedAt: isValidDateKey(value.lastCleanedAt || value.last_cleaned_at || "") ? value.lastCleanedAt || value.last_cleaned_at : "",
    intervalDays: Number.isFinite(intervalDays) && intervalDays > 0 ? Math.min(365, Math.round(intervalDays)) : 30,
    flowStatus,
    note: String(value.note || "").trim(),
  };
}

function getFilterMaintenanceStatus(filterValue = {}) {
  const filter = normalizeTankFilter(filterValue);
  if (!filter.lastCleanedAt) {
    return {
      level: "pending",
      label: "未記録",
      nextLabel: "掃除日未設定",
      note: "前回掃除日を入れると、次回目安を表示します。",
    };
  }

  const cleanedDate = parseDateKey(filter.lastCleanedAt);
  const nextDate = new Date(cleanedDate);
  nextDate.setDate(nextDate.getDate() + filter.intervalDays);
  const daysLeft = diffCalendarDays(new Date(), nextDate);
  const nextLabel = `${formatAlbumDate(nextDate)} / ${daysLeft >= 0 ? `あと${daysLeft}日` : `${Math.abs(daysLeft)}日超過`}`;
  const flowWarning = filter.flowStatus === "weak" || filter.flowStatus === "clogged";

  if (daysLeft < 0 || flowWarning) {
    return {
      level: "danger",
      label: "掃除推奨",
      nextLabel,
      note: flowWarning ? "流量が落ちています。詰まりやろ材の汚れを確認しましょう。" : "掃除目安を過ぎています。水換え時に確認しましょう。",
    };
  }

  if (daysLeft <= 3) {
    return {
      level: "watch",
      label: "そろそろ",
      nextLabel,
      note: "次の水換えタイミングでフィルター掃除も確認しましょう。",
    };
  }

  return {
    level: "ready",
    label: "良好",
    nextLabel,
    note: "フィルター管理は予定内です。",
  };
}

function getFilterFlowLabel(value) {
  const labels = {
    normal: "正常",
    weak: "弱い",
    clogged: "詰まり気味",
    unchecked: "未確認",
  };
  return labels[value] || labels.unchecked;
}

function applyFilterLogToTank(tank, log) {
  if (log.type !== "フィルター掃除") {
    return;
  }

  const filter = normalizeTankFilter(tank.filter);
  tank.filter = {
    ...filter,
    lastCleanedAt: getDateKey(new Date(log.createdAt)),
    flowStatus: "normal",
    note: log.note && log.note !== "水槽の状態を記録しました。" ? log.note : filter.note || "フィルター掃除を記録済み",
  };
  updateFilterCareReminderAfterCleaning(tank.filter.lastCleanedAt);

  if (getDateKey(new Date(log.createdAt)) === getDateKey(new Date())) {
    state.tasks.filterCare = true;
    state.taskDate = getDateKey(new Date());
  }
}

function updateFilterCareReminderAfterCleaning(cleanedDateKey) {
  if (!isValidDateKey(cleanedDateKey)) {
    return;
  }

  state.reminders.filterCare = normalizeReminder(
    {
      ...state.reminders.filterCare,
      startDate: cleanedDateKey,
      lastNotifiedOn: null,
    },
    defaultReminders.filterCare,
    "filterCare",
  );
}

function getGuideSearchItems() {
  return [...document.querySelectorAll("[data-guide-kind]")].map((card, index) => {
    const title = card.querySelector("h2")?.textContent || "ガイド";
    const tag = card.querySelector(".chip")?.textContent || "ガイド";
    const text = card.querySelector("p")?.textContent || "";
    const id = `${card.dataset.guideKind}-${index}`;
    card.dataset.guideSearchId = id;

    return {
      type: "guide",
      id,
      label: tag,
      title,
      description: text,
      text: [title, tag, text].join(" "),
    };
  });
}

function openSearchResult(type, id) {
  if (type === "tank") {
    state.activeTankId = id;
    activeAlbumMonth = "all";
    highlightedSearchResult = { type, id };
    saveState();
    renderApp();
    showView("tanks");
    flashSearchResult();
  }

  if (type === "post") {
    const post = state.posts.find((item) => item.id === id);
    if (post) {
      state.activeTankId = post.tankId || state.activeTankId;
      postTankFilter.value = "all";
      highlightedSearchResult = { type, id };
      saveState();
      renderApp();
      showView("community");
      flashSearchResult();
    }
  }

  if (type === "guide") {
    highlightedSearchResult = { type, id };
    document.querySelector('[data-guide-filter="all"]')?.click();
    document.querySelector(`[data-guide-search-id="${escapeCssIdentifier(id)}"]`)?.setAttribute("data-search-highlight", "");
    showView("guide");
    flashSearchResult();
  }

  globalSearchInput.value = "";
  clearSearchResults();
}

function clearSearchResults() {
  searchResults.hidden = true;
  searchResults.innerHTML = "";
}

function flashSearchResult() {
  window.requestAnimationFrame(() => {
    const target = document.querySelector("[data-search-highlight]");
    if (!target) {
      highlightedSearchResult = null;
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      target.removeAttribute("data-search-highlight");
      highlightedSearchResult = null;
    }, 1800);
  });
}

async function setPendingPostMedia(file) {
  const media = await preparePostMedia(file);
  pendingPostMediaType = media.type;
  pendingPostImageDataUrl = media.imageDataUrl;
  pendingPostVideoDataUrl = media.videoDataUrl;
  pendingPostVideoThumbnailDataUrl = media.videoThumbnailDataUrl || null;
  pendingPostVideoDuration = media.videoDuration || null;
}

function clearPendingPostMedia() {
  pendingPostMediaType = null;
  pendingPostImageDataUrl = null;
  pendingPostVideoDataUrl = null;
  pendingPostVideoThumbnailDataUrl = null;
  pendingPostVideoDuration = null;
  renderPostImagePreview();
}

async function preparePostMedia(file) {
  if (file.type.startsWith("image/")) {
    return {
      type: "image",
      imageDataUrl: await resizeImageFile(file, 1200, 0.82),
      videoDataUrl: null,
      videoThumbnailDataUrl: null,
      videoDuration: null,
    };
  }

  if (file.size > VIDEO_UPLOAD_LIMIT_BYTES) {
    throw new Error("Video file is too large for local prototype storage.");
  }

  const videoDataUrl = await readFileAsDataUrl(file);
  const [videoDuration, videoThumbnailDataUrl] = await Promise.all([
    getVideoDuration(videoDataUrl),
    getVideoThumbnail(videoDataUrl),
  ]);

  return {
    type: "video",
    imageDataUrl: null,
    videoDataUrl,
    videoThumbnailDataUrl,
    videoDuration,
  };
}

function applyPostMedia(post, media) {
  post.mediaType = media.type;
  post.imageDataUrl = media.imageDataUrl || null;
  post.videoDataUrl = media.videoDataUrl || null;
  post.videoThumbnailDataUrl = media.videoThumbnailDataUrl || null;
  post.videoDuration = media.videoDuration || null;
  post.mediaCloudId = null;
  post.mediaStoragePath = null;
  post.mediaThumbnailPath = null;
  post.mediaStorageSignature = null;
  post.mediaUrl = null;
  post.mediaThumbnailUrl = null;
}

function isSupportedPostMedia(file) {
  return file.type.startsWith("image/") || file.type.startsWith("video/");
}

function renderPostImagePreview() {
  const editingPost = state.posts.find((post) => post.id === editingPostId);
  const previewVideo = pendingPostVideoDataUrl || (editingPost ? getPostVideoSrc(editingPost) : null);
  const previewImage = pendingPostImageDataUrl || (editingPost ? getPostImageSrc(editingPost) : null);

  if (previewVideo) {
    postImagePreview.removeAttribute("style");
    postImagePreview.innerHTML = `
      <video src="${escapeAttribute(previewVideo)}" muted playsinline controls></video>
      <b class="media-badge preview-badge">${formatVideoDuration(pendingPostVideoDuration || editingPost?.videoDuration)}</b>
    `;
    postImagePreview.classList.add("has-image", "has-video");
    return;
  }

  if (!previewImage) {
    postImagePreview.removeAttribute("style");
    postImagePreview.innerHTML = `<span>${editingPost ? "写真・動画を選ぶと差し替え" : "写真・動画プレビュー"}</span>`;
    postImagePreview.classList.remove("has-image", "has-video");
    return;
  }

  postImagePreview.style.backgroundImage = `url("${previewImage}")`;
  postImagePreview.innerHTML = "";
  postImagePreview.classList.add("has-image");
  postImagePreview.classList.remove("has-video");
}

function renderTankList() {
  tankList.innerHTML = state.tanks
    .map((tank) => {
      const latestLog = tank.logs[0];
      const status = getLogBasedStatus(latestLog, tank.logs.find((log) => log.type === "水換え"));
      const highlight = highlightedSearchResult?.type === "tank" && highlightedSearchResult.id === tank.id;
      return `
        <button class="tank-card ${tank.id === state.activeTankId ? "is-active" : ""}" type="button" data-tank-id="${escapeHtml(tank.id)}" ${highlight ? "data-search-highlight" : ""}>
          <span>${escapeHtml(tank.kind)}</span>
          <strong>${escapeHtml(tank.name)}</strong>
          <small>${latestLog ? `${formatRelativeDate(latestLog.createdAt)}に${escapeHtml(latestLog.type)}` : "記録待ち"} / ${escapeHtml(status.status)}</small>
        </button>
      `;
    })
    .join("");

  document.querySelectorAll("[data-tank-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTankId = button.dataset.tankId;
      activeAlbumMonth = "all";
      saveState();
      renderApp();
    });
  });
}

function renderTankProfile() {
  const tank = getActiveTank();
  const aquariumVisual = document.querySelector(".aquarium-visual");
  const featuredPost = state.posts.find((post) => post.id === tank.featuredPostId && getPostThumbnailSrc(post));
  const featuredImage = featuredPost ? getPostThumbnailSrc(featuredPost) : null;

  aquariumVisual.classList.toggle("has-cover", Boolean(featuredImage));
  aquariumVisual.style.backgroundImage = featuredImage ? `url("${featuredImage}")` : "";
  document.querySelector("#tank-profile-name").textContent = tank.name;
  document.querySelector("#tank-profile-detail").textContent = `${tank.kind} / ${tank.size} / ${tank.volume}`;
  document.querySelector("#tank-detail-grid").innerHTML = getTankDetailItems(tank)
    .map(
      (item) => `
        <article>
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
        </article>
      `,
    )
    .join("");
  renderFilterStatusPanel(tank);
  document.querySelector("#tank-profile-tags").innerHTML = tank.tags
    .map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`)
    .join("");

  document.querySelector("#edit-tank-name").value = tank.name;
  document.querySelector("#edit-tank-kind").value = tank.kind;
  document.querySelector("#edit-tank-size").value = tank.size;
  document.querySelector("#edit-tank-volume").value = tank.volume;
  setSpeciesListValues("edit-tank-species-list", getTankResidentValue(tank));
  setSpeciesListValues("edit-tank-equipment-list", tank.equipment || "");
  setFilterFormValue("edit-tank", tank.filter);
  document.querySelector("#edit-tank-tags").value = tank.tags.join(", ");
  document.querySelector("#delete-tank-button").disabled = state.tanks.length <= 1;
}

function renderFilterStatusPanel(tank) {
  const panel = document.querySelector("#filter-status-panel");
  if (!panel) {
    return;
  }

  const filter = normalizeTankFilter(tank.filter);
  const status = getFilterMaintenanceStatus(filter);
  const latestFilterLog = tank.logs.find((log) => log.type === "フィルター掃除");
  panel.className = `filter-status-panel ${escapeHtml(status.level)}`;
  panel.innerHTML = `
    <div class="section-head">
      <div>
        <p class="eyebrow">Filter care</p>
        <h3>フィルター管理</h3>
      </div>
      <span class="filter-status-chip">${escapeHtml(status.label)}</span>
    </div>
    <div class="filter-status-grid">
      <article>
        <span>種類</span>
        <strong>${escapeHtml(filter.type || "未設定")}</strong>
      </article>
      <article>
        <span>前回掃除</span>
        <strong>${escapeHtml(filter.lastCleanedAt ? formatAlbumDate(filter.lastCleanedAt) : "未記録")}</strong>
      </article>
      <article>
        <span>次回目安</span>
        <strong>${escapeHtml(status.nextLabel)}</strong>
      </article>
      <article>
        <span>流量</span>
        <strong>${escapeHtml(getFilterFlowLabel(filter.flowStatus))}</strong>
      </article>
      <article>
        <span>最新ログ</span>
        <strong>${escapeHtml(latestFilterLog ? formatRelativeDate(latestFilterLog.createdAt) : "未記録")}</strong>
      </article>
    </div>
    <p>${escapeHtml(filter.note || status.note)}</p>
  `;
}

function renderTimeline() {
  const tank = getActiveTank();

  if (!tank.logs.length) {
    timeline.innerHTML = '<p class="empty-state">まだ記録がありません。水温やpHを入力すると、この水槽のログとして残ります。</p>';
    return;
  }

  timeline.innerHTML = tank.logs
    .map(
      (log) => `
        <article>
          <time>${formatRelativeDate(log.createdAt)}</time>
          <strong>${escapeHtml(log.type)} / ${escapeHtml(log.temp)}°C / pH ${escapeHtml(log.ph)}</strong>
          <p>${escapeHtml(log.note)}</p>
        </article>
      `,
    )
    .join("");
}

function renderPosts() {
  const posts = getFilteredCommunityPosts();

  if (!posts.length) {
    postGrid.innerHTML =
      '<p class="empty-state full-field">条件に合う投稿はまだありません。検索条件を変えるか、写真を投稿して最初の記録を残しましょう。</p>';
    return;
  }

  postGrid.innerHTML = posts
    .map(
      (post) => {
        const likeLabel = post.likedByCurrentUser ? "いいね済み" : "いいね";
        const likedClass = post.likedByCurrentUser ? " is-liked" : "";

        return `
        <article class="post-card" ${highlightedSearchResult?.type === "post" && highlightedSearchResult.id === post.id ? "data-search-highlight" : ""}>
          ${renderPostImage(post)}
          <div class="post-body">
            <div class="post-meta-row">
              <span class="chip">${escapeHtml(post.tag)}</span>
              <small>${escapeHtml(getTankName(post.tankId))} / ${getPostMediaLabel(post)}</small>
            </div>
            <h2>${escapeHtml(post.title)}</h2>
            <p>${escapeHtml(post.text)}</p>
            ${renderPostComments(post)}
            <div class="post-actions">
              <button class="like-button${likedClass}" type="button" data-like-id="${escapeHtml(post.id)}">${likeLabel} <span>${getDisplayLikes(post)}</span></button>
              <span class="comment-count">${getDisplayCommentCount(post)}件のコメント</span>
              <button class="text-button" type="button" data-analyze-post="${escapeHtml(post.id)}">AI分析へ</button>
              <button class="text-button" type="button" data-view-media="${escapeHtml(post.id)}">詳細</button>
              <button class="text-button" type="button" data-edit-post="${escapeHtml(post.id)}">編集</button>
              <button class="text-button" type="button" data-feature-post="${escapeHtml(post.id)}">表紙にする</button>
              <button class="text-button" type="button" data-replace-post="${escapeHtml(post.id)}">メディア変更</button>
              <button class="text-button danger-text" type="button" data-delete-post="${escapeHtml(post.id)}">削除</button>
            </div>
          </div>
        </article>
      `;
      },
    )
    .join("");

  bindPostActions(postGrid);
}

function getFilteredCommunityPosts() {
  const filter = postTankFilter.value;
  const tagQuery = normalizeSearchTerm(communityTagSearch.value);
  const sort = communitySortSelect.value;
  const filteredPosts = state.posts.filter((post) => {
    const matchesTank = filter === "all" || post.tankId === filter;
    const searchableText = [
      post.title,
      post.tag,
      post.text,
      getTankName(post.tankId),
      ...post.comments.map((comment) => comment.text),
    ].join(" ");
    const matchesTag = !tagQuery || normalizeSearchTerm(searchableText).includes(tagQuery);
    return matchesTank && matchesTag;
  });

  return sortCommunityPosts(filteredPosts, sort);
}

function sortCommunityPosts(posts, sort) {
  return [...posts].sort((a, b) => {
    if (sort === "popular") {
      const scoreOrder = getPostRankingScore(b) - getPostRankingScore(a);
      if (scoreOrder !== 0) {
        return scoreOrder;
      }
    }

    if (sort === "comments") {
      const commentOrder = getDisplayCommentCount(b) - getDisplayCommentCount(a);
      if (commentOrder !== 0) {
        return commentOrder;
      }
    }

    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });
}

function renderPostComments(post) {
  const comments = post.comments.slice(-2);
  const commentList = comments.length
    ? comments
        .map(
          (comment) => `
            <li>
              <strong>${escapeHtml(comment.author)}</strong>
              <span>${escapeHtml(comment.text)}</span>
            </li>
          `,
        )
        .join("")
    : '<li class="empty-comment">まだコメントはありません</li>';

  return `
    <div class="comment-panel">
      <ul>${commentList}</ul>
      <form class="comment-form" data-comment-form="${escapeHtml(post.id)}">
        <input type="text" name="comment" placeholder="コメントを書く" aria-label="${escapeHtml(post.title)}にコメント">
        <button type="submit">送信</button>
      </form>
    </div>
  `;
}

function addPostComment(postId, text) {
  const commentText = String(text || "").trim();
  const post = state.posts.find((item) => item.id === postId);

  if (!post || !commentText) {
    showToast("コメントを入力してください");
    return;
  }

  post.comments.push({
    id: createId("comment"),
    author: state.account.name || defaultState.account.name,
    text: commentText.slice(0, 120),
    createdAt: new Date().toISOString(),
  });
  saveState();
  renderPosts();
  renderCommunityRanking();
  renderTankPosts();
  showToast("コメントを追加しました");

  if (authSession?.user) {
    syncCommunityToSupabase({ silent: true });
  }
}

function renderCommunityRanking() {
  const rankedPosts = [...state.posts]
    .sort((a, b) => {
      const scoreOrder = getPostRankingScore(b) - getPostRankingScore(a);
      if (scoreOrder !== 0) {
        return scoreOrder;
      }

      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    })
    .slice(0, 5);

  if (!rankedPosts.length) {
    communityRankingList.innerHTML = '<p class="empty-state">投稿が増えるとランキングが表示されます。</p>';
    return;
  }

  communityRankingList.innerHTML = rankedPosts
    .map(
      (post, index) => `
        <button type="button" data-ranking-post="${escapeHtml(post.id)}">
          <span>${index + 1}</span>
          <strong>${escapeHtml(post.title)}</strong>
          <small>${escapeHtml(post.tag)} / いいね ${getDisplayLikes(post)} / コメント ${getDisplayCommentCount(post)}</small>
        </button>
      `,
    )
    .join("");

  communityRankingList.querySelectorAll("[data-ranking-post]").forEach((button) => {
    button.addEventListener("click", () => {
      const post = state.posts.find((item) => item.id === button.dataset.rankingPost);
      if (!post) {
        return;
      }

      postTankFilter.value = "all";
      communityTagSearch.value = "";
      communitySortSelect.value = "popular";
      highlightedSearchResult = { type: "post", id: post.id };
      renderPosts();
      showView("community");
      flashSearchResult();
    });
  });
}

function getPostRankingScore(post) {
  const remoteScore = Number(post.rankingScore);
  if (hasStoredNumber(post.rankingScore) && Number.isFinite(remoteScore)) {
    return remoteScore;
  }

  return getDisplayLikes(post) + getDisplayCommentCount(post) * 3;
}

function getDisplayLikes(post) {
  const remoteLikes = Number(post.cloudLikes);
  if (hasStoredNumber(post.cloudLikes) && Number.isFinite(remoteLikes)) {
    return remoteLikes;
  }

  return Math.max(0, Number(post.likes || 0));
}

function getDisplayCommentCount(post) {
  const remoteCount = Number(post.cloudCommentsCount);
  if (hasStoredNumber(post.cloudCommentsCount) && Number.isFinite(remoteCount)) {
    return remoteCount;
  }

  return Array.isArray(post.comments) ? post.comments.length : 0;
}

function hasStoredNumber(value) {
  return value !== null && value !== undefined && value !== "";
}

async function handlePostLike(postId) {
  let post = state.posts.find((item) => item.id === postId);
  if (!post) {
    return;
  }

  if (!supabaseClient || !authSession?.user) {
    incrementLocalPostLike(post);
    return;
  }

  if (!post.cloudId) {
    const synced = await syncCloudState({ silent: true });
    post = state.posts.find((item) => item.id === postId);
    if (!synced || !post?.cloudId) {
      incrementLocalPostLike(post);
      showToast("ローカルでいいねを記録しました");
      return;
    }
  }

  const profileSynced = await syncProfileToSupabase({ silent: true });
  if (!profileSynced) {
    showToast("プロフィール同期後にもう一度お試しください");
    return;
  }

  const wasLiked = Boolean(post.likedByCurrentUser);
  const request = wasLiked
    ? supabaseClient
        .from("post_likes")
        .delete()
        .eq("post_id", post.cloudId)
        .eq("user_id", authSession.user.id)
    : supabaseClient.from("post_likes").upsert(
        {
          post_id: post.cloudId,
          user_id: authSession.user.id,
        },
        { onConflict: "post_id,user_id" },
      );

  const { error } = await request;
  if (error) {
    showToast(error.message || "いいねを同期できませんでした");
    return;
  }

  post.likedByCurrentUser = !wasLiked;
  post.cloudLikes = Math.max(0, getDisplayLikes(post) + (wasLiked ? -1 : 1));
  post.rankingScore = post.cloudLikes + getDisplayCommentCount(post) * 3;

  await loadPostStatsFromSupabase([post.cloudId]);
  await loadPostLikesFromSupabase([post.cloudId]);
  saveState({ keepSyncStatus: true });
  renderPosts();
  renderCommunityRanking();
  renderTankPosts();
  renderTankAlbum();
  showToast(wasLiked ? "いいねを取り消しました" : "いいねしました");
}

function incrementLocalPostLike(post) {
  if (!post) {
    return;
  }

  const nextLikes = getDisplayLikes(post) + 1;
  post.likes = nextLikes;
  if (hasStoredNumber(post.cloudLikes) && Number.isFinite(Number(post.cloudLikes))) {
    post.cloudLikes = nextLikes;
    post.rankingScore = nextLikes + getDisplayCommentCount(post) * 3;
  }
  saveState();
  renderPosts();
  renderCommunityRanking();
  renderTankPosts();
  renderTankAlbum();
}

function clearCurrentUserLikes() {
  state.posts.forEach((post) => {
    post.likedByCurrentUser = false;
  });
}

function bindPostActions(root) {
  root.querySelectorAll("[data-like-id]").forEach((button) => {
    button.addEventListener("click", () => handlePostLike(button.dataset.likeId));
  });

  root.querySelectorAll("[data-comment-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      addPostComment(form.dataset.commentForm, new FormData(form).get("comment"));
    });
  });

  root.querySelectorAll("[data-analyze-post]").forEach((button) => {
    button.addEventListener("click", () => analyzePostImage(button.dataset.analyzePost));
  });

  root.querySelectorAll("[data-view-media]").forEach((button) => {
    button.addEventListener("click", () => openMediaDetail(button.dataset.viewMedia));
  });

  root.querySelectorAll("[data-album-move]").forEach((button) => {
    button.addEventListener("click", () => moveAlbumPost(button.dataset.albumMove, Number(button.dataset.albumDirection)));
  });

  root.querySelectorAll("[data-feature-post]").forEach((button) => {
    button.addEventListener("click", () => featurePost(button.dataset.featurePost));
  });

  root.querySelectorAll("[data-edit-post]").forEach((button) => {
    button.addEventListener("click", () => openPostModal(button.dataset.editPost));
  });

  root.querySelectorAll("[data-replace-post]").forEach((button) => {
    button.addEventListener("click", () => {
      replacingPostId = button.dataset.replacePost;
      replacePostImageInput.click();
    });
  });

  root.querySelectorAll("[data-delete-post]").forEach((button) => {
    button.addEventListener("click", () => deletePost(button.dataset.deletePost));
  });
}

function renderTankPosts() {
  const tank = getActiveTank();
  const posts = state.posts.filter((post) => post.tankId === tank.id).slice(0, 3);

  if (!posts.length) {
    tankPostList.innerHTML = '<p class="empty-state">まだ投稿がありません。この水槽の写真を投稿するとここに表示されます。</p>';
    return;
  }

  tankPostList.innerHTML = posts
    .map(
      (post) => `
        <article class="linked-post">
          ${renderPostImage(post)}
          <div>
            <span>${escapeHtml(post.tag)}</span>
            <strong>${escapeHtml(post.title)}</strong>
            <small>いいね ${getDisplayLikes(post)} / コメント ${getDisplayCommentCount(post)} / ${getPostMediaLabel(post)}</small>
            <div class="linked-actions">
              <button class="text-button" type="button" data-analyze-post="${escapeHtml(post.id)}">AI分析へ</button>
              <button class="text-button" type="button" data-view-media="${escapeHtml(post.id)}">詳細</button>
              <button class="text-button" type="button" data-edit-post="${escapeHtml(post.id)}">編集</button>
              <button class="text-button" type="button" data-feature-post="${escapeHtml(post.id)}">表紙</button>
              <button class="text-button" type="button" data-replace-post="${escapeHtml(post.id)}">メディア</button>
              <button class="text-button danger-text" type="button" data-delete-post="${escapeHtml(post.id)}">削除</button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  bindPostActions(tankPostList);
}

function renderTankAlbum() {
  const tank = getActiveTank();
  const tankMediaPosts = state.posts.filter((post) => post.tankId === tank.id && hasPostMedia(post));
  ensureTankAlbumOrder(tank, tankMediaPosts);
  const monthOptions = getAlbumMonthOptions(tankMediaPosts);
  const allPosts = sortAlbumPosts(tankMediaPosts, tank);

  albumMonthFilter.innerHTML = [
    '<option value="all">すべて</option>',
    ...monthOptions.map((month) => `<option value="${escapeHtml(month.key)}">${escapeHtml(month.label)}</option>`),
  ].join("");

  if (activeAlbumMonth !== "all" && !monthOptions.some((month) => month.key === activeAlbumMonth)) {
    activeAlbumMonth = "all";
  }

  albumMonthFilter.value = activeAlbumMonth;
  albumSortSelect.value = activeAlbumSort;

  const posts =
    activeAlbumMonth === "all" ? allPosts : allPosts.filter((post) => getMonthKey(post.createdAt) === activeAlbumMonth);

  albumCountLabel.textContent = `${posts.length}件`;

  if (!posts.length) {
    tankAlbumGrid.innerHTML =
      allPosts.length === 0
        ? '<p class="empty-state">写真・動画つき投稿を追加すると、この水槽のアルバムとして並びます。</p>'
        : '<p class="empty-state">この月の写真・動画はありません。表示を「すべて」に戻すと確認できます。</p>';
    return;
  }

  tankAlbumGrid.innerHTML = posts
    .map(
      (post) => {
        const albumImage = getPostThumbnailSrc(post);
        const hasVideo = Boolean(getPostVideoSrc(post) || post.mediaType === "video");
        const manualControls =
          activeAlbumSort === "manual"
            ? `
              <div class="album-manual-controls" aria-label="${escapeHtml(post.title)}の並び替え">
                <button type="button" data-album-move="${escapeHtml(post.id)}" data-album-direction="-1">上へ</button>
                <button type="button" data-album-move="${escapeHtml(post.id)}" data-album-direction="1">下へ</button>
              </div>
            `
            : "";
        return `
        <article class="album-tile-shell">
          <button class="album-tile ${hasVideo ? "has-video" : ""} ${post.id === tank.featuredPostId ? "is-featured" : ""}" type="button" data-view-media="${escapeHtml(post.id)}" ${albumImage ? `style="background-image: url('${escapeAttribute(albumImage)}')"` : ""}>
            ${post.id === tank.featuredPostId ? "<small>表紙</small>" : ""}
            ${hasVideo ? `<b class="media-badge">${formatVideoDuration(post.videoDuration)}</b>` : ""}
            <span>${escapeHtml(post.title)}</span>
            <time>${formatAlbumDate(post.createdAt)}</time>
          </button>
          ${manualControls}
        </article>
      `;
      },
    )
    .join("");

  bindPostActions(tankAlbumGrid);
}

function renderPostImage(post) {
  const videoSrc = getPostVideoSrc(post);
  const imageSrc = getPostImageSrc(post);
  const thumbnailSrc = getPostThumbnailSrc(post);

  if (videoSrc) {
    const poster = thumbnailSrc ? ` poster="${escapeAttribute(thumbnailSrc)}"` : "";
    return `
      <div class="post-image custom-video">
        <video src="${escapeAttribute(videoSrc)}" controls muted playsinline preload="metadata"${poster}></video>
        <b class="media-badge">${formatVideoDuration(post.videoDuration)}</b>
      </div>
    `;
  }

  if (imageSrc) {
    return `<div class="post-image custom-photo" style="background-image: url('${escapeAttribute(imageSrc)}')"></div>`;
  }

  return `<div class="post-image ${escapeHtml(post.imageClass)}"></div>`;
}

function hasPostMedia(post) {
  return Boolean(getPostImageSrc(post) || getPostVideoSrc(post) || post.mediaStoragePath);
}

function getPostMediaLabel(post) {
  if (getPostVideoSrc(post) || post.mediaType === "video") {
    return `動画 ${formatVideoDuration(post.videoDuration)}`;
  }

  if (getPostImageSrc(post) || post.mediaType === "image") {
    return "写真";
  }

  return "サンプル";
}

function getPostImageSrc(post) {
  if (post.mediaType === "image" && post.mediaUrl) {
    return post.mediaUrl;
  }

  return post.imageDataUrl || null;
}

function getPostVideoSrc(post) {
  if (post.mediaType === "video" && post.mediaUrl) {
    return post.mediaUrl;
  }

  return post.videoDataUrl || null;
}

function getPostThumbnailSrc(post) {
  if (post.mediaType === "video") {
    return post.mediaThumbnailUrl || post.videoThumbnailDataUrl || null;
  }

  return getPostImageSrc(post);
}

function getAlbumMonthOptions(posts) {
  const monthMap = new Map();

  posts.forEach((post) => {
    const key = getMonthKey(post.createdAt);
    if (!key || monthMap.has(key)) {
      return;
    }

    monthMap.set(key, {
      key,
      label: formatMonthLabel(post.createdAt),
    });
  });

  return [...monthMap.values()].sort((a, b) => b.key.localeCompare(a.key));
}

function sortAlbumPosts(posts, tank) {
  return [...posts].sort((a, b) => {
    if (activeAlbumSort === "manual") {
      const order = Array.isArray(tank.albumOrder) ? tank.albumOrder : [];
      const aIndex = order.indexOf(a.id);
      const bIndex = order.indexOf(b.id);
      if (aIndex !== -1 || bIndex !== -1) {
        return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) - (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
      }
    }

    if (activeAlbumSort === "featured") {
      const featuredOrder = Number(b.id === tank.featuredPostId) - Number(a.id === tank.featuredPostId);
      if (featuredOrder !== 0) {
        return featuredOrder;
      }
    }

    if (activeAlbumSort === "oldest") {
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    }

    if (activeAlbumSort === "likes") {
      const likeOrder = getDisplayLikes(b) - getDisplayLikes(a);
      if (likeOrder !== 0) {
        return likeOrder;
      }
    }

    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });
}

function ensureTankAlbumOrder(tank, posts = state.posts.filter((post) => post.tankId === tank.id && hasPostMedia(post))) {
  const postIds = posts.map((post) => post.id);
  const existingOrder = Array.isArray(tank.albumOrder) ? tank.albumOrder : [];
  const orderedIds = existingOrder.filter((id) => postIds.includes(id));
  const missingIds = posts
    .filter((post) => !orderedIds.includes(post.id))
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .map((post) => post.id);

  tank.albumOrder = [...orderedIds, ...missingIds];
}

function addPostToTankAlbumOrder(post) {
  if (!hasPostMedia(post)) {
    return;
  }

  const tank = state.tanks.find((item) => item.id === post.tankId);
  if (!tank) {
    return;
  }

  ensureTankAlbumOrder(tank);
  tank.albumOrder = [post.id, ...tank.albumOrder.filter((id) => id !== post.id)];
}

function removePostFromTankAlbumOrder(tankId, postId) {
  const tank = state.tanks.find((item) => item.id === tankId);
  if (!tank || !Array.isArray(tank.albumOrder)) {
    return;
  }

  tank.albumOrder = tank.albumOrder.filter((id) => id !== postId);
}

function moveAlbumPost(postId, direction) {
  const tank = getActiveTank();
  const posts = state.posts.filter((post) => post.tankId === tank.id && hasPostMedia(post));
  ensureTankAlbumOrder(tank, posts);

  const index = tank.albumOrder.indexOf(postId);
  const nextIndex = index + direction;
  if (index === -1 || nextIndex < 0 || nextIndex >= tank.albumOrder.length) {
    return;
  }

  const [item] = tank.albumOrder.splice(index, 1);
  tank.albumOrder.splice(nextIndex, 0, item);
  activeAlbumSort = "manual";
  saveState();
  renderTankAlbum();
  showToast("アルバムの並びを更新しました");
}

function openMediaDetail(postId) {
  const post = state.posts.find((item) => item.id === postId);
  if (!post) {
    return;
  }

  const tank = state.tanks.find((item) => item.id === post.tankId);
  const videoSrc = getPostVideoSrc(post);
  const imageSrc = getPostImageSrc(post);
  const thumbnailSrc = getPostThumbnailSrc(post);
  const mediaMarkup = videoSrc
    ? `
      <div class="media-detail-frame has-video">
        <video src="${escapeAttribute(videoSrc)}" controls playsinline preload="metadata" ${thumbnailSrc ? `poster="${escapeAttribute(thumbnailSrc)}"` : ""}></video>
        <b class="media-badge">${formatVideoDuration(post.videoDuration)}</b>
      </div>
    `
    : imageSrc
      ? `<div class="media-detail-frame" style="background-image: url('${escapeAttribute(imageSrc)}')"></div>`
      : `<div class="media-detail-frame ${escapeHtml(post.imageClass || "reef")}"></div>`;

  mediaDetailBody.innerHTML = `
    <div class="media-detail-grid">
      ${mediaMarkup}
      <div class="media-detail-copy">
        <span class="chip">${escapeHtml(post.tag)}</span>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.text)}</p>
        <dl>
          <div>
            <dt>水槽・池</dt>
            <dd>${escapeHtml(tank?.name || "未設定")}</dd>
          </div>
          <div>
            <dt>投稿日</dt>
            <dd>${escapeHtml(formatFullDate(post.createdAt))}</dd>
          </div>
          <div>
            <dt>反応</dt>
            <dd>いいね ${getDisplayLikes(post)} / コメント ${getDisplayCommentCount(post)}</dd>
          </div>
          <div>
            <dt>メディア</dt>
            <dd>${escapeHtml(getPostMediaLabel(post))}</dd>
          </div>
        </dl>
        <div class="media-detail-actions">
          <button class="primary-button" type="button" data-detail-analyze="${escapeHtml(post.id)}">AI分析へ</button>
          <button class="ghost-button" type="button" data-detail-feature="${escapeHtml(post.id)}">表紙にする</button>
          <button class="text-button" type="button" data-detail-edit="${escapeHtml(post.id)}">編集</button>
        </div>
      </div>
    </div>
  `;

  mediaDetailBody.querySelector("[data-detail-analyze]").addEventListener("click", () => {
    closeMediaDetailModal();
    analyzePostImage(post.id);
  });

  mediaDetailBody.querySelector("[data-detail-feature]").addEventListener("click", () => {
    closeMediaDetailModal();
    featurePost(post.id);
  });

  mediaDetailBody.querySelector("[data-detail-edit]").addEventListener("click", () => {
    closeMediaDetailModal();
    openPostModal(post.id);
  });

  mediaDetailModal.classList.add("is-open");
  mediaDetailModal.setAttribute("aria-hidden", "false");
}

function closeMediaDetailModal() {
  mediaDetailModal.classList.remove("is-open");
  mediaDetailModal.setAttribute("aria-hidden", "true");
  mediaDetailBody.innerHTML = "";
}

function featurePost(postId) {
  const post = state.posts.find((item) => item.id === postId);
  if (!post) {
    return;
  }

  if (!getPostThumbnailSrc(post)) {
    showToast("写真またはサムネイル付き動画を表紙にできます");
    return;
  }

  const tank = state.tanks.find((item) => item.id === post.tankId);
  if (!tank) {
    return;
  }

  tank.featuredPostId = post.id;
  state.activeTankId = tank.id;
  saveState();
  renderApp();
  showToast("水槽アルバムの表紙にしました");
}

function deletePost(postId) {
  const post = state.posts.find((item) => item.id === postId);
  if (!post) {
    return;
  }

  if (!confirm(`${post.title} を削除しますか？`)) {
    return;
  }

  state.posts = state.posts.filter((item) => item.id !== postId);
  state.tanks.forEach((tank) => {
    if (tank.featuredPostId === postId) {
      tank.featuredPostId = null;
    }
    removePostFromTankAlbumOrder(tank.id, postId);
  });
  saveState();
  renderApp();
  showToast("投稿を削除しました");
}

async function analyzePostImage(postId) {
  const post = state.posts.find((item) => item.id === postId);
  if (!post) {
    return;
  }

  state.activeTankId = post.tankId || state.activeTankId;
  const tank = getActiveTank();
  const fallbackResult = analyzePostPhoto(post);
  const result = await analyzePostWithApi({ post, tank, fallbackResult });
  const aiResult = createAiResultState(result);

  post.latestAi = aiResult;
  tank.latestAi = aiResult;

  saveState();
  renderApp();
  renderAiResult(result, post);
  showView("ai");
  showToast(getPostVideoSrc(post) ? "動画投稿の確認画面を開きました" : "投稿写真をAI分析に送りました");

  if (authSession?.user) {
    await syncCloudState({ silent: true });
  }
}

async function analyzeTankWithApi({ tank, water, fish, algae, days, fallbackResult }) {
  const latestLog = tank.logs[0] || null;
  return requestAiAnalysis(
    {
      tank: getAiTankPayload(tank),
      log: {
        water,
        fish,
        algae,
        days,
        latestTemp: latestLog?.temp,
        latestPh: latestLog?.ph,
        latestNote: latestLog?.note,
      },
    },
    fallbackResult,
  );
}

async function analyzePostWithApi({ post, tank, fallbackResult }) {
  if (getPostVideoSrc(post) || post.mediaType === "video" || (!getPostImageSrc(post) && post.mediaType !== "image")) {
    return fallbackResult;
  }

  return requestAiAnalysis(
    {
      tank: getAiTankPayload(tank),
      post: {
        title: post.title,
        text: post.text,
        tag: post.tag,
        mediaType: post.mediaType || "image",
        imageDataUrl: post.imageDataUrl || null,
        imageUrl: post.mediaUrl || null,
      },
    },
    fallbackResult,
  );
}

async function handleTankIdentifyPhotoChange() {
  const file = tankIdentifyPhotoInput.files?.[0];
  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    showToast("画像ファイルを選んでください");
    resetTankIdentifyAssist();
    return;
  }

  try {
    pendingTankIdentifyImageDataUrl = await resizeImageFile(file, 1000, 0.82);
    renderTankIdentifyPreview();
    tankIdentifyStatus.textContent = "写真から名前候補を確認しています...";

    const result = await identifyTankResidentsWithApi({
      imageDataUrl: pendingTankIdentifyImageDataUrl,
      tankName: document.querySelector("#tank-name-input").value.trim(),
      tankKind: document.querySelector("#tank-kind-input").value,
    });

    applyTankResidentCandidates(result);
  } catch (error) {
    tankIdentifyStatus.textContent = "写真を読み込めませんでした。別の写真で試してください。";
    showToast(error.message || "写真を読み込めませんでした");
  } finally {
    tankIdentifyPhotoInput.value = "";
  }
}

async function identifyTankResidentsWithApi({ imageDataUrl, tankName, tankKind }) {
  const fallbackResult = getLocalTankResidentCandidates(tankKind);

  if (location.protocol === "file:") {
    return fallbackResult;
  }

  try {
    const response = await fetch(AI_ANALYSIS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identify: {
          imageDataUrl,
          tankName,
          tankKind,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return normalizeTankIdentificationResult(await response.json(), fallbackResult);
  } catch {
    return fallbackResult;
  }
}

function applyTankResidentCandidates(result) {
  const animals = Array.isArray(result.animals) ? result.animals : [];
  const plants = Array.isArray(result.plants) ? result.plants : [];
  const candidates = [...animals, ...plants];

  if (!candidates.length) {
    tankIdentifyStatus.textContent = "写真から名前を確定できませんでした。正面から明るく撮ると候補が出やすくなります。";
    return;
  }

  if (animals.length) {
    appendSpeciesValues("tank-species-list", animals);
  }

  if (plants.length) {
    appendSpeciesValues("tank-species-list", plants);
  }

  const sourceLabel = result.source === "local" ? "種類からの候補" : "写真からの候補";
  const confidenceLabel = result.source !== "local" && Number.isFinite(Number(result.confidence))
    ? ` / 信頼度${Math.round(Number(result.confidence) * 100)}%`
    : "";
  tankIdentifyStatus.textContent = `${sourceLabel}: ${candidates.join("、")}${confidenceLabel}`;
  showToast("生き物・水草の候補を入力しました");
}

function normalizeTankIdentificationResult(result, fallbackResult) {
  const fish = normalizeNameCandidates(result?.fish);
  const invertebrates = normalizeNameCandidates(result?.invertebrates);
  const plants = normalizeNameCandidates(result?.plants);
  const animals = mergeCommaValues("", [...fish, ...invertebrates]);
  const hasStructuredNames = [result?.fish, result?.invertebrates, result?.plants, result?.uncertain].some(Array.isArray);
  const fallbackAnimals = Array.isArray(fallbackResult.animals) ? fallbackResult.animals : [];
  const fallbackPlants = Array.isArray(fallbackResult.plants) ? fallbackResult.plants : [];

  return {
    animals: animals.length ? animals : hasStructuredNames ? [] : fallbackAnimals,
    plants: plants.length ? plants : hasStructuredNames ? [] : fallbackPlants,
    uncertain: normalizeNameCandidates(result?.uncertain),
    confidence: Number.isFinite(Number(result?.confidence)) ? Math.min(1, Math.max(0, Number(result.confidence))) : fallbackResult.confidence,
    summary: String(result?.summary || fallbackResult.summary || ""),
    source: result?.source || "ai",
  };
}

function getLocalTankResidentCandidates(tankKind) {
  const candidatesByKind = {
    メダカ鉢: { animals: ["メダカ"], plants: ["睡蓮", "浮草"] },
    池: { animals: ["メダカ", "金魚"], plants: ["睡蓮"] },
    水草水槽: { animals: [], plants: ["水草", "アヌビアス", "ミクロソリウム"] },
    熱帯魚水槽: { animals: ["熱帯魚", "ネオンテトラ"], plants: ["水草"] },
    海水水槽: { animals: ["海水魚"], plants: ["サンゴ"] },
  };
  const candidates = candidatesByKind[tankKind] || { animals: ["魚"], plants: ["水草"] };

  return {
    animals: candidates.animals,
    plants: candidates.plants,
    uncertain: [],
    confidence: 0,
    summary: "AI接続前のため、水槽の種類から候補を出しました。",
    source: "local",
  };
}

function normalizeNameCandidates(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .map((item) => item.replace(/[、,。]/g, ""))
    .filter((item) => item.length >= 2 && item.length <= 24)
    .slice(0, 8);
}

function mergeCommaValues(currentValue, candidates) {
  const values = [
    ...String(currentValue || "")
      .split(/[、,]/)
      .map((item) => item.trim())
      .filter(Boolean),
    ...candidates,
  ];
  return [...new Set(values)].slice(0, 12);
}

function getSpeciesListValue(listId) {
  return getSpeciesListValues(listId).join("、");
}

function getSpeciesListValues(listId) {
  const list = document.getElementById(listId);
  if (!list) {
    return [];
  }

  return [...list.querySelectorAll("input")]
    .map((input) => input.value.trim())
    .filter(Boolean);
}

function setSpeciesListValues(listId, value) {
  const list = document.getElementById(listId);
  if (!list) {
    return;
  }

  list.innerHTML = "";
  normalizeSpeciesValues(value).forEach((item) => addSpeciesRow(list, item));
  addSpeciesRow(list);
  updateSpeciesRemoveButtons(list);
}

function resetSpeciesList(listId) {
  setSpeciesListValues(listId, "");
}

function appendSpeciesValues(listId, candidates) {
  const nextValues = mergeCommaValues(getSpeciesListValue(listId), normalizeSpeciesValues(candidates));
  setSpeciesListValues(listId, nextValues);
}

function normalizeSpeciesValues(value) {
  const source = Array.isArray(value) ? value : String(value || "").split(/[、,\n]/);

  return [...new Set(
    source
      .map((item) => String(item || "").trim())
      .filter(Boolean),
  )].slice(0, 20);
}

function addSpeciesRow(list, value = "") {
  if (!list) {
    return document.createElement("div");
  }

  const row = document.createElement("div");
  row.className = "species-row";
  const input = document.createElement("input");
  input.type = "text";
  input.value = value;
  input.placeholder = list.dataset.placeholder || "例: メダカ";
  input.autocomplete = "off";

  const removeButton = document.createElement("button");
  removeButton.className = "icon-button species-remove-button";
  removeButton.type = "button";
  removeButton.setAttribute("aria-label", "この種類を削除");
  removeButton.title = "削除";
  removeButton.textContent = "×";

  input.addEventListener("input", () => {
    expandSpeciesRowsFromInput(list, row, input);
    updateSpeciesRemoveButtons(list);
  });

  removeButton.addEventListener("click", () => {
    row.remove();
    if (!list.querySelector(".species-row")) {
      addSpeciesRow(list);
    }
    updateSpeciesRemoveButtons(list);
  });

  row.append(input, removeButton);
  list.append(row);
  updateSpeciesRemoveButtons(list);
  return row;
}

function expandSpeciesRowsFromInput(list, row, input) {
  const values = normalizeSpeciesValues(input.value);
  if (values.length > 1) {
    input.value = values[0];
    values.slice(1).forEach((item) => addSpeciesRow(list, item));
  }

  if (input.value.trim() && row === list.lastElementChild) {
    addSpeciesRow(list);
  }

  const lastInput = list.lastElementChild?.querySelector("input");
  if (lastInput?.value.trim()) {
    addSpeciesRow(list);
  }
}

function updateSpeciesRemoveButtons(list) {
  const rows = [...list.querySelectorAll(".species-row")];
  rows.forEach((row) => {
    const input = row.querySelector("input");
    const button = row.querySelector("button");
    button.disabled = rows.length === 1 && !input.value.trim();
  });
}

function renderTankIdentifyPreview() {
  if (!pendingTankIdentifyImageDataUrl) {
    tankIdentifyPreview.removeAttribute("style");
    tankIdentifyPreview.classList.remove("has-image");
    tankIdentifyPreview.innerHTML = "<span>写真未選択</span>";
    return;
  }

  tankIdentifyPreview.style.backgroundImage = `url("${pendingTankIdentifyImageDataUrl}")`;
  tankIdentifyPreview.classList.add("has-image");
  tankIdentifyPreview.innerHTML = "";
}

function resetTankIdentifyAssist() {
  pendingTankIdentifyImageDataUrl = null;
  tankIdentifyPhotoInput.value = "";
  tankIdentifyStatus.textContent = "魚、生き物、水草が見える写真を選ぶと候補を入れます。";
  renderTankIdentifyPreview();
}

async function requestAiAnalysis(payload, fallbackResult) {
  if (location.protocol === "file:") {
    aiApiStatus.lastSource = "ローカル分析";
    renderAiApiStatus();
    return fallbackResult;
  }

  try {
    const response = await fetch(AI_ANALYSIS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const result = normalizeAiApiResult(await response.json(), fallbackResult);
    aiApiStatus.lastSource = "AI Gateway";
    aiApiStatus.model = result.model || aiApiStatus.model;
    aiApiStatus.promptVersion = result.promptVersion || aiApiStatus.promptVersion;
    aiApiStatus.gateway = result.source || aiApiStatus.gateway;
    aiApiStatus.imageAnalysis = result.imageAnalysis === "real-photo" ? "実写真対応" : aiApiStatus.imageAnalysis;
    aiApiStatus.configured = true;
    aiApiStatus.checkedAt = new Date().toISOString();
    renderAiApiStatus();
    recordAiEvaluation({ payload, result, fallbackResult, source: "AI Gateway" });
    return result;
  } catch (error) {
    aiApiStatus.lastSource = "ローカル分析";
    aiApiStatus.checkedAt = new Date().toISOString();
    renderAiApiStatus();
    recordAiEvaluation({ payload, result: fallbackResult, fallbackResult, source: "ローカル分析", error: error.message });
    showToast("AI APIに接続できないため、ローカル分析を表示しました");
    return fallbackResult;
  }
}

function recordAiEvaluation({ payload, result, fallbackResult, source, error = "" }) {
  const entry = {
    id: createId("ai-review"),
    createdAt: new Date().toISOString(),
    source,
    target: payload.post ? "投稿写真" : "水槽ログ",
    model: result.model || aiApiStatus.model || "未確認",
    promptVersion: result.promptVersion || aiApiStatus.promptVersion || "未確認",
    status: result.status,
    fallbackStatus: fallbackResult.status,
    summary: result.summary,
    fallbackSummary: fallbackResult.summary,
    difference: getAiResultDifference(result, fallbackResult, error),
    retakeTips: Array.isArray(result.retakeTips) ? result.retakeTips : [],
    note: getAiEvaluationInitialNote(payload, result),
    photoCondition: "unspecified",
    reviewLabel: "unreviewed",
    promptDraftRetestStatus: "none",
    promptDraftRetestedAt: null,
  };

  state.aiEvaluationLog = [entry, ...(state.aiEvaluationLog || [])].slice(0, 8);
  saveState();
  renderAiEvaluationLog();
}

function updateAiEvaluationReview(entryId, reviewLabel = null, photoCondition = null) {
  const item = state.aiEvaluationLog.find((entry) => entry.id === entryId);
  if (!item) {
    return;
  }

  if (reviewLabel) {
    item.reviewLabel = getAllowedValue(reviewLabel, ["unreviewed", "good", "needs_fix", "watch"], "unreviewed");
  }

  if (photoCondition) {
    item.photoCondition = getAllowedValue(photoCondition, ["unspecified", "normal", "dark", "small_fish", "algae", "reflection"], "unspecified");
  }

  saveState();
  renderAiEvaluationLog();
  if (authSession?.user) {
    scheduleAiEvaluationSync();
  }
}

function updateAiPromptDraftRetest(entryId, status) {
  const item = state.aiEvaluationLog.find((entry) => entry.id === entryId);
  if (!item) {
    return;
  }

  item.promptDraftRetestStatus = getAllowedValue(status, ["none", "retest_needed", "retested", "re_review_needed", "re_reviewed"], "none");
  item.promptDraftRetestedAt = ["retested", "re_reviewed"].includes(item.promptDraftRetestStatus) ? new Date().toISOString() : null;

  if (item.promptDraftRetestStatus === "retest_needed" && !String(item.note || "").includes("草案後再評価:")) {
    item.note = `${item.note ? `${item.note}\n` : ""}草案後再評価: プロンプト草案の反映後に、同じ撮影条件で出力を見直す。`;
  }

  if (item.promptDraftRetestStatus === "re_review_needed" && !String(item.note || "").includes("草案再強化後レビュー:")) {
    item.note = `${item.note ? `${item.note}\n` : ""}草案再強化後レビュー: 再評価要再調整メモを反映した草案で、出力をもう一度見直す。`;
  }

  saveState();
  renderAiEvaluationLog();
  if (authSession?.user) {
    scheduleAiEvaluationSync();
  }
  showToast(getAiPromptDraftRetestToast(item.promptDraftRetestStatus));
}

function getAiEvaluationInitialNote(payload, result) {
  if (!payload.post) {
    return "";
  }

  const imageInput = payload.post.imageDataUrl ? "ローカル画像" : payload.post.imageUrl ? "Storage画像URL" : "画像なし";
  const analysisMode = result.imageAnalysis === "real-photo" ? "実写真分析" : "画像未使用";
  return `${analysisMode}: ${imageInput}`;
}

function getAiResultDifference(result, fallbackResult, error = "") {
  if (error) {
    return `API未使用: ${error.slice(0, 120)}`;
  }

  const changes = [];
  if (result.status !== fallbackResult.status) {
    changes.push(`状態 ${fallbackResult.status} -> ${result.status}`);
  }
  if (result.summary !== fallbackResult.summary) {
    changes.push("要約が変化");
  }
  if (Array.isArray(result.observations) && result.observations.length) {
    changes.push("見える根拠あり");
  }
  if (Array.isArray(result.retakeTips) && result.retakeTips.length) {
    changes.push("撮り直し観点あり");
  }
  if (Number.isFinite(Number(result.confidence))) {
    changes.push(`信頼度 ${Math.round(Number(result.confidence) * 100)}%`);
  }

  return changes.length ? changes.join(" / ") : "大きな差分なし";
}

async function checkAiAnalysisApi() {
  if (location.protocol === "file:") {
    aiApiStatus = {
      ...aiApiStatus,
      checkedAt: new Date().toISOString(),
      configured: false,
      gateway: "file表示",
      lastSource: "ローカル分析",
    };
    renderAiApiStatus();
    showToast("Netlify環境でAI APIを確認してください");
    return false;
  }

  try {
    const response = await fetch(AI_ANALYSIS_ENDPOINT);
    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    aiApiStatus = {
      ...aiApiStatus,
      checkedAt: new Date().toISOString(),
      configured: Boolean(data.configured),
      model: data.model || "未確認",
      promptVersion: data.promptVersion || "未確認",
      gateway: data.gateway || "未確認",
      auth: data.authConfigured ? "APIキーあり" : "Gateway認証に委任",
      imageAnalysis: data.imageAnalysis === "enabled" ? "実写真対応" : "未確認",
    };
    renderAiApiStatus();
    showToast(data.configured ? "AI API設定を確認しました" : "AI Gatewayが未設定です");
    return Boolean(data.configured);
  } catch (error) {
    aiApiStatus = {
      ...aiApiStatus,
      checkedAt: new Date().toISOString(),
      configured: false,
      gateway: "確認失敗",
    };
    renderAiApiStatus();
    showToast("AI API設定を確認できませんでした");
    return false;
  }
}

function renderAiApiStatus() {
  if (!aiApiStatusGrid) {
    return;
  }

  const configuredLabel = aiApiStatus.configured === null ? "未確認" : aiApiStatus.configured ? "OK" : "要確認";
  const checkedAt = aiApiStatus.checkedAt ? formatFullDate(aiApiStatus.checkedAt) : "未確認";
  const items = [
    { label: "Gateway", value: aiApiStatus.gateway },
    { label: "モデル", value: aiApiStatus.model },
    { label: "プロンプト", value: aiApiStatus.promptVersion },
    { label: "設定", value: configuredLabel },
    { label: "画像分析", value: aiApiStatus.imageAnalysis },
    { label: "認証", value: aiApiStatus.auth },
    { label: "最終分析", value: aiApiStatus.lastSource },
    { label: "確認日時", value: checkedAt },
  ];

  aiApiStatusGrid.innerHTML = items
    .map(
      (item) => `
        <article>
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
        </article>
      `,
    )
    .join("");
  renderProductionSetupSummary();
}

function renderAiEvaluationLog() {
  if (!aiEvaluationLog) {
    return;
  }

  aiEvaluationSourceFilter.value = activeAiEvaluationSourceFilter;
  aiEvaluationStatusFilter.value = activeAiEvaluationStatusFilter;
  aiEvaluationReviewFilter.value = activeAiEvaluationReviewFilter;
  aiEvaluationFromFilter.value = activeAiEvaluationFromFilter;
  aiEvaluationToFilter.value = activeAiEvaluationToFilter;
  aiPromptImprovementNote.value = state.aiPromptImprovementNote || "";
  renderAiPromptNoteHistory();
  const entries = Array.isArray(state.aiEvaluationLog) ? state.aiEvaluationLog : [];
  renderAiEvaluationSummary(entries);
  renderAiPromptDraft(entries);
  renderAiImageValidationSummary(entries);
  const visibleEntries = getVisibleAiEvaluationEntries(entries);

  if (!visibleEntries.length) {
    const message = entries.length
      ? "条件に合うAI比較ログはありません。"
      : "AI分析を実行すると、Gateway結果とローカル分析の比較ログが残ります。";
    aiEvaluationLog.innerHTML = `<p class="empty-state">${message}</p>`;
    return;
  }

  aiEvaluationLog.innerHTML = visibleEntries
    .map(
      (entry) => `
        <article class="ai-evaluation-item">
          <div class="ai-evaluation-head">
            <span>${escapeHtml(entry.target)} / ${escapeHtml(entry.source)}</span>
            <strong>${escapeHtml(entry.status)} / ${escapeHtml(entry.difference)}</strong>
            <small>${escapeHtml(formatFullDate(entry.createdAt))} / ${escapeHtml(entry.model)} / ${escapeHtml(entry.promptVersion)}</small>
          </div>
          <p>${escapeHtml(entry.summary)}</p>
          ${
            Array.isArray(entry.retakeTips) && entry.retakeTips.length
              ? `
                <div class="ai-evaluation-tips">
                  <span>撮り直し・追加確認</span>
                  <ul>
                    ${entry.retakeTips.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                </div>
              `
              : ""
          }
          <label>
            <span>出力例の分類</span>
            <select data-ai-evaluation-review="${escapeHtml(entry.id)}">
              ${getAiReviewOptions(entry.reviewLabel)}
            </select>
          </label>
          <label>
            <span>撮影条件</span>
            <select data-ai-evaluation-condition="${escapeHtml(entry.id)}">
              ${getAiPhotoConditionOptions(entry.photoCondition)}
            </select>
          </label>
          ${
            entry.source === "AI Gateway" && entry.target === "投稿写真"
              ? `
                <div class="ai-draft-retest ${["retested", "re_reviewed"].includes(entry.promptDraftRetestStatus) ? "is-done" : ["retest_needed", "re_review_needed"].includes(entry.promptDraftRetestStatus) ? "is-needed" : ""}">
                  <span>草案後再評価</span>
                  <strong>${escapeHtml(getAiPromptDraftRetestLabel(entry.promptDraftRetestStatus))}</strong>
                  <div class="ai-live-review-actions">
                    <button class="text-button" type="button" data-ai-draft-retest="${escapeHtml(entry.id)}" data-ai-draft-retest-status="retest_needed">再評価対象</button>
                    <button class="text-button" type="button" data-ai-draft-retest="${escapeHtml(entry.id)}" data-ai-draft-retest-status="retested">再評価済み</button>
                    <button class="text-button" type="button" data-ai-draft-retest="${escapeHtml(entry.id)}" data-ai-draft-retest-status="re_review_needed">再レビュー対象</button>
                    <button class="text-button" type="button" data-ai-draft-retest="${escapeHtml(entry.id)}" data-ai-draft-retest-status="re_reviewed">再レビュー済み</button>
                  </div>
                  ${
                    entry.promptDraftRetestedAt
                      ? `<small>${escapeHtml(formatFullDate(entry.promptDraftRetestedAt))}</small>`
                      : ""
                  }
                </div>
              `
              : ""
          }
          <label>
            <span>評価メモ</span>
            <textarea data-ai-evaluation-note="${escapeHtml(entry.id)}" rows="3" placeholder="実写真で気になった点、過不足、次に直すプロンプトを書きます">${escapeHtml(entry.note || "")}</textarea>
          </label>
        </article>
      `,
    )
    .join("");
}

function getVisibleAiEvaluationEntries(entries = state.aiEvaluationLog || []) {
  return entries.filter((entry) => {
    const sourceMatch = activeAiEvaluationSourceFilter === "all" || entry.source === activeAiEvaluationSourceFilter;
    const statusMatch = activeAiEvaluationStatusFilter === "all" || entry.status === activeAiEvaluationStatusFilter;
    const reviewLabel = ["good", "needs_fix", "watch", "unreviewed"].includes(entry.reviewLabel)
      ? entry.reviewLabel
      : "unreviewed";
    const reviewMatch = activeAiEvaluationReviewFilter === "all" || reviewLabel === activeAiEvaluationReviewFilter;
    const createdAt = new Date(entry.createdAt);
    const fromDate = activeAiEvaluationFromFilter ? parseDateKey(activeAiEvaluationFromFilter) : null;
    const toDate = activeAiEvaluationToFilter ? parseDateKey(activeAiEvaluationToFilter) : null;

    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
    }

    const fromMatch = !fromDate || createdAt >= fromDate;
    const toMatch = !toDate || createdAt <= toDate;
    return sourceMatch && statusMatch && reviewMatch && fromMatch && toMatch;
  });
}

function getVisibleAiPromptNotes(notes = state.aiPromptNotes || []) {
  return notes.filter((note) => {
    const createdAt = new Date(note.createdAt);
    const fromDate = activeAiEvaluationFromFilter ? parseDateKey(activeAiEvaluationFromFilter) : null;
    const toDate = activeAiEvaluationToFilter ? parseDateKey(activeAiEvaluationToFilter) : null;

    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
    }

    const fromMatch = !fromDate || createdAt >= fromDate;
    const toMatch = !toDate || createdAt <= toDate;
    return fromMatch && toMatch;
  });
}

function renderAiPromptNoteHistory() {
  if (!aiPromptNoteHistory) {
    return;
  }

  const notes = Array.isArray(state.aiPromptNotes) ? state.aiPromptNotes : [];
  if (!notes.length) {
    aiPromptNoteHistory.innerHTML = `<p class="empty-state">保存したプロンプト改善メモはまだありません。</p>`;
    return;
  }

  aiPromptNoteHistory.innerHTML = notes
    .slice(0, 5)
    .map(
      (note) => `
        <article>
          <span>${escapeHtml(formatFullDate(note.createdAt))} / ${escapeHtml(note.promptVersion || "未確認")}</span>
          <p>${escapeHtml(note.note)}</p>
        </article>
      `,
    )
    .join("");
}

function renderAiEvaluationSummary(entries) {
  if (!aiEvaluationSummary) {
    return;
  }

  const counts = entries.reduce(
    (summary, entry) => {
      const key = ["good", "needs_fix", "watch", "unreviewed"].includes(entry.reviewLabel)
        ? entry.reviewLabel
        : "unreviewed";
      summary[key] += 1;
      return summary;
    },
    { good: 0, needs_fix: 0, watch: 0, unreviewed: 0 },
  );
  const suggestion = getAiEvaluationSuggestion(counts, entries);

  aiEvaluationSummary.innerHTML = `
    <article>
      <span>良い例</span>
      <strong>${counts.good}</strong>
    </article>
    <article>
      <span>要修正</span>
      <strong>${counts.needs_fix}</strong>
    </article>
    <article>
      <span>保留</span>
      <strong>${counts.watch}</strong>
    </article>
    <article>
      <span>未評価</span>
      <strong>${counts.unreviewed}</strong>
    </article>
    <p>${escapeHtml(suggestion)}</p>
  `;
}

function renderAiPromptDraft(entries) {
  if (!aiPromptDraft) {
    return;
  }

  const notes = Array.isArray(state.aiPromptNotes) ? state.aiPromptNotes : [];
  const needsFixEntries = entries.filter((entry) => entry.reviewLabel === "needs_fix");
  const needsFixNotes = getAiNeedsFixPromptNotes(notes);
  const retestAdjustmentNotes = getAiRetestAdjustmentPromptNotes(notes);
  const needsFixNoteConditions = getAiPromptNoteConditions(needsFixNotes);
  const retestAdjustmentConditions = getAiPromptNoteConditions(retestAdjustmentNotes);
  const promptDraftNoteConditions = getUniqueValues([...needsFixNoteConditions, ...retestAdjustmentConditions]);
  const draftItems = getAiPromptV4DraftItems({ notes, needsFixNotes, retestAdjustmentNotes, needsFixEntries });
  const promptDraftReview = getAiPromptDraftReview({
    draftItems,
    needsFixNotes: [...needsFixNotes, ...retestAdjustmentNotes],
    needsFixNoteConditions: promptDraftNoteConditions,
  });
  const needsFixNoteConditionText = promptDraftNoteConditions.length
    ? `${promptDraftNoteConditions.map((condition) => getAiPhotoConditionLabel(condition)).join(" / ")} を草案に反映`
    : "要修正レビューを改善メモ化すると草案が強くなります";

  aiPromptDraft.innerHTML = `
    <article>
      <div>
        <span>Prompt v4 draft</span>
        <strong>${draftItems.length ? "草案あり" : "材料不足"}</strong>
      </div>
      ${
        draftItems.length
          ? `
            <ul>
              ${draftItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          `
          : `<p>要修正レビューとプロンプト改善メモを保存すると、次のプロンプト草案がここに出ます。</p>`
      }
      <div class="ai-prompt-draft-evidence">
        <span>要修正メモ材料</span>
        <strong>${needsFixNotes.length ? `${needsFixNotes.length}件` : "未保存"}</strong>
        <p>${escapeHtml(needsFixNoteConditionText)}</p>
      </div>
      <div class="ai-prompt-draft-retest">
        <span>再評価メモ再強化</span>
        <strong>${retestAdjustmentNotes.length ? `${retestAdjustmentNotes.length}件` : "未保存"}</strong>
        <p>${escapeHtml(getAiRetestAdjustmentDraftEvidenceText(retestAdjustmentConditions))}</p>
      </div>
      <div class="ai-prompt-draft-review ${promptDraftReview.ready ? "is-ready" : needsFixNotes.length || retestAdjustmentNotes.length ? "is-active" : ""}">
        <span>草案反映レビュー</span>
        <strong>${escapeHtml(promptDraftReview.status)}</strong>
        <p>${escapeHtml(promptDraftReview.summary)}</p>
        <small>${escapeHtml(promptDraftReview.nextAction)}</small>
      </div>
      <small>要修正 ${needsFixEntries.length}件 / 改善メモ ${notes.length}件 / 要修正メモ ${needsFixNotes.length}件 / 再評価メモ ${retestAdjustmentNotes.length}件</small>
    </article>
  `;
}

function getAiPromptV4DraftItems({ notes, needsFixNotes = [], retestAdjustmentNotes = [], needsFixEntries = [] }) {
  const items = [];
  const conditionCounts = getAiPhotoConditionCounts(needsFixEntries);
  const weakCondition = getAiWeakPhotoCondition(conditionCounts);
  const latestNote = notes[0]?.note || "";
  const needsFixNoteConditions = getAiPromptNoteConditions(needsFixNotes);
  const retestAdjustmentConditions = getAiPromptNoteConditions(retestAdjustmentNotes);

  if (weakCondition) {
    items.push(`${getAiPhotoConditionLabel(weakCondition.key)}では、${getAiWeakConditionSuggestion(weakCondition)}`);
  }

  if (needsFixNotes.length) {
    items.push("保存済みの実写真要修正メモを優先し、見える根拠・見えない範囲・撮り直し案を必ず分けて返す。");
  }

  if (retestAdjustmentNotes.length) {
    items.push("再評価後も要修正だった条件は、草案内で最優先の再調整対象として扱う。");
  }

  retestAdjustmentConditions.forEach((condition) => {
    items.push(getAiRetestAdjustmentConditionSuggestion(condition));
  });

  needsFixNoteConditions.forEach((condition) => {
    items.push(getAiNeedsFixNoteConditionSuggestion(condition));
  });

  if (latestNote) {
    items.push(`直近の改善メモを反映: ${latestNote.replace(/\s+/g, " ").slice(0, 120)}`);
  }

  if (needsFixEntries.some((entry) => entry.difference.includes("撮り直し観点あり"))) {
    items.push("retakeTipsは、暗さ・反射・魚の小ささ・コケの見え方を分けて具体化する。");
  }

  if (needsFixEntries.some((entry) => entry.difference.includes("見える根拠あり"))) {
    items.push("observationsは写真に見える根拠だけに限定し、推測はitems側の確認行動へ移す。");
  }

  if (needsFixEntries.length && !items.length) {
    items.push("要修正レビューの評価メモを増やし、言い過ぎた表現と不足した撮影条件を分けて整理する。");
  }

  return [...new Set(items)].slice(0, 6);
}

function getAiNeedsFixPromptNotes(notes = []) {
  return notes.filter((note) => String(note.note || "").includes("実写真要修正メモ:"));
}

function getAiRetestAdjustmentPromptNotes(notes = []) {
  return notes.filter((note) => String(note.note || "").includes("再評価要再調整メモ:"));
}

function getAiPromptNoteConditions(notes = []) {
  const conditions = ["dark", "small_fish", "algae", "reflection", "normal", "unspecified"];
  return conditions.filter((condition) => {
    const label = getAiPhotoConditionLabel(condition);
    return notes.some((note) => String(note.note || "").includes(label));
  });
}

function getUniqueValues(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function getAiRetestAdjustmentDraftEvidenceText(conditions = []) {
  if (!conditions.length) {
    return "再評価で要再調整になった条件を改善メモへ戻すと、草案をさらに強められます。";
  }

  return `${conditions.map((condition) => getAiPhotoConditionLabel(condition)).join(" / ")} を再強化対象に追加`;
}

function getAiNeedsFixNoteConditionSuggestion(condition) {
  const suggestions = {
    dark: "暗い写真の要修正メモがある場合は、暗さで確認できない部位を明記し、ライト点灯・正面再撮影を最初の撮り直し案にする。",
    small_fish: "魚が小さい写真では、体表や泳ぎの断定を避け、拡大写真または短い動画の追加確認を提案する。",
    algae: "コケ多めの写真では、水質値を写真だけで断定せず、コケの場所・照明時間・水換え履歴の確認へ寄せる。",
    reflection: "反射あり写真では、反射で隠れた範囲を観察対象から外し、角度を変えた撮影を具体的に促す。",
    normal: "通常写真でも、写真に写る根拠とユーザーに確認する行動を分け、過剰な診断表現を避ける。",
    unspecified: "撮影条件が未指定の要修正メモは、まず暗さ・魚の大きさ・コケ・反射のどれに近いかを出力内で確認する。",
  };

  return suggestions[condition] || "要修正メモの撮影条件に合わせて、見える範囲と見えない範囲の分離を強める。";
}

function getAiRetestAdjustmentConditionSuggestion(condition) {
  const suggestions = {
    dark: "暗い写真の再評価で要修正が残る場合は、暗さで見えない範囲を結論から外し、撮影し直す理由を短く明示する。",
    small_fish: "魚が小さい写真の再評価で要修正が残る場合は、魚の状態評価を控え、拡大写真・動画・行動観察を先に案内する。",
    algae: "コケ多め写真の再評価で要修正が残る場合は、写真だけで水質悪化を決めず、照明時間と水換え履歴の確認を必須にする。",
    reflection: "反射あり写真の再評価で要修正が残る場合は、反射で隠れた対象を観察済みにせず、角度変更の再撮影を最初に促す。",
    normal: "通常写真の再評価で要修正が残る場合は、断定表現を減らし、写真根拠とユーザー確認事項を一文ずつ分ける。",
    unspecified: "条件未指定の再評価メモは、暗さ・魚の大きさ・コケ・反射のどれが要因かを出力で切り分ける。",
  };

  return suggestions[condition] || "再評価で残った要修正条件は、次の草案で最優先に再調整する。";
}

function getAiPromptDraftReview({ draftItems = [], needsFixNotes = [], needsFixNoteConditions = [] }) {
  const coveredConditions = AI_REQUIRED_PHOTO_CONDITIONS.filter((condition) => needsFixNoteConditions.includes(condition));
  const missingConditions = AI_REQUIRED_PHOTO_CONDITIONS.filter((condition) => !needsFixNoteConditions.includes(condition));
  const coveredConditionLabels = coveredConditions.map((condition) => getAiPhotoConditionLabel(condition));
  const missingConditionLabels = missingConditions.map((condition) => getAiPhotoConditionLabel(condition));

  if (!needsFixNotes.length) {
    return {
      status: "未開始",
      ready: false,
      coveredConditionLabels,
      missingConditionLabels,
      summary: "実写真要修正メモがまだ保存されていないため、草案への反映レビューはできません。",
      nextAction: "Gateway写真を要修正に分類し、要修正を改善メモ化してください。",
    };
  }

  if (!draftItems.length) {
    return {
      status: "材料不足",
      ready: false,
      coveredConditionLabels,
      missingConditionLabels,
      summary: "要修正メモはありますが、プロンプト草案の項目がまだ作れていません。",
      nextAction: "改善メモの内容を増やし、見える根拠・見えない範囲・撮り直し案を残してください。",
    };
  }

  if (!missingConditions.length) {
    return {
      status: "反映OK",
      ready: true,
      coveredConditionLabels,
      missingConditionLabels,
      summary: "主要な実写真条件の要修正メモが草案材料に入っています。",
      nextAction: "次は草案を見ながら実写真Gateway出力を再評価してください。",
    };
  }

  const coveredText = coveredConditionLabels.length
    ? `${coveredConditionLabels.join(" / ")}は反映済みです`
    : "主要条件の反映はまだありません";

  return {
    status: coveredConditions.length >= 2 ? "反映中" : "反映少なめ",
    ready: false,
    coveredConditionLabels,
    missingConditionLabels,
    summary: `${coveredText}。未反映: ${missingConditionLabels.join(" / ")}。`,
    nextAction: `${missingConditionLabels[0]}の要修正レビューを改善メモ化すると、草案レビューが進みます。`,
  };
}

function getAiPromptDraftRetestSuggestion({ promptDraftReview, draftRetestNeededCount, draftRetestedCount, latestGatewayPhoto }) {
  if (!latestGatewayPhoto) {
    return "投稿写真をAI Gatewayで分析すると、草案後の再評価対象を残せます。";
  }

  if (!promptDraftReview.ready) {
    return "まず要修正メモを増やし、草案反映レビューをOKに近づけてから再評価します。";
  }

  if (draftRetestNeededCount > draftRetestedCount) {
    return "再評価対象が残っています。草案の改善点を見ながら、良い例/要修正/保留を付け直してください。";
  }

  if (draftRetestedCount > 0) {
    return "草案反映後の再評価証跡があります。次は条件別に要修正が減ったか確認してください。";
  }

  return "草案反映OKです。最新のGateway写真を再評価対象にして、出力の変化を確認してください。";
}

function getAiDraftReReviewSummary(entries = [], retestAdjustmentConditions = []) {
  const gatewayPhotoEntries = entries.filter((entry) => entry.target === "投稿写真" && entry.source === "AI Gateway");
  const reReviewNeeded = gatewayPhotoEntries.filter((entry) => entry.promptDraftRetestStatus === "re_review_needed");
  const reReviewed = gatewayPhotoEntries.filter((entry) => entry.promptDraftRetestStatus === "re_reviewed");
  const targetConditions = getUniqueValues([
    ...retestAdjustmentConditions,
    ...reReviewNeeded.map((entry) => entry.photoCondition),
    ...reReviewed.map((entry) => entry.photoCondition),
  ]).filter((condition) => AI_REQUIRED_PHOTO_CONDITIONS.includes(condition));

  return {
    targetConditions,
    targetConditionLabels: targetConditions.map((condition) => getAiPhotoConditionLabel(condition)),
    reReviewNeeded: reReviewNeeded.length,
    reReviewed: reReviewed.length,
    good: reReviewed.filter((entry) => entry.reviewLabel === "good").length,
    needsFix: reReviewed.filter((entry) => entry.reviewLabel === "needs_fix").length,
    watch: reReviewed.filter((entry) => entry.reviewLabel === "watch").length,
    nextAction: getAiDraftReReviewNextAction({ targetConditions, reReviewNeeded, reReviewed }),
  };
}

function getAiDraftReReviewNextAction({ targetConditions, reReviewNeeded, reReviewed }) {
  if (!targetConditions.length) {
    return "再評価要再調整メモを保存すると、草案再強化後の再レビュー対象が見えます。";
  }
  if (reReviewNeeded.length > reReviewed.length) {
    return "再レビュー対象が残っています。再強化した草案を見ながら良い例/要修正/保留を付け直してください。";
  }
  if (reReviewed.length) {
    return "再レビュー済みの証跡があります。要修正が残る条件は改善メモへ戻してください。";
  }
  return `${targetConditions.map((condition) => getAiPhotoConditionLabel(condition)).join(" / ")}を再レビュー対象にしてください。`;
}

function getAiDraftReReviewHeadline(summary) {
  if (summary.reReviewed) {
    return `再レビュー済み ${summary.reReviewed}件`;
  }
  if (summary.reReviewNeeded) {
    return `対象 ${summary.reReviewNeeded}件`;
  }
  if (summary.targetConditions.length) {
    return `候補 ${summary.targetConditions.length}条件`;
  }
  return "未開始";
}

function getAiDraftReReviewDecision(summary) {
  if (!summary.reReviewed) {
    return {
      status: "判定待ち",
      ready: false,
      summary: "草案再強化後の再レビューがまだありません。",
      nextAction: "再レビュー対象を付け、良い例/要修正/保留を分類してください。",
    };
  }

  if (summary.needsFix > 0) {
    return {
      status: "要再調整",
      ready: false,
      summary: `再レビュー後も要修正が${summary.needsFix}件あります。`,
      nextAction: "要修正が残った条件を改善メモへ戻し、草案を再調整してください。",
    };
  }

  if (summary.good > 0 && summary.reReviewNeeded === 0) {
    return {
      status: "公開OK",
      ready: true,
      summary: `再レビュー済み${summary.reReviewed}件で要修正は残っていません。`,
      nextAction: "本番公開前の最終チェックへ進めます。",
    };
  }

  return {
    status: "確認中",
    ready: false,
    summary: "再レビュー済みはありますが、良い例または未完了対象の確認が必要です。",
    nextAction: "良い例/保留の分類と未完了の再レビュー対象を確認してください。",
  };
}

function getAiPromptDraftRetestExport(entries = [], promptDraftReview = null, conditionSummary = null) {
  const gatewayPhotoEntries = entries.filter((entry) => entry.target === "投稿写真" && entry.source === "AI Gateway");
  const retestNeeded = gatewayPhotoEntries.filter((entry) => entry.promptDraftRetestStatus === "retest_needed");
  const retested = gatewayPhotoEntries.filter((entry) => entry.promptDraftRetestStatus === "retested");
  const reReviewNeeded = gatewayPhotoEntries.filter((entry) => entry.promptDraftRetestStatus === "re_review_needed");
  const reReviewed = gatewayPhotoEntries.filter((entry) => entry.promptDraftRetestStatus === "re_reviewed");
  const summary = conditionSummary || getAiPromptDraftRetestConditionSummary(entries);

  return {
    readyForRetest: promptDraftReview?.ready === true,
    retestNeeded: retestNeeded.length,
    retested: retested.length,
    reReviewNeeded: reReviewNeeded.length,
    reReviewed: reReviewed.length,
    conditionSummary: summary,
    items: [...retestNeeded, ...retested, ...reReviewNeeded, ...reReviewed].map((entry) => ({
      id: entry.id,
      status: entry.promptDraftRetestStatus,
      statusLabel: getAiPromptDraftRetestLabel(entry.promptDraftRetestStatus),
      photoCondition: entry.photoCondition,
      photoConditionLabel: getAiPhotoConditionLabel(entry.photoCondition),
      reviewLabel: entry.reviewLabel,
      reviewedAt: entry.promptDraftRetestedAt || null,
      summary: entry.summary,
    })),
  };
}

function getAiPromptDraftRetestConditionSummary(entries = []) {
  const gatewayPhotoEntries = entries.filter((entry) => entry.target === "投稿写真" && entry.source === "AI Gateway");

  return AI_REQUIRED_PHOTO_CONDITIONS.map((condition) => {
    const conditionEntries = gatewayPhotoEntries.filter((entry) => entry.photoCondition === condition);
    const retested = conditionEntries.filter((entry) => entry.promptDraftRetestStatus === "retested");
    const retestNeeded = conditionEntries.filter((entry) => entry.promptDraftRetestStatus === "retest_needed");
    const good = retested.filter((entry) => entry.reviewLabel === "good").length;
    const needsFix = retested.filter((entry) => entry.reviewLabel === "needs_fix").length;
    const watch = retested.filter((entry) => entry.reviewLabel === "watch").length;
    const unreviewed = retested.filter((entry) => entry.reviewLabel === "unreviewed").length;
    const improved = retested.length > 0 && good > 0 && needsFix === 0;
    const status = getAiPromptDraftRetestConditionStatus({ retested: retested.length, retestNeeded: retestNeeded.length, good, needsFix });

    return {
      condition,
      label: getAiPhotoConditionLabel(condition),
      total: conditionEntries.length,
      retestNeeded: retestNeeded.length,
      retested: retested.length,
      good,
      needsFix,
      watch,
      unreviewed,
      improved,
      status,
      nextAction: getAiPromptDraftRetestConditionNextAction({ condition, retested: retested.length, retestNeeded: retestNeeded.length, needsFix }),
    };
  });
}

function getAiPromptDraftRetestConditionSummaryHeadline(summary = []) {
  const improved = summary.filter((item) => item.improved).length;
  const warning = summary.filter((item) => item.needsFix > 0).length;
  const checked = summary.filter((item) => item.retested > 0).length;

  if (improved) {
    return `改善あり ${improved}条件`;
  }
  if (warning) {
    return `要再調整 ${warning}条件`;
  }
  if (checked) {
    return `確認済み ${checked}条件`;
  }
  return "未開始";
}

function getAiPromptDraftRetestConditionStatus({ retested, retestNeeded, good, needsFix }) {
  if (retested > 0 && good > 0 && needsFix === 0) {
    return "改善あり";
  }
  if (retested > 0 && needsFix > 0) {
    return "要再調整";
  }
  if (retestNeeded > 0) {
    return "再評価待ち";
  }
  return "未開始";
}

function getAiPromptDraftRetestConditionNextAction({ condition, retested, retestNeeded, needsFix }) {
  const label = getAiPhotoConditionLabel(condition);
  if (retested > 0 && needsFix === 0) {
    return `${label}は改善傾向です。同じ条件のサンプルを増やしてください。`;
  }
  if (needsFix > 0) {
    return `${label}は再評価後も要修正があります。改善メモへ戻して草案を調整してください。`;
  }
  if (retestNeeded > 0) {
    return `${label}の再評価対象があります。良い例/要修正/保留を付け直してください。`;
  }
  return `${label}の草案後再評価をまだ記録していません。`;
}

function renderAiImageValidationSummary(entries) {
  if (!aiImageValidationSummary) {
    return;
  }

  const photoEntries = entries.filter((entry) => entry.target === "投稿写真");
  const gatewayPhotoEntries = photoEntries.filter((entry) => entry.source === "AI Gateway");
  const needsFixCount = gatewayPhotoEntries.filter((entry) => entry.reviewLabel === "needs_fix").length;
  const goodCount = gatewayPhotoEntries.filter((entry) => entry.reviewLabel === "good").length;
  const v4Entries = gatewayPhotoEntries.filter((entry) => getAiPromptGeneration(entry.promptVersion) === "v4");
  const v4NeedsFixCount = v4Entries.filter((entry) => entry.reviewLabel === "needs_fix").length;
  const promptComparison = getAiPromptGenerationComparison(gatewayPhotoEntries);
  const conditionCounts = getAiPhotoConditionCounts(gatewayPhotoEntries);
  const weakCondition = getAiWeakPhotoCondition(conditionCounts);
  const nextConditionKey = getNextAiPhotoConditionKey(conditionCounts);
  const latestGatewayPhoto = gatewayPhotoEntries[0] || null;
  const latestUnreviewedGatewayPhoto = gatewayPhotoEntries.find((entry) => entry.reviewLabel === "unreviewed") || null;
  const latestNeedsFixGatewayPhoto = gatewayPhotoEntries.find((entry) => entry.reviewLabel === "needs_fix") || null;
  const draftRetestNeededCount = gatewayPhotoEntries.filter((entry) => entry.promptDraftRetestStatus === "retest_needed").length;
  const draftRetestedCount = gatewayPhotoEntries.filter((entry) => entry.promptDraftRetestStatus === "retested").length;
  const retestConditionSummary = getAiPromptDraftRetestConditionSummary(entries);
  const notes = Array.isArray(state.aiPromptNotes) ? state.aiPromptNotes : [];
  const needsFixNotes = getAiNeedsFixPromptNotes(notes);
  const retestAdjustmentNotes = getAiRetestAdjustmentPromptNotes(notes);
  const needsFixNoteConditions = getAiPromptNoteConditions(needsFixNotes);
  const retestAdjustmentConditions = getAiPromptNoteConditions(retestAdjustmentNotes);
  const promptDraftNoteConditions = getUniqueValues([...needsFixNoteConditions, ...retestAdjustmentConditions]);
  const reReviewSummary = getAiDraftReReviewSummary(entries, retestAdjustmentConditions);
  const reReviewDecision = getAiDraftReReviewDecision(reReviewSummary);
  const promptDraftItems = getAiPromptV4DraftItems({
    notes,
    needsFixNotes,
    retestAdjustmentNotes,
    needsFixEntries: entries.filter((entry) => entry.reviewLabel === "needs_fix"),
  });
  const promptDraftReview = getAiPromptDraftReview({
    draftItems: promptDraftItems,
    needsFixNotes: [...needsFixNotes, ...retestAdjustmentNotes],
    needsFixNoteConditions: promptDraftNoteConditions,
  });
  const productionChecklist = getAiPromptV4ProductionChecklist({
    gatewayPhotoEntries,
    v4Entries,
    promptComparison,
    conditionCounts,
  });
  const suggestion = getAiImageValidationSuggestion({
    photoEntries,
    gatewayPhotoEntries,
    needsFixCount,
    goodCount,
    conditionCounts,
    weakCondition,
  });

  aiImageValidationSummary.innerHTML = `
    <article>
      <div>
        <span>実写真検証</span>
        <strong>${gatewayPhotoEntries.length ? "検証中" : "未実施"}</strong>
      </div>
      <dl>
        <div>
          <dt>Gateway写真</dt>
          <dd>${gatewayPhotoEntries.length}</dd>
        </div>
        <div>
          <dt>良い例</dt>
          <dd>${goodCount}</dd>
        </div>
        <div>
          <dt>要修正</dt>
          <dd>${needsFixCount}</dd>
        </div>
        <div>
          <dt>v4写真</dt>
          <dd>${v4Entries.length}</dd>
        </div>
      </dl>
      <p>${escapeHtml(suggestion)}</p>
      <div class="ai-version-comparison">
        <span>v4評価</span>
        <strong>${v4Entries.length ? `${v4Entries.length}件 / 要修正${v4NeedsFixCount}件` : "未評価"}</strong>
        <p>${escapeHtml(getAiPromptGenerationSuggestion(promptComparison, v4Entries.length))}</p>
      </div>
      <div class="ai-draft-retest-summary ${draftRetestedCount ? "is-done" : draftRetestNeededCount ? "is-needed" : ""}">
        <span>草案後再評価</span>
        <strong>${draftRetestedCount ? `再評価済み ${draftRetestedCount}件` : draftRetestNeededCount ? `対象 ${draftRetestNeededCount}件` : "未開始"}</strong>
        <p>${escapeHtml(getAiPromptDraftRetestSuggestion({ promptDraftReview, draftRetestNeededCount, draftRetestedCount, latestGatewayPhoto }))}</p>
      </div>
      <div class="ai-draft-rereview-summary ${reReviewSummary.reReviewed ? "is-done" : reReviewSummary.reReviewNeeded ? "is-needed" : ""}">
        <span>草案再強化後レビュー</span>
        <strong>${escapeHtml(getAiDraftReReviewHeadline(reReviewSummary))}</strong>
        <p>${escapeHtml(reReviewSummary.nextAction)}</p>
        ${
          reReviewSummary.targetConditionLabels.length
            ? `<small>${escapeHtml(reReviewSummary.targetConditionLabels.join(" / "))}</small>`
            : ""
        }
      </div>
      <div class="ai-rereview-decision ${reReviewDecision.ready ? "is-ready" : reReviewDecision.status === "要再調整" ? "is-warning" : ""}">
        <span>再レビュー最終判定</span>
        <strong>${escapeHtml(reReviewDecision.status)}</strong>
        <dl>
          <div>
            <dt>再レビュー済み</dt>
            <dd>${reReviewSummary.reReviewed}</dd>
          </div>
          <div>
            <dt>良い例</dt>
            <dd>${reReviewSummary.good}</dd>
          </div>
          <div>
            <dt>要修正</dt>
            <dd>${reReviewSummary.needsFix}</dd>
          </div>
        </dl>
        <p>${escapeHtml(reReviewDecision.summary)}</p>
        ${
          reReviewSummary.targetConditionLabels.length
            ? `<em>${escapeHtml(reReviewSummary.targetConditionLabels.join(" / "))}</em>`
            : ""
        }
        <small>${escapeHtml(reReviewDecision.nextAction)}</small>
        ${
          reReviewDecision.ready
            ? `<a class="ai-release-link" href="#account">最終リリース確認へ進む</a>`
            : ""
        }
      </div>
      <div class="ai-retest-condition-summary">
        <span>再評価後の条件別改善</span>
        <strong>${escapeHtml(getAiPromptDraftRetestConditionSummaryHeadline(retestConditionSummary))}</strong>
        <ul>
          ${retestConditionSummary
            .map(
              (item) => `
                <li class="${item.improved ? "is-improved" : item.needsFix ? "is-warning" : item.retested ? "is-checked" : ""}">
                  <strong>${escapeHtml(item.label)}</strong>
                  <span>${escapeHtml(item.status)}</span>
                  <p>再評価済み${item.retested}件 / 良い例${item.good}件 / 要修正${item.needsFix}件 / 保留${item.watch}件</p>
                  ${
                    item.needsFix
                      ? `<button class="text-button" type="button" data-ai-retest-condition-note="${escapeHtml(item.condition)}">改善メモへ戻す</button>`
                      : ""
                  }
                </li>
              `,
            )
            .join("")}
        </ul>
      </div>
      <div class="ai-condition-coverage">
        <span>条件別サンプル</span>
        <strong>${escapeHtml(nextConditionKey ? `次: ${getAiPhotoConditionLabel(nextConditionKey)}` : "主要条件は記録済み")}</strong>
        <ul>
          ${AI_REQUIRED_PHOTO_CONDITIONS
            .map((key) => {
              const ready = conditionCounts[key].total >= AI_REQUIRED_SAMPLES_PER_CONDITION;
              return `<li class="${ready ? "is-ready" : ""}">${escapeHtml(getAiPhotoConditionLabel(key))}: ${conditionCounts[key].total}/${AI_REQUIRED_SAMPLES_PER_CONDITION}件 / 要修正${conditionCounts[key].needsFix}件</li>`;
            })
            .join("")}
        </ul>
      </div>
      <div class="ai-condition-risk ${weakCondition ? "is-warning" : ""}">
        <span>弱点候補</span>
        <strong>${escapeHtml(weakCondition ? getAiPhotoConditionLabel(weakCondition.key) : "未検出")}</strong>
        <p>${escapeHtml(getAiWeakConditionSuggestion(weakCondition))}</p>
        ${
          weakCondition
            ? `<button class="ghost-button" type="button" data-ai-weak-condition-note="${escapeHtml(weakCondition.key)}">改善メモを履歴保存</button>`
            : ""
        }
      </div>
      <div class="ai-needs-fix-note ${latestNeedsFixGatewayPhoto ? "is-active" : ""}">
        <span>要修正メモ</span>
        <strong>${escapeHtml(latestNeedsFixGatewayPhoto ? getAiPhotoConditionLabel(latestNeedsFixGatewayPhoto.photoCondition) : "要修正なし")}</strong>
        <p>${escapeHtml(latestNeedsFixGatewayPhoto ? latestNeedsFixGatewayPhoto.summary : "要修正に分類したGateway写真があると、改善メモへ変換できます。")}</p>
        ${
          latestNeedsFixGatewayPhoto
            ? `
              <small>${escapeHtml(formatFullDate(latestNeedsFixGatewayPhoto.createdAt))} / ${escapeHtml(latestNeedsFixGatewayPhoto.difference)}</small>
              <button class="ghost-button" type="button" data-ai-needs-fix-note="${escapeHtml(latestNeedsFixGatewayPhoto.id)}">要修正を改善メモ化</button>
            `
            : ""
        }
      </div>
      <div class="ai-live-review ${latestUnreviewedGatewayPhoto ? "is-active" : ""}">
        <span>実写真出力確認</span>
        <strong>${escapeHtml(latestUnreviewedGatewayPhoto ? latestUnreviewedGatewayPhoto.status : "未評価なし")}</strong>
        <p>${escapeHtml(latestUnreviewedGatewayPhoto ? latestUnreviewedGatewayPhoto.summary : "未評価のGateway写真はありません。次の実写真分析を待っています。")}</p>
        ${
          latestUnreviewedGatewayPhoto
            ? `
              <small>${escapeHtml(formatFullDate(latestUnreviewedGatewayPhoto.createdAt))} / ${escapeHtml(latestUnreviewedGatewayPhoto.difference)}</small>
              <div class="ai-live-review-actions">
                <button class="ghost-button" type="button" data-ai-quick-review="${escapeHtml(latestUnreviewedGatewayPhoto.id)}" data-ai-quick-review-value="good">良い例</button>
                <button class="ghost-button" type="button" data-ai-quick-review="${escapeHtml(latestUnreviewedGatewayPhoto.id)}" data-ai-quick-review-value="needs_fix">要修正</button>
                <button class="ghost-button" type="button" data-ai-quick-review="${escapeHtml(latestUnreviewedGatewayPhoto.id)}" data-ai-quick-review-value="watch">保留</button>
              </div>
              <div class="ai-live-review-actions condition-actions">
                ${["normal", "dark", "small_fish", "algae", "reflection"]
                  .map(
                    (key) => `
                      <button class="text-button ${latestUnreviewedGatewayPhoto.photoCondition === key ? "is-selected" : ""}" type="button" data-ai-quick-condition="${escapeHtml(latestUnreviewedGatewayPhoto.id)}" data-ai-quick-condition-value="${escapeHtml(key)}">${escapeHtml(getAiPhotoConditionLabel(key))}</button>
                    `,
                  )
                  .join("")}
              </div>
            `
            : ""
        }
      </div>
      <div class="ai-production-checklist">
        <span>v4本番チェック</span>
        <ul>
          ${productionChecklist
            .map(
              (item) => `
                <li class="${item.done ? "is-done" : ""}">
                  <strong>${item.done ? "OK" : "未完了"}</strong>
                  <p>${escapeHtml(item.label)}</p>
                </li>
              `,
            )
            .join("")}
        </ul>
      </div>
      ${
        latestGatewayPhoto
          ? `<small>最新: ${escapeHtml(formatFullDate(latestGatewayPhoto.createdAt))} / ${escapeHtml(latestGatewayPhoto.status)} / ${escapeHtml(latestGatewayPhoto.difference)}</small>`
          : `<small>投稿写真の詳細から「AI分析へ」を実行すると、Gateway写真検証として記録されます。</small>`
      }
    </article>
  `;
}

function getAiPromptV4ProductionChecklist({ gatewayPhotoEntries, v4Entries, promptComparison, conditionCounts }) {
  const coveredConditions = AI_REQUIRED_PHOTO_CONDITIONS.filter((key) =>
    v4Entries.some((entry) => entry.photoCondition === key && ["good", "needs_fix", "watch"].includes(entry.reviewLabel)),
  );
  const sampleReadyConditions = AI_REQUIRED_PHOTO_CONDITIONS.filter((key) => conditionCounts[key].total >= AI_REQUIRED_SAMPLES_PER_CONDITION);
  const reviewedV4 = v4Entries.filter((entry) => ["good", "needs_fix", "watch"].includes(entry.reviewLabel));
  const goodV4 = v4Entries.filter((entry) => entry.reviewLabel === "good");
  const hasNeedsFixNote = v4Entries.some((entry) => entry.reviewLabel === "needs_fix" && entry.note);
  const hasRetakeTips = v4Entries.some((entry) => Array.isArray(entry.retakeTips) && entry.retakeTips.length);
  const unresolvedCondition = AI_REQUIRED_PHOTO_CONDITIONS.find((key) => conditionCounts[key].needsFix > 0);
  const improvedConditions = promptComparison.filter((item) => item.improved).length;

  return [
    {
      done: aiApiStatus.configured === true && getAiPromptGeneration(aiApiStatus.promptVersion) === "v4",
      label: "Gateway設定とプロンプトv4が確認済み",
    },
    {
      done: gatewayPhotoEntries.length >= 3 && v4Entries.length >= 3,
      label: "実写真のGateway分析を3件以上記録",
    },
    {
      done: sampleReadyConditions.length === AI_REQUIRED_PHOTO_CONDITIONS.length,
      label: `暗い写真、魚が小さい写真、コケ多め、反射ありを各${AI_REQUIRED_SAMPLES_PER_CONDITION}件以上記録`,
    },
    {
      done: coveredConditions.length === AI_REQUIRED_PHOTO_CONDITIONS.length,
      label: "主要な撮影条件を良い例/要修正/保留で分類済み",
    },
    {
      done: reviewedV4.length >= v4Entries.length && v4Entries.length > 0 && goodV4.length > 0,
      label: "v4結果を良い例/要修正/保留でレビュー済み",
    },
    {
      done: !unresolvedCondition && v4Entries.length > 0,
      label: "条件別の要修正が残っていない、または再評価済み",
    },
    {
      done: hasRetakeTips && (hasNeedsFixNote || improvedConditions > 0),
      label: "撮り直し観点と改善メモから合否判断できる",
    },
  ];
}

function getAiPromptV4ProductionExport(entries) {
  const photoEntries = entries.filter((entry) => entry.target === "投稿写真");
  const gatewayPhotoEntries = photoEntries.filter((entry) => entry.source === "AI Gateway");
  const v4Entries = gatewayPhotoEntries.filter((entry) => getAiPromptGeneration(entry.promptVersion) === "v4");
  const promptComparison = getAiPromptGenerationComparison(gatewayPhotoEntries);
  const conditionCounts = getAiPhotoConditionCounts(gatewayPhotoEntries);
  const notes = Array.isArray(state.aiPromptNotes) ? state.aiPromptNotes : [];
  const retestAdjustmentConditions = getAiPromptNoteConditions(getAiRetestAdjustmentPromptNotes(notes));
  const reReviewSummary = getAiDraftReReviewSummary(entries, retestAdjustmentConditions);
  const reReviewDecision = getAiDraftReReviewDecision(reReviewSummary);
  const items = getAiPromptV4ProductionChecklist({
    gatewayPhotoEntries,
    v4Entries,
    promptComparison,
    conditionCounts,
  }).map((item, index) => ({
    id: `v4-production-${index + 1}`,
    status: item.done ? "ok" : "todo",
    done: item.done,
    label: item.label,
  }));
  const completed = items.filter((item) => item.done).length;
  const checklistReady = items.length > 0 && completed === items.length;

  return {
    promptVersion: aiApiStatus.promptVersion,
    gatewayConfigured: aiApiStatus.configured,
    lastCheckedAt: aiApiStatus.checkedAt || null,
    v4Entries: v4Entries.length,
    v4Reviewed: v4Entries.filter((entry) => ["good", "needs_fix", "watch"].includes(entry.reviewLabel)).length,
    completed,
    total: items.length,
    ready: checklistReady,
    readyWithGatewayDecision: checklistReady && reReviewDecision.ready,
    items,
    conditionCoverage: AI_REQUIRED_PHOTO_CONDITIONS.map((key) => ({
      condition: key,
      label: getAiPhotoConditionLabel(key),
      total: conditionCounts[key].total,
      required: AI_REQUIRED_SAMPLES_PER_CONDITION,
      needsFix: conditionCounts[key].needsFix,
      v4Reviewed: v4Entries.filter(
        (entry) => entry.photoCondition === key && ["good", "needs_fix", "watch"].includes(entry.reviewLabel),
      ).length,
    })),
    comparison: promptComparison,
    gatewayDecisionEvidence: {
      status: reReviewDecision.status,
      ready: reReviewDecision.ready,
      summary: reReviewDecision.summary,
      nextAction: reReviewDecision.nextAction,
      targetConditions: reReviewSummary.targetConditions,
      targetConditionLabels: reReviewSummary.targetConditionLabels,
      reReviewNeeded: reReviewSummary.reReviewNeeded,
      reReviewed: reReviewSummary.reReviewed,
      good: reReviewSummary.good,
      needsFix: reReviewSummary.needsFix,
      watch: reReviewSummary.watch,
      exportedAt: new Date().toISOString(),
    },
  };
}

function getAiImageValidationSuggestion({ photoEntries, gatewayPhotoEntries, needsFixCount, goodCount, conditionCounts, weakCondition }) {
  if (!photoEntries.length) {
    return "まず投稿写真からAI分析を実行して、ローカル分析との差分を確認します。";
  }

  if (!gatewayPhotoEntries.length) {
    return "写真分析はありますがGateway結果がまだありません。Netlify AI Gateway設定後に同じ写真で再検証してください。";
  }

  if (needsFixCount > 0) {
    return weakCondition
      ? `${getAiPhotoConditionLabel(weakCondition.key)}で要修正が目立ちます。撮り直し観点と評価メモを見てプロンプト改善候補を整理してください。`
      : "要修正の写真があります。評価メモとCSV/JSON書き出しを使って、プロンプトv3の修正点を整理してください。";
  }

  const missingCondition = AI_REQUIRED_PHOTO_CONDITIONS.find((key) => conditionCounts[key].total < AI_REQUIRED_SAMPLES_PER_CONDITION);
  if (missingCondition) {
    return `${getAiPhotoConditionLabel(missingCondition)}の評価サンプルが不足しています。各条件${AI_REQUIRED_SAMPLES_PER_CONDITION}件を目標に、次の投稿写真で条件タグを付けて検証してください。`;
  }

  if (goodCount >= 3) {
    return "良い例が複数あります。暗い写真、魚が小さい写真、コケが目立つ写真でも追加検証してください。";
  }

  return "Gateway写真検証を継続中です。良い例と要修正を分類して、実写真での安定性を見ます。";
}

function getNextAiPhotoConditionKey(conditionCounts) {
  return AI_REQUIRED_PHOTO_CONDITIONS.find((key) => conditionCounts[key].total < AI_REQUIRED_SAMPLES_PER_CONDITION) || null;
}

function getAiPhotoConditionCounts(entries) {
  return entries.reduce(
    (counts, entry) => {
      const key = getAllowedValue(
        entry.photoCondition,
        ["unspecified", "normal", "dark", "small_fish", "algae", "reflection"],
        "unspecified",
      );
      counts[key].total += 1;
      if (entry.reviewLabel === "needs_fix") {
        counts[key].needsFix += 1;
      }
      return counts;
    },
    {
      unspecified: { total: 0, needsFix: 0 },
      normal: { total: 0, needsFix: 0 },
      dark: { total: 0, needsFix: 0 },
      small_fish: { total: 0, needsFix: 0 },
      algae: { total: 0, needsFix: 0 },
      reflection: { total: 0, needsFix: 0 },
    },
  );
}

function getAiPromptGeneration(promptVersion) {
  const value = String(promptVersion || "").toLowerCase();
  if (value.includes("v4")) {
    return "v4";
  }
  if (value.includes("v3")) {
    return "v3";
  }
  return "other";
}

function getAiPromptGenerationLabel(generation) {
  if (generation === "v4") {
    return "v4";
  }
  if (generation === "v3") {
    return "v3";
  }
  return "世代未確認";
}

function getAiPromptValidationStatus(entry) {
  const generation = getAiPromptGeneration(entry.promptVersion);
  if (generation === "v3") {
    return "v3_baseline";
  }
  if (generation !== "v4") {
    return "not_v4";
  }
  if (entry.reviewLabel === "good") {
    return "v4_good";
  }
  if (entry.reviewLabel === "needs_fix") {
    return "v4_needs_fix";
  }
  if (entry.reviewLabel === "watch") {
    return "v4_watch";
  }
  return "v4_unreviewed";
}

function getAiPromptValidationStatusLabel(status) {
  const labels = {
    v3_baseline: "v3比較元",
    not_v4: "v4対象外",
    v4_good: "v4良い例",
    v4_needs_fix: "v4要修正",
    v4_watch: "v4保留",
    v4_unreviewed: "v4未評価",
  };
  return labels[status] || "v4対象外";
}

function getAiPromptValidationExportSummary(entries) {
  const generationCounts = entries.reduce(
    (counts, entry) => {
      counts[getAiPromptGeneration(entry.promptVersion)] += 1;
      return counts;
    },
    { v3: 0, v4: 0, other: 0 },
  );
  const v4Entries = entries.filter((entry) => getAiPromptGeneration(entry.promptVersion) === "v4");
  const v4StatusCounts = v4Entries.reduce(
    (counts, entry) => {
      const status = getAiPromptValidationStatus(entry);
      counts[status] += 1;
      return counts;
    },
    { v4_good: 0, v4_needs_fix: 0, v4_watch: 0, v4_unreviewed: 0 },
  );

  return {
    generationCounts,
    v4: {
      total: v4Entries.length,
      reviewed: v4Entries.filter((entry) => ["good", "needs_fix", "watch"].includes(entry.reviewLabel)).length,
      ...v4StatusCounts,
    },
    comparison: getAiPromptGenerationComparison(entries),
  };
}

function getAiPromptGenerationComparison(entries) {
  const conditions = ["dark", "small_fish", "algae", "reflection"];
  return conditions.map((condition) => {
    const v3 = entries.filter(
      (entry) => getAiPromptGeneration(entry.promptVersion) === "v3" && entry.photoCondition === condition,
    );
    const v4 = entries.filter(
      (entry) => getAiPromptGeneration(entry.promptVersion) === "v4" && entry.photoCondition === condition,
    );
    const v3NeedsFix = v3.filter((entry) => entry.reviewLabel === "needs_fix").length;
    const v4NeedsFix = v4.filter((entry) => entry.reviewLabel === "needs_fix").length;
    return {
      condition,
      v3Total: v3.length,
      v3NeedsFix,
      v4Total: v4.length,
      v4NeedsFix,
      improved: v3NeedsFix > 0 && v4.length > 0 && v4NeedsFix === 0,
    };
  });
}

function getAiPromptGenerationSuggestion(comparison, v4Total) {
  if (!v4Total) {
    return "v4の実写真評価はまだありません。同じ撮影条件でGateway分析を実行し、良い例/要修正を分類してください。";
  }

  const improved = comparison.find((item) => item.improved);
  if (improved) {
    return `${getAiPhotoConditionLabel(improved.condition)}はv4で要修正が減っています。他の条件でも同じ流れで評価してください。`;
  }

  const weak = comparison.find((item) => item.v4NeedsFix > 0);
  if (weak) {
    return `${getAiPhotoConditionLabel(weak.condition)}はv4でも要修正があります。評価メモを保存して次の改善候補へ回してください。`;
  }

  return "v4の初期評価は安定しています。暗い写真、魚が小さい写真、コケ多め、反射ありを一通り追加してください。";
}

function getAiWeakPhotoCondition(conditionCounts) {
  return ["dark", "small_fish", "algae", "reflection"]
    .map((key) => ({
      key,
      total: conditionCounts[key].total,
      needsFix: conditionCounts[key].needsFix,
      ratio: conditionCounts[key].total ? conditionCounts[key].needsFix / conditionCounts[key].total : 0,
    }))
    .filter((item) => item.needsFix > 0)
    .sort((a, b) => b.ratio - a.ratio || b.needsFix - a.needsFix)[0] || null;
}

function getAiWeakConditionSuggestion(weakCondition) {
  if (!weakCondition) {
    return "要修正が多い撮影条件はまだ見えていません。条件タグを付けた評価サンプルを増やしてください。";
  }

  const suggestions = {
    dark: "暗い写真では、見える範囲の限定、ライト点灯、正面からの再撮影をより強く促す必要があります。",
    small_fish: "魚が小さい写真では、魚の体表や泳ぎを断定せず、拡大写真や短い動画の追加確認を促します。",
    algae: "コケ多めの写真では、水質値を断定せず、コケの位置、水換え履歴、照明時間の確認へ寄せます。",
    reflection: "反射ありの写真では、反射で見えない範囲を明記し、角度を変えた撮影を促します。",
  };

  return suggestions[weakCondition.key] || "要修正の多い条件に合わせて、観察できた範囲と見えない範囲の分離を強めます。";
}

function applyAiWeakConditionNote(conditionKey) {
  const condition = getAllowedValue(conditionKey, ["dark", "small_fish", "algae", "reflection"], "");
  if (!condition) {
    return;
  }

  const label = getAiPhotoConditionLabel(condition);
  const suggestion = getAiWeakConditionSuggestion({ key: condition });
  const nextNote = `プロンプトv3改善候補: ${label}\n${suggestion}\n評価ログで要修正が多い実写真を確認し、見える範囲と見えない範囲の分離を強める。`;
  aiPromptImprovementNote.value = nextNote;
  state.aiPromptImprovementNote = nextNote;
  saveAiPromptNote({ silentEmpty: true, toastMessage: "弱点候補を改善メモ履歴へ保存しました" });
}

function applyAiNeedsFixEntryNote(entryId) {
  const entry = (state.aiEvaluationLog || []).find((item) => item.id === entryId);
  if (!entry || entry.reviewLabel !== "needs_fix") {
    return;
  }

  const conditionLabel = getAiPhotoConditionLabel(entry.photoCondition);
  const retakeNote = Array.isArray(entry.retakeTips) && entry.retakeTips.length
    ? `撮り直し観点: ${entry.retakeTips.join(" / ")}`
    : "撮り直し観点: 出力に不足。暗さ、反射、魚の小ささ、コケの見え方を明示する。";
  const nextNote = [
    `実写真要修正メモ: ${conditionLabel}`,
    `状態: ${entry.status} / 差分: ${entry.difference}`,
    `要約: ${entry.summary}`,
    retakeNote,
    "改善方針: 見える範囲と見えない範囲を分け、断定表現を確認行動へ移す。",
  ].join("\n");

  aiPromptImprovementNote.value = nextNote;
  state.aiPromptImprovementNote = nextNote;
  saveAiPromptNote({ silentEmpty: true, toastMessage: "要修正レビューを改善メモ履歴へ保存しました" });
}

function applyAiRetestConditionNote(conditionKey) {
  const condition = getAllowedValue(conditionKey, AI_REQUIRED_PHOTO_CONDITIONS, "");
  if (!condition) {
    return;
  }

  const conditionLabel = getAiPhotoConditionLabel(condition);
  const entries = (state.aiEvaluationLog || []).filter(
    (entry) =>
      entry.target === "投稿写真" &&
      entry.source === "AI Gateway" &&
      entry.photoCondition === condition &&
      entry.promptDraftRetestStatus === "retested" &&
      entry.reviewLabel === "needs_fix",
  );

  if (!entries.length) {
    showToast("改善メモへ戻す再評価結果がありません");
    return;
  }

  const latestEntry = entries
    .slice()
    .sort((a, b) => new Date(b.promptDraftRetestedAt || b.createdAt).getTime() - new Date(a.promptDraftRetestedAt || a.createdAt).getTime())[0];
  const retakeNote = Array.isArray(latestEntry.retakeTips) && latestEntry.retakeTips.length
    ? `残った撮り直し観点: ${latestEntry.retakeTips.join(" / ")}`
    : "残った撮り直し観点: 出力に不足。見えない範囲、撮影角度、追加確認を具体化する。";
  const nextNote = [
    `再評価要再調整メモ: ${conditionLabel}`,
    `再評価後も要修正: ${entries.length}件`,
    `最新例: ${latestEntry.status} / ${latestEntry.difference}`,
    `要約: ${latestEntry.summary}`,
    retakeNote,
    "改善方針: 草案で反映した条件別ルールを強め、見える根拠と確認行動をさらに分ける。",
  ].join("\n");

  aiPromptImprovementNote.value = nextNote;
  state.aiPromptImprovementNote = nextNote;
  saveAiPromptNote({ silentEmpty: true, toastMessage: "再評価結果を改善メモ履歴へ戻しました" });
}

function getAiEvaluationSuggestion(counts, entries) {
  if (!entries.length) {
    return "実写真でAI分析を実行し、出力を分類すると改善候補が見えてきます。";
  }

  if (counts.needs_fix >= Math.max(2, counts.good)) {
    return "要修正が多めです。言い過ぎた表現、見えていない推測、撮り直し案の不足を改善メモへ残してください。";
  }

  if (counts.unreviewed > counts.good + counts.needs_fix + counts.watch) {
    return "未評価が多めです。まず良い例と要修正を分けて、プロンプトの改善点を絞り込みます。";
  }

  if (counts.good > 0 && counts.needs_fix === 0) {
    return "良い例が安定しています。次は写真条件を変えて、暗い写真や魚が小さい写真でも確認してください。";
  }

  return "分類バランスは確認中です。要修正の評価メモをもとに次のプロンプト案を作ります。";
}

function getAiReviewOptions(currentValue = "unreviewed") {
  const options = [
    ["unreviewed", "未評価"],
    ["good", "良い例"],
    ["needs_fix", "要修正"],
    ["watch", "保留"],
  ];

  return options
    .map(([value, label]) => `<option value="${value}" ${value === currentValue ? "selected" : ""}>${label}</option>`)
    .join("");
}

function getAiReviewLabel(value) {
  const labels = {
    unreviewed: "未評価",
    good: "良い例",
    needs_fix: "要修正",
    watch: "保留",
  };
  return labels[value] || labels.unreviewed;
}

function getAiPhotoConditionOptions(currentValue = "unspecified") {
  const options = [
    ["unspecified", "未指定"],
    ["normal", "通常写真"],
    ["dark", "暗い写真"],
    ["small_fish", "魚が小さい"],
    ["algae", "コケ多め"],
    ["reflection", "反射あり"],
  ];

  return options
    .map(([value, label]) => `<option value="${value}" ${value === currentValue ? "selected" : ""}>${label}</option>`)
    .join("");
}

function getAiPhotoConditionLabel(value) {
  const labels = {
    unspecified: "未指定",
    normal: "通常写真",
    dark: "暗い写真",
    small_fish: "魚が小さい",
    algae: "コケ多め",
    reflection: "反射あり",
  };
  return labels[value] || labels.unspecified;
}

function getAiPromptDraftRetestLabel(value) {
  const labels = {
    none: "未確認",
    retest_needed: "再評価対象",
    retested: "再評価済み",
    re_review_needed: "再レビュー対象",
    re_reviewed: "再レビュー済み",
  };
  return labels[value] || labels.none;
}

function getAiPromptDraftRetestToast(value) {
  const labels = {
    none: "草案後レビューを未確認にしました",
    retest_needed: "草案後の再評価対象にしました",
    retested: "草案後の再評価済みにしました",
    re_review_needed: "草案再強化後の再レビュー対象にしました",
    re_reviewed: "草案再強化後の再レビュー済みにしました",
  };
  return labels[value] || "草案後レビューを更新しました";
}

function saveAiPromptNote(options = {}) {
  const note = aiPromptImprovementNote.value.trim();
  if (!note) {
    if (!options.silentEmpty) {
      showToast("改善メモを入力してください");
    }
    return;
  }

  state.aiPromptNotes = [
    normalizeAiPromptNote({
      id: createId("prompt-note"),
      promptVersion: aiApiStatus.promptVersion,
      note,
      createdAt: new Date().toISOString(),
    }),
    ...(state.aiPromptNotes || []),
  ].slice(0, 20);
  state.aiPromptImprovementNote = "";
  saveState();
  renderAiEvaluationLog();

  if (authSession?.user) {
    syncAiPromptNotesToSupabase({ silent: true });
  }

  showToast(options.toastMessage || "プロンプト改善メモを履歴に保存しました");
}

function normalizeAiApiResult(result, fallbackResult) {
  const status = ["良好", "注意", "要確認"].includes(result?.status) ? result.status : fallbackResult.status;
  const levelClass = ["", "warning", "danger"].includes(result?.levelClass)
    ? result.levelClass
    : fallbackResult.levelClass;
  const items = Array.isArray(result?.items) && result.items.length
    ? result.items.map((item) => String(item)).slice(0, 5)
    : fallbackResult.items;
  const observations = Array.isArray(result?.observations)
    ? result.observations.map((item) => String(item)).slice(0, 4)
    : [];
  const retakeTips = Array.isArray(result?.retakeTips)
    ? result.retakeTips.map((item) => String(item)).slice(0, 4)
    : [];
  const confidence = Number.isFinite(Number(result?.confidence)) ? Math.min(1, Math.max(0, Number(result.confidence))) : null;

  return {
    status,
    levelClass,
    summary: result?.summary ? String(result.summary) : fallbackResult.summary,
    items,
    observations,
    retakeTips,
    confidence,
    model: result?.model || null,
    promptVersion: result?.promptVersion || null,
    source: result?.source || null,
    imageAnalysis: result?.imageAnalysis || null,
  };
}

function getAiTankPayload(tank) {
  return {
    name: tank.name,
    kind: tank.kind,
    animals: tank.animals,
    plants: tank.plants,
    residents: getTankResidentValue(tank),
    equipment: tank.equipment,
    volumeLabel: tank.volume,
  };
}

function analyzePostPhoto(post) {
  if (getPostVideoSrc(post) || post.mediaType === "video") {
    return {
      status: "動画チェック準備中",
      levelClass: "warning",
      summary: "動画投稿は表示まで対応しました。今後、魚の動きや水面の様子を短い動画から確認できるようにします。",
      items: [
        "今できること: 動画を投稿として保存し、コミュニティとアルバムで確認する",
        "対応済み: 動画の再生時間とサムネイルをアルバムに表示",
        "次に作ること: 魚の動きや水面の様子をAIで確認する下準備",
        "撮影のコツ: 10秒前後で、水面・魚・全景が分かるように撮る",
      ],
    };
  }

  if (!getPostImageSrc(post) && post.mediaType !== "image") {
    return {
      status: "写真なし",
      levelClass: "warning",
      summary: "この投稿には実画像がないため、画像分析はできません。画像つきで投稿すると確認できます。",
      items: [
        "次にやること: 水槽や魚が見える写真を投稿する",
        "撮影のコツ: 水面の反射を避け、ライトをつけて正面から撮る",
        "記録すると良いこと: 水温、pH、水換え日も一緒に残す",
      ],
    };
  }

  return {
    status: "写真チェック",
    levelClass: "warning",
    summary: "写真からの簡易チェックです。水の透明度、コケ、魚の動きはログと合わせて確認しましょう。",
    items: [
      "見るポイント: 水の白濁、緑っぽさ、ガラス面のコケ",
      "魚の確認: 水面に集まりすぎていないか、泳ぎ方に変化がないか",
      "おすすめ: 同じ角度で定期的に撮ると、成長や変化を比べやすくなります",
    ],
  };
}

function renderTasks() {
  document.querySelectorAll("[data-task]").forEach((checkbox) => {
    checkbox.checked = Boolean(state.tasks[checkbox.dataset.task]);
  });

  document.querySelectorAll("[data-task-status]").forEach((status) => {
    const taskId = status.dataset.taskStatus;
    const isDone = Boolean(state.tasks[taskId]);
    status.textContent = isDone ? "完了" : getReminderStatus(taskId);
  });
}

function renderReminders() {
  if (!reminderList) {
    return;
  }

  reminderList.innerHTML = Object.entries(taskLabels)
    .map(([taskId, label]) => {
      const reminder = state.reminders[taskId] || defaultReminders[taskId];
      const checked = reminder.enabled ? "checked" : "";
      const rowClass = reminder.enabled ? "" : "is-off";
      const status = getReminderStatusText(taskId, reminder);

      return `
        <div class="reminder-row ${rowClass}">
          <input type="checkbox" data-reminder-enabled="${escapeHtml(taskId)}" ${checked}>
          <div class="reminder-summary">
            <strong>${escapeHtml(label)}</strong>
            <small>${status}</small>
          </div>
          <div class="reminder-controls">
            <select data-reminder-schedule="${escapeHtml(taskId)}" aria-label="${escapeHtml(label)}の繰り返し">
              <option value="daily" ${reminder.schedule === "daily" ? "selected" : ""}>毎日</option>
              <option value="weekly" ${reminder.schedule === "weekly" ? "selected" : ""}>曜日指定</option>
              <option value="interval" ${reminder.schedule === "interval" ? "selected" : ""}>何日ごと</option>
            </select>
            <input type="time" value="${escapeAttribute(reminder.time)}" data-reminder-time="${escapeHtml(taskId)}" aria-label="${escapeHtml(label)}の通知時刻">
            ${renderReminderScheduleControls(taskId, reminder)}
          </div>
        </div>
      `;
    })
    .join("");

  reminderList.querySelectorAll("[data-reminder-enabled]").forEach((input) => {
    input.addEventListener("change", () => {
      const taskId = input.dataset.reminderEnabled;
      state.reminders[taskId].enabled = input.checked;
      saveReminderSettings();
    });
  });

  reminderList.querySelectorAll("[data-reminder-time]").forEach((input) => {
    input.addEventListener("change", () => {
      const taskId = input.dataset.reminderTime;
      state.reminders[taskId].time = input.value || defaultReminders[taskId].time;
      state.reminders[taskId].lastNotifiedOn = null;
      saveReminderSettings();
    });
  });

  reminderList.querySelectorAll("[data-reminder-schedule]").forEach((select) => {
    select.addEventListener("change", () => {
      const taskId = select.dataset.reminderSchedule;
      state.reminders[taskId].schedule = select.value;
      state.reminders[taskId].lastNotifiedOn = null;
      saveReminderSettings();
    });
  });

  reminderList.querySelectorAll("[data-reminder-weekday]").forEach((input) => {
    input.addEventListener("change", () => {
      const taskId = input.dataset.reminderWeekday;
      const weekday = Number(input.value);
      const reminder = state.reminders[taskId];
      const weekdays = new Set(reminder.weekdays);

      if (input.checked) {
        weekdays.add(weekday);
      } else {
        weekdays.delete(weekday);
      }

      reminder.weekdays = weekdays.size ? [...weekdays].sort((a, b) => a - b) : [new Date().getDay()];
      reminder.lastNotifiedOn = null;
      saveReminderSettings();
    });
  });

  reminderList.querySelectorAll("[data-reminder-interval]").forEach((input) => {
    input.addEventListener("change", () => {
      const taskId = input.dataset.reminderInterval;
      state.reminders[taskId].intervalDays = clampNumber(
        input.value,
        1,
        getReminderIntervalMax(taskId),
        defaultReminders[taskId].intervalDays,
      );
      state.reminders[taskId].lastNotifiedOn = null;
      saveReminderSettings();
    });
  });

  reminderList.querySelectorAll("[data-reminder-start]").forEach((input) => {
    input.addEventListener("change", () => {
      const taskId = input.dataset.reminderStart;
      state.reminders[taskId].startDate = isValidDateKey(input.value) ? input.value : getDateKey(new Date());
      state.reminders[taskId].lastNotifiedOn = null;
      saveReminderSettings();
    });
  });

  renderNextReminder();
  renderNotificationButtons();
}

async function saveReminderSettings() {
  saveState();
  renderTasks();
  renderReminders();

  if (authSession?.user) {
    const remindersSynced = await syncRemindersToSupabase({ silent: true });
    if (remindersSynced) {
      await syncNotificationDeliveriesToSupabase({ silent: true });
    }
  }
}

function renderReminderScheduleControls(taskId, reminder) {
  if (reminder.schedule === "weekly") {
    return `
      <div class="weekday-picker" aria-label="${escapeHtml(taskLabels[taskId])}の曜日">
        ${weekdayLabels
          .map(
            (label, index) => `
              <label>
                <input type="checkbox" value="${index}" data-reminder-weekday="${escapeHtml(taskId)}" ${reminder.weekdays.includes(index) ? "checked" : ""}>
                <span>${label}</span>
              </label>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (reminder.schedule === "interval") {
    const intervalMax = getReminderIntervalMax(taskId);
    return `
      <div class="interval-controls">
        <label>
          <span>間隔</span>
          <input type="number" min="1" max="${escapeAttribute(intervalMax)}" value="${escapeAttribute(reminder.intervalDays)}" data-reminder-interval="${escapeHtml(taskId)}">
        </label>
        <label>
          <span>開始日</span>
          <input type="date" value="${escapeAttribute(reminder.startDate)}" data-reminder-start="${escapeHtml(taskId)}">
        </label>
      </div>
    `;
  }

  return "";
}

function renderNextReminder() {
  const nextReminder = getNextReminder();

  if (!nextReminder) {
    sidebarNextTime.textContent = "予定なし";
    sidebarNextTask.textContent = "リマインダーはオフです";
    return;
  }

  sidebarNextTime.textContent = formatReminderDate(nextReminder.date);
  sidebarNextTask.textContent = nextReminder.label;
}

function renderNotificationButtons() {
  const label = getNotificationButtonLabel();
  notificationButton.title = label;
  enableNotificationsButton.textContent = label;
  if (notificationPreferenceSummary) {
    notificationPreferenceSummary.textContent = getNotificationPreferenceSummary();
  }
}

function getReminderStatus(taskId) {
  const reminder = state.reminders[taskId];

  if (!reminder?.enabled) {
    return "OFF";
  }

  return getReminderStatusText(taskId, reminder);
}

function getReminderStatusText(taskId, reminder = state.reminders[taskId]) {
  if (!reminder?.enabled) {
    return "通知オフ";
  }

  const nextReminder = getNextReminderForTask(taskId, reminder, new Date());
  const todayKey = getDateKey(new Date());
  if (state.tasks[taskId] && nextReminder && getDateKey(nextReminder.date) !== todayKey) {
    return `今日のタスクは完了 / 次回 ${formatReminderDate(nextReminder.date)}`;
  }

  if (!nextReminder) {
    return "通知予定なし";
  }

  return `${getScheduleLabel(reminder)} / 次回 ${formatReminderDate(nextReminder.date)}`;
}

function getNextReminder() {
  const now = new Date();
  return Object.entries(taskLabels)
    .map(([taskId, label]) => {
      const reminder = state.reminders[taskId] || defaultReminders[taskId];
      const nextReminder = getNextReminderForTask(taskId, reminder, now);
      return nextReminder ? { taskId, label, date: nextReminder.date } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.date - b.date)[0];
}

function getNextReminderForTask(taskId, reminder, now = new Date()) {
  if (!reminder?.enabled) {
    return null;
  }

  const todayKey = getDateKey(now);
  for (let offset = 0; offset <= 370; offset += 1) {
    const candidate = new Date(now);
    candidate.setDate(now.getDate() + offset);
    const dateKey = getDateKey(candidate);

    if (!doesReminderMatchDate(reminder, candidate)) {
      continue;
    }

    const date = getReminderDate(reminder.time, candidate);
    if (date <= now) {
      continue;
    }

    if (dateKey === todayKey && state.tasks[taskId]) {
      continue;
    }

    return { date };
  }

  return null;
}

function checkDueReminders() {
  ensureDailyTasks();

  const now = new Date();
  const todayKey = getDateKey(now);
  let changed = false;

  Object.entries(taskLabels).forEach(([taskId, label]) => {
    const reminder = state.reminders[taskId];
    if (!reminder?.enabled || state.tasks[taskId] || reminder.lastNotifiedOn === todayKey) {
      return;
    }

    if (!doesReminderMatchDate(reminder, now)) {
      return;
    }

    const dueAt = getReminderDate(reminder.time, now);
    const deltaMs = now.getTime() - dueAt.getTime();
    if (deltaMs < 0 || deltaMs > 60000) {
      return;
    }

    reminder.lastNotifiedOn = todayKey;
    changed = true;
    notifyReminder(label);
  });

  if (changed) {
    saveState();
    renderReminders();
  }
}

function notifyReminder(label) {
  const message = `${getActiveTank().name} の${label}の時間です`;
  const account = state.account;

  if (account.notificationChannel === "none") {
    return;
  }

  if (isWithinQuietHours(new Date())) {
    showToast(`静音時間中です。${message}`);
    return;
  }

  if (canDeliverBrowserNotification()) {
    new Notification("AquaNote", {
      body: message,
      tag: `aquanote-${label}`,
    });
    return;
  }

  if (account.notificationChannel === "email") {
    showToast(`メール通知予定: ${message}`);
    return;
  }

  if (account.notificationChannel === "push") {
    showToast(`PWA Push準備中: ${message}`);
    return;
  }

  showToast(message);
}

async function requestNotificationPermission() {
  if (state.account.notificationChannel === "none") {
    showToast("アカウント設定で通知がオフです");
    return;
  }

  if (state.account.notificationChannel === "email") {
    showToast("メール通知は配信処理の実装後に使います");
    return;
  }

  if (state.account.notificationChannel === "push" && !getPushApplicationServerKey()) {
    showToast("PWA Pushの公開鍵を設定してください");
    return;
  }

  if (!canUseNotifications()) {
    showToast("このブラウザでは通知に対応していません");
    return;
  }

  if (Notification.permission === "granted") {
    state.account.browserNotifications = true;
    saveState();
    if (authSession?.user) {
      await syncProfileToSupabase({ silent: true });
      await syncPushSubscriptionToSupabase({ silent: true });
    }
    showToast("通知は有効です");
    renderNotificationButtons();
    return;
  }

  if (Notification.permission === "denied") {
    state.account.browserNotifications = false;
    saveState();
    showToast("ブラウザ設定で通知がブロックされています");
    renderNotificationButtons();
    return;
  }

  const permission = await Notification.requestPermission();
  state.account.browserNotifications = permission === "granted";
  saveState();
  if (authSession?.user) {
    await syncProfileToSupabase({ silent: true });
    await syncPushSubscriptionToSupabase({ silent: true });
  }
  showToast(permission === "granted" ? "通知を有効にしました" : "通知は許可されませんでした");
  renderNotificationButtons();
}

function canUseNotifications() {
  return "Notification" in window;
}

function canUsePushNotifications() {
  return canUseNotifications() && "serviceWorker" in navigator && "PushManager" in window;
}

function getNotificationButtonLabel() {
  if (state.account.notificationChannel === "none") {
    return "通知オフ";
  }

  if (state.account.notificationChannel === "email") {
    return "メール通知準備";
  }

  if (!canUseNotifications()) {
    return "通知非対応";
  }

  if (canDeliverBrowserNotification()) {
    return "通知オン";
  }

  if (Notification.permission === "denied") {
    return "通知ブロック中";
  }

  return "通知を許可";
}

function canDeliverBrowserNotification() {
  return (
    canUseNotifications() &&
    Notification.permission === "granted" &&
    Boolean(state.account.browserNotifications) &&
    ["browser", "push"].includes(state.account.notificationChannel)
  );
}

function getPushApplicationServerKey() {
  const key = pushConfig.publicKey || pushConfig.vapidPublicKey;
  if (!key) {
    return null;
  }

  try {
    return urlBase64ToUint8Array(key);
  } catch (error) {
    return null;
  }
}

function urlBase64ToUint8Array(value) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = `${value}${padding}`.replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const output = new Uint8Array(rawData.length);

  for (let index = 0; index < rawData.length; index += 1) {
    output[index] = rawData.charCodeAt(index);
  }

  return output;
}

function getNotificationPreferenceSummary() {
  const channelLabels = {
    browser: "ブラウザ通知",
    push: "PWA Push準備",
    email: "メール通知準備",
    none: "通知しない",
  };
  const channel = channelLabels[state.account.notificationChannel] || channelLabels.browser;
  const quiet = `${state.account.quietHoursStart}-${state.account.quietHoursEnd}`;
  const browserState = state.account.browserNotifications ? "ブラウザON" : "ブラウザOFF";
  const emailState = state.account.emailNotifications ? "メールON" : "メールOFF";

  const externalDelivery = getNextExternalNotificationDelivery();
  const delivery = externalDelivery
    ? ` / 次回配信 ${formatReminderDate(externalDelivery.date)} ${externalDelivery.label}`
    : "";

  return `${channel} / ${browserState} / ${emailState} / 静音 ${quiet}${delivery}`;
}

function getDeliveryStatusLabel(status) {
  const labels = {
    pending: "予約中",
    sent: "送信済み",
    failed: "失敗",
    skipped: "スキップ",
    canceled: "取消",
  };

  return labels[status] || "未確認";
}

function getVerificationStatusLabel(status) {
  const labels = {
    ready: "OK",
    missing: "確認",
    manual: "本番",
  };

  return labels[status] || "確認";
}

function getNotificationPermissionLabel() {
  if (!canUseNotifications()) {
    return "通知API非対応";
  }

  const labels = {
    granted: "許可済み",
    denied: "ブロック中",
    default: "未許可",
  };

  return labels[Notification.permission] || "未確認";
}

function getDeliveryOperationNote(delivery) {
  if (delivery.status === "pending") {
    return "次回の通知ワーカー実行で処理されます。dry-run中は送信されません。";
  }

  if (delivery.status === "sent") {
    return "送信処理は完了しています。端末側の受信状況はPush権限とService Worker状態も確認してください。";
  }

  if (delivery.status === "failed") {
    return delivery.channel === "email"
      ? "送信元メール、Resend APIキー、宛先メールを確認してから再送予約してください。"
      : "VAPID鍵、Push購読、Service Worker、Push endpointの応答を確認してから再送予約してください。";
  }

  if (delivery.status === "skipped") {
    return "通知設定、チャンネル、購読状態、メールアドレスのいずれかにより送信対象外になっています。";
  }

  if (delivery.status === "canceled") {
    return "リマインダー変更などで取り消された予約です。必要なら通知設定を保存し直してください。";
  }

  return "配信ワーカーの結果と環境変数を確認してください。";
}

function getNextExternalNotificationDelivery() {
  if (!getExternalNotificationChannel()) {
    return null;
  }

  return getNextReminder();
}

function isWithinQuietHours(date) {
  const start = state.account.quietHoursStart;
  const end = state.account.quietHoursEnd;
  if (!isValidTimeValue(start) || !isValidTimeValue(end) || start === end) {
    return false;
  }

  const currentMinutes = date.getHours() * 60 + date.getMinutes();
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);

  if (startMinutes < endMinutes) {
    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  }

  return currentMinutes >= startMinutes || currentMinutes < endMinutes;
}

function timeToMinutes(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function renderDashboard() {
  const tank = getActiveTank();
  const latestLog = tank.logs[0];
  const latestWaterChange = tank.logs.find((log) => log.type === "水換え");
  const aiStatus = tank.latestAi || getLogBasedStatus(latestLog, latestWaterChange);
  const waterChangeDays = latestWaterChange ? diffDays(latestWaterChange.createdAt) : null;
  const filterStatus = getFilterMaintenanceStatus(tank.filter);

  document.querySelector("#metric-temp").textContent = latestLog ? `${Number(latestLog.temp).toFixed(1)}°C` : "--";
  document.querySelector("#metric-temp-note").textContent = latestLog ? `${tank.name} / ${formatRelativeDate(latestLog.createdAt)}` : `${tank.name} は記録待ち`;
  document.querySelector("#metric-ph").textContent = latestLog ? Number(latestLog.ph).toFixed(1) : "--";
  document.querySelector("#metric-ph-note").textContent = latestLog ? `${latestLog.type}ログから表示` : "記録待ち";
  document.querySelector("#metric-water-change").textContent = waterChangeDays === null ? "--" : `${waterChangeDays}日前`;
  document.querySelector("#metric-water-change-note").textContent = getWaterChangeNote(waterChangeDays);
  document.querySelector("#metric-filter-status").textContent = filterStatus.label;
  document.querySelector("#metric-filter-note").textContent = filterStatus.nextLabel;
  document.querySelector("#metric-ai-status").textContent = aiStatus.status;
  document.querySelector("#metric-ai-note").textContent = `${tank.name}: ${aiStatus.summary}`;
  document.querySelector("#app-active-tank").textContent = tank.name;
  document.querySelector("#app-health-chip").textContent = aiStatus.status;
  document.querySelector("#rail-ai-title").textContent = aiStatus.status === "良好" ? "安定" : aiStatus.status;
  document.querySelector("#rail-ai-copy").textContent = aiStatus.summary;
  document.querySelector("#rail-ai-score").textContent = getRiskScore(aiStatus.levelClass);
  document.querySelector("#rail-ph").textContent = latestLog ? Number(latestLog.ph).toFixed(1) : "--";

  const aiCard = document.querySelector("#metric-ai-card");
  aiCard.classList.toggle("alert", aiStatus.levelClass !== "");
  aiCard.classList.toggle("danger", aiStatus.levelClass === "danger");

  const filterCard = document.querySelector("#metric-filter-card");
  filterCard.classList.toggle("alert", filterStatus.level === "watch" || filterStatus.level === "pending");
  filterCard.classList.toggle("danger", filterStatus.level === "danger");

  const healthChip = document.querySelector("#app-health-chip");
  healthChip.classList.toggle("is-warning", aiStatus.levelClass === "warning");
  healthChip.classList.toggle("is-danger", aiStatus.levelClass === "danger");
}

function getRiskScore(levelClass) {
  if (levelClass === "danger") {
    return "84";
  }

  if (levelClass === "warning") {
    return "72";
  }

  return "24";
}

function renderAiResult(result, post = null) {
  const resultBox = document.querySelector("#ai-result");
  const videoSrc = post ? getPostVideoSrc(post) : null;
  const imageSrc = post ? getPostImageSrc(post) : null;
  const metaItems = [
    result.source ? `分析: ${result.source}` : "",
    result.imageAnalysis === "real-photo" ? "画像: 実写真" : "",
    result.model ? `モデル: ${result.model}` : "",
    result.promptVersion ? `プロンプト: ${result.promptVersion}` : "",
    Number.isFinite(Number(result.confidence)) ? `信頼度: ${Math.round(Number(result.confidence) * 100)}%` : "",
  ].filter(Boolean);
  const observations = Array.isArray(result.observations) ? result.observations : [];
  const retakeTips = Array.isArray(result.retakeTips) ? result.retakeTips : [];
  const mediaMarkup = videoSrc
    ? `
      <div class="ai-photo-preview has-video">
        <video src="${escapeAttribute(videoSrc)}" controls muted playsinline preload="metadata"></video>
        <b class="media-badge">${formatVideoDuration(post.videoDuration)}</b>
      </div>
    `
    : imageSrc
      ? `<div class="ai-photo-preview" style="background-image: url('${escapeAttribute(imageSrc)}')"></div>`
      : "";

  resultBox.className = `ai-result ${result.levelClass}`;
  resultBox.innerHTML = `
    ${mediaMarkup}
    <p class="status-label">状態</p>
    <strong>${escapeHtml(result.status)}</strong>
    ${metaItems.length ? `<p class="ai-result-meta">${metaItems.map(escapeHtml).join(" / ")}</p>` : ""}
    <p>${escapeHtml(result.summary)}</p>
    ${
      observations.length
        ? `
          <div class="ai-observations">
            <span>見える根拠</span>
            <ul>
              ${observations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </div>
        `
        : ""
    }
    ${
      retakeTips.length
        ? `
          <div class="ai-observations">
            <span>撮り直し・追加確認</span>
            <ul>
              ${retakeTips.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </div>
        `
        : ""
    }
    <ul>
      ${result.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function createAiResultState(result) {
  return {
    status: result.status,
    summary: result.summary,
    levelClass: result.levelClass,
    items: Array.isArray(result.items) ? result.items : [],
    observations: Array.isArray(result.observations) ? result.observations : [],
    retakeTips: Array.isArray(result.retakeTips) ? result.retakeTips : [],
    confidence: result.confidence ?? null,
    model: result.model || null,
    promptVersion: result.promptVersion || null,
    source: result.source || null,
    checkedAt: new Date().toISOString(),
  };
}

function analyzeTank({ water, fish, algae, days }) {
  let score = 0;
  const items = [];

  if (water === "cloudy") {
    score += 2;
    items.push("今日やること: 餌を控えめにして、フィルターと水換え履歴を確認");
  }

  if (water === "green") {
    score += 2;
    items.push("確認ポイント: 照明時間、直射日光、栄養過多の可能性");
  }

  if (water === "yellow") {
    score += 1;
    items.push("数日見ること: 流木の色素、底床の汚れ、水換え間隔");
  }

  if (fish === "bottom" || fish === "surface" || fish === "low") {
    score += 2;
    items.push("危険サイン: 呼吸が荒い、横たわる、急に食べない状態が続く");
  }

  if (algae === "medium") {
    score += 1;
    items.push("対策候補: 照明時間を少し短くし、ガラス面を観察");
  }

  if (algae === "high") {
    score += 2;
    items.push("対策候補: 照明、餌、硝酸塩、リン酸のバランスを確認");
  }

  if (days >= 14) {
    score += 2;
    items.push("今日やること: 生体に負担が出ない範囲で部分換水を検討");
  }

  if (items.length === 0) {
    items.push("今日やること: 食欲、水温、pHをいつも通り記録");
    items.push("数日見ること: 水の透明度とコケの増え方");
    items.push("危険サイン: 急な白濁、水面での口ぱく、魚の急な衰弱");
  }

  if (score >= 5) {
    return {
      status: "要確認",
      levelClass: "danger",
      summary: "複数の注意サインがあります。水温、pH、亜硝酸、フィルター状態を確認しましょう。",
      items,
    };
  }

  if (score >= 2) {
    return {
      status: "注意",
      levelClass: "warning",
      summary: "少し気になる変化があります。写真と水質記録を残して、数日単位で変化を見ましょう。",
      items,
    };
  }

  return {
    status: "良好",
    levelClass: "",
    summary: "大きな異常は見当たりません。pHと水温を定期的に記録しましょう。",
    items,
  };
}

function getLogBasedStatus(latestLog, latestWaterChange) {
  if (!latestLog) {
    return { status: "未記録", levelClass: "warning", summary: "まず水温とpHを記録" };
  }

  const ph = Number(latestLog.ph);
  const temp = Number(latestLog.temp);
  const waterChangeDays = latestWaterChange ? diffDays(latestWaterChange.createdAt) : 99;

  if (ph < 6.0 || ph > 8.2 || temp < 20 || temp > 29 || waterChangeDays >= 14) {
    return { status: "要確認", levelClass: "danger", summary: "水質・水温・換水間隔を確認" };
  }

  if (ph < 6.4 || ph > 7.8 || temp < 22 || temp > 27 || waterChangeDays >= 7) {
    return { status: "注意", levelClass: "warning", summary: "数日続けて記録して変化を見る" };
  }

  return { status: "良好", levelClass: "", summary: "最新ログでは安定" };
}

function getWaterChangeNote(days) {
  if (days === null) {
    return "水換えログを追加してください";
  }

  if (days >= 14) {
    return "部分換水を検討";
  }

  if (days >= 7) {
    return "そろそろ確認";
  }

  return "次回目安まで余裕あり";
}

function getActiveTank() {
  ensureActiveTank();
  return state.tanks.find((tank) => tank.id === state.activeTankId);
}

function ensureActiveTank() {
  if (!Array.isArray(state.tanks) || state.tanks.length === 0) {
    state.tanks = cloneState(defaultState.tanks);
  }

  if (!state.tanks.some((tank) => tank.id === state.activeTankId)) {
    state.activeTankId = state.tanks[0].id;
  }
}

function ensureDailyTasks() {
  const todayKey = getDateKey(new Date());

  if (state.taskDate === todayKey) {
    return;
  }

  state.tasks = getEmptyTasks();
  state.taskDate = todayKey;
  saveState();
}

function closePostModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  resetPostForm();
}

function openPostModal(postId = null) {
  const post = state.posts.find((item) => item.id === postId);
  editingPostId = post?.id || null;
  pendingPostImageDataUrl = null;
  pendingPostVideoDataUrl = null;
  pendingPostVideoThumbnailDataUrl = null;
  pendingPostVideoDuration = null;
  pendingPostMediaType = null;

  renderPostControls();
  postModalTitle.textContent = post ? "投稿を編集" : "水槽を投稿";
  postSubmitButton.textContent = post ? "更新する" : "投稿する";

  if (post) {
    postTankSelect.value = post.tankId || state.activeTankId;
    document.querySelector("#post-title").value = post.title;
    document.querySelector("#post-tag").value = post.tag;
    document.querySelector("#post-text").value = post.text;
  } else {
    postTankSelect.value = state.activeTankId;
    document.querySelector("#post-title").value = "今日の水槽";
    document.querySelector("#post-tag").value = getActiveTank().kind || "水槽";
    document.querySelector("#post-text").value = "水草が伸びてきたので記録します。";
  }

  postImageInput.value = "";
  renderPostImagePreview();
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  modal.querySelector(".modal-panel")?.scrollTo({ top: 0 });
}

function resetPostForm() {
  pendingPostImageDataUrl = null;
  pendingPostVideoDataUrl = null;
  pendingPostVideoThumbnailDataUrl = null;
  pendingPostVideoDuration = null;
  pendingPostMediaType = null;
  editingPostId = null;
  postImageInput.value = "";
  postForm.reset();
  postModalTitle.textContent = "水槽を投稿";
  postSubmitButton.textContent = "投稿する";
  renderPostImagePreview();
}

function setDefaultLogDate() {
  logDateInput.value = toDatetimeLocalValue(new Date());
}

function loadAppState() {
  return persistenceAdapter.load();
}

function saveAppState(options = {}) {
  if (!options.keepSyncStatus && state.account?.signedIn) {
    state.account.syncStatus = "local";
  }

  persistenceAdapter.save(state);
}

function loadLocalState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.tanks) && Array.isArray(saved.posts)) {
      return normalizeState(saved);
    }

    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
    if (legacy && Array.isArray(legacy.logs)) {
      const migrated = cloneState(defaultState);
      migrated.posts = Array.isArray(legacy.posts) ? legacy.posts : migrated.posts;
      migrated.tasks = { ...migrated.tasks, ...legacy.tasks };
      migrated.taskDate = getDateKey(new Date());
      migrated.tanks[0].logs = legacy.logs;
      migrated.tanks[0].latestAi = legacy.latestAi || null;
      return normalizeState(migrated);
    }

    return cloneState(defaultState);
  } catch {
    return cloneState(defaultState);
  }
}

function normalizeState(saved) {
  const normalized = {
    ...cloneState(defaultState),
    ...saved,
    account: normalizeAccount(saved.account),
    tasks: { ...defaultState.tasks, ...saved.tasks },
    taskDate: saved.taskDate || getDateKey(new Date()),
    reminders: normalizeReminders(saved.reminders),
    pwaTestResults: Array.isArray(saved.pwaTestResults) ? saved.pwaTestResults.map(normalizePwaTestResult) : [],
    monitorFeedback: Array.isArray(saved.monitorFeedback) ? saved.monitorFeedback.map(normalizeMonitorFeedback) : [],
    productionSetupCheck: normalizeProductionSetupCheck(saved.productionSetupCheck || {}),
    notificationProductionCheck: normalizeNotificationProductionCheck(saved.notificationProductionCheck || {}),
    pwaReleaseDecision: normalizePwaReleaseDecision(saved.pwaReleaseDecision || {}),
    aiEvaluationLog: Array.isArray(saved.aiEvaluationLog) ? saved.aiEvaluationLog.map(normalizeAiEvaluationEntry) : [],
    aiPromptImprovementNote: saved.aiPromptImprovementNote || "",
    aiPromptNotes: Array.isArray(saved.aiPromptNotes) ? saved.aiPromptNotes.map(normalizeAiPromptNote) : [],
  };

  if (!normalized.tanks.length) {
    normalized.tanks = cloneState(defaultState).tanks;
  }

  normalized.tanks = normalized.tanks.map((tank) => {
    const residentParts = getTankResidentParts(tank);
    const nextTank = {
      ...tank,
      ...residentParts,
    };

    return {
      ...nextTank,
      volume: nextTank.volume || "容量未設定",
      residents: getTankResidentValue(nextTank),
      equipment: normalizeSpeciesValues(nextTank.equipment || nextTank.equipment_names || "").join("、"),
      filter: normalizeTankFilter(nextTank.filter),
      tags: Array.isArray(nextTank.tags) ? nextTank.tags : [nextTank.kind || "水槽"],
      logs: Array.isArray(nextTank.logs) ? nextTank.logs.map(normalizeLog) : [],
      latestAi: nextTank.latestAi ? normalizeAiResult(nextTank.latestAi) : null,
      featuredPostId: nextTank.featuredPostId || null,
      albumOrder: Array.isArray(nextTank.albumOrder) ? nextTank.albumOrder : [],
      cloudId: nextTank.cloudId || null,
    };
  });
  normalized.posts = normalized.posts.map((post, index) => {
    const fallbackTank = normalized.tanks[index % normalized.tanks.length] || normalized.tanks[0];
    const tankId = normalized.tanks.some((tank) => tank.id === post.tankId) ? post.tankId : fallbackTank.id;

    return {
      imageDataUrl: null,
      videoDataUrl: null,
      videoThumbnailDataUrl: null,
      videoDuration: null,
      mediaType: post.videoDataUrl ? "video" : post.imageDataUrl ? "image" : null,
      mediaCloudId: null,
      mediaStoragePath: null,
      mediaThumbnailPath: null,
      mediaStorageSignature: null,
      mediaUrl: null,
      mediaThumbnailUrl: null,
      createdAt: daysAgoIso(index),
      ...post,
      tankId,
      comments: Array.isArray(post.comments) ? post.comments.map(normalizeComment) : [],
      latestAi: post.latestAi ? normalizeAiResult(post.latestAi) : null,
      mediaType: post.mediaType || (post.videoDataUrl ? "video" : post.imageDataUrl ? "image" : null),
      createdAt: post.createdAt || post.updatedAt || daysAgoIso(index),
      cloudId: post.cloudId || null,
      mediaCloudId: post.mediaCloudId || null,
      mediaStoragePath: post.mediaStoragePath || null,
      mediaThumbnailPath: post.mediaThumbnailPath || null,
      mediaStorageSignature: post.mediaStorageSignature || null,
      mediaUrl: post.mediaUrl || null,
      mediaThumbnailUrl: post.mediaThumbnailUrl || null,
      cloudLikes:
        hasStoredNumber(post.cloudLikes) && Number.isFinite(Number(post.cloudLikes)) ? Math.max(0, Number(post.cloudLikes)) : null,
      cloudCommentsCount:
        hasStoredNumber(post.cloudCommentsCount) && Number.isFinite(Number(post.cloudCommentsCount))
          ? Math.max(0, Number(post.cloudCommentsCount))
          : null,
      rankingScore:
        hasStoredNumber(post.rankingScore) && Number.isFinite(Number(post.rankingScore))
          ? Math.max(0, Number(post.rankingScore))
          : null,
      likedByCurrentUser: Boolean(post.likedByCurrentUser),
    };
  });

  return normalized;
}

function normalizeLog(log) {
  return {
    id: log.id || createId("log"),
    type: log.type || "記録",
    temp: log.temp ?? "",
    ph: log.ph ?? "",
    note: log.note || "",
    createdAt: log.createdAt || new Date().toISOString(),
    cloudId: log.cloudId || null,
  };
}

function normalizeComment(comment) {
  return {
    id: comment.id || createId("comment"),
    author: comment.author || "アクアリスト",
    text: comment.text || "",
    createdAt: comment.createdAt || new Date().toISOString(),
    cloudId: comment.cloudId || null,
  };
}

function normalizeAiResult(result) {
  return {
    cloudId: result.cloudId || null,
    status: result.status || "未記録",
    summary: result.summary || "",
    levelClass: result.levelClass || result.level || "",
    items: Array.isArray(result.items) ? result.items : [],
    observations: Array.isArray(result.observations) ? result.observations : [],
    retakeTips: Array.isArray(result.retakeTips) ? result.retakeTips : [],
    confidence: result.confidence ?? null,
    model: result.model || null,
    promptVersion: result.promptVersion || null,
    source: result.source || null,
    checkedAt: result.checkedAt || result.checked_at || new Date().toISOString(),
  };
}

function normalizeAiEvaluationEntry(entry) {
  return {
    id: entry.id || createId("ai-review"),
    cloudId: entry.cloudId || null,
    createdAt: entry.createdAt || new Date().toISOString(),
    source: entry.source || "未確認",
    target: entry.target || "AI分析",
    model: entry.model || "未確認",
    promptVersion: entry.promptVersion || "未確認",
    status: entry.status || "未記録",
    fallbackStatus: entry.fallbackStatus || "未記録",
    summary: entry.summary || "",
    fallbackSummary: entry.fallbackSummary || "",
    difference: entry.difference || "未比較",
    retakeTips: Array.isArray(entry.retakeTips) ? entry.retakeTips.map((item) => String(item)).slice(0, 4) : [],
    photoCondition: getAllowedValue(
      entry.photoCondition,
      ["unspecified", "normal", "dark", "small_fish", "algae", "reflection"],
      "unspecified",
    ),
    reviewLabel: ["unreviewed", "good", "needs_fix", "watch"].includes(entry.reviewLabel)
      ? entry.reviewLabel
      : "unreviewed",
    note: entry.note || "",
    promptDraftRetestStatus: getAllowedValue(entry.promptDraftRetestStatus, ["none", "retest_needed", "retested", "re_review_needed", "re_reviewed"], "none"),
    promptDraftRetestedAt: entry.promptDraftRetestedAt || null,
  };
}

function normalizeAiPromptNote(note) {
  return {
    id: note.id || createId("prompt-note"),
    cloudId: note.cloudId || null,
    promptVersion: note.promptVersion || "未確認",
    note: note.note || "",
    createdAt: note.createdAt || new Date().toISOString(),
  };
}

function normalizePwaTestResult(result) {
  return {
    id: result.id || createId("pwa-test"),
    cloudId: result.cloudId || null,
    createdAt: result.createdAt || new Date().toISOString(),
    device: String(result.device || "未記録").trim() || "未記録",
    browser: String(result.browser || "未記録").trim() || "未記録",
    status: getAllowedValue(result.status, ["passed", "watch", "failed"], "watch"),
    scope: getAllowedValue(result.scope, PWA_REQUIRED_SCOPES, "install"),
    note: String(result.note || "").trim(),
  };
}

function normalizePwaReleaseDecision(decision) {
  return {
    cloudId: decision.cloudId || null,
    status: getAllowedValue(decision.status, ["draft", "ready", "hold"], "draft"),
    reviewStatus: getAllowedValue(decision.reviewStatus, ["not_started", "running", "done"], "not_started"),
    resultStatus: getAllowedValue(decision.resultStatus, ["unchecked", "confirmed", "issues"], "unchecked"),
    reviewer: String(decision.reviewer || "").trim(),
    productionUrl: String(decision.productionUrl || "").trim(),
    note: String(decision.note || "").trim(),
    decidedAt: decision.decidedAt || null,
    reviewExportedAt: decision.reviewExportedAt || null,
  };
}

function normalizeNotificationProductionCheck(check) {
  return {
    envStatus: getAllowedValue(check.envStatus, ["unchecked", "confirmed", "issues"], "unchecked"),
    dryRunStatus: getAllowedValue(check.dryRunStatus, ["unchecked", "confirmed", "issues"], "unchecked"),
    sendStatus: getAllowedValue(check.sendStatus, ["unchecked", "confirmed", "issues"], "unchecked"),
    reviewer: String(check.reviewer || "").trim(),
    note: String(check.note || "").trim(),
    checkedAt: check.checkedAt || null,
  };
}

function normalizeProductionSetupCheck(check) {
  return {
    supabaseStatus: getAllowedValue(check.supabaseStatus, ["unchecked", "confirmed", "issues"], "unchecked"),
    supabaseReviewer: String(check.supabaseReviewer || "").trim(),
    supabaseNote: String(check.supabaseNote || "").trim(),
    supabaseCheckedAt: check.supabaseCheckedAt || null,
    storageStatus: getAllowedValue(check.storageStatus, ["unchecked", "confirmed", "issues"], "unchecked"),
    storageReviewer: String(check.storageReviewer || "").trim(),
    storageNote: String(check.storageNote || "").trim(),
    storageCheckedAt: check.storageCheckedAt || null,
    aiStatus: getAllowedValue(check.aiStatus, ["unchecked", "confirmed", "issues"], "unchecked"),
    aiReviewer: String(check.aiReviewer || "").trim(),
    aiNote: String(check.aiNote || "").trim(),
    aiCheckedAt: check.aiCheckedAt || null,
  };
}

function getTankName(tankId) {
  return state.tanks.find((tank) => tank.id === tankId)?.name || "未設定の水槽";
}

function saveLocalState(nextState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function saveState(options = {}) {
  saveAppState(options);
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.append(toast);
  window.setTimeout(() => toast.remove(), 2400);
}

function resizeImageFile(file, maxWidth, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const scale = Math.min(1, maxWidth / image.width);
        const width = Math.round(image.width * scale);
        const height = Math.round(image.height * scale);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsText(file);
  });
}

function getVideoDuration(src) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      if (video.src.startsWith("blob:")) {
        window.URL.revokeObjectURL(video.src);
      }
      resolve(Number.isFinite(video.duration) ? Math.round(video.duration) : null);
    };
    video.onerror = () => resolve(null);
    video.src = src;
  });
}

function getVideoThumbnail(src) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    let resolved = false;
    const timeout = window.setTimeout(() => finish(null), 3500);

    const finish = (value) => {
      if (resolved) {
        return;
      }

      resolved = true;
      window.clearTimeout(timeout);
      resolve(value);
    };

    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        finish(null);
        return;
      }

      video.currentTime = Math.min(0.2, video.duration / 2);
    };
    video.onseeked = () => {
      if (!video.videoWidth || !video.videoHeight) {
        finish(null);
        return;
      }

      const canvas = document.createElement("canvas");
      const maxWidth = 900;
      const scale = Math.min(1, maxWidth / video.videoWidth);
      canvas.width = Math.round(video.videoWidth * scale);
      canvas.height = Math.round(video.videoHeight * scale);
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      finish(canvas.toDataURL("image/jpeg", 0.78));
    };
    video.onerror = () => finish(null);
    video.src = src;
    video.load();
  });
}

function createId(prefix) {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cloneState(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeSearchTerm(value) {
  return String(value).trim().toLowerCase();
}

function parseOptionalNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeHandle(value) {
  const handle = String(value || "")
    .trim()
    .replace(/^@/, "")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 24);

  return handle.length >= 3 ? handle : defaultState.account.handle;
}

function getAllowedValue(value, allowedValues, fallback) {
  return allowedValues.includes(value) ? value : fallback;
}

function normalizeAccount(account = {}) {
  const visibility = ["public", "friends", "private"].includes(account.visibility)
    ? account.visibility
    : defaultState.account.visibility;
  const plan = ["free", "plus", "pro"].includes(account.plan) ? account.plan : defaultState.account.plan;
  const uiMode = UI_MODES.includes(account.uiMode) ? account.uiMode : defaultState.account.uiMode;
  const notificationChannel = ["browser", "push", "email", "none"].includes(account.notificationChannel)
    ? account.notificationChannel
    : defaultState.account.notificationChannel;
  const syncStatus = account.syncStatus === "synced" ? "synced" : "local";

  return {
    ...defaultState.account,
    ...account,
    name: String(account.name || defaultState.account.name).trim(),
    handle: normalizeHandle(account.handle),
    email: String(account.email || defaultState.account.email).trim(),
    visibility,
    plan,
    uiMode,
    notificationChannel,
    browserNotifications:
      account.browserNotifications === undefined ? defaultState.account.browserNotifications : Boolean(account.browserNotifications),
    emailNotifications:
      account.emailNotifications === undefined ? defaultState.account.emailNotifications : Boolean(account.emailNotifications),
    quietHoursStart: normalizeTimeValue(account.quietHoursStart, defaultState.account.quietHoursStart),
    quietHoursEnd: normalizeTimeValue(account.quietHoursEnd, defaultState.account.quietHoursEnd),
    backgroundImageDataUrl: isImageDataUrl(account.backgroundImageDataUrl) ? account.backgroundImageDataUrl : null,
    buttonImageDataUrl: isImageDataUrl(account.buttonImageDataUrl) ? account.buttonImageDataUrl : null,
    syncStatus,
    signedIn: Boolean(account.signedIn),
    lastSyncedAt: account.lastSyncedAt || null,
  };
}

function isImageDataUrl(value) {
  return typeof value === "string" && /^data:image\/(?:png|jpe?g|webp);base64,/i.test(value);
}

function getSyncStatusLabel(account) {
  if (!account.signedIn) {
    return "未ログイン";
  }

  return account.syncStatus === "synced" ? "同期済み" : "ローカル変更あり";
}

function getPlanLabel(plan) {
  if (plan === "pro") {
    return "Pro";
  }

  if (plan === "plus") {
    return "Plus";
  }

  return "Free";
}

function getVisibilityLabel(visibility) {
  if (visibility === "private") {
    return "非公開";
  }

  if (visibility === "friends") {
    return "フォロー中のみ";
  }

  return "公開";
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, Math.round(number)));
}

function normalizeReminders(reminders = {}) {
  const savedReminders = reminders && typeof reminders === "object" ? reminders : {};

  return Object.fromEntries(
    Object.entries(defaultReminders).map(([taskId, defaults]) => {
      return [taskId, normalizeReminder(savedReminders[taskId] || {}, defaults, taskId)];
    }),
  );
}

function normalizeReminder(saved, defaults, taskId = "") {
  const schedule = ["daily", "weekly", "interval"].includes(saved.schedule) ? saved.schedule : defaults.schedule;
  const weekdays = Array.isArray(saved.weekdays)
    ? saved.weekdays.map(Number).filter((day) => Number.isInteger(day) && day >= 0 && day <= 6)
    : defaults.weekdays;

  return {
    ...defaults,
    ...saved,
    schedule,
    weekdays: weekdays.length ? [...new Set(weekdays)].sort((a, b) => a - b) : defaults.weekdays,
    intervalDays: clampNumber(saved.intervalDays, 1, getReminderIntervalMax(taskId), defaults.intervalDays),
    startDate: isValidDateKey(saved.startDate) ? saved.startDate : defaults.startDate,
    time: isValidTimeValue(saved.time) ? saved.time : defaults.time,
    enabled: Boolean(saved.enabled ?? defaults.enabled),
    lastNotifiedOn: saved.lastNotifiedOn || null,
  };
}

function getReminderIntervalMax(taskId) {
  return taskId === "filterCare" ? 365 : 30;
}

function getEmptyTasks() {
  return Object.fromEntries(Object.keys(taskLabels).map((taskId) => [taskId, false]));
}

function daysAgoIso(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function getDateKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function getReminderDate(time, baseDate = new Date()) {
  const [hours, minutes] = (isValidTimeValue(time) ? time : "08:00").split(":").map(Number);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function doesReminderMatchDate(reminder, date) {
  if (reminder.schedule === "weekly") {
    return reminder.weekdays.includes(date.getDay());
  }

  if (reminder.schedule === "interval") {
    const start = parseDateKey(reminder.startDate);
    if (!start) {
      return true;
    }

    const diff = diffCalendarDays(start, date);
    return diff >= 0 && diff % reminder.intervalDays === 0;
  }

  return true;
}

function getScheduleLabel(reminder) {
  if (reminder.schedule === "weekly") {
    return reminder.weekdays.map((day) => weekdayLabels[day]).join("・");
  }

  if (reminder.schedule === "interval") {
    return `${reminder.intervalDays}日ごと`;
  }

  return "毎日";
}

function parseDateKey(value) {
  if (!isValidDateKey(value)) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function diffCalendarDays(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  return Math.round((endDate - startDate) / 86400000);
}

function isValidTimeValue(value) {
  return typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(value);
}

function normalizeTimeValue(value, fallback) {
  const match = String(value || "").match(/^([01]\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?$/);
  return match ? `${match[1]}:${match[2]}` : fallback;
}

function isValidDateKey(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value).getTime());
}

function diffDays(value) {
  const start = new Date(value);
  const now = new Date();
  const ms = now.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round(ms / 86400000));
}

function formatRelativeDate(value) {
  const days = diffDays(value);

  if (days === 0) {
    return "今日";
  }

  if (days === 1) {
    return "昨日";
  }

  if (days < 7) {
    return `${days}日前`;
  }

  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatReminderDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  const todayKey = getDateKey(new Date());
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateLabel = getDateKey(date) === todayKey ? "今日" : getDateKey(date) === getDateKey(tomorrow) ? "明日" : formatAlbumDate(date);
  const timeLabel = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  return `${dateLabel} ${timeLabel}`;
}

function getMonthKey(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthLabel(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) {
    return "日付なし";
  }

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
  }).format(date);
}

function formatAlbumDate(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) {
    return "日付なし";
  }

  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
  }).format(date);
}

function formatFullDate(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) {
    return "日付なし";
  }

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatVideoDuration(seconds) {
  if (!Number.isFinite(Number(seconds)) || Number(seconds) <= 0) {
    return "動画";
  }

  const totalSeconds = Math.round(Number(seconds));
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function toDatetimeLocalValue(date) {
  const offsetMs = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return String(value).replaceAll("'", "%27").replaceAll("\n", "");
}

function escapeCssIdentifier(value) {
  if (window.CSS && typeof window.CSS.escape === "function") {
    return window.CSS.escape(value);
  }

  return String(value).replaceAll('"', '\\"');
}

setDefaultLogDate();
resetSpeciesList("tank-species-list");
resetSpeciesList("tank-equipment-list");
resetFilterForm("tank");
renderPostImagePreview();
renderApp();
initSupabaseAuth();
checkDueReminders();
window.setInterval(checkDueReminders, 60000);

const firstView = window.location.hash.replace("#", "") || "dashboard";
if (document.getElementById(firstView)) {
  showView(firstView);
}

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js");
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installAppButton.hidden = false;
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  installAppButton.hidden = true;
  showToast("AquaNoteをインストールしました");
});
