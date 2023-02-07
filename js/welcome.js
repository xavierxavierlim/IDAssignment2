var loginname = sessionStorage.getItem("Name");

function displayname(){
  document.getElementById("displayData").innerHTML = "Welcome " + loginname
}

window.onload = displayname;

console.log(window.nnname);
console.log(loginname);