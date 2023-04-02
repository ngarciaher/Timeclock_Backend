const express = require('express')
const requireAuth = require('../middleware/requireAuth')
  const employees = require("../controllers/employee.controller");

  var router = express.Router();

    // require auth for all employees routes
  router.use(requireAuth)

  // Create a new Employee (Sign Up)
  router.post("/signup", employees.create);

   // Retrieve all Employees
  router.get("/", employees.findAll);

     // Retrieve one Employee
  router.get("/:id", employees.findEmployee);

    // Delete a Employee with id
 router.delete("/:id", employees.delete);

   // Update a Employee with id
 router.put("/:id", employees.update);

  



module.exports = router
  