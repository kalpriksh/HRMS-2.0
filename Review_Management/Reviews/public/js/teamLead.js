var EmployeeId = 3;
var Role = "CM";
var employees = [
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

    $.ajax({

      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3333/employee",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({Role}),
      success: function(res){
        level1 = res;
        var mylevel1 = document.getElementById("Level1_list");
        var level1html = `
          <br>
          <h3 class="text-center"> Select a Parameter </h3>
          <ul>
            ${level1.map(level => `
            <li><a href="#" id = ${ level.Name} onclick = "showlevel2(this.id)" >${level.Name}+</a>
            <div id = ${level.Name + "div"}></div>
            </li>
          `).join('')}
          </ul>`
        ;
        mylevel1.innerHTML = level1html;
       }
     });
});

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
      "url": "http://localhost:3333/employee/singlereview",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        },
      "data":JSON.stringify(myreq),
      success: function(res){
        myOBJ = res;
        enteredlevel2 = [];
        res.forEach(function(item){
        enteredlevel2.push(item.Name);
        });

        $.ajax({
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:3333/employee/level2",
          "method": "POST",
          "headers": {
            "Content-Type": "application/json",
            },
          "data":JSON.stringify({FirstLevelName:id,
                                Role:Role}),
          "success": function(res){
            alllevel2 = [];
            res.forEach(function(item){
              alllevel2.push(item.Name);
            });
            if(alllevel2.length == 0)
            {
              alllevel2.push(id);
              toadd = {
                Role : Role,
                FirstLevelName: id,
                SecondLevelName: id
              };
              $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:3333/admin/parameters",
                "method": "POST",
                "headers": {
                  "Content-Type": "application/json",
                  },
                "data":JSON.stringify(toadd),
                "success": function(res){
                  level2 = res;
                }
              });
            }

            alllevel2.forEach(function(item){
              if(enteredlevel2.includes(item)){
              }
              else{
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
            var qa_reviewed = false;

            myOBJ.forEach(function(element){
              if(element.QA_Review == "null"  || element.QA_Review == null){
                element.QA_Review = "";
              }
              if(element.QA_Rating == "null"  || element.QA_Rating == null){
                element.QA_Rating = "";
              }
              if(element.Own_Review == "null"  || element.Own_Review == null){
                element.Own_Review = "";
              }
              if(element.Own_Rating == "null"  || element.Own_Rating == null){
                element.Own_Rating = "";
              }
            });

            var table_headings = `
            <div class="alert alert-danger" id = ${id+"alert"} role="alert">
              Rating must be in the range <strong> 1 - 10 </strong>
            </div>
            <div class = " table-responsive">
            <table class = "table table-bordered table-striped table-hover" id = "review_table">
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
                    <p>  Self Rating<span class="text-danger">*</span> </p>
                </th>
                ${qa_reviewed ? `
                <th scope="col">
                    <p>  QA Rating </p>
                </th>
                `: ``}

              </tr>
              </thead>
              <tbody>

                ${myOBJ.map(obj => `
                      <tr>
                        <td scope="col">${obj.Name}</td>
                        <td scope="col">
                        ${((obj.Own_Review == "")&&(obj.Own_Rating== "")) ?`<textarea onkeydown = "textValidation()" maxlength="255" id=${"Review"+((obj.Name).split(" ").join(""))} name="Own_Review"></textarea>`:`${obj.Own_Review}`
                        }</td>
                        ${qa_reviewed ? `
                        <td scope="col">
                            ${obj.QA_Review}
                        </td>
                        `:``}
                        <td scope="col">
                        ${((obj.Own_Review == "")&&(obj.Own_Rating== "")) ?`  <input type="number" onkeydown = "numValidation()" min="1" max="10"  id=${"Rating"+((obj.Name).split(" ").join(""))} name="" value= ${obj.Own_Rating}>`:`${obj.Own_Rating}`
                        }</td>
                        ${qa_reviewed ? `
                        <td scope="col">
                          ${obj.QA_Rating}
                        </td>
                        `:``}
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
            $("#"+id+"alert").hide();

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
  }
}

function submitlevel1(id){

  var response =[];
  var flag = 0;
  myOBJ.forEach(function(element){

    if( (element.Own_Review) || (element.Own_Rating) ){}
    else{

      elementReview = document.getElementById("Review"+(element.Name.split(" ").join(""))).value;
      elementRating = document.getElementById("Rating"+(element.Name.split(" ").join(""))).value;


      // if((elementReview && !elementRating) || (!elementReview && elementRating) || (!elementReview && !elementRating))  {
      if((!elementReview && !Number(elementRating)))  {
      }
      else{
        if(Number(elementRating)<1 || Number(elementRating)>10 ){
          flag = 1;
          $("#"+id+"alert").show();
          return ;
        }
        else{
          var myresponse = {
            Role: Role,
            EmployeeCode : Number(EmployeeId),
            FirstLevelName : id,
            SecondLevelName : element.Name ,
            Own_Review : elementReview,
            QA_Review : (element.QA_Review == ""? null : element.QA_Review),
            Own_Rating : Number(elementRating),
            QA_Rating : (element.QA_Rating == ""? null : element.QA_Rating)
          }
        response.push(myresponse);
        }
      }

    }
  });
  if(flag == 1){
    return;
  }
  response.forEach(function(myresponse){
    if(!(myresponse.Own_Review == "" && myresponse.Own_Rating == "" )){
      $.ajax({
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:3333/employee/review",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          },
        "data":JSON.stringify(myresponse),
        "success": function(res){
        }
      });
    }
  });

  document.getElementById(id+"div").innerHTML = "";
  (document.getElementById(id+"div").parentNode).style.border = null;
  (document.getElementById(id+"div").parentNode).style.padding = null;
  document.getElementById(id).innerHTML = document.getElementById(id).innerHTML.slice(0,-1) + "+";


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
