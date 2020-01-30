// var mysql = require("mysql");
var inquirer = require("inquirer");
const fs = require("fs");

// var connection = mysql.createConnection({
//     host: "localhost",
//     port: 3000,
//     user: "root",
//     password: "Copacabana259$",
//     database: "hrDB"
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//     init();
//   });

init();
function init() {
    inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        message: "What you would like to do?",
        choices: [
                  "Add employee", 
                  "View all employees", 
                  "Update employee role", 
                  "Exit Program"
                 ] 
            //choices: ["Add employee", "Remove employee", "View all employees", "View all employees by department", "View all employees by manager", "Update employee role", "Update employee department", "Update employee manager", "Exit Program"]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "Add employee":
          addEmployee();
          break;
        case "View all employees":
          viewallEmployees();
          break;
        case "Update employee role":
          updateEmployeerole();
          break;
        case "Exit Program":
          console.log("Thank for using the app! Goodbye!");
          break;
        }
      });
} // end function


    //
    // .then(ans => {
                                
    //     if (ans.task == "Add employee") {
            
    //         addEmployee();
                        
    //     }
        // else if (ans.task == "Remove employee") {
   
        //     //removeEmployees();
        //     console.log("Remove employee");
        // }
        // else if (ans.task == "View all employees") {
           
        //     viewallEmployees();
            
        // }
        // else if (ans.task == "View all employees by department") {
           
        //     //viewallEmployeesbydepartment();
        //     console.log("View all employees by department");
        // }
        // else if (ans.task == "View all employees by manager") {
           
        //     //viewallEmployeesbymanager();
        //     console.log("View all employees by manager");
        // }
        // else if (ans.task == "Update employee role") {
       
        //     updateEmployeerole();
        
        // }
        // else if (ans.task == "Update employee department") {
       
        //     //updateEmployeedepartment();
        //     console.log("Update employee department");
        // }
        // else if (ans.task == "Update employee manager") {
       
        //     //biditemPrompts();
        //     console.log("Update employee manager");
        // }
        // else if (ans.task == "Exit Program") {
            
        //     console.log("Thank for using the app! Goodbye!");
        // }
    
    //}) // end prompt/then



function addEmployee(){

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
                name: "action1",
                type: "rawlist",
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
                name: "action2",
                type: "rawlist",
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
        .then(function(answer) {
            switch (answer.action1) {
            case "Sales Manager":
                roleId = 1;
                break;
            case "Software Engineer":
                roleId = 2;
                break;
            case "Accountant":
                roleId = 3;
                break;
            case "Lawyer":
                roleId = 4;
                break;
            case "Project Manager":
                roleId = 5;
                break;
            }
            
            switch (answer.action2) {
                case "Sales":
                    departmentId = 1;
                    break;
                case "IT":
                    departmentId = 2;
                    break;
                case "Finance":
                    departmentId = 3;
                    break;
                case "Legal":
                    departmentId = 4;
                    break;
                case "PMO":
                    departmentId = 5;
                    break;
                }
                       
            const firstName = answer.firstname;
            const lastName = answer.lastname;
            const managerFirst = answer.managerFirstname;
            const managerLast = answer.managerLastname;
            console.log(roleId);
            console.log(departmentId);
            console.log(managerFirst);
            console.log(managerLast);
            console.log(firstName);
            console.log(lastName);


           //To get the manager id: loop the employeeTable to find the first name and last name 
           //of the manager. The manager is an employee, so we get the employee id. when the names match)
            connection.query("SELECT * FROM employeeTable", function(err, res) {
                if (err) throw err;
                for (var i = 0; i < employeeTables.length; i++) {
                    if (res[i].first_name == managerFirst && res[i].last_name == managerLast){
                        managerId =  res[i].id;
                    }                    
                }
            });

           //To insert the employee info in employeeTable
           connection.query(`INSERT INTO employeeTable (first_name, last_name, role_id, manager_id) VALUES (firstName, lastName, roleId, managerId)`, function(err, res) {
               if (err) throw err;
               console.log(res);
               afterConnection();
            });

            //To verify if employee was added to table - displays employee's info entered
            function afterConnection() {
                connection.query("SELECT * FROM employeeTable", function(err, res) {
                    if (err) throw err;
                    for (var i = 0; i < employeeTables.length; i++) {
                        if (res[i].first_name == firstName && res[i].last_name == lastName){
                            console.log("-----------------------===========------------------------------------------");
                            console.log("---------New employee" + firstName + lastName + "added to database----------");
                            console.log("------------------------------=========-------------------------------------");

                        }        
                    };
                    //connection.end();  Ask TA if this is needed here @@@@@@@
                });
            }
        })  // end of inquire and then *****
    init();
}   
    

function viewallEmployees(){
    
    // return this.connection.query("SELECT employeeTable.id, employeeTable.first_name, employeeTable.last_name ,employeeTable.role_id, employeeTable.manager_id, roleTable.title, roleTable.salary, depTable.departmentName AS depTable, roleTable.salary, CONCAT(manager.id) AS manager FROM employeeTable LEFT JOIN roleTable ON employeeTable.role_id = role_id LEFT JOIN depTable ON role.departmentId = depTable.id LEFT JOIN employeeTable ON manager_id = employeeTAble.manager_id;")
  
    
    connection.query("SELECT * FROM employeeTable", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < employeeTable.length; i++) {
            
            connection.query("SELECT * FROM roleTable", function(err, res) {
                if (err) throw err;
                for (var i = 0; i < roleTable.length; i++) {
                    if (res[i].role_id == res[i].id){
                        employeeTitle = res[i].title;
                        employeeSalary = res[i].salary;
                        employeedepartamentId = res[i].departmentId; 
                    }
                }
            });
            connection.query("SELECT * FROM depTable", function(err, res) {
                if (err) throw err;
                for (var i = 0; i < depTable.length; i++) {
                    if (employeedepartmentId == res[i].id){
                        employeedepartamentName = res[i].departmentName; 
                    }
                }
            });
            
            //To write all the employee information on screen 
            //tenho que completar com DataTransferItemList, salary department
            for (var i = 0; i < employeeTables.length; i++) {
                console.log(res[i].first_name + " | " + res[i].last_name + " | " + res[i].role_id + " | " + res[i].manager_id + " | " + managerFirst + " | " + managerLast + " | " + employeeTitle + " | " + employeeSalary + " | " + employeedepartamentName);
            }
            
            //connection.end();  Ask TA if this is needed here @@@@@@@
       }
     
    
    
    
    
    
    init();
}  

    




function updateEmployeerole(){

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




                //I need to add this info to the employeeTable
    
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