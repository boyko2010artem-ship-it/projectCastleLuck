document.addEventListener("DOMContentLoaded",()=>{

const Game={

campaign:null,
currentCampaign:null,
stage:0,

army:null,
armyKey:null,

player:{hp:100,tp:0,morale:50},
enemy:{hp:100,tp:0,morale:50},

stats:{turns:0,damageDealt:0,damageTaken:0},

start(type){

this.currentCampaign=type
this.campaign=Data.campaigns[type]

this.chooseArmy()

},

chooseArmy(){

let list=Object.keys(Data.armies)

let text="Выберите армию:\n"

list.forEach((a,i)=>{
text+=`${i+1}. ${Data.armies[a].name}\n`
})

let choice=prompt(text)

let key=list[choice-1]

this.armyKey=key
this.army=Data.armies[key]

menu.classList.add("hidden")
game.classList.remove("hidden")

this.stage=0

this.loadStage()

},

loadStage(){

stageTitle.innerText=this.campaign[this.stage].title

this.player={
hp:this.army.hp,
tp:0,
morale:50
}

this.enemy={
hp:100,
tp:0,
morale:50
}

this.stats={
turns:0,
damageDealt:0,
damageTaken:0
}

UI.update()
UI.renderMap()

SaveSystem.save()

},

playerAction(type){

let dmg=this.army.damage

if(type==="attack"){

this.enemy.hp-=dmg
this.stats.damageDealt+=dmg

UI.log("⚔ "+dmg)

}

if(type==="heal" && this.player.tp>=1){

this.player.hp+=10
this.player.tp--

}

if(type==="rocket" && this.player.tp>=2){

this.enemy.hp-=30
this.player.tp-=2

Achievements.unlock("rocketMaster")

}

this.player.tp++

this.stats.turns++

if(Math.random()<0.25){

let e=Events[Math.floor(Math.random()*Events.length)]

e.effect()

}

UI.update()

if(this.enemy.hp<=0){

UI.showVictory(this.stats)

}else{

setTimeout(()=>this.aiTurn(),700)

}

},

aiTurn(){

let dmg=10+this.campaign[this.stage].difficulty*2

this.player.hp-=dmg

this.enemy.tp++

this.stats.damageTaken+=dmg

UI.log("AI ⚔ "+dmg)

UI.update()

if(this.player.hp<=0){

alert("Вы проиграли")

location.reload()

}

},

nextStage(){

this.stage++

if(this.stage>=this.campaign.length){

Achievements.unlock("campaignWin")

alert("Кампания завершена")

SaveSystem.clear()

location.reload()

}else{

this.loadStage()

}

}

}

window.Game=Game


victoryBtn.onclick=()=>{

victoryScreen.classList.add("hidden")

UI.showHistory(Game.campaign[Game.stage])

}


continueBtn.onclick=()=>{

modal.classList.add("hidden")

Game.nextStage()

}

})
