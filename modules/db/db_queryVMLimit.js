const prop = require('../../properties')
const dbConnection = require(prop.BASE_DIR + '/modules/MySQLConnect')

async function queryVMLimit(username) {
    let results = await dbConnection.execute('SELECT vm_limit FROM user WHERE username = ?', [username])
    results = results[0][0].vm_limit
    return results
}

module.exports = queryVMLimit