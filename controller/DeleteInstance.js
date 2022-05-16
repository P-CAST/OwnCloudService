const prop = require('../properties')
const statusInstance = require(prop.BASE_DIR + '/controller/StatusInstance')
const api_deleteVM = require(prop.BASE_DIR + '/modules/api/api_deleteVM')
const db_deleteVM = require(prop.BASE_DIR + '/modules/db/db_deleteVM')
const db_checkVMID = require(prop.BASE_DIR + '/modules/db/db_checkVMID')

async function deleteInstance(vmid, username) {
    let final = null

    let state = await statusInstance(vmid)
    if (state != 'stopped') return final = 'Please stop the instance first'

    let check_results = await db_checkVMID(vmid, username)
    if (check_results[0][0]) {
        let response = await api_deleteVM(vmid)
        if (response.status === 200 || response.status === 500) {
            let results = await db_deleteVM(vmid)
            if (results) {
                final = 'Instance Deleted'
            } else {
                final = 'Error deleting VM'
            }
        } else {
            final = 'Error deleting VM'
        }
    } else {
        final = 'Invalid VM id'
    }
    return final
}

module.exports = deleteInstance