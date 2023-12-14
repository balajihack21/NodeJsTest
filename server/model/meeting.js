const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../util/database')

 const meeting=sequelize.define('meeting',{
        id:{
          type:DataTypes.INTEGER,
          autoIncrement:true,
          allowNull:false,
          primaryKey:true
        },
        time:{
            type:DataTypes.STRING,
            allowNull:false
        },
        availableSlots:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        user:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })

    meeting.create({
        time:'2:30 PM',
        availableSlots:5,
        user:'Balaji'
    })

    module.exports={sequelize,meeting}