'use strict'
import express, { Router } from 'express';
import ApiRoutes from './routes/router';

import bodyParser from 'body-parser';
import cors from 'cors'

import Main from './welcome-screen/main';

const app = express()
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json())

const Route = Router();
Route.use('/api/', ApiRoutes)

app.use(Route)

app.get('/', async (req,res)=>{
    res.send(new Main(app).html)
})

// console.log(listEndpoints(app)) 


app.listen(PORT, ()=>{
    console.log(`server is running at localhost:${PORT}`)
})