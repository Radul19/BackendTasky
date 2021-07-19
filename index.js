// const express = require('express')
// const app = express()
// const fs = require('fs')

// app.use(routes)
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json({ limit: '15MB' }))

// app.post('/task/image', (req, res) => {
// 	fs.writeFile('./src/images/xd.png', req.body.imgsource, 'base64', (err) => {
// 		if (err) throw err
// 	})
// 	res.status(200)
// })
// app.listen(3000)

const express = require('express');
const app = express()
const routes = require('./src/routes')
// var cors = require('cors')

// app.use(express.json())
app.use(express.json({ limit: '15MB' }))
app.use(express.urlencoded({ extended: true }));
// app.use(cors())
app.use(routes)


const PORT = process.env.PORT || 4000;

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Example app listening on port 4000!`))