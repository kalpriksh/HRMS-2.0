$(document).ready(function(){

    level1 = ["Development", "Growth", "Skills", "blaa"];

    const level1html = `
      <ul>
        ${level1.map(level => `
        <li><a href="#" onclick = "showlevel2(this.id)" id = ${ level}> ${level } </a>
        <div id = ${level + "div"} > </div>
        </li>
      `).join('')}
      </ul>`
    ;
    console.log(mylevel1);
    var mylevel1 = document.getElementById("Level1_list");
    mylevel1.innerHTML = level1html;

});


const myOBJ = [
    {
      level2 : "Technical",
      SelfReview : " Good Job..............",
      QaReview : "dwdwdwewdwekfbwekjvbvkvkvervbebvk brvkjbfekjvbkfevbkjbv jkebvkfevbekvbkvbwkbvkwbvkvbk",
      SelfRating : 8,
      QaRating : ""
    },

    {
      level2 : "Team play",
      SelfReview : " Good Job..............",
      QaReview : "dwdwdwewdwek",
      SelfRating :"8",
      QaRating : ""
    },

    {
      level2 : "Management",
      SelfReview : "",
      QaReview : "",
      SelfRating : "",
      QaRating : ""
    }
  ];

function showlevel2(id){
  //ajax call for level2 parameters
  console.log("id:" + id);

  var qa_reviewed = false;

  myOBJ.forEach(function(element){
    if( (element.QaReview) || (element.QaRating) ){
        console.log("Problem" + element.level2);
        qa_reviewed = true;
    }
    else{
      console.log("Not a problem " + element.level2);
    }
  });

  const table_headings = `
  <div class = " table-responsive">
  <table class = "table table-bordered" id = "review_table">
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
              ${obj.SelfReview == "" ?`<textarea name="SelfReview"></textarea>`:`${obj.SelfReview}`
              }
              </td>

              ${qa_reviewed ? `
              <td scope="col">
                  ${obj.QaReview}
              </td>
              `:``}

              <td scope="col">
              ${obj.SelfReview == "" ?`  <input type="number" name="" value= ${obj.SelfRating}>`:`${obj.SelfRating}`
              }

              </td>

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

  var mylevel2 = document.getElementById(id+"div");
  (mylevel2.parentNode).setAttribute("class","border border-primary");
  (mylevel2.parentNode).style.padding = "20px";
  mylevel2.innerHTML = table_headings;

}


function submitlevel1(id){
  console.log("id: "+ id);
}
