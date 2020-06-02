$("#submit").on("click", function(event){
    event.preventDefault()
    var newWhiskey = {
        name: $("#drinkCategorySelect option:selected").val(),
        manufacturer: $("#manufacturer").val(),
        style: $("#style").val(),
        rating: $("#rating").val()
    }
console.log(newWhiskey);
    $.ajax({
        type: "POST",
        url: "/api/whiskey",
        data: newWhiskey
    }).then(function(res) {
        console.log(res)
    })

})


