const prop = require('../properties')

async function data_variant(vmid, vmname, variant) {
    let clone_id = null

    if (variant == 'ubuntu-focal') {
        clone_id = 1000
    } else if (variant == 'ubuntu-bionic') {
        clone_id = 2000
    } else if (variant == 'debian-bullseye') {
        clone_id = 3000
    }

    const body = JSON.stringify({
        newid: vmid,
        node: prop.PROXMOX_NODE,
        vmid: clone_id,
        full: 1,
        name: vmname,
        storage:'local-lvm',
    })
    return [clone_id,body]
}

module.exports = data_variant