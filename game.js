const Game={

player:{hp:100,tp:0},
enemy:{hp:100,tp:0},

campaign:[],
stage:0,
difficulty:1,

startCampaign(type){

UI.hideAll()
gameScreen.classList.remove("hidden")

this.campaign=DATA[type]

this.stage=0

this.loadStage()

},

loadStage(){

let s=this.campaign[this.stage]

this.player.hp=100
this.enemy.hp=100
this.player.tp=0

UI.showHistory(s)

},

nextStage(){

this.stage++

if(this.stage>=this.campaign.length){

alert("Кампания завершена")

UI.backMenu()

return

}

this.loadStage()

},

attack(){

let dmg=10+this.player.tp

this.enemy.hp-=dmg

this.player.tp++

AudioSystem.attack()

UI.log("Вы атаковали "+dmg)

this.afterTurn()

},

build(){

this.player.hp+=6

this.player.tp++

AudioSystem.heal()

UI.log("Вы укрепили стены")

this.afterTurn()

},

heal(){

if(this.player.tp<1) return

this.player.hp+=12

this.player.tp--

AudioSystem.heal()

UI.log("Лечение")

this.afterTurn()

},

rocket(){

if(this.player.tp<2) return

this.enemy.hp-=28

this.player.tp-=2

AudioSystem.rocket()

UI.log("Ракетный удар")

this.afterTurn()

},

afterTurn(){

UI.update()

if(this.enemy.hp<=0){

Achievements.unlock("firstWin")

setTimeout(()=>Game.nextStage(),1200)

return

}

setTimeout(()=>{

AI.turn()

UI.update()

if(this.player.hp<=0){

alert("Поражение")

UI.backMenu()

}

},700)

}

}
