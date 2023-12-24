// INDEX.JS
// --------
const inquirer = require('inquirer');
const ui = require('./utils/uiFile');
// require connection from connection.js
const connectFl = require('./utils/connection');
const queries = require('./utils/queries');

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

const mainMenu = [
    'View All Departments',
    'Add Department',
    'View All Roles',
    'Add Role',
    'View All Employees',
    'Add Employee',
    'Update Employee Role'
];

// async function promptUser () {
//     // await inquirer
//     // .prompt([
//     //     {
//     //         type: 'list',
//     //         message: 'What would you like to do?',
//     //         name: 'menuSelection',
//     //         choices: mainMenu
//     //     }
//     //     ])
//     // .then((response) => {
//     //     if (response !== null) {
//     //         console.log('response object', response);
//     //         console.log('response', response.menuSelection);
//     //     } else {
//     //         console.log('No response');
//     //     }
//     // });

//     await inquirer
//     .prompt([
//         {
//         name: "user_name",
//         type: "input",
//         message: "What is your name?",
//         },
//     ])
//     .then((answer) => {
//         console.log("Hello " + answer.user_name);
//   });
// }

// Clear the console
console.clear();
// Introduce application
console.log(intro);

inquirer
    .prompt([
        {
        name: "user_name",
        type: "input",
        message: "What is your name?",
        },
    ])
    .then((answer) => {
        console.log("Hello " + answer.user_name);
  });

// promptUser();

console.log('Made it here');