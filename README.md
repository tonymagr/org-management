# Org Management

## Author
Tony Magrady - Berkeley Full-Stack Web Development Bootcamp student, Fall-Winter Session 2023-2024

## Badges
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Description

Org Management is about  human resource management in private, public, or non-for-profit organizations.
It is a command-line application to manage a company's employee database.

It accesses a Mysql2 relational database created for this assignment, associating department, role, and employee tables. Employee salaries are maintained at a role level, and so employee salaries are determined by association to roles. A role is assigned to a department, and so, employee department is also determined by the assigned role.

## Installation

Installed apps include Node.js (Javascript runtime), Inquirer (user input), Mysql2 (database access), and Console.table (formatted SQL result display).

## Usage

Invocation on command line: "node index". <br>
Prompts for several options for employee and related table access, update, and deletion. <br>
Once each selection is performed, the program recursively calls to redisplay the main options prompt. <br>
One option is to Quit program.

Opted for FOREIGN KEY (x) ... ON DELETE SET NULL in order to allow child rows in role and employee tables to persist upon parent row deletion. <br>
Added several bonus features to view employees by department, view total departmental salary budget, delete an employee, delete a department, and update the department of a role. <br>
"Update the department of a role" feature may be useful after deletion of a department - easier than deleting and recreating a role to associate with a new department.

[Demo Link](https://watch.screencastify.com/v/MCDDVp7sCJT7eALmaN1n){:target="_blank"} <br>
![Resulting table values after demo](./img/resulting%20table%20values%20after%20demo.jpg)

## Credits

I had difficulty getting the program to stop unwanted behavior, including exiting with no error message and other times hanging after inquirer call. After later review, I believe it could have been addressed through the recommended method in Challenge 12:  <br>
"You might also want to make your queries asynchronous. MySQL2 exposes a .promise() function on Connections to upgrade an existing non-Promise connection to use Promises. To learn more and make your queries asynchronous, refer to the npm documentation on MySQL2."

Instead I looked for ideas for previous successful implementations of Challenge 12 and found: <br>
[Previous implementation](https://github.com/anirud314/employeeTable/tree/main){:target="_blank"} <br>
I used this as my baseline code just to get a functioning combination of inquirer and mysql2.
I have added to this baseline code extensively, including several bonus features and generation of my own schema and seeds file (and many other improvements).

## License

The MIT License

Copyright (c) (2023) (Tony Magrady)

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.