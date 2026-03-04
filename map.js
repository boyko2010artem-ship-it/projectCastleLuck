const MapSystem={

render(){

const map=document.getElementById("map")

let html=`<div class="worldMap">`

Game.campaign.forEach((stage,i)=>{

let left=25+(i*20)
let top=60-(i*10)

html+=`
<div class="mapPoint ${i===Game.stage?'current':''}"
style="top:${top}%;left:${left}%">
⚔
</div>
`

})

html+=`</div>`

map.innerHTML=html

}

}
