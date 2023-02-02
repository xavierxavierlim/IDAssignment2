$(document).ready(function () {
    const APIKEY = "63b6338c969f06502871a9ca";
    getContacts();
    $("#update-contact-container").hide();
    $("#add-update-msg").hide();
    $(".spinner-border").hide();

    //[STEP 1]: Create our submit form listener
    $("#account-submit").on("click", function (e) {
        //prevent default action of the button 
        e.preventDefault();
    
        //[STEP 2]: let's retrieve form data
        //for now we assume all information is valid
        //you are to do your own data validation
        let name = $("#name").val();
        let username = $("#username").val();
        let password = $("#password").val();
        let repeatPassword = $("#repeat-password").val();

        if (name == ""){
            alert("Name cannot be empty");
            return;
        }
        if (username == ""){
            alert("Username cannot be empty");
        }
        if (password == ""){
            alert("Password cannot be empty");
            return;
        }
        if (repeatPassword == ""){
            alert("Repeat password cannot be empty");
            return
        }
        if (password != repeatPassword){
            alert("Repeat password must match password");
            return;
        }

        //[STEP 3]: get form values when user clicks on send
        //Adapted from restdb api
        let jsondata = {
            "Name": name,
            "Username": username,
            "Password": password,
        };

        //[STEP 4]: Create our AJAX settings. Take note of API key
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://interactivedev-9802.restdb.io/rest/accounts",
            "method": "POST", //[cher] we will use post to send info
            "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata),
            "beforeSend": function(){
            //@TODO use loading bar instead
            $(".spinner-border").show();
            //disable our button or show loading bar
            // $("#account-submit").prop( "disabled", true);
            //clear our form using the form id and triggering it's reset feature
            $("#add-contact-form").trigger("reset");
            }
        }

        //[STEP 5]: Send our ajax request over to the DB and print response of the RESTDB storage to console.
        $.ajax(settings).done(function (response) {
            console.log(response);
            
            $("#account-submit").prop( "disabled", false);
            
            //@TODO update frontend UI 
            $("#add-update-msg").show().fadeOut(3000);
    
            //update our table 
            getContacts();
        });
    
    });//end click

    //[STEP] 6
    //let's create a function to allow you to retrieve all the information in your contacts
    //by default we only retrieve 10 results
    function getContacts(limit = 10, all = true) {

        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://interactivedev-9802.restdb.io/rest/accounts",
            "method": "GET", //[cher] we will use GET to retrieve info
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            },
        }

        //[STEP 8]: Make our AJAX calls
        //Once we get the response, we modify our table content by creating the content internally. We run a loop to continously add on data
        //RESTDb/NoSql always adds in a unique id for each data, we tap on it to have our data and place it into our links 

        $.ajax(settings).done(function (response) {
      
            let content = "";
      
            for (var i = 0; i < response.length && i < limit; i++) {

                content = `${content}
                <tr id='${response[i]._id}'>
                <td>${response[i].name}</td>
                <td>${response[i].username}</td>
                <td>${response[i].password}</td>
                <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td>
                <td><a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-Name='${response[i].name}' data-Username='${response[i].username}' data-Password='${response[i].password}'>Update</a></td></tr>`;
            }    
        
            //[STEP 9]: Update our HTML content
            //let's dump the content into our table body
            $("#contact-list tbody").html(content);

            $("#total-contacts").html(response.length);

            $(".spinner-border").hide();
        });
    }
})