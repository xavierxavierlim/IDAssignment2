$(document).ready(function () {

    // Get the modal
    var modal = document.getElementById('login');

    // close the modal when user clicks anywhere on it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    const APIKEY = "63ddca833bc6b255ed0c4632";

    $(".dots").hide(); // hide the lottie

    $("#account-login").on("click", function (e) {
        e.preventDefault();

        $(".dots").show(); // show the lottie 
        let username = $("#username").val(); // take the value of username input 
        let password = $("#password").val(); // take the value of password input 

        // Input validation
        if (username == "") { // check if username input is blank
            alert("Username cannot be empty");
            $(".dots").hide(); // hide the lottie
            return;
        }
        if (password == "") { // check if the password input is blank
            alert("Password cannot be empty");
            $(".dots").hide(); // hide the lottie
            return;
        }

        // Get all accounts
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://interactivedev-0fcf.restdb.io/rest/accounts",
            "method": "GET", // get the data from the database
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
                    exists = true; // if username and password match with the database 
                    $(".dots").hide(); // hide the lottie 
                    window.location = "../html/home.html"; // direct user to home page
                    var nnname = response[i].Name; // take the name from the response array 
                    var points = response[i].Points; // take the points from the response array 
                    // window.points = response[i].Points; 
                    // window.nnname = response[i].Name;
                    sessionStorage.setItem("Points",points); // set the session storage points to the response points
                    sessionStorage.setItem("Name",nnname); // set the session storage points to the response name
                    // console.log(points); 
                }
            }

            if (exists == false){ // if username and password dont match with database
                $(".dots").hide(); // hide the lottie 
                alert("Incorrect username or password");
                $("#username").val(""); // after submit empty out the boxes
                $("#password").val(""); // after submit empty out the boxes
                return; 
            }
        });
    });  
});
