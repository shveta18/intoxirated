$("#createBeer").on("click", function(event){
    event.preventDefault()
    var newBeer = {
        name: $("#name").val().trim(),
        brewer: $("#brewer").val().trim(),
        style: $("#style").val().trim(),
        abv: $("#abv").val().trim(),
        ibu: $("#ibu").val().trim(),
        rating: $("#rating").val()
    }

    $.ajax({
        type: "POST",
        url: "/api/beer",
        data: newBeer
    }).then(function(res) {
        console.log(res)
    })

})
