const Save={

save(){

localStorage.setItem("castleluck",
JSON.stringify(Game))

},

load(){

let s=localStorage.getItem("castleluck")

if(s){

Object.assign(Game,JSON.parse(s))

}

}

}
