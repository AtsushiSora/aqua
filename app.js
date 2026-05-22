const STORAGE_KEY = "aquanote-state-v3";
const LEGACY_STORAGE_KEY = "aquanote-state-v2";

const viewLinks = document.querySelectorAll("[data-view-link]");
const directViewButtons = document.querySelectorAll("[data-view-target]");
const views = document.querySelectorAll(".view");
const modal = document.querySelector("#post-modal");
const timeline = document.querySelector("#timeline");
const postGrid = document.querySelector("#post-grid");
const tankList = document.querySelector("#tank-list");
const tankPostList = document.querySelector("#tank-post-list");
const tankAlbumGrid = document.querySelector("#tank-album-grid");
const logForm = document.querySelector("#log-form");
const tankForm = document.querySelector("#tank-form");
const tankEditForm = document.querySelector("#tank-edit-form");
const postForm = document.querySelector("#post-form");
const postTankSelect = document.querySelector("#post-tank-select");
const postTankFilter = document.querySelector("#post-tank-filter");
const postImageInput = document.querySelector("#post-image-input");
const postImagePreview = document.querySelector("#post-image-preview");
const replacePostImageInput = document.querySelector("#replace-post-image-input");
const aiForm = document.querySelector("#ai-form");
const logDateInput = document.querySelector("#log-date");
const heroPhoto = document.querySelector("#hero-photo");
const heroPhotoButton = document.querySelector("#hero-photo-button");
const heroPhotoInput = document.querySelector("#hero-photo-input");

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
};

let state = loadState();
let pendingPostImageDataUrl = null;
let replacingPostId = null;

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
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closePostModal);
});

document.querySelectorAll("[data-task]").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    state.tasks[checkbox.dataset.task] = checkbox.checked;
    saveState();
    renderTasks();
  });
});

postTankFilter.addEventListener("change", renderPosts);

postImageInput.addEventListener("change", async () => {
  const file = postImageInput.files[0];
  if (!file) {
    pendingPostImageDataUrl = null;
    renderPostImagePreview();
    return;
  }

  if (!file.type.startsWith("image/")) {
    showToast("画像ファイルを選んでください");
    postImageInput.value = "";
    return;
  }

  try {
    pendingPostImageDataUrl = await resizeImageFile(file, 1200, 0.82);
    renderPostImagePreview();
  } catch {
    showToast("投稿画像を読み込めませんでした");
    postImageInput.value = "";
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

  if (!file.type.startsWith("image/")) {
    showToast("画像ファイルを選んでください");
    replacePostImageInput.value = "";
    replacingPostId = null;
    return;
  }

  try {
    post.imageDataUrl = await resizeImageFile(file, 1200, 0.82);
    saveState();
    renderApp();
    showToast("投稿画像を差し替えました");
  } catch {
    showToast("画像を読み込めませんでした");
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

  const post = {
    id: createId("post"),
    tankId: postTankSelect.value || state.activeTankId,
    title: document.querySelector("#post-title").value || "新しい投稿",
    tag: document.querySelector("#post-tag").value || "水槽",
    text: document.querySelector("#post-text").value || "水槽の様子を投稿しました。",
    imageClass: "reef",
    imageDataUrl: pendingPostImageDataUrl,
    likes: 0,
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
  renderHeroPhoto();
  renderTankList();
  renderTankProfile();
  renderTimeline();
  renderPostControls();
  renderPosts();
  renderTankPosts();
  renderTankAlbum();
  renderTasks();
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

function renderPostImagePreview() {
  if (!pendingPostImageDataUrl) {
    postImagePreview.removeAttribute("style");
    postImagePreview.innerHTML = "<span>写真プレビュー</span>";
    postImagePreview.classList.remove("has-image");
    return;
  }

  postImagePreview.style.backgroundImage = `url("${pendingPostImageDataUrl}")`;
  postImagePreview.innerHTML = "";
  postImagePreview.classList.add("has-image");
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
              <small>${escapeHtml(getTankName(post.tankId))}</small>
            </div>
            <h2>${escapeHtml(post.title)}</h2>
            <p>${escapeHtml(post.text)}</p>
            <div class="post-actions">
              <button class="like-button" type="button" data-like-id="${escapeHtml(post.id)}">いいね <span>${post.likes}</span></button>
              <button class="text-button" type="button" data-analyze-post="${escapeHtml(post.id)}">AI分析へ</button>
              <button class="text-button" type="button" data-feature-post="${escapeHtml(post.id)}">表紙にする</button>
              <button class="text-button" type="button" data-replace-post="${escapeHtml(post.id)}">画像変更</button>
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
            <small>いいね ${post.likes}</small>
            <div class="linked-actions">
              <button class="text-button" type="button" data-analyze-post="${escapeHtml(post.id)}">AI分析へ</button>
              <button class="text-button" type="button" data-feature-post="${escapeHtml(post.id)}">表紙</button>
              <button class="text-button" type="button" data-replace-post="${escapeHtml(post.id)}">画像</button>
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
  const posts = state.posts
    .filter((post) => post.tankId === tank.id && post.imageDataUrl)
    .sort((a, b) => Number(b.id === tank.featuredPostId) - Number(a.id === tank.featuredPostId))
    .slice(0, 6);

  if (!posts.length) {
    tankAlbumGrid.innerHTML = '<p class="empty-state">画像つき投稿を追加すると、この水槽のアルバムとして並びます。</p>';
    return;
  }

  tankAlbumGrid.innerHTML = posts
    .map(
      (post) => `
        <button class="album-tile ${post.id === tank.featuredPostId ? "is-featured" : ""}" type="button" data-analyze-post="${escapeHtml(post.id)}" style="background-image: url('${escapeAttribute(post.imageDataUrl)}')">
          ${post.id === tank.featuredPostId ? "<small>表紙</small>" : ""}
          <span>${escapeHtml(post.title)}</span>
        </button>
      `,
    )
    .join("");

  bindPostActions(tankAlbumGrid);
}

function renderPostImage(post) {
  if (post.imageDataUrl) {
    return `<div class="post-image custom-photo" style="background-image: url('${escapeAttribute(post.imageDataUrl)}')"></div>`;
  }

  return `<div class="post-image ${escapeHtml(post.imageClass)}"></div>`;
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
  showToast("投稿写真をAI分析に送りました");
}

function analyzePostPhoto(post) {
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
    const isDone = Boolean(state.tasks[status.dataset.taskStatus]);
    status.textContent = isDone ? "完了" : status.dataset.taskStatus === "checkAlgae" ? "夜" : "18:00";
  });
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
  const photoMarkup = post?.imageDataUrl
    ? `<div class="ai-photo-preview" style="background-image: url('${escapeAttribute(post.imageDataUrl)}')"></div>`
    : "";

  resultBox.className = `ai-result ${result.levelClass}`;
  resultBox.innerHTML = `
    ${photoMarkup}
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

function closePostModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  resetPostForm();
}

function resetPostForm() {
  pendingPostImageDataUrl = null;
  postImageInput.value = "";
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
      ...post,
      tankId,
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

function createId(prefix) {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cloneState(value) {
  return JSON.parse(JSON.stringify(value));
}

function daysAgoIso(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
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

const firstView = window.location.hash.replace("#", "") || "dashboard";
if (document.getElementById(firstView)) {
  showView(firstView);
}

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js");
}
