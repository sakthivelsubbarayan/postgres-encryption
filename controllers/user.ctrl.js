const userModel = require("../models").users;
const Sequelize = require('sequelize');

const userKey = "Y!LLbyK&CBWfX9Z";
const serverKey = "qn4jkj8jFXvqNaNPD";
// Insert data into the User's table
module.exports.CreateUser = async function (req, res) {
    const userName = req.body.userName;
    const userData = req.body.data;
    userModel.create({
        name: userName,
        data:
            Sequelize.fn(
                'PGP_SYM_ENCRYPT',
                Sequelize.cast(Sequelize.fn(
                    'PGP_SYM_ENCRYPT',
                    userData,
                    userKey
                ), 'text'),
                serverKey
            ),
    }).then((userCreatedResponse) => {
        return res.status(201).send(userCreatedResponse);
    }).catch((err) => {
        return res.status(500).send(err);
    })
}

// decrypt the user  data
module.exports.decryptUser = async function (req, res) {
    const userName = req.params.userName;
    userModel.findOne({
        where: { name: userName },
        attributes: [
            'name',
            [
                Sequelize.fn(
                    'PGP_SYM_DECRYPT',
                    Sequelize.cast(Sequelize.fn(
                        'PGP_SYM_DECRYPT',
                        Sequelize.cast(Sequelize.col('data'), 'bytea'),
                        serverKey
                    ), 'bytea'),
                    userKey
                ),
                'data',
            ],
        ],
    }).then((decryptedUser) => {
        return res.status(201).send(decryptedUser);
    }).catch((err) => {
        return res.status(500).send(err);
    })
}
