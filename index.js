$(document).ready(function(){
    console.log("Ready!");

    $('#go').on("click", function(event){
        var fullName = $("#fname").val() + " " + $("#lname").val();
        $("#jumbotron").html(fullName);
        return false;
    })
})

