const db = require("../models");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Employee = db.employees;
const Op = db.Sequelize.Op;
const createToken = (id) => {
  return jwt.sign({id}, process.env.SECRET, { expiresIn: '3d' })// expires in 3 days
}


// login a employee
exports.findOne = async (req, res) => {
  const {username, password} = req.body

  if (!username || !password) {
     return res.status(400).json({ error: 'All fields must be filled'})
  }

  try {
  const user = await Employee.findOne({ where: { username: username } })

  if (!user) {
    return res.status(400).json({ error: 'Incorrect Username'})
  }

  if (!user.active) {
    return res.status(400).json({ error: 'User not Active'})
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(400).json({ error: 'Incorrect Password'})
  }

    // create a token
    const token = createToken(user.id)
    const id = user.id
    const employeename = user.firstname +" " + user.lastname
    const admin = user.admin
    res.status(200).json({id, username, employeename, admin, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

 
  // Create a Employee Sign Up
  exports.create = async (req, res) => {
    const {
        firstname,
        middlename,
        lastname,
        username,
        email,
        password,
        admin,
        active
 
        } = req.body

        //const admin =   req.body.admin ? req.body.admin : false
       // const active =   req.body.active ? req.body.active : false
        const deptid =   req.body.deptid ? req.body.deptid : 1

    let emptyFields = []

  if(!firstname) {
    emptyFields.push('firstname')
  }
  if(!lastname) {
    emptyFields.push('lastname')
  }
  if(!username) {
    emptyFields.push('username')
  }
  if(!password) {
    emptyFields.push('password')
  }
 
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }
  
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: 'Password not strong enough'})
  }

  const exists = await Employee.findOne({ where: { username: username } })

  if (exists) {
    return res.status(400).json({ error: 'Username already in use'})
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
// Save Employee in the database
try {
  const employee = await Employee.create({firstname, middlename, lastname, username, email, password: hash, admin, active, deptid })
  // create a token
  //const token = createToken(employee.id)
 
  res.status(200).json(employee)
 } catch (error) {
  res.status(400).json({error: error.message})
}

  };


  // Update a Employee 
  exports.update = async (req, res) => {
    const id = req.params.id;
    const {
        firstname,
        middlename,
        lastname,
        username,
        email,
        password,
        admin,
        active
 
        } = req.body

        //const admin =   req.body.admin ? req.body.admin : false
       // const active =   req.body.active ? req.body.active : false
        const deptid =   req.body.deptid ? req.body.deptid : 1

    let emptyFields = []

  if(!firstname) {
    emptyFields.push('firstname')
  }
  if(!lastname) {
    emptyFields.push('lastname')
  }
  if(!username) {
    emptyFields.push('username')
  }
 /*  if(!password) {
    emptyFields.push('password')
  } */
 
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }
  
  if (password && !validator.isStrongPassword(password)) {
    return res.status(400).json({ error: 'Password not strong enough'})
  }
  let data = []
if(password){
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  data = {firstname, lastname, username, deptid, password: hash, admin, active}
}
if(!password){
  data = {firstname, lastname, username, deptid, admin, active}
}
 
// Save Employee in the database
try {
 
  const employee = await Employee.update(data ,{where: { id: id }})
  
 
  // create a token
  //const token = createToken(employee.id)
 
  res.status(200).json(employee)
 } catch (error) {
  res.status(400).json({error: error.message})
}

  };

  // Retrieve all Employees from the database.
exports.findAll = async (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
   
  try {
  const employees = await Employee.findAll({ where: condition })
       res.status(200).json(employees)
       }
       catch (error) {
        res.status(404).json({error: error.message})
      }
  };

  // Find Employee from the database.
 exports.findEmployee = async (req, res) => {
  const id = req.params.id;
 
try {
  const employee = await  Employee.findByPk(id)
     res.status(200).json(employee)
     }
     catch (error) {
      res.status(404).json({error: error.message})
    }

    
};
 

// Delete Employee from the database.
 exports.delete = async (req, res) => {
  const id = req.params.id;

   const timecardid = await db.timecard.findOne({ where: { employeeid: id }, limit: 1 })
  
    if(timecardid){
      return res.status(404).json({error: 'Unable to delete User.'})
    } 
  const employee = await Employee.findOne({ where: { id: id } })
 
try {
  await Employee.destroy({where: { id: id } })
     res.status(200).json(employee)
     }
     catch (error) {
      res.status(404).json({error: error.message})
    }

    
};
 