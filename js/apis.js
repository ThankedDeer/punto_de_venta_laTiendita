const express = require ("express");
const { verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require('cors');
const app = express();

app.post("/api/signin", async (req, res, next) => {
    const reqData={};
    var username = re.body.username;
    var password = re.body.password;
    
    database.query('select * from vendedor where username=? and password=sha1(?)',[username,password],(err,rows,field)=>{
        console.log(rows);
        if(!err){
            const hash=crypto.createHash('sha1').update(password).digest('hex');
            if(rows.leghth == 1 && rows[0].username == username && rows[0].password == hash){
                const user = rows[0];
                jwt.sign({id: user.id}, config.secret,{expiresIn:"24h"},(err,token)=>{
                    resp.json({token: token})
                });
            }
            else{
                resp.sendStatus(403);
            }
        }
        else{
            resp.sendStatus(503)
        }
    });
});