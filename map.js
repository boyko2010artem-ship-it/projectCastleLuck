const MapSystem={

render(){

let map=document.getElementById("map")

let html="<div class='map'>"

Game.campaign.forEach((s,i)=>{

html+=`<div class="stage ${i===Game.stage?'current':''}">⚔</div>`

})

html+="</div>"

map.innerHTML=html

}

}
