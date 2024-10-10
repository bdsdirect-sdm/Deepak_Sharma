import express from "express"

const app = express()

app.get("/",(req, res) =>{
    res.send(`<h1>this is me deapak</h1>`)
})

app.listen(4400, ()=>{
    console.log("Server is running on port 4400")
})