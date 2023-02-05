// Get the modal
var modal = document.getElementById('login');
                
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


$(document).ready(function () {

    const APIKEY = "63ddca833bc6b255ed0c4632";
    //getContacts();
    //$("#update-contact-container").hide();
    // $("#add-update-msg").hide();
    $(".dots").hide();

    $("#account-login").on("click", function (e) {
        e.preventDefault();

        $(".dots").show();
        let username = $("#username").val();
        let password = $("#password").val();

        // Input validation
        if (username == "") {
            alert("Username cannot be empty");
            return;
        }
        if (password == "") {
            alert("Password cannot be empty");
            return;
        }

        // Get all accounts
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://interactivedev-0fcf.restdb.io/rest/accounts",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
        };

        $.ajax(settings).done(function (response) {
            // Check if username already exists
            
            let exists = false;
            for (var i = 0; i < response.length; i++) {
                if (response[i].Username === username && response[i].Password === password) {
                    exists = true;
                    $(".dots").hide();
                    window.location = "../html/home.html";
                    break;
                }
            }

            if (exists == false){
                $(".dots").hide();
                alert("Incorrect username or password");
                $("#username").val("");
                $("#password").val("");
                return;
            }
        })
    })  
})