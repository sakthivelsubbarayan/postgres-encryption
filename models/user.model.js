const dataChanges = require('../dataChanges');

module.exports = function userModel(Sequelize, types) {
    const user = Sequelize.define('users', {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: types.TEXT,
        },
        data: {
            type: types.TEXT,
        },
        createdAt: {
            type: types.DATE,
            defaultValue: new Date(),
            allowNull: false
        },
        updatedAt: {
            type: types.DATE,
            defaultValue: new Date(),
            allowNull: false
        },
    }, {
        tableName: 'users',
    });

    user.beforeCreate(async (user, options) => {
        user = await dataChanges.encryptColumns(user, ['data', 'name']);
    });

    user.beforeFind(async (user, options) => {
        user = await dataChanges.decryptColumns(user, ['data', 'name']);
    });

    return user;
};
