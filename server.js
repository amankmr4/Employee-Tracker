var mysql = require("mysql");
var inquirer = require("inquirer");

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
        ])
}