const AudioSystem={

ctx:null,

init(){

if(!this.ctx){

this.ctx=new (window.AudioContext||window.webkitAudioContext)()

}

},

tone(freq,time=0.2,type="sine"){

this.init()

let o=this.ctx.createOscillator()
let g=this.ctx.createGain()

o.type=type
o.frequency.value=freq

o.connect(g)
g.connect(this.ctx.destination)

o.start()

g.gain.setValueAtTime(0.2,this.ctx.currentTime)

g.gain.exponentialRampToValueAtTime(
0.001,
this.ctx.currentTime+time
)

o.stop(this.ctx.currentTime+time)

},

attack(){

this.tone(420,0.1,"square")
this.tone(280,0.15,"square")

},

siege(){

this.tone(120,0.4,"sawtooth")

},

heal(){

this.tone(600,0.2)
this.tone(800,0.2)

},

special(){

this.tone(80,0.6,"sawtooth")

},

victory(){

this.tone(700,0.2)
setTimeout(()=>this.tone(900,0.2),200)
setTimeout(()=>this.tone(1100,0.3),400)

},

lose(){

this.tone(200,0.4,"square")
setTimeout(()=>this.tone(150,0.5,"square"),200)

},

music(){

this.init()

setInterval(()=>{

this.tone(300,0.2)

},3000)

}

}
