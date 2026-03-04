const AI={

turn(){

let g=Game

if(g.enemy.hp<30 && g.enemy.tp>=1){

g.enemy.hp+=12
g.enemy.tp--

UI.log("AI лечится")

return

}

if(g.enemy.tp>=2){

g.player.hp-=28
g.enemy.tp-=2

UI.log("AI ракета")

return

}

g.player.hp-=10+g.difficulty*2

UI.log("AI атакует")

}

}
