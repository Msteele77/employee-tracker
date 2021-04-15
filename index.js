const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const cTable = require('console.table');
const mysql = require('mysql');

var roleArr;
var managerArr;

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Cheychey7',
    database: 'employee_tracker'
})

// connects to sql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    mainMenu();

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
    var query = "SELECT department.name AS Department, department.id AS Id FROM department"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('DEPARTMENTS:', res);
        mainMenu();
    })
};

//VIEW ROLES
function viewRoles() {
    var query = "SELECT role.title, role.id AS ID, role.salary, department.name AS Department FROM role LEFT JOIN department ON role.department_id = department.id;"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('ROLES', res);
        mainMenu();
    })
};

//VIEW EMPLOYEES
function viewEmployees() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('EMPLOYEES:', res);
        mainMenu();
    })
};

//ADD DEPARTMENT
function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What department would you like to add?"
        }
    ]).then(function (res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
                name: res.name

            },
            function (err) {
                if (err) throw err
                console.table(res);
                mainMenu();
            }
        )
    })
};

//add role
function addRole() {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function (err, res) {
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "What is the title of the role?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the role's salary?"

            }
        ]).then(function (res) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
                },
                function (err) {
                    if (err) throw err
                    console.table(res);
                    mainMenu();
                }
            )

        });
    });
}



function selectRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err

        roleArr = res.map(element => ({ name: element.title, value: element.id }))
        //console.log(roleArr)
        //return roleArr;
    })

}



function selectManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function (err, res) {
        if (err) throw err
        managerArr = res.map(index => ({
            name: `${index.first_name} ${index.last_name}`,
            value: index.id

        }))
        // return managerArr;
    })

}

//add employee
function addEmployee() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err

        var roleArr = res.map(element => ({ name: element.title, value: element.id }))


        connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function (err, res) {
            if (err) throw err
            var managerArr = res.map(index => ({
                name: `${index.first_name} ${index.last_name}`,
                value: index.id

            }))


            inquirer.prompt([
                {
                    name: "firstname",
                    type: "input",
                    message: "What is the employee's first name?"
                },
                {
                    name: "lastname",
                    type: "input",
                    message: "What is the employee's last name?"
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is their role? ",
                    choices: roleArr

                },
                {
                    name: "choice",
                    type: "list",
                    message: "What is their manager's name?",
                    choices: managerArr
                }
            ]).then(function (val) {

                connection.query("INSERT INTO employee SET ?",
                    {
                        first_name: val.firstname,
                        last_name: val.lastname,
                        manager_id: val.choice,
                        role_id: val.role

                    }, function (err) {
                        if (err) throw err
                        console.table(val)
                        mainMenu()
                    })

            })
        })
    })
}






 function updateRole () {

    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err

        var roleArr = res.map(element => ({ name: element.title, value: element.id }))


        connection.query("SELECT * FROM employee", function (err, res) {
            if (err) throw err
            var employeeArr = res.map(index => ({
                name: `${index.first_name} ${index.last_name}`,
                value: index.id

            }))

     inquirer.prompt([
         {
        name: "employee",
        type: "list",
        message: "What employee are you wanting to change?",
        choices: employeeArr
        },
        {
        name: "role",
        type: "list",
        message: "Which role do you want to update to?",
        choices: roleArr
        }
     ]).then(function (val) {

        connection.query("UPDATE employee SET ? WHERE ?",
            [{
                role_id: val.role,

            
            }, {
                id: val.employee
            }],
             function (err) {
                if (err) throw err
                console.table(val)
                mainMenu()
            })

    })
})
})
}








//function exit () {
//    connection.end();
//};
