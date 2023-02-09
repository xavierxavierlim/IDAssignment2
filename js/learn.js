$(document).ready(function() {
  $("#quiz-submit").on("click", function (e) {
      e.preventDefault();
  
      const APIKEY = "63ddca833bc6b255ed0c4632";
  
      var score = 0;
      var answers = ["d", "a", "d", "d", "a", "a", "d", "c", "d", "b"]; // correct answers 
      var inputs = document.querySelectorAll("input[type='radio']:checked"); // retrieve the checked radio options
      for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value == answers[i]) { // check if the input is same as the correct answers 
        score++; // if correct add 1
      }
      }
      alert("You scored " + score + " out of " + answers.length);  // display an alert to show the points
  
      $("input[type='radio']:checked").prop("checked", false); // after submit reset all the options


      var retrieveSettings = {
      "async": true,
      "crossDomain": true,
      "url": "https://interactivedev-0fcf.restdb.io/rest/accounts",
      "method": "GET", // get the data from the database
      "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
      }
      }
  
      $.ajax(retrieveSettings).done(function (response) {
      // Parse the response to get the necessary values for "Name", "Username", and "Password"
          let name = response[0].Name; // retrieve the name 
          let username = response[0].Username; // retrieve the username 
          let password = response[0].Password; // retrieve password
      
          let jsondata = {
              "Name": name,
              "Username": username,
              "Password": password,
              "Points": score
          };
      
          var updateSettings = {
              "async": true,
              "crossDomain": true,
              "url": `https://interactivedev-0fcf.restdb.io/rest/accounts/${id}`,
              "method": "PUT", // put the data into the database
              "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
              },
              "processData": false,
              "data": JSON.stringify(jsondata)
          }
      
          $.ajax(updateSettings).done(function (response) {
              console.log(response);
          });
      });
  });
})