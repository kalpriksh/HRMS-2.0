$(document).ready(function(){

    //  ajax call for roles


    roles = ["HR","Dev", "TeamLead"];
    var myroles = document.getElementById("rolelabel");
    const roleshtml = `
      <ul id = "role">
        ${roles.map(role => `
        <li><a href="#" onclick = "showlevel1(this.innerHTML)" id = ${role}>${role}</a>
          <div id = ${role + "div"}></div>
         </li>

      `).join('')}
      <li>

      <div class="row">
        <div class="col-sm-3">
            <button type="submit" onclick = "Addbtn(this.id)" class="btn btn-primary" id = ${"Add_"+"btn"} data-toggle="modal" data-target="#exampleModal">Add New</button>
        </div>
      </div>
      </li>
      </ul>`
    ;
    myroles.innerHTML =roleshtml;
    myroles.style.fontSize = "24px";
    myroles.style.backgroundColor = "#A0A0A0";
    myroles.style.marginTop = "15px";
    myroles.style.borderRadius = "20px";
});

function showlevel1(id){
  // console.log("showlevel1 id: " + id);  //  HR or Developer
  console.log("Here "+id+"wwww");
  var Role = id;
  $.ajax({

    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/user/employee",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({Role}),
    success: function(res){


      level1 = res;
      console.log(level1);
      // level1 = ["Development", "growth", "Skills", "blaa"];
      // var mylevel1 = document.getElementById(Role + "div");
      // console.log(id+"div");
      var mylevel1 = document.getElementById(id+"div");
      // console.log(document.getElementById("div").innerHTML=="");
      if(mylevel1.innerHTML == ""){

        const level1html = `
          <ul id = "llevel1">
            ${level1.map(level => `
            <li><a href="#" onclick = "showlevel2(this.id)" id = ${id+"_"+level.Name}> ${level.Name} </a>
            <div id = ${id+"_" + level.Name + "div"} ></div>
            </li>
          `).join('')}
          <li>

            <div class="row">
              <div class="col-sm-3">
                  <button type="submit" onclick = "Addbtn(this.id)" class="btn btn-primary" id = ${"Add_"+id+"_"+"btn"} data-toggle="modal" data-target="#exampleModal">Add New</button>
              </div>
            </div>

          </li>
          </ul>`
        ;
        mylevel1.innerHTML = level1html;
        mylevel1.style.fontSize = "20px";
        mylevel1.style.backgroundColor = "#C0C0C0";
        mylevel1.style.marginTop = "15px";
        mylevel1.style.borderRadius = "20px";

      }
      else{
        mylevel1.innerHTML = "";
        mylevel1.style.margin = null;
      }
    }
    //        level1 = ["Development", "Growth", "Skills", "blaa"];

  });
}

function showlevel2(ide){
  id = ide.split("_")[1];
  console.log("id:" + id );
  $.ajax({
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/user/employee/sub-parameters",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      },
    "data":JSON.stringify({FirstLevelName:id}),
    "success": function(res){
      level2 = res;

      var mylevel2 = document.getElementById(ide + "div");
      if(mylevel2.innerHTML == ""){
            // HRDevelopment
        // level2 = ["Development 2", "growth 2", "Skills 2", "blaa 2"];

        const level2html = `
          <ul id = "level2">
            ${level2.map(level => `
            <li>
              <a href="#" id = ${id + level.Name}"> ${ level.Name} </a>
            </li>
          `).join('')}

          <li>

          <div class="row">
            <div class="col-sm-3">
                <button type="submit" onclick = "Addbtn(this.id)" class="btn btn-primary" id = ${"Add_"+id+"_"+"btn"} data-toggle="modal" data-target="#exampleModal">Add New</button>
            </div>
          </div>
          </li>
          </ul>`
        ;
        console.log(mylevel2);
        mylevel2.innerHTML = level2html;
        mylevel2.style.fontSize = "16px";
        mylevel2.style.backgroundColor = "#E0E0E0";
        mylevel2.style.marginTop = "15px";
        mylevel2.style.borderRadius = "20px";
      }
      else{
        mylevel2.innerHTML = "";
        mylevel2.style.margin = null;
      }
    }
  });
}

function Addbtn(id){
  document.getElementById("modaladdbtn").setAttribute("name",id);
  // id = id.slice(0,-4);
  // console.log(id);
  // names = id.split("_");
  //
  // if(names.length ==1){
  //   console.log("Add role");
  //   document.getElementById("titlemodal").innerHTML = "Role";
  // }
  // else if(names.length == 2){
  //   // case to add level1 parameter in role names[0]
  //   console.log("Add in " + names[1]);
  //   document.getElementById("titlemodal").innerHTML = "Level1";
  //
  // }
  //
  // else if(names.length == 3){
  //   // case to add level1 parameter in role names[0]
  //   console.log("Add in " + names[1] +" and "+ names[2]);
  //   document.getElementById("titlemodal").innerHTML = "Level2";
  // }
  // else if(names[0]==0){
  //   console.log("Add role");
  // }
}

function modalADD(id){
  id = id.slice(0,-4);
  names = id.split("_");
  let myOBJ;
  if(names.length ==1){
    document.getElementById("titlemodal").innerHTML = "Role";
    myOBJ = {
      role : document.getElementById("modalText").value,
      level1: "",
      level2: ""
    };
  }
  else if(names.length == 2){
    // case to add level1 parameter in role names[0]
    // console.log("Add in " + names[1]);
    document.getElementById("titlemodal").innerHTML = "Level1";
    myOBJ = {
      role : names[1],
      level1: document.getElementById("modalText").value,
      level2: ""
    };
  }

  else if(names.length == 3){
    // case to add level1 parameter in role names[0]
    // console.log("Add in " + names[1] +" and "+ names[2]);
    document.getElementById("titlemodal").innerHTML = "Level2";
    myOBJ = {
      role : names[1],
      level1: names[2],
      level2: document.getElementById("modalText").value
    };
  }
  console.log(myOBJ);
  postingdata(myOBJ);
}
function postingdata(obj){

  // $.ajax({
  //   "crossDomain": true,
  //   "url": "",
  //   "method": "POST",
  //   "data":JSON.stringify(obj),
  //   success: function(res){
  //
  //     console.log("Created");
  //     console.log();
  //   }
  // });
}
