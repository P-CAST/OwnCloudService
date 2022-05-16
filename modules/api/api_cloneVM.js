const prop = require('../../properties')
const fetch = require('node-fetch')

async function cloneVM(cloneid, body) {
    const url = `https://${prop.PROXMOX_HOST}:8006/api2/json/nodes/${prop.PROXMOX_NODE}/qemu/${cloneid}/clone`
    response = await fetch(url,{
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length,
            [prop.PROXMOX_TOKEN_HEAD] : prop.PROXMOX_TOKEN_VALUE
        }
    })
    return response
}

module.exports = cloneVM