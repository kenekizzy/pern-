const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()
const pool = require("./db")

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const PORT = process.env.PORT

//Sending data to the database
app.post("/todos", async(req, res) =>{
    try {
        const { description } =req.body;
        const newList = await pool.query("INSERT INTO todolist(description) VALUES($1)  RETURNING *", [description])
        res.json(newList)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

//Getting the data from the database
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todolist")
        res.json(allTodos.rows)
    } catch (error) {
        res.status(400).send({message: error.message})
        
    }
})

//Getting a specific data from the database
app.get("/todos/:id", async(req, res) => {
    try {
        const id = req.params.id
        const todoId = await pool.query("SELECT * FROM todolist WHERE todo_id = $1", [id])
        res.json(todoId.rows[0])
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

//Updating a specific data in the database 
app.put("/todos/:id", async(req, res) => {
    try {
        const id = req.params.id
        const description = req.body.description
        const updateTodo = await pool.query("UPDATE todolist SET description = $1 WHERE todo_id = $2", [description, id])

        res.json("Todo List was updated")
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

//Deleting a data from the database
app.delete("/todos/:id", async(req, res) => {
    try {
        const id = req.params.id
        const deleteTodo = await pool.query("DELETE FROM todolist WHERE todo_id = $1", [id])

        res.json("Data has been deleted")
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

app.listen(5000, () => {
    console.log(`Server is running on port 5000`)
})