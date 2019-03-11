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
    database: 'Review_Mangement'
}

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

// To get level1 from role
// /user/employee
app.post('/employee',function(req,res){
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


// To get level2 from role and level1
// /user/employee/sub-parameters
app.post('/employee/level2',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.Empcode);
    request.query("EXEC RoleSecondLevelName "+req.body.Role+","+req.body.FirstLevelName, function (err,recordset){
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

// /user/employee/review
app.post('/employee/review',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.Empcode);
    request.query("EXEC Review '"
    +req.body.Own_Review + "',"
    +req.body.Own_Rating + ",'"
    +req.body.QA_Review + "',"
    +req.body.QA_Rating + ","
    +req.body.FirstLevelName + ","
    +req.body.SecondLevelName + ","
    +req.body.EmployeeCode + ","
    +req.body.Role, function (err,recordset){
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


// /user/employee/single-review
app.post('/employee/singlereview',function(req,res){

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
        res.send(200);
      }
      sql.close();
    });
  });
});

// /user/admin/Roles
app.get('/admin/roles',  function(req,res){
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
// /user/Details
app.post('/employee/details',  function(req,res){
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
// /user/projects
app.get('/projects',  function(req,res){
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
// /user/projects/ProjectId
app.post('/projects/Id',function(req,res){
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
// app.post('/admin/role',function(req,res){
//   sql.connect(sqlConfig,function(){
//     var request = new sql.Request();
//     console.log(req.body.Empcode);
//     request.query("EXEC NewRole '"+req.body.Role+"'", function (err,recordset){
//       if(err)
//       {
//         console.log(err);
//         res.sendStatus(500);
//       }
//       else {
//         console.log("updated");
//         res.sendStatus(200);
//       }
//       sql.close();
//     });
//   });
// });

//to remove till Lv2 Parameters by admin
// /admin/removeLv2Parameters
app.post('/admin/remove2',function(req,res){
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
// /admin/removeLv1Parameters
// ********************* not working
app.post('/admin/remove1',function(req,res){
  sql.connect(sqlConfig,function(){
    var request = new sql.Request();
    console.log(req.body.Empcode);
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
// app.post('/admin/role/level1-parameters',function(req,res){
//   sql.connect(sqlConfig,function(){
//     var request = new sql.Request();
//     console.log(req.body.Empcode);
//     request.query("EXEC mapRoleFirstLevel '"+req.body.Role+"','"+req.body.FirstLevelName+"'", function (err,recordset){
//       if(err)
//       {
//         console.log(err);
//         res.sendStatus(500);
//       }
//       else {
//         console.log("updated");
//         res.sendStatus(200);
//       }
//       sql.close();
//     });
//   });
// });
//
//
// app.post('/admin/role/level1-parameters/level2-parameters',function(req,res){
//   sql.connect(sqlConfig,function(){
//     var request = new sql.Request();
//     console.log(req.body.Empcode);
//     request.query("EXEC proc1 '"+req.body.Role+"','"+req.body.FirstLevelName+"'"+req.body.SecondLevelName+"'", function (err,recordset){
//       if(err)
//       {
//         console.log("updated");
//         res.sendStatus(200);
//       }
//       else {
//         console.log("updated");
//         res.sendStatus(200);
//       }
//       sql.close();
//     });
//   });
// });


var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("app listening at http://%s:%s", host, port);
});
