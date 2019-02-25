$(document).ready(()=>{
  console.log("Testing");

  //AJAX call

  var dummy =[
    {name:"Sahil",emp_id:"INT020",rating:4},
    {name:"KB",emp_id:"INT020",rating:5},
    {name:"Taran",emp_id:"INT020",rating:2},
    {name:"Abhishek",emp_id:"INT020",rating:1},
    {name:"Shruti",emp_id:"INT020",rating:4},
    {name:"Deepak",emp_id:"INT020",rating:3},
    {name:"Vatsala",emp_id:"INT020",rating:2.2},
  ];

  var table = document.createElement('table');
  var row = document.createElement('tr');
  var th = ["Name","Emp_ID","Ratings"];
  for(var j=0; j<th.length;j++){
    var cell = document.createElement('th');
    var cellText = document.createTextNode(th[j]);
    cell.appendChild(cellText);
    row.appendChild(cell);

  }
  table.appendChild(row);
  table.setAttribute('class','table table-striped');


  for(var i=0;i<dummy.length;i++){
    var row = document.createElement('tr');
    for(var key in dummy[i]){
      var cell = document.createElement('td');

      if(typeof(dummy[i][key])=="number"){
        var divo = document.createElement("div");
        divo.setAttribute("class","stars-outer");
        var innerdivo = document.createElement("div");
        innerdivo.setAttribute('class','stars-inner');
        innerdivo.setAttribute("id",dummy[i][key]);
        const starPercentage = (dummy[i][key]/5) * 100;
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
        divo.appendChild(innerdivo);
        innerdivo.setAttribute("style", "width:"+starPercentageRounded);
        cell.appendChild(divo);
        // $("#"+dummy[i][key]).style.width = starPercentageRounded;
        // console.log(document.getElementById(#4));
        // console.log(document.getElementById(dummy[i][key]));
        // console.log(dummy[i][key]);

        row.appendChild(cell);



      } else{
        var cellText = document.createTextNode(dummy[i][key]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }

    }

    table.appendChild(row);
  }





  var container = $(".container");
  container[0].appendChild(table);
});
