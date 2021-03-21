'use strict'
import express from 'express';
import Routes from './routes/router';

import bodyParser from 'body-parser';
import cors from 'cors'

import listEndpoints from 'express-list-endpoints';
import Main from './welcome-screen/main';

const app = express()
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json())
app.use(Routes)

app.get('/', async (req,res)=>{
    res.send(new Main(app).html)
})

console.log(listEndpoints(app)) 


app.listen(PORT, ()=>{
    console.log(`server is running at localhost:://${PORT}`)
})