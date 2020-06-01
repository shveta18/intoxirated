$("#createWhiskey").on("click", function(event){
    event.preventDefault()
    var newWhiskey = {
        name: $("#name").val().trim(),
        manufacturer: $("#manufacturer").val().trim(),
        style: $("#style").val().trim(),
        rating: $("#rating").val()
    }

    $.ajax({
        type: "POST",
        url: "/api/whiskey",
        data: newWhiskey
    }).then(function(res) {
        console.log(res)
    })

})


