
module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employees", {
      firstname: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      middlename: {
        type: Sequelize.STRING(20)
      },
      lastname: {
        type: Sequelize.STRING(20)
      },
      deptid: {
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false      
      },
      email: {
        type: Sequelize.STRING(50)
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    });
  
    return Employee;
  };

 

