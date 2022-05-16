const prop = require('../../properties')
const dbConnection = require(prop.BASE_DIR + '/modules/MySQLConnect')

async function deleteVM(vmid) {
    let results = await dbConnection.execute('DELETE FROM instance WHERE vmid = ?', [vmid])
    return results
}

module.exports = deleteVM