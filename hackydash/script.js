(function () {

const CO2_RE = /^esphome_sensor_value\{.*id="co2".*unit="(.+)".*\} (\d+)$/m;
const TEM_RE = /^esphome_sensor_value\{.*id="temperature".*unit="(.+)".*\} ([\d.]+)$/m;
const HUM_RE = /^esphome_sensor_value\{.*id="humidity".*unit="(.+)".*\} ([\d.]+)$/m;

var sensors = [];
var limits = [];
var temhum = true;
var refreshDelay = 0;

function initialize () {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'config.json');
    xhr.onload = function () {
        var config = JSON.parse(xhr.responseText);

        sensors = config.sensors;
        limits = config.limits;
        temhum = config.temhum;
        refreshDelay = config.refresh * 1000;

        createDashboard();
        refreshDashboard();
        setInterval(refreshDashboard, refreshDelay);
    };
    xhr.onerror = function () {
        console.error('Error loading config.');
    };
    xhr.send();
}

function createDashboard () {
    const container = document.getElementById('sensors');
    const template = container.querySelector('.template');

    if (!temhum) {
        template.querySelector('.temhum').classList.add('hidden');
    }

    sensors.forEach(function (sensor) {
        const element = template.cloneNode(true);
        const name = element.querySelector('.name');

        sensor.element = element;
        name.textContent = sensor.name;
        element.classList.remove('template');
        container.appendChild(element);
    });
}

function refreshDashboard () {
    sensors.forEach((sensor) => updateSensor(sensor));
}

function updateSensor (sensor) {
    const co2Element = sensor.element.querySelector('.co2');
    const temElement = sensor.element.querySelector('.tem');
    const humElement = sensor.element.querySelector('.hum');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', sensor.url);
    xhr.onload = function () {
        const text = xhr.responseText;

        const co2Value = updateValue(CO2_RE, text, 0, co2Element);
        sensor.element.classList.remove('green', 'yellow', 'red');
        switch (true) {
        case co2Value >= limits[1]:
            sensor.element.classList.add('red');
            break;
        case co2Value >= limits[0]:
            sensor.element.classList.add('yellow');
            break;
        case co2Value >= 0:
            sensor.element.classList.add('green');
            break;
        }

        updateValue(TEM_RE, text, 1, temElement);
        updateValue(HUM_RE, text, 1, humElement);
    };
    xhr.onerror = function () {
        sensorElement.classList.remove('green', 'yellow', 'red');
        co2Element.textContent = '---';
        temElement.textContent = '---';
        humElement.textContent = '---';
    };
    xhr.send();
}

function updateValue(regex, text, decimals, element) {
    const match = regex.exec(text);
    if (match !== null) {
        let value = Number(match[2]).toFixed(decimals);
        let unit = match[1];
        element.textContent = `${value} ${unit}`;
        return value;
    } else {
        element.textContent = '---';
        return -1;
    }
}

initialize();

}());
