const http = require("http");
const fs = require("fs");
const host = "localhost";
const port = 8000;

const requestListener = (req, res) => {
  if (req.url === "/get") {
    if (req.method !== "GET") {
      res.writeHead(405);
      res.end("HTTP method not allowed");
    } else {
      try {
        res.writeHead(200);
        filenames = fs.readdirSync("files");
        fileline = filenames.join(",");
        console.log(fileline);
        res.end(fileline);
      } catch (err) {
        res.writeHead(500);
        res.end("Internal server error");
      }
    }
  } else if (req.url === "/delete") {
    if (req.method === "DELETE") {
      res.writeHead(200);
      res.end("success delete");
    } else {
      res.writeHead(405);
      res.end("HTTP method not allowed for /delete");
    }
  } else if (req.url === "/post") {
    if (req.method === "POST") {
      res.writeHead(200);
      res.end("success post");
    } else {
      res.writeHead(405);
      res.end("HTTP method not allowed for /post");
    }
  } else if (req.url === "/redirect") {
    if (req.method === "GET") {
      res.writeHead(302, { Location: "/redirected" });
      return res.end();
    } else {
      res.writeHead(405);
      res.end("HTTP method not allowed for /redirect");
    }
  } else if (req.url === "/redirected") {
    res.writeHead(200);
    res.end("redirected url");
  } else {
    res.writeHead(404);
    res.end("not found");
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
