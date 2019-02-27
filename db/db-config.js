const mongoose = require('mongoose');;
const urlMongo = process.env.MONGODB_URI;

mongoose.connect(urlMongo,{ useNewUrlParser: true });

mongoose.connection.on('connected',()=>{
    console.log('Mongoose default connection connected to ' + urlMongo);
});
mongoose.connection.on('error',(error)=>{
    console.log('Mongoose default connection error: ' + error);
});
mongoose.connection.on('disconnected',()=>{
    console.log('Mongoose default connection disconnected');
});
mongoose.connection.on('open',()=>{
    console.log('Mongoose default connection is open');
});

process.on('SIGINT', ()=>{
    mongoose.connection.close(()=>{
        console.log('Mongoose default connection disconnected through app terminantion')
    });
});