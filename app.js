const STORAGE_KEY = "aquanote-state-v3";
const LEGACY_STORAGE_KEY = "aquanote-state-v2";
const VIDEO_UPLOAD_LIMIT_BYTES = 4 * 1024 * 1024;

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
const albumCountLabel = document.querySelector("#album-count-label");
const logForm = document.querySelector("#log-form");
const tankForm = document.querySelector("#tank-form");
const tankEditForm = document.querySelector("#tank-edit-form");
const postForm = document.querySelector("#post-form");
const postTankSelect = document.querySelector("#post-tank-select");
const postTankFilter = document.querySelector("#post-tank-filter");
const postImageInput = document.querySelector("#post-image-input");
const postImagePreview = document.querySelector("#post-image-preview");
const postModalTitle = document.querySelector("#post-modal-title");
const postSubmitButton = document.querySelector("#post-submit-button");
const replacePostImageInput = document.querySelector("#replace-post-image-input");
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

const taskLabels = {
  feedMorning: "朝の餌やり",
  checkTemp: "水温チェック",
  checkAlgae: "ガラス面のコケ確認",
};

const defaultReminders = {
  feedMorning: {
    time: "08:00",
    enabled: true,
    lastNotifiedOn: null,
  },
  checkTemp: {
    time: "18:00",
    enabled: true,
    lastNotifiedOn: null,
  },
  checkAlgae: {
    time: "20:00",
    enabled: false,
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
    },
    {
      id: "sample-medaka",
      title: "屋外ビオトープの春",
      tag: "メダカ",
      text: "睡蓮の葉が増えて、メダカが日陰で休めるようになりました。",
      imageClass: "medaka",
      tankId: "tank-pond",
      likes: 214,
    },
    {
      id: "sample-koi",
      title: "池の透明度チェック",
      tag: "池",
      text: "雨の後なので少し濁りあり。明日もう一度確認します。",
      imageClass: "koi",
      tankId: "tank-pond",
      likes: 96,
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

let state = loadState();
let pendingPostImageDataUrl = null;
let pendingPostVideoDataUrl = null;
let pendingPostVideoDuration = null;
let pendingPostMediaType = null;
let replacingPostId = null;
let editingPostId = null;
let activeAlbumMonth = "all";

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

albumMonthFilter.addEventListener("change", () => {
  activeAlbumMonth = albumMonthFilter.value;
  renderTankAlbum();
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
    saveState();
    renderApp();
    showToast("投稿メディアを差し替えました");
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

logForm.addEventListener("submit", (event) => {
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

aiForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const tank = getActiveTank();
  const water = document.querySelector("#water-state").value;
  const fish = document.querySelector("#fish-state").value;
  const algae = document.querySelector("#algae-state").value;
  const days = Number(document.querySelector("#water-days").value);
  const result = analyzeTank({ water, fish, algae, days });

  tank.latestAi = {
    status: result.status,
    summary: result.summary,
    levelClass: result.levelClass,
    checkedAt: new Date().toISOString(),
  };
  saveState();
  renderAiResult(result);
  renderDashboard();
});

postForm.addEventListener("submit", (event) => {
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
        videoDuration: pendingPostVideoDuration,
      });
    }
    existingPost.updatedAt = new Date().toISOString();

    if (previousTankId !== existingPost.tankId) {
      const previousTank = state.tanks.find((tank) => tank.id === previousTankId);
      if (previousTank?.featuredPostId === existingPost.id) {
        previousTank.featuredPostId = null;
      }
    }

    saveState();
    renderApp();
    closePostModal();
    showView("community");
    showToast("投稿を更新しました");
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
    videoDuration: pendingPostVideoDuration,
    mediaType: pendingPostMediaType || (pendingPostImageDataUrl ? "image" : null),
    likes: 0,
    createdAt: new Date().toISOString(),
  };

  state.posts.unshift(post);
  saveState();
  renderApp();
  resetPostForm();
  closePostModal();
  showView("community");
  showToast("投稿を追加しました");
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
  renderTankPosts();
  renderTankAlbum();
  renderTasks();
  renderReminders();
  renderDashboard();
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

async function setPendingPostMedia(file) {
  const media = await preparePostMedia(file);
  pendingPostMediaType = media.type;
  pendingPostImageDataUrl = media.imageDataUrl;
  pendingPostVideoDataUrl = media.videoDataUrl;
  pendingPostVideoDuration = media.videoDuration || null;
}

function clearPendingPostMedia() {
  pendingPostMediaType = null;
  pendingPostImageDataUrl = null;
  pendingPostVideoDataUrl = null;
  pendingPostVideoDuration = null;
  renderPostImagePreview();
}

async function preparePostMedia(file) {
  if (file.type.startsWith("image/")) {
    return {
      type: "image",
      imageDataUrl: await resizeImageFile(file, 1200, 0.82),
      videoDataUrl: null,
      videoDuration: null,
    };
  }

  if (file.size > VIDEO_UPLOAD_LIMIT_BYTES) {
    throw new Error("Video file is too large for local prototype storage.");
  }

  const videoDataUrl = await readFileAsDataUrl(file);

  return {
    type: "video",
    imageDataUrl: null,
    videoDataUrl,
    videoDuration: await getVideoDuration(videoDataUrl),
  };
}

function applyPostMedia(post, media) {
  post.mediaType = media.type;
  post.imageDataUrl = media.imageDataUrl || null;
  post.videoDataUrl = media.videoDataUrl || null;
  post.videoDuration = media.videoDuration || null;
}

function isSupportedPostMedia(file) {
  return file.type.startsWith("image/") || file.type.startsWith("video/");
}

function renderPostImagePreview() {
  const editingPost = state.posts.find((post) => post.id === editingPostId);
  const previewVideo = pendingPostVideoDataUrl || editingPost?.videoDataUrl;
  const previewImage = pendingPostImageDataUrl || editingPost?.imageDataUrl;

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
      return `
        <button class="tank-card ${tank.id === state.activeTankId ? "is-active" : ""}" type="button" data-tank-id="${escapeHtml(tank.id)}">
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
  const featuredPost = state.posts.find((post) => post.id === tank.featuredPostId && post.imageDataUrl);

  aquariumVisual.classList.toggle("has-cover", Boolean(featuredPost));
  aquariumVisual.style.backgroundImage = featuredPost ? `url("${featuredPost.imageDataUrl}")` : "";
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
  const filter = postTankFilter.value;
  const posts = filter === "all" ? state.posts : state.posts.filter((post) => post.tankId === filter);

  if (!posts.length) {
    postGrid.innerHTML = '<p class="empty-state full-field">この水槽の投稿はまだありません。写真を投稿して最初の記録を残しましょう。</p>';
    return;
  }

  postGrid.innerHTML = posts
    .map(
      (post) => `
        <article class="post-card">
          ${renderPostImage(post)}
          <div class="post-body">
            <div class="post-meta-row">
              <span class="chip">${escapeHtml(post.tag)}</span>
              <small>${escapeHtml(getTankName(post.tankId))} / ${getPostMediaLabel(post)}</small>
            </div>
            <h2>${escapeHtml(post.title)}</h2>
            <p>${escapeHtml(post.text)}</p>
            <div class="post-actions">
              <button class="like-button" type="button" data-like-id="${escapeHtml(post.id)}">いいね <span>${post.likes}</span></button>
              <button class="text-button" type="button" data-analyze-post="${escapeHtml(post.id)}">AI分析へ</button>
              <button class="text-button" type="button" data-edit-post="${escapeHtml(post.id)}">編集</button>
              <button class="text-button" type="button" data-feature-post="${escapeHtml(post.id)}">表紙にする</button>
              <button class="text-button" type="button" data-replace-post="${escapeHtml(post.id)}">メディア変更</button>
              <button class="text-button danger-text" type="button" data-delete-post="${escapeHtml(post.id)}">削除</button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  bindPostActions(postGrid);
}

function bindPostActions(root) {
  root.querySelectorAll("[data-like-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const post = state.posts.find((item) => item.id === button.dataset.likeId);
      if (!post) {
        return;
      }

      post.likes += 1;
      saveState();
      renderPosts();
      renderTankPosts();
      renderTankAlbum();
    });
  });

  root.querySelectorAll("[data-analyze-post]").forEach((button) => {
    button.addEventListener("click", () => analyzePostImage(button.dataset.analyzePost));
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
            <small>いいね ${post.likes} / ${getPostMediaLabel(post)}</small>
            <div class="linked-actions">
              <button class="text-button" type="button" data-analyze-post="${escapeHtml(post.id)}">AI分析へ</button>
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
  const allPosts = state.posts
    .filter((post) => post.tankId === tank.id && hasPostMedia(post))
    .sort((a, b) => {
      const featuredOrder = Number(b.id === tank.featuredPostId) - Number(a.id === tank.featuredPostId);
      if (featuredOrder !== 0) {
        return featuredOrder;
      }

      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  const monthOptions = getAlbumMonthOptions(allPosts);

  albumMonthFilter.innerHTML = [
    '<option value="all">すべて</option>',
    ...monthOptions.map((month) => `<option value="${escapeHtml(month.key)}">${escapeHtml(month.label)}</option>`),
  ].join("");

  if (activeAlbumMonth !== "all" && !monthOptions.some((month) => month.key === activeAlbumMonth)) {
    activeAlbumMonth = "all";
  }

  albumMonthFilter.value = activeAlbumMonth;

  const posts =
    activeAlbumMonth === "all" ? allPosts : allPosts.filter((post) => getMonthKey(post.createdAt) === activeAlbumMonth);

  albumCountLabel.textContent = `${posts.length}枚`;

  if (!posts.length) {
    tankAlbumGrid.innerHTML =
      allPosts.length === 0
        ? '<p class="empty-state">写真・動画つき投稿を追加すると、この水槽のアルバムとして並びます。</p>'
        : '<p class="empty-state">この月の写真・動画はありません。表示を「すべて」に戻すと確認できます。</p>';
    return;
  }

  tankAlbumGrid.innerHTML = posts
    .map(
      (post) => `
        <button class="album-tile ${post.videoDataUrl ? "has-video" : ""} ${post.id === tank.featuredPostId ? "is-featured" : ""}" type="button" data-analyze-post="${escapeHtml(post.id)}" ${post.imageDataUrl ? `style="background-image: url('${escapeAttribute(post.imageDataUrl)}')"` : ""}>
          ${post.id === tank.featuredPostId ? "<small>表紙</small>" : ""}
          ${post.videoDataUrl ? `<b class="media-badge">${formatVideoDuration(post.videoDuration)}</b>` : ""}
          <span>${escapeHtml(post.title)}</span>
          <time>${formatAlbumDate(post.createdAt)}</time>
        </button>
      `,
    )
    .join("");

  bindPostActions(tankAlbumGrid);
}

function renderPostImage(post) {
  if (post.videoDataUrl) {
    return `
      <div class="post-image custom-video">
        <video src="${escapeAttribute(post.videoDataUrl)}" controls muted playsinline preload="metadata"></video>
        <b class="media-badge">${formatVideoDuration(post.videoDuration)}</b>
      </div>
    `;
  }

  if (post.imageDataUrl) {
    return `<div class="post-image custom-photo" style="background-image: url('${escapeAttribute(post.imageDataUrl)}')"></div>`;
  }

  return `<div class="post-image ${escapeHtml(post.imageClass)}"></div>`;
}

function hasPostMedia(post) {
  return Boolean(post.imageDataUrl || post.videoDataUrl);
}

function getPostMediaLabel(post) {
  if (post.videoDataUrl) {
    return `動画 ${formatVideoDuration(post.videoDuration)}`;
  }

  if (post.imageDataUrl) {
    return "写真";
  }

  return "サンプル";
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

function featurePost(postId) {
  const post = state.posts.find((item) => item.id === postId);
  if (!post) {
    return;
  }

  if (!post.imageDataUrl) {
    showToast("画像つき投稿を表紙にできます");
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
  });
  saveState();
  renderApp();
  showToast("投稿を削除しました");
}

function analyzePostImage(postId) {
  const post = state.posts.find((item) => item.id === postId);
  if (!post) {
    return;
  }

  state.activeTankId = post.tankId || state.activeTankId;
  const tank = getActiveTank();
  const result = analyzePostPhoto(post);

  tank.latestAi = {
    status: result.status,
    summary: result.summary,
    levelClass: result.levelClass,
    checkedAt: new Date().toISOString(),
  };

  saveState();
  renderApp();
  renderAiResult(result, post);
  showView("ai");
  showToast(post.videoDataUrl ? "動画投稿の確認画面を開きました" : "投稿写真をAI分析に送りました");
}

function analyzePostPhoto(post) {
  if (post.videoDataUrl) {
    return {
      status: "動画チェック準備中",
      levelClass: "warning",
      summary: "動画投稿は表示まで対応しました。今後、魚の動きや水面の様子を短い動画から確認できるようにします。",
      items: [
        "今できること: 動画を投稿として保存し、コミュニティとアルバムで確認する",
        "次に作ること: 動画のサムネイル、再生時間、AI分析の下準備",
        "撮影のコツ: 10秒前後で、水面・魚・全景が分かるように撮る",
      ],
    };
  }

  if (!post.imageDataUrl) {
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
      const status = state.tasks[taskId] ? "今日のタスクは完了" : reminder.enabled ? "通知対象" : "通知オフ";

      return `
        <label class="reminder-row ${rowClass}">
          <input type="checkbox" data-reminder-enabled="${escapeHtml(taskId)}" ${checked}>
          <span>
            <strong>${escapeHtml(label)}</strong>
            <small>${status}</small>
          </span>
          <input type="time" value="${escapeAttribute(reminder.time)}" data-reminder-time="${escapeHtml(taskId)}" aria-label="${escapeHtml(label)}の通知時刻">
        </label>
      `;
    })
    .join("");

  reminderList.querySelectorAll("[data-reminder-enabled]").forEach((input) => {
    input.addEventListener("change", () => {
      const taskId = input.dataset.reminderEnabled;
      state.reminders[taskId].enabled = input.checked;
      saveState();
      renderTasks();
      renderReminders();
    });
  });

  reminderList.querySelectorAll("[data-reminder-time]").forEach((input) => {
    input.addEventListener("change", () => {
      const taskId = input.dataset.reminderTime;
      state.reminders[taskId].time = input.value || defaultReminders[taskId].time;
      state.reminders[taskId].lastNotifiedOn = null;
      saveState();
      renderTasks();
      renderReminders();
    });
  });

  renderNextReminder();
  renderNotificationButtons();
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

  return reminder.time || defaultReminders[taskId].time;
}

function getNextReminder() {
  const now = new Date();
  return Object.entries(taskLabels)
    .map(([taskId, label]) => {
      const reminder = state.reminders[taskId] || defaultReminders[taskId];
      if (!reminder.enabled) {
        return null;
      }

      let date = getReminderDate(reminder.time, now);
      if (date <= now || state.tasks[taskId]) {
        date.setDate(date.getDate() + 1);
      }

      return { taskId, label, date };
    })
    .filter(Boolean)
    .sort((a, b) => a.date - b.date)[0];
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
  const mediaMarkup = post?.videoDataUrl
    ? `
      <div class="ai-photo-preview has-video">
        <video src="${escapeAttribute(post.videoDataUrl)}" controls muted playsinline preload="metadata"></video>
        <b class="media-badge">${formatVideoDuration(post.videoDuration)}</b>
      </div>
    `
    : post?.imageDataUrl
      ? `<div class="ai-photo-preview" style="background-image: url('${escapeAttribute(post.imageDataUrl)}')"></div>`
      : "";

  resultBox.className = `ai-result ${result.levelClass}`;
  resultBox.innerHTML = `
    ${mediaMarkup}
    <p class="status-label">状態</p>
    <strong>${result.status}</strong>
    <p>${result.summary}</p>
    <ul>
      ${result.items.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
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

function loadState() {
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
      return migrated;
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
    logs: Array.isArray(tank.logs) ? tank.logs : [],
    latestAi: tank.latestAi || null,
    featuredPostId: tank.featuredPostId || null,
  }));
  normalized.posts = normalized.posts.map((post, index) => {
    const fallbackTank = normalized.tanks[index % normalized.tanks.length] || normalized.tanks[0];
    const tankId = normalized.tanks.some((tank) => tank.id === post.tankId) ? post.tankId : fallbackTank.id;

    return {
      imageDataUrl: null,
      videoDataUrl: null,
      videoDuration: null,
      mediaType: post.videoDataUrl ? "video" : post.imageDataUrl ? "image" : null,
      createdAt: daysAgoIso(index),
      ...post,
      tankId,
      mediaType: post.mediaType || (post.videoDataUrl ? "video" : post.imageDataUrl ? "image" : null),
      createdAt: post.createdAt || post.updatedAt || daysAgoIso(index),
    };
  });

  return normalized;
}

function getTankName(tankId) {
  return state.tanks.find((tank) => tank.id === tankId)?.name || "未設定の水槽";
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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

function createId(prefix) {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cloneState(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeReminders(reminders = {}) {
  const savedReminders = reminders && typeof reminders === "object" ? reminders : {};

  return Object.fromEntries(
    Object.entries(defaultReminders).map(([taskId, defaults]) => [
      taskId,
      {
        ...defaults,
        ...(savedReminders[taskId] || {}),
        time: isValidTimeValue(savedReminders[taskId]?.time) ? savedReminders[taskId].time : defaults.time,
        enabled: Boolean(savedReminders[taskId]?.enabled ?? defaults.enabled),
        lastNotifiedOn: savedReminders[taskId]?.lastNotifiedOn || null,
      },
    ]),
  );
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

function isValidTimeValue(value) {
  return typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
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

setDefaultLogDate();
renderPostImagePreview();
renderApp();
checkDueReminders();
window.setInterval(checkDueReminders, 60000);

const firstView = window.location.hash.replace("#", "") || "dashboard";
if (document.getElementById(firstView)) {
  showView(firstView);
}

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js");
}
