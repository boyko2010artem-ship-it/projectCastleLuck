const UI={

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
${army.name}
<br>
<small>${army.description}</small>
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

playerBar.style.width=Game.player.hp+"%"

enemyBar.style.width=Game.enemy.hp+"%"

wallBar.style.width=Game.walls+"%"

tpValue.innerText=Game.player.tp

},

log(t){

log.innerText=t

},

showHistory(s){

game.classList.add("hidden")

history.classList.remove("hidden")

histTitle.innerText=s.title

histDesc.innerText=s.desc

histFacts.innerHTML=""

s.facts.forEach(f=>{

histFacts.innerHTML+="<li>"+f+"</li>"

})

wiki.href=s.wiki

},

closeHistory(){

history.classList.add("hidden")

UI.showQuiz()

},

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

}else{

alert("Неправильно")

}

Game.next()

game.classList.remove("hidden")

},

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

},

showAchievements(){

menu.classList.add("hidden")

achievements.classList.remove("hidden")

let html=""

for(let id in Achievements.list){

let ok=Achievements.unlocked[id]

html+=`
<div>
${ok?"✅":"⬜"} ${Achievements.list[id]}
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
