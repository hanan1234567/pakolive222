'use strict';
const port = 5001
const express = require('express')
const connection = require('./config/connection')
const cors = require('cors')
const {adminRoutes, websiteRoutes} = require('./api/routes')
const app = express()

var corsOptions = {
    origin: ['http://192.168.18.74:3000', 'http://localhost:3000', 'http://localhost:3001'],
    optionsSuccessStatus: 200
  }

app.use(express.json())
app.use(express.static('public'))
app.use(cors(corsOptions))

app.use('/api/portal', websiteRoutes)
app.use('/api/portal', adminRoutes)
app.listen(port, async () => {
    await connection()    
    console.log(`Example app listening at http://localhost:${port}`)
})