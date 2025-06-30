let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth  ;
canvas.height = window.innerHeight ;

let mouse = {x:undefined, y: undefined};
window.addEventListener("mousemove",function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    
})
window.addEventListener("resize",function(){
    canvas.height = window.innerHeight;
    canvas.width= window.innerWidth;
    circles = [];
    init();
});

let colorArray = [
    '#2C3E50',
    "#E74C3C",
    '#ECF0F1',
    '#349BDB',
    '#2980B9',
    '#FF8293'
]

class Circle {
    constructor(x, y, radius,dx,dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.minRadius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    draw(context){
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        context.strokeStyle = this.color;
        context.stroke();
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    update(context) {
        // Wall bouncing
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;
    
        // Distance from mouse
        const distance = Math.hypot(mouse.x - this.x, mouse.y - this.y);
        const maxRadius = 40;
        const proximity = 100;
    
        // Smooth radius change
        if (distance <= proximity && this.radius < maxRadius) {
            this.radius += (maxRadius - this.radius) * 0.101; // ease in
        } else if (this.radius > this.minRadius) {
            this.radius -= (this.radius - this.minRadius) * 0.101; // ease out
        }
    
        this.draw(context);
    }
}

 let x,y,dx,dy,radius;
 let circles = [];


 function animate(){
    ctx.fillStyle = '#2C3E50';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    circles.forEach(circle => {
        circle.update(ctx);
    })
    // checkCircleCollisions(circles); 
    requestAnimationFrame(animate);
 }
init();
 animate();

 function checkCircleCollisions(circles) {
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            const dx = circles[i].x - circles[j].x;
            const dy = circles[i].y - circles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const sumOfRadii = circles[i].radius + circles[j].radius;


            if (distance < sumOfRadii) {

                // 1. Reverse directions
                circles[i].dx = -circles[i].dx;
                circles[i].dy = -circles[i].dy;
                circles[j].dx = -circles[j].dx;
                circles[j].dy = -circles[j].dy;

                // 2. Calculate overlap
                const overlap = sumOfRadii - distance;

                // 3. Normalize direction vector
                const correctionX = (dx / distance) * (overlap / 2);
                const correctionY = (dy / distance) * (overlap / 2);

                // 4. Push them apart
                circles[i].x += correctionX;
                circles[i].y += correctionY;
                circles[j].x -= correctionX;
                circles[j].y -= correctionY;
            }
        }
    }
}

function init(){
    for(let i=0; i<=900; i++){
        radius = Math.floor(Math.random()*4) + Math.floor(Math.random()*8);
        x = (Math.random() * (canvas.width - radius * 2)) + radius;
        y = (Math.random() * (canvas.height - radius *2)) + radius;
        dx = (Math.random() - 0.5) * 4;
        dy = (Math.random() - 0.5) * 4;
    
        let circle = new Circle(x,y,radius,dx,dy);
        circles.push(circle);
     }
}