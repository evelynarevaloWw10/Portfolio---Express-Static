
//Import express and set up express.router

const express = require('express');
const app = express();


const dataJson = require('./data.json')

// view engine
app.set('view engine', 'pug');

app.use('/static',express.static('public'));

//get home page, displays data on index template

app.get('/', (req, res)=>{
 res.render('index',{dataJson})
});


//get access to /about page 
app.get('/about',(req, res)=>{
    res.render('about')
 });


 app.get('/projects/:id',(req,respond) =>{
    const projectId = req.params.id;
    const project = dataJson[projectId]

    if(project){
        res.render('project',{project});
    }else{
    next(); 
    }

});

 

 // sets HTTP status to 404

 app.use((req,res,next) => {
    const err = new Error('Sorry page does not exist');
    err.status = 404;
    next(err);
 });



app.use((err,req,res,next) => {
    res.locals.error = err
    res.render('error',err);
    if(err){
        console.log('Global error handler called',err)
    }
   if(err.status === 404){
    // res.status(404).render(err,{error:err});
   }else{
    err.message = err.message || "Oops! It looks like something went wrong with the server"
   res.status(err.status || 500).render('error',{err});

   }
   
})


app.listen(3000,() =>{
    console.log('The application is running on the localhost:3000!')

 });
