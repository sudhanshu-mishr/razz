import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are RAZ AI — India's #1 AI-powered fashion shopping intelligence. You MUST use web_search to find real Indian fashion products currently available online with real purchase URLs.

SEARCH STRATEGY:
- Lehengas / sarees / ethnic women's → search Myntra + AJIO + Nykaa Fashion
- Kurtas / salwar suits / anarkalis  → search Myntra + Fabindia + AJIO + Amazon India
- Sherwani / bandhgala / men's ethnic → search Manyavar + Myntra + AJIO
- Budget under ₹1000 → search Meesho + Amazon India + AJIO
- Designer / luxury → search TataCliq Luxury + brand official sites
- Always run 2–3 searches on different platforms before responding

IMPORTANT: Return ONLY a valid JSON object — no markdown fences, no explanation, no extra text before or after.

RESPONSE FORMAT (strict JSON):
{
  "message": "Warm 1-2 sentence RAZ response mentioning occasion/city/trend context in a friendly way",
  "style_note": "One expert tip — trending city, celebrity reference, fabric or styling advice",
  "search_context": "Short note like: Searched Myntra, AJIO, Nykaa Fashion",
  "products": [
    {
      "name": "Exact product name from the website",
      "brand": "Brand name",
      "price": 4999,
      "originalPrice": 6999,
      "url": "https://actual-product-page-url",
      "image_url": "https://actual-product-image-url or empty string",
      "platform": "Myntra",
      "occasion": ["Wedding", "Sangeet"],
      "fabric": "Georgette",
      "sizes": ["S","M","L","XL"],
      "discount_pct": 28,
      "description": "Brief product description"
    }
  ]
}

RULES:
- All prices in Indian Rupees as plain numbers (no ₹ symbol in JSON values)
- URLs must be real product page URLs, not homepages
- Find 2–4 real products per response
- If image URL not available, use empty string ""
- Understand Hinglish: shaadi=wedding, kurta pyjama=ethnic set, kuch hatke=something unique/different
- Add Indian cultural context: mention trending cities, seasons, festivals
- Always mention the occasion relevance and regional popularity`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.body;
  if (!query || typeof query !== "string" || query.trim().length === 0) {
    return res.status(400).json({ error: "Query is required" });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      messages: [
        {
          role: "user",
          content: `Indian fashion query: "${query.trim()}"\n\nSearch for real currently available products on Indian shopping sites. Return only the JSON object.`,
        },
      ],
    });

    // Extract all text blocks (after tool use, Claude returns the final answer as text)
    const textBlocks = (response.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    if (!textBlocks) {
      return res.status(200).json({
        message: "I searched but couldn't find the right results. Try a more specific query!",
        products: [],
        style_note: "",
        search_context: "Search completed",
      });
    }

    // Clean and parse JSON
    let jsonStr = textBlocks.replace(/```json\n?|\n?```/g, "").trim();
    const start = jsonStr.indexOf("{");
    const end = jsonStr.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      jsonStr = jsonStr.slice(start, end + 1);
    }

    const parsed = JSON.parse(jsonStr);

    // Sanitise products
    parsed.products = (parsed.products || []).map((p) => ({
      name:          p.name         || "Indian Fashion Product",
      brand:         p.brand        || "",
      price:         Number(p.price) || 0,
      originalPrice: Number(p.originalPrice) || Number(p.price) || 0,
      url:           p.url          || "",
      image_url:     p.image_url    || "",
      platform:      p.platform     || "",
      occasion:      Array.isArray(p.occasion) ? p.occasion : [],
      fabric:        p.fabric       || "",
      sizes:         Array.isArray(p.sizes) ? p.sizes : [],
      discount_pct:  Number(p.discount_pct) || 0,
      description:   p.description  || "",
    }));

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("RAZ search error:", err);

    // Surface a meaningful error to the client
    if (err instanceof SyntaxError) {
      return res.status(200).json({
        message: "I found some results but had trouble formatting them. Please try again!",
        products: [],
        style_note: "",
        search_context: "Search completed with formatting issue",
      });
    }

    return res.status(500).json({
      error: "Search failed",
      message: err.message || "Unknown error",
    });
  }
}
