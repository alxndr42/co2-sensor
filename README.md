# co2-sensor

Low-cost headless CO2 sensor, based on [ESPHome](https://esphome.io/).

![Photo of a D1 mini and SCD40 sensor board in a 3D-printed case](build.jpg)

## Components

The included `config.yaml` uses the following components:

- Wemos [D1 mini][] development board (or clone).
- Sensirion [SCD4x][] CO2 sensor module.

The `case` folder contains STL files and their [OpenSCAD][] sources for a simple 3D-printed case.

[d1 mini]: https://www.wemos.cc/en/latest/d1/d1_mini.html
[openscad]: https://openscad.org/
[scd4x]: https://developer.sensirion.com/sensirion-products/scd4x-co2-sensors/

## Assembly

Connect the development board and CO2 sensor module as follows:

| Development Board Pin | CO2 Sensor Pin |
| --- | --- |
| GND | GND |
| 3V3 | VDD |
| SCL | SCL |
| SDA | SDA |

For the 3D-printed case, short M2 screws (~3mm) should work.

## Firmware Installation

Connect the development board to your computer via USB for the initial firmware installation.

```bash
# Create (then customize) secrets.yaml
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

## Sensor Calibration

By default, the SCD4x performs `Automatic Self-Calibration` (ASC), and does not need to be calibrated manually. However, the data sheet contains this note:

> The automatic self-calibration algorithm assumes that the sensor is exposed to the atmospheric CO2 concentration of 400 ppm at least once per week.

If sufficient ventilation cannot be ensured, it might become necessary to perform `Forced Recalibration` (FRC) using a reference value. The ESPHome web interface contains an `FRC` button for performing the calibration, and an `FRC Reference` slider for setting the reference value. Before calibration, the data sheet suggests:

> Operate the SCD4x in the operation mode later used in normal sensor operation (periodic measurement, low power periodic measurement or single shot) for > 3 minutes in an environment with homogenous and constant CO2 concentration.

The FRC functionality can be disabled by setting the variable `frc` to `disabled`.
