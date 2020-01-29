//const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");

// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3030,
//     user: "root",
//     password: "Copacabana259$",
//     database: "hrDB"
// });

// connection.connect(err => {
//     if(err){ console.log(error)}
//     else {
//         init();
//     }
// })

init();
function init() {

    inquirer
    .prompt([
        {
            type: "list",
            name: "task",
            message: "What you would like to do?",
            choices: ["Add employee", "View all employees", "Update employee role", "Exit Program"] 
            //choices: ["Add employee", "Remove employee", "View all employees", "View all employees by department", "View all employees by manager", "Update employee role", "Update employee department", "Update employee manager", "Exit Program"]
        }
    ])
    .then(ans => {
                                
        if (ans.task == "Add employee") {
            
            addEmployee();
                        
        }
        // else if (ans.task == "Remove employee") {
   
        //     //removeEmployees();
        //     console.log("Remove employee");
        // }
        else if (ans.task == "View all employees") {
           
            viewallEmployees();
            
        }
        // else if (ans.task == "View all employees by department") {
           
        //     //viewallEmployeesbydepartment();
        //     console.log("View all employees by department");
        // }
        // else if (ans.task == "View all employees by manager") {
           
        //     //viewallEmployeesbymanager();
        //     console.log("View all employees by manager");
        // }
        else if (ans.task == "Update employee role") {
       
            updateEmployeerole();
        
        }
        // else if (ans.task == "Update employee department") {
       
        //     //updateEmployeedepartment();
        //     console.log("Update employee department");
        // }
        // else if (ans.task == "Update employee manager") {
       
        //     //biditemPrompts();
        //     console.log("Update employee manager");
        // }
        else if (ans.task == "Exit Program") {
            
            console.log("Thank for using the app! Goodbye!");
        }
    
    }) // end prompt/then
} // end function


function addEmployee(){

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
            message: "What is the employee's role?",
            choices: ["Sales Manager", "Software Engineer", "Accountant", "Lawyer", "Project Manager"] 
        },
        {
            type: "list",
            name: "dep",
            message: "What is the employee's department?",
            choices: ["Sales", "IT", "Finance", "Legal", "PMO"]
        },
        {
            type: "input",
            name: "manager",
            message: "Who is the employee's manager?",
            validate: validateName
        }
        ])
        .then(ans1 => {
            
            const firstName = ans1.firstname;
            const lastName = ans1.lastname;
            const manager = ans1.manager;
            
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
            
            console.log(roleId);
            console.log(manager);
            console.log(firstName);
            console.log(lastName);

            // Departments id
            if (ans1.dep == "Sales") {
                department_id = 1;  
            }                
            else if (ans1.dep == "IT") {
                department_id = 2;
            }
            else if (ans1.dep == "Finance") {
                department_id = 3;
            }
            else if (ans1.dep == "Legal") {
                department_id = 4;
            }
            else if (ans1.dep == "PMO") {
                department_id = 5;
            }

            //I need to add this info to the employeeTable

            init();
        })  // end of inquire and then *****
}   
    

function viewallEmployees(){
    
           // init();
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
                name: "manager",
                message: "Who is the employee's new manager?",
                validate: validateName
            }
            ])
            .then(ans1 => {
                
                const firstName = ans1.firstname;
                const lastName = ans1.lastname;
                const manager = ans1.manager;
                const roleId = 0;
                
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