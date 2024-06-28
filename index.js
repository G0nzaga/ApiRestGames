const express = require("express");
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")


app.use(cors())


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//Banco de dados falso de Games
var DB = {
    games:[

        {
            id: 1,
            title: "Call of Duty: WarZone",
            year: 2022,
            price: 300.00
        },
        {
            id: 2,
            title: "Super Mario Bros. Wonder",
            year: 2023,
            price: 277.94
        },
        {
            id: 3,
            title: "Zelda: Breath Of The Wild",
            year: 1998,
            price: 285.00
        },
        {
            id: 4,
            title: "Fifa 2024",
            year: 2023,
            price: 200.00
        },
        {
            id: 5,
            title: "Shadown of Tomb Raider",
            year: 2018,
            price: 120.00
        },
        {
            id: 6,
            title: "Gods Of War: Ragnarok",
            year: 2022,
            price: 285.00
        },
        {
            id: 7,
            title: "Sea of Stars",
            year: 2023,
            price: 187.95
        },
        {
            id: 8,
            title: "Silent Hill 2 Deluxe Edition",
            year: 1998,
            price: 349.99
        },
        {
            id: 9,
            title: "Marvel’s Spider-Man",
            year: 2023,
            price: 349.99
        },
        {
            id: 10,
            title: "The Last of Us II",
            year: 2020,
            price: 249.59
        },
        
    ]
}

//EndPoint - Rotas da API
app.get("/games", (req, res)=>{
    res.statusCode = 200;
    res.json(DB.games)
})

app.get("/game/:id", (req, res) =>{

    //Verificar se o ID é um número ou não
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        //converter para int
        var id = parseInt(req.params.id)

        var game = DB.games.find( g => g.id ==id );

        if(game != undefined){
            res.statusCode = 200;
            res.json(game)
        }else{
            res.sendStatus(404)
        }
    }
})



//Cadastrar um Game
app.post("/game", (req, res) =>{
    
    var {title, price, year} = req.body;
    //Tem que validar esses dados

    DB.games.push({
        id: 4,
        title,
        price,
        year
    });

    res.sendStatus(200);

})



//Deletando games na API
app.delete("/game/:id", (req, res) =>{

    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)
        var index = DB.games.findIndex( g => g.id == id );

        if(index == -1){
            res.sendStatus(404)
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200)
        }
    }
})


//Edição de dados
app.put("/game/:id", (req, res) =>{

    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)

        var game = DB.games.find(g => g.id == id)

        if(game != undefined){

            var {title, price, year} = req.body;

            if(title != undefined){
                game.title = title
            }
            if(price != undefined){
                game.price = price
            }
            if(year != undefined){
                game.year = year
            }

            res.sendStatus(200)


        }else{
            res.sendStatus(404)
        }


    }
})






app.listen(5000, function(erro){
    if(erro){
        console.log("Problems sr.....?")
    }else{
        console.log("It's ok!")
    }
})