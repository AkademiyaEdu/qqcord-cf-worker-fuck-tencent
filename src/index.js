export default {
  async fetch(request, env) {
    const hostname = env.UPSTREAM_HOSTNAME?.trim();
    if (!hostname) {
      return new Response("Upstream not configured", { status: 503 });
    }
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/file/")) {
      return new Response("Not Found", { status: 404 });
    }
    url.hostname = hostname;
    return fetch(new Request(url, request), { redirect: "follow" });
  },
};
