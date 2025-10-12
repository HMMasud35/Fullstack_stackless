require('dotenv').config()
const express = require("express")
const cors = require("cors")
const dbConnection = require('./src/config/dbconfig')
const router = require('./src/route')
const errorHandlingMiddelware = require('./src/utils/errorhandling')
const pathNotFound = require('./src/utils/pathnotfound')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

//database connection
dbConnection()

//router middelware
app.use(router)

//error middelware
app.use(pathNotFound)

//error handleing middelware
app.use(errorHandlingMiddelware)

app.listen(port, () => {
  console.log(`server is running port number ${process.env.PORT}`);
})