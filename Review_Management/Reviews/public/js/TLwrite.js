const EmployeeId = 14;
$(document).ready(function(){

  // Ajax call for  all employees and the primary project
  project = "HRMS Skillset";
  employees = [
    {
      name: "Taran",
      role: "Developer",
      project: "EPP",
      EmployeeId: "7"
    },
    {
      name: "Sahil",
      role: "Developer",
      project: "EPP",
      EmployeeId: "8"

    },
    {
      name: "Shruti",
      role: "Developer",
      project: "EPP",
      EmployeeId: "9"
    },
    {
      name: "Ankit",
      role: "Team Lead",
      project: "EPP",
      EmployeeId: "10"
    }
  ];
  const table_headings = `
  <div class = " table-responsive">
  <table id = "employee_table" class = "table table-bordered table-striped">
    <tr>
      <th scope="col">
          <p>  Name </p>
      </th>
      <th scope="col">
          <p> Role</p>
      </th>
    </tr>
    ${employees.map(employee => `
          <tr>
            <td scope="col"> <a href = "#" id = ${employee.name} onclick = "showLevel1(this.id)">${employee.name}</a></td>
            <td scope="col"> ${employee.role}</td>
          </tr>
    `).join('')}

  </table>
  </div>
  `;
  var mydiv = document.getElementById("employee_list");
  mydiv.innerHTML  = table_headings;

});


function showLevel1(id){
  // ajax call for this id's info
  employee = {
      name: "Ankit",
      role: "Team Lead",
      project: "ERP",
      EmployeeId: "INT001",
      Role: "Dev"
  }
  $("#employee_list").hide();
  document.getElementById("Project_written").innerHTML = "Name";
  document.getElementById("emp_project_diplay").innerHTML = employee.name;
  // document.getElementById("Project_written").innerHTML = "Name";
  document.getElementById("emp_code_diplay").innerHTML = employee.EmployeeId;

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
      const level1html = `
        <ul>
          ${level1.map(level => `
          <li><a href="#" id = ${ level.Name} onclick = "showlevel2(this.id)" > ${level.Name } </a>
          <div id = ${level.Name + "div"}></div>
          </li>
        `).join('')}
        </ul>`
      ;
      mylevel1.innerHTML = level1html;
     }
   });
}

const myOBJ = [
    {
      level2 : "Technical",
      SelfReview : " Good Job..............",
      QA_Review : "dwdwdkvervbebvk brvkjbfekjvbkfevbkjbv jkebvkfevbekvbkvbwkbvkwbvkvbk",
      SelfRating : 8,
      QA_Rating : ""
    },

    {
      level2 : "Team play",
      SelfReview : " Good Job..............",
      QA_Review : "dwdwdwewdwek",
      SelfRating :"8",
      QA_Rating : "10"
    },

    {
      level2 : "Management",
      SelfReview : "",
      QA_Review : "",
      SelfRating : "",
      QA_Rating : ""
    }
  ];

function showlevel2(id){
    //ajax call for level2 parameters
  console.log("id:" + id);
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
          var mylevel2 = document.getElementById(id+"div");
          if(mylevel2.innerHTML == ""){
            var self_reviewed = false;

            myOBJ.forEach(function(element){
              if(element.Own_Review == "null"){
                element.Own_Review = "";
              }

              if(element.Own_Rating == null){
                element.Own_Rating = "";
              }
              if( (element.Own_Review) || (element.Own_Rating) ){
                  self_reviewed = true;
              }
              // else if( (element.QA_Review == "null") && (element.QA_Rating==null) ){
              //     qa_reviewed = false;
              // }

            });

            const table_headings = `
            <div class = " table-responsive">
            <table class = "table table-bordered table-striped" id = "review_table">
              <thead>
              <tr>
                <th scope="col">
                    <p>  Parameters </p>
                </th>
                <th scope="col">
                    <p>  Self Review </p>
                </th>
                ${qa_reviewed ? `
                <th scope="col">
                    <p>  QA Review </p>
                </th>
                `:``}
                <th scope="col">
                    <p>  self rating </p>
                </th>
                ${qa_reviewed ? `
                <th scope="col">
                    <p>  QA rating </p>
                </th>
                `: ``}

              </tr>
              </thead>
              <tbody>

                ${myOBJ.map(obj => `
                      <tr>
                      <td scope="col">${obj.level2}</td>

                      ${self_reviewed ? `
                      <td scope="col">
                          ${obj.Own_Review}
                      </td>
                      `:``}

                      <td scope="col">
                      ${((obj.QA_Review == "")&&(obj.QA_Rating== "")) ?`<textarea id=${"Review"+((obj.level2).split(" ").join(""))} name="QA_Review"></textarea>`:`${obj.QA_Review}`
                      }
                      </td>


                      ${self_reviewed ? `
                      <td scope="col">
                        ${obj.SelfRating}
                      </td>
                      `:``}

                      <td scope="col">
                      ${((obj.QA_Review == "")&&(obj.QA_Rating== "")) ?`  <input type="number" id=${"Rating"+((obj.level2).split(" ").join(""))} name="" value= ${obj.QA_Rating}>`:`${obj.QA_Rating}`
                      }
                      </td>
                    </tr>
                `).join('')}
            </table>
            <br>
            <button id = ${id} onclick = "submitlevel1(this.id)" class = "btn btn-primary btn-lg float-right">SUBMIT</button>
            </div>
            `;


            // (mylevel2.parentNode).setAttribute("class","border border-primary");
            (mylevel2.parentNode).style.border = "2px solid blue";
            (mylevel2.parentNode).style.padding = "20px";
            mylevel2.innerHTML = table_headings;
          }
          else{
            mylevel2.innerHTML = "";
            (mylevel2.parentNode).style.border = "0";
            (mylevel2.parentNode).style.padding = "0";
            // mylevel2.innerHTML = table_headings;
          }
        }
      });
    }
  });
}

function submitlevel1(id){
  //ajax call for level2 parameters
  let response =[];
  myOBJ.forEach(function(element){

    if( (element.QA_Review) || (element.QA_Rating) ){

    }
    else{

      elementReview = document.getElementById("Review"+(element.level2.split(" ").join(""))).value;
      elementRating = document.getElementById("Rating"+(element.level2.split(" ").join(""))).value;

      if((elementReview && !elementRating) || (!elementReview && elementRating))  {
        // console.log(element.level2);
        //   alert("please enter all values");

      }
      else{
        let myresponse = {
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
