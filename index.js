const inquirer = require("inquirer");
const db = require("./db");
require("console.table");

//View all departments, view all roles, 
//view all employees, add a department, 
//add a role, add an employee, 
//and update an employee role

init(); 

function init(){
    promptUser();
}


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


function viewDepartments() {
    db.viewDepartments()
        .then(([data]) => {
            let departments = data;
            console.log("\n")
            console.table(departments)
        })
        .then(() => promptUser());
}

function viewEmployees() {
    db.viewEmployees()
        .then(([data]) => {
            let employees = data;
            console.log("\n")
            console.table(employees)
        })
        .then(() => promptUser());
}

function viewRoles() {
    db.viewRoles()
        .then(([data]) => {
            let roles = data;
            console.log("\n")
            console.table(roles)
        })
        .then(() => promptUser());
}


function addDepartment() {
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



function addRole() {
    db.viewDepartments()
        .then(([data]) => {
            let departments = data;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));
           inquirer.prompt([
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
                    db.addRole(role)
                        .then(() => console.log(`Added ${role.title} to the database`))
                        .then(() => promptUser())
                })
        })
}



function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            message: "What's the employee's first name?"
        },
        {
            name: "last_name",
            message: "What's the employee's last name?"
        }
    ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            db.viewRoles()
                .then(([data]) => {
                    let roles = data;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));

                    inquirer.prompt({
                        type: "list",
                        name: "roleId",
                        message: "What's the employee's role?",
                        choices: roleChoices
                    })
                        .then(res => {
                            let roleId = res.roleId;

                            db.viewEmployees()
                                .then(([data]) => {
                                    let employees = data;
                                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));

                                    managerChoices.unshift({ name: "None", value: null });

                                    inquirer.prompt({
                                        type: "list",
                                        name: "managerId",
                                        message: "Who's the employee's manager?",
                                        choices: managerChoices
                                    })
                                        .then(res => {
                                            let employee = {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName
                                            }

                                            db.addEmployee(employee);
                                        })
                                        .then(() => console.log(
                                            `Added ${firstName} ${lastName} to the database`
                                        ))
                                        .then(() => promptUser())
                                })
                        })
                })
        })
}


function updateEmployeeRole() {
    db.viewEmployees()
        .then(([data]) => {
            let employees = data;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's role do you want to update?",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.viewRoles()
                        .then(([data]) => {
                            let roles = data;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));

                            inquirer.prompt([
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "Which role do you want to assign the selected employee?",
                                    choices: roleChoices
                                }
                            ])
                                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                                .then(() => console.log("Updated employee's role"))
                                .then(() => promptUser())
                        });
                });
        })
}

function exit(){
    console.log("Bye")
    process.exit();
}