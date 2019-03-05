var mylevel2 = document.getElementById(id+"div");
if(mylevel2.innerHTML == ""){
  var self_reviewed = false;

  myOBJ.forEach(function(element){
    if( (element.QaReview) || (element.QaRating) ){
        self_reviewed = true;
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
      ${self_reviewed ? `
      <th scope="col">
          <p>  Self Review </p>
      </th>
      `:``}
      <th scope="col">
          <p>  QA Review </p>
      </th>
      ${self_reviewed ? `
      <th scope="col">
          <p>  Self rating </p>
      </th>
      `: ``}
      <th scope="col">
          <p>  QA rating </p>
      </th>


    </tr>
    </thead>
    <tbody>

      ${myOBJ.map(obj => `
            <tr>
              <td scope="col">${obj.level2}</td>

              ${self_reviewed ? `
              <td scope="col">
                  ${obj.SelfReview}
              </td>
              `:``}

              <td scope="col">
              ${((obj.QaReview == "")&&(obj.QaRating== "")) ?`<textarea id=${"Review"+((obj.level2).split(" ").join(""))} name="QaReview"></textarea>`:`${obj.QaReview}`
              }
              </td>


              ${self_reviewed ? `
              <td scope="col">
                ${obj.SelfRating}
              </td>
              `:``}

              <td scope="col">
              ${((obj.QaReview == "")&&(obj.QaRating== "")) ?`  <input type="number" id=${"Rating"+((obj.level2).split(" ").join(""))} name="" value= ${obj.QaRating}>`:`${obj.QaRating}`
              }

              </td>



            </tr>
      `).join('')}


  </table>
  <br>
  <button id = ${id} onclick = "submitlevel1(this.id)" class = "btn btn-primary btn-lg float-right">SUBMIT</button>
  </div>
  `;


  (mylevel2.parentNode).style.border = "2px solid blue";
  (mylevel2.parentNode).style.padding = "20px";
  mylevel2.innerHTML = table_headings;
}
else{
  mylevel2.innerHTML = "";
  (mylevel2.parentNode).style.border = "0";
  (mylevel2.parentNode).style.padding = "0";
}
