const express = require ("express");
const { verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const app = express();

app.post("/api/login",(req,res)=>{
    const user = {
        id: 1,
        nombre : "Yael",
        password : "achisfuga"
    }
    jwt.sign ({user: user}, 'secretkey', {expiresIn: '32s'},  (err, token)=>{
        res.json({
            token
        });
    });
});



app.post("/api/posts", verifyToken, (req,res)=>{

    jwt.verify(req.token, 'secretkey',(error, authData )=>{
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje:"Post fue creado",
                authData
            })
        }
    });
});

//Autorizacion con Token
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403)
    }
}