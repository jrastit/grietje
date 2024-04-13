const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const CONTRACT = sequelize.define('CONTRACT', {
    // Define the properties of the CONTRACT model
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Add more properties here as needed
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false
    },
    community: {
        type: DataTypes.STRING,
        allowNull: false
    },
    communitySymbol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isOpen: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    h3Price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    // Define any additional options for the CONTRACT model
    tableName: 'contracts',
    timestamps: true
});

module.exports = CONTRACT;