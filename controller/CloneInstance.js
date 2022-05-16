const prop = require('../properties')
const data_variant = require(prop.BASE_DIR + '/data/data_variant')
const api_cloneVM = require(prop.BASE_DIR + '/modules/api/api_cloneVM.js')

async function cloneInstance(vmid, vmname, variant) {
    let [cloneid,body] = await data_variant(vmid, vmname, variant)
    let response = await api_cloneVM(cloneid, body)
    return response
}

module.exports = cloneInstance