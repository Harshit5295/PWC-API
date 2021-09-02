const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/pwc-api', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
 }, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
 })