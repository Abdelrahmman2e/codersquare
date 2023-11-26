const exp = require('constants');
const express = require('express')
const app = express()
const path=require("path");
const { stdin } = require('process');
const port = process.env.PORT ||3000;
const std=[
    {
        name:"Abdo",
        id:2,
        dept:"SD"
    },{
        name:"Ahmed",
        id:1,
        dept:"CS"
    },{
        name:"Fawzy",
        id:3,
        dept:"PD"
    }
];
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"/home.html"));
});
//get all std
app.get("/api/students",(req,res)=>{
    res.json(std);
});

//get studnet by id

app.get("/api/students/:id",(req,res)=>{
    
    let id=req.params.id;
    const stdId=std.find((val)=> id==val.id);
    if(stdId)   res.json(stdId);
    else    res.send("Student Not Found");

});

app.get("/welcome.html",(req,res)=>{

    res.sendFile(path.join(__dirname,"/welcome.html"));
    console.log(req.query)
    console.log(req.query.lnm)
    

});
app.post("/welcome.html",(req,res)=>{
    res.send(`Welcome Sir,${req.body.fnm}`)
});

app.post("/api/students",(req,res)=>{
    req.body.id=std.length+1;
    std.push(req.body);
    res.json(req.body);
});

app.delete("/api/students/:id",(req,res)=>{
    let id=req.params.id;
    
    let stdId=std.findIndex((val)=> val.id==id);
    if(stdId!=-1){
        std.splice(stdId,1)
        res.send("Student Deleted")
    }else{
        res.send("Student Not Found")
        
    }
})

app.put("/api/students/:id",(req,res)=>{
    let idX=std.findIndex((val)=> val.id==req.params.id);
    if(idX!=-1){
        for(let i in req.body){
            std[idX][i]=req.body[i]
        }
        res.json[std[idX]]
    }else{
        res.send("Student Not Found")

    }
})



app.listen(port, () => console.log(`app listening on port ${port}!`))
