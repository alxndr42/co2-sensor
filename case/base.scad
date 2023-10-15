include <config.scad>

// Bottom Side
translate([0, total_l/2, side_t/2])
    cube([total_w, total_l, side_t], center=true);

// Walls
translate([0, 0, side_t - 0.01])
    difference() {
        // Sides
        translate([0, total_l/2, wall_h/2])
            difference() {
                cube([total_w, total_l, wall_h], center=true);
                cube([total_w - side_t*2, total_l - side_t*2, wall_h*2], center=true);
                ventilation_holes(total_l, wall_h);
            }
        // USB Hole
        translate([0, side_t/2, usb_hole_h/2 + surface_h])
            cube([usb_hole_w, side_t*2, usb_hole_h], center=true);
        // Rear Gap
        translate([0, total_l - side_t/2, wall_h - gap_h/2 + 0.01])
            cube([gap_w, side_t*2, gap_h], center=true);
    }

// ESP Feet
translate([0, side_t, side_t - 0.01])
    esp_feet(usb_hole_w);

// SCD Rails
translate([0, total_l - scd_rail_l/2 + 0.01, side_t - 0.01]) {
    translate([scd_pcb_w/2, 0, 0])
        scd_rail(scd_rail_l);
    mirror([1, 0, 0])
        translate([scd_pcb_w/2, 0, 0])
            scd_rail(scd_rail_l);
}

//
// Modules
//

module ventilation_holes(wall_l, wall_h, hole_d=5, margin=side_t*2) {
    gap_v = (wall_h - margin*2 - hole_d*3)/2;

    ventilation_row(wall_l, margin, hole_d);
    translate([0, 0, hole_d + gap_v])
        ventilation_row(wall_l, margin, hole_d);
    translate([0, 0, -hole_d - gap_v])
        ventilation_row(wall_l, margin, hole_d);
}

module ventilation_row(length, margin, hole_d) {
    count = floor((length - margin*2) / (hole_d*1.5));
    gap = (length - margin*2 - hole_d*count) / (count - 1);

    for(i=[0:count-1]) {
        translate([0, -length/2 + hole_d/2 + margin + (hole_d + gap)*i, 0])
            rotate([0, 90, 0])
                cylinder(100, d=hole_d, center=true);
    }
}

module esp_feet(front_w, front_l=5) {
    screw_d = 1.6;
    screw_x = 10.2;
    screw_y = 31;
    rear_d = screw_d + 4;

    // Front Foot
    translate([0, front_l/2, foot_h/2])
        cube([front_w, front_l, foot_h], center=true);

    // Rear Left Foot
    translate([-screw_x, screw_y, foot_h/2])
        difference() {
            cylinder(h=foot_h, d=rear_d, center=true);
            cylinder(h=foot_h*2, d=screw_d, center=true);
        }

    // Rear Right Foot
    translate([screw_x, screw_y, foot_h/2])
        difference() {
            cylinder(h=foot_h, d=rear_d, center=true);
            cylinder(h=foot_h*2, d=screw_d, center=true);
        }
}

module scd_rail(length) {
    rail_w = 2;
    rail_h = foot_h + scd_pcb_h + 1;

    translate([0, 0, rail_h/2])
        difference() {
            cube([rail_w, length, rail_h], center=true);
            translate([-rail_w/4 - 0.01, 0, foot_h - scd_pcb_h])
                cube([rail_w/2, length*2, scd_pcb_h], center=true);
        }
}
