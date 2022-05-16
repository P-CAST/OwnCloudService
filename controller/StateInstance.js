const prop = require('../properties')
const statusInstance = require(prop.BASE_DIR + '/controller/StatusInstance')
const api_stateVM = require(prop.BASE_DIR + '/modules/api/api_stateVM')
const db_checkVMID = require(prop.BASE_DIR + '/modules/db/db_checkVMID')

async function stateInstance(vmid, username, state) {
    let final = null
    let check_results = await db_checkVMID(vmid, username)
    if (check_results[0][0]) {
        let check_status = await statusInstance(vmid)
        if (state == 'start' && check_status == 'running' || state == 'shutdown' && check_status == 'stopped') {
            final = `VM already ${state}`
        } else if (check_status == 'creating...') {
            final = 'Creating VM, Please be patient'
        } else {
            final = await api_stateVM(vmid, state)
        }
    } else {
        final = 'Invalid VM id'
    }
    return final
}

module.exports = stateInstance