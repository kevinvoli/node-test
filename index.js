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
const recherch="naruto"
const franchMovies=[]
let filmss
// var urlencodedParser= bodyParser.urlencoded({extended:false})
app.use(bodyParser.urlencoded({ extended: false }))
let keys= "78fa138c28564476c02852b756652391"

// FIN

app.set('views', './views');
app.set('view engine', 'ejs')
app.get('/',async(req, res)=>{
    const query = ` https://api.themoviedb.org/3/search/movie?api_key=${keys}&query=${recherch}`
   filmss=await axios.get(query).then((response)=>{
      return  response.data.results
        
    })
    console.log(filmss)
    res.render('index',{ resultar: filmss})
});
app.get('/movies',(req,res)=>{
res.render('movies',{list:franchMovies})
})
app.get('/movie-search',(req,res)=>{
    res.render('movie-search',{resultar:franchMovies})
})
app.post('/movie-search',(req,res)=>{
    let search= req.body
    const query = ` https://api.themoviedb.org/3/search/movie?api_key=78fa138c28564476c02852b756652391&query=${search.term}`
    axios.get(query).then((response)=>{
    res.render('movie-search',{ resultar: response.data.results})
    })
})

app.get('/movies/ajouter',(req,res)=>{
    res.render("ajoute-film",{list:franchMovies})
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
app.get('/movie/:film',(req, res)=>{
    const film = req.params.film
    console.log("zegvrhytnrvdvgrbhtnn",filmss[parseInt(film)])
    res.render('movie-details',{movie:filmss[film]})
})

app.listen(port,()=>{
    console.log(`le seveur ecouter sur le port : ${port}`)
})

