const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');

//https://developer.okta.com/blog/2019/08/16/angular-mysql-express

const connection = mysql.createConnection({
  host     : 'localhost',
  database : 'staff_appraiser'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
