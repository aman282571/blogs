const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

const Port = process.env.PORT || 5000;

mongoose
  .connect(process.env.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" mongoose connected ");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded());
app.use("/api", require("./routers"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "./client/build")));
  // Step 2:
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}

app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
});
