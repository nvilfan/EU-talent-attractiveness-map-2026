const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const APP_FILE = "index.html";
const DEFAULT_PORT = 5173;
const port = Number(process.env.PORT || process.argv[2] || DEFAULT_PORT);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon"
};

function safePath(urlPath) {
  try {
    const normalized = path.normalize(decodeURIComponent(urlPath));
    const relative = normalized === "/" ? APP_FILE : normalized.replace(/^[/\\]/, "");
    const absolute = path.resolve(ROOT, relative);
    const backtrack = path.relative(ROOT, absolute);
    return backtrack && !backtrack.startsWith("..") && !path.isAbsolute(backtrack) ? absolute : null;
  } catch {
    return null;
  }
}

const server = http.createServer((req, res) => {
  if (!req.url || !["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405, {"content-type": "text/plain; charset=utf-8"});
    res.end("Method not allowed");
    return;
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const filePath = safePath(requestUrl.pathname);

  if (!filePath) {
    res.writeHead(403, {"content-type": "text/plain; charset=utf-8"});
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      res.writeHead(404, {"content-type": "text/plain; charset=utf-8"});
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath);
    res.writeHead(200, {
      "content-type": mimeTypes[ext] || "application/octet-stream",
      "cache-control": "no-store"
    });

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`EU Talent Attractiveness Map running at http://127.0.0.1:${port}`);
});
