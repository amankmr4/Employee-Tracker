var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
const logo = require('asciiart-logo');
const config = require("./package.json");

var allSalary = []

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
                    showDepartment();
                    break;
                case "View Roles":
                    showRoles();
                    break;
                case "View Employees":
                    showEmployees();
                    break;
                case "Update employee roles":
                    updateRole();
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
            startprompt()
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
        allSalary.push(answer.salary)
        var query = "INSERT INTO roles (title, salary, department_id) VALUES (?)";
        connection.query(query, [[answer.role, answer.salary, answer.departmentID]], function (err, res) {
            if (err) throw err;
            startprompt()
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
            startprompt()
        })
    })

}

function showDepartment() {
    var query = "SELECT * FROM department"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("\n" + "-----------------EMPLOYEE LIST------------------------" + "\n")
        console.table(res)
        console.log("\n" + "------------------------------------------------------" + "\n")
        startprompt()
    })
}

function showEmployees() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, department.name ,roles.title, roles.salary FROM employee LEFT JOIN department ON employee.id = department.id LEFT JOIN roles ON employee.id = roles.id"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("\n" + "-----------------EMPLOYEE LIST------------------------" + "\n")
        console.table(res)
        console.log("\n" + "------------------------------------------------------" + "\n")
        startprompt()
    })
}

function showRoles() {
    var query = "SELECT roles.id, roles.title,department.name ,roles.salary FROM roles LEFT JOIN department ON roles.department_id = department.id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("\n" + "-----------------EMPLOYEE LIST------------------------" + "\n")
        console.table(res)
        console.log("\n" + "------------------------------------------------------" + "\n")
        startprompt()
    })

}

function updateRole() {



    var query = `SELECT CONCAT (first_name," ",last_name) AS full_name,roles.title  FROM employee LEFT JOIN roles ON employee.role_id = roles.id`;



    connection.query(query, function (err, res) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'employeeFullName',
                type: 'list',
                choices: function () {
                    let choiceArray = res.map(choice => choice.full_name + ":" + choice.title);
                    return choiceArray;
                },
                message: 'Select an employee to update their role:'
            },
            {
                name: "newrole",
                type: "input",
                message: "Please enter the new role?",
            },
        ]).then(function (answer) {
            let emSep = answer.employeeFullName.split(":")
            let emTitle = emSep[1]

            var query = `UPDATE roles SET title = (?) WHERE title = (?)`
            connection.query(query, [[answer.newrole], [emTitle]], function (err, res) {
                if (err) throw err;
                console.log("ITS BEEN UPDATED");
                startprompt();

            })

        })
    })
}
