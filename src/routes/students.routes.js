const {Router} = require("express")
const router = Router()

const { obtenerEstudiantes, obtenerEstudianteID, agregarEstudiante, actualizarEstudiante, eliminarEstudiante} = require("../controllers/students.controllers.js")

router.get("/students", obtenerEstudiantes)

router.get("/students/:id", obtenerEstudianteID)

router.post("/students", agregarEstudiante)

router.put("/students/:id", actualizarEstudiante)

router.delete("/students/:id", eliminarEstudiante) 

module.exports = router