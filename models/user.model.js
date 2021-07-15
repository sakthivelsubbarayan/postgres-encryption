module.exports = function userModel(Sequelize, types) {
    const user = Sequelize.define('users', {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: types.STRING,
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
    return user;
};
