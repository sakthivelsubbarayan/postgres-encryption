const userModel = require("../models").users;
const Sequelize = require('sequelize');
const dataChanges = require('../dataChanges')

// Insert data into the User's table
module.exports.CreateUser = async function (req, res) {
    userModel.create(req.body).then((userCreatedResponse) => {
        return res.status(201).send(userCreatedResponse);
    }).catch((err) => {
        return res.status(500).send(err);
    })
}

// decrypt the user  data
module.exports.decryptUser = async function (req, res) {
    const userName = req.params.userName;
    const findQuey = await dataChanges.getFindQuery({ name: userName }, ['name']);
    console.log("findQuey..........", findQuey);
    userModel.findAll({
        attributes: [
            'name',
            'data'
        ],
    }).then((decryptedUser) => {
        return res.status(201).send(decryptedUser);
    }).catch((err) => {
        return res.status(500).send(err);
    })
}
