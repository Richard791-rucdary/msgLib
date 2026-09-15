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
function DisBox(val) {
    let width = !isNaN(val.width) ? val.width: 200;
    let height = !isNaN(val.height) ? val.height: 200;
    let backdrop = val.background? val.background: "white";
    let xPos = !isNaN(val.x) ? val.x : 10;
    let yPos =!isNaN(val.y) ? val.y:  30;
    let btn_back = val.btn_background ? val.btn_background: "black"
    let btn_width = val.btn_width ? val.btn_width: width*20/100;
let btn_col = val.btn_color?val.btn_color: "white"
let animate = animations[val.animation] ? val.animation: "slide"
    let stylesheet = `
<style>
#alert {
 width: ${width}px;
 height: ${height}px;
background: ${backdrop};
border-radius: 8px;
border: none;
position: relative;
top: ${yPos}%;
left:${xPos}%;
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
top: ${yPos}%;
}
30% {
top: ${yPos-10}%;
}
50% {
top: ${yPos}%;
}
100% {
top: -100%;
}
}


@keyframes slide {
0% {
width: 0px;
}
100% {
width: ${width}px;
}
}

#alert button {
background: ${btn_back};
 min-width: ${btn_width}px;
min-height: 20px;
color: ${btn_col};
border-radius: 8px;
border: none;
word-wrap: break-word;
overflow-wrap: break-word;
word-break: break-word;
}

@keyframes unslide {
0% {
width: ${width}px;
}
100% {
width: 0px;
}
}


@keyframes up_slide {
0% {
width: ${width}px;
height: ${height}px;
}
50% {
width: 5px;
height: ${height}px;
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
height: ${height}px;
}
100% {
width:${width}px;
height: ${height}px;
}
}

 .backdrop {
    width: 100%;
    height: 100vh;
    background:  hsla(0, 8%, 5%, 0.8);
     position: fixed;
     z-index: 1000;
     top: 0%;
     }

     .asend {
     position: absolute;
     top: 80%;
     left: ${val.displayCancelButton?50:72}%;
     display: ${val.displayNoButtons? "none": "block"}
     }
     .asif {
       position: absolute;
     top: 80%;
     left: 72%;
     display: ${val.displayNoButtons? "none":val.displayCancelButton ? "block" :"none"};
     }

     .slides {
animation: ${animate} 1s;
     }

.unani {
 animation: ${animations[val.animation]?animations[val.animation].close : "unslide"} 1s;
}


@media only screen and (min-width: 1025px) {
  #alert {
  word-wrap: break-word;
overflow-wrap: break-word;
word-break: break-word;
 background: ${backdrop};
    border-radius: 8px;
     width:${width}px;
    height: ${height}px;
    position: relative;
top: ${yPos}%;
left:${xPos}%;
    text-align: center;
    }
    
}


@keyframes bounce {
0% {
top: -100%;
}
50% {
top: ${yPos}%;
}
70% {
top: ${yPos-10}%
}
100% {
top: ${yPos}%;
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
    document.getElementById("alert").innerHTML = `<br><h1 style="color: ${val.title_color ? val.title_color: val.btn_color? val.btn_color:  "black"};">${val.title_content ? val.title_content:""}</h1><div style="color: ${val.text_color?val.text_color:'black'};">${val.content}</div><button class="asend" onclick=${val.displayCancelButton ? "msgLib.abnClose()" : "msgLib.closeTrue()"}>Ok</button><button class="asif" onclick="msgLib.closeFalse()">Cancel</button>`
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
    DisBox(alertLength[0]);
    alertLength.splice(0,1)
  }
    }, 900)
}

function abnClose() {
      let obj = {};
    document.querySelectorAll("#alert input").forEach((val,idx) => {
        if(!val) return  close(true)
        if(val.id) {
            obj[val.id] = val.value
        } else {
            obj["input_"+idx+1] = val.value
        }
    })
    close(obj)
    
}

return {
    DisBox,
    closeTrue : (() => abnClose()),
    closeFalse: (() => close(false)),
    abnClose,
}
}) ()
