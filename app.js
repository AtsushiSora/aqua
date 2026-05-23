const STORAGE_KEY = "aquanote-state-v3";
const LEGACY_STORAGE_KEY = "aquanote-state-v2";
const VIDEO_UPLOAD_LIMIT_BYTES = 4 * 1024 * 1024;
const EXPORT_VERSION = 1;
const MEDIA_BUCKET = "aquanote-media";
const MEDIA_SIGNED_URL_EXPIRES_SECONDS = 60 * 60;

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
const logDateInput = document.querySelector("#log-date");
const heroPhoto = document.querySelector("#hero-photo");
const heroPhotoButton = document.querySelector("#hero-photo-button");
const heroPhotoInput = document.querySelector("#hero-photo-input");
const notificationButton = document.querySelector("#notification-button");
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
const supabaseConfig = window.AQUANOTE_SUPABASE_CONFIG || {};

const taskLabels = {
  feedMorning: "朝の餌やり",
  checkTemp: "水温チェック",
  checkAlgae: "ガラス面のコケ確認",
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
};

const sampleLogs = [
  {
    id: "sample-feed",
    type: "餌やり",
    temp: "24.8",
    ph: "6.9",
    note: "魚の動きは良好。水面の泡は少なめ。",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-water-change",
    type: "水換え",
    temp: "24.4",
    ph: "6.8",
    note: "1/3換水。フィルターは軽くすすぎ。",
    createdAt: daysAgoIso(3),
  },
];

const defaultState = {
  activeTankId: "tank-main",
  heroPhotoDataUrl: null,
  account: {
    signedIn: false,
    name: "アクア太郎",
    handle: "aquataro",
    email: "aquataro@example.com",
    visibility: "public",
    plan: "free",
    syncStatus: "local",
    lastSyncedAt: null,
  },
  tanks: [
    {
      id: "tank-main",
      name: "リビング水草水槽",
      kind: "水草水槽",
      size: "60cm",
      volume: "57L",
      residents: "ネオンテトラ、ヤマトヌマエビ、アヌビアス",
      tags: ["水草水槽", "熱帯魚", "CO2あり"],
      logs: sampleLogs,
      latestAi: null,
      featuredPostId: "sample-reef",
      albumOrder: ["sample-reef"],
    },
    {
      id: "tank-pond",
      name: "ベランダ睡蓮鉢",
      kind: "メダカ鉢",
      size: "35cm",
      volume: "18L",
      residents: "メダカ、睡蓮、浮草",
      tags: ["メダカ", "屋外", "ビオトープ"],
      logs: [
        {
          id: "sample-pond-check",
          type: "水質測定",
          temp: "22.1",
          ph: "7.2",
          note: "雨上がり。透明度は良好、メダカもよく泳いでいる。",
          createdAt: daysAgoIso(1),
        },
      ],
      latestAi: null,
      featuredPostId: "sample-medaka",
      albumOrder: ["sample-medaka", "sample-koi"],
    },
  ],
  posts: [
    {
      id: "sample-reef",
      title: "流木レイアウトを少し変更",
      tag: "水草水槽",
      text: "後景草が伸びてきたので、左奥に高さを出しました。",
      imageClass: "reef",
      tankId: "tank-main",
      likes: 128,
      createdAt: daysAgoIso(2),
      comments: [
        {
          id: "sample-comment-reef-1",
          author: "mizu_note",
          text: "左奥の高さが出ていて奥行きがきれいです。",
          createdAt: daysAgoIso(1),
        },
      ],
    },
    {
      id: "sample-medaka",
      title: "屋外ビオトープの春",
      tag: "メダカ",
      text: "睡蓮の葉が増えて、メダカが日陰で休めるようになりました。",
      imageClass: "medaka",
      tankId: "tank-pond",
      likes: 214,
      createdAt: daysAgoIso(1),
      comments: [
        {
          id: "sample-comment-medaka-1",
          author: "biotope_days",
          text: "睡蓮鉢の影が涼しそうで良いですね。",
          createdAt: daysAgoIso(1),
        },
        {
          id: "sample-comment-medaka-2",
          author: "aqua_taro",
          text: "屋外管理の参考になります。",
          createdAt: daysAgoIso(2),
        },
      ],
    },
    {
      id: "sample-koi",
      title: "池の透明度チェック",
      tag: "池",
      text: "雨の後なので少し濁りあり。明日もう一度確認します。",
      imageClass: "koi",
      tankId: "tank-pond",
      likes: 96,
      createdAt: daysAgoIso(3),
      comments: [
        {
          id: "sample-comment-koi-1",
          author: "pond_keeper",
          text: "雨の翌日は同じ場所で写真を残すと比較しやすいです。",
          createdAt: daysAgoIso(1),
        },
      ],
    },
  ],
  tasks: {
    feedMorning: true,
    checkTemp: false,
    checkAlgae: false,
  },
  taskDate: getDateKey(new Date()),
  reminders: cloneState(defaultReminders),
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
let replacingPostId = null;
let editingPostId = null;
let activeAlbumMonth = "all";
let activeAlbumSort = "featured";
let highlightedSearchResult = null;
let supabaseClient = createSupabaseClient();
let authSession = null;

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

  if (!canUseNotifications()) {
    showToast(`${formatReminderDate(nextReminder.date)} ${nextReminder.label}`);
    return;
  }

  requestNotificationPermission();
});

enableNotificationsButton.addEventListener("click", requestNotificationPermission);

postTankFilter.addEventListener("change", renderPosts);
communityTagSearch.addEventListener("input", renderPosts);
communitySortSelect.addEventListener("change", renderPosts);

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
  };
  saveState();

  if (authSession?.user) {
    await syncProfileToSupabase();
    return;
  }

  renderAccount();
  showToast("プロフィールを保存しました");
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

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const action = event.submitter?.value || "sign-in";
  await handleAuthSubmit(action);
});

authSignOutButton.addEventListener("click", signOutSupabase);

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

tankForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#tank-name-input").value.trim();
  const kind = document.querySelector("#tank-kind-input").value;
  const size = document.querySelector("#tank-size-input").value.trim() || "サイズ未設定";
  const volume = document.querySelector("#tank-volume-input").value.trim() || "容量未設定";
  const residents = document.querySelector("#tank-residents-input").value.trim() || "生体・水草未設定";
  const tank = {
    id: createId("tank"),
    name,
    kind,
    size,
    volume,
    residents,
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
  tank.residents = document.querySelector("#edit-tank-residents").value.trim() || "生体・水草未設定";
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
  if (!confirm("水槽、ログ、投稿をサンプル状態に戻しますか？")) {
    return;
  }

  state = cloneState(defaultState);
  saveState();
  renderApp();
  showToast("サンプル状態に戻しました");
});

aiForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const tank = getActiveTank();
  const water = document.querySelector("#water-state").value;
  const fish = document.querySelector("#fish-state").value;
  const algae = document.querySelector("#algae-state").value;
  const days = Number(document.querySelector("#water-days").value);
  const result = analyzeTank({ water, fish, algae, days });

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
  heroPhoto.src = state.heroPhotoDataUrl || "assets/site-concept.png";
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

  const mediaCount = state.posts.filter((post) => hasPostMedia(post)).length;
  const commentCount = state.posts.reduce((total, post) => total + getDisplayCommentCount(post), 0);
  const logCount = state.tanks.reduce((total, tank) => total + tank.logs.length, 0);
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
      <small>ログ ${logCount}件、コメント ${commentCount}件、メディア ${mediaCount}件</small>
    </article>
    <article>
      <span>移行ファイル</span>
      <strong>約 ${exportedSize}KB</strong>
      <small>JSONで書き出して、次のDB設計に使えます</small>
    </article>
  `;

  renderAuthPanel();
}

function renderAuthPanel() {
  const configured = Boolean(supabaseClient);
  const signedIn = Boolean(authSession?.user);

  authEmailInput.value = authEmailInput.value || state.account.email;
  authStatusChip.textContent = signedIn ? "ログイン中" : configured ? "接続準備済み" : "未設定";
  authStatusChip.className = `auth-status-chip ${signedIn ? "is-signed-in" : configured ? "is-ready" : ""}`;
  authSignOutButton.disabled = !signedIn;

  if (!configured) {
    authNote.textContent = "supabase-config.js を追加すると、ログインと新規登録を試せます。未設定でもローカル保存は使えます。";
    return;
  }

  authNote.textContent = signedIn
    ? `${authSession.user.email || state.account.email} でログインしています。`
    : "Supabase Authへメールとパスワードで接続します。";
}

async function handleAuthSubmit(action) {
  if (!supabaseClient) {
    showToast("Supabase設定がまだありません");
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
    await loadProfileFromSupabase();
    await syncProfileToSupabase({ silent: true });
  }

  renderAccount();
  showToast(action === "sign-up" ? "登録メールを確認してください" : "ログインしました");
}

async function signOutSupabase() {
  if (!supabaseClient) {
    showToast("Supabase設定がまだありません");
    return;
  }

  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    showToast(error.message || "ログアウトに失敗しました");
    return;
  }

  authSession = null;
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

  const profileSynced = await syncProfileToSupabase({ silent: true });
  if (!profileSynced) {
    if (!options.silent) {
      showToast("プロフィール同期に失敗しました");
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

  state.account.syncStatus = "synced";
  state.account.lastSyncedAt = new Date().toISOString();
  saveState({ keepSyncStatus: true });
  renderApp();

  if (!options.silent) {
    showToast("AquaNoteデータをSupabaseに同期しました");
  }

  return true;
}

async function loadProfileFromSupabase() {
  if (!supabaseClient || !authSession?.user) {
    return null;
  }

  const { data, error } = await supabaseClient
    .from("profiles")
    .select("display_name, handle, email, visibility, plan, updated_at")
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

  const { data, error } = await supabaseClient
    .from("tanks")
    .select("id, local_id, name, kind, size_label, volume_label, residents, tags, featured_post_id, updated_at")
    .eq("owner_id", authSession.user.id)
    .order("created_at", { ascending: true });

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

async function syncTanksToSupabase(options = {}) {
  if (!supabaseClient || !authSession?.user) {
    if (!options.silent) {
      showToast("Supabaseにログインしてください");
    }
    return false;
  }

  const payloads = state.tanks.map((tank) => getTankPayload(tank, authSession.user));
  const { data, error } = await supabaseClient
    .from("tanks")
    .upsert(payloads, { onConflict: "owner_id,local_id" })
    .select("id, local_id, name, kind, size_label, volume_label, residents, tags, featured_post_id, updated_at");

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

  const postCloudIds = getPostCloudIds();
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
  const payloads = state.posts.map((post) => getPostPayload(post, authSession.user));
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
  const payloads = state.posts.flatMap((post) => {
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
  const postsWithMedia = state.posts.filter((post) => post.cloudId && hasLocalPostMedia(post));
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

function getTankPayload(tank, user) {
  return {
    owner_id: user.id,
    local_id: tank.id,
    name: tank.name || "名前未設定の水槽",
    kind: tank.kind || "水槽",
    size_label: tank.size || null,
    volume_label: tank.volume || null,
    residents: tank.residents || null,
    tags: Array.isArray(tank.tags) ? tank.tags : [tank.kind || "水槽"],
    featured_post_id: null,
    updated_at: new Date().toISOString(),
  };
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
    interval_days: clampNumber(reminder.intervalDays, 1, 30, defaultReminders[taskId].intervalDays),
    start_date: isValidDateKey(reminder.startDate) ? reminder.startDate : defaultReminders[taskId].startDate,
    notify_time: isValidTimeValue(reminder.time) ? reminder.time : defaultReminders[taskId].time,
    last_notified_on: reminder.lastNotifiedOn || null,
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
    .filter((post) => post.cloudId && post.latestAi)
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
    nextTank.residents = remoteTank.residents || nextTank.residents || "生体・水草未設定";
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
    }, defaultReminders[taskId]);
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
    .select("display_name, handle, email, visibility, plan, updated_at")
    .maybeSingle();

  if (error) {
    state.account.syncStatus = "local";
    saveState({ keepSyncStatus: true });
    renderAccount();
    if (!options.silent) {
      showToast(error.message || "プロフィール同期に失敗しました");
    }
    return false;
  }

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

function getProfilePayload(user) {
  const handle = normalizeHandle(state.account.handle);

  return {
    id: user.id,
    handle: handle === defaultState.account.handle ? `${handle}_${user.id.slice(0, 6)}` : handle,
    display_name: state.account.name || defaultState.account.name,
    email: state.account.email || user.email || "",
    visibility: getAllowedValue(state.account.visibility, ["public", "friends", "private"], "public"),
    plan: getAllowedValue(state.account.plan, ["free", "plus", "pro"], "free"),
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
    syncStatus: "synced",
    lastSyncedAt: profile.updated_at || new Date().toISOString(),
  };
}

function createSupabaseClient() {
  const url = supabaseConfig.url || supabaseConfig.supabaseUrl;
  const key = supabaseConfig.publishableKey || supabaseConfig.anonKey;

  if (!url || !key || !window.supabase?.createClient) {
    return null;
  }

  return window.supabase.createClient(url, key);
}

async function initSupabaseAuth() {
  if (!supabaseClient) {
    renderAuthPanel();
    return;
  }

  const { data } = await supabaseClient.auth.getSession();
  authSession = data.session || null;

  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    authSession = session;
    if (session?.user) {
      state.account.signedIn = true;
      state.account.email = session.user.email || state.account.email;
      saveState({ keepSyncStatus: true });
      await loadProfileFromSupabase();
      await loadTanksFromSupabase();
      await loadLogsFromSupabase();
      await loadRemindersFromSupabase();
      await loadCommunityFromSupabase();
      await loadAiResultsFromSupabase();
    } else {
      state.account.signedIn = false;
      clearCurrentUserLikes();
      saveState({ keepSyncStatus: true });
    }
    renderAccount();
  });

  if (authSession?.user) {
    state.account.signedIn = true;
    state.account.email = authSession.user.email || state.account.email;
    saveState({ keepSyncStatus: true });
    await loadProfileFromSupabase();
    await loadTanksFromSupabase();
    await loadLogsFromSupabase();
    await loadRemindersFromSupabase();
    await loadCommunityFromSupabase();
    await loadAiResultsFromSupabase();
  } else {
    state.account.signedIn = false;
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
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `aquanote-backup-${getDateKey(new Date())}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("データを書き出しました");
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
    description: `${tank.kind} / ${tank.size} / ${tank.residents}`,
    text: [tank.name, tank.kind, tank.size, tank.volume, tank.residents, ...tank.tags].join(" "),
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
  document.querySelector("#tank-profile-detail").textContent = `${tank.size} / ${tank.volume} / ${tank.residents}`;
  document.querySelector("#tank-profile-tags").innerHTML = tank.tags
    .map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`)
    .join("");

  document.querySelector("#edit-tank-name").value = tank.name;
  document.querySelector("#edit-tank-kind").value = tank.kind;
  document.querySelector("#edit-tank-size").value = tank.size;
  document.querySelector("#edit-tank-volume").value = tank.volume;
  document.querySelector("#edit-tank-residents").value = tank.residents;
  document.querySelector("#edit-tank-tags").value = tank.tags.join(", ");
  document.querySelector("#delete-tank-button").disabled = state.tanks.length <= 1;
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
    author: state.account.name || "アクア太郎",
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
  const result = analyzePostPhoto(post);
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
      state.reminders[taskId].intervalDays = clampNumber(input.value, 1, 30, defaultReminders[taskId].intervalDays);
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
    await syncRemindersToSupabase({ silent: true });
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
    return `
      <div class="interval-controls">
        <label>
          <span>間隔</span>
          <input type="number" min="1" max="30" value="${escapeAttribute(reminder.intervalDays)}" data-reminder-interval="${escapeHtml(taskId)}">
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

  if (canUseNotifications() && Notification.permission === "granted") {
    new Notification("AquaNote", {
      body: message,
      tag: `aquanote-${label}`,
    });
    return;
  }

  showToast(message);
}

function requestNotificationPermission() {
  if (!canUseNotifications()) {
    showToast("このブラウザでは通知に対応していません");
    return;
  }

  if (Notification.permission === "granted") {
    showToast("通知は有効です");
    renderNotificationButtons();
    return;
  }

  if (Notification.permission === "denied") {
    showToast("ブラウザ設定で通知がブロックされています");
    renderNotificationButtons();
    return;
  }

  Notification.requestPermission().then((permission) => {
    showToast(permission === "granted" ? "通知を有効にしました" : "通知は許可されませんでした");
    renderNotificationButtons();
  });
}

function canUseNotifications() {
  return "Notification" in window;
}

function getNotificationButtonLabel() {
  if (!canUseNotifications()) {
    return "通知非対応";
  }

  if (Notification.permission === "granted") {
    return "通知オン";
  }

  if (Notification.permission === "denied") {
    return "通知ブロック中";
  }

  return "通知を許可";
}

function renderDashboard() {
  const tank = getActiveTank();
  const latestLog = tank.logs[0];
  const latestWaterChange = tank.logs.find((log) => log.type === "水換え");
  const aiStatus = tank.latestAi || getLogBasedStatus(latestLog, latestWaterChange);
  const waterChangeDays = latestWaterChange ? diffDays(latestWaterChange.createdAt) : null;

  document.querySelector("#metric-temp").textContent = latestLog ? `${Number(latestLog.temp).toFixed(1)}°C` : "--";
  document.querySelector("#metric-temp-note").textContent = latestLog ? `${tank.name} / ${formatRelativeDate(latestLog.createdAt)}` : `${tank.name} は記録待ち`;
  document.querySelector("#metric-ph").textContent = latestLog ? Number(latestLog.ph).toFixed(1) : "--";
  document.querySelector("#metric-ph-note").textContent = latestLog ? `${latestLog.type}ログから表示` : "記録待ち";
  document.querySelector("#metric-water-change").textContent = waterChangeDays === null ? "--" : `${waterChangeDays}日前`;
  document.querySelector("#metric-water-change-note").textContent = getWaterChangeNote(waterChangeDays);
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
    <p>${escapeHtml(result.summary)}</p>
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
  };

  if (!normalized.tanks.length) {
    normalized.tanks = cloneState(defaultState).tanks;
  }

  normalized.tanks = normalized.tanks.map((tank) => ({
    ...tank,
    volume: tank.volume || "容量未設定",
    tags: Array.isArray(tank.tags) ? tank.tags : [tank.kind || "水槽"],
    logs: Array.isArray(tank.logs) ? tank.logs.map(normalizeLog) : [],
    latestAi: tank.latestAi ? normalizeAiResult(tank.latestAi) : null,
    featuredPostId: tank.featuredPostId || null,
    albumOrder: Array.isArray(tank.albumOrder) ? tank.albumOrder : [],
    cloudId: tank.cloudId || null,
  }));
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
    checkedAt: result.checkedAt || result.checked_at || new Date().toISOString(),
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
  const syncStatus = account.syncStatus === "synced" ? "synced" : "local";

  return {
    ...defaultState.account,
    ...account,
    name: String(account.name || defaultState.account.name).trim(),
    handle: normalizeHandle(account.handle),
    email: String(account.email || defaultState.account.email).trim(),
    visibility,
    plan,
    syncStatus,
    signedIn: Boolean(account.signedIn),
    lastSyncedAt: account.lastSyncedAt || null,
  };
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
      return [taskId, normalizeReminder(savedReminders[taskId] || {}, defaults)];
    }),
  );
}

function normalizeReminder(saved, defaults) {
  const schedule = ["daily", "weekly", "interval"].includes(saved.schedule) ? saved.schedule : defaults.schedule;
  const weekdays = Array.isArray(saved.weekdays)
    ? saved.weekdays.map(Number).filter((day) => Number.isInteger(day) && day >= 0 && day <= 6)
    : defaults.weekdays;

  return {
    ...defaults,
    ...saved,
    schedule,
    weekdays: weekdays.length ? [...new Set(weekdays)].sort((a, b) => a - b) : defaults.weekdays,
    intervalDays: clampNumber(saved.intervalDays, 1, 30, defaults.intervalDays),
    startDate: isValidDateKey(saved.startDate) ? saved.startDate : defaults.startDate,
    time: isValidTimeValue(saved.time) ? saved.time : defaults.time,
    enabled: Boolean(saved.enabled ?? defaults.enabled),
    lastNotifiedOn: saved.lastNotifiedOn || null,
  };
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
  return typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
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
