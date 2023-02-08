
// $(document).ready(function () {
//     const APIKEY = "63ddca833bc6b255ed0c4632";
//     getContacts();
//     $("#update-contact-container").hide();
//     // $("#add-update-msg").hide();
//     $(".dots").hide();

//     //[STEP 1]: Create our submit form listener
//     $("#account-submit").on("click", function (e) {
//         //prevent default action of the button 
//         e.preventDefault();
    
//         //[STEP 2]: let's retrieve form data
//         //for now we assume all information is valid
//         //you are to do your own data validation
//         let name = $("#name").val();
//         let username = $("#username").val();
//         let password = $("#password").val();
//         let repeatPassword = $("#repeat-password").val();

//         if (name == ""){
//             alert("Name cannot be empty");
//             return;
//         }
//         if (username == ""){
//             alert("Username cannot be empty");
//             return;z
//         }
//         if (password == ""){
//             alert("Password cannot be empty");
//             return;
//         }
//         if (password.length < 10){
//             alert("Password length must be 10 characters or more");
//             return;
//         }
//         if (repeatPassword == ""){
//             alert("Repeat password cannot be empty");
//             return;
//         }
//         if (password != repeatPassword){
//             alert("Repeat password must match password");
//             return;
//         }

//         //[STEP 3]: get form values when user clicks on send
//         //Adapted from restdb api
//         let jsondata = {
//             "Name": name,
//             "Username": username,
//             "Password": password,
//         };

//         //[STEP 4]: Create our AJAX settings. Take note of API key
//         let settings = {
//             "async": true,
//             "crossDomain": true,
//             "url": "https://interactivedev-0fcf.restdb.io/rest/accounts",
//             "method": "POST", //[cher] we will use post to send info
//             "headers": {
//             "content-type": "application/json",
//             "x-apikey": APIKEY,
//             "cache-control": "no-cache"
//             },
//             "processData": false,
//             "data": JSON.stringify(jsondata),
//             "beforeSend": function(){
//             //use loading dots instead
//             $(".dots").show();
//             //disable our button or show loading bar
//             // $("#account-submit").prop( "disabled", true);
//             //clear our form using the form id and triggering it's reset feature
//             $("#add-contact-form").trigger("reset");
//             }
//         }

//         //[STEP 5]: Send our ajax request over to the DB and print response of the RESTDB storage to console.
//         $.ajax(settings).done(function (response) {
//             console.log(response);
            
//             $("#account-submit").prop("disabled", false);
            
//             //@TODO update frontend UI 
//             // $("#add-update-msg").show()
    
//             //update our table 
//             getContacts();
//         });
    
//     });//end click

//     //[STEP] 6
//     //let's create a function to allow you to retrieve all the information in your contacts
//     //by default we only retrieve 10 results
//     function getContacts(limit = null, all = true) {

//         //[STEP 7]: Create our AJAX settings
//         let settings = {
//             "async": true,
//             "crossDomain": true,
//             "url": "https://interactivedev-0fcf.restdb.io/rest/accounts",
//             "method": "GET", //[cher] we will use GET to retrieve info
//             "headers": {
//               "content-type": "application/json",
//               "x-apikey": APIKEY,
//               "cache-control": "no-cache"
//             },
//         }

//         //[STEP 8]: Make our AJAX calls
//         //Once we get the response, we modify our table content by creating the content internally. We run a loop to continously add on data
//         //RESTDb/NoSql always adds in a unique id for each data, we tap on it to have our data and place it into our links 

//         $.ajax(settings).done(function (response) {
      
//             let content = "";
      
//             for (var i = 0; i < response.length && i < limit; i++) {

//                 content = `${content}
//                 <tr id='${response[i]._id}'>
//                 <td>${response[i].name}</td>
//                 <td>${response[i].username}</td>
//                 <td>${response[i].password}</td>
//                 <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td>
//                 <td><a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-Name='${response[i].name}' data-Username='${response[i].username}' data-Password='${response[i].password}'>Update</a></td></tr>`;
//             }    
        
//             //[STEP 9]: Update our HTML content
//             //let's dump the content into our table body
//             $("#contact-list tbody").html(content);

//             $("#total-contacts").html(response.length);

//             $(".dots").hide();

//             alert("You have succesfully registered for an account");
//         });
//     }

//     //new code 
//     var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://interactivedev-0fcf.restdb.io/rest/accounts",
//         "method": "GET",
//         "headers": {
//           "content-type": "application/json",
//           "x-apikey": APIKEY,
//           "cache-control": "no-cache"
//         }
//     }
    
//     $.ajax(settings).done(function (response) {
//         var usernameExists = response.some(function(item) {
//             return item.Username === $('#username').val();
//         });
        
//         if (usernameExists) {
//             console.log("reached this stage");
//             alert("This username already exists in the database.");
//             $("#dots").hide();
//             $("#username-warning").show();
//         }
//     });

//     $.ajax(settings).done(function (response) {
//         if (response.length > 0) {
//             alert("This username is already taken");
//             $("#dots").hide();
//             $("#username-warning").show();
//         }
//     })

// })

$(document).ready(function () {

    const APIKEY = "63ddca833bc6b255ed0c4632";
    //getContacts();
    //$("#update-contact-container").hide();
    // $("#add-update-msg").hide();
    $(".dots").hide();

    $("#account-submit").on("click", function (e) {
        e.preventDefault();

        $(".dots").show();
        let name = $("#name").val();
        let username = $("#username").val();
        let password = $("#password").val();
        let repeatPassword = $("#repeat-password").val();

        // Input validation
        if (name == "") {
            alert("Name cannot be empty");
            return;
        }
        if (username == "") {
            alert("Username cannot be empty");
            return;
        }
        if (password == "") {
            alert("Password cannot be empty");
            return;
        }
        if (password.length < 10) {
            alert("Password length must be 10 characters or more");
            return;
        }
        if (repeatPassword == "") {
            alert("Repeat password cannot be empty");
            return;
        }
        if (password != repeatPassword) {
            alert("Repeat password must match password");
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
                if (response[i].Username === username) {
                    exists = true;
                    break;
                }
            }

            if (exists) {
                alert("Username already exists. Please choose another one.");
                $(".dots").hide();
                return;
            } else {
                let jsondata = {
                    "Name": name,
                    "Username": username,
                    "Password": password,
                };
                jsondata.Points = 0;

                let settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://interactivedev-0fcf.restdb.io/rest/accounts",
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "x-apikey": APIKEY,
                        "cache-control": "no-cache"
                    },
                    "processData": false,
                    "data": JSON.stringify(jsondata),
                    "beforeSend": function () {
                        // $(".dots").show();
                        alert("Sucessfully registered for an account");
                        $(".dots").hide();
                        
                        $("#add-contact-form").trigger("reset");

                        
                        
                    }
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);
                    
                    $("#account-submit").prop("disabled", false);
                    window.location = "../html/home.html";
                    //@TODO update frontend UI 
                    // $("#add-update-msg").show()

                    //update our table 
                    //getContacts();
                    var signinname = name
                    sessionStorage.setItem("Name",signinname);
                    console.log(signinname);
                });    
            }
        })
    })
})