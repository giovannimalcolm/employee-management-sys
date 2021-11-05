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
            "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"

        )
    }

    viewRoles(){
        return this.connection.promise().query(
            "SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id;"
        )
    }

    addDepartment(department){
        return this.connection.promise().query(
            "INSERT INTO department SET ?", department 
            
        )
    }
    
    addRole(newRole){
        return this.connection.promise().query(
            "INSERT INTO roles SET ?", newRole
        )
    }

    addEmployee(newEmployee){
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", newEmployee 
        )
    }

    updateEmployeeRole(roleID, employeeID){
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleID, employeeID]
            )
    }


  }

  module.exports = new Workplace(connection);
