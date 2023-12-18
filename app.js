import express from "express"
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/",async(req,res)=>{
    const type = req.body.type;
    try{
        const response = await axios.get("https://v2.jokeapi.dev/joke/"+type);
        let result;
        if(response.data.hasOwnProperty("setup")){
            result = response.data.setup;
        }else{
            result = response.data.joke;
        }
        res.render("index.ejs",{joke:result});
    }catch(error){
        res.render("index.ejs",{joke:error.message});
    }
})

app.listen(port,()=>{
    console.log(`Server running on port :${port}`);

})