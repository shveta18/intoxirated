console.log("landing page")

$("#signUp").on("click", function(event) {
    event.preventDefault()
    var newUser = {
        name: $("#username").val().trim(),
        password: $("#password").val().trim()
    }
    $.ajax({
        type: "POST",
        url: "/api/user",
        data: newUser
    }).then(function(res) {
        console.log(res)
    })
})