const mysql = require('mysql2');


const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'rootpass',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

  
  module.exports = connection;


  class Workplace {

    
  }