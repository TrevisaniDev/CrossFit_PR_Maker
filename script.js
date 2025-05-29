const translations = {
    pt: {
        title: "Registrador de PR de CrossFit",
        register: "Registrar PR",
        movementPlaceholder: "Movimento (Ex: Snatch)",
        weightPlaceholder: "Peso (kg)",
        add: "Salvar",
        clear: "Limpar PR",
        converter: "Conversor de Peso",
        enterWeight: "Digite o peso",
        percentage: "Calcule sua Porcentagem",
        calculate: "Calcular",
        result: "Resultado",
        movement: "Movimento",
        enterPercent: "Digite a Porcentagem",
        notFound: "Movimento não encontrado",
    },

    en: {
        title: "CrossFit PR Tracker",
        register: "Register Your PR",
        movementPlaceholder: "Movement (e.g., Snatch)",
        weightPlaceholder: "Weight (kg)",
        add: "Add",
        clear: "Clear PRs",
        converter: "Weight Converter",
        enterWeight: "Enter the weight",
        calculate: "Calculate",
        result: "Result",
        percentage: "Calculate Your Percentage",
        movement: "Movement to calculate",
        enterPercent: "Enter the percentage",
        notFound: "Movement not found."
    }
};

function setLanguage(lang) {
    document.title = translations[lang].title;
    document.querySelector(h1).textContent = translations[lang].title;

    document.getElementById(".pr-section h3").textContent = translations[lang].register;
    document.getElementById("movement").placeholder = translations[lang].movementPlaceholder;
    document.getElementById("weight").placeholder = translations[lang].weightPlaceholder

    document.querySelector(".pr-section button").textContent = translations[lang].add;
    document.querySelector(".pr-section button").textContent = translations[lang].clear;

    document.querySelector(".converter-section h3").textContent = translations[lang].converter;
    document.getElementById("weightInput").placeholder = translations[lang].enterWeight;
    document.querySelector(".convert-section button").textContent = translations[lang].calculate; //Acredito q está errado, pois era pra traduzir o botão "converter" e não o de "calcular"

    document.querySelector(".percentage-calculator h3").textContent = translations[lang].percentage;
    document.getElementById("movementPercentage").placeholder = translations[lang].movement;
    document.getElementById("percentageInput").placeholder = translations[lang].enterPercent;
    //Agora aqui faltou o botão de "calcular" para traduzir, problema gerado provavelmente na linha 28

    document.getElementById("languageLabel").textContent = lang.toUpperCase();
    localStorage.setItem("lang", lang);
}

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

