
/* Function to linearly interpolate between a0 and a1
 * Weight w should be in the range [0.0, 1.0]
 */
function interpolate( a0,  a1,  w) {
    /* // You may want clamping by inserting:
     * if (0.0 > w) return a0;
     * if (1.0 < w) return a1;
     */

     ret = (a1 - a0) * w + a0;
     // console.log("a: " + w + ", " + ret);
    return ret;
    /* // Use this cubic interpolation [[Smoothstep]] instead, for a smooth appearance:
     * return (a1 - a0) * (3.0 - w * 2.0) * w * w + a0;
     *
     * // Use [[Smootherstep]] for an even smoother result with a second derivative equal to zero on boundaries:
     * return (a1 - a0) * (x * (w * 6.0 - 15.0) * w * w *w + 10.0) + a0;
     */
}

/* Create random direction vector
 */
function randomGradient(ix, iy) {
    // Random float. No precomputed gradients mean this works for any number of grid coordinates
    // var random = 2920.0 * Math.sin(ix * 21942.0 + iy * 171324.0 + 8912.0) * Math.cos(ix * 23157.0 * iy * 217832.0 + 9758.0);
    var random = 292 * Math.sin(ix * 2194 + iy * 1713 + 891) * Math.cos(ix * 23157.0 * iy * 21783 + 975);

    // var random = Math.random()*10;
    vec = [ Math.cos(random),  Math.sin(random) ];
    return vec;
}

// Computes the dot product of the distance and gradient vectors.
function dotGridGradient(ix, iy, x, y) {
    // Get gradient from integer coordinates
    var gradient = randomGradient(ix, iy);

    // Compute the distance vector
    var dx = x - ix;
    var dy = y - iy;

    // Compute the dot-product
    return (dx*gradient[0] + dy*gradient[1]);
}

// Compute Perlin noise at coordinates x, y
function perlin(x, y, sx, sy) {
    // Determine grid cell coordinates
    var x0 = x;
    var x1 = x0 + 1;
    var y0 = y;
    var y1 = y0 + 1;

    // Determine interpolation weights
    // Could also use higher order polynomial/s-curve here
    // var sx = x - x1;
    // var sy = y - y1;
    // 
    // var sx = 0.1;
    // var sy = 0.1;


    // console.log("a: " + y + " " + y0);
    // Interpolate between grid point gradients
    var n0, n1, ix0, ix1, value;

    n0 = dotGridGradient(x0, y0, x, y);
    n1 = dotGridGradient(x1, y0, x, y);
    ix0 = interpolate(n0, n1, sx);



    n0 = dotGridGradient(x0, y1, x, y);
    n1 = dotGridGradient(x1, y1, x, y);
    ix1 = interpolate(n0, n1, sx);



    value = interpolate(ix0, ix1, sy);


    return value;
}
