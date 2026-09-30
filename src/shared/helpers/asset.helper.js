export function getAssetUrl(path) {
  if (!path) return null;

  if (/^(https?:|blob:|data:)/.test(path)) {
    return path;
  }

  const apiUri = process.env.NEXT_PUBLIC_API_URI || "";
  const origin = apiUri.replace(/\/api\/?$/, "");

  return `${origin}${path}`;
}
