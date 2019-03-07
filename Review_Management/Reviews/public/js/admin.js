$(document).ready(function(){

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
          <h3 class="text-center"> Select a Role </h3>
          <ul id = "role">
            ${roles.map(role => `
            <li><a  onclick = "showlevel1(this.id)" id = ${role}>${role}</a>
            <div id = ${role + "div"}></div></li>
            `).join('')}
            <li>
            <div class="row">
              <div class="col-sm-3">
                <button type="submit" onclick = "Addbtn(this.innerHTML)" class="btn btn-primary" id = ${"Add_"+"btn"} data-toggle="modal" data-target="#exampleModal">Add New</button>
              </div></div></li></ul>`
        ;
        myroles.innerHTML = roleshtml;
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
      var mylevel1 = document.getElementById(id+"div");
      console.log(id+"div");
      if(mylevel1.innerHTML == ""){
        const level1html = `
          <br>
          <h3 class="text-center"> Level 1 parameters </h3>
          <ul id = "llevel1">
            ${level1.map(level => `
            <li><a  onclick = "showlevel2(this.id)" id = ${id+"_"+level.Name}> ${level.Name} </a>
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
        mylevel1.style.color = "#212529";
        mylevel1.style.backgroundColor = "#C0C0C0";
        mylevel1.style.marginTop = "15px";
        mylevel1.style.borderRadius = "20px";
      }
      else{
        mylevel1.innerHTML = "";
        mylevel1.style.margin = null;
      }
    }
  });
}

function showlevel2(ide){
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
        const level2html = `
          <br>
          <h3 class="text-center"> Level 2 parameters </h3>
          <ul id = "level2">
            ${level2.map(level => `
            <li>
              <a id = ${id + level.Name}"> ${ level.Name} </a>
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
  id = id.slice(0,-4);
  names = id.split("_");
  if(names.length ==1){
    document.getElementById("exampleModalLabel").innerHTML = "Add new Role";
  }
  else if(names.length ==2 || names.length ==3){
    document.getElementById("exampleModalLabel").innerHTML = "Add new paramter";
  }
}

function modalADD(ide){
  id = ide.slice(0,-4);
  names = id.split("_");
  let myOBJ;
  if(names.length ==1){
    document.getElementById("exampleModalLabel").innerHTML = "Role";
    myOBJ = {
      Role : document.getElementById("modalText").value,
      FirstLevelName: null,
      SecondLevelName: null
    };
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
    btn = document.getElementById(ide);
    let mydiv = btn.parentNode.parentNode.parentNode.parentNode.parentNode;
    document.getElementById(mydiv.id).innerHTML = "";
    document.getElementById("exampleModalLabel").innerHTML = "Level1";

    myOBJ = {
      Role : names[1],
      FirstLevelName: document.getElementById("modalText").value,
      SecondLevelName: null
    };
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
    btn = document.getElementById(ide);
    let mydiv = btn.parentNode.parentNode.parentNode.parentNode.parentNode;
    document.getElementById(mydiv.id).innerHTML = "";
    document.getElementById("exampleModalLabel").innerHTML = "Level2";
    myOBJ = {
      Role : names[1],
      FirstLevelName: names[2],
      SecondLevelName: document.getElementById("modalText").value
    };
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
}


function textValidation(){
  if(event.key == "<" || event.key == ">" || event.keyCode == 32 || event.key == "_" ){
    event.preventDefault();
  }
}
