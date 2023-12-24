function addDepartment () {
  // app.post('/api/new-movie', ({ body }, res) => {
  //   const sql = `INSERT INTO movies (movie_name)
  //     VALUES (?)`;
  //   const params = [body.movie_name];
    
  //   db.query(sql, params, (err, res) => {
  //     if (err) {
  //       res.status(400).json({ error: err.message });
  //       return;
  //     }
  //     res.json({
  //       message: 'success',
  //       data: body
  //     });
  //   });
  // });
  // // return res.json;
} 
// function addRole () {
// function addEmployee () {

function viewDepartments () {
  const sql = `SELECT id, name FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
        return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
}

// function viewRoles () {

// function viewEmployees () {

function updateEmployeeRole () {
  // app.put('/api/review/:id', (req, res) => {
  //   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
  //   const params = [req.body.review, req.params.id];
  
  //   db.query(sql, params, (err, result) => {
  //     if (err) {
  //       res.status(400).json({ error: err.message });
  //     } else if (!result.affectedRows) {
  //       res.json({
  //         message: 'Movie not found'
  //       });
  //     } else {
  //       res.json({
  //         message: 'success',
  //         data: req.body,
  //         changes: result.affectedRows
  //       });
  //     }
  //   });
  // });
}

module.exports = {
  addDepartment,
  // addRole,
  // addEmployee,
  viewDepartments,
  // viewRoles,
  // viewEmployees,
  updateEmployeeRole
};
