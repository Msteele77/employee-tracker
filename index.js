const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
});




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
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('DEPARTMENTS:', res);
    mainMenu();
    })
};

//VIEW ROLES
function viewRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table('ROLES', res);
    mainMenu();
    })
};

//VIEW EMPLOYEES
function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('EMPLOYEES:', res); 
    mainMenu();
    })
};

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