const prop = require('../properties')
const dbConnection = require(prop.BASE_DIR + '/modules/MySQLConnect')
const bcrypt = require('bcrypt')

async function Register(firstname, lastname, username, email, password, role, register_date, vm_limit) {
    let final = null
    let results = await dbConnection.execute('SELECT * FROM user WHERE username = ? or email = ?', [username, email])
    if (results[0].length > 0) {
        final = 'username or email already in use'
    } else {
        let hashed = await bcrypt.hash(password, 10)
        if (hashed) {
            let results = await dbConnection.execute('INSERT INTO user (first_name, last_name, username, email, password, role, register_date, vm_limit) VALUES (?,?,?,?,?,?,?,?)', [firstname, lastname, username, email, hashed, role, register_date, vm_limit])
            final = 'user created'
        } else {
            final = 'Fail to create user'
        }
    }
    return final
}

module.exports = Register