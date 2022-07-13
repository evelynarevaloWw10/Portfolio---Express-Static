
//Import express and set up express.router

const express = require('express');
const app = express();


const dataJson = require('./data.json')

// view engine
app.set('view engine', 'pug');

app.use(express.static('public') );

//get home page, displays data on index template

app.get('/', (req, res)=>{
 res.render('index',{dataJson})
});


//get access to about 
app.get('/about',(req, res)=>{
    res.render('about')
 });


 app.get('/projects/:id',(request,respond) =>{
    const projectId = req.params.id;
    const project = dataJson[projectId]

    if(project){
        res.render('project',{project});
    }else{
    next(); 
    }

});

 app.listen(3000,() =>{
    console.log('The application is running on the localhost:3000!')

 });






