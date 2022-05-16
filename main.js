// Import required modules
const bodyParser = require('body-parser')
const express = require('express')
const expressLayouts = require('express-layouts')
const cookieSession = require('cookie-session')

// Custom modules
const prop = require('./properties')
const login = require(prop.BASE_DIR + '/controller/Login')
const Register = require(prop.BASE_DIR + '/controller/Register')
const QueryInstance = require(prop.BASE_DIR + '/controller/QueryInstance')
const StateInstance = require(prop.BASE_DIR + '/controller/StateInstance')
const CreateInstance = require(prop.BASE_DIR + '/controller/CreateInstance')
const DeleteInstance = require(prop.BASE_DIR + '/controller/DeleteInstance')

// Set properties
const app = express()
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(expressLayouts)
app.use(cookieSession({
    secret: prop.cookie,
    resave: true,
    saveUninitialized: true,
    maxAge: 3600 * 1000
}))
app.set('layout', prop.BASE_DIR + '/views/layouts/template')
app.set('view engine', 'ejs')

// GET handler
// First page, but act as login page
app.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.redirect('/home')
    } else {
        res.render('Login', {
            title: 'Login'
        })
    }
})

// Login routing
app.get('/login', (req, res) => {
    res.redirect('/')
})

// Logout
app.get('/logout', (req, res) => {
    if (req.session.loggedin) {
        req.session.loggedin = false
        res.redirect('/')
    } else {
        res.redirect('/home')
    }
})

// Register page, FOR admin ONLY
app.get('/register', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username
        if (username=='admin') {
            res.render('register', {
                title: 'Register'
            })
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
})

// Home page
app.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.render('index', {
            title: 'Home',
        })
    } else {
        res.redirect('/')
    }
})

// Instance management
app.get('/instance', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username
        QueryInstance(username).then(final => {
            res.render('instance', {
                title: 'Instance',
                instance: final
            })
        })
    } else {
        res.redirect('/')
    }
})

app.get('/startinstance/:vmid', (req, res) => {
    if (req.session.loggedin) {
        let vmid = req.params.vmid
        let username = req.session.username
        StateInstance(vmid, username, 'start').then(results => {
            if (results['data']) {
                res.send(`VM ${vmid} starting up`+' <a href="/instance">next</a>')
            } else {
                res.send(results+' <a href="/instance">next</a>')
            }
        })
    } else {
        res.redirect('/')
    }
})

app.get('/shutdowninstance/:vmid', (req, res) => {
    if (req.session.loggedin) {
        let vmid = req.params.vmid
        let username = req.session.username
        StateInstance(vmid, username, 'shutdown').then(results => {
            if (results['data']) {
                res.send(`VM ${vmid} shutting down`+' <a href="/instance">next</a>')
            } else {
                res.send(results+' <a href="/instance">next</a>')
            }
        })
    } else {
        res.redirect('/') 
    }
})

// POST handler
// Login
app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    if (username && password) {
        login(username, password).then(results => {
            req.session.loggedin = results['session_state']
            if (results['username']) {
                req.session.username = results['username']
                res.redirect('/home')
            } else {
                res.send('Incorrect Username or Password'+' <a href="/login">login again</a>')
            }
            res.end()
        })
    } else {
        res.send('Please enter username and password'+' <a href="/login">login again</a>')
        res.end()
    }
})

// Register
app.post('/register', (req, res) => {
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let role = req.body.role
    let vm_limit = req.body.vm_limit
    if (firstname && lastname && username && email && password && role && vm_limit) {
        Register(firstname, lastname, username, email, password, role, prop.datetime, vm_limit).then(results => {
            res.send(results+' <a href="/instance">next</a>')
        })
    } else {
        res.send('Please enter all required information'+' <a href="/register">register again</a>')
    }
})

// Create Instance
app.post('/createinstance', (req, res) => {
    if (req.session.loggedin) {
        let variant = req.body.variant
        let vmname = req.body.create_vmname
        if (variant && vmname) {
            CreateInstance(req.session.username, variant, vmname).then(results => {
                res.send(results+' <a href="/instance">next</a>')
            })
        } else {
            res.send('Please select instance variant and VM name'+' <a href="/instance">Try again</a>')
        }
    } else {
        res.redirect('/')
    }
})

// Delete Instance
app.post('/deleteinstance', (req, res) => {
    if (req.session.loggedin) {
        if (req.body['del_vmid']) {
            let vmid = req.body['del_vmid']
            let username = req.session.username
            DeleteInstance(vmid, username).then(results => {
                res.send(results+' <a href="/instance">next</a>')
            })
        } else {
            res.send('Please enter VM id'+' <a href="/instance">try again</a>')
        }
    } else {
        res.redirect('/')
    }
})

// Listen on port
app.listen(prop.port, () => {
    console.log(`Server running on port ${prop.port}`)
})