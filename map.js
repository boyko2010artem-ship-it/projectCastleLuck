const MapSystem={

render(){

let map=document.getElementById("map")

if(!map) return

let html="<div class='map'>"

Game.campaign.forEach((city,index)=>{

let icon="🏰"
let cls="city"

if(index<Game.stage){

icon="🏆"
cls+=" conquered"

}

else if(index===Game.stage){

icon="⚔"
cls+=" current"

}

else{

icon="🏰"
cls+=" future"

}

html+=`
<div class="${cls}">

<div class="icon">${icon}</div>

<div class="name">${city.city}</div>

</div>
`

})

html+="</div>"

map.innerHTML=html

}

}
