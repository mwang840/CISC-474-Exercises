const exp = require("constants");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 8080;

app.use(function (req, res, next) {
  const { url, path: routePath } = req;
  console.log(
    "Request: Timestamp:",
    new Date().toLocaleDateString(),
    " URL(" + url + ")." + " PATH(" + routePath + ")."
  );
  next();
});

app.get("/api/v1/listUsers", function (req, res) {
  fs.readFile(
    __dirname + "/data/" + "users.json",
    "utf8",
    function (err, data) {
      console.log(data);
      res.end(data);
    }
  );
});

app.delete("/api/v1/deleteUser", function (req, res) {
  fs.readFile(
    __dirname + "/data/" + "users.json",
    "utf8",
    function (err, data) {
      data = JSON.parse(data);
      delete data["user" + req.query["user"]];

      fs.writeFile(
        __filename + "/data/users.json",
        JSON.stringify(data),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        }
      );

      console.log(data);
      res.end(JSON.stringify(data));
    }
  );
});

app.post("/api/v1/addUser", function (req, res) {
  fs.readFile(
    __dirname + "/data/" + "users.json",
    "utf8",
    function (err, data) {
      data = JSON.parse(data);
      var userVal = "user" + req.query["user"];
      var sendObj = {
        name: req.query["name"],
        password: req.query["password"],
        profression: req.query["profession"],
        id: req.query["user"],
      };
      data[userVal] = sendObj;

      fs.writeFile(
        __dirname + "/data/users.json",
        JSON.stringify(data),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        }
      );

      console.log(data);
      res.end(JSON.stringify(data));
    }
  );
});

app.get("/api/v1/filterUser", function (req, res) {
  fs.readFile(
    __dirname + "/data/" + "users.json",
    "utf8",
    function (err, data) {
      var searchUser = req.query["user"];
      var currentUser = JSON.parse(data);
      var foundUserId = currentUser["user" + searchUser];
      console.log("Found this user with an id of ", foundUserId);
      res.end(JSON.stringify(foundUserId));
    }
  );
});

app.use("/", express.static(path.join(__dirname, "")));
//Make sure nothing goes below app
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
