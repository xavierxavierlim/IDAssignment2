
var loginname = sessionStorage.getItem("Name");     // get the Name from either login or signup
var loginpoints = sessionStorage.getItem("Points"); // get the Points from either login or signup

// display login user's name and points
function displayname(){
  document.getElementById("displayData").innerHTML = "Welcome " + loginname;
  document.getElementById("displaypoints").innerHTML = "Points: " + loginpoints;
}

// call function
window.onload = displayname;