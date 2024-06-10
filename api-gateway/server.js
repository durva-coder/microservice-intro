const gateway = require("fast-gateway");
const port = 9001;

const checkAuth = (req, res, next) => {
  if (req.headers.token && req.headers.token != "") {
    next();
  } else {
    res.setHeader("Content-type", "application.json");
    res.statusCode = 401;
    res.end(JSON.stringify({ status: 401, message: "Auth failed" }));
  }
};

const server = gateway({
  middlewares: [checkAuth],
  routes: [
    {
      prefix: "/order",
      target: "http://localhost:8081/",
    },
    {
      prefix: "/payment",
      target: "http://localhost:8082/",
      // middlewares: [checkAuth],
    },
  ],
});

server.get("/mytesting", (req, res) => {
  res.send("called gateway");
});

server.start(port).then((server) => {
  console.log("api gateway is running at " + port);
});
