const prop = require('../../properties')
const dbConnection = require(prop.BASE_DIR + '/modules/MySQLConnect')

async function checkVMID(vmid, username) {
    let check_results = await dbConnection.execute('SELECT vmid FROM instance WHERE vmid = ? and username = ?', [vmid, username])
    return check_results
}

module.exports = checkVMID