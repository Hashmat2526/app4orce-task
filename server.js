const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { EXPRESS_SERVER_PORT } = require("./dependencies/config");
const connection = require("./dependencies/connectiondb");
const cors = require("cors");

/* ROUTES */
const userRoutes = require("./api/routes/users.routes");
const TaskRoutes = require("./api/routes/tasks.routes");

connection();

app.get("/favicon.ico", (req, res) => res.status(204));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

/*  HANDLING CORS */
app.options("*", cors()); // enable pre-flight request for ALL requests
app.use(cors());

/* SERVING STATIC FILES */
app.get("/", (req, res) => res.send("server status: ok"));

app.use(function (req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Security-Policy", "default-src *");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  next();
});

/*  ROUTE */
app.use("/tasks", TaskRoutes);
app.use("/users", userRoutes);

app.use((error, req, res, next) => {
  res.status(500).send({ error: error.message });
});

const port = EXPRESS_SERVER_PORT;

server.listen(port, function () {
  console.log(`🚀🚀 server is up and running on port ${port}  🚀🚀`);
});
