const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid} = require('uuid');
const axios = require('axios');
uuid();
const methodOverride = require('method-override');

const PORT = 5000;

const jokeBox = [
  {
    _id: uuid(),
    joke: "What do you call a fly without wings? A walk.",
  },
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))


app.get('/timeline',(req, res) => {
    res.render('timeline', {jokeBox})
})

app.post('/timeline',(req, res)=>{
    const newJoke = async () => {
        try{
                let jokeShell = await axios.get(
                "https://api.chucknorris.io/jokes/random"
                );
                let joke = await jokeShell.data.value;
                await jokeBox.unshift({_id:uuid(), joke})
                res.redirect("/timeline");

            }catch(e){
                
                console.log('ERROR', e)
            }
       
       
    }

    newJoke();
})

app.listen(PORT, ()=>{
    console.log('SERVER IS UP AND RUNNING 🐱‍🏍')
})



