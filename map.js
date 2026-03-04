const MapSystem = {

render(){

let mapEl=document.getElementById("map")

mapEl.innerHTML=""

let campaign=Game.campaign

campaign.forEach((city,i)=>{

let state="future"

if(i<Game.stage) state="conquered"
if(i===Game.stage) state="current"

mapEl.innerHTML+=`
<div class="city ${state}">

<div class="icon">🏰</div>

<div class="name">
${city.city}
</div>

</div>
`

})

}

}
