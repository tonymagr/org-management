INSERT INTO department (name)
VALUES ("Claims"),
       ("Finance"),
       ("Legal"),
       ("Marketing"),
       ("Underwriting");

INSERT INTO role (title, salary, department_id)
VALUES ("Claims Adjuster", 60000, 1),
       ("Broker", 67000, 4),
       ("Agent", 69000, 4),
       ("Appraiser", 74000, 1),
       ("Actuary", 111000, 2),
       ("Underwriter", 116000, 5),
       ("Attorney", 150000, 3),
       ("Operations Manager- Claims", 100000, 1),
       ("Unit Manager- Underwriting", 120000, 5),
       ("General Manager- Finance", 120000, 2),
       ("Operations Manager- Marketing", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kiran", "Wise", 1, 8),
       ("Enzo", "Wall", 2, 11),
       ("Agnes", "Wilkins", 3, 11),
       ("Trystan", "Young", 4, 8),
       ("Mckenzie", "Hubbard", 5, 10),
       ("Macy", "Jenkins", 6, 9),
       ("Denise", "O'Gallagher", 7, null),
       ("Abdul", "Villa", 8, null),
       ("Raja", "Reese", 9, null),
       ("Lola", "McGrath", 10, null),
       ("Todd", "Wade", 11, null),
       ("Sebastian", "Reilly", 6, 9);