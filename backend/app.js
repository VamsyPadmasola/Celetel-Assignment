const express = require('express');
const { errorHandler } = require('./middlewares/error');
require('express-async-errors')
const userRouter = require('./routes/user')
const customerRouter = require('./routes/customer')
const cors = require('cors');
const { handleNotFound } = require('./uitls/helper');
require("dotenv").config();
require('./db/index.js');

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/customer', customerRouter)

app.use("/*", handleNotFound)



app.use(errorHandler)


app.listen(8000, () => {
    console.log("Port is Listening on 8000")
})