const Game={

campaign:null,
stageIndex:0,
currentStage:null,

player:{
hp:100,
tp:0
},

enemy:{
hp:100
},

walls:100,

/* ---------- старт кампании ---------- */

startCampaign(id){

this.campaign=DATA[id]

this.stageIndex=0

UI.showArmies()

},

/* ---------- выбор армии ---------- */

chooseArmy(id){

this.army=ARMIES[id]

UI.startGame()

this.loadStage()

},

/* ---------- загрузка города ---------- */

loadStage(){

this.currentStage=this.campaign[this.stageIndex]

this.enemy.hp=this.currentStage.garrison

this.walls=this.currentStage.walls

this.player.hp=100
this.player.tp=0

this.updateWalls()

UI.update()

UI.log("Осада города "+this.currentStage.city)

this.renderMap()

},

/* ---------- карта ---------- */

renderMap(){

let map=document.getElementById("map")

let html=""

this.campaign.forEach((s,i)=>{

let cls="city"

if(i<this.stageIndex) cls+=" conquered"
if(i===this.stageIndex) cls+=" current"

html+=`
<div class="${cls}">
<div class="icon">🏰</div>
<div class="name">${s.city}</div>
</div>
`

})

map.innerHTML=html

},

/* ---------- атака ---------- */

attack(){

let dmg=10

this.enemy.hp-=dmg

UI.log("Вы атаковали на "+dmg)

AudioSystem.attack()

enemyBar.classList.add("hit")

setTimeout(()=>{

enemyBar.classList.remove("hit")

},300)

this.player.tp++

this.afterPlayerTurn()

},

/* ---------- осада ---------- */

siege(){

let dmg=12

this.walls-=dmg

if(this.walls<0) this.walls=0

UI.log("Вы разрушаете стены")

AudioSystem.siege()

this.animateWall()

this.updateWalls()

this.player.tp++

this.afterPlayerTurn()

},

/* ---------- лечение ---------- */

heal(){

let heal=10

this.player.hp+=heal

if(this.player.hp>100) this.player.hp=100

UI.log("Вы лечитесь "+heal)

AudioSystem.heal()

this.player.tp++

this.afterPlayerTurn()

},

/* ---------- спец атака ---------- */

special(){

if(this.player.tp<3){

UI.log("Недостаточно TP")

return

}

let dmg=25

this.enemy.hp-=dmg

this.player.tp=0

UI.log("Спецудар "+dmg)

AudioSystem.special()

enemyBar.classList.add("hit")

setTimeout(()=>{

enemyBar.classList.remove("hit")

},300)

this.afterPlayerTurn()

},

/* ---------- после хода ---------- */

afterPlayerTurn(){

UI.update()

Achievements.check()

if(this.enemy.hp<=0){

UI.showVictory(this.currentStage.city)

return

}

setTimeout(()=>{

AI.turn()

UI.update()

if(this.player.hp<=0){

alert("Вы проиграли")

location.reload()

}

},600)

},

/* ---------- продолжить кампанию ---------- */

continueCampaign(){

this.stageIndex++

if(this.stageIndex>=this.campaign.length){

alert("Кампания завершена!")

location.reload()

return

}

this.loadStage()

},

/* ---------- стены ---------- */

updateWalls(){

let wall=document.getElementById("wallVisual")

wall.className=""

if(this.walls>75) wall.classList.add("wall1")
else if(this.walls>50) wall.classList.add("wall2")
else if(this.walls>25) wall.classList.add("wall3")
else wall.classList.add("wall4")

document.getElementById("wallBar").style.width=this.walls+"%"

},

/* ---------- анимация стен ---------- */

animateWall(){

let wall=document.getElementById("wallVisual")

wall.classList.add("wallBreak")

for(let i=0;i<6;i++){

let stone=document.createElement("div")

stone.className="stone"

stone.style.left=(70+Math.random()*40)+"px"
stone.style.top="80px"

document.getElementById("castle").appendChild(stone)

setTimeout(()=>{

stone.remove()

},700)

}

setTimeout(()=>{

wall.classList.remove("wallBreak")

},350)

}

}
