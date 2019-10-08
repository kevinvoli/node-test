const express = require('express');
const bodyParser= require('body-parser');
const axios= require('axios')
const app= express();
let port = 3000;
const multer= require('multer');
const upload=multer();

app.use('/public', express.static('public'))
// app.use(bodyParser.urlencoded({extended:false}))

// MES VARIABLE GLOBALE A AFFICHER SUR MA PAGE
const recherch=""
const franchMovies=[]
var urlencodedParser= bodyParser.urlencoded({extended:false})

// FIN

app.set('views', './views');
app.set('view engine', 'ejs')
app.get('/',(req, res)=>{
    // res.send('hello World!')
    res.render('index',{list:franchMovies})
});
app.get('/movies',(req,res)=>{
res.render('movies',{list:franchMovies})
})






app.get('/movie-search',(req,res)=>{
    res.render('movie-search',{list:franchMovies})
})

app.get('/movies/ajouter',(req,res)=>{
    res.render("ajoute-film",{list:franchMovies})
})
app.post('/movie-search',upload.fields(),(req,res)=>{
  
    if (!req.body) {
        return res.sendStatus(500);
    } else {
       
        console.log('formData: ', req.body)
        const query = `https://api.themoviedb.org/3/search/movie?api_key=78fa138c28564476c02852b756652391&query=${req.body}`
        axios.get(query).then((response)=>{
            console.log("sdzdeff",response);
        })
    }
    

})

app.post('/movies/ajouter',upload.fields([]),(req,res)=>{
    if (!req.body) {
        return res.sendStatus(500);
    } else {
       
        console.log('formData: ', req.body)
        franchMovies.push(req.body)
        res.sendStatus(201);
        console.log(franchMovies)
    }
})



app.get("/movies/add",(req, res)=>{

})
app.get('/movie/:id',(req, res)=>{
    const id = req.params.id
    res.render('movie-details',{film:id})
})

app.listen(port,()=>{
    console.log(`le seveur ecouter sur le port : ${port}`)
})

