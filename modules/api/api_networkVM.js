const prop = require('../../properties')
const fetch = require('node-fetch')

async function networkVM(vmid) {
    const url = `https://${prop.PROXMOX_HOST}:8006/api2/json/nodes/${prop.PROXMOX_NODE}/qemu/${vmid}/agent/network-get-interfaces`
    let response = await fetch(url,{
        method: 'GET',
        headers: {
            [prop.PROXMOX_TOKEN_HEAD] : prop.PROXMOX_TOKEN_VALUE
        }
    })
    return response
}

module.exports = networkVM