var express = require('express');
var router = express.Router();
var db=require('../database');
router.get('/form', function(req, res, next) { 
res.render('users'); 
});
router.post('/create', function(req, res, next) {
  
  // store all the user input data
  const userDetails=req.body;
  // insert user data into users table
  console.log(userDetails);
  const email_exists_query = `
  SELECT COUNT(*) table_exists 
    FROM users 
   WHERE emailAddress=`+userDetails.emailAddress+`;`

  $emailExists = email_exists_query;
  if($emailExists){
    console.log("EMAIL EXISTS");
    res.redirect('/users/form');
  }
  else{
    var sql = 'INSERT INTO users SET ?';
    db.query(sql, userDetails,function (err, data) { 
      if (err) throw err;
         console.log("User dat is inserted successfully "); 
    });
    res.redirect('/users/form');  // redirect to user form page after inserting the data
  }
}); 
module.exports = router;