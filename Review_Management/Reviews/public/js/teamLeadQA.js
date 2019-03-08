var EmployeeId ;
var Role = "Developers";
employees = [
  {
    name: "Taran Pal Singh",
    role: "Developers",
    project: "BRINKS",
    EmployeeId: "1"
  },
  {
    name: "Shruti Bhati",
    role: "Developers",
    project: "BRINKS",
    EmployeeId: "2"

  },
];
$(document).ready(function(){

  // Ajax call for  all employees and the primary project

  $("#QAprofile").hide();

  var table_headings = `
  <br>
  <h3> Select an Employee to Review </h3>
  <div class = " table-responsive">
  <table id = "employee_table" class = "table table-bordered">
    <thead  class = "thead-light">
    <tr>
      <th scope="col">Name
      </th>
      <th scope="col">Employee Code
      </th>
      <th scope="col">Role
      </th>
    </tr>
    </thead>
    ${employees.map(employee => `
          <tr>
            <td scope="col"> <a href = "#" id = ${employee.EmployeeId} onclick = "showLevel1(this.id,this.innerHTML)">${employee.name}</a></td>
            <td scope="col"> ${employee.EmployeeId}</td>
            <td scope="col"> ${employee.role}</td>
          </tr>
    `).join('')}

  </table>
  </div>
  `;
  var mydiv = document.getElementById("employee_list");
  mydiv.innerHTML = table_headings;

});


function showLevel1(id,name){
  // ajax call for this id's info
  EmployeeId = id;
  $("#QAprofile").show();

  $("#employee_list").hide();
  // document.getElementById("projectNamehtml").innerHTML = employee.project;
  if(String(id).length == 1){
    document.getElementById("EmployeeIdhtml").innerHTML = "Employee Code:&nbsp&nbsp&nbsp&nbsp CYG00"+id;
  }
  else if(String(id).length == 2){
    document.getElementById("EmployeeIdhtml").innerHTML = "Employee Code:&nbsp&nbsp&nbsp&nbsp CYG0"+id;
  }
  document.getElementById("Namehtml").innerHTML = "Name:&nbsp&nbsp&nbsp&nbsp"+name;

  $.ajax({

    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3333/user/employee",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({Role}),
    success: function(res){
      level1 = res;
      var mylevel1 = document.getElementById("Level1_list");
      var level1html = `
        <h3 class="text-center"> Select a Parameter </h3>
        <ul>
          ${level1.map(level => `
          <li><a  id = ${ level.Name} onclick = "showlevel2(this.id)" >${level.Name}+</a>
          <div id = ${level.Name + "div"}></div>
          </li>
        `).join('')}
        </ul>`
      ;
      mylevel1.innerHTML = level1html;
     }
   });
}

function showlevel2(id){

  var title = (document.getElementById(id).innerHTML).slice(0,-1);
  var mylevel2 = document.getElementById(id+"div");

  if(mylevel2.innerHTML == ""){
    document.getElementById(id).innerHTML = title+"-";
    myreq = {
    FirstLevelName:id,
    EmployeeCode:EmployeeId
    };

    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3333/user/employee/single-review",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        },
      "data":JSON.stringify(myreq),
      success: function(res){
        myOBJ = res;

        console.log(myOBJ);
        enteredlevel2 = [];
        res.forEach(function(item){
          enteredlevel2.push(item.Name);
        });
        // console.log(enteredlevel2);

        $.ajax({
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:3333/user/employee/sub-parameters",
          "method": "POST",
          "headers": {
            "Content-Type": "application/json",
            },
          "data":JSON.stringify({FirstLevelName:id}),
          "success": function(res){
            alllevel2 = [];
            res.forEach(function(item){
              alllevel2.push(item.Name);
            });
            if(alllevel2.length == ""){ alllevel2.push(id)} ;
            alllevel2.forEach(function(item){
              if(enteredlevel2.includes(item)){
              }
              else{
                // console.log("Not here: " +item);
                addobj = {
                  "Name": item,
                  "Own_Rating": "",
                  "Own_Review": "",
                  "QA_Rating": "",
                  "QA_Review": ""
                }
                myOBJ.push(addobj);
              }
            });
            // console.log(myOBJ);
              var self_reviewed = false;

              myOBJ.forEach(function(element){
                if(element.Own_Review == "null"){
                  element.Own_Review = "";
                }
                if(element.Own_Rating == null){
                  element.Own_Rating = "";
                }
                if(element.QA_Review == "null"){
                  element.QA_Review = "";
                }
                if(element.QA_Rating == null){
                  element.QA_Rating = "";
                }
                if( (element.Own_Review) || (element.Own_Rating) ){
                  self_reviewed = true;
                }

              });

              var table_headings = `
              <div class = " table-responsive">
              <table class = "table table-hover table-bordered table-striped" id = "review_table">
                <thead>
                <tr>
                  <th scope="col">
                      <p>  Parameters </p>
                  </th>
                  ${self_reviewed ? `
                  <th scope="col">
                      <p>  Self Review </p>
                  </th>
                  `:``}
                  <th scope="col">
                      <p>  QA Review </p>
                  </th>
                  ${self_reviewed ? `
                  <th scope="col">
                      <p>  Self Rating* </p>
                      <p> (1-10) </p>
                  </th>
                  `:``}
                  <th scope="col">
                      <p>  QA Rating </p>
                      <p> (1-10) </p>
                  </th>

                </tr>
                </thead>
                <tbody>

                  ${myOBJ.map(obj => `
                        <tr>
                        <td scope="col">${obj.Name}</td>

                        ${self_reviewed ? `
                        <td scope="col">
                            ${obj.Own_Review}
                        </td>
                        `:``}

                        <td scope="col">
                        ${((obj.QA_Review == "")&&(obj.QA_Rating== "")) ?`<textarea onkeydown = "textValidation()" maxlength="255" id=${"Review"+((obj.Name).split(" ").join(""))} name="QA_Review"></textarea>`:`${obj.QA_Review}`
                        }
                        </td>


                        ${self_reviewed ? `
                        <td scope="col">
                          ${obj.Own_Rating}
                        </td>
                        `:``}

                        <td scope="col">
                        ${((obj.QA_Review == "")&&(obj.QA_Rating== "")) ?`  <input onkeydown = "numValidation()" min="1" max="10"  type="number" id=${"Rating"+((obj.Name).split(" ").join(""))} name="" value= ${obj.QA_Rating}>`:`${obj.QA_Rating}`
                        }
                        </td>
                      </tr>
                  `).join('')}
              </table>
              <p class="tnc text-danger"> * Rating is must </p>
              <button id = ${id} onclick = "submitlevel1(this.id)" class = "btn btn-primary btn-lg float-right">SUBMIT</button>
              </div>
              `;
              (mylevel2.parentNode).style.border = "2px solid blue";
              (mylevel2.parentNode).style.padding = "20px";
              mylevel2.innerHTML = table_headings;
            }
          });
        }
      });
  }
  else{
    document.getElementById(id).innerHTML = title+"+";
    mylevel2.innerHTML = "";
    (mylevel2.parentNode).style.border = "0";
    (mylevel2.parentNode).style.padding = "0";
    // mylevel2.innerHTML = table_headings;
  }
}

function submitlevel1(id){
  //ajax call for level2 parameters
  var response =[];
  myOBJ.forEach(function(element){

    if( (element.QA_Review) || (element.QA_Rating) ){

    }
    else{

      elementReview = document.getElementById("Review"+(element.Name.split(" ").join(""))).value;
      elementRating = document.getElementById("Rating"+(element.Name.split(" ").join(""))).value;

      if((!elementReview && !Number(elementRating)))  {
      }
      else{
        if(Number(elementRating)<1 || Number(elementRating)>10 ){
          var addhtml =
          `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            Rating must be in the range <strong>1 to 10</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
          document.getElementById("alert").innerHTML = addhtml;
          return ;
        }
        else{
          var myresponse = {
            EmployeeCode : Number(EmployeeId),
            FirstLevelName : id,
            SecondLevelName : element.Name ,
            QA_Review : elementReview,
            Own_Review : (element.Own_Review == ""? null : element.Own_Review),
            QA_Rating : Number(elementRating),
            Own_Rating : (element.Own_Rating == ""? null : element.Own_Rating)
          }
          response.push(myresponse);
        }
      }
    }
  });
  response.forEach(function(myresponse){
    if(!(myresponse.QA_Review == "" && myresponse.QA_Rating == "" )){
      $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3333/user/employee/review",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          },
        "data":JSON.stringify(myresponse),
        "success": function(res){
          // console.log(JSON.stringify(myresponse));
          // console.log("Added");
        }
      });
    }
  });

  console.log(response);
  document.getElementById(id+"div").innerHTML = "";
  (document.getElementById(id+"div").parentNode).style.border = null;
  (document.getElementById(id+"div").parentNode).style.padding = null;

}


function numValidation(){
  if(event.key == "e" || event.key == "E" ){
    event.preventDefault();
  }
}


function textValidation(){
  if(event.key == "<" || event.key == ">" ){
    event.preventDefault();
  }
}
