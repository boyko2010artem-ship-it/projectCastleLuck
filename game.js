const Game = {

campaign:[],
stage:0,

army:null,

player:{
hp:100,
tp:0
},

enemy:{
hp:0
},

walls:0,

/* выбор кампании */

chooseCampaign(name){

this.campaign=DATA[name]

UI.showArmies()

},

/* выбор армии */

chooseArmy(id){

this.army=ARMIES[id]

this.stage=0

UI.startGame()

this.startStage()

},

/* начало города */

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

/* ---------- обновление стен ---------- */

updateWalls(){

let wall=document.getElementById("wallVisual")

if(this.walls>35) wall.className="wall1"
else if(this.walls>25) wall.className="wall2"
else if(this.walls>10) wall.className="wall3"
else wall.className="wall4"

},

/* ---------- атака ---------- */

attack(){

let dmg=this.army.attack

this.enemy.hp-=dmg

UI.log("Вы атаковали гарнизон на "+dmg)

AudioSystem.attack()

this.animateHit(enemyBar)

this.turn()

},

/* ---------- осада ---------- */

siege(){

let dmg=12

this.walls-=dmg

if(this.walls<0) this.walls=0

UI.log("Вы разрушаете стены на "+dmg)

AudioSystem.siege()

this.animateWall()

this.updateWalls()

this.turn()

},

/* ---------- лечение ---------- */

heal(){

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

/* ---------- спецудар ---------- */

special(){

if(this.player.tp<2){

UI.log("Нужно 2 очка действий")

return

}

this.player.tp-=2

let dmg=30

this.enemy.hp-=dmg

UI.log("Мощный удар "+dmg)

AudioSystem.special()

this.animateHit(enemyBar)

this.turn()

},

/* ---------- анимация удара ---------- */

animateHit(el){

el.classList.add("hit")

setTimeout(()=>{

el.classList.remove("hit")

},300)

},

/* ---------- анимация стен ---------- */

animateWall(){

let wall=document.getElementById("wallVisual")

wall.classList.add("wallShake")

setTimeout(()=>{

wall.classList.remove("wallShake")

},350)

},

/* ---------- ход ---------- */

turn(){

this.player.tp++

UI.update()

/* победа */

if(this.enemy.hp<=0 && this.walls<=0){

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

/* ---------- победа ---------- */

victory(){

AudioSystem.victory()

let stage=this.campaign[this.stage]

UI.showHistory(stage)

},

/* ---------- следующий город ---------- */

continueCampaign(){

this.stage++

if(this.stage>=this.campaign.length){

alert("Кампания завершена!")

location.reload()

return

}

game.classList.remove("hidden")

this.startStage()

},

/* ---------- поражение ---------- */

checkLose(){

if(this.player.hp<=0){

AudioSystem.lose()

alert("Вы проиграли осаду")

location.reload()

}

}

}
