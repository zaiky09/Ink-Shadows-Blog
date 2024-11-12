const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//express app

const app = express();

// Connect to Mongodb
const dbURI = 'mongodb+srv://zamilmozamil:aF6YghU2K0hVbw9a@cluster0.ymqgt.mongodb.net/node-tutorial?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI)
    .then((result) => console.log('Connected to DB'))
    .catch((err) => console.log(err));

//register view engine (ejs)
app.set('view engine', 'ejs');


// listen for requests
app.listen(3000);

// Creating middleware & static files

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

// routes

// get requests
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

// blog routes

app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
