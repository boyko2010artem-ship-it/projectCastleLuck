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

UI.showArmies()

},

chooseArmy(id){

this.army=ARMIES[id]

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

let dmg=this.army.attack

this.enemy.hp-=dmg

UI.log("Вы атаковали гарнизон "+dmg)

AudioSystem.attack()

this.animateHit(enemyBar)

this.turn()

},

siege(){

let dmg=12

this.walls-=dmg

if(this.walls<0) this.walls=0

UI.log("Вы разрушаете стены "+dmg)

AudioSystem.siege()

this.animateWall()

this.updateWalls()

this.turn()

},

heal(){

if(this.player.tp<1){

UI.log("Нужно очко действия")

return

}

this.player.hp+=10

this.player.tp--

AudioSystem.heal()

UI.log("Вы лечитесь")

this.turn()

},

special(){

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

},300)

},

turn(){

this.player.tp++

UI.update()

// победа

if(this.walls<=0 && this.enemy.hp<=0){

setTimeout(()=>{

this.victory()

},600)

return

}

// ход AI

setTimeout(()=>{

AI.turn()

this.checkLose()

UI.update()

},800)

},

victory(){

AudioSystem.victory()

game.classList.add("hidden")

let win=document.createElement("div")

win.id="victoryScreen"

win.innerHTML=`

<h2>🏆 Город захвачен!</h2>

<button onclick="Game.continueCampaign()">
Продолжить
</button>

`

document.body.appendChild(win)

},

continueCampaign(){

let win=document.getElementById("victoryScreen")

if(win) win.remove()

this.stage++

if(this.stage>=this.campaign.length){

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
