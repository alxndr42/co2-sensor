include <config.scad>

 // Top Side
cube([total_w, total_l, side_t], center=true);

// Rim
translate([0, 0, side_t - 0.01])
    difference() {
        cube([total_w - side_t*2, total_l - side_t*2, side_t], center=true);
        cube([total_w - side_t*4, total_l - side_t*4, side_t*2], center=true);
    }
