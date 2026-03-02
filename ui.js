const UI = {

update(){
document.getElementById("playerBar").style.width =
(Game.player.hp/Game.player.maxHp*100)+"%";

document.getElementById("enemyBar").style.width =
(Game.enemy.hp/Game.enemy.maxHp*100)+"%";

document.getElementById("playerMorale").innerText = Game.player.morale;
document.getElementById("enemyMorale").innerText = Game.enemy.morale;
document.getElementById("playerTP").innerText = Game.player.tp;
},

log(text){
document.getElementById("log").innerText = text;
},

showHistory(stage){

const modal = document.getElementById("modal");

document.getElementById("modalTitle").innerText = stage.title;
document.getElementById("modalDesc").innerText = stage.desc;

const factsList = document.getElementById("modalFacts");
factsList.innerHTML = "";

stage.facts.forEach(f=>{
let li = document.createElement("li");
li.innerText = f;
factsList.appendChild(li);
});

document.getElementById("modalLink").href = stage.wiki;

modal.classList.add("active");
}

};
