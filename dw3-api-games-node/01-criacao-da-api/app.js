import express from "express"
const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.get("/", (req,res) => {
    const games = [
    {
        title: "Bully",
        year: 2006,
        genre: "SandBox",
        plataform:"Console",
        price:40

    },
    {
        title: "Undertale",
        year: 2009,
        genre: "RPG",
        plataform:"PC",
        price:60 
    },

    {
        title: "FNAF",
        year: 2014,
        genre: "HORROR",
        plataform:"PC",
        price:10 
    }
]
res.json(games)
})

//Rodando API na porta 4000
const port = 4000
app.listen(port,(error) => {
    if(error){
        console.log(error)
    }
    console.log(`API rodando em http://localhost:${port}`)
})