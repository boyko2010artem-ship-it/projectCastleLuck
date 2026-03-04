const UI={

update(){

playerBar.style.width=Game.player.hp+"%"
enemyBar.style.width=Game.enemy.hp+"%"

playerMorale.innerText=Game.player.morale
enemyMorale.innerText=Game.enemy.morale
playerTP.innerText=Game.player.tp

},

log(text){
log.innerText=text
},

renderMap(){
MapSystem.render()
},

showVictory(stats){

victoryTitle.innerText="ПОБЕДА"

victoryStats.innerHTML=
`Ходов: ${stats.turns}<br>
Урон: ${stats.damageDealt}<br>
Получено: ${stats.damageTaken}`

victoryScreen.classList.remove("hidden")

},

showHistory(stage){

modalTitle.innerText=stage.title
modalDesc.innerText=stage.desc

modalFacts.innerHTML=""

stage.facts.forEach(f=>{
let li=document.createElement("li")
li.innerText=f
modalFacts.appendChild(li)
})

modalLink.href=stage.wiki

modal.classList.remove("hidden")

}

}
