const urlRoute = require("express").Router()
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require("config");
const Url = require("./schema")

//takes in a long url and return a short url
urlRoute.get("/short", async (req, res) => {
    const { longUrl } = req.body
    const baseUrl = config.get("baseUrl")

    if(!validUrl.isUri(baseUrl)){
       res.json("Invalid base url")
    }

    if(validUrl.isUri(longUrl)){
        try {

            let url = await Url.findOne({ longUrl })
            if (url){
                res.json(url)
            } else {

                const urlCode = shortid.generate()
                const shortUrl = baseUrl + "/" + urlCode
                const url = new Url({
                  longUrl,
                  urlCode,
                  shortUrl
                })

                await url.save() 
                         .then(() => {
                             res.json(url)
                         })
            }
            
        } catch (err) {
            console.log(err)
            res.json("Server error")
        }
    } else {
        res.json("Invalid long url")
    }
})

//redirects to the long url
urlRoute.get("/:urlCode", async (req, res) => {
    const urlCode = req.params.urlCode

    try {
        
        const url = await Url.findOne({ urlCode  })
        if (url) {
            res.redirect(url.longUrl)
        } else {
            res.json("url not found")
        }

    } catch (err) {
        console.log(err)
        res.json("Server error")
    }

})

module.exports = urlRoute




