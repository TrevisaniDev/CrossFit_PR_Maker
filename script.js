document.addEventListener("DOMContentLoaded", loadPRs);

function AddPR(){
    let movement = document.getElementById('movement').value;
    let weight = document.getElementById('weight').value;
    if (movement && weight) {
        let prList = document.getElementById('prList');
        let listItem = document.createElement("li");
        listItem.textContent = `${movement}: ${weight} kg`;
        prList.appendChild(listItem);
        savePR(movement, weight);
        document.getElementById('movement').value = "";
        document.getElementById('weight').value = "";
    }
}

function savePR(){
    let prs = JSON.parse(localStorage.getItem("prs")) || [];
    prs.push({ moviment, weight });
    localStorage.setItem("prs", JSON.stringify(prs));
}

function loadPRs(){

}

function Convert(){

}