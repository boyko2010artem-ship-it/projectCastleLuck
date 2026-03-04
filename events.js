const Events=[

{
name:"Мороз",
effect(){
Game.player.hp-=5
Game.enemy.hp-=5
UI.log("❄ Мороз")
}
},

{
name:"Боевой дух",
effect(){
Game.player.morale+=10
UI.log("🔥 Боевой дух")
}
},

{
name:"Засада",
effect(){
Game.enemy.hp-=15
UI.log("⚔ Засада")
}
}

]
