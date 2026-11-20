// Shared Anthropic Messages API call for the serverless functions.
//
// Lives outside /api so Vercel does not expose it as a route; the functions
// that require() it get it bundled.

const MODEL = "claude-sonnet-5";

// Returns the model's text output, or throws an Error whose `status` is the
// HTTP status the function should answer with.
async function callClaude({ system, user, maxTokens = 16000, effort = "low" }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    const e = new Error("ANTHROPIC_API_KEY is not configured on this deployment. Add it in the Vercel project's Environment Variables settings.");
    e.status = 500;
    throw e;
  }

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
  };
  // Org-level (unscoped) API keys must name a workspace explicitly. Set
  // ANTHROPIC_WORKSPACE_ID in the Vercel environment variables if your key
  // isn't already scoped to a workspace; leave it unset if it is.
  if (process.env.ANTHROPIC_WORKSPACE_ID) {
    headers["anthropic-workspace-id"] = process.env.ANTHROPIC_WORKSPACE_ID;
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: MODEL,
      // Sonnet 5 runs adaptive thinking by default, and thinking tokens come
      // out of max_tokens, so the budget leaves room for reasoning + JSON.
      max_tokens: maxTokens,
      // Drafting from a fixed knowledge base does not need deep reasoning,
      // and Vercel's Hobby plan caps a function at 60s. Measured on a
      // 2-3 post request: "high" 2m33s, "medium" 51s, "low" 30s with no loss
      // in draft quality or guardrail compliance.
      output_config: { effort },
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  if (!response.ok) {
    const e = new Error(`Anthropic API error: ${response.status} ${await response.text()}`);
    e.status = 502;
    throw e;
  }

  const data = await response.json();
  return (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

// Strip optional ```json fences and parse.
function parseJSON(text) {
  const cleaned = String(text).replace(/^\s*```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  return JSON.parse(cleaned);
}

module.exports = { callClaude, parseJSON, MODEL };
