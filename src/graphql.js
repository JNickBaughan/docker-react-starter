const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

module.exports = ({ server, pgClient }) => {
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
};
