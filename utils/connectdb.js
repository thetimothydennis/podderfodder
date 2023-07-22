import mongoose from 'mongoose';
const url = process.env.MONGO_URI;
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
connect.then(db => {
    console.log("connected to mongoDB")
})
.catch(err => {
    console.log(err)
});