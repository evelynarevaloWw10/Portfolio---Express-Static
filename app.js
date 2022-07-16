
//Import express dependencies and set up express.router

const express = require('express');
const app = express();
const dataJson = require('./data.json')
const data = dataJson.projects; 

// Middleware 
app.set('view engine','pug');
app.use('/static',express.static('public'));

//groutes to home page, displays data on index template

app.get('/', (req, res) => {
 res.render('index',{data})
});

//get access to /about page 
app.get('/about',(req, res)=>{
    res.render('about')
 });

//Dynamic project routes renders the pug project template
 app.get('/projects/:id',(req,res,next) =>{
    const projectId = +req.params.id;
    const project = data[projectId]

    if(project){
        res.render('project',{project});
    } else {
       next(); 
    }
 });

 
 // sets HTTP status to 404 and global error handler
app.use((req,res,next) => {
    const err = new Error('page not found');
    err.status = 404;
    next(err);
 });

app.use((err,req,res,next) => {
    
        console.log('Global error handler called',err)
     
    if(err.status === 404){
         res.status(404).render('error',{err});
   
    } else {
     err.message = err.message || "Oops! It looks like something went wrong with the server"
     res.status(err.status || 500).render('error',{err});
          }
    })

//port
app.listen(3000,() =>{
    console.log('The application is running on the localhost:3000!')

 });
