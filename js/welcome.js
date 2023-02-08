
var loginname = sessionStorage.getItem("Name");
var loginpoints = sessionStorage.getItem("Points");

function displayname(){
  document.getElementById("displayData").innerHTML = "Welcome " + loginname;
  document.getElementById("displaypoints").innerHTML = "Points: " + loginpoints;
}

window.onload = displayname;

console.log(window.nnname);
console.log(loginname);