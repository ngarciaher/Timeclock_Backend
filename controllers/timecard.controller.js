const db = require("../models");

const TimeCard = db.timecard;
const Op = db.Sequelize.Op;
const hostname = require('os').hostname();// Allocating os module

  // Create a TimeCard TimeIn
  exports.create = async (req, res) => {
    const employee_id = req.user.id
    const deptid  = req.body.deptid

    const timecardid = await TimeCard.findOne({ where: { employeeid: employee_id },
      order: [ [ 'createdAt', 'DESC' ]], limit: 1 })
      const timein = new Date();
      if(timecardid)
  {
   if( !timecardid.timeout && timein.toLocaleDateString() == timecardid.createdAt.toLocaleDateString())
   {
    return res.status(400).json({error: 'Already Clocked In'})
   }
  }
// Save Employee TimeIn in the database
try {
  
  const timecard = await TimeCard.create({ deptid, timein, employeeid: employee_id, hostname })
  
  res.status(200).json(timecard)
 } catch (error) {
  res.status(400).json({error: error.message})
}  

  };

// Update a TimeOut by the employee id in the request
exports.update = async (req, res) => {
  const employee_id = req.user.id
    const timeout= new Date();
    const timecardid = await TimeCard.findOne({ where: { employeeid: employee_id },
      order: [ [ 'createdAt', 'DESC' ]], limit: 1 })

      if(!timecardid){
        return res.status(404).json({error: 'Please Clock In First'})
      }
    if(timecardid.timeout){
      return res.status(400).json({error: 'Please Clock In First'})
    }
    if( !timecardid.timeout && timeout.toLocaleDateString() != timecardid.createdAt.toLocaleDateString())
    {
     return res.status(400).json({error: 'Please Clock In First'})
    }
     // Save Employee TimeOut in the database
 try {

   await TimeCard.update({timeout}, {where: {id: timecardid.id } })
   
   const timecard = await TimeCard.findOne({where: {id: timecardid.id } })
 
  res.status(200).json(timecard)
 } catch (error) {
  res.status(400).json({error: error.message})
}  
   
  };

  // Retrieve all Timecards for Employee from the database.
exports.findAll = async (req, res) => {
  const employee_id = req.user.id

  try {
 const timecards = await TimeCard.findAll({ where: { employeeid: employee_id }, order: [ [ 'createdAt', 'ASC' ]]})
  res.status(200).json(Array.from(timecards))

  }
  catch (error) {
    res.status(400).json({error: error.message + id})
  }  

};
 