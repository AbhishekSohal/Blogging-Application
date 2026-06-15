require('dotenv').config();


const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const commentRoutes = require('./routes/comment');
const connectDB = require('./connection');
const Blog = require('./models/blog');
const cookieParser = require('cookie-parser');

const { checkAuthentication } = require('./middlewares/authentication');

const app = express();
const port = process.env.PORT || 3000;

connectDB(process.env.MONGO_URL || 'mongodb://localhost:27017/blogit').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});


app.set('view engine', 'ejs')
app.set('views', path.resolve("./views"))
app.use(express.static(path.resolve('./public')))// this middleware is used to serve the static files that we will have in the public folder. It will make the static files available in the browser.
app.use(express.urlencoded({ extended: true }))// this middleware is used to parse the form data that we will receive from the client. It will make the form data available in req.body
app.use(cookieParser())// this middleware is used to parse the cookies that we will receive from the client. It will make the cookies available in req.cookies
app.use(checkAuthentication('token'))


app.get('/', async (req, res) => {
    const allblogs = await Blog.find().sort({ createdAt: -1 });

    res.render('home', {
        user: req.user, // req.user is set in the checkAuthentication middleware if the token is valid. It will contain the payload of the token which can be used to identify the user and show personalized content on the home page.
        blogs: allblogs
    });
});


app.use('/user', userRoutes)
app.use('/blog', blogRoutes)
app.use('/blog', commentRoutes)




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});