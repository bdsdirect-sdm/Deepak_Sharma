import express from "express"

const app = express()



app.listen(4400, ()=>{
    console.log("Server is running on port 4400")
})

export default app;