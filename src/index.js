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

    const response = await fetch(new Request(url, request), {
      redirect: "follow",
    });
    const result = new Response(response.body, response);
    result.headers.set(
      "Cache-Control",
      response.status === 200
        ? "public, s-maxage=31536000, max-age=0"
        : "no-store",
    );
    return result;
  },
};
