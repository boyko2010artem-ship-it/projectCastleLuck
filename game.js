document.addEventListener("DOMContentLoaded", () => {

const Game = {

campaign:null,
stage:0,

player:{hp:100,maxHp:100,tp:0,morale:50},
enemy:{hp:100,maxHp:100,tp:0,morale:50},

start(type){
this.campaign = Data.campaigns[type];
document.getElementById("menu").classList.add("hidden");
document.getElementById("game").classList.remove("hidden");
this.stage=0;
this.loadStage();
},

loadStage(){
const s=this.campaign[this.stage];
document.getElementById("stageTitle").innerText=s.title;

this.player.hp=100;
this.enemy.hp=100;
this.player.tp=0;
this.player.morale=50;
this.enemy.morale=50;

UI.update();
},

playerAction(type){

let dmg=12;

if(this.player.morale>70) dmg+=2;
if(this.player.morale<30) dmg-=3;

if(type==="attack"){
this.enemy.hp-=dmg;
UI.log("⚔ Вы нанесли "+dmg);
}

if(type==="heal" && this.player.tp>=1){
this.player.hp+=10;
this.player.tp--;
UI.log("💚 Лечение 10");
}

if(type==="rocket" && this.player.tp>=2){
this.enemy.hp-=30;
this.player.tp-=2;
UI.log("🚀 30 урона");
}

this.player.tp++;
UI.update();

if(this.enemy.hp>0){
setTimeout(()=>this.aiTurn(),700);
}else{
this.player.morale+=20;
UI.showHistory(this.campaign[this.stage]);
}
},

aiTurn(){

let action="attack";

if(this.enemy.hp<30 && this.enemy.tp>=1){
action="heal";
}

if(this.enemy.tp>=2 && this.enemy.hp>40){
action="rocket";
}

if(action==="attack"){
this.player.hp-=10;
this.player.morale-=5;
UI.log("⚔ AI атакует 10");
}

if(action==="heal"){
this.enemy.hp+=8;
this.enemy.tp--;
UI.log("AI лечится");
}

if(action==="rocket"){
this.player.hp-=25;
this.enemy.tp-=2;
UI.log("AI 🚀 25");
}

this.enemy.tp++;
UI.update();

if(this.player.hp<=0){
alert("Поражение");
location.reload();
}
},

nextStage(){
document.getElementById("modal").classList.remove("active");

this.stage++;

if(this.stage>=this.campaign.length){
alert("Кампания завершена!");
location.reload();
return;
}

this.loadStage();
}

};

window.Game = Game;

document.getElementById("continueBtn").addEventListener("click", ()=>{
Game.nextStage();
});

});
