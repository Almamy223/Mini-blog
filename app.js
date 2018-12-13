var express= require ("express");
var mysql= require ("mysql");
var bp= require("body-parser");
var mo = require("express-method-override");
var app= express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bp.urlencoded());
app.use(mo("method"));

var conn= mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "MiniBlog"
});

conn.connect(function(err){
    console.log(err);
});

app.get("/posts", function(req, res){
    var sql = "SELECT * FROM posts";
    conn.query(sql, function(err, posts){
        if(err)
            throw err;
        
        res.render("show", {posts:posts});
    });
});

app.get("/posts/new", function(req, res){
    res.render("new");
});

app.post("/posts", function(req, res){
    var sql= "INSERT INTO posts (title, image, content) VALUES ('"+req.body.title+"', '"+req.body.image+"', '"+req.body.content+"')";
    conn.query(sql, function(err){
        if(err)
            throw err;
        
        res.redirect("/posts");
    });
});

app.delete("/posts/:id", function(req, res){
    var sql= "DELETE FROM posts WHERE id='"+req.params.id+"'";
    conn.query(sql, function(err){
        if(err)
            throw err;
        
        res.redirect("/posts");
    });
});

app.get("/posts/:id/edit", function(req, res){
    res.render("update", {
        title: req.query.title,
        image: req.query.image,
        content: req.query.content,
        id: req.params.id
    });
});

app.put("/posts/:id", function(req, res){
    var sql= "UPDATE posts SET title='"+req.body.title+"', image='"+req.body.image+"', content='"+req.body.content+"' WHERE id="+req.params.id;
    conn.query(sql, function(err){
        if(err)
            throw err;
        
        res.redirect("/posts");
    });
});

app.listen(8080);