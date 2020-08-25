let express = require("express");
let bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
let PORT = 3000;
let server = express();
const middlewares = [
  express.static("dist"),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
];

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
    getNext: () => "todo: add postGres Database",
  },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// The GraphQL endpoint
server.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

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
