const navigation = document.getElementsByTagName("header")[0];
const mainSection = document.getElementById("mainSection");
const resultSection = document.getElementById("resultSection");
const resultText = document.getElementById("resultText");
const resultCategories = document.getElementById("resultCategories");

// Method used to display evaluation results and change layout structure
const displayResults = (data) => {
  if (data) {
    navigation.classList.remove("hidden");
    navigation.classList.add("visible");
    mainSection.classList.remove("column");
    mainSection.classList.add("row");

    resultSection.classList.remove("hidden");
    resultSection.classList.add("visible");
    resultText.innerHTML = data.text;

    let fragment = document.createDocumentFragment();
    let table = document.createElement("table");
    let tableBody = document.createElement("tbody");

    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.appendChild(document.createTextNode("Label"));
    tr.appendChild(td);
    td = document.createElement("td");
    td.appendChild(document.createTextNode("Confidence"));
    tr.appendChild(td);
    tableBody.appendChild(tr);

    if (data["categories"].length > 0) {
      for (let i = 0; i < data["categories"].length; i++) {
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.appendChild(document.createTextNode(data["categories"][i].label));
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createTextNode(data["categories"][i].confidence));
        tr.appendChild(td);
        tableBody.appendChild(tr);
      }
    } else {
      tr = document.createElement("tr");
      td = document.createElement("td");
      td.setAttribute("colSpan", "2");
      td.appendChild(document.createTextNode("We could not classify this news article"));
      tr.appendChild(td);
      tableBody.appendChild(tr);
    }
    table.appendChild(tableBody);

    fragment.appendChild(table);
    resultCategories.appendChild(fragment);
  }

};

export { displayResults }
