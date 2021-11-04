const inquirer = require("inquirer");
const { exit } = require("process");
const db = require("./db");
require("console.table");

//View all departments, view all roles, 
//view all employees, add a department, 
//add a role, add an employee, 
//and update an employee role



function promptUser() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add a Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add a Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add an Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE"
                },
                {
                    name: "Exit",
                    value: "EXIT"
                },
            ]
        }

    ]).then(res => {
        let { choice } = res;

        switch (choice) {
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "UPDATE_EMPLOYEE":
                updateEmployeeRole();
                break;
            default:
                exit();
        }
    }
    )
}


function viewDepartments(){
    db.viewDepartments()
    .then(([data]) => {
        let departments = data;
        console.log("\n")
        console.table(departments)
    })
    .then(()=> promptUser());
}

function viewEmployees(){
    db.viewEmployees()
    .then(([data]) => {
        let employees = data;
        console.log("\n")
        console.table(employees)
    })
    .then(() => promptUser());
}

function viewRoles(){
    db.viewRoles()
    .then(([data]) => {
        let roles = data;
        console.log("\n")
        console.table(roles)
    })
    .then(() => promptUser());
}


function addDepartment(){
    inquirer.prompt([
        {
          name: "name",
          message: "What's the name of the department?"
        }
      ])
        .then(res => {
          let name = res;
          db.addDepartment(name)
            .then(() => console.log(`Added ${name.name} to the database`))
            .then(() => promptUser())
        })
    }
    


    function addRole(){
        db.viewDepartments()
        .then(([data]) => {
          let departments = data;
          const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
          }));
          prompt([
            {
              name: "title",
              message: "What is the name of the role?"
            },
            {
              name: "salary",
              message: "What is the salary of the role?"
            },
            {
              type: "list",
              name: "department_id",
              message: "Which department does the role belong to?",
              choices: departmentChoices
            }
          ])
            .then(role => {
              db.createRole(role)
                .then(() => console.log(`Added ${role.title} to the database`))
                .then(() => loadMainPrompts())
            })
        })
    }
        


function addEmployee(){
    db.addEmployee()
    .then(([data]) => {
        let newEmployee = data;
        console.log("\n")
        console.table(newEmployee)
    })
    .then(() => promptUser());
}

function updateEmployeeRole(){
    db.updateEmployeeRole()
    .then(([data]) => {
        let newEmployeeRole = data;
        console.log("\n")
        console.table(newEmployeeRole)
    })
    .then(() => promptUser());
}