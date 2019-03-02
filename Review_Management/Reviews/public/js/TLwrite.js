
$(document).ready(function(){

  // Ajax call for  all employees and the primary project
  project = "HRMS Skillset";
  employees = [
    {
      name: "Taran",
      role: "Developer",
      project: "EPP",
      EmployeeId: "INT007"
    },
    {
      name: "Sahil",
      role: "Developer",
      project: "EPP",
      EmployeeId: "INT008"

    },
    {
      name: "Shruti",
      role: "Developer",
      project: "EPP",
      EmployeeId: "INT009"
    },
    {
      name: "Ankit",
      role: "Team Lead",
      project: "EPP",
      EmployeeId: "INT001"
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
      project: "EPP",
      EmployeeId: "INT001"
  }
  $("#employee_list").hide();
  document.getElementById("Project_written").innerHTML = "Name";
  document.getElementById("emp_project_diplay").innerHTML = employee.name;
  // document.getElementById("Project_written").innerHTML = "Name";
  document.getElementById("emp_code_diplay").innerHTML = employee.EmployeeId;


  level1 = ["Development", "Growth", "Skills", "blaa"];


    // ajax call for this id's review history
  const level1html = `
    <ul>
      ${level1.map(level => `
      <li><a href="#" onclick = "showlevel2(this.id)" id = ${ level}> ${level } </a>
      <div id = ${level + "div"} > </div>
      </li>
    `).join('')}
    </ul>`
  ;
  console.log(mylevel1);
  var mylevel1 = document.getElementById("Level1_list");
  mylevel1.innerHTML = level1html;

}


const myOBJ = [
    {
      level2 : "Technical",
      SelfReview : " Good Job..............",
      QaReview : "dwdwdwewdwekfbwekjvbvkvkvervbebvk brvkjbfekjvbkfevbkjbv jkebvkfevbekvbkvbwkbvkwbvkvbk",
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

    var self_reviewed = false;

    myOBJ.forEach(function(element){
      if( (element.QaReview) || (element.QaRating) ){
          console.log("Problem" + element.level2);
          self_reviewed = true;
      }
      else{
        console.log("Not a problem " + element.level2);
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
                ${obj.QaReview == "" ?`<textarea name="QaReview"></textarea>`:`${obj.QaReview}`
                }
                </td>


                ${self_reviewed ? `
                <td scope="col">
                  ${obj.SelfRating}
                </td>
                `:``}

                <td scope="col">
                ${obj.QaRating == "" ?`  <input type="number" name="" value= ${obj.QaRating}>`:`${obj.QaRating}`
                }

                </td>



              </tr>
        `).join('')}


    </table>
    <br>
    <button id = ${id} onclick = "submitlevel1(this.id)" class = "btn btn-primary btn-lg float-right">SUBMIT</button>
    </div>
    `;

    var mylevel2 = document.getElementById(id+"div");
    (mylevel2.parentNode).setAttribute("class","border border-primary");
    (mylevel2.parentNode).style.padding = "20px";
    mylevel2.innerHTML = table_headings;

  }


  function submitlevel1(id){
    console.log("id: "+ id);
  }
