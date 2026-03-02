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
