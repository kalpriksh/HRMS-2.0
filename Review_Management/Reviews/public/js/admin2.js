let role = "", level1  = "", level2  = "";
$(document).ready(function(){

  $("#DropdownLevel1").hide();
  $("#DropdownLevel2").hide();
  $("#roleLabel").hide();

  $("#closelevel2").click(function(){
    document.getElementById("dropdownMenuButtonLevel1").disabled = false;
    document.getElementById("level1").disabled = false;
    document.getElementById("closelevel1").disabled = false;
    document.getElementById("selectedLevel2").innerHTML = "";
    $("#DropdownLevel2").hide();
  })

  $("#closelevel1").click(function(){
    document.getElementById("dropdownMenuButtonRoles").disabled = false;
    document.getElementById("role").disabled = false;
    document.getElementById("selectedLevel1").innerHTML = "";
    $("#DropdownLevel1").hide();
  })

  //ajax call for roles
  let roles = ["HR", "Developer", "Finance", "blaa"];

  const roleshtml = `

      ${roles.map(role => `
      <a class="dropdown-item" href="#" id = ${role} onclick="Showlevel1(this.innerHTML)">${role}</a>
    `).join('')}`
  ;
  var myroles = document.getElementById("Rolelist");
  myroles.innerHTML = roleshtml;


});

function Showlevel1(id){
  role = id;
  document.getElementById("dropdownMenuButtonRoles").disabled = true;
  document.getElementById("role").disabled = true;

  $("#roleLabel").show();
  document.getElementById("selectedRole").innerHTML = id;

  $("#DropdownLevel1").show();

  // ajax for level1 of role id
  level1 = ["Development", "Growth 1", "Skills 1", "blaa"];

  const level1html = `
      ${level1.map(level => `
      <a class="dropdown-item" href="#" id = ${level} onclick="Showlevel2(this.innerHTML)">${level}</a>
    `).join('')}`
  ;
  var mylevel1 = document.getElementById("level1list");
  mylevel1.innerHTML = level1html;

}

function Showlevel2(id){
  level1 = id;
  console.log("role and level1: " + role + " , " + level1);
  document.getElementById("dropdownMenuButtonLevel1").disabled = true;
  document.getElementById("level1").disabled = true;
  document.getElementById("closelevel1").disabled = true;

  $("#level1label").show();
  document.getElementById("selectedLevel1").innerHTML = id;

  $("#DropdownLevel2").show();

  // ajax for level1 of role id
  level2 = ["Development 2", "Growth 2", "Skills 2", "blaa 2"];

  const level2html = `
      ${level2.map(level => `
      <a class="dropdown-item" href="#" id = ${level} name = ${level} onclick="level2selected(this.innerHTML)">${level}</a>
    `).join('')}`
  ;

  let mylevel2 = document.getElementById("level2list");
  mylevel2.innerHTML = level2html;

}

function level2selected(id){
  $("#level2label").show();
  document.getElementById("selectedLevel2").innerHTML = id;
}

function addnew(id){
  let body = document.getElementById("modalbody");
  const markup =`
    <h5 class = "text-center"> ADD new ${id} </h5>
    <input type="text" class = "text-center form-control" name="" value="" placeholder = "abcd">
  `;
  body.innerHTML = markup;
  if(id == "role"){
    // ajax call for EMPCODE and role
  }
  else if(id == "level1"){
    // ajax call for EMPCODE, role and level1
  }
  else if(id == "level2"){
    // ajax call for EMPCODE , role, level2 and level1
  }
}

function remove(id){
  if(id == "removeRole"){

  }
}
