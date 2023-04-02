require('dotenv').config()
const express = require('express')
const cors = require("cors")

const employeesRoutes = require('./routes/employee.routes')
const timecardRoutes = require('./routes/timecard.routes')
const usersRoutes = require('./routes/users.routes')
const db = require("./models");

const app = express()

/*   var corsOptions = {
  origin: "http://localhost:8081"
}  */
 
app.use(cors());

// middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// routes
app.use('/api/employees', employeesRoutes)
app.use('/api/timecards', timecardRoutes)
app.use('/api/user', usersRoutes)

// connect to db
db.sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
   // set port, listen for requests
   app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT)
  })
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});
    
  