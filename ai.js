const AI = {

turn(){

let action=Math.random()

/* если мало здоровья — шанс лечения */

if(Game.enemy.hp<30 && action<0.3){

this.heal()

return

}

/* если стены ещё стоят — иногда осада */

if(Game.walls>0 && action<0.6){

this.siege()

return

}

/* иначе атака */

this.attack()

},

/* ---------- атака ---------- */

attack(){

let dmg=8

Game.player.hp-=dmg

UI.log("Гарнизон атакует вас на "+dmg)

AudioSystem.attack()

playerBar.classList.add("hit")

setTimeout(()=>{

playerBar.classList.remove("hit")

},300)

},

/* ---------- осада ---------- */

siege(){

let dmg=6

Game.walls-=dmg

if(Game.walls<0) Game.walls=0

UI.log("Гарнизон укрепляет оборону и повреждает стены")

AudioSystem.siege()

Game.animateWall()

Game.updateWalls()

},

/* ---------- лечение ---------- */

heal(){

let heal=8

Game.enemy.hp+=heal

if(Game.enemy.hp>100)
Game.enemy.hp=100

UI.log("Гарнизон лечится на "+heal)

AudioSystem.heal()

}

}
