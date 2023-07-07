const fs = require('fs');
const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const http = require('http');
const request = require('request');
const app = express();
const path = require("path");
app.use(bodyparser.urlencoded({ extended: true }));



//MONGO-DB for Database
mongoose.connect("mongodb://0.0.0.0:27017/Newsletter");
// .then(() => {
//   console.log("Mongo-DB connected");
// })
// .catch(() => {
//   console.log("error");
// });

const dbaSchema = {
  First_Name: String,
  Last_Name : String,
  Email : String
}

const list2 = new mongoose.model("list2" , dbaSchema);

//Body-Parser
app.post("/" , function(req,res){
  // console.log(req.body.email);
  // var Fname = req.body.Firstname;
  // var Lname = req.body.Lastname;
  // var Email_id = req.body.email;
  // console.log(First_name );
  // console.log(Last_name );
  // console.log(Email);
  let newlist = new list2({
    First_Name:req.body.Firstname,
    Last_Name:req.body.Lastname,
    Email:req.body.email
  });
  newlist.save();
  res.sendFile(path.join(__dirname,"public" , "success.html"));
})

// ====>> Use for send input by your own 
// data = [{
//   First_Name: Fname,
//   Last_Name : Lname,
//   Email: Email_id
// }]
// collection.insertMany([data]);


// Express
app.use(express.static(path.join(__dirname , "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname,"public" , "signup.html"));
});
// const filecontent = fs.readFileSync('signup.html');
// const server = http.createServer((req, res) =>{
//     res.writeHead(200 , {'content-type' : 'text/html'});
//     res.end(filecontent);
// })

app.listen(4000, function () {
  console.log("server is running on port 4000");
});
