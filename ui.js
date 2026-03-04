const UI = {

logLines:[],

/* вспомогательные функции */

show(id){
document.getElementById(id).classList.remove("hidden")
},

hide(id){
document.getElementById(id).classList.add("hidden")
},

/* меню */

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

/* лог */

log(text){

let log=document.getElementById("log")

this.logLines.unshift(text)

if(this.logLines.length>6)
this.logLines.pop()

log.innerHTML=this.logLines.join("<br>")

},

/* обновление интерфейса */

update(){

let playerBar=document.getElementById("playerBar")
let enemyBar=document.getElementById("enemyBar")
let wallBar=document.getElementById("wallBar")
let tpValue=document.getElementById("tpValue")

playerBar.style.width=Math.max(Game.player.hp,0)+"%"
enemyBar.style.width=Math.max(Game.enemy.hp,0)+"%"
wallBar.style.width=Math.max(Game.walls,0)+"%"

tpValue.innerText=Game.player.tp

},

/* ---------- история ---------- */

showHistory(stage){

this.hide("game")
this.show("history")

let histTitle=document.getElementById("histTitle")
let histDesc=document.getElementById("histDesc")
let histFacts=document.getElementById("histFacts")
let wiki=document.getElementById("wiki")

histTitle.innerText=stage.title
histDesc.innerText=stage.desc

histFacts.innerHTML=""

stage.facts.forEach(f=>{
histFacts.innerHTML+="<li>"+f+"</li>"
})

wiki.href=stage.wiki

},

closeHistory(){

this.hide("history")

this.showQuiz()

},

/* ---------- викторина ---------- */

showQuiz(){

let quiz=document.getElementById("quiz")
let quizQuestion=document.getElementById("quizQuestion")
let quizAnswers=document.getElementById("quizAnswers")

let q=QUIZ[Math.floor(Math.random()*QUIZ.length)]

this.show("quiz")

quizQuestion.innerText=q.q

quizAnswers.innerHTML=""

q.a.forEach((ans,i)=>{

quizAnswers.innerHTML+=`
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

/* карточки */

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

/* достижения */

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
