//db connection
const mongoose = require("mongoose");
const config = require("./config.js");

const connection = () => {
  const dbName = "task-management";
  const dbConnectionString = `mongodb+srv://${config.MONGODB_ATLAS_USERNAME}:${config.MONGODB_ATLAS_PASSWORD}@app4orce.kduptlj.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  //db for environment
  mongoose
    .connect(`${dbConnectionString}`)
    .then(() => {
      console.log(`🚀 database is ${dbName} connected`);
    })
    .catch((err) => {
      console.log("error ... in db connection ");

      console.log(err);
    });
};

mongoose.connection.on("disconnected", () => {
  console.log("db disconnected ");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

mongoose.connection.on("open", () => {});

// using mongoose promise
mongoose.Promise = global.Promise;

module.exports = connection;
