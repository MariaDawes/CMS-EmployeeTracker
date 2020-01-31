var mysql = require("mysql");
var inquirer = require("inquirer");
const fs = require("fs");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Copacabana259$",
    database: "hrDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    init();
});



function init() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "task",
                message: "What you would like to do?",
                choices: [
                    "Add employee",
                    "View all employees",
                    "Update employee role",
                    "Exit Program"
                ]
            }
        ])
        .then(ans => {

            if (ans.task == "Add employee") {
                firstEmployee = true;
                addEmployee();
            }
            else if (ans.task == "View all employees") {
                viewallEmployees();
            }
            else if (ans.task == "Update employee role") {
                updateEmployeerole();
            }
            else if (ans.task == "Exit Program") {
                connection.end();
                console.log("Thank for using the app! Goodbye!");
            }
        }) // end prompt/then
} // end function



function addEmployee() {

    //Prompts for getting new employee information
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstname",
                message: "What is the employee's first name?",
                validate: validateName
            },
            {
                type: "input",
                name: "lastname",
                message: "What is the employee's last name?",
                validate: validateName
            },
            {
                type: "input",
                name: "managerFirstname",
                message: "Who is the employee manager's first name?",
                validate: validateName
            },
            {
                type: "input",
                name: "managerLastname",
                message: "Who is the employee manager's last name?",
                validate: validateName
            },
            {
                type: "list",
                name: "action1",
                message: "What is the employee's role?",
                choices: [
                    "Sales Manager",
                    "Software Engineer",
                    "Accountant",
                    "Lawyer",
                    "Project Manager"
                ]
            },
            {
                type: "list",
                name: "action2",
                message: "What is the employee's department?",
                choices: [
                    "Sales",
                    "IT",
                    "Finance",
                    "Legal",
                    "PMO"
                ]
            }
        ])
        .then(function (answer) {

            if (answer.action1 == "Sales Manager") {
                roleId = 1;
            }
            else if (answer.action1 == "Software Engineer") {
                roleId = 2;
            }
            else if (answer.action1 == "Accountant") {
                roleId = 3;
            }
            else if (answer.action1 == "Lawyer") {
                roleId = 4;
            }
            else if (answer.action1 == "Project Manager") {
                roleId = 5;
            }

            if (answer.action2 == "Sales") {
                departmentId = 1;
            }
            else if (answer.action2 == "IT") {
                departmentId = 2;
            }
            else if (answer.action2 == "Finanace") {
                departmentId = 3;
            }
            else if (answer.action2 == "Legal") {
                departmentId = 4;
            }
            else if (answer.action2 == "PMO") {
                departmentId = 5;
            }


            const firstName = answer.firstname;
            const lastName = answer.lastname;
            const managerFirst = answer.managerFirstname;
            const managerLast = answer.managerLastname;

            console.log(firstName);
            console.log(lastName);
            console.log(roleId);

            //if (firstName == managerFirst && lastName == managerLast){
            managerId = 1;
            // }          
            //To get the manager id: loop the employeeTable to find the first name and last name 
            //of the manager. The manager is an employee, so we get the employee id. when the names match)
            // connection.query("SELECT * FROM employeeTable", function(err, res) {
            //     if (err) throw err;                    
            // });


            //To insert the employee info in employeeTable
            connection.query(`INSERT INTO employeeTable (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [firstName, lastName, roleId, managerId], function (err, res) {

                if (err) throw err;
                console.log("I am here!!!!");
                console.log(res)

                console.table("-----------------------------------------------------------------------------");
                console.table("                       New employee  " + firstName + " " + lastName + "  added to database                  ");
                console.table("-----------------------------------------------------------------------------");
                init();
            });
        })  // end of inquire and then *****
}   //end employee function


function viewallEmployees() {

    var query = "SELECT * FROM employeeTable";
        connection.query(query, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                var fnStorage = res[i].first_name;
                var lnStorage = res[i].last_name;
                var roleidStorage = res[i].role_id;
                console.log(fnStorage, lnStorage, roleidStorage);
                
                connection.query("SELECT * FROM roleTable WHERE ?",{ roleidStorage }, function (err, res) {
                    if (err) throw err;
                    var a = 0;
                    console.log("Role id: ", res[a].id, roleidStorage);
                    // for (var a = 0; a < roleTable.length; a++) {
                    //     if (res[i].role_id == res[i].id) {
                    //         employeeTitle = res[i].title;
                    //         employeeSalary = res[i].salary;
                    //         employeedepartamentId = res[i].departmentId;
                    //     }
                    // }
                });


                
            }
        
        });   
        connection.query("SELECT * FROM employeeTable WHERE ?", { id: i }, function (err, res) {
        if (err) throw err;
        for (var i = 1; i < employeeTable.length; i++) {



        }

        connection.query("SELECT * FROM roleTable", function (err, res) {
            if (err) throw err;
            for (var i = 0; i < roleTable.length; i++) {
                if (res[i].role_id == res[i].id) {
                    employeeTitle = res[i].title;
                    employeeSalary = res[i].salary;
                    employeedepartamentId = res[i].departmentId;
                }
            }
        });
        connection.query("SELECT * FROM depTable", function (err, res) {
            if (err) throw err;
            for (var i = 0; i < depTable.length; i++) {
                if (employeedepartmentId == res[i].id) {
                    employeedepartamentName = res[i].departmentName;
                }
            }
        });

        //To write all the employee information on screen 
        //tenho que completar com DataTransferItemList, salary department
        for (var i = 0; i < employeeTables.length; i++) {
            console.table(res[i].first_name + " | " + res[i].last_name + " | " + res[i].role_id + " | " + res[i].manager_id + " | " + managerFirst + " | " + managerLast + " | " + employeeTitle + " | " + employeeSalary + " | " + employeedepartamentName);
        }

        //connection.end();  Ask TA if this is needed here @@@@@@@
    }
    });

init();
}


function updateEmployeerole() {

    inquirer
        .prompt([
            {
                type: "input",
                name: "firstname",
                message: "What is the employee's first name?",
                validate: validateName
            },
            {
                type: "input",
                name: "lastname",
                message: "What is the employee's last name?",
                validate: validateName
            },
            {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer", "Project Manager"]
            },
            {
                type: "input",
                name: "managerFirstname",
                message: "Who is the new manager's first name?",
                validate: validateName
            },
            {
                type: "input",
                name: "managerLastname",
                message: "Who is the new manager's last name?",
                validate: validateName
            }
        ])
        .then(ans1 => {

            const firstName = ans1.firstname;
            const lastName = ans1.lastname;
            const managerFname = ans1.managerFirstname;
            const managerLname = ans1.managerLastname;
            var roleId = 0;

            // Roles ids
            if (ans1.role == "Sales Manager") {
                roleId = 1;
            }
            else if (ans1.role == "Software Engineer") {
                roleId = 2;
            }
            else if (ans1.role == "Accountant") {
                roleId = 3;
            }
            else if (ans1.role == "Lawyer") {
                roleId = 4;
            }
            else if (ans1.role == "Project Manager") {
                roleId = 5;
            }




            //I need to add the update code here

            init();
        })  // end of inquire and then *****
}


//Validation functions - name and salary

function validateName(input) {
    if (!input.match(/^[A-Z][A-Z ]{0,}/i)) {
        return "Must contain at least 1 character and may contain only letters and spaces!";
    } else {
        return true;
    }
}
function validateNumber(input) {
    if (!input.match(/^[0-9]+$/)) {
        return "Must be a number!";
    } else {
        return true;
    }
}