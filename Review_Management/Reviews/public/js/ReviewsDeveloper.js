$(document).ready(function(){

  // $.ajax({
  //   "async": false,
  //   "crossDomain": true,
  //   "url": "http://localhost:3333/api/skills/Allskills",  // To add skills in the Select2
  //   "method": "GET",
  //   "data":"",
  //   success: function(res){
  //
  //
  //   }
  // });
    //  ajax call for level 1
    level1 = ["Development", "growth", "Skills", "blaa"];
    var myul = document.getElementById("Level1_list");
    for(var i=0; i<level1.length; i++){
      var list = document.createElement("li");
      var anchor = document.createElement("a");
      anchor.innerHTML = level1[i];
      anchor.innerHTML = anchor.innerHTML + " + ";
      anchor.setAttribute("href","#");
      anchor.setAttribute("id", level1[i]);
      anchor.setAttribute("onclick","ShowMore(this.id)");
      list.appendChild(anchor);
      // console.log(level1[i]);
      myul.appendChild(list);
    }

});

const myOBJ = [
    {
      level2 : "Tecnical",
      SelfReview : " Good Job..............",
      QaReview : "",
      SelfRating : 8,
      QaRating : ""
    },

    {
      level2 : "team play",
      SelfReview : " Good Job..............",
      QaReview : " wwdhwbdw",
      SelfRating :"8",
      QaRating : "10"
    },

    {
      level2 : "management",
      SelfReview : "",
      QaReview : "",
      SelfRating : "",
      QaRating : ""
    }
  ];

function ShowMore(ide){
  //ajax call for level2 parameters
  console.log("ide:" + ide);

  var mylevel2 = document.getElementById("level2");
  var qa_reviewed = false;

  myOBJ.forEach(function(element){
    if( (element.QaReview) || (element.QaRating) ){
        console.log("Problem" + element.level2);
        qa_reviewed = true;
    }
    else{
      console.log("Not a problem " + element.level2);
    }
  })

  console.log(myOBJ);

  const table_headings = `
  <table id = "review_table">
    <tr class="row">
      <th class="col-sm-2 col-xs-2">
          <p>  Parameters </p>
      </th>
      <th class=${qa_reviewed ? `"col-sm-3 col-xs-3"`: `"col-sm-6 col-xs-6"`}>
          <p>  Self Review </p>
      </th>
      ${qa_reviewed ? `
      <th class= "col-sm-3 col-xs-3">
          <p>  QA Review </p>
      </th>
      `:``}
      <th class=${qa_reviewed ? `"col-sm-1 col-xs-1"`: `"col-sm-2 col-xs-2"`}>
          <p>  self rating </p>
      </th>
      ${qa_reviewed ? `
      <th class= "col-sm-1 col-xs-1">
          <p>  QA rating </p>
      </th>
      `: ``}
      <th class="col-sm-2 col-xs-2">
          <p>  Submit </p>
      </th>
    </tr>


      ${myOBJ.map(obj => `
            <tr class = "row">
              <td class="col-sm-2 col-sm-2">${obj.level2}</td>

              <td class=${qa_reviewed ? `"col-sm-3 col-xs-3"`: `"col-sm-6 col-xs-6"`}>
                <textarea name="SelfReview" >
                  ${obj.SelfReview}
                </textarea>
              </td>

              ${qa_reviewed ? `
              <td class= "col-sm-3 col-xs-3">
                  ${obj.QaReview}
              </td>
              `:``}

              <td class=${qa_reviewed ?  `"col-sm-1 col-xs-1"`: `"col-sm-2 col-xs-2"`}>
                <input type="number" name="" value= ${obj.SelfRating}>
              </td>

              ${qa_reviewed ? `
              <td class= "col-sm-1 col-xs-1">
                ${obj.QaRating}
              </td>
              `:``}

              <td class="col-sm-2 col-xs-2">
                <button type="button" name="button">Submit</button>
              </td>

              </tr>
      `).join('')}


  </table>
  `;

  mylevel2.innerHTML = table_headings;

}
