class Car{
    constructor(p){
        this.x=(p&&p.x)||50;
        this.y=(p&&p.y)||50;
        this.color=(p&&p.color)||"red";
        this.size=(p&&p.size)||40;
        this.no=(p&&p.no)||0;
    }
    draw(){
        this.drawCar(this.x,this.y,this.color,this.no);
    }
    move(speed){
        this.x+=speed;

    }
    //draw car shapes
    drawCar(x,y,color,no){
       
        // draw bar
        ctx.fillStyle=color;
        ctx.fillRect(x+45, y, 25, 20);
        

        
        //body//
        ctx.fillStyle=color;
        ctx.fillRect(x, y+20, 110, 20);

        //draw window for the car
        ctx.fillStyle="#"+colors[1];
        ctx.beginPath();
        ctx.moveTo(x+70,y);
        ctx.lineTo(x+110,y+20);
        ctx.lineTo(x+70,y+20);
        ctx.fill();

        ctx.fillStyle="#"+colors[10];
        ctx.beginPath();
        ctx.moveTo(x+45,y);
        ctx.lineTo(x+10,y+20);
        ctx.lineTo(x+45,y+20);
        ctx.fill();
        //box
        ctx.strokeStyle="white";
        ctx.strokeRect(this.x+45, this.y+15, 20, 20);

        ctx.font="15px arial";
        
        ctx.fillStyle="black";
        ctx.fillText(no,x+45,y+30);

        //draw wheels
        ctx.beginPath();
    
        ctx.arc(x+30,y+ 40, 15,0, 2 * Math.PI, true);
        ctx.fillStyle = 'blue';
        ctx.fill();

        
        ctx.beginPath();

        ctx.arc(x+80, y+40, 15,0, 2 * Math.PI, true);
        ctx.fillStyle = 'blue';
        ctx.fill();
        
    }
}
let canvas = document.getElementById("canvas");
let btn_start=document.getElementById("btnStart");
let ctx = canvas.getContext("2d");

let c;
let cars=[];
let colors=[];
let winner= -1;

if(ctx){
    btn_start.addEventListener("click",btn_click);
}


function btn_click(event){
    animateCar();
}
function createCar(){
    y1=100;

    
    while (cars.length<4){
      
        c=new Car({
            x:1100,
            y:y1,
            color:"#"+colors[cars.length],
            no:random(1,99)
        });
        cars.push(c);
        y1+=100;
        c.draw();



    }
}

function animateCar() {
   
ctx.fillStyle = 'rgba(255, 255, 255, 1)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

    
for (let i = 0; i < cars.length; i++) {
    c=cars[i];
    c.draw();
    let speed=random(-6,-1);
    c.move(speed);
    if(c.x<=c.size){
        c.x=40;
        
        if(winner== -1){
            winner=c.no;
        }
    }
}
let count=0;
for(let j=0;j<cars.length;j++){
    c=cars[j];
    if(c.x<=c.size){
        count++;
    }
}

if(count==4){
    alert("Winner is "+winner);
    return;
}

requestAnimationFrame(animateCar);
}
function selectColor(cols){
    for(i=0;i<cols.length;i++){
        let color=cols[i].hex;
        if(color != "000000" && color != ""){
            colors.push(color);
           
        }
       
    }
}

function random(min, max) {
    //return value from max to min
    return num = Math.floor(Math.random() * (max - min + 1)) + min;
}

function initialise() {
    fetch("https://www.colr.org/json/colors/random/25")
        .then(function (response) {response.json()      
        .then(function (json) {
            selectColor(json.colors);
            createCar();
           
        });
    });
}
initialise();

