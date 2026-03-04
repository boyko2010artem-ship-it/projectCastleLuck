const AI={

turn(){

let action=Math.random()

/* лечение если мало здоровья */

if(Game.enemy.hp<30 && action<0.3){

this.heal()
return

}

/* осада если есть стены */

if(Game.walls>0 && action<0.6){

this.siege()
return

}

/* обычная атака */

this.attack()

},

/* ---------- атака ---------- */

attack(){

let dmg=8+Math.floor(Math.random()*4)

Game.player.hp-=dmg

UI.log("Гарнизон атакует на "+dmg)

AudioSystem.attack()

document.getElementById("playerBar").classList.add("hit")

setTimeout(()=>{

document.getElementById("playerBar").classList.remove("hit")

},300)

},

/* ---------- осада ---------- */

siege(){

let dmg=6+Math.floor(Math.random()*4)

Game.walls-=dmg

if(Game.walls<0) Game.walls=0

UI.log("Гарнизон повреждает стены")

AudioSystem.siege()

Game.animateWall()

Game.updateWalls()

},

/* ---------- лечение ---------- */

heal(){

let heal=8+Math.floor(Math.random()*4)

Game.enemy.hp+=heal

if(Game.enemy.hp>100)
Game.enemy.hp=100

UI.log("Гарнизон лечится на "+heal)

AudioSystem.heal()

}

}
