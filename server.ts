const express = require('express');
const mongoose = require('mongoose');
import UserController from './controllers/UserController'
import TuitController from "./controllers/TuitController";
import bodyParser from 'body-parser';
import type {ErrorRequestHandler} from "express";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req: any, res: { send: (arg0: string) => any; }) => res.send('Welcome!'))

new UserController(app);
new TuitController(app);

//mongoose.connect('mongodb://0.0.0.0:27017/tuiter')
mongoose.connect('mongodb+srv://admin:'+process.env.MONGO_PW+'@cluster0.bihkn.mongodb.net/tuiter?retryWrites=true&w=majority')
mongoose.connection.on('connected', () => console.log("connected"))

app.listen(process.env.PORT || 4000, () => {
    console.log("listen to port", 4000)
});
