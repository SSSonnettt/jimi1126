const BOT_PATTERN = /bot|spider|crawl|scrape|scan|facebook|twitter|linkedin|slack|whatsapp|telegram|discord|gpt|claude|perplexity|bard|anthropic|openai|bytespider|petalbot|ahrefs|semrush|dotbot/i;

const RATE_LIMIT_SECONDS = 60;

function isBot(userAgent) {
  return BOT_PATTERN.test(userAgent || "");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if ((url.pathname === "/api/pv" || url.pathname === "/pv") && request.method === "GET") {
      const userAgent = request.headers.get("User-Agent") || "";
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";

      // 过滤爬虫
      if (isBot(userAgent)) {
        return new Response(JSON.stringify({ pv: 0, skipped: true, reason: "bot" }), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
          },
        });
      }

      // 频率限制：每个 IP 每分钟只计一次
      const rateKey = `rate:${ip}`;
      const recent = await env.COUNTER.get(rateKey);
      if (recent) {
        const count = await env.COUNTER.get("pv");
        return new Response(JSON.stringify({ pv: parseInt(count || "0") }), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
          },
        });
      }
      await env.COUNTER.put(rateKey, "1", { expirationTtl: RATE_LIMIT_SECONDS });

      const count = await env.COUNTER.get("pv");
      const value = (parseInt(count || "0") + 1).toString();
      await env.COUNTER.put("pv", value);

      return new Response(JSON.stringify({ pv: value }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
        },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
