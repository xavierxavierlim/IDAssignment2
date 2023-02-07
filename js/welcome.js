var loginname = sessionStorage.getItem("Name");

function displayname(){
  document.getElementById("displayData").innerHTML = loginname
}

window.onload = displayname;

console.log(window.nnname);
console.log(loginname);