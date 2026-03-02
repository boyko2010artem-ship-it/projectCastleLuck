const UI = {

update(){
playerBar.style.width=(Game.player.hp/Game.player.maxHp*100)+"%";
enemyBar.style.width=(Game.enemy.hp/Game.enemy.maxHp*100)+"%";

playerMorale.innerText=Game.player.morale;
enemyMorale.innerText=Game.enemy.morale;
playerTP.innerText=Game.player.tp;
},

log(text){
log.innerText=text;
}

};
