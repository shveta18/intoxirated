$("#createWine").on("click", function(event){
    event.preventDefault()
    var newWine = {
        name: $("#name").val().trim(),
        manufacturer: $("#manufacturer").val().trim(),
        style: $("#style").val().trim(),
        year: $("#year").val().trim(),
        rating: $("#rating").val()
    }

    $.ajax({
        type: "POST",
        url: "/api/wine",
        data: newWine
    }).then(function(res) {
        console.log(res)
    })

})


