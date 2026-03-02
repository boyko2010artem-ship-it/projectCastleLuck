document.addEventListener("DOMContentLoaded",()=>{

const Game={
campaign:null,
currentCampaign:null,
stage:0,

player:{hp:100,tp:0,morale:50},
enemy:{hp:100,tp:0,morale:50},

stats:{turns:0,damageDealt:0,damageTaken:0},

start(type){
this.currentCampaign=type;
this.campaign=Data.campaigns[type];
menu.classList.add("hidden");
game.classList.remove("hidden");
this.stage=0;
this.loadStage();
},

loadStage(){
stageTitle.innerText=this.campaign[this.stage].title;
this.player={hp:100,tp:0,morale:50};
this.enemy={hp:100,tp:0,morale:50};
this.stats={turns:0,damageDealt:0,damageTaken:0};
UI.update();
UI.renderMap();
},

playerAction(type){
let dmg=12;

if(type==="attack"){
this.enemy.hp-=dmg;
this.stats.damageDealt+=dmg;
UI.log("⚔ "+dmg);
}

if(type==="heal" && this.player.tp>=1){
this.player.hp+=10;
this.player.tp--;
}

if(type==="rocket" && this.player.tp>=2){
this.enemy.hp-=30;
this.player.tp-=2;
this.stats.damageDealt+=30;
UI.log("🚀 30");
}

this.player.tp++;
this.stats.turns++;
UI.update();

if(this.enemy.hp<=0){
UI.showVictory(this.stats);
}else{
setTimeout(()=>this.aiTurn(),600);
}
},

aiTurn(){
let dmg=10+this.campaign[this.stage].difficulty*2;
this.player.hp-=dmg;
this.stats.damageTaken+=dmg;
this.enemy.tp++;
UI.log("AI "+dmg);
UI.update();

if(this.player.hp<=0){
location.reload();
}
},

nextStage(){
victoryScreen.classList.add("hidden");
modal.classList.add("hidden");
this.stage++;
if(this.stage>=this.campaign.length){
location.reload();
}else{
this.loadStage();
}
}

};

window.Game=Game;

victoryBtn.addEventListener("click",()=>{
UI.showHistory(Game.campaign[Game.stage]);
});

continueBtn.addEventListener("click",()=>{
Game.nextStage();
});

});
