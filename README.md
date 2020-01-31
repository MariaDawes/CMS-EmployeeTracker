# CMS - Employee Tracker
Architect an application that builds a solution for managing a company's employees, to help the user organize and plan the  business. The application allows the user to view and manage the departments, roles, and employees in the company. 
The command-line application should allow users to: 
- add departments, roles, employees 
- view departments, roles, employees 
- update employee's roles


# Motivation
Build a solution for managing a company's employees using node, inquirer, and MySQL. 

# Prerequisites
The software will run in any Laptop, iPad and phone.

# Results 
*  The command-line application should: add departments, roles, employees; view departments, roles, employees; update employee roles


## Submission 
 The URL of the GitHub repository

## Screenshots


* "Add employee" option Screenshots

![alt text](./screen4.png "Logo Title Text 4")
Screen 4 - Above you can see the prompts for "Add employee" option, for adding new employees to the database. Also, shows the successfule result of the employee being added to the database - message "New employee (fist name and last name)  added to the database". The info first/last name has been extracted directly from the database. 

![alt text](./screen5.png "Logo Title Text 5")
Screen 5 - Above more examples of employees getting added to the database, just like Screen 4.

![alt text](./screen6.png "Logo Title Text 6")
Screen 6 - This screenshot shows the database complete in Workbench with all the employee added in screens 4 and 5. Check it out! The names are all there! :)



* "View all employees" option Screenshots

![alt text](./screen2.png "Logo Title Text 2")
Screen 2 - Above you can see the result for "View all employees".  It shows all employees in teh employeeTable (first name, last name, roleid). For the first employee, I managed to get from the roleTable the Title, salary and department id. SO, I could access the role table, but I think there was a code error that prevented me to get the rest of the info. I am going to try to fix it.  

![alt text](./screen3.png "Logo Title Text 3")
Screen 3 - Above you can see the database table that was used as source for the fist screeshot of "View all employees"


## Tests 
* tested all entries   

## Author
Maria Dawes-Tedesc0

## Contributing
Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

# Versioning
For the versions available, see https://github.com/MariaDawes/Template-Engine/commits/master

# Acknowledgement
Thanks to Eric to help me when I was stuck.


