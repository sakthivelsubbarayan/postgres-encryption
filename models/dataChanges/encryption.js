const userKey = "Y!LLbyK&CBWfX9Z";
const serverKey = "qn4jkj8jFXvqNaNPD";
const Sequelize = require('sequelize');

const encryptColumns = async (payload = {}, columnNames = []) => {
  try {
    var encryptedPayload = payload;
    columnNames.map((column) => {
      encryptedPayload[column] = Sequelize.fn(
        'PGP_SYM_ENCRYPT',
        Sequelize.cast(Sequelize.fn(
          'PGP_SYM_ENCRYPT',
          payload[column],
          userKey
        ), 'text'),
        serverKey
      )
    });
    return encryptedPayload;
  } catch (error) {
    console.log("error........", error);
    throw error;
  }
}

module.exports = { encryptColumns }

//Sample Encryption
/*
Sequelize.fn(
                'PGP_SYM_ENCRYPT',
                Sequelize.cast(Sequelize.fn(
                    'PGP_SYM_ENCRYPT',
                    userData,
                    userKey
                ), 'text'),
                serverKey
            ),
*/