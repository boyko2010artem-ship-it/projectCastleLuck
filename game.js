const Game={

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

this.campaign=DATA[name]

if(name==="europe")
Achievements.unlock("europeStart")

if(name==="rus")
Achievements.unlock("rusStart")

UI.showArmies()

},

chooseArmy(id){

this.army=ARMIES[id]

Achievements.unlock(id+"Army")

UI.startGame()

this.startStage()

},

startStage(){

let s=this.campaign[this.stage]

cityName.innerText=s.city

this.player.hp=this.army.hp
this.enemy.hp=s.garrison
this.walls=s.walls
this.player.tp=0

MapSystem.render()

this.updateWalls()

UI.update()

},

updateWalls(){

let el=document.getElementById("wallVisual")

if(this.walls>35) el.className="wall1"
else if(this.walls>25) el.className="wall2"
else if(this.walls>10) el.className="wall3"
else el.className="wall4"

},

attack(){

Achievements.unlock("firstAttack")

let dmg=this.army.attack

this.enemy.hp-=dmg

UI.log("Атака "+dmg)

AudioSystem.play(400)

this.turn()

},

siege(){

Achievements.unlock("firstSiege")

let dmg=12

this.walls-=dmg

this.updateWalls()

UI.log("Осада нанесла "+dmg)

AudioSystem.play(200)

this.turn()

},

heal(){

Achievements.unlock("firstHeal")

if(this.player.tp<1) return

this.player.hp+=10

this.player.tp--

UI.log("Лечение")

AudioSystem.play(600)

this.turn()

},

special(){

Achievements.unlock("firstSpecial")

if(this.player.tp<2) return

this.enemy.hp-=30

this.player.tp-=2

UI.log("Спецудар")

AudioSystem.play(120)

this.turn()

},

turn(){

this.player.tp++

UI.update()

if(this.walls<=0 && this.enemy.hp<=0){

Achievements.unlock("firstCity")

UI.showHistory(this.campaign[this.stage])

return

}

setTimeout(()=>{

AI.turn()

UI.update()

},600)

},

next(){

this.stage++

if(this.stage>=this.campaign.length){

Achievements.unlock("campaignWin")

alert("Кампания завершена")

location.reload()

return

}

this.startStage()

}

}
