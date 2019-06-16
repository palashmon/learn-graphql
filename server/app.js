const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

// create our Express app
const app = express();

// import environmental variables from our .env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.once('open', () => {
  console.log('\nConneted to database');
});
mongoose.connection.on('error', err => {
  console.error(`\n🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

app.set('port', process.env.PORT || 4000);

// bind express with graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const server = app.listen(app.get('port'), () => {
  const { port } = server.address();
  console.log(`\nExpress running → PORT ${port}`);
  console.log(`\nGraphQL API server at http://localhost:${port}/graphql`);
});
