var express=require('express');
var cors =require('cors');
var bodyParser=require('body-parser');
var app=express();
const mongoose=require('mongoose');
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended:false
    })
)
const mongoURI='mongodb://localhost:27017/mernloginregistration'
mongoose.connect(
    mongoURI,
    {
        useNewUrlParser:true
    }
).then(()=>console.log('MongoDb Connected')).catch(err=>console.log(err))

if (process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
}

var routes = require('./routes/routes')
app.use('/routes',routes)

app.listen(port,function(){
    console.log('server is running a port:'+port)
})