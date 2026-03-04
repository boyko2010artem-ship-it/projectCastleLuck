const AudioSystem={

ctx:null,

init(){

if(!this.ctx){

this.ctx=new(window.AudioContext||window.webkitAudioContext)()

}

},

tone(freq,time){

this.init()

let osc=this.ctx.createOscillator()
let gain=this.ctx.createGain()

osc.connect(gain)
gain.connect(this.ctx.destination)

osc.frequency.value=freq
osc.type="square"

osc.start()

gain.gain.setValueAtTime(0.2,this.ctx.currentTime)
gain.gain.exponentialRampToValueAtTime(0.001,this.ctx.currentTime+time)

osc.stop(this.ctx.currentTime+time)

},

/* ---------- атака ---------- */

attack(){

this.tone(220,0.15)

},

/* ---------- осада ---------- */

siege(){

this.tone(120,0.25)

},

/* ---------- лечение ---------- */

heal(){

this.tone(500,0.2)

},

/* ---------- спецудар ---------- */

special(){

this.tone(300,0.25)

setTimeout(()=>{

this.tone(200,0.25)

},120)

},

/* ---------- победа ---------- */

victory(){

this.tone(500,0.2)

setTimeout(()=>{
this.tone(700,0.2)
},200)

setTimeout(()=>{
this.tone(900,0.3)
},400)

},

/* ---------- поражение ---------- */

lose(){

this.tone(200,0.3)

setTimeout(()=>{
this.tone(150,0.4)
},200)

}

}
