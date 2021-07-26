const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 500;

let layers = [];
let layerIndex = 0;
layers.push(new addLayer(0, 0, 0, 0));
layers.push(new addLayer(0, 0, 0, 0));
layers.push(new addLayer(0, 0, 0, 0));

/*---------------------*/

let mouseX;
let mouseY;

function mouseLocation(event) {
  mouseX = (event.clientX - canvas.offsetLeft);
  mouseY = (event.clientY - canvas.offsetTop);
  let endString = "x: " + mouseX + " | " + "y:" + mouseY;
  document.getElementById("display").innerHTML = endString;
}

/*---------------------*/

function saveCanvas() {
  //not done yet

  let img = canvas.toDataURL("image/png");
  let image = document.getElementById("img");

  image.src = img;
}

/*---------------------*/

function addPixel(x, y, color) {
  let cIndex = x + (y * canvas.width);
  layers[layerIndex].layerData[(cIndex * 4) + 0] = color[0];
  layers[layerIndex].layerData[(cIndex * 4) + 1] = color[1];
  layers[layerIndex].layerData[(cIndex * 4) + 2] = color[2];
  layers[layerIndex].layerData[(cIndex * 4) + 3] = color[3];
}

/*---------------------*/

function lineTool() {
  if (mousedown) {

    for (let i = 0; i < mousePoints.length; i++) {
      lineTo(mousePoints[0][0], mousePoints[0][1], mousePoints[1][0], mousePoints[1][1], [0, 0, 0, 255]);
      mousePoints.shift();
    }
  }
}

function fillTool() {
  if (firstClick) {
    floodFill(layers[layerIndex].layerData, mousePoints[0][0], mousePoints[0][1], [255, 0, 0, 255]);
  }
}

function testTool() {
  if (mousedown) {
    console.log("works");
  }
}

/*---------------------*/

const tools = [lineTool, fillTool, testTool];
let toolIndex = 0;

const minus = document.getElementById("toolSub");
const plus = document.getElementById("toolAdd");

const toolDisplay = document.getElementById("toolDisplay");

minus.innerHTML = "<";
plus.innerHTML = ">";
toolDisplay.innerHTML = toolIndex;

minus.addEventListener("click", function () {
  toolIndex = (((toolIndex - 1) % tools.length) + tools.length) % tools.length;
  toolDisplay.innerHTML = toolIndex;
  console.log(toolIndex);
})

plus.addEventListener("click", function () {
  toolIndex = (((toolIndex + 1) % tools.length) + tools.length) % tools.length;
  toolDisplay.innerHTML = toolIndex
  console.log(toolIndex);
})

layerMinus.addEventListener("click", function () {
  layerIndex--;
  console.log(layerIndex);
})

layerPlus.addEventListener("click", function () {
  layerIndex++;
  console.log(layerIndex);
})

/*---------------------*/

function updateFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(let i = 0; i < layers.length; i++){
    createImageBitmap(layers[i].convert()).then(function(img) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    });
  }

  // saveCanvas();
}

let mousedown = false;
let mousePoints = [];
let firstClick = false;

function click() {
  mouseLocation(event);
  // console.log(mousePoints);
  if (mousedown) {
    mousePoints.push([mouseX, mouseY]);
  } else {
    mousePoints = [];
  }
  // console.log(mousePoints);
  tools[toolIndex]();

  updateFrame();
}

canvas.addEventListener("mousemove", click);

canvas.addEventListener("mousedown", function () {
  mousePoints.push([mouseX, mouseY]);
  mousedown = true;
  firstClick = true;
  click();
  firstClick = false;
})

canvas.addEventListener("mouseup", function () {
  mousedown = false;
})