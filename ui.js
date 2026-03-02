const UI = {

update(){
let pPercent=(Game.player.hp/Game.player.maxHp)*100;
let ePercent=(Game.enemy.hp/Game.enemy.maxHp)*100;

playerBar.style.width=pPercent+"%";
enemyBar.style.width=ePercent+"%";

if(pPercent<30) playerBar.classList.add("low");
else playerBar.classList.remove("low");

if(ePercent<30) enemyBar.classList.add("low");
else enemyBar.classList.remove("low");

playerMorale.innerText=Game.player.morale;
enemyMorale.innerText=Game.enemy.morale;
playerTP.innerText=Game.player.tp;
},

log(text){
log.innerText=text;
},

shake(){
document.body.classList.add("shake");
setTimeout(()=>document.body.classList.remove("shake"),300);
}

};
