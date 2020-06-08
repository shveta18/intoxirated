<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
    integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
    crossorigin="anonymous"></script>
  <script src="https://kit.fontawesome.com/bb6539ba94.js" crossorigin="anonymous"></script>
 
    // When user searches for a beverage within their profile (my ratings page), the request must send this data to api routes and query the sql db.
    $("#submit").on("click", function (event) {
      event.preventDefault();
      $("#wantToAdd").hide();
      $("#results").show();
      var drinkSearch = {
        category: $("#drinkCategorySelect option:selected").val(),
        name: $("#name").val(),
        manufacturer: $("#manf-brew-dist").val(),
        style: $("#style").val(),
        rating: $("#rating").val()
      }
      console.log(drinkSearch);
      //Create a GET requeset to api-routes.js and get results from Database.
      $.ajax({
        method: "GET",
        dataType: "JSON",
        url: "/api/search",
        data: drinkSearch,
        xhrFields: {
          withCredentials: true
        }
      }).then(function (res) {
        console.log("The result from SQL is: ");
        console.log(res);
        // empty out the results div
        $("#results-table").empty();
        if (res.isUserLoggedIn === false) {
          // we redirect to login page
          $(location).attr('href', '/');
        } else {
          // if user is logged in display data.
          console.log("Search results have data and it will display on screen");
          // If sql contains data, display, else show the want to add your record link.
          if (res != null && res != '' && res != []) {
            console.log("data array is not empty so populate table now");
            $("#results").show();
            //var table = document.getElementById("results-table");
            // ADD CODE TO LOOP THROUGH ARRAY AND DISPLAY RESULTS
            for (var i = 0; i < res.length; i++) {
              var row = `<tr>
                        <td>${i+1}</td>
                        <td>${res[i].category}</td>
                        <td>${res[i].name}</td>
                        <td>${res[i].manufacturer}</td>
                        <td>${res[i].style}</td>
                        <td>${res[i].rating}</td>
                      </tr>`

              //table.innerHTML += row;
              $("#results-table").append(row);

            }
          }
          else {
            $("#wantToAdd").show();
          }
        }
      });
    });


    // When user submits NEW RATING / ADD NEW RECORD AND RATING
    $("#submit-rating").on("click", function (event) {
      event.preventDefault();
      var addNewRating = {
        category: $("#add-category option:selected").val(),
        name: $("#add-name").val(),
        manufacturer: $("#add-manf-brew-dist").val(),
        style: $("#add-style").val(),
        rating: $("input:radio[name='rating']:checked").val()
      }
      console.log(addNewRating);
      $.ajax({
        type: "POST",
        url: "/api/rate",
        data: addNewRating,
        xhrFields: {
          withCredentials: true
        }
      }).then(function (res) {
        console.log(res)
      });

    });
  
