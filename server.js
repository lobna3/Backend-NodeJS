const http = require('http');
const express = require ('express');
const app =express();
const  cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { status } = require('express/lib/response');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mybd');
}


const hostname = 'localhost';
const port = 3001;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.post('/login',function(req,res)
{
    var firstname = req.body.firstname;
    var password = req.body.password;
    var email = req.body.email;
    var mobile = req.body.mobile;

   // define Schema
   var mydbSchema = mongoose.Schema({
    firstname : String,
    password : String,
    email : String,
    mobile : String
  });

  // compile schema to model
  var User = mongoose.model('User', mydbSchema, 'persons');

  // a document instance
  var User1 = new User({ firstname: firstname, password: password, email: email, mobile : mobile});

  // save model to database
  User1.save(function (err, data) {
    if (err)
     {
      res.send({status :0, result: err})}
    else {
      res.send({status :1, result: data})
    }
    
  });
   

}
)

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});