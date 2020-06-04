// User clicks the submit button to check current results. 
$("#submit").on("click", function(event){
    event.preventDefault();
    var newWhiskey = {
        drinktype: $("#drinkCategorySelect option:selected").val(),
        name: $("#name").val(),
        manufacturer: $("#manf-brew-dist").val(),
        style: $("#style").val(),
        rating: $("#rating").val()
    }
console.log(newWhiskey);
//Create a GET requeset to api-routes.js and get results from Database.
$.ajax({
    method: "GET",
    dataType: "JSON",
    url: "/api/search",
    data: newWhiskey
}).then(function(res) {
    console.log(res);
    // we will get a result back. I want to show into a nice table on the same page, i.e empty container. 
    // first create a table within the index.handlebars
    /*
    res = [
        {
            name: "Asas",
            age: "asda"
        },
        ...
    ]
    */
});

});
//using the above search criteria, query the SQL dB. 




    // $.ajax({
    //     type: "POST",
    //     url: "/api/whiskey",
    //     data: newWhiskey
    // }).then(function(res) {
    //     console.log(res)
    // });



