let mode="PVP";
let currentPlayer=1;
let weather="clear";
let aiLevel=1;

const armies={
ROMAN:{hp:110,cards:[
{name:"Легион",desc:"+10 HP",effect:(a)=>a.hp+=10},
{name:"Карфаген",desc:"-15 HP врагу",effect:(a,d)=>d.hp-=15}
]},
VIKING:{hp:100,cards:[
{name:"Берсерк",desc:"+20 урон -5 себе",effect:(a,d)=>{d.hp-=20;a.hp-=5}},
{name:"Набег",desc:"-15 HP врагу",effect:(a,d)=>d.hp-=15}
]},
FRANCE:{hp:105,cards:[
{name:"Жанна д’Арк",desc:"+20 HP",effect:(a)=>a.hp+=20}
]},
ENGLAND:{hp:95,cards:[
{name:"Азенкур",desc:"-18 HP врагу",effect:(a,d)=>d.hp-=18}
]},
MONGOL:{hp:100,cards:[
{name:"Калка",desc:"Игнор стен",effect:(a)=>a.ignore=true}
]},
BYZANTINE:{hp:110,cards:[
{name:"Греческий огонь",desc:"-17 HP врагу",effect:(a,d)=>d.hp-=17}
]}
};

let players={};

function populateArmies(){
for(let key in armies){
armySelect.add(new Option(key,key));
}
}

function startCampaign(){
mode="AI";
aiLevel=2;
menuScreen.classList.add("hidden");
armyScreen.classList.remove("hidden");
}

function startPvP(){
mode="PVP";
menuScreen.classList.add("hidden");
armyScreen.classList.remove("hidden");
}

function startAI(){
mode="AI";
aiLevel=1;
menuScreen.classList.add("hidden");
armyScreen.classList.remove("hidden");
}

function confirmArmy(){
let selected=armySelect.value;
players={
1:{...armies[selected],walls:0},
2:{...armies[randomArmy()],walls:0}
};
armyScreen.classList.add("hidden");
gameScreen.classList.remove("hidden");
updateUI();
}

function randomArmy(){
let keys=Object.keys(armies);
return keys[Math.floor(Math.random()*keys.length)];
}

function updateUI(){
p1.innerHTML=`HP:${players[1].hp}<br>Стены:${players[1].walls}`;
p2.innerHTML=`HP:${players[2].hp}<br>Стены:${players[2].walls}`;
turnInfo.innerText="Ход игрока "+currentPlayer;
weather.innerText=weather==="clear"?"☀️":"🌧";
}

function attack(){
let d=currentPlayer===1?2:1;
let dmg=12-players[d].walls;
players[d].hp-=Math.max(1,dmg);
animateHit(d);
checkWin();
updateUI();
}

function buildWall(){
players[currentPlayer].walls++;
updateUI();
}

function heal(){
players[currentPlayer].hp+=10;
updateUI();
}

function useCard(){
let d=currentPlayer===1?2:1;
let card=players[currentPlayer].cards[Math.floor(Math.random()*players[currentPlayer].cards.length)];
card.effect(players[currentPlayer],players[d]);
cardTitle.innerText=card.name;
cardDesc.innerText=card.desc;
cardModal.style.display="flex";
checkWin();
updateUI();
}

function endTurn(){
currentPlayer=currentPlayer===1?2:1;
if(mode==="AI" && currentPlayer===2){
setTimeout(aiMove,800);
}
updateUI();
}

function aiMove(){
if(aiLevel===1){
attack();
}else{
if(players[2].hp<50) heal();
else useCard();
}
endTurn();
}

function animateHit(player){
let el=document.getElementById("p"+player);
el.classList.add("hit");
setTimeout(()=>el.classList.remove("hit"),300);
}

function checkWin(){
if(players[1].hp<=0||players[2].hp<=0){
alert("Победа!");
location.reload();
}
}

function closeCard(){cardModal.style.display="none";}

populateArmies();
