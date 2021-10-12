const mongoose = require('mongoose')
const genres = require('./routes/genres')
const express = require('express')
const app = express();




mongoose.connect('mongodb+srv://rama:rama@rk.ngyuh.mongodb.net/vidly?retryWrites=true&w=majority',
{useUnifiedTopology: true,
useNewUrlParser: true,
}).then( () => console.log( ' Connected to Db listing 3000')) 
.catch( err => console.log( 'not connected to Db', err))

app.use(express.json());
app.use('/api/genres',genres)

app.listen(3000)