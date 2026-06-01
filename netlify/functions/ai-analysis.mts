import type { Config } from "@netlify/functions";

const OPENAI_BASE_URL = Netlify.env.get("OPENAI_BASE_URL") || "";
const OPENAI_API_KEY = Netlify.env.get("OPENAI_API_KEY") || "";
const AI_ANALYSIS_MODEL = Netlify.env.get("AI_ANALYSIS_MODEL") || "gpt-4o-mini";
const PROMPT_VERSION = "aquanote-care-v4";

type AnalysisRequest = {
  tank?: {
    name?: string;
    kind?: string;
    animals?: string;
    plants?: string;
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
  identify?: {
    imageDataUrl?: string;
    imageUrl?: string;
    tankKind?: string;
    tankName?: string;
  };
};

export default async (request: Request) => {
  if (request.method === "GET") {
    return jsonResponse({
      configured: Boolean(OPENAI_BASE_URL),
      authConfigured: Boolean(OPENAI_API_KEY),
      model: AI_ANALYSIS_MODEL,
      promptVersion: PROMPT_VERSION,
      gateway: OPENAI_BASE_URL ? "openai-compatible" : "not-configured",
      imageAnalysis: "enabled",
    });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  if (!OPENAI_BASE_URL) {
    return jsonResponse({ error: "Netlify AI Gateway is not configured" }, 503);
  }

  const payload = (await request.json()) as AnalysisRequest;
  const isIdentification = Boolean(payload.identify);
  const hasImage = Boolean(payload.post?.imageDataUrl || payload.post?.imageUrl || payload.identify?.imageDataUrl || payload.identify?.imageUrl);
  const messages = isIdentification ? buildIdentificationMessages(payload) : buildMessages(payload);
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
      max_tokens: 700,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    return jsonResponse({ error: `AI analysis failed: ${response.status} ${await response.text()}` }, 502);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || "{}";
  if (isIdentification) {
    return jsonResponse({
      ...normalizeIdentification(content),
      model: AI_ANALYSIS_MODEL,
      promptVersion: PROMPT_VERSION,
      source: "netlify-ai-gateway",
      imageAnalysis: hasImage ? "real-photo" : "image-missing",
    });
  }

  return jsonResponse({
    ...normalizeAnalysis(content),
    model: AI_ANALYSIS_MODEL,
    promptVersion: PROMPT_VERSION,
    source: "netlify-ai-gateway",
    imageAnalysis: hasImage ? "real-photo" : "log-only",
  });
};

export const config: Config = {
  path: "/api/ai-analysis",
  method: "POST",
};

function buildMessages(payload: AnalysisRequest) {
  const text = [
    `Prompt version: ${PROMPT_VERSION}`,
    "AquaNoteの水槽管理補助として、写真とログから確認ポイントを返してください。",
    "写真に写っている範囲だけを根拠にし、見えない魚病・水質値・原因を断定しないでください。",
    "病名や死亡リスクを診断せず、管理者が次に確認する観察項目として書いてください。",
    "暗い写真、魚が小さい写真、反射が強い写真、コケや水面が一部しか見えない写真では、観察できた範囲と見えない範囲を分けてください。",
    "暗い写真では、見える範囲の限定、ライト点灯、正面からの再撮影をretakeTipsへ入れてください。",
    "魚が小さい写真では、魚の体表や泳ぎを断定せず、拡大写真や短い動画での追加確認をretakeTipsへ入れてください。",
    "コケが目立つ写真では、水質値を断定せず、コケの位置、水換え履歴、照明時間の確認をitemsへ入れてください。",
    "反射が強い写真では、反射で見えない範囲をobservationsに含めず、角度を変えた撮影をretakeTipsへ入れてください。",
    "observationsは写真に見える根拠だけに限定し、推測はitems側の確認行動へ移してください。",
    "retakeTipsは、暗さ・反射・魚の小ささ・コケの見え方を分けて具体化してください。",
    "写真品質が低い場合でも無理に判定せず、retakeTipsに撮り直しや追加撮影の観点を返してください。",
    "水の透明度、コケ、魚の泳ぎ・体表、餌の残り、底床の汚れ、機材まわりの異常のうち、写真で見えるものだけをobservationsに入れてください。",
    "必ず 今日やること / 数日見ること / 危険サイン の3種類をitemsに含めてください。",
    "JSONのみで返してください: {\"status\":\"良好|注意|要確認\",\"levelClass\":\"|warning|danger\",\"confidence\":0.0,\"summary\":\"短い要約\",\"observations\":[\"見える根拠\"],\"retakeTips\":[\"撮り直し・追加確認\"],\"items\":[\"今日やること: ...\",\"数日見ること: ...\",\"危険サイン: ...\"]}",
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
        { type: "image_url", image_url: { url: imageUrl, detail: "high" } },
      ],
    },
  ];
}

function buildIdentificationMessages(payload: AnalysisRequest) {
  const text = [
    `Prompt version: ${PROMPT_VERSION}`,
    "AquaNoteの水槽登録補助として、写真に写っている魚、生き物、水草の名前候補を返してください。",
    "写真に写っている範囲だけを根拠にし、見えない種類や画像だけでは判別できない品種名を断定しないでください。",
    "日本で一般的な和名を優先してください。種まで不明な場合は、魚、水草、エビ、貝などの上位カテゴリをuncertainへ入れてください。",
    "似ている種類がある場合は、確定欄ではなくuncertainへ入れてください。",
    "水槽用品、石、流木、底砂、フィルター、照明は名前候補に入れないでください。",
    "JSONのみで返してください: {\"fish\":[\"魚の候補\"],\"invertebrates\":[\"エビ・貝など\"],\"plants\":[\"水草の候補\"],\"uncertain\":[\"不確かな候補\"],\"summary\":\"短い説明\",\"confidence\":0.0}",
    `水槽種類: ${payload.identify?.tankKind || ""}`,
    `水槽名: ${payload.identify?.tankName || ""}`,
  ].join("\n");
  const imageUrl = payload.identify?.imageDataUrl || payload.identify?.imageUrl;

  if (!imageUrl) {
    return [
      { role: "system", content: "You identify visible aquarium residents and aquatic plants carefully. Return strict JSON only." },
      { role: "user", content: text },
    ];
  }

  return [
    { role: "system", content: "You identify visible aquarium residents and aquatic plants carefully. Return strict JSON only." },
    {
      role: "user",
      content: [
        { type: "text", text },
        { type: "image_url", image_url: { url: imageUrl, detail: "high" } },
      ],
    },
  ];
}

function normalizeAnalysis(content: string) {
  let parsed;
  try {
    parsed = JSON.parse(extractJson(content));
  } catch {
    parsed = {};
  }
  const status = ["良好", "注意", "要確認"].includes(parsed.status) ? parsed.status : "注意";
  const levelClass = ["", "warning", "danger"].includes(parsed.levelClass) ? parsed.levelClass : "warning";
  const items = Array.isArray(parsed.items) ? parsed.items.slice(0, 5).map((item: unknown) => String(item)) : [];
  const observations = Array.isArray(parsed.observations)
    ? parsed.observations.slice(0, 4).map((item: unknown) => String(item))
    : [];
  const retakeTips = Array.isArray(parsed.retakeTips)
    ? parsed.retakeTips.slice(0, 4).map((item: unknown) => String(item))
    : [];
  const confidence = Math.min(1, Math.max(0, Number(parsed.confidence) || 0.5));

  return {
    status,
    levelClass,
    confidence,
    observations,
    retakeTips,
    summary: String(parsed.summary || "画像とログから確認ポイントを整理しました。"),
    items: items.length ? items : ["今日やること: 水温、pH、食欲を確認", "数日見ること: 水の透明度とコケの変化"],
  };
}

function normalizeIdentification(content: string) {
  let parsed;
  try {
    parsed = JSON.parse(extractJson(content));
  } catch {
    parsed = {};
  }

  return {
    fish: normalizeNameList(parsed.fish),
    invertebrates: normalizeNameList(parsed.invertebrates),
    plants: normalizeNameList(parsed.plants),
    uncertain: normalizeNameList(parsed.uncertain),
    summary: String(parsed.summary || "写真から名前候補を整理しました。"),
    confidence: Math.min(1, Math.max(0, Number(parsed.confidence) || 0.5)),
  };
}

function normalizeNameList(value: unknown) {
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

function extractJson(content: string) {
  const trimmed = String(content || "").trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  return trimmed;
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
