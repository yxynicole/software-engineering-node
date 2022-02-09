var express = require('express');
var UserController = require('./controllers/UserController');
var TuitController = require('./controllers/TuitController');
var app = express();
// app.get('/hello', (req, res) => {
//     res.send('Hello World!123');
// });
var userController = new UserController(app);
var tuitController = new TuitController(app);
var PORT = 4000;
app.listen(PORT);
