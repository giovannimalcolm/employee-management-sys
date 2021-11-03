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


  class Workplace {

    constructor(connection){
        this.connection = connection;
    }

    viewDepartments(){
        return this.connection.promise().query(
            "SELECT * FROM department"
        )
    }
    
    viewEmployees(){
        return this.connection.promise().query(
            "SELECT * FROM employee "
        )
    }

    viewRoles(){
        return this.connection.promise().query(
            "SELECT * FROM roles "
        )
    }

    addDepartment(department){
        return this.connection.promise().query(
            "INSERT INTO department SET department_name = ?", department 
            
        )
    }
    
    addRole(newRole){
        return this.connection.promise().query(
            "INSERT INTO roles SET title = ? salary = ? department_id = ?", newRole
        )
    }

    addEmployee(newEmployee){
        return this.connection.promise().query(
            "INSERT INTO employee SET first_name = ? last_name = ?, role_id = ?, manager_id = ?", newEmployee //array with first, last, role, manager
        )
    }

    updateEmployeeRole(updatedEmployee){
        return this.connection.promise().query(
        "INSERT INTO employee SET role_id = ?", updatedEmployee
        )
    }


  }

  module.exports = new Workplace(connection);
