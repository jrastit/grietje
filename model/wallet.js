const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');
const ethers = require('ethers');

const WALLET = sequelize.define('wallet', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
        unique: true,
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
}, {
    // Define any additional table options here
    tableName: 'wallet',
    timestamps: true,
    indexes: [
        {
            unique: false,
            fields: ['address'], // Add index for status
            name: 'wallet_address_index'
        }
    ]
});

getNewWallet = function (userId) {
    const wallet = ethers.Wallet.createRandom();
    return { key: wallet.privateKey, address: wallet.address, userId: userId };
}

WALLET.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.key;
    return values;
}

module.exports = WALLET;