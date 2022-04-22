/* eslint-disable no-console */
const express = require('express');
const env = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

env.config();
const port = process.env.PORT || 8000;
const app = express();

const books = [
  { id: 1, name: 'Book 1' },
  { id: 2, name: 'Book 2' },
  { id: 3, name: 'Book 3' },
  { id: 4, name: 'Book 4' },
  { id: 5, name: 'Book 5' },
  { id: 6, name: 'Book 6' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This reprsents a book',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const rootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: 'List of all the books',
      resolve: () => books,
    },
  }),
});

const schema = new GraphQLSchema({
  query: rootQueryType,
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
