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
    // Forward only headers relevant to file downloads and cache validation.
    const headers = new Headers();
    for (const name of [
      "content-type",
      "content-length",
      "content-disposition",
      "content-encoding",
      "content-range",
      "accept-ranges",
      "etag",
      "last-modified",
      "location",
      "retry-after",
      "x-content-type-options",
      "x-robots-tag",
    ]) {
      const value = response.headers.get(name);
      if (value !== null) headers.set(name, value);
    }

    headers.set(
      "Cache-Control",
      response.status === 200
        ? "public, max-age=31536000, s-maxage=31536000, immutable"
        : "no-store",
    );

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
