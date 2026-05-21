const STORAGE_KEY = "aquanote-state-v3";
const LEGACY_STORAGE_KEY = "aquanote-state-v2";

const viewLinks = document.querySelectorAll("[data-view-link]");
const directViewButtons = document.querySelectorAll("[data-view-target]");
const views = document.querySelectorAll(".view");
const modal = document.querySelector("#post-modal");
const timeline = document.querySelector("#timeline");
const postGrid = document.querySelector("#post-grid");
const tankList = document.querySelector("#tank-list");
const logForm = document.querySelector("#log-form");
const tankForm = document.querySelector("#tank-form");
const tankEditForm = document.querySelector("#tank-edit-form");
const postForm = document.querySelector("#post-form");
const aiForm = document.querySelector("#ai-form");
const logDateInput = document.querySelector("#log-date");

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
    },
  ],
  posts: [
    {
      id: "sample-reef",
      title: "流木レイアウトを少し変更",
      tag: "水草水槽",
      text: "後景草が伸びてきたので、左奥に高さを出しました。",
      imageClass: "reef",
      likes: 128,
    },
    {
      id: "sample-medaka",
      title: "屋外ビオトープの春",
      tag: "メダカ",
      text: "睡蓮の葉が増えて、メダカが日陰で休めるようになりました。",
      imageClass: "medaka",
      likes: 214,
    },
    {
      id: "sample-koi",
      title: "池の透明度チェック",
      tag: "池",
      text: "雨の後なので少し濁りあり。明日もう一度確認します。",
      imageClass: "koi",
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

document.querySelector("[data-add-log]").addEventListener("click", () => {
  showView("tanks");
  document.querySelector("#log-note").focus();
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
    title: document.querySelector("#post-title").value || "新しい投稿",
    tag: document.querySelector("#post-tag").value || "水槽",
    text: document.querySelector("#post-text").value || "水槽の様子を投稿しました。",
    imageClass: "reef",
    likes: 0,
  };

  state.posts.unshift(post);
  saveState();
  renderPosts();
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
  renderTankList();
  renderTankProfile();
  renderTimeline();
  renderPosts();
  renderTasks();
  renderDashboard();
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
  postGrid.innerHTML = state.posts
    .map(
      (post) => `
        <article class="post-card">
          <div class="post-image ${escapeHtml(post.imageClass)}"></div>
          <div class="post-body">
            <span class="chip">${escapeHtml(post.tag)}</span>
            <h2>${escapeHtml(post.title)}</h2>
            <p>${escapeHtml(post.text)}</p>
            <button class="like-button" type="button" data-like-id="${escapeHtml(post.id)}">いいね <span>${post.likes}</span></button>
          </div>
        </article>
      `,
    )
    .join("");

  document.querySelectorAll("[data-like-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const post = state.posts.find((item) => item.id === button.dataset.likeId);
      if (!post) {
        return;
      }

      post.likes += 1;
      saveState();
      renderPosts();
    });
  });
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

  const aiCard = document.querySelector("#metric-ai-card");
  aiCard.classList.toggle("alert", aiStatus.levelClass !== "");
  aiCard.classList.toggle("danger", aiStatus.levelClass === "danger");
}

function renderAiResult(result) {
  const resultBox = document.querySelector("#ai-result");

  resultBox.className = `ai-result ${result.levelClass}`;
  resultBox.innerHTML = `
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

  normalized.tanks = normalized.tanks.map((tank) => ({
    ...tank,
    volume: tank.volume || "容量未設定",
    tags: Array.isArray(tank.tags) ? tank.tags : [tank.kind || "水槽"],
    logs: Array.isArray(tank.logs) ? tank.logs : [],
    latestAi: tank.latestAi || null,
  }));

  return normalized;
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

setDefaultLogDate();
renderApp();

const firstView = window.location.hash.replace("#", "") || "dashboard";
if (document.getElementById(firstView)) {
  showView(firstView);
}

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js");
}
