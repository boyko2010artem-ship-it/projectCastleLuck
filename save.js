const SaveSystem = {

save(){

localStorage.setItem(
"castleluckSave",
JSON.stringify({
stage:Game.stage,
campaign:Game.currentCampaign,
army:Game.armyKey,
achievements:Achievements.unlocked
})
)

},

load(){

let data=localStorage.getItem("castleluckSave")

if(!data) return

data=JSON.parse(data)

Game.stage=data.stage
Game.currentCampaign=data.campaign
Game.armyKey=data.army

Achievements.unlocked=data.achievements||{}

},

clear(){

localStorage.removeItem("castleluckSave")

}

}
