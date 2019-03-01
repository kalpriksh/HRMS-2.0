
$(document).ready(function(){

  // Ajax call for  all employees and the primary project
  project = "HRMS Skillset";
  employees = [
    {
      name: "Taran",
      role: "Developer"
    },
    {
      name: "Sahil",
      role: "Developer"
    },
    {
      name: "Shruti",
      role: "Developer"
    },
    {
      name: "Ankit",
      role: "Team Lead"
    }
  ];
  const table_headings = `
  <label > Project: ${project}</label>
  <table id = "employee_table" class = "table">
    <tr class="row">
      <th class="col-sm-6 col-lg-3 offset-lg-3">
          <p>  Name </p>
      </th>
      <th class= "col-sm-6 col-lg-3">
          <p> Role</p>
      </th>
    </tr>
    ${employees.map(employee => `
          <tr class = "row">
            <td class="col-sm-6 col-lg-3 offset-lg-3"> <a href = "#" id = ${employee.name} onclick = "showLevel1(this.id)">${employee.name}</a></td>
            <td class="col-sm-6 col-lg-3"> ${employee.role}</td>
          </tr>
    `).join('')}

  </table>
  `;


  var mydiv = document.getElementById("printHere");
  console.log(mydiv);
  mydiv.innerHTML  = table_headings;
  console.log("Done");

});


function showLevel1(ide){
  console.log("ide: " + ide);
  level1 = ["Development", "growth", "Skills", "blaa"];

  var mydiv = document.getElementById("printHere");
  mydiv.innerHTML  = "";


  var myul = document.createElement("ul");
  myul.setAttribute("id", "Level1_list")
  for(var i=0; i<level1.length; i++){

    var list = document.createElement("li");
    var anchor = document.createElement("a");
    anchor.innerHTML = level1[i];
    anchor.innerHTML = anchor.innerHTML + " + ";
    anchor.setAttribute("href","#");
    anchor.setAttribute("id", level1[i]);
    anchor.setAttribute("onclick","showLevel2(this.id)");

    list.appendChild(anchor);
    myul.appendChild(list);
  }
  mydiv.appendChild(myul);
}





function showLevel2(name){
  console.log(name);
  var mydiv = document.getElementById("printHere");
  if(!document.getElementById("level2")){
    var mydivinside = document.createElement("div");
    mydivinside.setAttribute("id", "level2");
    mydiv.appendChild(mydivinside);
  }
  // mydiv.innerHTML  = "";
  var myOBJ = [
      {
        level2 : "Tecnical",
        SelfReview : " Good Job..............",
        QaReview : "",
        SelfRating : 8,
        QaRating : ""
      },

      {
        level2 : "team play",
        SelfReview : " Good Job..............",
        QaReview : " wwdhwbdw",
        SelfRating :"8",
        QaRating : "10"
      },

      {
        level2 : "management",
        SelfReview : "",
        QaReview : "",
        SelfRating : "",
        QaRating : ""
      }
    ];

  const reviewtable = `
  <table id = "review_table">
    <tr class="row">
      <th class="col-sm-2 col-xs-2">
          <p>  Parameters </p>
      </th>
      <th class= "col-sm-3 col-xs-3">
          <p>  Self Review </p>
      </th>
      <th class= "col-sm-3 col-xs-3">
          <p>  QA Review </p>
      </th>
      <th class= "col-sm-1 col-xs-1">
          <p>  self rating </p>
      </th>
      <th class= "col-sm-1 col-xs-1">
          <p>  QA rating </p>
      </th>
      <th class="col-sm-2 col-xs-2">
          <p>  Submit </p>
      </th>
    </tr>

    ${myOBJ.map(obj => `
            <tr class = "row">
              <td class="col-sm-2 col-sm-2">${obj.level2}</td>

              <td class="col-sm-3 col-xs-3">
                  ${obj.SelfReview}
              </td>

              <td class= "col-sm-3 col-xs-3">
              <textarea name="SelfReview" >
                ${obj.QaReview}
              </textarea>
              </td>

              <td class="col-sm-1 col-xs-1">
                ${obj.QaRating}
              </td>

              <td class= "col-sm-1 col-xs-1">
                <input type="number" name="" value= ${obj.SelfRating}>
              </td>

              <td class="col-sm-2 col-xs-2">
                <button type="button" name="button">Submit</button>
              </td>

              </tr>
      `).join('')}


  </table>
  `;
    mydivinside.innerHTML  = reviewtable;
}
