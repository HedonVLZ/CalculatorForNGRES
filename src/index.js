import 'styles/index.scss'

function callCalc() {

    let NumberOfBlock = Number(document.getElementById("IdNumberOfBlock").value);
    let RegimeOfBlock = Number(document.getElementById("IdTypeOfRegime").value);
    let AirTemperature = Number(document.getElementById("IdAirTemperature").value);
    let AirPressure = Number(document.getElementById("IdAirPressure").value);
    let maxHeat = 20;
    let energyEffencyTemp = 8;
    function toFindFirstOptimalTemperature() {
        let polynom = {
            a: [303.98, 286.3, 287.86],
            b: [0.135, 0.0666, 0.188],
            c: [2.248, 2.116, 2.0799],
            d: [0.741, 0.561, 0.795],
            OptimalPositionOfVNAinNPRCh: [88, 90, 90, 0, 0, 0],
            OptimalPositionOfVNAinOPRCh: [0, 0, 0, 80, 80, 80],
        };
        let FirstOptimalTemperature = Math.ceil(-(polynom.a[NumberOfBlock - 1] - polynom.OptimalPositionOfVNAinNPRCh[(NumberOfBlock + RegimeOfBlock - 1)] - polynom.OptimalPositionOfVNAinOPRCh[(NumberOfBlock + RegimeOfBlock - 1)] - polynom.b[NumberOfBlock - 1] * AirTemperature - polynom.c[NumberOfBlock - 1] * AirPressure) / polynom.d[NumberOfBlock - 1]);
        if (FirstOptimalTemperature > 8 ) {
            FirstOptimalTemperature = 8;
        }
        return FirstOptimalTemperature;
    }
    let FirstOptimalTemperature = toFindFirstOptimalTemperature();
    function toFindSecondaryOptimalTemperature() {
        let deltaTemp = FirstOptimalTemperature - AirTemperature;
        if (AirTemperature >= energyEffencyTemp) {
            return "Нагрев воздуха не требуется";
        }
        if (AirTemperature >= FirstOptimalTemperature) {
            return "Нагрев воздуха не требуется";
        }
        if ((AirTemperature <= FirstOptimalTemperature) && (deltaTemp <= maxHeat)) {
            return "Оптимальная температура нагрева воздуха после КВОУ ЭБ №" + String(NumberOfBlock) + " составляет " + String(FirstOptimalTemperature)+ "°С";
        }
        if ((AirTemperature <= FirstOptimalTemperature) && (deltaTemp > maxHeat)) {
            return "Оптимальная температура нагрева воздуха после КВОУ ЭБ №" + String(NumberOfBlock) + " составляет " + String(maxHeat + AirTemperature) + "°С";
        }
    }

    alert(toFindSecondaryOptimalTemperature());
}
const calc = document.querySelector(".calc");
calc.addEventListener("click", callCalc);
