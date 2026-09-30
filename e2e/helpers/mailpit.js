const MAILPIT_URL = process.env.MAILPIT_URL ?? "http://localhost:8025";

/**
 * @param {string} to
 * @param {{ timeoutMs?: number }} [options]
 * @returns {Promise<string>}
 */
export async function waitForResetLink(to, { timeoutMs = 15_000 } = {}) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const search = await fetch(
      `${MAILPIT_URL}/api/v1/search?query=${encodeURIComponent(`to:${to}`)}`,
    ).then((res) => res.json());

    const latest = search.messages?.[0];
    if (latest) {
      const message = await fetch(`${MAILPIT_URL}/api/v1/message/${latest.ID}`).then((res) =>
        res.json(),
      );
      const match = /https?:\/\/\S+\/reset-password\/[A-Za-z0-9_-]+/.exec(message.Text);
      if (match) return match[0];
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`No reset mail for ${to}`);
}
