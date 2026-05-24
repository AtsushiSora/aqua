import type { Config } from "@netlify/functions";

const OPENAI_BASE_URL = Netlify.env.get("OPENAI_BASE_URL") || "";
const OPENAI_API_KEY = Netlify.env.get("OPENAI_API_KEY") || "";
const AI_ANALYSIS_MODEL = Netlify.env.get("AI_ANALYSIS_MODEL") || "gpt-4o-mini";

type AnalysisRequest = {
  tank?: {
    name?: string;
    kind?: string;
    residents?: string;
    volumeLabel?: string;
  };
  log?: {
    water?: string;
    fish?: string;
    algae?: string;
    days?: number;
  };
  post?: {
    title?: string;
    text?: string;
    tag?: string;
    mediaType?: string;
    imageDataUrl?: string;
    imageUrl?: string;
  };
};

export default async (request: Request) => {
  if (request.method === "GET") {
    return jsonResponse({
      configured: Boolean(OPENAI_BASE_URL),
      model: AI_ANALYSIS_MODEL,
      gateway: OPENAI_BASE_URL ? "openai-compatible" : "not-configured",
    });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  if (!OPENAI_BASE_URL) {
    return jsonResponse({ error: "Netlify AI Gateway is not configured" }, 503);
  }

  const payload = (await request.json()) as AnalysisRequest;
  const messages = buildMessages(payload);
  const response = await fetch(`${OPENAI_BASE_URL.replace(/\/$/, "")}/v1/chat/completions`, {
    method: "POST",
    headers: {
      ...authorizationHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: AI_ANALYSIS_MODEL,
      messages,
      temperature: 0.2,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    return jsonResponse({ error: `AI analysis failed: ${response.status} ${await response.text()}` }, 502);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || "{}";
  return jsonResponse({
    ...normalizeAnalysis(content),
    model: AI_ANALYSIS_MODEL,
    source: "netlify-ai-gateway",
  });
};

export const config: Config = {
  path: "/api/ai-analysis",
  method: "POST",
};

function buildMessages(payload: AnalysisRequest) {
  const text = [
    "AquaNoteの水槽管理補助として、画像やログから確認ポイントを返してください。",
    "病気や死亡リスクを断定せず、診断ではなく観察・管理の補助として書いてください。",
    "JSONのみで返してください: {\"status\":\"良好|注意|要確認\",\"levelClass\":\"|warning|danger\",\"summary\":\"短い要約\",\"items\":[\"今日やること: ...\",\"数日見ること: ...\",\"危険サイン: ...\"]}",
    `水槽: ${JSON.stringify(payload.tank || {})}`,
    `ログ: ${JSON.stringify(payload.log || {})}`,
    `投稿: ${JSON.stringify({
      title: payload.post?.title,
      text: payload.post?.text,
      tag: payload.post?.tag,
      mediaType: payload.post?.mediaType,
    })}`,
  ].join("\n");
  const imageUrl = payload.post?.imageDataUrl || payload.post?.imageUrl;

  if (!imageUrl) {
    return [
      { role: "system", content: "You are a careful aquarium care assistant. Return strict JSON only." },
      { role: "user", content: text },
    ];
  }

  return [
    { role: "system", content: "You are a careful aquarium care assistant. Return strict JSON only." },
    {
      role: "user",
      content: [
        { type: "text", text },
        { type: "image_url", image_url: { url: imageUrl } },
      ],
    },
  ];
}

function normalizeAnalysis(content: string) {
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    parsed = {};
  }
  const status = ["良好", "注意", "要確認"].includes(parsed.status) ? parsed.status : "注意";
  const levelClass = ["", "warning", "danger"].includes(parsed.levelClass) ? parsed.levelClass : "warning";
  const items = Array.isArray(parsed.items) ? parsed.items.slice(0, 5).map((item: unknown) => String(item)) : [];

  return {
    status,
    levelClass,
    summary: String(parsed.summary || "画像とログから確認ポイントを整理しました。"),
    items: items.length ? items : ["今日やること: 水温、pH、食欲を確認", "数日見ること: 水の透明度とコケの変化"],
  };
}

function authorizationHeaders() {
  return OPENAI_API_KEY ? { Authorization: `Bearer ${OPENAI_API_KEY}` } : {};
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
