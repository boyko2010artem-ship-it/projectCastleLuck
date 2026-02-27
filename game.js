let currentPlayer = 1;
let weather = "clear";
let mode = "AI";

const armies = {
ROMAN:{
hp:110,
deck:[
{name:"Падение Карфагена",desc:"-10 HP врагу",effect:(g,o)=>o.hp-=10},
{name:"Testudo",desc:"+3 стены",effect:(g)=>g.walls+=3},
{name:"Легион",desc:"+2 урон навсегда",effect:(g)=>g.baseDmg+=2},
{name:"Император",desc:"+15 HP",effect:(g)=>g.hp+=15}
]
},
VIKING:{
hp:100,
deck:[
{name:"Берсерк",desc:"+15 урон, -5 себе",effect:(g,o)=>{o.hp-=15;g.hp-=5}},
{name:"Набег",desc:"+12 HP урон",effect:(g,o)=>o.hp-=12},
{name:"Дракар",desc:"+3 AP",effect:(g)=>g.ap+=3},
{name:"Щиты",desc:"+2 стены",effect:(g)=>g.walls+=2}
]
}
};

function createPlayer(type){
return{
type:type,
hp:armies[type].hp,
walls:0,
ap:0,
baseDmg:10,
deck:[...armies[type].deck]
};
}

let game={
p1:createPlayer("ROMAN"),
p2:createPlayer("VIKING"),
turn:1
};

function createLED(){
const led=document.getElementById("led");
for(let i=0;i<25;i++){
let dot=document.createElement("div");
dot.className="pixel";
led.appendChild(dot);
}
}

function animateLED(num){
const pixels=document.querySelectorAll(".pixel");
pixels.forEach(p=>p.classList.remove("on"));
for(let i=0;i<num && i<25;i++){
pixels[i].classList.add("on");
}
}

function updateUI(){
document.getElementById("info").innerText=
`Ход:${game.turn} | P1:${game.p1.hp} HP | P2:${game.p2.hp} HP`;
document.getElementById("weather").innerText=
weather==="clear"?"Ясно":
weather==="rain"?"Дождь 🌧":
"Гроза ⛈";
}

function actionA(){ attack(); }
function actionB(){ useCard(); }
function actionAB(){ endTurn(); }

function attack(){
let atk=game["p"+currentPlayer];
let def=game["p"+(currentPlayer===1?2:1)];

let dmg=atk.baseDmg;
if(weather==="rain") dmg*=0.8;
if(weather==="storm") dmg*=1.3;
dmg-=def.walls;
dmg=Math.max(1,Math.floor(dmg));

def.hp-=dmg;
animateLED(dmg);
checkWin();
updateUI();
}

function useCard(){
let p=game["p"+currentPlayer];
let opponent=game["p"+(currentPlayer===1?2:1)];
if(p.deck.length===0) return;
let card=p.deck.shift();
card.effect(p,opponent);
alert(card.name+"\n"+card.desc);
updateUI();
}

function endTurn(){
currentPlayer=currentPlayer===1?2:1;
game.turn++;
randomWeather();
if(mode==="AI" && currentPlayer===2){
setTimeout(()=>{attack(); endTurn();},1000);
}
updateUI();
}

function randomWeather(){
if(Math.random()<0.3){
weather=["clear","rain","storm"][Math.floor(Math.random()*3)];
}
}

function checkWin(){
if(game.p1.hp<=0||game.p2.hp<=0){
let winner=game.p1.hp>0?1:2;
localStorage.setItem("wins_"+winner,
(Number(localStorage.getItem("wins_"+winner))||0)+1);
alert("Победил Игрок "+winner);
location.reload();
}
}

createLED();
updateUI();