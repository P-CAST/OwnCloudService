const prop = require('../properties')
const dbConnection = require(prop.BASE_DIR + '/modules/MySQLConnect')
const bcrypt = require('bcrypt')

async function login(username, password) {
    let results = await dbConnection.execute('SELECT password FROM user WHERE username = ?', [username])
    if (results[0].length > 0 && await bcrypt.compare(password, results[0][0]['password'])) {
        return {'session_state': true, 'username': username}
    } else {
        return {'session_state': false}
    }
}

module.exports = login