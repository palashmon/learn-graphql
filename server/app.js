const express = require('express');
const graphqlHTTP = require('express-graphql');

// create our Express app
const app = express();
app.set('port', process.env.PORT || 4000);

// bind express with graphql
app.use(
  '/graphql',
  graphqlHTTP({
    // pass in a schema property
  })
);

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
