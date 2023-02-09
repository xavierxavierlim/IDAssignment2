


$(document).ready(function () {

    // Get the modal
    var modal = document.getElementById('login');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

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
            $(".dots").hide();
            return;
        }
        if (password == "") {
            alert("Password cannot be empty");
            $(".dots").hide();
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

        // // Retrieve the points for the matching user
        // let userId = response[i]._id;
        // let pointSettings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": `https://interactivedev-0fcf.restdb.io/rest/points/${userId}`,
        //     "method": "GET",
        //     "headers": {
        //         "content-type": "application/json",
        //         "x-apikey": APIKEY,
        //         "cache-control": "no-cache"
        //     },
        // };

        $.ajax(settings).done(function (response) {
            // Check if username already exists
            
            let exists = false;
            for (var i = 0; i < response.length; i++) {
                if (response[i].Username === username && response[i].Password === password) {
                    exists = true;
                    $(".dots").hide();
                    window.location = "../html/home.html";
                    var nnname = response[i].Name;
                    var points = response[i].Points;
                    window.points = response[i].Points;
                    window.nnname = response[i].Name;
                    sessionStorage.setItem("Points",points);
                    sessionStorage.setItem("Name",nnname);
                    console.log(points);
                }
            }



            // $.ajax(pointSettings).done(function (pointResponse) {
            //     let points = pointResponse.Points;
            //     // Do something with the points
            //     window.loginpoints = points;
            //     sessionStorage.setItem("Points",points);
            //     console.log("Yes")
            //     console.log(points);
            // });

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
