const Game = {

campaign:[],
stage:0,

player:{
hp:100,
tp:0
},

enemy:{
hp:0
},

walls:0,
army:null,

chooseCampaign(name){

this.campaign = DATA[name]

if(name==="europe")
Achievements.unlock("europeStart")

if(name==="rus")
Achievements.unlock("rusStart")

UI.showArmies()

},

chooseArmy(id){

this.army = ARMIES[id]

Achievements.unlock(id+"Army")

UI.startGame()

this.stage = 0

this.startStage()

},

startStage(){

let stage = this.campaign[this.stage]

cityName.innerText = stage.city

this.player.hp = this.army.hp
this.enemy.hp = stage.garrison
this.walls = stage.walls
this.player.tp = 0

MapSystem.render()

this.updateWalls()

UI.update()

UI.log("Осада города " + stage.city)

},

updateWalls(){

let wall = document.getElementById("wallVisual")

if(this.walls>35) wall.className="wall1"
else if(this.walls>25) wall.className="wall2"
else if(this.walls>10) wall.className="wall3"
else wall.className="wall4"

},

attack(){

Achievements.unlock("firstAttack")

let dmg = this.army.attack

this.enemy.hp -= dmg

UI.log("Вы атаковали гарнизон: " + dmg)

AudioSystem.attack()

this.animateHit(enemyBar)

this.turn()

},

siege(){

Achievements.unlock("firstSiege")

let dmg = 12

this.walls -= dmg

if(this.walls<0) this.walls = 0

Achievements.addStat("walls",1)

UI.log("Вы разрушаете стены: " + dmg)

AudioSystem.siege()

this.animateWall()

this.updateWalls()

this.turn()

},

heal(){

Achievements.unlock("firstHeal")

if(this.player.tp < 1){
UI.log("Недостаточно очков действий")
return
}

this.player.hp += 10
this.player.tp --

AudioSystem.heal()

UI.log("Вы лечитесь")

this.turn()

},

special(){

Achievements.unlock("firstSpecial")

if(this.player.tp < 2){
UI.log("Нужно 2 очка действий")
return
}

this.player.tp -= 2

let dmg = 30

this.enemy.hp -= dmg

AudioSystem.special()

UI.log("Спецудар: " + dmg)

this.animateHit(enemyBar)

this.turn()

},

animateHit(el){

el.classList.add("hit")

setTimeout(()=>{
el.classList.remove("hit")
},300)

},

animateWall(){

let wall = document.getElementById("wallVisual")

wall.classList.add("wallShake")

setTimeout(()=>{
wall.classList.remove("wallShake")
},350)

},

turn(){

this.player.tp++

UI.update()

/* победа */

if(this.enemy.hp<=0 && this.walls<=0){

Achievements.addStat("cities",1)
Achievements.addStat("wins",1)

setTimeout(()=>{
this.victory()
},500)

return

}

/* ход AI */

setTimeout(()=>{

AI.turn()

UI.update()

this.checkLose()

},800)

},

victory(){

AudioSystem.victory()

let stage = this.campaign[this.stage]

UI.showHistory(stage)

},

continueCampaign(){

this.stage++

if(this.stage >= this.campaign.length){

Achievements.unlock("campaignWin")

alert("Кампания завершена!")

location.reload()

return

}

game.classList.remove("hidden")

this.startStage()

},

checkLose(){

if(this.player.hp<=0){

AudioSystem.lose()

alert("Вы проиграли осаду")

location.reload()

}

}

}
