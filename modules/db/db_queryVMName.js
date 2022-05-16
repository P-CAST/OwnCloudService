const prop = require('../../properties')
const dbConnection = require(prop.BASE_DIR + '/modules/MySQLConnect')

async function queryVMName(username) {
    let results = await dbConnection.execute('SELECT vmname FROM instance WHERE username = ?', [username])
    return results
}

module.exports = queryVMName