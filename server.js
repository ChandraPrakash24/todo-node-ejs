const ejs = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date");

const app = express();

let items = [];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){

    const day = date.getDate();


    res.render("list", {listTitle : day, newListItem : items});

});

app.get("/work", function(req, res){
    res.render("list", {listTitle : "Work List", newListItem : workItems});
});


app.post("/" , (req , res) => {
    var item = req.body.newItem;    

    // console.log(req.body.list);
    if(req.body.list === "Work")
    {
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }


    // items.push(item);
    // // console.log(item);
    // res.redirect("/");
});
// app.post("/" , (req , res) => {
//     if (req.body.clearItems) {
//         items.length === 0;
//     }
//     // console.log(item);
//     res.redirect("/");
// });

app.post("/work", (req,res)=>{
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work"); 
});

app.get("/about", (req,res)=>{
    res.render("about");
});


app.listen(3000, function(){
    console.log("server up at port 3000");
});