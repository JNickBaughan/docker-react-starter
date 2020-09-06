let express = require("express");
let bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { Pool } = require("pg");
const keys = require("../keys");

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

pgClient.query("INSERT INTO todos(todo) VALUES($1)", ["todo: refactor"]);

server.use(...middlewares);

// The GraphQL schema in string form
const typeDefs = `
  type Query { 
    getTitle: String 
    getNext: String 
  }
`;

// The resolvers
const resolvers = {
  Query: {
    getTitle: () => "react starter app",
    getNext: async (_, __, context) => {
      const values = await context.pgClient.query("SELECT * from todos");
      const index = values.rows.length - 1;
      return values.rows[index].todo;
    },
  },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// The GraphQL endpoint
server.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({ schema, context: { pgClient } })
);

// GraphiQL, a visual editor for queries
server.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

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
