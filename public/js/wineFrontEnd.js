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


$("#submit").on("click", function(event) {
    event.preventDefault()
    var type = $("#drinkCategorySelect").val()
    if(type === "Wine") {
        var theWine = {
            name: $("#name").val().trim(),
            manufacturer: $("#manf-brew-dist").val().trim(),
            style: $("#style").val().trim()
        }

        $.ajax({
            method: "GET",
            dataType: "JSON",
            url: "/wine-search",
            data: theWine
        }).then(function(res) {
            console.log(res)
            $("#results").empty()
            if(res.length > 0) {
                for (let i = 0; i < res.length; i++) {
                    var wineDiv = $("<div>")
                    var data = res[i]
                    wineDiv.text("Name: " + data.name + ".   Manufacturer: " + data.manufacturer + ".   Style: " + data.style + ".   Year: " + data.year + ".   Rating: " + data.rating)
                    var selfRating = $("<button>")
                    selfRating.addClass("selfRating")
                    selfRating.text("Add your own rating?")
                    wineDiv.append(selfRating)
                    $("#results").append(wineDiv)
                }
            } else {
                $("#wantToAdd").show()
            }
        })
    }
})
