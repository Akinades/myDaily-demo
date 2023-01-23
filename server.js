//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const db = require("./db");
const e = require("express");
const PORT = process.env.PORT || 3000 ; 
require("dotenv").config();


const homeStartingContent = "Welcome to the my daily";
const aboutContent = "Write down your daily activities to reach your goals, starting from 0 to 100.";
const contactContent = "E-mail : apisit15600@gmail.com";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", (req, res)=>{

  db.postWrite.find({},(err, posts)=>{

    res.render("home", {
 
      startingContent: homeStartingContent,
 
      posts: posts
 
      });
 
  })
});

app.get("/about",(req, res)=>{
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", (req, res)=>{
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", (req, res)=>{
  res.render("compose");
});

app.post("/compose", (req, res)=>{
  db.postWrite.create({
    title: req.body.postTitle,
    content: req.body.postBody
  });
   res.redirect("/");

});

app.get("/posts/:postId", (req, res)=>{
 
  const requestedPostId = req.params.postId;
  db.postWrite.findOne({_id: requestedPostId},(err, post )=>{
  
    res.render("post", {

      title: post.title,
 
      content: post.content,
      id: post._id
    }); 

  });
});

app.post("/delete", (req, res)=>{
        
        const postID = req.body.deleteID;
        db.postWrite.findOneAndDelete({_id: postID},(err, post)=>{

            if(!err)
            {
              console.log("Delete post completed successfully");
              res.redirect("/");
            }else{
              console.log("Delete post failed");
            }
        });
        
});

db.connectDB().then(()=>{
  app.listen(PORT,(err)=>{
      console.log(`Server is running on port :  ${PORT}`);
  })
});
