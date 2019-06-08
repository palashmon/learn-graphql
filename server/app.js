const express = require('express');

// create our Express app
const app = express();
app.set('port', process.env.PORT || 4000);

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
