const Game={

campaign:null,
stage:0,
difficulty:1,

army:null,

player:{hp:100,tp:0},
enemy:{hp:100,tp:0},

chooseCampaign(c){

this.campaign=Data.campaigns[c]

playMenu.classList.add("hidden")
armyMenu.classList.remove("hidden")

let html=""

Object.keys(Data.armies).forEach(k=>{

let a=Data.armies[k]

html+=`<button onclick="Game.chooseArmy('${k}')">${a.icon} ${a.name}</button>`

})

armyList.innerHTML=html

},

chooseArmy(k){

this.army=Data.armies[k]

armyMenu.classList.add("hidden")
difficultyMenu.classList.remove("hidden")

},

startGame(diff){

this.difficulty=diff

difficultyMenu.classList.add("hidden")
game.classList.remove("hidden")

this.stage=0

this.loadStage()

},

loadStage(){

let s=this.campaign[this.stage]

stageTitle.innerText=s.title

this.player={
hp:this.army.hp,
tp:0
}

this.enemy={
hp:100,
tp:0
}

MapSystem.render()

UI.update()

},

playerAction(type){

if(type==="attack"){

this.enemy.hp-=this.army.damage
AudioSystem.beep(400)

}

if(type==="heal" && this.player.tp>=1){

this.player.hp+=10
this.player.tp--

}

if(type==="rocket" && this.player.tp>=2){

this.enemy.hp-=30
this.player.tp-=2

Achievements.unlock("rocket")

}

this.player.tp++

UI.update()

if(this.enemy.hp<=0){

Achievements.unlock("firstWin")

UI.showHistory(this.campaign[this.stage])

return

}

setTimeout(()=>{

AI.turn()

UI.update()

if(this.player.hp<=0){

alert("Вы проиграли")
location.reload()

}

},700)

},

nextStage(){

this.stage++

if(this.stage>=this.campaign.length){

alert("Кампания завершена")
location.reload()

}

this.loadStage()

}

}
