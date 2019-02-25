$(document).ready(()=>{
  console.log("obj");
  $(".dropdown-item").click((e)=>{
    console.log(e.target.innerHTML);
    const project = e.target.innerHTML;

    ///AJAX CALL for that project
    $()

    const data = [
      {"name":"KB","role":"Team Lead","email":"test@abc.com"},
      {"name":"Sahil","role":"Deveoper","email":"test@abc.com"},
    ];

    var table = document.createElement('table');
    var row = document.createElement('tr');


    var th = ["Name","Role","Email","   "];
    for(var j=0; j<th.length;j++){
      var cell = document.createElement('th');
      var cellText = document.createTextNode(th[j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    table.appendChild(row);
    for(var i=0;i<data.length;i++){
      var row = document.createElement('tr');
      for(var key in data[i]){
        var cell = document.createElement('td');
        var cellText = document.createTextNode(data[i][key]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }

      var celld = document.createElement('td');

          //Creating Edit button
          if(true){
            var edit = document.createElement('i');
            edit.setAttribute('class','fas fa-pencil-alt edit');
            edit.setAttribute('style','font-size:24px');
            celld.appendChild(edit);
            row.appendChild(celld);
          }


      table.appendChild(row);
    }


            var body = $(".container-table");
            body[0].appendChild(table);
            table.setAttribute("class","table");

            var h5 = document.createElement('h5');
            var textNode = document.createTextNode('Enter your experience :')
            h5.appendChild(textNode);
            h5.setAttribute("class","center mt-5");
            body[0].appendChild(h5);

            var txtarea = document.createElement('textarea');
            txtarea.setAttribute("rows","3");
            txtarea.setAttribute("cols","50");
            txtarea.setAttribute("id","txt")

            body[0].appendChild(txtarea);

            executeThis(1,1);

            var rating = document.createElement('div');


            var txt = document.createElement('h6');
            var scoretext = document.createTextNode('Rating');
            txt.appendChild(scoretext);
            txt.setAttribute("id","rating-text");
            rating.appendChild(txt);



            var slider = document.createElement('input');
            slider.setAttribute('type','range');
            slider.setAttribute('min','1');
            slider.setAttribute('max','5');
            slider.setAttribute('class','slider mr-3');
            slider.setAttribute('id','rating');
            rating.appendChild(slider);

            var score = document.createElement('p');
            var scoretext = document.createTextNode('5');
            score.appendChild(scoretext);
            score.setAttribute("id","score");
            rating.appendChild(score);

            body[0].appendChild(rating);



            //postReview(proId,revID,review);--------------to update the posted review

            var button = document.createElement('button');
            var textNode = document.createTextNode("Submit");
            button.appendChild(textNode);
            button.setAttribute("class","center-btn btn mr-1");
            button.setAttribute("id","submit");
            body[0].appendChild(button);


            var button = document.createElement('button');
            var textNode = document.createTextNode("Clear");
            button.appendChild(textNode);
            button.setAttribute("class","center-btn btn");
            button.setAttribute("id","reset");
            body[0].appendChild(button);


            $('#reset').click((e)=>{
              console.log("clear");
              document.getElementById("txt").value=""
            });

            $("#rating").change(function(){
              var newval=$(this).val();
              console.log("rating",newval);
              $("#score").text(newval);
            });

            $(function(){
                    $('#submit').click(function() {
                      var txtId=document.getElementById("txt").value;
                      // console.log(txtId);
                    postReview(1,1,txtId);
          });
          });


  });
});


function executeThis(proId,reviId)
{

   console.log("reached");
  var user;
  myData = {
    "RevieweeId":proId,
    "ProjectId":reviId
  };

$.ajax({

						          type: 'POST',
						          data: JSON.stringify(myData),
				              contentType: 'application/json',
                        url: 'http://localhost:3000/reviewee',
                        success: function(data) {
                            console.log('success');
                            // console.log(JSON.stringify(data));
                            user = JSON.stringify(data);
                            console.log(user);
                            var x=document.getElementById("txt")
                          x.innerHTML=data[0].Content;

                            // console.log(user);
                        }

      });
      // console.log(user);

    }


    function postReview(proId,revId,review)
    {
      console.log("jfyg");

      myData = {
      "ProjectId":proId,
      //"Content":document.getElementById("txt").value,
      "RevieweeId":revId,
      "Content":review
    };

    $.ajax({

    						          type: 'POST',
    						          data: JSON.stringify(myData),
    				              contentType: 'application/json',
                            url: 'http://localhost:3000/updateReview',
                            success: function(data) {
                                console.log("should update now");
                                // console.log(JSON.stringify(data));
                                // user = JSON.stringify(data);
                                // console.log(user);
                                // var x=document.getElementById("txt")
                                // x.innerHTML=data[0].Content;

                                // console.log(user);
                            }

          });
          // console.log(user);

        }
