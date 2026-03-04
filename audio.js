const AudioSystem={

ctx:new (window.AudioContext||window.webkitAudioContext)(),

beep(freq){

let o=this.ctx.createOscillator()
let g=this.ctx.createGain()

o.connect(g)
g.connect(this.ctx.destination)

o.frequency.value=freq

o.start()

g.gain.exponentialRampToValueAtTime(
0.0001,
this.ctx.currentTime+0.3
)

}

}
