$(document).ready(()=>{
  console.log("Testing");

  //AJAX call

  var dummy =[
    {name:"Sahil",emp_id:"INT020",rating:4},
    {name:"Sahil",emp_id:"INT020",rating:4},
    {name:"Sahil",emp_id:"INT020",rating:4},
    {name:"Sahil",emp_id:"INT020",rating:4},
    {name:"Sahil",emp_id:"INT020",rating:4},
    {name:"Sahil",emp_id:"INT020",rating:4},
    {name:"Sahil",emp_id:"INT020",rating:4},
    {name:"Sahil",emp_id:"INT020",rating:4},
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
      var cellText = document.createTextNode(dummy[i][key]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    table.appendChild(row);
  }





  var container = $(".container");
  container[0].appendChild(table);
});
