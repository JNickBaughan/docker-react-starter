const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const keys = require("../keys");
const configGraphQL = require("../src/graphql");

let PORT = 3000;
let server = express();
const middlewares = [
  express.static("dist"),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
];

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", () => {
  pgClient
    .query("CREATE TABLE IF NOT EXISTS todos (todo CHAR(50))")
    .catch((err) => console.log(err));
});

pgClient.query("INSERT INTO todos(todo) VALUES($1)", [
  "todo: refactor graphQL",
]);

server.use(...middlewares);

configGraphQL({ server, pgClient });

server.get("/", (req, res) =>
  res.send(`<!DOCTYPE html>
            <html>
              <head></head>
              <body>
                <div id="root" />
                <script src="bundle.js"></script>
              </body>
            </html>
          `)
);

server.listen(PORT, function () {
  console.log(`server listening on port: ${PORT}`);
});
