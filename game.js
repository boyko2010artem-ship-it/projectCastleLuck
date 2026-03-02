const Game = {

stage:0,

player:{
hp:100,
maxHp:100,
tp:0,
morale:50
},

enemy:{
hp:100,
maxHp:100,
tp:0,
morale:50
},

start(){
menu.classList.add("hidden");
game.classList.remove("hidden");

this.stage=0;
this.loadStage();
},

loadStage(){
stageTitle.innerText=Data.stages[this.stage].title;
this.player.hp=100;
this.enemy.hp=100;
this.player.tp=0;
this.player.morale=50;
this.enemy.morale=50;
UI.update();
},

playerAction(type){

if(type==="attack"){
let dmg=12;
this.enemy.hp-=dmg;
UI.log("Вы атаковали на "+dmg);
}

if(type==="heal" && this.player.tp>=1){
this.player.hp+=10;
this.player.tp--;
UI.log("Вы восстановили 10 HP");
}

if(type==="rocket" && this.player.tp>=2){
this.enemy.hp-=30;
this.player.tp-=2;
UI.log("🚀 Ракетный удар 30 урона");
}

this.player.tp++;
UI.update();

if(this.enemy.hp>0){
setTimeout(()=>this.aiTurn(),600);
}else{
this.nextStage();
}
},

aiTurn(){

let dmg=10;
this.player.hp-=dmg;
this.player.morale-=5;

UI.log("AI атакует на "+dmg);

UI.update();

if(this.player.hp<=0){
alert("Поражение");
location.reload();
}

},

nextStage(){
this.stage++;

if(this.stage>=Data.stages.length){
alert("Кампания завершена!");
location.reload();
}

this.loadStage();
}

};
