export function extractArray(json, preferPath = []) {
  if (Array.isArray(json)) return json;
  if (!json || typeof json !== "object") return [];

  // Si nos dan una ruta preferida (p.ej. ["data","cliente"])
  let node = json;
  for (const seg of preferPath) node = node?.[seg];
  if (Array.isArray(node)) return node;

  // Casos comunes:
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json?.data?.items)) return json.data.items;

  // Si data es objeto y dentro hay exactamente un array, tomarlo
  if (
    json?.data &&
    typeof json.data === "object" &&
    !Array.isArray(json.data)
  ) {
    const k = Object.keys(json.data).find((kk) => Array.isArray(json.data[kk]));
    if (k) return json.data[k];
  }

  return [];
}
