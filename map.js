const MapSystem={

render(){

const map=document.getElementById("map");

if(Game.currentCampaign==="EUROPE"){

map.innerHTML=`
<div class="worldMap">

<div class="mapPoint ${Game.stage===0?'current':'done'}"
style="top:60%;left:40%">⚔</div>

<div class="mapPoint ${Game.stage===1?'current':''}"
style="top:55%;left:55%">🏰</div>

</div>
`;

}

if(Game.currentCampaign==="RUS"){

map.innerHTML=`
<div class="worldMap">

<div class="mapPoint ${Game.stage===0?'current':'done'}"
style="top:50%;left:50%">🛡</div>

<div class="mapPoint ${Game.stage===1?'current':''}"
style="top:45%;left:60%">⚔</div>

</div>
`;

}

}

}
