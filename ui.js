const UI={

openPlay(){

mainMenu.classList.add("hidden")
playMenu.classList.remove("hidden")

},

backMenu(){

document.querySelectorAll(".screen")
.forEach(s=>s.classList.add("hidden"))

mainMenu.classList.remove("hidden")

},

openAchievements(){

mainMenu.classList.add("hidden")
achievementsScreen.classList.remove("hidden")

let list=""

for(let a in Achievements.list){

list+=`<div>${Achievements.unlocked[a]?"✅":"⬜"} ${Achievements.list[a]}</div>`

}

achievementsList.innerHTML=list

},

openAbout(){

alert("Castleluck — историческая стратегия")

},

log(t){

log.innerText=t

},

update(){

playerBar.style.width=Game.player.hp+"%"
enemyBar.style.width=Game.enemy.hp+"%"
playerTP.innerText=Game.player.tp

},

showHistory(stage){

historyTitle.innerText=stage.title
historyDesc.innerText=stage.desc

historyFacts.innerHTML=""

stage.facts.forEach(f=>{
historyFacts.innerHTML+="<li>"+f+"</li>"
})

wikiLink.href=stage.wiki

historyModal.classList.remove("hidden")

},

closeHistory(){

historyModal.classList.add("hidden")

Game.nextStage()

}

}
