const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const resolvers = require("./resolvers");

const app = express();
const bodyParser = require("body-parser");
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphql: true,
  })
);

const port = process.env.PORT || 4000;

app.listen(port);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
