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
        ]).then(function (answer) {
            console.log(answer)
            switch (answer) {
                case "Add Department":
                    console.log("Add Department");
                    break;
                case "Add Role":
                    console.log("Add Role");
                    break;
                case "Add Employee":
                    console.log("Add Employee");
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