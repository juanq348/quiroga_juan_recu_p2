const express = require("express")
const app = express()

app.use(express.json())

app.use(require("./routes/students.routes.js"))

app.listen(4321, console.log("El servidor esta funcionando en el puerto 4321"))