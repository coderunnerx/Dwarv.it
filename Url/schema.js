const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    longUrl: String,
    urlCode: String,
    shortUrl: String,
    date: {
        type: String,
        default: new Date()
    }
})

const Url = mongoose.model("Url",urlSchema)
module.exports = Url 