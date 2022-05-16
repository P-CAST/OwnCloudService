const prop = require('../../properties')
const dbConnection = require(prop.BASE_DIR + '/modules/MySQLConnect')

async function queryVMQuantity(username) {
    let results = await dbConnection.execute('SELECT vmid FROM instance WHERE username = ?', [username])
    results = Object.keys(results[0]).length
    return results
}

module.exports = queryVMQuantity