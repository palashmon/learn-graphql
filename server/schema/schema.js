/* eslint-disable no-use-before-define */
const graphql = require('graphql');
const find = require('lodash/find');
const filter = require('lodash/filter');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummy data
const books = [
  {
    name: 'Name of the Wind',
    genre: 'Fantasy',
    id: '1',
    authorId: '1',
  },
  {
    name: 'The Final Empire',
    genre: 'Fantasy',
    id: '2',
    authorId: '2',
  },
  {
    name: 'The Hero of Ages',
    genre: 'Fantasy',
    id: '4',
    authorId: '2',
  },
  {
    name: 'The Long Earth',
    genre: 'Sci-Fi',
    id: '3',
    authorId: '3',
  },
  {
    name: 'The Colour of Magic',
    genre: 'Fantasy',
    id: '5',
    authorId: '3',
  },
  {
    name: 'The Light Fantastic',
    genre: 'Fantasy',
    id: '6',
    authorId: '3',
  },
];

const authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' },
];

// Create a book type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent) {
        return find(authors, { id: parent.authorId });
      },
    },
  }),
});

// Create a Author type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return filter(books, { authorId: parent.id });
      },
    },
  }),
});

// Create a root query for each API endpoint
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(_parent, args) {
        // code to get data from db / other source
        return find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(_parent, args) {
        return find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
