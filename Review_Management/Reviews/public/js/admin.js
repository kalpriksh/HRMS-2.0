$(document).ready(function(){

    //  ajax call for roles
    let roles = [];
    $.ajax({

      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3333/user/admin/Roles",
      "method": "GET",

      success: function(res){
        res.forEach(function(element){
          roles.push(element.Name);
        });
        var myroles = document.getElementById("rolelabel");
        const roleshtml = `
          <ul id = "role">
            ${roles.map(role => `
            <li>

                <a href="#" onclick = "showlevel1(this.id)" id = ${role}>${role}</a>
                  <div id = ${role + "div"}></div>

            </li>

          `).join('')}
          <li>

          <div class="row">
            <div class="col-sm-3">
                <button type="submit" onclick = "Addbtn(this.innerHTML)" class="btn btn-primary" id = ${"Add_"+"btn"} data-toggle="modal" data-target="#exampleModal">Add New</button>
            </div>
          </div>
          </li>
          </ul>`
        ;
        myroles.innerHTML =roleshtml;
        myroles.style.color = "white";
        myroles.style.fontSize = "24px";
        myroles.style.padding = "24px";
        myroles.style.backgroundColor = "rgba(#212529, 0.91)";
        myroles.style.marginTop = "15px";
        myroles.style.borderRadius = "5px";
        myroles.style.boxShadow = "10px 10px 10px rgba(65, 62, 102, 0.77)";

}
  });
});

function showlevel1(id){
  // console.log("showlevel1 id: " + id);  //  HR or Developer

  var Role = id;
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
      // console.log(level1);
      // level1 = ["Development", "growth", "Skills", "blaa"];
      // var mylevel1 = document.getElementById(Role + "div");
      // console.log(id+"div");
      var mylevel1 = document.getElementById(id+"div");
      console.log(id+"div");
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
  // console.log(ide);
  id = ide.split("_")[1];
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
                <button type="submit" onclick = "Addbtn(this.id)" class="btn btn-primary" id = ${"Add_"+ide+"_"+"btn"} data-toggle="modal" data-target="#exampleModal">Add New</button>
            </div>
          </div>
          </li>
          </ul>`
        ;
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

}

function modalADD(id){
  console.log(id);
  id = id.slice(0,-4);
  names = id.split("_");
  let myOBJ;
  if(names.length ==1){
    console.log("add new role");
    document.getElementById("titlemodal").innerHTML = "Role";
    myOBJ = {
      Role : document.getElementById("modalText").value,
      FirstLevelName: null,
      SecondLevelName: null
    };
    // console.log(JSON.stringify(myOBJ));
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3333/admin/parameters",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        },
      "data":JSON.stringify(myOBJ),
      "success": function(res){
        level2 = res;
        window.location.reload();
      }
    });
  }
  else if(names.length == 2){

    // console.log("Add new level1");
    // case to add level1 parameter in role names[0]
    // console.log("Add in " + names[1]);
    document.getElementById("titlemodal").innerHTML = "Level1";

    myOBJ = {
      Role : names[1],
      FirstLevelName: document.getElementById("modalText").value,
      SecondLevelName: null
    };
    // console.log(JSON.stringify(myOBJ));
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3333/admin/parameters",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        },
      "data":JSON.stringify(myOBJ),
      "success": function(res){
        level2 = res;
      }
    });
  }

  else if(names.length == 3){

      // console.log("Add new level2");
    // console.log("Inside Add");
    // case to add level1 parameter in role names[0]
    // console.log("Add in " + names[1] +" and "+ names[2]);
    document.getElementById("titlemodal").innerHTML = "Level2";
    myOBJ = {
      Role : names[1],
      FirstLevelName: names[2],
      SecondLevelName: document.getElementById("modalText").value
    };
    debugger;
    console.log(myOBJ);
    console.log(JSON.stringify(myOBJ));
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3333/admin/parameters",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        },
      "data":JSON.stringify(myOBJ),
      "success": function(res){
        level2 = res;
      }
    });
  }
  // console.log(myOBJ);

}
