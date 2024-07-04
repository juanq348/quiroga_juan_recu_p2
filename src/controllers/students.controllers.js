const listaEstudiantes = []

const obtenerEstudiantes = (req, res) =>{
    res.json(listaEstudiantes)
}

const obtenerEstudianteID =  (req ,res) =>{
    const studentID = req.params.id
    const getStudent = listaEstudiantes.find((e) => e.id == +studentID)

    if (!getStudent){
        return res.status(404).json({message: "El alumno no fue encontrado"})
    }

    res.json(getStudent)
}

const agregarEstudiante =  (req,res) =>{
    const idUnico = new Date().getTime()
    const {fullName, age, curse} = req.body
    
    if (!fullName || !age || !curse || !fullName.trim() || isNaN(age) || !curse.trim()){
        return res.status(400).json({message:"No puede ingresar valores nulos"})
    }

    if (age < 6 || age >100){
        return res.status(400).json({message:"Ingrese una edad válida"})
    }

    if (listaEstudiantes.some((e) => e.fullName === fullName.trim())){
        return res.status(400).json({message: "Ese estudiante ya se encuentra en la lista"})
    }

    listaEstudiantes.push(
        {
            id: idUnico,
            fullName: fullName.trim(),
            age: +age,
            curse: curse.trim()
        }
    )

    res.status(201).json({message:"Estudiante agregado con éxito"})
}

const actualizarEstudiante =  (req,res) =>{
    const studentID = req.params.id
    const {fullName, age, curse} = req.body
    const findStudent = listaEstudiantes.findIndex((e) => e.id === +studentID)

    if (findStudent === -1){
        return res.status(404).json({message: "El alumno no fue encontrado"})
    }

    if (!fullName || !age || !curse || !fullName.trim() || isNaN(age) || !curse.trim()){
        return res.status(400).json({message:"No puede ingresar valores nulos"})
    }

    if (age < 5 || age >100){
        return res.status(400).json({message:"Ingrese una edad válida"})
    }

    listaEstudiantes[findStudent].fullName = fullName.trim()
    listaEstudiantes[findStudent].age = +age
    listaEstudiantes[findStudent].curse = curse.trim()

    res.status(200).json({message:"Estudiante editado con éxito", "Estudiante editado": listaEstudiantes[findStudent]})
}

const eliminarEstudiante = (req, res) =>{
    const studentID = req.params.id
    const studentIndex = listaEstudiantes.findIndex((e) => e.id === +studentID)

    if(studentIndex === -1){
        return res.status(404).json({message:"El alumno no fue encontrado"})
    }

    const studentDelete = listaEstudiantes.splice(studentIndex, 1)

    res.status(200).json({message:"Estudiante eliminado con éxito", "Estudiante eliminado": studentDelete[0]})
}

module.exports = {
    obtenerEstudiantes,
    obtenerEstudianteID,
    agregarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}