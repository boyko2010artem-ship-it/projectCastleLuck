const Achievements={

list:{
firstWin:"Первая победа",
rocket:"Мастер ракет"
},

unlocked:JSON.parse(localStorage.getItem("achievements")||"{}"),

unlock(id){

if(this.unlocked[id])return

this.unlocked[id]=true

localStorage.setItem("achievements",JSON.stringify(this.unlocked))

}

}
