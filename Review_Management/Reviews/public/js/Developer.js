$(document).ready(function(){
    var Role = "Dev";
    $.ajax({

      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/user/employee",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      // "data": "{\n\t\"Role\":\"Dev\"\n}",
      "data": JSON.stringify({Role}),
      success: function(res){

//        level1 = ["Development", "Growth", "Skills", "blaa"];
        level1 = res;
        var mylevel1 = document.getElementById("Level1_list");
        const level1html = `
          <ul>
            ${level1.map(level => `
            <li><a href="#" onclick = "showlevel2(this.id,)" id = ${ level.Name}> ${level.Name } </a>
            <div id = ${level.Name + "div"}></div>
            </li>
          `).join('')}
          </ul>`
        ;
        mylevel1.innerHTML = level1html;
       }
     });
});


// const myOBJ = [
//     {
//       level2 : "Technical",
//       Own_Review : " Good Job..............",
//       QA_Review : "",
//       Own_Rating : 8,
//       QA_Rating : ""
//     },
//
//     {
//       level2 : "Team play",
//       Own_Review : "wdwdw",
//       QA_Review : "",
//       Own_Rating :"10",
//       QA_Rating : ""
//     },
//
//     {
//       level2 : "Management",
//       Own_Review : "",
//       QA_Review : "Good job",
//       Own_Rating : "",
//       QA_Rating : "9"
//     }
//   ];

function showlevel2(id){
  //ajax call for level2 parameters
  console.log(id);
  myreq = {
	FirstLevelName:id,
	EmployeeCode:14
  };

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
        // alllevel2 = res;
        // console.log(alllevel2);
        var alllevel2 = res.map(function(ele) {


        });
        console.log(alllevel2);
        // $.ajax({
        //   "async": true,
        //   "crossDomain": true,
        //   "url": "http://localhost:3000/user/employee/single-review",
        //   "method": "POST",
        //   "headers": {
        //     "Content-Type": "application/json",
        //     },
        //   "data":JSON.stringify(myreq),
        //   success: function(res){
        //       myOBJ = res;
        //       console.log(res);
        //       for(var i=0; i<alllevel2.length; i++){
        //         if(alllevel2[i].Name in myOBJ.Name){
        //           console.log(myOBJ.Name);
        //         }
        //       }
        //     }
        //   });
      //         var mylevel2 = document.getElementById(id+"div");
      //         if(mylevel2.innerHTML == ""){
      //           var qa_reviewed = false;
      //
      //           myOBJ.forEach(function(element){
      //             if( (element.QA_Review) || (element.QA_Rating) ){
      //                 qa_reviewed = true;
      //             }
      //           });
      //
      //           const table_headings = `
      //           <div class = " table-responsive">
      //           <table class = "table table-bordered table-striped" id = "review_table">
      //             <thead>
      //             <tr>
      //               <th scope="col">
      //                   <p>  Parameters </p>
      //               </th>
      //               <th scope="col">
      //                   <p>  Self Review </p>
      //               </th>
      //               ${qa_reviewed ? `
      //               <th scope="col">
      //                   <p>  QA Review </p>
      //               </th>
      //               `:``}
      //               <th scope="col">
      //                   <p>  self rating </p>
      //               </th>
      //               ${qa_reviewed ? `
      //               <th scope="col">
      //                   <p>  QA rating </p>
      //               </th>
      //               `: ``}
      //
      //             </tr>
      //             </thead>
      //             <tbody>
      //
      //               ${myOBJ.map(obj => `
      //                     <tr>
      //                       <td scope="col">${obj.Name}</td>
      //                       <td scope="col">
      //                       ${((obj.Own_Review == "")&&(obj.Own_Rating== "")) ?`<textarea id=${"Review"+((obj.Name).split(" ").join(""))} name="Own_Review"></textarea>`:`${obj.Own_Review}`
      //                       }</td>
      //
      //                       ${qa_reviewed ? `
      //                       <td scope="col">
      //                           ${obj.QA_Review}
      //                       </td>
      //                       `:``}
      //
      //                       <td scope="col">
      //                       ${((obj.Own_Review == "")&&(obj.Own_Rating== "")) ?`  <input type="number" id=${"Rating"+((obj.Name).split(" ").join(""))} name="" value= ${obj.Own_Rating}>`:`${obj.Own_Rating}`
      //                       }</td>
      //
      //                       ${qa_reviewed ? `
      //                       <td scope="col">
      //                         ${obj.QA_Rating}
      //                       </td>
      //                       `:``}
      //                       </tr>
      //               `).join('')}
      //
      //
      //           </table>
      //           <br>
      //           <button id = ${id} onclick = "submitlevel1(this.id)" class = "btn btn-primary btn-lg float-right">SUBMIT</button>
      //           </div>
      //           `;
      //
      //
      //           // (mylevel2.parentNode).setAttribute("class","border border-primary");
      //           (mylevel2.parentNode).style.border = "2px solid blue";
      //           (mylevel2.parentNode).style.padding = "20px";
      //           mylevel2.innerHTML = table_headings;
      //         }
      //         else{
      //           mylevel2.innerHTML = "";
      //           (mylevel2.parentNode).style.border = "0";
      //           (mylevel2.parentNode).style.padding = "0";
      //           // mylevel2.innerHTML = table_headings;
      //
      //         }
      // }
      // });
    }
  });
}


function submitlevel1(id){
  //ajax call for level2 parameters

  let response =[];
  myOBJ.forEach(function(element){

    if( (element.Own_Review) || (element.Own_Rating) ){
        // To skip the parameters in which we dont have to update
    }
    else{
      // console.log("level2");
      // console.log(element.level2);

      elementReview = document.getElementById("Review"+(element.level2.split(" ").join(""))).value;
      elementRating = document.getElementById("Rating"+(element.level2.split(" ").join(""))).value;

      if((elementReview && !elementRating) || (!elementReview && elementRating))  {
        // console.log(element.level2);
        //   alert("please enter all values");

      }
      else{
        let myresponse = {
          level1 : id,
          level2 : element.level2,
          Own_Review : document.getElementById("Review"+(element.level2.split(" ").join(""))).value,
          QA_Review : element.QA_Review,
          Own_Rating : document.getElementById("Rating"+(element.level2.split(" ").join(""))).value,
          QA_Rating : element.QA_Rating
        }
        response.push(myresponse);
      }
    }
  });
  // console.log(response);
  document.getElementById(id+"div").innerHTML = "";
  (document.getElementById(id+"div").parentNode).style.border = null;
  (document.getElementById(id+"div").parentNode).style.padding = null;

  // for(var i=0; i<response.length; i++){
    // $.ajax({
    //   "crossDomain": true,
    //   "url": "",
    //   "method": "POST",
    //   "data":JSON.stringify(response[i]),
    //   success: function(res){
    //
    //     console.log("Posted");
    //   }
    // });
  // }
}
