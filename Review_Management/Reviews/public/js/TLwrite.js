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
      EmployeeId: "INT001"
  }
  $("#employee_list").hide();
  document.getElementById("Project_written").innerHTML = "Name";
  document.getElementById("emp_project_diplay").innerHTML = employee.name;
  // document.getElementById("Project_written").innerHTML = "Name";
  document.getElementById("emp_code_diplay").innerHTML = employee.EmployeeId;


  level1 = ["Development", "Growth", "Skills", "blaa"];


  var mylevel1 = document.getElementById("Level1_list");


  // ajax call for this id's review history
  const level1html = `
    <ul>
      ${level1.map(level => `
      <li><a href="#" onclick = "showlevel2(this.id)" id = ${ level}> ${level } </a>
      <div id = ${level + "div"}></div>
      </li>
    `).join('')}
    </ul>`
  ;
  console.log(mylevel1);
  mylevel1.innerHTML = level1html;


}


const myOBJ = [
    {
      level2 : "Technical",
      SelfReview : " Good Job..............",
      QaReview : "dwdwdkvervbebvk brvkjbfekjvbkfevbkjbv jkebvkfevbekvbkvbwkbvkwbvkvbk",
      SelfRating : 8,
      QaRating : ""
    },

    {
      level2 : "Team play",
      SelfReview : " Good Job..............",
      QaReview : "dwdwdwewdwek",
      SelfRating :"8",
      QaRating : "10"
    },

    {
      level2 : "Management",
      SelfReview : "",
      QaReview : "",
      SelfRating : "",
      QaRating : ""
    }
  ];


function showlevel2(id){
    //ajax call for level2 parameters
  console.log("id:" + id);
  var mylevel2 = document.getElementById(id+"div");
  if(mylevel2.innerHTML == ""){
    var self_reviewed = false;

    myOBJ.forEach(function(element){
      if( (element.QaReview) || (element.QaRating) ){
          self_reviewed = true;
      }
    });

    const table_headings = `
    <div class = " table-responsive">
    <table class = "table table-bordered table-striped" id = "review_table">
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
            <p>  Self rating </p>
        </th>
        `: ``}
        <th scope="col">
            <p>  QA rating </p>
        </th>


      </tr>
      </thead>
      <tbody>

        ${myOBJ.map(obj => `
              <tr>
                <td scope="col">${obj.level2}</td>

                ${self_reviewed ? `
                <td scope="col">
                    ${obj.SelfReview}
                </td>
                `:``}

                <td scope="col">
                ${((obj.QaReview == "")&&(obj.QaRating== "")) ?`<textarea id=${"Review"+((obj.level2).split(" ").join(""))} name="QaReview"></textarea>`:`${obj.QaReview}`
                }
                </td>


                ${self_reviewed ? `
                <td scope="col">
                  ${obj.SelfRating}
                </td>
                `:``}

                <td scope="col">
                ${((obj.QaReview == "")&&(obj.QaRating== "")) ?`  <input type="number" id=${"Rating"+((obj.level2).split(" ").join(""))} name="" value= ${obj.QaRating}>`:`${obj.QaRating}`
                }

                </td>



              </tr>
        `).join('')}


    </table>
    <br>
    <button id = ${id} onclick = "submitlevel1(this.id)" class = "btn btn-primary btn-lg float-right">SUBMIT</button>
    </div>
    `;


    (mylevel2.parentNode).style.border = "2px solid blue";
    (mylevel2.parentNode).style.padding = "20px";
    mylevel2.innerHTML = table_headings;
  }
  else{
    mylevel2.innerHTML = "";
    (mylevel2.parentNode).style.border = "0";
    (mylevel2.parentNode).style.padding = "0";
  }
}


function submitlevel1(id){
  //ajax call for level2 parameters
  console.log(id);
  let response =[];
  myOBJ.forEach(function(element){

    if( (element.QaReview) || (element.QaRating) ){

    }
    else{
      console.log("level2");
      console.log(element.level2);

      elementReview = document.getElementById("Review"+(element.level2.split(" ").join(""))).value;
      elementRating = document.getElementById("Rating"+(element.level2.split(" ").join(""))).value;

      if((elementReview && !elementRating) || (!elementReview && elementRating))  {
        // console.log(element.level2);
        //   alert("please enter all values");

      }
      else{
        let myresponse = {
          level1 : id,
          level2 : element.level2,
          QaReview : document.getElementById("Review"+(element.level2.split(" ").join(""))).value,
          SelfReview : element.SelfReview,
          QaRating : document.getElementById("Rating"+(element.level2.split(" ").join(""))).value,
          SelfRating : element.SelfRating
        }
        response.push(myresponse);
      }
    }
  });
  console.log(response);
  document.getElementById(id+"div").innerHTML = "";
  (document.getElementById(id+"div").parentNode).style.border = null;
  (document.getElementById(id+"div").parentNode).style.padding = null;

  // for(var i=0; i<response.length; i++){
    // $.ajax({
    //   "crossDomain": true,
    //   "url": "",
    //   "method": "POST",
    //   "data":JSON.stringify(response[i]),
    //   success: function(res){
    //
    //     console.log("Posted");
    //   }
    // });
  // }
}
