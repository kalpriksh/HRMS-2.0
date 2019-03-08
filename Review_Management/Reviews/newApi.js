console.log("Starting Reviews JS");
const PORT = 3333;
const path = require('path');
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
    server: 'localhost',
    database: 'Reviews'
}

//All the api listed
  //
  // (/user/employee)
  //   ->gives lvl 1 parameters
  // (/user/employee/sub-parameters)
  //   ->gives lvl 2 parameters

app.use(express.static(path.join(__dirname+'public')));
app.use(express.static(__dirname ));

app.get('/admin', function(req,res){
  res.sendfile('public/views/admin.html');
});

app.get('/employee/developer', function(req,res){
  res.sendfile('public/views/developer.html');
});

app.get('/employee/teamLead', function(req,res){
  res.sendfile('public/views/teamLead.html');
});


app.get('/employee/QA', function(req,res){
  res.sendfile('public/views/teamLeadWrite.html');
});


app.post('/user/employee',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    // console.log(req.body.Empcode);
    console.log(req.body.Role);
    request.query("EXEC RoleFirstLevelName '"+ req.body.Role+"'", function (err,recordset){
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
        console.log("updated");
        res.sendStatus(200);
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

// json-->
//   {
//     "FirstLevelId":
//     "SecondLevelId":
//     "EmployeeCode":
//   }


app.post('/admin/parameters',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();

    request.query("EXEC AddParameter "
    +req.body.Role+","
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

// json-->
//   {
//     "FirstLevelName":
//     "SecondLevelName":
//     "Role":
//   }


app.get('/user/admin/Roles',  function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.Empcode);
    request.query("select * from ProjectRole", function (err,recordset){
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

app.post('/user/Details',  function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.Empcode);
    request.query("Exec EmployeePrimaryProject "+req.body.EmployeeCode+",'"+req.body.ProjectName+"'", function (err,recordset){
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

//to get list of all projects with their project Id
app.get('/user/projects',  function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.Empcode);
    request.query("Select ProjectID,Name from Projects ", function (err,recordset){
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

//to get the Employees whose primary project is same as given by user
app.post('/user/projects/ProjectId',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.ProjectID);
    request.query("EXEC spEmployeesandRoles "+req.body.ProjectID, function (err,recordset){
      if(err)
      {
        console.log(err);
        res.sendStatus(500);
      }
      else {
        console.log(recordset.recordset);
        // res.sendStatus(200);
        res.send(recordset.recordset);
      }
      sql.close();
    });
  });
});

//to create new role by admin
app.post('/admin/role',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.Empcode);
    request.query("EXEC NewRole '"+req.body.Role+"'", function (err,recordset){
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

//to remove till Lv2 Parameters by admin
app.post('/admin/removeLv2Parameters',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.Empcode);
    // if(req.body.SecondLevelName==NULL){
    //
    // }
    request.query("EXEC RemoveParameters '"+req.body.Role+"','"+req.body.FirstLevelName+"','"+req.body.SecondLevelName+"';", function (err,recordset){
      if(err)
      {
        console.log(err);
        res.sendStatus(500);
        console.log("error");
      }
      else {
        console.log("updated");
        res.sendStatus(200);
      }
      sql.close();
    });
  });
});

//to remove till Lv1 Parameters by admin
app.post('/admin/removeLv1Parameters',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.Empcode);
    // if(req.body.SecondLevelName==NULL){
    //
    // }
    request.query("EXEC RemoveLv1Parameter '"+req.body.Role+"','"+req.body.FirstLevelName+"';", function (err,recordset){
      if(err)
      {
        console.log(err);
        res.sendStatus(500);
        console.log("error");
      }
      else {
        console.log("updated");
        res.sendStatus(200);
      }
      sql.close();
    });
  });
});

//to add new lv1 parameter for role
app.post('/admin/role/level1-parameters',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.Empcode);
    request.query("EXEC mapRoleFirstLevel '"+req.body.Role+"','"+req.body.FirstLevelName+"'", function (err,recordset){
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


app.post('/admin/role/level1-parameters/level2-parameters',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.Empcode);
    request.query("EXEC proc1 '"+req.body.Role+"','"+req.body.FirstLevelName+"'"+req.body.SecondLevelName+"'", function (err,recordset){
      if(err)
      {
        console.log("updated");
        res.sendStatus(200);
      }
      else {
        console.log("updated");
        res.sendStatus(200);
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
