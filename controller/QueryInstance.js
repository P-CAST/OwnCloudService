const prop = require('../properties')
const statusInstance = require(prop.BASE_DIR + '/controller/StatusInstance')
const api_networkVM = require(prop.BASE_DIR + '/modules/api/api_networkVM')
const db_queryVMID = require(prop.BASE_DIR + '/modules/db/db_queryVMID')
const db_queryVMName = require(prop.BASE_DIR + '/modules/db/db_queryVMName')
const db_queryVMVariant = require(prop.BASE_DIR + '/modules/db/db_queryVMVariant')

async function QueryInstance(username) {
    let final = []
    let vmid = []
    let vmname = []
    let state = []
    let image = []
    let ip = []

    let vmid_results   = await db_queryVMID(username)
    let vmname_results = await db_queryVMName(username)
    let variant        = await db_queryVMVariant(username)

    let length = Object.keys(vmid_results[0]).length
    for (i = 0; i < length; i++) {
        current_vmid = vmid_results[0][i].vmid
        current_vmname = vmname_results[0][i].vmname
        current_image = variant[0][i].variant
        vmid.push(current_vmid)
        vmname.push(current_vmname)
        image.push(current_image)
        await statusInstance(current_vmid).then(results => {
            state.push(results)
        })

        let qip = await api_networkVM(current_vmid)

        let current_ip = null
        if (qip.status === 500) {
            current_ip = 'Not available'
            ip.push(current_ip)
        } else if (qip.status === 200) {
            qip = await qip.json()
            if (qip['data']['result'][1]['ip-addresses'][0]['ip-address'].includes(':')) {
                current_ip = qip['data']['result'][0]['ip-addresses'][0]['ip-address']
            } else {
                current_ip = qip['data']['result'][1]['ip-addresses'][0]['ip-address']
            }
            ip.push(current_ip)
        }
    }
    vmid.forEach((id, id_index) => {
        final.push({'vmid':id, 'vmname':vmname[id_index], 'status':state[id_index], 'variant': image[id_index], 'ip': ip[id_index]})
    })
    return final
}

module.exports = QueryInstance