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

    constructor(connection){
        this.connection = connection;
    }

    viewAllDepartments(){
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department"
        )
    }
    
    viewAllEmployees(){
        return this.connection.promise().query(
            
        )
    }

    addDepartment(){
        return this.connection.promise().query(
            
        )
    }
    
    addRole(){
        return this.connection.promise().query(
            
        )
    }

    addEmployee(){
        return this.connection.promise().query(
            
        )
    }

    updateEmployeeRole(){
        return this.connection.promise().query(
            
        )
    }


  }

