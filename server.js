const express = require("express"); 
const mongoose = require("mongoose"); 
const logger = require("morgan"); 
var db = mongoose.connection; 

const PORT = process.env.PORT || 3000; 

const app = express(); 

app.use(logger("dev")); 
app.use(express.urlencoded({extended:true})); 
app.use(express.json()); 
app.use(express.static("public")); 

//useFindAndModify is automatically true, so set to false so I can use findOneAndUpdate and findOneAndRemove
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
    useNewUrlParser: true, 
    useFindAndModify: false,
    useUnifiedTopology: true
    
}); 

//provide error message if there is an error with the database

db.on('error', console.error.bind(console, 'connection error:'));


//require my api routes

app.use(require("./routes/api.js")); 

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`)
}); 