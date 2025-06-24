const { DataTypes } = require('sequelize');

const sequelize = require('../db/conn');

//user 
const User = require('./user');

const Idea = sequelize.define('Ideas', {
    IdIdeia:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
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
    IdUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

Idea.belongsTo(User, {foreignKey: 'IdUser'});
// Define the association between Idea and User
User.hasMany(Idea, {foreignKey: 'IdUser'});


module.exports = Idea;  