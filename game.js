
const c=document.getElementById('game');
const ctx=c.getContext('2d');
function resize(){c.width=innerWidth;c.height=innerHeight}
resize();addEventListener('resize',resize);

const sprite=new Image();
sprite.src='assets/penguin-sprites.png';

const COLS=4,ROWS=3;
let score=0,time=60;
let high=+localStorage.getItem('penguinHigh')||0;
document.getElementById('high').textContent=high;

const penguin={x:150,y:250,speed:4,frame:0};
const whootys=[
 {x:500,y:200},
 {x:750,y:350},
 {x:950,y:250}
];

function drawSprite(frame,x,y,w=96,h=96){
 if(!sprite.complete) return;
 const fw=sprite.width/COLS;
 const fh=sprite.height/ROWS;
 const col=(frame-1)%COLS;
 const row=Math.floor((frame-1)/COLS);
 ctx.drawImage(sprite,col*fw,row*fh,fw,fh,x,y,w,h);
}

const keys={};
onkeydown=e=>keys[e.key]=true;
onkeyup=e=>keys[e.key]=false;

function prank(){
 whootys.forEach(w=>{
   if(Math.hypot(penguin.x-w.x,penguin.y-w.y)<120){
      score+=100;
      if(score>high){
        high=score;
        localStorage.setItem('penguinHigh',high);
        document.getElementById('high').textContent=high;
      }
      document.getElementById('score').textContent=score;
      w.x=Math.random()*c.width;
      w.y=Math.random()*c.height;
   }
 });
}
document.getElementById('prank').onclick=prank;

setInterval(()=>{
 if(time>0){
   time--;
   document.getElementById('time').textContent=time;
 }
},1000);

function loop(){
 if(keys.ArrowLeft)penguin.x-=penguin.speed;
 if(keys.ArrowRight)penguin.x+=penguin.speed;
 if(keys.ArrowUp)penguin.y-=penguin.speed;
 if(keys.ArrowDown)penguin.y+=penguin.speed;

 ctx.clearRect(0,0,c.width,c.height);

 whootys.forEach(w=>{
   ctx.fillStyle='red';
   ctx.beginPath();
   ctx.arc(w.x,w.y,20,0,Math.PI*2);
   ctx.fill();
 });

 const walk=[5,6,7,8];
 const frame=walk[Math.floor(Date.now()/120)%walk.length];
 drawSprite(frame,penguin.x,penguin.y);

 requestAnimationFrame(loop);
}
loop();
