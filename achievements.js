const Achievements={

list:{

firstAttack:"Первая атака",
firstSiege:"Первая осада",
firstHeal:"Первое лечение",
firstSpecial:"Первый спецудар",

firstCity:"Захватить первый город",
twoCities:"Захватить 2 города",
fiveCities:"Захватить 5 городов",

destroyWalls:"Разрушить стены",
tenWalls:"Разрушить 10 стен",

bigDamage:"Нанести 50 урона",

europeStart:"Начать кампанию Европы",
rusStart:"Начать кампанию Руси",

englandArmy:"Играть за Англию",
franceArmy:"Играть за Францию",
rusArmy:"Играть за Русь",
mongolsArmy:"Играть за Монголов",
vikingsArmy:"Играть за Викингов",

campaignWin:"Завершить кампанию",
warLord:"Выиграть 10 битв",

historian:"Открыть историческую карточку",
quizMaster:"Ответить правильно на викторину"

},

unlocked:JSON.parse(localStorage.getItem("achievements")||"{}"),

stats:JSON.parse(localStorage.getItem("stats")||"{}"),

save(){

localStorage.setItem("achievements",JSON.stringify(this.unlocked))
localStorage.setItem("stats",JSON.stringify(this.stats))

},

unlock(id){

if(this.unlocked[id]) return

this.unlocked[id]=true

this.save()

UI.log("🏆 Достижение: "+this.list[id])

},

addStat(name,value=1){

if(!this.stats[name])
this.stats[name]=0

this.stats[name]+=value

this.check()

this.save()

},

check(){

if(this.stats.cities>=1)
this.unlock("firstCity")

if(this.stats.cities>=2)
this.unlock("twoCities")

if(this.stats.cities>=5)
this.unlock("fiveCities")

if(this.stats.wins>=10)
this.unlock("warLord")

if(this.stats.walls>=10)
this.unlock("tenWalls")

}

}
