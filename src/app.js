const express = require("express")
const app = express()

const listaEstudiantes = []

app.get("/students", (req, res) =>{
    res.json(listaEstudiantes)
})

app.get("/students/:id", (req ,res) =>{
    const studentID = req.params.id
    const getStudent = listaEstudiantes.find((e) => e.id == +studentID)

    if (!getStudent){
        return res.status(404).json({message: "El alumno no fue encontrado"})
    }

    res.json(getStudent)
})

app.post("/students", (req,res) =>{
    const idUnico = new Date().getTime()
    const {fullName, age, curse} = req.body
    
    if (!fullName || !age || !curse || !fullName.trim() || isNaN(age) || !curse.trim()){
        return res.status(400).json({message:"No puede ingresar valores nulos"})
    }

    listaEstudiantes.push(
        {
            id: idUnico,
            fullName: fullName.trim(),
            age: +age,
            curse: curse.trim()
        }
    )

    res.json({message:"Estudiante agregado con éxito"})
})

app.put("/students/:id", (req,res) =>{
    const studentID = req.params.id
    const {fullName, age, curse} = req.body
    const findStudent = listaEstudiantes.findIndex((e) => e.id === +studentID)

    if (findStudent === -1){
        return res.status(404).json({message: "El alumno no fue encontrado"})
    }

    if (!fullName || !age || !curse || !fullName.trim() || isNaN(age) || !curse.trim()){
        return res.status(400).json({message:"No puede ingresar valores nulos"})
    }

    listaEstudiantes[findStudent].fullName = fullName.trim()
    listaEstudiantes[findStudent].age = +age
    listaEstudiantes[findStudent].curse = curse.trim()

    res.json({message:"Estudiante editado con éxito", "Estudiante editado":  listaEstudiantes[findStudent]})
})


app.listen(4321, console.log("El servidor esta funcionando en el puerto 4321"))