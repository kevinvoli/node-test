const contenue= document.querySelectorAll(".film")

for (let i = 0; i < contenue.length; i++) {
    contenue[i].addEventListener("mouseover",(e)=>{
        contenue[i].classList.add("Zoom")
    })
    contenue[i].addEventListener("mouseout",(e)=>{
        contenue[i].classList.remove("Zoom")
    })
}
