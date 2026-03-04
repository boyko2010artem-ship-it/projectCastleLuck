const MapSystem={

render(){

let map=document.getElementById("map")

if(!map) return

let html="<div class='map'>"

Game.campaign.forEach((city,i)=>{

let icon="🏰"

if(i<Game.stage) icon="🏆"

if(i===Game.stage) icon="⚔"

html+=`
<div class="city ${i===Game.stage?'current':''}">
${icon}
<br>
${city.city}
</div>
`

})

html+="</div>"

map.innerHTML=html

}

}
