'use strict'
import express from 'express';
import Routes from './routes/router';

import bodyParser from 'body-parser';
import cors from 'cors'

const app = express()
const PORT = 8000;


app.get('/', async (req,res)=>{
    res.send(`
        express server is running, rotes: <br>
        /users
    `)
})
// app.use(bodyParser.urlencoded({ extended: false }));  
app.use(cors());
app.use(bodyParser.json())
app.use(Routes)

app.listen(PORT, ()=>{
    console.log(`server is running at localhost:://${PORT}`)
})