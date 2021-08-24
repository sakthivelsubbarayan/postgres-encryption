
const userKey = "Y!LLbyK&CBWfX9Z";
const serverKey = "qn4jkj8jFXvqNaNPD";
const Sequelize = require('sequelize');

module.exports.encryptColumns = async (payload = {}, columnNames = []) => {
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


module.exports.decryptColumns = async (findPayload, columnNames) => {

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
  try {
    var decryptedFindPayload = findPayload;
    const requestAttributes = decryptedFindPayload.attributes;
    if (requestAttributes) {
      columnNames.map((column) => {
        var columnIndex = requestAttributes.indexOf(column);
        if (columnIndex !== -1) {
          requestAttributes[columnIndex] = [
            Sequelize.fn(
              'PGP_SYM_DECRYPT',
              Sequelize.cast(Sequelize.fn(
                'PGP_SYM_DECRYPT',
                Sequelize.cast(Sequelize.col(column), 'bytea'),
                serverKey
              ), 'bytea'),
              userKey
            ),
            column,
          ]
        }
        decryptedFindPayload.attributes = requestAttributes;
      });
    }
    return decryptedFindPayload;
  } catch (error) {
    console.log("error.......", error);
    throw error;
  }
}

module.exports.getFindQuery = async (findQuey = {}, columns = []) => {
  console.log("columns.........", columns);
  const encryptedFindQuery = findQuey;
  columns.map((column) => {
    encryptedFindQuery[column] = Sequelize.fn(
      'PGP_SYM_ENCRYPT',
      Sequelize.cast(Sequelize.fn(
        'PGP_SYM_ENCRYPT',
        findQuey[column],
        userKey
      ), 'text'),
      serverKey
    )
  });
  console.log("encryptedFindQuery...........", encryptedFindQuery);
  return encryptedFindQuery;
}
