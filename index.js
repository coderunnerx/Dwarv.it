const express = require("express")
const app = express()
const connectToDB = require("./config/db")


connectToDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/", require("./Url/routes"))


const port = 3000
app.listen(port, () => {
    console.log("app is up and running")
})


            





             


