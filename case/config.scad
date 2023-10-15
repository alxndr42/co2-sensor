$fa = 1;
$fs = 0.4;

// ESP PCB dimensions (with margins)
esp_pcb_w = 26.5;
esp_pcb_l = 34.5;
esp_pcb_h = 1.0;

// SCD PCB dimensions (with margins)
scd_pcb_w = 13.5;
scd_pcb_l = 22.5;
scd_pcb_h = 1.7;

// ESP PCB foot height
foot_h = 2.5;
// ESP PCB surface height
surface_h = foot_h + esp_pcb_h;
// Component height above ESP PCB
component_h = 20;

// SCD PCB rail length
scd_rail_l = scd_pcb_l*0.75;

// Thickness of the sides
side_t = 1.5;
// Wall height without top/bottom sides
wall_h = surface_h + component_h;

// USB hole dimensions (with margins)
usb_hole_w = 9;
usb_hole_h = 4;

// Rear gap for removing the lid
gap_w = 10;
gap_h = 2;

// Total case dimensions
total_w = esp_pcb_w + side_t*2;
total_l = esp_pcb_l + scd_pcb_l + side_t*2;
