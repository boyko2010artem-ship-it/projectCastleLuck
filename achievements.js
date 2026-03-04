const Achievements={

list:{

firstAttack:"Первая атака",
firstSiege:"Первая осада",
firstHeal:"Первое лечение",
firstSpecial:"Первый спецудар",

firstCity:"Захват первого города",
twoCities:"Захватить 2 города",
fiveCities:"Захватить 5 городов",

destroyWalls:"Разрушить стены",
tenWalls:"Разрушить 10 стен",

bigDamage:"Нанести 50 урона",
noDamageWin:"Победа без урона",

europeStart:"Начать кампанию Европы",
rusStart:"Начать кампанию Руси",

englandArmy:"Играть за Англию",
franceArmy:"Играть за Францию",
rusArmy:"Играть за Русь",
mongolsArmy:"Играть за Монголов",
vikingsArmy:"Играть за Викингов",

campaignWin:"Завершить кампанию",
warLord:"Выиграть 10 битв"

},

unlocked:JSON.parse(localStorage.getItem("ach")||"{}"),

unlock(id){

if(this.unlocked[id]) return

this.unlocked[id]=true

localStorage.setItem("ach",JSON.stringify(this.unlocked))

console.log("Achievement unlocked:",id)

}

}
