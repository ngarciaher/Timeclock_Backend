const express = require('express')

  const employees = require("../controllers/employee.controller");

  var router = express.Router();

  
  // Submit a Log In
  router.post("/login", employees.findOne);

 



module.exports = router
  