const express=require('express');
const mongoose = require('mongoose');
const cors=require('cors')
require('dotenv').config();
const app=express();
app.use(cors({
    origin:"*"
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));


app.get('/',(req,res)=>{
    res.send('Hello World!');
});

const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

app.listen(3000,()=>{
    console.log('Server is running on port 3000'
    );
});