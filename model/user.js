const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');
const bcrypt = require('bcrypt');

const USER = sequelize.define('user', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
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

USER.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

USER.prototype.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

USER.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

module.exports = USER;