import express from "express";

const app = express()

app.use(express.json())

const routes = require('./router')
app.use('/router',routes)


app.listen(5000, () =>{
    console.log('server started')
})
app.use("/operation",routes);


