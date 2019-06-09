const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

// create our Express app
const app = express();
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
  console.log(`Express running → PORT ${port}`);
  console.log(`GraphQL API server at http://localhost:${port}/graphql`);
});
