const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors');

app.listen(3001, console.log("¡Servidor encendido!"))
app.use(express.json())
app.use(cors());


//RUTAS:

//Agregar contenido nuevo (POST):
app.post("/canciones", (req, res) => {
    const cancion = req.body
    const repertorio = JSON.parse(fs.readFileSync("repertorio.json"))
    repertorio.push(cancion)
    fs.writeFileSync("repertorio.json", JSON.stringify(repertorio))
    res.send("Canción agregada con éxito!")
})

//Consultar info (GET):
app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    res.json(canciones)
})

//Editar, actualizar info (PUT):
app.put("/canciones/:id", (req, res) => {
    const { id } = req.params
    const cancion = req.body
    const repertorio = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = repertorio.findIndex(r => r.id == id)
    repertorio[index] = cancion
    fs.writeFileSync("repertorio.json", JSON.stringify(repertorio))
    res.send("Canción modificada con éxito")
})

//Borrar un registro (DELETE):
app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const repertorio = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = repertorio.findIndex(r => r.id == id)
    repertorio.splice(index, 1)
    fs.writeFileSync("repertorio.json", JSON.stringify(repertorio))
    res.send("Canción eliminada con éxito")
})
