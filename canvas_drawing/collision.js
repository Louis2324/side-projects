let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight ;
ctx.fillStyle = '#2C3E50';
ctx.fillRect(0,0,canvas.width,canvas.height);

//rect 1 color : #e86262 rect 2 color : #92ABEA

let mouse = {x:100, y: 100};
window.addEventListener("mousemove",function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

class Rectangle {
    constructor(x,y,width,height,color){
        this.position = {x:x,y:y};
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = { x: ((Math.floor(Math.random()-0.5) + 0.1 ))*10, y:((Math.floor(Math.random()-0.5) + 0.1))*10 }; // Add to constructor (fixed speed)

    }

    draw(context){
        context.fillStyle = this.color;
        context.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}

let rect1,rect2;
rect1 =  new Rectangle(canvas.width/2 -300,canvas.height/2-50,100,100,'#e86262');
rect1.draw(ctx);
rect2 = new Rectangle(canvas.width/2 -50,canvas.height/2-50,100,100,'#92ABEA');
rect2.draw(ctx);

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = "#2C3E50";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Move rectangles
    rect1.position.x += rect1.velocity.x;
    rect1.position.y += rect1.velocity.y;
    rect2.position.x += rect2.velocity.x;
    rect2.position.y += rect2.velocity.y;

    // Boundary checks
    checkBounds(rect1);
    checkBounds(rect2);

    // Collision check
    if(isColliding(rect1,rect2)) {
       rect1.velocity.x *= -1;
       rect1.velocity.y *= -1;
       rect2.velocity.x *= -1;
       rect2.velocity.y *= -1;
       console.log("Collision detected and handled");
    }

    // Draw
    rect1.draw(ctx);
    rect2.draw(ctx);
}
animate();

function isColliding(rect1,rect2){
    if(
        rect1.position.x < rect2.position.x + rect2.width &&
        rect1.position.x + rect1.width > rect2.position.x &&
        rect1.position.y < rect2.position.y + rect2.height &&
        rect1.position.y + rect1.height > rect2.position.y
    ){
        return true;
    }
    else{
        return false;
    }
}

function checkBounds(rect) {
    // X-axis
    if (rect.position.x <= 0 || rect.position.x + rect.width >= canvas.width) {
        rect.velocity.x *= -1;
        rect.position.x = Math.max(0, Math.min(canvas.width - rect.width, rect.position.x));
    }

    // Y-axis
    if (rect.position.y <= 0 || rect.position.y + rect.height >= canvas.height) {
        rect.velocity.y *= -1;
        rect.position.y = Math.max(0, Math.min(canvas.height - rect.height, rect.position.y));
    }
}
