var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
// GraphQL schema

// クエリの登録しているQueryとリゾルバーに登録している
const schemaString = `
type Query {
  users: [User!]!,
  user(id: Int!): User!
}
type User {
  id: ID!
  name: String!
  email: String
  posts: [Post!]
}
type Post {
  id: ID!
  title: String!
  published: Boolean!
  link: String
  author: User!
}
`;

const schema = buildSchema(schemaString);

// Root resolver
const resolvers = {
  users: async (_) => {
    return Users;
  },
  user: async ({ id }, context) => {
    return Users.find((user) => user.id == id);
  },
};

const Users = [
  {
    id: 1,
    name: "Fikayo Adepoju",
    email: "fik4christ@yahoo.com",
    posts: [
      {
        id: 1,
        title: "Debugging an Ionic Android App Using Chrome Dev Tools",
        published: true,
        link: "https://medium.com/@coderonfleek/debugging-an-ionic-android-app-using-chrome-dev-tools-6e139b79e8d2",
        author: 1,
      },
      {
        id: 2,
        title: "Hosting a Laravel Application on Azure Web App",
        published: true,
        link: "https://medium.com/@coderonfleek/hosting-a-laravel-application-on-azure-web-app-b55e12514c46",
        author: 1,
      },
    ],
  },
  {
    id: 3,
    name: "Jane Paul",
    email: "jane@company.com",
    posts: [],
  },
];

// Create an express server and a GraphQL endpoint
var app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
app.listen(4000, () =>
  console.log("Express GraphQL Server Now Running On localhost:4000/graphql")
);
