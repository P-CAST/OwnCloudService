const prop = require('../../properties')
const dbConnection = require(prop.BASE_DIR + '/modules/MySQLConnect')

async function recordNewVM(username, vmid, vmname, variant, createdate) {
    let results = await dbConnection.execute('INSERT INTO instance (username, vmid, vmname, variant, create_date) VALUES (?,?,?,?,?)', [username, vmid, vmname, variant, createdate])
    return results
}
module.exports = recordNewVM