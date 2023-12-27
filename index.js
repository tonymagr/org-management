//INDEX.JS - Driver code with the inquirer and the init function

const inquirer = require('inquirer');
require('console.table');
const db = require('./utils/db-class');

const intro =
'--------------------------------------------------------------------------------\n\
--------------------------------------------------------------------------------\n\
---                                                                          ---\n\
---               O  R  G                               O  R  G              ---\n\
---    M  A  N  A  G  E  M  E  N  T          M  A  N  A  G  E  M  E  N  T    ---\n\
---                                                                          ---\n\
---                                                                          ---\n\
---                                                                          ---\n\
---               O  R  G                               O  R  G              ---\n\
---    M  A  N  A  G  E  M  E  N  T          M  A  N  A  G  E  M  E  N  T    ---\n\
---                                                                          ---\n\
--------------------------------------------------------------------------------\n\
--------------------------------------------------------------------------------\n';

// Functions - Logic for user selection

// Function to view employee
function viewEmp(){
    db.findAllEmp() // calls find all employee function from db code
        .then(([rows]) => { 
            let emp = rows;
            console.log('\n');
            console.table(emp);// print out table
        })
        .then(() => init()); // call init function
}

// Function to view employees in a department
function viewEmpDept () {
    db.findAllDept()                // Use the find all dept function to run SQL
        .then(([rows]) => {
            const deptList = rows.map(({id, name}) => ( 
                {
                    name: name,
                    value: id       // Sets up values for list
                } 
            ));
            inquirer.prompt([       // inquire to select department
                {
                    type: 'list',
                    name: 'deptId',
                    message: 'For which department do you want to see the employees?',
                    choices: deptList 
                }   
            ])
            .then(res => db.findEmpDept(res.deptId)
                    .then(([rows]) => { 
                        if (rows.length > 0) {
                            console.log('\n');
                            console.table(rows);    // display results
                        } else {
                            console.log('No employees in this department.\n')
                        }
                    })
                )
            .then(() => init())
        })
}

// Function to view budget of a department
function viewDeptBudget () {
    db.findAllDept()                // Use the find all dept function to run SQL
        .then(([rows]) => {
            const deptList = rows.map(({id, name}) => ( 
                {
                    name: name,
                    value: id       // Sets up values for list
                } 
            ));
            inquirer.prompt([       // inquire to select department
                {
                    type: 'list',
                    name: 'deptId',
                    message: 'For which department do you want to see the budget?',
                    choices: deptList 
                }   
            ])
            .then(res => db.findDeptBudget(res.deptId)
                    .then(([rows]) => {
                        console.log('\n');
                        if (rows[0].department) {       // Department found and has employees
                            console.table(rows);        // Display result
                        } else {
                            rows[0].department = 'Chosen Department';
                            rows[0].budget = '$0.00';
                            console.table(rows);        // Display zero result
                        }
                    })
                )
            .then(() => init())
        })
}

function addEmp(){ // adds employee
    inquirer.prompt([ // use inquirer to get user input for variables
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name?'
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
                        type: 'list',
                        name: 'roleId',
                        message: 'What is the role given?',
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

                            mngrMenu.unshift({name: 'None', value: null});  // removes all items without a name and value

                            inquirer.prompt([{ // prompt used to select a manager from the generated manager menu from above
                                type:'list',
                                name: 'managerId',
                                message: 'Who is the manager?',
                                choices: mngrMenu
                            }])
                            .then (res => {
                                let emp = { // assign values to the new employee
                                    manager_id: res.managerId, 
                                    role_id: roleId,
                                    first_name: firstName,
                                    last_name: lastName
                                }

                                db.createEmp(emp) // use create employee function from emp variable
                            })
                            .then(() => console.log(`${firstName} ${lastName} added to database`))
                            .then(() => init())
                        })
                })
            })
    })
}

function chgRole(){ // chgRole is used to update the role of a select user
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
                    type: 'list',
                    name: 'empId',
                    message: 'Which employee do you want to select to update their roles.',
                    choices: empMenu 
                }   
            ])
            .then(res => {
                let empId = res.empId; // set employee id to empId response
                db.findAllRoles() // use find all roles to get a list of roles avaliable
                    .then(([rows]) => {
                        let roles = rows;
                        // create menu to use for inquirer
                        const roleMenu = roles.map(({title, id}) => ({ 
                            name: title,
                            value: id
                        }));

                        // inquirer for a choice from generated list of roles
                        inquirer.prompt([ 
                            {
                                type: 'list',
                                name: 'roleId',
                                message: 'Which role do you want to assign?',
                                choices: roleMenu
                            }
                        ])
                        // call the update employee role function from db and change it to the role selected from the response
                        .then(res => db.updateEmpRole(empId, res.roleId)) 
                        .then(() => console.log(`Updated employee's role`))
                        .then(() => init())
                    })
            })
        })
}

function viewRoles(){ // View roles works the same as view employees
    db.findAllRoles()// calls findAllRoles function from db
    .then(([rows]) => {
        let roles = rows;
        console.log('\n');
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
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: `What is the role's salary?`
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'What department does the role belong in?',
                choices: deptMenu
            }
        ])
        .then(role => {
            db.createRole(role)
                .then(() => console.log(role.title+' Added role to database'))
                .then(() => init())
        })
    })
}

function viewDept(){// viewDept works the same as the other view functions
    db.findAllDept()// calls find all departments.
        .then(([rows]) => {
            let dept = rows;
            console.log('\n');
            console.table(dept);
        })
        .then(() => init());
}

function addDept(){ // function used to add departments to the table
    inquirer.prompt([ // uses inquirer to get a response for adding dept
        {
            type: 'input',
            name: 'name',
            message: 'What is the department called'
        }
    ])
    .then(res => {
        var deptName = res;
        db.createDept(deptName)     // create department using response value
            .then(() => console.log(deptName.name+' added to database'))
            .then(() => init())

    })
}

function rmvEmp () {                // rmvEmp is used to delete an employee record
    db.findAllEmp()                 // use the find all emp function from db
        .then(([rows]) => {
            const empMenu = rows.map(({id, first_name, last_name}) => ( 
                {
                    name: `${first_name} ${last_name}`,
                    value: id       // sets up values for menu
                } 
            ));

            inquirer.prompt([       // inquirer asks for a list of employees you want to update
                {
                    type: 'list',
                    name: 'empId',
                    message: 'Which employee do you want to select to delete.',
                    choices: empMenu 
                }   
            ])
            // Call the delete employee SQL function
            .then(res => db.deleteEmployee(res.empId)
                    .then(() => console.log('Deleted employee record.'))
                )
            .then(() => init())
        })
}

function rmvDept () {               // rmvDept is used to delete a department record
    db.findAllDept()                // Use the find all dept function to run SQL
        .then(([rows]) => {
            const deptList = rows.map(({id, name}) => ( 
                {
                    name: name,
                    value: id       // Sets up values for list
                } 
            ));
            inquirer.prompt([       // inquire to select department
                {
                    type: 'list',
                    name: 'deptId',
                    message: 'Which department do you wish to delete?',
                    choices: deptList 
                }   
            ])
            // Call the delete employee SQL function
            .then(res => db.deleteDept(res.deptId)
                    .then(() => console.log('Deleted department record.'))
                )
            .then(() => init())
        })
}

function chgRoleDept () {           // chgRoleDept is used to update the department of a select role
db.findAllRoles()                   // Call to find all roles- SQL function
        .then(([rows]) => {
            const roleMenu = rows.map(({id, title}) =>( 
                {
                    name: title,
                    value: id       // Sets up values for menu
                }
            ));
            inquirer.prompt([       // Inquirer asks for role to be updated
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'Which role do you want to update?',
                    choices: roleMenu
                }   
            ])
            .then(res => {
                db.findAllDept()       // Call to find all departments for role update- SQL function
                    .then(([deptRows]) => {
                        // Create menu to use for inquirer
                        let roleIdSave = res.roleId;
                        const deptMenu = deptRows.map(({id, name}) => ({ 
                            name: name,
                            value: id
                        }));

                        inquirer.prompt([       // Inquirer asks for department to update to
                            {
                                type: 'list',
                                name: 'deptId',
                                message: 'Which department do you want to change the role to?',
                                choices: deptMenu
                            }
                        ])
                        // Call to update department of this role
                        .then(res => db.updateRoleDept(res.deptId, roleIdSave)
                                .then(() => console.log('Updated department of chosen role.'))
                            )
                        .then(() => init())
                    })
            })
        })
}

function quit(){ // Quits program
    console.log('End Program.')
    process.exit();
}


// init() function - Main inquirer loop

function init(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View all departments',
                    value:'viewDepartments'
                },
                {
                    name: 'View all roles',
                    value:'viewRoles'
                },
                {
                    name: 'View all employees',
                    value:'viewEmployees'
                },
                {
                    name: 'Add a department',
                    value:'addDepartments'
                },
                {
                    name: 'Add a role',
                    value:'addRole'
                },
                {
                    name: 'Add employee',
                    value:'addEmployee'
                },
                {
                    name: 'Update employee role',
                    value:'chgRole'
                },
                // Bonus selections
                {
                    name: 'View employees by department',
                    value:'viewEmployeesDept'
                },
                {
                    name: 'View combined employee salaries of a department',
                    value:'viewBudget'
                },
                {
                    name: 'Remove an employee',
                    value:'rmvEmployee'
                },
                {
                    name: 'Remove a department',
                    value:'rmvDepartment'
                },
                {
                    name: 'Update the department of a role',
                    value:'chgRoleDept'
                },
                // Quit program
                {
                    name: 'Quit',
                    value:'quit'
                }
            ]
        }
    ])
    .then(res => {
        let choice = res.choice;
        console.log(choice);
        switch (choice) {
            case 'viewDepartments':
                viewDept();
                break;
            case 'viewRoles':
                viewRoles();
                break;
            case 'viewEmployees':
                viewEmp();
                break;
            case 'addDepartments':
                addDept();
                break;
            case 'addRole':
                addRole();
                break;
            case 'addEmployee':
                addEmp();
                break;
            case 'chgRole':
                chgRole();
                break;
            case 'viewEmployeesDept':
                viewEmpDept();
                break;
            case 'viewBudget':
                viewDeptBudget();
                break;
            case 'rmvEmployee':
                rmvEmp();
                break;
            case 'rmvDepartment':
                rmvDept();
                break;
            case 'chgRoleDept':
                chgRoleDept();
                break;
            case 'quit':
                quit();
                break;
        }
    })
}

console.log(intro);

init();
