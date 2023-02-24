const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res)=>{
   const firstName=  req.body.fName;
   const lastName = req.body.lName;
   const email = req.body.Email;
   console.log(firstName, lastName, email);

   let data = {
    members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }

        }
    ]
   };
   const jsonData = JSON.stringify(data);

   const url= "https://us21.api.mailchimp.com/3.0/lists/332bd5c25e";

   const options = {
      method: "POST",
      auth:"Aliyu:aa61e5000d7bf408838071a4b59b10bc-us2" 
   }
  const request = https.request(url, options, function(response){

      if(response.statusCode ==200){
        // res.send("successfull");
        res.sendFile(__dirname +"/success.html");
      }else{
        // res.send("Failure");
        res.sendFile(__dirname +"/failure.html");
      }
      response.on("data", function(data){

          console.log(JSON.parse(data));
      });
   });
   request.write(jsonData);
   request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server Started at https://localhost:3000");
});

// API KEY
// aa61e5000d7bf408838071a4b59b10bc-us21

// List_id
// 332bd5c25e