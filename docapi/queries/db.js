const Pool = require('pg').Pool

const pool = new Pool({
    user: 'basar',
    password: '1234',
    database: 'testuser',
    host: 'localhost',
    port: 5432
})

const getAllUsers = (_req, _res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, result) => {
        if(error) {
            console.log("Get All Users Error!", error)
            _res.status(400)
            return
        }

        console.log("Get All Users: ", result.rows)
        _res.status(200).json(result.rows)
    })
}

const getUserById = (_req, _res) => {
    const userid = parseInt(_req.params.id)

    pool.query('SELECT * FROM USERS where id = $1', [userid], (error, result) => {
        if(error) {
            console.log("Get User By ID Error!", error)
            _res.status(400)
            return
        }

        console.log("Get User By Id: ", result.rows)
        _res.status(200).json(result.rows)
    })
}

const addUser = (_req, _res) => {
    const { username, photourl } = _req.body

    pool.query('INSERT INTO users (username, photourl) VALUES ($1, $2)', [username, photourl], (error, result) => {
        if(error) {
            console.log("Add User Error!", error)
            _res.status(400)
            return
        }

        console.log("Add User Successful: ", result)
        _res.status(201).send(`User added`)
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser
}