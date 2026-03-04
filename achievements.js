const Achievements={

list:{

firstWin:"Первая победа",
rocket:"Ракетный удар",
victory:"Победа в кампании"

},

unlocked:JSON.parse(localStorage.getItem("ach")||"{}"),

unlock(id){

if(this.unlocked[id]) return

this.unlocked[id]=true

localStorage.setItem("ach",JSON.stringify(this.unlocked))

}

}
