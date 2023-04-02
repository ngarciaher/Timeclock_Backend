
module.exports = (sequelize, Sequelize) => {
    const TimeCard = sequelize.define("timecard", {
      employeeid: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      deptid: {
        type: Sequelize.INTEGER
      },
      timein: {
        type: Sequelize.DATE
      },
      timeout: {
        type: Sequelize.DATE
      },
      hostname: {
        type: Sequelize.STRING(50)
      },
    });
  
    return TimeCard;
  };

 

