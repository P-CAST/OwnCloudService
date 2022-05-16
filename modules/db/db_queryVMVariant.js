const prop = require('../../properties')
const dbConnection = require(prop.BASE_DIR + '/modules/MySQLConnect')

async function queryVMVariant(username) {
    let results = await dbConnection.execute('SELECT variant FROM instance WHERE username = ?', [username])
    return results
}

module.exports = queryVMVariant