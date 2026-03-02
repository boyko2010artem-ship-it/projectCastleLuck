const UI = {

log(text){
let div=document.createElement("div");
div.innerText=text;
log.prepend(div);
},

updateBars(){
playerBar.style.width=(Game.player.hp/Game.player.maxHp*100)+"%";
enemyBar.style.width=(Game.enemy.hp/Game.enemy.maxHp*100)+"%";
playerMorale.innerText=Game.player.morale;
enemyMorale.innerText=Game.enemy.morale;
},

openHistory(stage){
modalTitle.innerText=stage.title;
modalText.innerText=stage.desc;
modalFacts.innerHTML="";
stage.facts.forEach(f=>{
let li=document.createElement("li");
li.innerText=f;
modalFacts.appendChild(li);
});
qr.src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+encodeURIComponent(stage.wiki);
modal.style.display="flex";
},

openStats(){
alert("Статистика скоро расширится.");
}

};