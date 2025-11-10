import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  if (url.pathname === "/") {
    const html = await Deno.readTextFile("./index.html");
    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  // Serve static files
  try {
    const filePath = `.${url.pathname}`;
    const content = await Deno.readFile(filePath);

    let contentType = "text/plain";
    if (url.pathname.endsWith(".css")) contentType = "text/css";
    if (url.pathname.endsWith(".js")) contentType = "application/javascript";
    if (url.pathname.endsWith(".png")) contentType = "image/png";
    if (url.pathname.endsWith(".jpg") || url.pathname.endsWith(".jpeg")) contentType = "image/jpeg";

    return new Response(content, { headers: { "content-type": contentType } });
  } catch {
    return new Response("404 Not Found", { status: 404 });
  }
});
