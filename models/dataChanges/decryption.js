const userKey = "Y!LLbyK&CBWfX9Z";
const serverKey = "qn4jkj8jFXvqNaNPD";
const Sequelize = require('sequelize');
const decryptColumns = async (findPayload, columnNames) => {
  try {
    console.log("payload before find..........", findPayload, columnNames, "\n\n\n\n");
    var decryptedFindPayload = findPayload;
    // columnNames.map((column) => {
    //   decryptedPayload[column] =
    //     (Sequelize.fn(
    //       'PGP_SYM_DECRYPT',
    //       Sequelize.cast(Sequelize.fn(
    //         'PGP_SYM_DECRYPT',
    //         Sequelize.cast(Sequelize.col('data'), 'bytea'),
    //         serverKey
    //       ), 'bytea'),
    //       userKey
    //     ),
    //       payload.data)
    // });

    return findPayload;
  } catch (error) {
    console.log("error.......", error);
  }

}

module.exports = { decryptColumns }

//Sample decryption 
/*
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
*/