const UI = {

update(){

playerBar.style.width = Game.player.hp + "%";
enemyBar.style.width = Game.enemy.hp + "%";

playerMorale.innerText = Game.player.morale;
enemyMorale.innerText = Game.enemy.morale;
playerTP.innerText = Game.player.tp;

},

log(text){

document.getElementById("log").innerText = text;

},

renderMap(){

const map = document.getElementById("map");
map.innerHTML="";

Game.campaign.forEach((stage,i)=>{

let p=document.createElement("div");
p.className="map-point";

if(i<Game.stage) p.classList.add("done");
if(i===Game.stage) p.classList.add("current");

map.appendChild(p);

});

},

animateHit(){

document.body.classList.add("hitFlash");

setTimeout(()=>{
document.body.classList.remove("hitFlash");
},300);

},

animateSword(){

let el=document.createElement("div");
el.className="swordAnim";
el.innerText="⚔";

document.body.appendChild(el);

setTimeout(()=>{
el.remove();
},400);

},

animateRocket(){

let el=document.createElement("div");
el.className="rocketAnim";
el.innerText="🚀";

document.body.appendChild(el);

setTimeout(()=>{
el.remove();
},800);

},

playSound(type){

const ctx=new(window.AudioContext||window.webkitAudioContext)();

let freq=200;

if(type==="rocket") freq=80;
if(type==="win") freq=600;

const osc=ctx.createOscillator();
const gain=ctx.createGain();

osc.connect(gain);
gain.connect(ctx.destination);

osc.frequency.value=freq;
osc.type="square";

osc.start();

gain.gain.setValueAtTime(0.2,ctx.currentTime);
gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.3);

osc.stop(ctx.currentTime+0.3);

},

showVictory(stats){

this.playSound("win");

const screen=document.getElementById("victoryScreen");
const content=document.getElementById("victoryContent");

content.className="victory-content "+
(Game.currentCampaign==="EUROPE"?"victory-europe":"victory-rus");

victoryTitle.innerText="ПОБЕДА";

victoryStats.innerHTML=
`Ходов: ${stats.turns}<br>
Урон: ${stats.damageDealt}<br>
Получено: ${stats.damageTaken}`;

screen.classList.remove("hidden");

},

showHistory(stage){

modalTitle.innerText=stage.title;
modalDesc.innerText=stage.desc;

modalFacts.innerHTML="";

stage.facts.forEach(f=>{
let li=document.createElement("li");
li.innerText=f;
modalFacts.appendChild(li);
});

modalLink.href=stage.wiki;

document.getElementById("modal").classList.remove("hidden");

}

};
