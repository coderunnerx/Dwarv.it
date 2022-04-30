const mongoose = require("mongoose")
const config = require("config")

const port = config.get("port")
const dbURI = config.get("mongoURI")

const connectToDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        console.log("MongoDB connected...")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectToDB