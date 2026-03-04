const Achievements={

list:{

firstWin:{
name:"Первая победа",
desc:"Вы выиграли первую битву"
},

rocketMaster:{
name:"Мастер ракет",
desc:"Использовать ракету 5 раз"
},

campaignWin:{
name:"Полководец",
desc:"Завершить кампанию"
},

strategist:{
name:"Стратег",
desc:"Выиграть битву за 5 ходов"
}

},

unlocked:{},

unlock(id){

if(this.unlocked[id]) return

this.unlocked[id]=true

UI.showAchievement(this.list[id])

SaveSystem.save()

}

}
