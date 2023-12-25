//This is the driver code with the inquirer and the init function
const inquirer = require("inquirer");
//const connection = reqire("./db/connection.js");
const db = require("./db"); //There is an error here and I dont really know how to fix it.
require("console.table");

function init(){
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View all employees",
                    value:"viewEmployees"
                },
                {
                    name: "View employees by department",
                    value:"viewEmployeesDept"
                },
                {
                    name: "View employees by manager",
                    value:"viewEmployeesMngr"
                },
                {
                    name: "Add employee",
                    value:"addEmployee"
                },
                {
                    name: "Remove Employee",
                    value:"rmvEmployee"
                },
                {
                    name: "Update employee role",
                    value:"updateRole"
                },
                {
                    name: "Update employee manager",
                    value:"updateMngr"
                },
                {
                    name: "View all roles",
                    value:"viewRoles"
                },
                {
                    name: "Add Role",
                    value:"addRole"
                },
                {
                    name: "Remove Role",
                    value:"rmvRole"
                },
                {
                    name: "View all departments",
                    value:"viewDepartments"
                },
                {
                    name: "Add a department",
                    value:"addDepartments"
                },
                {
                    name: "Remove a department",
                    value:"rmvDepartments"
                },
                {
                    name: "View Total utilized budget by department",
                    value:"viewBudget"
                },
                {
                    name: "quit",
                    value:"quit"
                }   
            ]
        }
    ])
    .then(res => {
        let choice = res.choice;
        console.log(choice);
        switch (choice) {
            case "viewEmployees":
                viewEmp();
                break;
            case "viewEmployeesDept":
                viewEmpDept();
                break;
            case "viewEmployeesMngr":
                viewEmpMngr();
                break;
            case "addEmployee":
                addEmp();
                break;
            case "rmvEmployee":
                rmvEmp();
                break;
            case "updateRole":
                updateRole();
                break;
            case "updateMngr":
                updateMngr();
                break;
            case "viewRoles":
                viewRoles();
                break;
            case "addRole":
                addRole();
                break;
            case "rmvRole":
                rmvRole();
                break;
            case "viewDepartments":
                viewDept();
                break;
            case "addDepartments":
                addDept();
                break;
            case "rmvDepartments":
                rmvDept();
                break;
            case "viewBudget":
                viewBudget();
                break;
            case "quit":
                quit();
                break;
        }
    })
}

// options for menu for users to select from
/*const menuChoices = [
    {
        name: "View all employees",
        value:"viewEmployees"
    },
    {
        name: "View employees by department",
        value:"viewEmployeesDept"
    },
    {
        name: "View employees by manager",
        value:"viewEmployeesMngr"
    },
    {
        name: "Add employee",
        value:"addEmployee"
    },
    {
        name: "Remove Employee",
        value:"rmvEmployee"
    },
    {
        name: "Update employee role",
        value:"updateRole"
    },
    {
        name: "Update employee manager",
        value:"updateMngr"
    },
    {
        name: "View all roles",
        value:"viewRoles"
    },
    {
        name: "Add Role",
        value:"addRole"
    },
    {
        name: "Remove Role",
        value:"rmvRole"
    },
    {
        name: "View all departments",
        value:"viewDepartments"
    },
    {
        name: "Add a department",
        value:"addDepartments"
    },
    {
        name: "Remove a department",
        value:"rmvDepartments"
    },
    {
        name: "View Total utilized budget by department",
        value:"viewBudget"
    },
    {
        name: "quit",
        value:"quit"
    }   
];*/

// menu inquirer prompt for user to use
/*const menu = [
    {
        type: "list",
        name: "MainMenu",
        message: "What would you like to do?",
        choices: menuChoices
    }
]*/

// Main menu function used to hold a switch case statement that calls specific function based on input from inquirer
/*function mainMenu(input){
    console.log(input);
    switch (input) {
        case "viewEmployees":
            viewEmp();
            break;
        case "viewEmployeesDept":
            viewEmpDept();
            break;
        case "viewEmployeesMngr":
            viewEmpMngr();
            break;
        case "addEmployee":
            addEmp();
            break;
        case "rmvEmployee":
            rmvEmp();
            break;
        case "updateRole":
            updateRole();
            break;
        case "updateMngr":
            updateMngr();
            break;
        case "viewRoles":
            viewRoles();
            break;
        case "addRole":
            addRole();
            break;
        case "rmvRole":
            rmvRole();
            break;
        case "viewDepartments":
            viewDept();
            break;
        case "addDepartments":
            addDept();
            break;
        case "rmvDepartments":
            rmvDept();
            break;
        case "viewBudget":
            viewBudget();
            break;
        case "quit":
            quit();
            break;
    }

}*/

// Function to view employee
function viewEmp(){
    db.findAllEmp() // calls find all employee function from db code
        .then(([rows]) =>{ // returns the rows from the tables and uses it for the next function
            let emp = rows;// set emp variable to equal rows
            console.log("\n");
            console.table(emp);// print out table
        })
        .then(() => init()); // call init function
}

function addEmp(){ // adds employee
    inquirer.prompt([ // use inquirer to get user input for variables
        {
            type: "input",
            name: "first_name",
            message: "What is the first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name?"
        }
    ])
    .then(res => {
        let firstName = res.first_name; // assign values for first name
        let lastName = res.last_name; // and last name

        db.findAllRoles() //call find all role function in db, this allows us to select a role for the new employee
            .then(([rows]) => {
                let emp = rows
                const roleMenu = emp.map(({id, title}) => ( // map data returned from findallrole
                    {
                        name: title,
                        value: id
                    }
                ));
                inquirer.prompt([ // use inquirer to select a role based on the list of roles
                    {
                        type: "list",
                        name: "roleId",
                        message: "What is the role given?",
                        choices: roleMenu
                    }
                ])
                .then(res => {
                    let roleId = res.roleId; // role Id for user is based of of the response from the inquirer

                    db.findAllEmp() // findallEmp function used to find all employees in select role
                        .then(([rows]) => {
                            let emp = rows;
                            const mngrMenu = emp.map (({id, first_name, last_name}) => ({ // should return a map of managers
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));

                            mngrMenu.unshift({name: "None", value: null});  // removes all items without a name and value

                            inquirer.prompt([{ // prompt used to select a manager from the generated manager menu from above
                                type:"list",
                                name: "managerId",
                                message: "Who is the manager?",
                                choices: mngrMenu
                            }])
                            .then (res => {
                                let emp = { // assign values to the new employee
                                    manager_id: res.managerId, // assign manager id from response
                                    role_id: roleId,// assign roleId from roleId used
                                    first_name: firstName, // assign firstName where firstname is used
                                    last_name: lastName // assign last name where last name is used
                                }

                                db.createEmp(emp) // use create employee function from emp variable
                            })
                            .then(() => console.log("Added new player in db"))
                            .then(() => init())
                        })
                })
            })
    })
}
function updateRole(){ // updateRole is used to update the role of a select user
    db.findAllEmp() // use the find all emp function from db
        .then(([rows]) => {
            let emp = rows;
            const empMenu = emp.map(({id, first_name, last_name}) =>( 
                {
                    name: `${first_name} ${last_name}`,
                    value: id
                } // sets up values for menu
            ));
            inquirer.prompt([ // inquirer asks for a list of employees you want to update
                {
                    type: "list",
                    name: "empId",
                    message: "Which employee do you want to select to update their roles.",
                    choices: empMenu // use empMenu to generate list made in earlier code
                }   
            ])
            .then(res => {
                let empId = res.empId; // set employee id to empId response
                db.findAllRoles() // use find all roles to get a list of roles avaliable
                    .then(([rows]) => {
                        let roles = rows;
                        const roleMenu = roles.map(({title, id}) => ({ // create menu to use for inquirer
                            name: title,
                            value: id
                        }));

                        inquirer.prompt([ // inquirer for a choice from generated list of roles
                            {
                                type: "list",
                                name: "roleId",
                                message: "Which role do you want to assign?",
                                choices: roleMenu
                            }
                        ])
                        .then(res => db.updateEmpRole(empId, res.roleId)) // call the update employee role function from db and change it to the role selected from the response
                        .then(() => console.log("Updated employee's role"))
                        .then(() => init())
                    })
            })
        })
}
function viewRoles(){ // View roles works the same as view employees
    db.findAllRoles()// calls findAllRoles function from db
    .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
    })
    .then(() => init());
}
function addRole(){
    db.findAllDept()
    .then(([rows]) =>{
        let dept = rows;
        const deptMenu = dept.map(({id, name}) =>({
            name: name,
            value: id
        }));
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "what is the name of the role?"
            },
            {
                type: "input",
                name: "salary",
                message: "what is the roles salary?"
            },
            {
                type: "list",
                name: "department_id",
                message: "What department does the role belong in?",
                choices: deptMenu
            }
        ])
        .then(role => {
            db.createRole(role)
                .then(() => console.log(role.title+" Added Role to database"))
                .then(() => init())
        })
    })
}

function viewDept(){// viewDept works the same as the other view functions
    db.findAllDept()// calls find all departments.
        .then(([rows]) => {
            let dept = rows;
            console.log("\n");
            console.table(dept);
        })
        .then(() => init());
}
function addDept(){ // function used to add departments to the table
    inquirer.prompt([ // uses inquirer to get a response for adding dept
        {
            type: "input",
            name: "name",
            message: "what is the department called"
        }
    ])
    .then(res => {
        var deptName = res;
        db.createDept(deptName)// create department using response value
            .then(() => console.log(deptName.name+" Added Role to database"))
            .then(() => init())

    })
}
function quit(){ // Quits program
    console.log("Thank you, Goodbye")
    process.exit();
}
//BONUS FUNCTIONS ---- NOT DONE!!!!!
function viewEmpDept(){ 
    console.log ("DOES NOT WORK YET (TRIED TO DO, DIDNT WORK)");
    init();
}
function viewEmpMngr(){
    console.log ("DOES NOT WORK YET (TRIED TO DO, DIDNT WORK)");
    init();
}
function rmvDept(){
    console.log ("DOES NOT WORK YET (TRIED TO DO, DIDNT WORK)");
    init();
}
function viewBudget(){
    console.log ("DOES NOT WORK YET (TRIED TO DO, DIDNT WORK)");
    init();
}
function rmvRole(){
    console.log ("DOES NOT WORK YET (TRIED TO DO, DIDNT WORK)");
    init();
}
function updateMngr(){
    console.log ("DOES NOT WORK YET (TRIED TO DO, DIDNT WORK)");
    init();
}
function rmvEmp(){
    console.log ("DOES NOT WORK YET (TRIED TO DO, DIDNT WORK)");
    init();
}


init();
