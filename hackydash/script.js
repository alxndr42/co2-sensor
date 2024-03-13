(function () {

const CO2_RE = /^esphome_sensor_value\{.*id="co2".*\} (\d+)$/m;

var sensors = [];
var limits = [];
var refreshDelay = 0;

function initialize () {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'config.json');
    xhr.onload = function () {
        var config = JSON.parse(xhr.responseText);

        sensors = config.sensors;
        limits = config.limits;
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
    var container = document.getElementById('sensors');
    var template = container.getElementsByClassName('template')[0];

    sensors.forEach(function (sensor) {
        var element = template.cloneNode(true);
        var name = element.getElementsByClassName('name')[0];

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
    var sensorElement = sensor.element;
    var valueElement = sensorElement.getElementsByClassName('value')[0];
    var xhr = new XMLHttpRequest();

    xhr.open('GET', sensor.url);
    xhr.onload = function () {
        var match = CO2_RE.exec(xhr.responseText);
        var level = (match === null ? -1 : Number(match[1]));

        sensorElement.classList.remove('green', 'yellow', 'red');
        switch (true) {
        case level >= limits[1]:
            sensorElement.classList.add("red");
            break;
        case level >= limits[0]:
            sensorElement.classList.add("yellow");
            break;
        case level >= 0:
            sensorElement.classList.add("green");
            break;
        }
        valueElement.textContent = (match === null ? '---' : match[1]);
    };
    xhr.onerror = function () {
        sensorElement.classList.remove('green', 'yellow', 'red');
        valueElement.textContent = '---';
    };
    xhr.send();
}

initialize();

}());
