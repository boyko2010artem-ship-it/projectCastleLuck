const AI={

turn(){

let g=Game

if(g.enemy.hp<30 && g.enemy.tp>=1){

g.enemy.hp+=10
g.enemy.tp--

UI.log("AI лечится")

return

}

if(g.enemy.tp>=2){

g.player.hp-=26
g.enemy.tp-=2

AudioSystem.rocket()

UI.log("AI ракета")

return

}

let dmg=10

g.player.hp-=dmg
g.enemy.tp++

AudioSystem.attack()

UI.log("AI атакует "+dmg)

}

}
