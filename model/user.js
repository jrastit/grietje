const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const USER = sequelize.define('user', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: DataTypes.String,
        allowNull: false,
    },
    password: {
        type: DataTypes.String,
        allowNull: true
    },
}, {
    // Define any additional table options here
    tableName: 'user',
    timestamps: true,
    indexes: [
            {
                unique: false,
                fields: ['login'], // Add index for status
                name: 'user_login_index'
            }
            ]
        });

module.exports = USER;