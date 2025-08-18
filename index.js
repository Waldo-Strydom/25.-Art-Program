
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");



let xPos = 0
let yPos = 0
let size = 5
let red = 0
let green = 0
let blue = 0

ctx.fillStyle = `rgb(${red},${green},${blue})`;

canvas.addEventListener("mousedown",(e)=>{
  drawFun(e)
  let drawing = true
  canvas.addEventListener("mousemove",(e)=>{
    if(drawing){
        drawFun(e)
    }
    
  })

  canvas.addEventListener("mouseup",(e)=>{
    drawing = false;
  })

})

canvas.addEventListener("touchstart",(e)=>{
 
  drawTouchFun(e)
  let drawing = true
  canvas.addEventListener("touchmove",(e)=>{
    if(drawing){
   

        drawTouchFun(e)
    }
    
  })

  canvas.addEventListener("touchend",(e)=>{
   
    drawing = false;
  })

})

const drawFun = (e)=>{
   var rect = canvas.getBoundingClientRect();

    let ret = getMousePos(canvas,e)

    ctx.fillRect(xPos, yPos, size, size/2);
    console.log(size)
}

const drawTouchFun = (e)=>{
   var rect = canvas.getBoundingClientRect();
    
    let ret = getTouchPos(canvas,e)

    ctx.fillRect(xPos, yPos, size, size/2);
}

function  getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

  
    xPos = (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    yPos = (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  
    xPos-=size/2
    yPos-=size/2


    
}

function  getTouchPos(canvas, evt) {
  const touch = evt.touches[0];   
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

  
    xPos = (touch.pageX - rect.left) * scaleX,   // scale mouse coordinates after they have
    yPos = (touch.pageY- rect.top) * scaleY     // been adjusted to be relative to element
  
    xPos-=size/2
    yPos-=size/2

    
}






// Open/close
const controlDiv = document.getElementById("controlDiv")
const openBtn = document.getElementById("openControlBtn")
openBtn.addEventListener("click",()=>{
    if(controlDiv.classList.contains("close")){
        controlDiv.classList.replace("close","open")
    }else{
        controlDiv.classList.add("open")
    }
    
})

const closeBtn = document.getElementById("backArrow")
closeBtn.addEventListener("click",()=>{
    if(controlDiv.classList.contains("open")){
        controlDiv.classList.replace("open","close")
    }else{
        controlDiv.classList.add("close")
    }
    
})


// Size control
const sizeBtns = document.querySelectorAll(".sBtn")
const sizeTxt = document.getElementById("sizeTxt")
const sizeDisplay = document.getElementById("sizeDisplay")
sizeBtns.forEach((e)=>{
    e.addEventListener("click",()=>{
    if(e.textContent=="+"){
        size+=1

    }else{
        size-=1
    }
    sizeTxt.textContent=`Size: ${size}`;
    sizeDisplay.style.width = `${size}px`;
    sizeDisplay.style.height = `${size}px`;
    })

})


// Colour changing

const colBtns = document.querySelectorAll(".colBtn")
const colourDisplay = document.getElementById("colourDisplay")

const rTxt = document.getElementById("rTxt")
const gTxt = document.getElementById("gTxt")
const bTxt = document.getElementById("bTxt")

colBtns.forEach((e)=>{
    e.addEventListener("mousedown",()=>{
        let colPressed = true
        console.log("mouseDown")
                 updateColNum(e)
        console.log()
       
    
                        e.addEventListener("mouseup",()=>{
            console.log("mouseup")
            colPressed=false
            clearInterval(addCol)
        })
        
        if(colPressed){
            var addCol = setInterval(()=>{
                updateColNum(e)


            },100)
            
        }
        })

        })



const updateColNum = (e)=>{
        switch(true){
            case e.classList.contains("rBtn"):
                if(e.textContent=="+" && red<255){
                    red+=1
                }
                if(e.textContent=="-" && red>0){
                    red-=1
                }
                rTxt.textContent=`Red: ${red}`;
            break;

            case e.classList.contains("gBtn"):
                if(e.textContent=="+" && green<255){
                    green+=1
                }
                if(e.textContent=="-" && green>0){
                    green-=1
                }
                 gTxt.textContent=`green: ${green}`;
            break;

            case e.classList.contains("bBtn"):
                if(e.textContent=="+" && blue<255){
                    blue+=1
                }
                if(e.textContent=="-" && blue>0){
                    blue-=1
                }
                bTxt.textContent=`Blue: ${blue}`;
            break;

        }

        ctx.fillStyle = `rgb(${red},${green},${blue})`;
        colourDisplay.style.backgroundColor = `rgb(${red},${green},${blue})`;
  
}