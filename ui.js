const UI = {

update(){
playerBar.style.width=(Game.player.hp/100*100)+"%";
enemyBar.style.width=(Game.enemy.hp/100*100)+"%";
playerMorale.innerText=Game.player.morale;
enemyMorale.innerText=Game.enemy.morale;
playerTP.innerText=Game.player.tp;
},

log(t){ log.innerText=t; },

renderMap(){
const map=document.getElementById("map");
map.innerHTML="";
Game.campaign.forEach((_,i)=>{
let p=document.createElement("div");
p.className="map-point";
if(i<Game.stage)p.classList.add("done");
if(i===Game.stage)p.classList.add("current");
map.appendChild(p);
});
},

showVictory(stats){
const screen=document.getElementById("victoryScreen");
const content=document.getElementById("victoryContent");

content.className="victory-content "+
(Game.currentCampaign==="EUROPE"?"victory-europe":"victory-rus");

victoryTitle.innerText="ПОБЕДА!";
victoryStats.innerHTML=`
<p>Ходов: ${stats.turns}</p>
<p>Урон: ${stats.damageDealt}</p>
<p>Получено: ${stats.damageTaken}</p>
`;

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
modal.classList.remove("hidden");
}

};
