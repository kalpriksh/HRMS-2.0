console.log("Starting Reviews JS");
const PORT = 3333;

const sql = require('mssql');
const lodash = require('lodash');//not used after this
const express = require('express');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');

var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var result1;

var sqlConfig = {
    user: 'sa',
    password: 'password',
    server: 'CYG220',
    database: 'Review_Mangement'
}

//All the api listed
  //
  // (/user/employee)
  //   ->gives lvl 1 parameters
  // (/user/employee/sub-parameters)
  //   ->gives lvl 2 parameters



app.post('/user/employee',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    // console.log(req.body.Empcode);
    console.log(req.body.Role);
    request.query("EXEC RoleFirstLevelName "+ req.body.Role, function (err,recordset){
      if(err)
      {
        console.log(err);
        res.sendStatus(500);
      }
      else {
        console.log(recordset.recordset);
        res.send(recordset.recordset);
      }
      sql.close();
    });
  });
});



app.post('/user/employee/sub-parameters',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.Empcode);
    request.query("EXEC RoleSecondLevelName '"+req.body.FirstLevelName+"'", function (err,recordset){
      if(err)
      {
        console.log(err);
        res.sendStatus(500);
      }
      else {
        console.log(recordset.recordset);
        res.send(recordset.recordset);
      }
      sql.close();
    });
  });
});


app.post('/user/employee/review',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.Empcode);
    request.query("EXEC Review '"
    +req.body.Own_Review+"',"
    +req.body.Own_Rating+",'"
    +req.body.QA_Review+"',"
    +req.body.QA_Rating+",'"
    +req.body.FirstLevelName+"','"
    +req.body.SecondLevelName+"',"
    +req.body.EmployeeCode, function (err,recordset){
      if(err)
      {
        console.log(err);
        res.sendStatus(500);
      }
      else {
        console.log("updated");
        res.sendStatus(200);
      }
      sql.close();
    });
  });
});



app.post('/user/employee/single-review',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();

    console.log(req.body.Employeecode);



    request.query("EXEC GetReviews '"
    +req.body.FirstLevelName+"',"
    +req.body.EmployeeCode, function (err,recordset){
      if(err)
      {
        console.log(err);
        res.sendStatus(500);
      }
      else {
        console.log(recordset.recordset);
        res.send(recordset.recordset);
      }
      sql.close();
    });
  });
});

// jason-->
//   {
//     "FirstLevelId":
//     "SecondLevelId":
//     "EmployeeCode":
//   }


app.post('/admin/parameters',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();

    request.query("EXEC AddParameter '"
    +req.body.Role+"',"
    +req.body.FirstLevelName+","
    +req.body.SecondLevelName, function (err,recordset){
      if(err)
      {
        console.log(err);
        res.sendStatus(500);
      }
      else {
        console.log(recordset.recordset);
        res.send(recordset.recordset);
      }
      sql.close();
    });
  });
});

// jason-->
//   {
//     "FirstLevelName":
//     "SecondLevelName":
//     "Role":
//   }




app.get('/user/admin/Roles',  function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.Empcode);
    request.query("select * from Roles", function (err,recordset){
      if(err)
      console.log(err);
      else {
        console.log(recordset.recordset);
        res.send(recordset.recordset);
      }
      sql.close();
    });
  });
});



var server = app.listen(PORT, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log("app listening at http://%s:%s", host, port);
});
