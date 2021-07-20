const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillRect(10, 10, 10, 10);

canvas.width = 200;
canvas.height = 200;

/*---------------------*/

function createLayer(){
  let layerData = new Array((canvas.width * canvas.height)*4).fill(255);
  return layerData
}

const imageData = createLayer();

for(let i = 0; i < imageData.length/4; i++){
  imageData[(i*4)+0] = 0;
  imageData[(i*4)+1] = 0;
  imageData[(i*4)+2] = 255;
  imageData[(i*4)+3] = 255;
}
let editedData = ctx.createImageData(canvas.width, canvas.height);
editedData.data.set(imageData);

ctx.putImageData(editedData, 0, 0);

/*---------------------*/

let mouseX;
let mouseY;

function mouseLocation(event){
  mouseX = (event.clientX - canvas.offsetLeft);
  mouseY = (event.clientY - canvas.offsetTop);
  let endString = "x: " + mouseX + " | " + "y:" + mouseY;
  document.getElementById("display").innerHTML = endString;
}

/*---------------------*/

function saveCanvas(){
  //not done yet
  
  let img = canvas.toDataURL("image/png");
  let image = document.getElementById("img");

  image.src = img;
}

/*---------------------*/

function addPixel(x, y){
  let cIndex = x + (y * canvas.width); 
  imageData[(cIndex * 4) + 0] = 255;
  imageData[(cIndex * 4) + 1] = 255;
  imageData[(cIndex * 4) + 2] = 255;
  imageData[(cIndex * 4) + 3] = 255;
}

/*---------------------*/

function lineTool(){
  if(mousedown){

    for(let i = 0; i < mousePoints.length; i++){
      lineTo(mousePoints[0][0], mousePoints[0][1], mousePoints[1][0], mousePoints[1][1]);
      mousePoints.shift();
    }
  }
}

function fillTool(){
  if(firstClick){
    floodFill(imageData, mousePoints[0][0], mousePoints[0][1], [255, 255, 255, 255]);
  }
}

function testTool(){
  if(mousedown){
    console.log("works");
  }
}

/*---------------------*/

const tools = [lineTool, fillTool, testTool];
let toolIndex = 0;

const minus = document.getElementById("minus");
const plus = document.getElementById("plus");

const toolDisplay = document.getElementById("toolDisplay");

minus.innerHTML = "<";
plus.innerHTML = ">";
toolDisplay.innerHTML = toolIndex;

minus.addEventListener("click", function(){
  toolIndex = (((toolIndex - 1) % tools.length) + tools.length) % tools.length;
  toolDisplay.innerHTML = toolIndex;
  console.log(toolIndex);
})

plus.addEventListener("click", function(){
  toolIndex = (((toolIndex + 1) % tools.length) + tools.length) % tools.length;
  toolDisplay.innerHTML = toolIndex
  console.log(toolIndex);
})

/*---------------------*/

function updateFrame(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  editedData.data.set(imageData);
  ctx.putImageData(editedData, 0, 0);
  // saveCanvas();
}

let mousedown = false;
let mousePoints = [];
let firstClick = false;

function click(){
  mouseLocation(event);
  // console.log(mousePoints);
  if(mousedown){
    mousePoints.push([mouseX, mouseY]);
  }else{
    mousePoints = [];
  }
  // console.log(mousePoints);
  tools[toolIndex]();

  updateFrame();
}

canvas.addEventListener("mousemove", click);

canvas.addEventListener("mousedown", function(){
  mousePoints.push([mouseX, mouseY]);
  mousedown = true;
  firstClick = true;
  click();
  firstClick = false;
})

canvas.addEventListener("mouseup", function(){
  mousedown = false;
})