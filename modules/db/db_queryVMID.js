const prop = require('../../properties')
const dbConnection = require(prop.BASE_DIR + '/modules/MySQLConnect')

async function queryVMID(username) {
    let results = await dbConnection.execute('SELECT vmid FROM instance WHERE username = ?', [username])
    return results
}

module.exports = queryVMID