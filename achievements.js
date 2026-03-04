const Achievements={

list:{

firstAttack:"Первая кровь — совершить первую атаку",
firstSiege:"Разрушитель — впервые атаковать стены",
firstHeal:"Лекарь — впервые восстановить здоровье",
firstSpecial:"Мастер удара — использовать спецудар",

firstCity:"Первый город — захватить город",
threeCities:"Завоеватель — захватить 3 города",
allEurope:"Властелин Европы — завершить кампанию Европы",
allRus:"Князь Руси — завершить кампанию Руси",

wallBreaker:"Осадный мастер — разрушить стены 10 раз",
tenVictories:"Грозный полководец — победить 10 гарнизонов",

quizMaster:"Историк — правильно ответить на вопрос",
quizFive:"Учёный — ответить на 5 вопросов",

cardReader:"Исследователь — открыть карточки истории",

survivor:"Выживший — победить с HP ниже 10",
fullHealth:"Непобедимый — закончить бой с полным HP",

tpMaster:"Мастер тактики — накопить 5 TP",
specialKill:"Финишер — победить спецударом",

wallDestroy:"Разрушитель крепостей — довести стены до 0",

longBattle:"Долгая осада — бой больше 10 ходов",

ultimate:"Легенда — открыть 10 достижений"

},

unlocked:{},

/* ---------- загрузка ---------- */

load(){

let data=localStorage.getItem("castleluckAchievements")

if(data){

this.unlocked=JSON.parse(data)

}else{

this.unlocked={}

}

},

/* ---------- сохранение ---------- */

save(){

localStorage.setItem(
"castleluckAchievements",
JSON.stringify(this.unlocked)
)

},

/* ---------- открытие ---------- */

unlock(id){

if(this.unlocked[id]) return

this.unlocked[id]=true

this.save()

alert("🏆 Достижение: "+this.list[id])

},

/* ---------- проверки ---------- */

check(){

/* первый город */

if(Game.stageIndex===1)
this.unlock("firstCity")

/* 3 города */

if(Game.stageIndex===3)
this.unlock("threeCities")

/* стены разрушены */

if(Game.walls===0)
this.unlock("wallDestroy")

/* мало HP */

if(Game.player.hp>0 && Game.player.hp<10)
this.unlock("survivor")

/* полный HP */

if(Game.player.hp===100)
this.unlock("fullHealth")

/* TP */

if(Game.player.tp>=5)
this.unlock("tpMaster")

/* легенда */

let count=Object.keys(this.unlocked).length

if(count>=10)
this.unlock("ultimate")

}

}

/* загрузка достижений при старте */

Achievements.load()
