const express = require('express')
const app = express()

const port = 2000

app.use(express.static('frontend/dist'))

app.listen(port, () => console.log('server has been started'))