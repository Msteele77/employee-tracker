const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const cTable = require('console.table');
const mysql = require('mysql');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Cheychey7',
    database: 'employee_tracker'
})

// connects to sql server and sql database
connection.connect(function(err){
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
    var query = "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;"
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('DEPARTMENTS:', res);
        mainMenu();
    })
};

//VIEW ROLES
function viewRoles() {
    var query = "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;"
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table('ROLES', res);
    mainMenu();
    })
};

//VIEW EMPLOYEES
function viewEmployees() {
    var query = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;"
    connection.query(query, function(err, res) {
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
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                mainMenu();
            }
        )
    })
  };    


function addRole () {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
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
        ]).then(function(res) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                  title: res.Title,
                  salary: res.Salary,
                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    mainMenu();
                }
            )
    
        });
      });
      }

function addEmployee() { 
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
              name: "firstName",
              type: "input",
              message: "What is the employee's first name?"
            },
            {
              name: "lastName",
              type: "input",
              message: "What is the employee's last name?"
            },
            {
                name: "choice",
                type: "input",
                message: "What is their managers id?",
                
            },
            {
              name: "role",
              type: "list",
              choices: function() {
                var roleArr = [];
                
                for (var i = 0; i < res.length; i++) {
                    roleArr.push(res[i].title);
                }
              
                return roleArr;
            },
                message: "What is their role? "
            },
 
            
        ]).then(function (res) {
            let role_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].title == answer.role) {
                    role_id = res[a].id;
                }
            }





          connection.query("INSERT INTO employee SET ?", 
          {
              first_name: res.firstName,
              last_name: res.lastName,
              role_id: val.role,
              manager_id: res.choice
              
              
          }, function(err){
              if (err) throw err
              console.table(res)
              mainMenu();
          })
        })
    })
};
    
function updateRole () {
    console.log("update role");
}





//function exit () {
//    connection.end();
//};
