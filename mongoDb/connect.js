const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hezi:hezi1982@cluster0.d6m8p.gcp.mongodb.net/Toys2?retryWrites=true&w=majority',
 {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("connected1223332");
});