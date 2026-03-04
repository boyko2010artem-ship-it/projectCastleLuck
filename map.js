const MapSystem={

render(){

let map=document.getElementById("map")

if(!map) return

let html=""

Game.campaign.forEach((city,i)=>{

let cls="city"

if(i<Game.stageIndex)
cls+=" conquered"

if(i===Game.stageIndex)
cls+=" current"

html+=`
<div class="${cls}">
<div class="icon">🏰</div>
<div class="name">${city.city}</div>
</div>
`

})

map.innerHTML=html

}

}
