const prop = require('../../properties')
const dbConnection = require(prop.BASE_DIR + '/modules/MySQLConnect')

async function queryNewVMID(variant) {
    let response = await dbConnection.execute('SELECT MAX(vmid) FROM instance WHERE variant=?', [variant])
    let data = response[0][0]['MAX(vmid)']
    let vmid = null

    if (!data) {
        if (variant == 'ubuntu-focal') {
            vmid = 1000+1
        } else if (variant == 'ubuntu-bionic') {
            vmid = 2000+1
        } else if (variant == 'debian-bullseye') {
            vmid = 3000+1
        }
    } else {
        vmid = data+1
    }
    return vmid
}
module.exports = queryNewVMID