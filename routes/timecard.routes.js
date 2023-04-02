const express = require('express')
//module.exports = route => {
  const timecard = require("../controllers/timecard.controller");
  const requireAuth = require('../middleware/requireAuth')
  var router = express.Router();


  // require auth for all timecards routes
  router.use(requireAuth)
  
  // Create a new record with TimeIn for Employee
  router.post("/timein", timecard.create);

  // Update a TimeIn record for Employee (Time Out)
  router.post("/timeout", timecard.update);
    // Retrieve all Timecards
  router.get("/", timecard.findAll);

 /* // Retrieve a single TimeCard (Log In)
  router.get("/:id", timecard.findOne); */

 /* // Retrieve all published Tutorials
  router.get("/published", employees.findAllPublished);

  

  // Update a Tutorial with id
  router.put("/:id", employees.update);

  // Delete a Tutorial with id
  router.delete("/:id", employees.delete);

  // Delete all Tutorials
  router.delete("/", employees.deleteAll);

  //route.use('/api/tutorials', router);
//}; */

module.exports = router
  