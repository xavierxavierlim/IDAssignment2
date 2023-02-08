$("#quiz-submit").on("click", function (e) {
    e.preventDefault();
  
    const APIKEY = "63ddca833bc6b255ed0c4632";
  
    var score = 0;
    var answers = ["d", "a", "d", "d", "a", "a", "d", "c", "d", "b"];
    var inputs = document.querySelectorAll("input[type='radio']:checked");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value == answers[i]) {
        score++;
      }
    }
    alert("You scored " + score + " out of " + answers.length);
  
    $("input[type='radio']:checked").prop("checked", false);


    var retrieveSettings = {
      "async": true,
      "crossDomain": true,
      "url": "https://interactivedev-0fcf.restdb.io/rest/accounts",
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      }
    }
  
    $.ajax(retrieveSettings).done(function (response) {
      // Parse the response to get the necessary values for "Name", "Username", and "Password"
      let name = response[0].Name;
      let username = response[0].Username;
      let password = response[0].Password;
  
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
        "method": "PUT",
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
  