const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const router = require('./routes/routes')

const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use('/', router)


app.listen(port, () => {

    console.log("Servidor Iniciado com Sucesso :)")


})


