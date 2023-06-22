# co2-sensor

Low-cost CO2 sensor experiment, based on [ESPHome](https://esphome.io/).

## Components

The included `config.yaml` uses the following components:

- Wemos [D1 mini](https://www.wemos.cc/en/latest/d1/d1_mini.html) development board (or clone).
- Sensirion [SCD40](https://developer.sensirion.com/sensirion-products/scd4x-co2-sensors/) CO2 sensor module.

## Assembly

Connect the development board and CO2 sensor module as follows:

| Development Board Pin | CO2 Sensor Pin |
| --- | --- |
| GND | GND |
| 3V3 | VDD |
| SCL | SCL |
| SDA | SDA |

Connect the development board to your computer via USB for the initial firmware installation.

## Firmware Installation

```bash
# Create secrets.yaml (and customize)
cp secrets-example.yaml secrets.yaml
# Install firmware with standard configuration
esphome run config.yaml --no-logs
# Install firmware with custom device name
esphome -s name co2sensor42 run config.yaml --no-logs
```

After connecting to your Wifi network, the ESPHome web interface should be available at http://co2sensor (or your custom device name).

## Monitoring

Prometheus metrics should be available at http://co2sensor/metrics (or your custom device name).

The folder `grafana` contains example Grafana dashboards, compatible with the included `config.yaml`.
