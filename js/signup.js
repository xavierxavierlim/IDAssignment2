$(document).ready(function () {

    const APIKEY = "63ddca833bc6b255ed0c4632";
    
    $(".dots").hide(); // hide the lottie animation

    $("#account-submit").on("click", function (e) {
        e.preventDefault();

        $(".dots").show(); // show the lottie animation
        let name = $("#name").val(); // get the user input for name field
        let username = $("#username").val(); // get the username input for the username field
        let password = $("#password").val(); // get the password input for the password field
        let repeatPassword = $("#repeat-password").val(); // get the repeat repeat input for the repeat password field

        // Input validation
        if (name == "") { // if name empty 
            alert("Name cannot be empty");
            $(".dots").hide(); // hide the lottie animation
            return;
        }
        if (username == "") { // if username empty 
            alert("Username cannot be empty");
            $(".dots").hide(); // hide the lottie animation
            return;
        }
        if (password == "") { // if password empty
            alert("Password cannot be empty");
            $(".dots").hide(); // hide the lottie animation
            return;
        }
        if (password.length < 10) { // if password length less than 10
            alert("Password length must be 10 characters or more");
            $(".dots").hide(); // hide the lottie animation
            return;
        }
        if (repeatPassword == "") { // if repeat password length empty 
            alert("Repeat password cannot be empty");
            $(".dots").hide(); // hide the lottie animation
            return;
        }
        if (password != repeatPassword) {
            alert("Repeat password must match password");
            $(".dots").hide(); // hide the lottie animation
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
                if (response[i].Username === username) { // if username input exists in the database
                    exists = true; 
                    break;
                }
            }

            if (exists) { // if username input exists in the database
                alert("Username already exists. Please choose another one.");
                $(".dots").hide(); // hide the lottie 
                return;
            } else { // if username input does not exist in the database
                let jsondata = {
                    "Name": name,
                    "Username": username,
                    "Password": password
                };
                jsondata.Points = 0; // set the points of new accounts to 0

                let settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://interactivedev-0fcf.restdb.io/rest/accounts",
                    "method": "POST", // post the sign up inputs to the database
                    "headers": {
                        "content-type": "application/json",
                        "x-apikey": APIKEY,
                        "cache-control": "no-cache"
                    },
                    "processData": false,
                    "data": JSON.stringify(jsondata),
                    "beforeSend": function () {
                        alert("Sucessfully registered for an account");
                        $(".dots").hide(); // hide the lottie animation
                        
                        $("#add-contact-form").trigger("reset");

                        
                        
                    }
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);
                    
                    $("#account-submit").prop("disabled", false); 
                    window.location = "../html/home.html"; // direct users to the home page
                    //@TODO update frontend UI 
                    // $("#add-update-msg").show()

                    //update our table 
                    //getContacts();
                    var signinname = name                           // give a var to the input name
                    sessionStorage.setItem("Name",signinname);      // set session storage with var "Name" to the input name
                    // console.log(signinname);
                });    
            }
        })
    })
})