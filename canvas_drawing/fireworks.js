// Setup canvas and context
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Color Array (RGB format)
let colorArray = [
    [82, 0, 4],        // Deep red
    [231, 76, 60],     // Bright red
    [236, 240, 241],   // Light gray
    [52, 155, 219],    // Sky blue
    [41, 128, 185],    // Deep blue
    [255, 130, 147]    // Soft pink
];

// Circle and click pulse arrays
let circles = [];
let clickPulses = [];

// Circle count and max radius
let nCircles = 50;
let maxRadius = 40;

// Setup canvas dimensions and background color
function setUpCanvas() {
    canvas.width = 2 * window.innerWidth;
    canvas.height = 2 * window.innerHeight;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.fillStyle = '#2C3E50'; // Set background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Circle class definition
class Circle {
    constructor(x, y, radius, dx, dy) {
        this.x = x;                // X coordinate
        this.y = y;                // Y coordinate
        this.radius = radius;      // Initial radius
        this.dx = dx;              // Velocity in X direction
        this.dy = dy;              // Velocity in Y direction
        this.alpha = 1;            // Alpha for fading effect

        // Random color for each circle
        let color = colorArray[Math.floor(Math.random() * colorArray.length)];
        this.r = color[0];
        this.g = color[1];
        this.b = color[2];
    }

    // Draw the circle
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`;
        context.strokeStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`;
        context.fill();
        context.stroke();
        context.closePath();
    }

    // Update the circle (movement, shrinking, fading)
    update(context) {
        this.x += this.dx;
        this.y += this.dy;
        this.radius *= 0.998;    // Gradually shrink the circle
        this.alpha *= 0.991;     // Gradually fade the circle

        // If alpha is very low, stop drawing it
        if (this.alpha < 0) this.alpha = 0;
        
        // If the circle is still visible, draw it
        if (this.radius > 0 && this.alpha > 0) {
            this.draw(context);
        }
    }
}

// ClickPulse class for the expanding circle on click
class ClickPulse {
    constructor(x, y) {
        this.x = x;                // X coordinate of the click
        this.y = y;                // Y coordinate of the click
        this.radius = 0;           // Initial radius of the pulse
        this.alpha = 0.8;          // Initial alpha for the pulse
        this.lineWidth = 4;        // Line width of the pulse
    }

    // Update the pulse (expand and fade out)
    update(ctx) {
        this.radius += 5;              // Expand the pulse radius
        this.alpha -= 0.001;           // Fade the pulse out
        if (this.alpha < 0) this.alpha = 0;

        // Draw the pulse
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
        ctx.closePath();
    }

    // Check if the pulse is done (completely faded out)
    isDead() {
        return this.alpha <= 0;
    }
}

// Setup the canvas initially
setUpCanvas();

// Draw circles at the click position
function drawCircles(nCircles, clickPosition) {
    for (let i = 0; i < nCircles; i++) {
        let radius = Math.random() * maxRadius + 1;            // Random radius
        let x = 2 * clickPosition.clientX;                      // Scale to canvas size
        let y = 2 * clickPosition.clientY;                      // Scale to canvas size
        let dx = (Math.random() - 0.5) * 12.8;                 // Random horizontal velocity
        let dy = (Math.random() - 0.5) * 13.5;                 // Random vertical velocity
        circles.push(new Circle(x, y, radius, dx, dy));         // Add new circle to array
        circles[i].draw(ctx);                                   // Draw the circle immediately
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Clear canvas with background color
    ctx.fillStyle = '#2C3E50';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw click pulses
    clickPulses.forEach(pulse => pulse.update(ctx));
    clickPulses = clickPulses.filter(p => !p.isDead());  // Remove dead pulses

    // Update and draw circles
    circles.forEach(circle => circle.update(ctx));
}

// Start the animation loop
animate();

// Event listener for click
window.addEventListener("click", function(event) {
    let x = 2 * event.clientX;    // Scale to canvas size
    let y = 2 * event.clientY;    // Scale to canvas size

    // Draw circles and add click pulse at the click position
    drawCircles(nCircles, event);
    clickPulses.push(new ClickPulse(x, y));  // Create new click pulse
});
