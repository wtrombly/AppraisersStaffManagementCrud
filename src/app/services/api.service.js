
//new code here
const express = require('express');
const app = express();
const port = 3000
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password : 'password',
  database : 'test_connection'
})

app.get('/', (req,res) => {
  res.send('Hello World!')
})

app.get('/allUsers', (req, res) => {
  connection.connect(function(error){
    if(error){
      throw error;
    }
    else
    {
      console.log('MySql Database is connected successfully.')
    }
  });

  connection.query("select * from user", function(error, results) {
    console.log("query response is ", results)
  })
  connection.end()
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

//new code above here
