const { DataTypes } = require('sequelize');

const db = require('../db/conn');

//user 
const User = require('./user');

const Idea = db.define('Ideas', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        require: true,
    },
})

Idea.belongsTo(User)
// Define the association between Idea and User
User.hasMany(Idea, {
    //foreignKey: 'userId',
    //allowNull: false,
   // onDelete: 'CASCADE', // If a user is deleted, their ideas will also be deleted
});


module.exports = Idea;  