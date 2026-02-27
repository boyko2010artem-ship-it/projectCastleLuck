const campaign=[
{
title:"146 до н.э. — Падение Карфагена",
enemy:"Карфаген",
theme:"#5b1c1c",
wiki:"https://ru.wikipedia.org/wiki/Падение_Карфагена",
history:"Рим уничтожил Карфаген после Третьей Пунической войны."
},
{
title:"793 — Линдисфарн",
enemy:"Англия",
theme:"#1e3a8a",
wiki:"https://ru.wikipedia.org/wiki/Линдисфарн",
history:"Начало эпохи набегов викингов."
},
{
title:"1415 — Азенкур",
enemy:"Франция",
theme:"#1f2937",
wiki:"https://ru.wikipedia.org/wiki/Битва_при_Азенкуре",
history:"Английские лучники разгромили французских рыцарей."
}
];

let game={
stage:0,
player:{hp:120,walls:0},
enemy:{hp:100,walls:0},
rocketCharge:0,
turn:1,
log:[]
};

function init(){
loadStage();
updateUI();
}

function loadStage(){
let s=campaign[game.stage];
stageTitle.innerText=s.title;
enemyName.innerText=s.enemy;
document.body.style.background=s.theme;
game.player={hp:120,walls:0};
game.enemy={hp:100,walls:0};
game.rocketCharge=0;
game.log=[];
updateUI();
addLog("Началась эпоха: "+s.title);
}

function addLog(text){
game.log.unshift(text);
renderLog();
}

function renderLog(){
log.innerHTML="";
game.log.forEach(l=>{
let div=document.createElement("div");
div.innerText=l;
log.appendChild(div);
});
}

function updateUI(){
playerHP.innerText=game.player.hp;
playerWalls.innerText=game.player.walls;
enemyHP.innerText=game.enemy.hp;
enemyWalls.innerText=game.enemy.walls;

rocketStatus.innerText=game.rocketCharge>=2?"ГОТОВА":"Заряжается "+game.rocketCharge+"/2";
rocketBtn.disabled=game.rocketCharge<2;
}

function playSound(freq){
let ctx=new (window.AudioContext||window.webkitAudioContext)();
let osc=ctx.createOscillator();
osc.frequency.value=freq;
osc.connect(ctx.destination);
osc.start();
osc.stop(ctx.currentTime+0.15);
}

function animateHit(el){
el.classList.add("hit");
setTimeout(()=>el.classList.remove("hit"),200);
}

function attack(){
let dmg=Math.max(1,12-game.enemy.walls);
game.enemy.hp-=dmg;
addLog("Вы нанесли "+dmg+" урона");
animateHit(enemyBox);
playSound(300);
check();
updateUI();
}

function buildWall(){
game.player.walls++;
addLog("Вы построили стену");
playSound(150);
updateUI();
}

function heal(){
game.player.hp+=12;
addLog("Вы восстановили 12 HP");
playSound(500);
updateUI();
}

function rocket(){
game.enemy.hp-=30;
addLog("🚀 Осадная ракета нанесла 30 урона!");
game.rocketCharge=0;
animateHit(enemyBox);
playSound(80);
check();
updateUI();
}

function endTurn(){
game.rocketCharge++;
enemyTurn();
}

function enemyTurn(){
let dmg=Math.max(1,10-game.player.walls);
game.player.hp-=dmg;
addLog("Враг нанес "+dmg+" урона");
animateHit(playerBox);
playSound(200);
check();
updateUI();
}

function check(){
if(game.enemy.hp<=0){
showHistory();
}
if(game.player.hp<=0){
alert("Вы проиграли");
location.reload();
}
}

function showHistory(){
let s=campaign[game.stage];
historyTitle.innerText=s.title;
historyText.innerText=s.history;
qr.src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+encodeURIComponent(s.wiki);
historyModal.style.display="flex";
}

function nextStage(){
historyModal.style.display="none";
game.stage++;
if(game.stage>=campaign.length){
alert("Кампания завершена!");
location.reload();
}
loadStage();
}

function openGuide(){guideModal.style.display="flex";}
function closeGuide(){guideModal.style.display="none";}

init();