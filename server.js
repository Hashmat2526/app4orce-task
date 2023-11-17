const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socket = require("./socket");
const server = http.createServer(app);
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { EXPRESS_SERVER_PORT } = require("./dependencies/config");
const connection = require("./dependencies/connectiondb");
const cors = require("cors");
require("./cronJobs");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 1000, // 1 sec
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again in a minute",
});

/* ROUTES */
const UserRoutes = require("./api/routes/users.routes");
const TaskManagerRoutes = require("./api/routes/tasks.routes");

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

app.use(limiter);
/*  ROUTE */
app.use("/tasks", TaskManagerRoutes);
app.use("/users", UserRoutes);

app.use((error, req, res, next) => {
  res.status(500).send({ error: error.message });
});

const port = EXPRESS_SERVER_PORT;

server.listen(port, function () {
  console.log(
    `🚀🚀 server is up and running on port ${port} env ${process.env.MONITAIR_APP_ENV} 🚀🚀`
  );
});

socket.connect(server);
