const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
let particles = [];

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

function randomIntegerFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

const colors = ['#00bdff', '#4d39ce', '#088eff'];

class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.05;

        const distance = randomIntegerFromRange(50, 120);
        this.distanceFromCenter = { x: distance, y: distance };
        this.prevDistanceFromCenter = { x: distance, y: distance };

        this.lastMouse = { x: x, y: y };
    }

    update() {
        const lastPoint = { x: this.x, y: this.y };
        this.radians += this.velocity;
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
        this.distanceFromCenter.x = this.prevDistanceFromCenter.x + Math.sin(this.radians) * 100;
        this.distanceFromCenter.y = this.prevDistanceFromCenter.y + Math.sin(this.radians) * 100;
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;
        this.draw(lastPoint);
    }

    draw(lastPoint) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    }
}

function init() {
    particles = [];

    for (let i = 0; i < 50; i++) {
        const radius = (Math.random() * 2) + 1;
        particles.push(
            new Particle(
                canvas.width / 2,
                canvas.height / 2,
                radius,
                randomColor(colors)
            )
        );
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
    });
}

init();
animate();
