const {createPool} = require("mysql2/promise")


const db = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"register",
    connectionLimit:10
})

module.exports = db