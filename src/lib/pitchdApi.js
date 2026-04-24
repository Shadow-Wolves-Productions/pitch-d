const API_BASE = import.meta.env.VITE_API_URL || '';

const TRUNCATE_LIMIT = 100000;

export async function analyseScript(scriptText) {
  const response = await fetch(`${API_BASE}/api/analyse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: scriptText.slice(0, TRUNCATE_LIMIT) }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message || "API error");
  }

  return data;
}

export { TRUNCATE_LIMIT };
