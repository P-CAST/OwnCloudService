const prop = require('../../properties')
const fetch = require('node-fetch')

async function stateVM(vmid, state) {
    let response = null
    let body = null
    const url = `https://${prop.PROXMOX_HOST}:8006/api2/json/nodes/${prop.PROXMOX_NODE}/qemu/${vmid}/status/${state}`
    if (state == 'shutdown')  {
        body = JSON.stringify({
            forceStop: 1,
            timeout: 30
        })
    } else {
        body = JSON.stringify({
            timeout: 30
        })
    }
    let state_response = await fetch(url,{
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length,
            [prop.PROXMOX_TOKEN_HEAD] : prop.PROXMOX_TOKEN_VALUE
        }
    })
    response = await state_response.json()
    return response
}

module.exports = stateVM