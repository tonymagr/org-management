const inquirer = require('inquirer');
const queries = require('./queries');

function init () {
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

    // Clear the console
    console.clear();
    // Introduce application
    console.log(intro);
}

function userInterface () {
    const mainMenu = [
        'View All Departments',
        'Add Department',
        'View All Roles',
        'Add Role',
        'View All Employees',
        'Add Employee',
        'Update Employee Role'
    ];

    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menuSelection',
            choices: mainMenu
            // validate: menuSelection => {
            //     console.log('Made it here.');
            //     if (menuSelection === 'View All Departments') {
            //         const resp = queries.viewDepartments();
            //         console.log(resp.data);
            //     } else if (menuSelection === 'View All Roles') {
            //         console.log('Function not created yet.');
            //     }
            // }
        }
        // {
        //     type: 'input',
        //     message: 'Name of author:',
        //     name: 'author',
        //     validate: author => {
        //         if (author) {
        //         return true;
        //         } else {
        //         console.log('Author name missing - Please provide.');
        //         return false;
        //         }
        //     }
        // }
    ])
    .then((response) => {
        if (response !== null) {
            console.log('Inputs processed');
            return response;
        } else {
            console.log('No response');
            return 'No response';
        }
    });

    console.log('I made it right here.');
}

module.exports = {
    init,
    userInterface
  };