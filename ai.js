const AI={

turn(){

if(Game.enemy.hp<=0) return

// если мало здоровья — лечится
if(Game.enemy.hp<20){

Game.enemy.hp+=8

UI.log("Гарнизон восстанавливает силы")

return

}

// если стены целы — защищает город
if(Game.walls>0){

let dmg=8

Game.player.hp-=dmg

UI.log("Гарнизон стреляет со стен "+dmg)

return

}

// обычная атака

let dmg=10

Game.player.hp-=dmg

UI.log("Гарнизон атакует "+dmg)

}

}
