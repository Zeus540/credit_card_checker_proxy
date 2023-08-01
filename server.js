const express = require("express");
const app = express();
require('dotenv').config()
const axios = require("axios")
const cors = require("cors")


app.use(cors({
    origin:'*'
}))
app.use(express.json());

app.post('/',async(req,res)=>{

    card_number = req.body.card_number

    let bin = String(card_number).slice(0, 6);

    try {
        const response = await axios.get(
            `${process.env.BASE_URL}/${bin}?api_key=${process.env.API_KEY}`
        );

            response.data.data.card.card_number = card_number

            let obj = {
                bank: response.data.data.bank,
                card:response.data.data.card,
                country:response.data.data.country
            }
            res.json(obj)

    } catch (error) {
        res.send(error)
    }

  
})

app.listen(4005, () => { console.log('App listening on port 4005') })