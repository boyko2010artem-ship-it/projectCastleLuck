const AudioSystem={

ctx:new (window.AudioContext||window.webkitAudioContext)(),

play(freq,time=0.2){

let o=this.ctx.createOscillator()
let g=this.ctx.createGain()

o.connect(g)
g.connect(this.ctx.destination)

o.frequency.value=freq

o.start()

g.gain.exponentialRampToValueAtTime(
0.0001,
this.ctx.currentTime+time
)

},

attack(){this.play(400)}

rocket(){this.play(150,0.5)}

heal(){this.play(700)}

}
