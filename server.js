var mysql = require("mysql");
var inquirer = require("inquirer");
var consoletable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Sheenal13!",
    database: "employee_tracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Hello world")
    startprompt()
});

function startprompt() {
    inquirer
        .prompt([
            {
                name: "choices",
                type: "list",
                message: "What would you like do you ?",
                choices: ["Add Department",
                    "Add Role",
                    "Add Employee",
                    "View Departments",
                    "View Roles",
                    "View Employees",
                    "Update employee roles"]
            },
        ]).then(function (answer) {
            console.log(answer)
            switch (answer.choices) {
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "View Departments":
                    console.log("View Departments");
                    break;
                case "View Roles":
                    console.log("View Roles");
                    break;
                case "View Employees":
                    console.log("View Employees");
                    break;
                case "Update employee roles":
                    console.log("Update employee roles");
                    break;
            }
        })
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "Please enter the departments name?",
        }
    ]).then(function (answer) {
        var query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query, answer.departmentName, function (err, res) {
            if (err) throw err;
            console.log(res)
        })
    })
};

function addRole() {
    inquirer.prompt([
        {
            name: "role",
            type: "input",
            message: "Please enter the role?",
        },
        {
            name: "salary",
            type: "input",
            message: "Please enter the salary?",
        },
        {
            name: "departmentID",
            type: "input",
            message: "Please enter the departments id number?",
        }
    ]).then(function (answer) {
        var query = "INSERT INTO roles (title, salary, department_id) VALUES (?)";
        connection.query(query, [[answer.role, answer.salary, answer.departmentID]], function (err, res) {
            if (err) throw err;
            console.log(res)
        })
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Please enter the first name?",
        },
        {
            name: "lastname",
            type: "input",
            message: "Please enter the last name?",
        },
        {
            name: "rollID",
            type: "input",
            message: "Please enter the roll ID?",
        }, {
            name: "managersID",
            type: "input",
            message: "Please enter the managers' ID?",
        },

    ]).then(function (answer) {
        var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)";
        connection.query(query, [[answer.firstname, answer.lastname, answer.rollID, answer.managersID]], function (err, res) {
            if (err) throw err;
            console.log(res)
        })
    })

}