const msgLib = (() => {
    const dis = document.createElement("div")
    const animations = {
        "slide": {open: "slide", close: "unslide"},
        "down_slide": {open:"down_slide", close: "up_slide"},
        "fade": {open:"fade", close:"blurr"},
        "bounce": {open:"bounce", close:"jump"}
    }
    let resolver = null
    let alertLength = [];
function AlertBox(val) {
    if(!animations[val.animation]) val.animation = "slide"
    if(isNaN(val.width, val.height)) throw new Error(`Width and height of AlertBox must be a number.`)
    let stylesheet = `
<style>
#alert {
 width: ${val.width || 200}px;
 height: ${val.height || 200}px;
background: ${val.background};
border-radius: 8px;
border: none;
position: relative;
top: ${val.y || 30}%;
left:${val.x || 10}%;
z-index:1000;
text-align: center;
}

@keyframes fade {
0% {
opacity: 0;
}
100% {
opacity: 1;
}
}

@keyframes blurr {
0% {
opacity: 1;
}
100% {
opacity: 0;
}
}

@keyframes jump {
0% {
top: ${val.y || 30}%;
}
30% {
top: ${val.y-10 || 20}%;
}
50% {
top: ${val.y || 30}%;
}
100% {
top: -100%;
}
}

}

@keyframes slide {
0% {
width: 0px;
}
100% {
width: ${val.width || 200}px;
}
}
#alert button {
background: ${val.btn_background || "black"};
 min-width: ${val.btn_width || val.width*20/100}px;
min-height: 20px;
color: ${val.btn_color || "white"};
border-radius: 8px;
border: none;
word-wrap: break-word;
overflow-wrap: break-word;
word-break: break-word;
}

@keyframes unslide {
0% {
width: ${val.width || 200}px;
}
100% {
width: 0px;
}
}


@keyframes up_slide {
0% {
width: ${val.width || 200}px;
height: ${val.height || 200}px;
}
50% {
width: 5px;
height: ${val.height || 200}px;
}
100% {
width:5px;
height: 5px;
}
}

@keyframes down_slide {
0% {
width: 5px;
height: 5px;
}
50% {
width: 5px;
height: ${val.height || 200}px;
}
100% {
width:${val.width || 200}px;
height: ${val.height || 200}px;
}
}

 .backdrop {
    width: 100%;
    height: 100vh;
    background:  hsla(0, 8%, 5%, 0.8);
     z-index: 1000;
     }
     .asend {
     position: absolute;
     top: 80%;
     left: ${val.displayCancelButton?50:72}%;
     }
     .asif {
       position: absolute;
     top: 80%;
     left: 72%;
     display: ${val.displayCancelButton ? "block" :"none"};
     }

     .slides {
animation: ${val.animation || "slide"} 1s;
     }

.unani {
 animation: ${animations[val.animation].close || "unslide"} 1s;
}


@media only screen and (min-width: 1025px) {
  #alert {
  word-wrap: break-word;
overflow-wrap: break-word;
word-break: break-word;
 background: ${val.background || "white"};
    border-radius: 8px;
     width:${val.width || 200}px;
    height: ${val.height || 200}px;
    position: relative;
top: ${val.y || 30}%;
left:${val.x +30 || 50}%;
    text-align: center;
    }
    
@keyframes slide {
0% {
width: 0px;
}
100% {
width: ${val.width || 200}px;
}
}
}


@keyframes bounce {
0% {
top: -100%;
}
50% {
top: ${val.y || 30}%;
}
70% {
top: ${val.y-10 || 20}%
}
100% {
top: ${val.y || 30}%
}
</style>
`
if(document.getElementById("alert")) {
    return alertLength.push(val);
}
dis.className = "backdrop"
dis.innerHTML = `${stylesheet}<div id="alert"></div>`
document.body.appendChild(dis)
document.getElementById("alert").classList.add("slides")
setTimeout(() => {
    document.getElementById("alert").classList.remove("slides")
    document.getElementById("alert").innerHTML = `<br><h1 style="color: ${val.title_color ? val.title_color: val.btn_color? val.btn_color:  "black"};">${val.title_content || ""}</h1><div style="color: ${val.text_color || 'black'};">${val.content}</div><button class="asend" onclick=${val.displayCancelButton ? "msgLib.abnClose()" : "msgLib.yes()"}>Ok</button><button class="asif" onclick="msgLib.no()">Cancel</button>`
}, 1000)


return new Promise(resolve => {
 resolver = resolve;
})
}

function close(bool) {
    if(resolver) {
        resolver(bool)
        resolver = null
    }


     document.getElementById("alert").classList.add("unani")
    document.getElementById("alert").innerText = "";
   

    setTimeout(() => {
         document.getElementById("alert").classList.remove("unani")
 document.querySelector(".backdrop").innerHTML = "";
  document.body.removeChild(dis)
  if(alertLength.length > 0) {
    AlertBox(alertLength[0]);
    alertLength.splice(0,1)
  }
    }, 900)
}

function abnClose() {
      let obj = {};
    document.querySelectorAll("#alert input").forEach(val => {
        if(!val) return  close(true)
        if(val.id) {
            obj[val.id] = val.value
        } else {
            obj["input_"+Object.entries(obj).length] = val.value
        }
    })
    close(obj)
    
}
return {
    AlertBox,
    yes : (() => close(true)),
    no: (() => close(false)),
    abnClose,
}
}) ()