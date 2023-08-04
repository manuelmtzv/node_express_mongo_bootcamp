const http = require("http");
const data = "./dev-data/data.json";

// ? Server
const server = http.createServer((req, res) => {
  const url = req.url;

  switch (url) {
    case "/":
      res.writeHead(302, { Location: "http://localhost:2000/overview" });
      res.end();
      break;
    case "/overview":
      res.end("This is the overview page!");
      break;
    case "/product":
      res.end("This is a product!");
      break;
    default:
      res.statusCode = 404;
      res.end("Page not found!");
      break;
  }
});

server.listen(2000, "localhost", () => {
  console.log("Listening to requests on port 8000.");
});
