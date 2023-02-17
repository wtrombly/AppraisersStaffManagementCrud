
//new code here
const express = require('express');
const app = express();
const port = 3000
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password : 'rOy&78B3Ke6q',
  database : 'test_connection'
})

app.get('/', (req,res) => {
  res.send('Hello World!')
})

app.get('/allUsers', (req, res) => {
  connection.connect();
  connection.query("select * from user", function(error, results) {
    console.log("query response is ", results);
  })
  connection.end();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

//new code above here
