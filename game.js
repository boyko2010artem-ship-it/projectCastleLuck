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

Achievements.unlock(name==="europe"?"europeStart":"rusStart")

UI.showArmies()

},

chooseArmy(id){

this.army=ARMIES[id]

Achievements.unlock(id+"Army")

UI.startGame()

this.stage=0

AudioSystem.music()

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

UI.log("Началась осада города "+s.city)

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

UI.log("Вы атаковали гарнизон "+dmg)

AudioSystem.attack()

this.animateHit(enemyBar)

this.turn()

},

siege(){

Achievements.unlock("firstSiege")

let dmg=12

this.walls-=dmg

if(this.walls<0) this.walls=0

Achievements.addStat("walls",1)

UI.log("Вы наносите удар по стенам "+dmg)

AudioSystem.siege()

this.animateWall()

this.updateWalls()

this.turn()

},

heal(){

Achievements.unlock("firstHeal")

if(this.player.tp<1){

UI.log("Недостаточно очков действий")

return

}

this.player.hp+=10

if(this.player.hp>100)
this.player.hp=100

this.player.tp--

AudioSystem.heal()

UI.log("Вы лечитесь")

this.turn()

},

special(){

Achievements.unlock("firstSpecial")

if(this.player.tp<2){

UI.log("Нужно 2 очка действия")

return

}

this.player.tp-=2

let dmg=30

this.enemy.hp-=dmg

AudioSystem.special()

UI.log("Мощный удар "+dmg)

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

let wall=document.getElementById("wallVisual")

wall.classList.add("wallShake")

setTimeout(()=>{

wall.classList.remove("wallShake")

},350)

},

turn(){

this.player.tp++

UI.update()

// победа

if(this.walls<=0 && this.enemy.hp<=0){

Achievements.addStat("cities",1)
Achievements.addStat("wins",1)

setTimeout(()=>{

this.showVictory()

},500)

return

}

// ход AI

setTimeout(()=>{

AI.turn()

this.checkLose()

UI.update()

},800)

},

showVictory(){

AudioSystem.victory()

let s=this.campaign[this.stage]

UI.showHistory(s)

},

continueCampaign(){

this.stage++

if(this.stage>=this.campaign.length){

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
