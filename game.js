const armies={
ROMAN:{name:"Рим",hp:120,bonus:"+1 защита за стену"},
VIKING:{name:"Викинги",hp:110,bonus:"+3 к атаке"},
ENGLAND:{name:"Англия",hp:105,bonus:"+5 к лечению"},
FRANCE:{name:"Франция",hp:115,bonus:"+2 стены максимум"},
MONGOL:{name:"Монголы",hp:110,bonus:"30% шанс игнорировать стены"},
BYZANTINE:{name:"Византия",hp:120,bonus:"20% шанс блокировать атаку"}
};

const campaign=[
{
title:"146 до н.э. — Падение Карфагена",
enemy:"Карфаген",
theme:"#3b2f2f",
wiki:"https://ru.wikipedia.org/wiki/Падение_Карфагена",
history:"Рим разрушил Карфаген после Третьей Пунической войны."
},
{
title:"793 — Линдисфарн",
enemy:"Англия",
theme:"#1e3a8a",
wiki:"https://ru.wikipedia.org/wiki/Линдисфарн",
history:"Викинги напали на монастырь, начало эпохи набегов."
},
{
title:"1415 — Азенкур",
enemy:"Франция",
theme:"#1f2937",
wiki:"https://ru.wikipedia.org/wiki/Битва_при_Азенкуре",
history:"Английские лучники разгромили французских рыцарей."
}
];

let stage=0;
let player;
let enemy;

function populateArmies(){
for(let key in armies){
armySelect.add(new Option(armies[key].name,key));
}
}

function startGame(){
let type=armySelect.value;
player={type:type,hp:armies[type].hp,walls:0};
enemy={hp:100,walls:0};
armyScreen.classList.add("hidden");
gameScreen.classList.remove("hidden");
loadStage();
}

function loadStage(){
let s=campaign[stage];
campaignTitle.innerText=s.title;
enemyName.innerText=s.enemy;
document.body.style.background=s.theme;
updateUI();
log("Началась эпоха: "+s.title);
}

function updateUI(){
playerHP.innerText=player.hp;
playerWalls.innerText=player.walls;
enemyHP.innerText=enemy.hp;
enemyWalls.innerText=enemy.walls;
}

function log(text){
let entry=document.createElement("div");
entry.innerText=text;
log.prepend(entry);
}

function animateHit(element){
element.classList.add("hit");
setTimeout(()=>element.classList.remove("hit"),300);
}

function attack(){
let dmg=12-enemy.walls;
if(player.type==="VIKING") dmg+=3;
dmg=Math.max(1,dmg);
enemy.hp-=dmg;
animateHit(enemyBox);
log("Вы нанесли "+dmg+" урона");
checkWin();
updateUI();
}

function buildWall(){
player.walls++;
log("Вы построили стену");
updateUI();
}

function heal(){
let amount=10;
if(player.type==="ENGLAND") amount+=5;
player.hp+=amount;
log("Вы восстановили "+amount+" HP");
updateUI();
}

function enemyTurn(){
let dmg=10-player.walls;
player.hp-=Math.max(1,dmg);
animateHit(playerBox);
log("Враг нанёс "+dmg+" урона");
checkWin();
updateUI();
}

function endTurn(){
enemyTurn();
}

function checkWin(){
if(enemy.hp<=0){
showHistory();
}
if(player.hp<=0){
alert("Вы проиграли кампанию");
location.reload();
}
}

function showHistory(){
let s=campaign[stage];
historyTitle.innerText=s.title;
historyText.innerText=s.history;
qr.src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+encodeURIComponent(s.wiki);
historyModal.style.display="flex";
}

function nextStage(){
historyModal.style.display="none";
stage++;
if(stage>=campaign.length){
alert("Кампания завершена!");
location.reload();
}
player.walls=0;
enemy={hp:100,walls:0};
loadStage();
}

function openGuide(){guideModal.style.display="flex";}
function closeGuide(){guideModal.style.display="none";}

populateArmies();
