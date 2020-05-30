$("#createWine").on("click", function(){
    var newWine = {
        name: $("#name").val().trim(),
        manufacturer: 
    }
})


$.ajax({
    type: "POST",
    url: "/api/wine",
    data: {
        name: "Green Wine",
        manufacturer: "Steve",
        year: 1885,
        rating: 2
    }
}).then(function(res) {
    console.log(res)
})