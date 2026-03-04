const UI = {

logLines:[],

showCampaigns(){
menu.classList.add("hidden")
campaigns.classList.remove("hidden")
},

showArmies(){
campaigns.classList.add("hidden")
armies.classList.remove("hidden")

let html=""

for(let id in ARMIES){

let army=ARMIES[id]

html+=`
<button onclick="Game.chooseArmy('${id}')">
<h3>${army.name}</h3>
<p>${army.description}</p>
</button>
`

}

armyList.innerHTML=html
},

startGame(){
armies.classList.add("hidden")
game.classList.remove("hidden")
},

update(){

playerBar.style.width=Math.max(Game.player.hp,0)+"%"
enemyBar.style.width=Math.max(Game.enemy.hp,0)+"%"
wallBar.style.width=Math.max(Game.walls,0)+"%"

tpValue.innerText=Game.player.tp
},

log(text){

this.logLines.unshift(text)

if(this.logLines.length>6)
this.logLines.pop()

log.innerHTML=this.logLines.join("<br>")
},

/* ---------- ИСТОРИЯ ---------- */

showHistory(stage){

game.classList.add("hidden")

history.classList.remove("hidden")

histTitle.innerText=stage.title
histDesc.innerText=stage.desc

histFacts.innerHTML=""

stage.facts.forEach(f=>{
histFacts.innerHTML+="<li>"+f+"</li>"
})

wiki.href=stage.wiki

/* добавляем кнопку */

history.innerHTML+=`
<br>
<button id="continueBtn">Продолжить</button>
`

document
.getElementById("continueBtn")
.onclick=()=>{

UI.closeHistory()

}

},

closeHistory(){

history.classList.add("hidden")

this.showQuiz()

},

/* ---------- ВИКТОРИНА ---------- */

showQuiz(){

let q=QUIZ[Math.floor(Math.random()*QUIZ.length)]

quiz.classList.remove("hidden")

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

quiz.classList.add("hidden")

if(i===correct){

alert("Правильно!")

Achievements.unlock("quizMaster")

}else{

alert("Неправильно")

}

Game.continueCampaign()

game.classList.remove("hidden")

},

/* ---------- КАРТОЧКИ ---------- */

showCards(){

menu.classList.add("hidden")
cards.classList.remove("hidden")

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

Achievements.unlock("historian")
},

/* ---------- ДОСТИЖЕНИЯ ---------- */

showAchievements(){

menu.classList.add("hidden")
achievements.classList.remove("hidden")

let html=""

for(let id in Achievements.list){

let unlocked=Achievements.unlocked[id]

html+=`
<div>
${unlocked?"✅":"⬜"} ${Achievements.list[id]}
</div>
`

}

achList.innerHTML=html
},

back(){

cards.classList.add("hidden")
achievements.classList.add("hidden")
menu.classList.remove("hidden")

}

}
