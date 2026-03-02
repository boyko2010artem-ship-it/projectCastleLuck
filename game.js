const Game = {

campaign:null,
stage:0,

player:{hp:0,maxHp:0,tp:0,rocket:0,morale:50,fatigue:0},
enemy:{hp:100,maxHp:100,tp:0,rocket:0,morale:50,fatigue:0},

startCampaign(type){
this.campaign=Data.campaigns[type];
menu.classList.add("hidden");
game.classList.remove("hidden");

this.player.maxHp=125;
this.player.hp=125;
this.stage=0;
this.loadStage();
},

loadStage(){
let s=this.campaign[this.stage];
stageTitle.innerText=s.title;
this.enemy.hp=this.enemy.maxHp;
UI.updateBars();
},

playerAction(type){

let dmg=12;

if(this.player.morale>70) dmg+=3;
if(this.player.morale<30) dmg-=3;

if(type==="attack"){
this.enemy.hp-=dmg;
AudioEngine.attack();
UI.log("Атака "+dmg);
}

if(type==="heal" && this.player.tp>=1){
this.player.hp+=10;
this.player.tp--;
this.player.fatigue=Math.max(0,this.player.fatigue-1);
AudioEngine.heal();
}

if(type==="rocket" && this.player.tp>=2){
this.enemy.hp-=30;
this.player.tp-=2;
this.player.fatigue++;
AudioEngine.rocket();
}

if(type==="prayer" && this.campaign===Data.campaigns.RUS && this.player.tp>=2){
this.player.hp+=15;
this.player.morale+=10;
this.player.tp-=2;
}

this.player.tp++;
UI.updateBars();

setTimeout(()=>this.aiTurn(),600);
},

aiTurn(){

let dmg=10;

if(this.enemy.morale>70) dmg+=3;
if(this.enemy.morale<30) dmg-=3;

this.player.hp-=dmg;
this.player.morale-=5;

UI.log("AI атакует "+dmg);

this.checkWin();
UI.updateBars();
},

checkWin(){

if(this.enemy.hp<=0){
this.player.morale+=20;
UI.openHistory(this.campaign[this.stage]);
}

if(this.player.hp<=0){
alert("Поражение");
location.reload();
}

},

nextStage(){
modal.style.display="none";
this.stage++;
if(this.stage>=this.campaign.length){
AudioEngine.victory();
alert("Кампания завершена!");
location.reload();
}
this.player.hp=this.player.maxHp;
this.loadStage();
}

};