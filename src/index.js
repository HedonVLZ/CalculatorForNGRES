import 'styles/index.scss'

function callCalc() {
    function addNumberOfBlock() {
        return Number(document.getElementById("IdNumberOfBlock").value);
    }

    function addRegimeOfBlock() {
        return Number(document.getElementById("IdTypeOfRegime").value);
    }

    function addAirTemperature() {
        return Number(document.getElementById("IdAirTemperature").value);
    }

    function addAirPressure() {
        return Number(document.getElementById("IdAirPressure").value);
    }

    let polynom = {
        a: [303.98, 286.3, 287.86],
        b: [0.135, 0.0666, 0.188],
        c: [2.248, 2.116, 2.0799],
        d: [0.741, 0.561, 0.795],
        OptimalPositionOfVNAinNPRCh: [88, 90, 90, 0, 0, 0],
        OptimalPositionOfVNAinOPRCh: [0, 0, 0, 80, 80, 80],
    };
    let NumberOfBlock = addNumberOfBlock();
    let RegimeOfBlock = addRegimeOfBlock();
    let AirTemperature = addAirTemperature();
    let AirPressure = addAirPressure();
    let maxHeat = 20;

    function findPrimaryOptimalTemperature() {
        return (-(polynom.a[NumberOfBlock - 1] - polynom.OptimalPositionOfVNAinNPRCh[(NumberOfBlock + RegimeOfBlock - 1)] - polynom.OptimalPositionOfVNAinOPRCh[(NumberOfBlock + RegimeOfBlock - 1)] - polynom.b[NumberOfBlock - 1] * AirTemperature - polynom.c[NumberOfBlock - 1] * AirPressure) / polynom.d[NumberOfBlock - 1]);
    }

    function findSecondaryOptimalTemperature() {
        let FirstOptimalTemperature = findPrimaryOptimalTemperature();
        let deltaTemp = FirstOptimalTemperature - AirTemperature;
        if (AirTemperature >= 8) {
            return "Нагрев воздуха не требуется";
        }
        if (AirTemperature > FirstOptimalTemperature) {
            return "Нагрев воздуха не требуется";
        }
        if ((AirTemperature < 8) & (FirstOptimalTemperature >= 8) & (deltaTemp <= maxHeat)) {
            return "Оптимальная температура нагрева воздуха на ЭБ№" + NumberOfBlock + " 8" + " °С";
        }
        if ((AirTemperature < 8) & (FirstOptimalTemperature < 8) & (deltaTemp <= maxHeat)) {
            return "Оптимальная температура нагрева воздуха на ЭБ№" + NumberOfBlock + " " + Math.round(FirstOptimalTemperature) + " °С";
        }
        if ((AirTemperature < 8) & (FirstOptimalTemperature < 8) & (deltaTemp > maxHeat)) {
            return "Оптимальная температура нагрева воздуха на ЭБ№" + NumberOfBlock + " " + (AirTemperature + maxHeat) + " °С";
        }
        if ((AirTemperature < 8) & (FirstOptimalTemperature >= 8) & (deltaTemp > 20) & ((AirTemperature + maxHeat) >= 8)) {
            return "Оптимальная температура нагрева воздуха ЭБ№" + NumberOfBlock + " " + "8" + " °С";
        }
        if ((AirTemperature < 8) & (FirstOptimalTemperature >= 8) & (deltaTemp > 20) & ((AirTemperature + maxHeat) < 8)) {
            return "Оптимальная температура нагрева воздуха ЭБ№" + NumberOfBlock + " " + (AirTemperature + maxHeat) + " °С";
        }
    }

    alert(findSecondaryOptimalTemperature());
}

const calc = document.querySelector(".calc");
calc.addEventListener("click", callCalc);