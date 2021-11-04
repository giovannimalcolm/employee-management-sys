const inquirer = require("inquirer");
const prompt = require("inquirer");
const { exit } = require("process");
const { viewEmployees, viewRoles, addDepartment, addRole, addEmployee, updateEmployeeRole } = require("./db");
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
    db.addDepartment()
    .then(([data]) => {
        let department = data;
        console.log("\n")
        console.table(department)
    })
    .then(() => promptUser());
}


function addRole(){
    db.addRole()
    .then(([data]) => {
        let newRole = data;
        console.log("\n")
        console.table(newRole)
    })
    .then(() => promptUser());
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