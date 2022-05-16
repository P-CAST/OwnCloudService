const prop = require('../properties')
const CloneInstance = require(prop.BASE_DIR + '/controller/CloneInstance')
const queryNewVMID = require(prop.BASE_DIR + '/modules/db/db_queryNewVMID')
const queryVMLimit = require(prop.BASE_DIR + '/modules/db/db_queryVMLimit')
const queryVMQuantity = require(prop.BASE_DIR + '/modules/db/db_queryVMQuantity')
const recordNewVM = require(prop.BASE_DIR + '/modules/db/db_recordNewVM')

async function CreateInstance(username, variant, vmname) {
    let final = null
    let quantity = await queryVMQuantity(username)
    let limit_length = await queryVMLimit(username)
    if (quantity >= limit_length && limit_length !== 0) {
        return final='VM limit reached'
    }

    let vmid = await queryNewVMID(variant)
    let cloneInstance = await CloneInstance(vmid, vmname, variant)
    if (cloneInstance.status !== 200) {
        final = 'Failed to create instance'
    } else {
        let record = await recordNewVM(username, vmid, vmname, variant, prop.datetime)
        final = 'Instance created'
    }
    return final
}

module.exports = CreateInstance