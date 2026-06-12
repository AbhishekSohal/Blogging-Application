const express = require('express');
const path= require('path');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const connectDB = require('./connection');
const cookieParser = require('cookie-parser');

const {checkAuthentication}=require('./middlewares/authentication');

const app = express();
const port = 3000;// in real life, this should be in an environment variable as it can change based on the environment (development, staging, production)

connectDB('mongodb://localhost:27017/blogit').then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.error('Error connecting to MongoDB', err);
});


app.set('view engine','ejs')
app.set('views',path.resolve("./views"))
app.use(express.static(path.resolve('./public')))
app.use(express.urlencoded({extended:true}))// this middleware is used to parse the form data that we will receive from the client. It will make the form data available in req.body
app.use(cookieParser())// this middleware is used to parse the cookies that we will receive from the client. It will make the cookies available in req.cookies
app.use(checkAuthentication('token'))


app.get('/', (req, res) => {
    res.render('home', {
        user: req.user // req.user is set in the checkAuthentication middleware if the token is valid. It will contain the payload of the token which can be used to identify the user and show personalized content on the home page.
    });
});


app.use('/user',userRoutes)
app.use('/blog',blogRoutes)




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});