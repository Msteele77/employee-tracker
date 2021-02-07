const inquirer = require('inquirer');
const mysql = require("mysql2")
const cTable = require('console.table');

//CONNECTION TO SQL DATABASE
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'password',
    database: 'employees_tracker'
})
//CONNECTION TO SERVER AND DB
connection.connect(function(err){
    if (err) throw err;
    options();
})

//FIRST PROMPT IN TERMINAL
const mainMenu = (data) => {
    return inquirer.prompt([
        {
        type: 'list',
        name: "task",
        message: "Please select which task you would like to perform.",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee role"
            ]
        }
    ])
        .then(data => {
            switch (data.task) {
                case "View all departments":
                viewDepartments();
                break;
            }
            switch (data.task) {
                case "View all roles":
                viewRoles();
                break;
            }
            switch (data.task) {
                case "View all employees":
                viewEmployees();
                break;
            }
            switch (data.task) {
                case "Add a department":
                addDepartment();
                break;
            }
            switch (data.task) {
                case "Add a role":
                addRole();
                break;
            }
            switch (data.task) {
                case "Add an employee":
                addEmployee();
                break;
            }
            switch (data.task) {
                case "Update employee role":
                updateRole();
                break;
            }
        })

}


//VIEW DEPARTMENTS
function viewDepartments() {

    console.log(res);
    mainMenu();
}
//VIEW ROLES
function viewRoles() {
    
    console.log(res);
    mainMenu();
}
//VIEW EMPLOYEES
function viewEmployees() {
    
    console.log(res);
    mainMenu();
}
//ADD DEPARTMENT
function addDepartment() {
    
    console.log(res);
    mainMenu();
}
//ADD ROLE
function addRole() {
    
    console.log(res);
    mainMenu();
}
//ADD EMPLOYEE
function addEmployee() {
    
    console.log(res);
    mainMenu();
}
//UPDATE ROLE
function updateRole() {
    
    console.log(res);
    mainMenu();
}



mainMenu();