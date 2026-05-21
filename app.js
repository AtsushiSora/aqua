const viewLinks = document.querySelectorAll("[data-view-link]");
const directViewButtons = document.querySelectorAll("[data-view-target]");
const views = document.querySelectorAll(".view");
const modal = document.querySelector("#post-modal");
const timeline = document.querySelector("#timeline");
const postGrid = document.querySelector("#post-grid");

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

const firstView = window.location.hash.replace("#", "") || "dashboard";
if (document.getElementById(firstView)) {
  showView(firstView);
}

document.querySelectorAll("[data-open-post]").forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  });
});

document.querySelector("#log-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const type = document.querySelector("#log-type").value;
  const temp = document.querySelector("#temp-input").value;
  const ph = document.querySelector("#ph-input").value;
  const note = document.querySelector("#log-note").value || "水槽の状態を記録しました。";
  const entry = document.createElement("article");

  entry.innerHTML = `
    <time>たった今</time>
    <strong>${escapeHtml(type)} / ${escapeHtml(temp)}°C / pH ${escapeHtml(ph)}</strong>
    <p>${escapeHtml(note)}</p>
  `;

  timeline.prepend(entry);
  document.querySelector("#log-note").value = "";
});

document.querySelector("[data-add-log]").addEventListener("click", () => {
  document.querySelector("#log-note").focus();
});

document.querySelector("#ai-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const water = document.querySelector("#water-state").value;
  const fish = document.querySelector("#fish-state").value;
  const algae = document.querySelector("#algae-state").value;
  const days = Number(document.querySelector("#water-days").value);
  const result = analyzeTank({ water, fish, algae, days });
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
});

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
      summary: "複数の注意サインがあります。断定はせず、まず水温、pH、亜硝酸、フィルター状態を確認しましょう。",
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
    summary: "大きな異常は見当たりません。いつもの管理を続けて、pHと水温を定期的に記録しましょう。",
    items,
  };
}

document.querySelectorAll("[data-like]").forEach((button) => {
  button.addEventListener("click", () => {
    const count = button.querySelector("span");
    count.textContent = String(Number(count.textContent) + 1);
  });
});

document.querySelector("#post-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value || "新しい投稿";
  const tag = document.querySelector("#post-tag").value || "水槽";
  const text = document.querySelector("#post-text").value || "水槽の様子を投稿しました。";
  const card = document.createElement("article");

  card.className = "post-card";
  card.innerHTML = `
    <div class="post-image reef"></div>
    <div class="post-body">
      <span class="chip">${escapeHtml(tag)}</span>
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(text)}</p>
      <button class="like-button" type="button" data-like>いいね <span>0</span></button>
    </div>
  `;

  card.querySelector("[data-like]").addEventListener("click", (event) => {
    const count = event.currentTarget.querySelector("span");
    count.textContent = String(Number(count.textContent) + 1);
  });

  postGrid.prepend(card);
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  showView("community");
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js");
}
