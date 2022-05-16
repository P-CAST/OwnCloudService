const prop = require('../properties')
const api_statusVM = require(prop.BASE_DIR + '/modules/api/api_statusVM')

async function statusInstance(vmid) {
    let final = null

    let response = await api_statusVM(vmid)
    if (response.status === 500) {
        final = "stopped"
    } else if (response.status === 200) {
        response = await response.json()
        if (response['data']['lock'] == 'clone') {
            final = 'creating...'
        } else {
            final = response['data']['status']
        }
    } else {
        final = "unknown"
    }
    return final
}

module.exports = statusInstance