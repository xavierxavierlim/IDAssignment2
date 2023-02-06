const endpoint = "https://interactivedev-0fcf.restdb.io/rest/accounts";
const apiKey = "63ddca833bc6b255ed0c4632";

fetch(endpoint, {
  method: "GET",
  headers: {
    "x-apikey": apiKey
  }
})
  .then(res => res.json())
  .then(data => {
    let Name = "";
    data.forEach(element => {
      Name += `<p>Welcome, ${element.Name}</p>`;
    });
    document.getElementById("displayData").innerHTML = Name;
  })
  .catch(err => console.error(err));