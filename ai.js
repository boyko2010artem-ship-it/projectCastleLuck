const AI={

turn(){

if(Game.enemy.hp<=0) return

let action=Math.random()

// лечение если мало HP

if(Game.enemy.hp<30 && action<0.4){

let heal=10

Game.enemy.hp+=heal

if(Game.enemy.hp>100)
Game.enemy.hp=100

UI.log("Гарнизон лечится +" + heal)

AudioSystem.heal()

return

}

// стрельба со стен

if(Game.walls>0 && action<0.7){

let dmg=8+Math.floor(Math.random()*4)

Game.player.hp-=dmg

UI.log("Стража стреляет со стен " + dmg)

AudioSystem.attack()

AI.hitPlayer()

return

}

// обычная атака

let dmg=10+Math.floor(Math.random()*6)

Game.player.hp-=dmg

UI.log("Гарнизон атакует " + dmg)

AudioSystem.attack()

AI.hitPlayer()

},

hitPlayer(){

playerBar.classList.add("hit")

setTimeout(()=>{
playerBar.classList.remove("hit")
},300)

}

}
