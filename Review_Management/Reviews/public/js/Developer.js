$(document).ready(function(){

    level1 = ["Development", "Growth", "Skills", "blaa"];

    var mylevel1 = document.getElementById("Level1_list");


    const level1html = `
      <ul>
        ${level1.map(level => `
        <li><a href="#" onclick = "showlevel2(this.id,)" id = ${ level}> ${level } </a>
        <div id = ${level + "div"}></div>
        </li>
      `).join('')}
      </ul>`
    ;
    mylevel1.innerHTML = level1html;

});


const myOBJ = [
    {
      level2 : "Technical",
      SelfReview : " Good Job..............",
      QaReview : "",
      SelfRating : 8,
      QaRating : ""
    },

    {
      level2 : "Team play",
      SelfReview : "wdwdw",
      QaReview : "",
      SelfRating :"10",
      QaRating : ""
    },

    {
      level2 : "Management",
      SelfReview : "",
      QaReview : "Good job",
      SelfRating : "",
      QaRating : "9"
    }
  ];

function showlevel2(id){
  //ajax call for level2 parameters
  var mylevel2 = document.getElementById(id+"div");
  if(mylevel2.innerHTML == ""){
    var qa_reviewed = false;

    myOBJ.forEach(function(element){
      if( (element.QaReview) || (element.QaRating) ){
          qa_reviewed = true;
      }
    });

    const table_headings = `
    <div class = " table-responsive">
    <table class = "table table-bordered table-striped" id = "review_table">
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
            <p>  self rating </p>
        </th>
        ${qa_reviewed ? `
        <th scope="col">
            <p>  QA rating </p>
        </th>
        `: ``}

      </tr>
      </thead>
      <tbody>

        ${myOBJ.map(obj => `
              <tr>
                <td scope="col">${obj.level2}</td>
                <td scope="col">
                ${((obj.SelfReview == "")&&(obj.SelfRating== "")) ?`<textarea id=${"Review"+((obj.level2).split(" ").join(""))} name="SelfReview"></textarea>`:`${obj.SelfReview}`
                }</td>

                ${qa_reviewed ? `
                <td scope="col">
                    ${obj.QaReview}
                </td>
                `:``}

                <td scope="col">
                ${((obj.SelfReview == "")&&(obj.SelfRating== "")) ?`  <input type="number" id=${"Rating"+((obj.level2).split(" ").join(""))} name="" value= ${obj.SelfRating}>`:`${obj.SelfRating}`
                }</td>

                ${qa_reviewed ? `
                <td scope="col">
                  ${obj.QaRating}
                </td>
                `:``}
                </tr>
        `).join('')}


    </table>
    <br>
    <button id = ${id} onclick = "submitlevel1(this.id)" class = "btn btn-primary btn-lg float-right">SUBMIT</button>
    </div>
    `;


    // (mylevel2.parentNode).setAttribute("class","border border-primary");
    (mylevel2.parentNode).style.border = "2px solid blue";
    (mylevel2.parentNode).style.padding = "20px";
    mylevel2.innerHTML = table_headings;
  }
  else{
    mylevel2.innerHTML = "";
    (mylevel2.parentNode).style.border = "0";
    (mylevel2.parentNode).style.padding = "0";
    // mylevel2.innerHTML = table_headings;

  }
}


function submitlevel1(id){
  //ajax call for level2 parameters
  
  let response =[];
  myOBJ.forEach(function(element){

    if( (element.SelfReview) || (element.SelfRating) ){
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
          SelfReview : document.getElementById("Review"+(element.level2.split(" ").join(""))).value,
          QaReview : element.QaReview,
          SelfRating : document.getElementById("Rating"+(element.level2.split(" ").join(""))).value,
          QaRating : element.QaRating
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
