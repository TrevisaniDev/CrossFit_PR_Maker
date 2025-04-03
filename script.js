document.addEventListener("DOMContentLoaded", loadPRs);
 
        function addPR() {
            let movement = document.getElementById("movement").value;
            let weight = document.getElementById("weight").value;
            if (movement && weight) {
                let prList = document.getElementById("prList");
                let listItem = document.createElement("li");
                listItem.textContent = `${movement}: ${weight} kg`;
                prList.appendChild(listItem);
                savePR(movement, weight);
                document.getElementById("movement").value = "";
                document.getElementById("weight").value = "";
            }
        }
        
        function savePR(movement, weight) {
            let prs = JSON.parse(localStorage.getItem("prs")) || [];
            prs.push({ movement, weight });
            localStorage.setItem("prs", JSON.stringify(prs));
        }
        
        function loadPRs() {
            let prs = JSON.parse(localStorage.getItem("prs")) || [];
            let prList = document.getElementById("prList");
            prs.forEach(pr => {
                let listItem = document.createElement("li");
                listItem.textContent = `${pr.movement}: ${pr.weight} kg`;
                prList.appendChild(listItem);
            });
        }
        
        function ClearPR(){
            localStorage.removeItem("prs")
            document.getElementById("prList").innerHTML = ""
        }

        function Convert() {
            let weight = parseFloat(document.getElementById("weightInput").value);
            let unit = document.getElementById("unit").value;
            let result = 0;
            if (unit === "lb") {
                result = (weight * 0.453592).toFixed(2) + " kg";
            } else {
                result = (weight * 2.20462).toFixed(2) + " lb";
            }
            document.getElementById("result").textContent = `Resultado: ${result}`;
        }

        function Calculate() {
            let mvmt = document.getElementById("movementPercentage").value;
            let percentage = document.getElementById("percentageInput").value;
            let prs = JSON.parse(localStorage.getItem("prs")) || [];
            let foundPR = prs.find(pr => pr.movement.toLowerCase() === mvmt.toLowerCase());
            if (foundPR) {
                let calculateWeight = (foundPR.weight * (percentage / 100)).toFixed(2);
                document.getElementById("percentageResult").textContent = `Result: ${calculateWeight} kg`;
            } else {
                document.getElementById("percentageResult").textContent = "Movement not found"
            }
        }

