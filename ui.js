const UI={

logLines:[],

/* ---------- управление экранами ---------- */

show(id){

document.getElementById(id).classList.remove("hidden")

},

hide(id){

document.getElementById(id).classList.add("hidden")

},

/* ---------- меню ---------- */

showCampaigns(){

this.hide("menu")
this.show("campaigns")

},

showArmies(){

this.hide("campaigns")
this.show("armies")

let armyList=document.getElementById("armyList")

let html=""

for(let id in ARMIES){

let a=ARMIES[id]

html+=`
<button onclick="Game.chooseArmy('${id}')">
<h3>${a.name}</h3>
<p>${a.description}</p>
</button>
`

}

armyList.innerHTML=html

},

startGame(){

this.hide("armies")
this.show("game")

},

back(){

this.hide("campaigns")
this.hide("armies")
this.hide("cards")
this.hide("achievements")

this.show("menu")

},

/* ---------- лог ---------- */

log(text){

let log=document.getElementById("log")

this.logLines.unshift(text)

if(this.logLines.length>6)
this.logLines.pop()

log.innerHTML=this.logLines.join("<br>")

},

/* ---------- обновление интерфейса ---------- */

update(){

document.getElementById("playerBar").style.width=
Math.max(Game.player.hp,0)+"%"

document.getElementById("enemyBar").style.width=
Math.max(Game.enemy.hp,0)+"%"

document.getElementById("tpValue").innerText=
Game.player.tp

},

/* ---------- экран победы ---------- */

showVictory(city){

this.hide("game")
this.show("victory")

document.getElementById("victoryCity").innerText=
"Вы захватили "+city

AudioSystem.victory()

},

closeVictory(){

this.hide("victory")

this.showHistory(Game.currentStage)

},

/* ---------- история ---------- */

showHistory(stage){

this.hide("game")
this.show("history")

document.getElementById("histTitle").innerText=stage.title
document.getElementById("histDesc").innerText=stage.desc

let facts=document.getElementById("histFacts")

facts.innerHTML=""

stage.facts.forEach(f=>{

facts.innerHTML+="<li>"+f+"</li>"

})

document.getElementById("wiki").href=stage.wiki

},

closeHistory(){

this.hide("history")

this.showQuiz()

},

/* ---------- викторина ---------- */

showQuiz(){

let q=QUIZ[Math.floor(Math.random()*QUIZ.length)]

this.show("quiz")

document.getElementById("quizQuestion").innerText=q.q

let answers=document.getElementById("quizAnswers")

answers.innerHTML=""

q.a.forEach((ans,i)=>{

answers.innerHTML+=`
<button onclick="UI.answer(${i},${q.correct})">
${ans}
</button>
`

})

},

answer(i,correct){

this.hide("quiz")

if(i===correct){

alert("Правильно!")

Achievements.unlock("quizMaster")

}else{

alert("Неправильно")

}

Game.continueCampaign()

this.show("game")

},

/* ---------- карточки ---------- */

showCards(){

this.hide("menu")
this.show("cards")

let cardsList=document.getElementById("cardsList")

let html=""

CARDS.forEach(c=>{

html+=`
<div class="card">
<h3>${c.title}</h3>
<p>${c.text}</p>
</div>
`

})

cardsList.innerHTML=html

},

/* ---------- достижения ---------- */

showAchievements(){

this.hide("menu")
this.show("achievements")

let achList=document.getElementById("achList")

let html=""

for(let id in Achievements.list){

let unlocked=Achievements.unlocked[id]

html+=`
<div>
${unlocked?"🏆":"⬜"} ${Achievements.list[id]}
</div>
`

}

achList.innerHTML=html

}

}
