$(document).ready(function(){

    //  ajax call for roles


    roles = ["HR","Developer", "Finance"];
    var myroles = document.getElementById("rolelabel");
    const roleshtml = `
      <ul>
        ${roles.map(role => `
        <li><a href="#" onclick = "showlevel1(this.id)" id = ${role}> ${role} </a>
          <div id = ${role + "div"} > </div>
         </li>
      `).join('')}
      </ul>`
    ;
    myroles.innerHTML =roleshtml;

});

function showlevel1(ide){
  console.log("showlevel1 ide: " + ide);  //  HR or Developer
  level1 = ["Development", "growth", "Skills", "blaa"];
  var mylevel1 = document.getElementById(ide + "div");
  const level1html = `
    <ul>
      ${level1.map(level => `
      <li><a href="#" onclick = "showlevel2(this.id)" id = ${ide + level}> ${level} </a>
      <div id = ${ide + level + "div"} > </div>
      </li>
    `).join('')}
    <li>

      <div class="row">
        <div class="col-sm-3">
            <input type="text"  class="form-control" name = "newlevel">
        </div>
        <div class="col-sm-3">

            <button type="submit" class="btn btn-primary">Add New</button>
        </div>
      </div>

    </li>
    </ul>`
  ;
  console.log(mylevel1);
  mylevel1.innerHTML = level1html;

}

function showlevel2(ide){
  console.log("showlevel2 ide: " + ide);        // HRDevelopment
  level1 = ["Development 2", "growth 2", "Skills 2", "blaa 2"];
  var mylevel1 = document.getElementById(ide + "div");
  const level1html = `
    <ul>
      ${level1.map(level => `
      <li><a href="#" id = ${ide + level}"> ${ level} </a>
      </li>
    `).join('')}

    <li>

      <div class="row" >
        <div class="col-sm-3">
            <input type="text"  class="form-control" name = "newlevel">
        </div>
        <div class="col-sm-3" name = ${ide}>

            <button type="submit" id = "" onclick = "Addbtn(this.parentNode.parentNode.parentNode.parentNode.parentNode.id)" class="btn btn-primary">wdwAdd New</button>
        </div>
      </div>

    </li>
    </ul>`
  ;
  console.log(mylevel1);
  mylevel1.innerHTML = level1html;

}

function Addbtn(ide){
  console.log("It's parent Id is: " + ide);
}
