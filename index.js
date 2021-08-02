const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

let layers = [];
let layerIndex = 0;

layers.push(new AddLayer());

////////////////
let universalColor = [0, 0, 0, 255];
////////////////

function addPixel(x, y, color) {
  let cIndex = x + (y * canvas.width); //converts (x, y) -> [i]

  //[index * 4] because cIndex doesn't account for [r, g, b, a] setup that the image data uses

  //add boundary checks later

  layers[layerIndex].layerData[(cIndex * 4) + 0] = color[0];
  layers[layerIndex].layerData[(cIndex * 4) + 1] = color[1];
  layers[layerIndex].layerData[(cIndex * 4) + 2] = color[2];
  layers[layerIndex].layerData[(cIndex * 4) + 3] = color[3];
}

function saveCanvas() {
  let img = canvas.toDataURL("image/png");
  let image = document.getElementById("img");

  image.src = img;
}

/*---------------------*/

function lineTool() {
  if (mousedown) {
    for (let i = 0; i < mousePoints.length; i++) {
      lineTo(mousePoints[0][0], mousePoints[0][1], mousePoints[1][0], mousePoints[1][1], universalColor);
      mousePoints.shift();
    }
  }
}

function fillTool() {
  if (firstClick) {
    floodFill(layers[layerIndex].layerData, mousePoints[0][0], mousePoints[0][1], universalColor);
  }
}

function testTool() {
  if (mousedown) {
    console.log("works");
  }
}

const tools = [lineTool, fillTool, testTool];
let toolIndex = 0;

let mouseX;
let mouseY;

function mouseLocation(event) {
  mouseX = (event.clientX - canvas.offsetLeft);
  mouseY = (event.clientY - canvas.offsetTop);
}

function updateFrame() {
  console.log(layerIndex);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //draws every layer in the layer array
  for (let i = 0; i < layers.length; i++) {
    createImageBitmap(layers[i].convert()).then(function (img) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    });
  }
}

let mousedown = false;
let mousePoints = []; //gets set up as [[x, y], [x, y]]
let firstClick = false;

function click() {
  mouseLocation(event);

  if (mousedown) {
    mousePoints.push([mouseX, mouseY]);
  } else {
    mousePoints = [];
  }

  tools[toolIndex](); //array is filled with function definitions
  updateFrame();
}

canvas.addEventListener("mousemove", function () { click() });

canvas.addEventListener("mousedown", function () {
  mousePoints.push([mouseX, mouseY]);
  mousedown = true;
  firstClick = true; //mousedown only applies on the first click
  click(); //registers even if the mouse isn't moving
  firstClick = false;
})

canvas.addEventListener("mouseup", function () {mousedown = false})


const buttonsRow = document.getElementById("buttonRow");

for (let i = 0; i < tools.length; i++) {
  let newButton = document.createElement("BUTTON");

  newButton.innerHTML = tools[i].name;
  newButton.onclick = function () {
    toolIndex = i;
  }
  buttonsRow.appendChild(newButton);
}

const layerDiv = document.getElementById("layerRows");
const layerAdd = document.getElementById("addLayer");

function appendLayerElem(index) {

  let layerElem = document.createElement("DIV");

  this.layerNum = index;
  let selfLayer = this.layerNum;

  layerRows.insertBefore(layerElem, layerRows.firstChild);

  let changeLayer = document.createElement("BUTTON");

  changeLayer.innerHTML = "layer: " + index;

  changeLayer.onclick = function () {
    layerIndex = selfLayer;
  }

  layerElem.appendChild(changeLayer);
}

for (let i = 0; i < layers.length; i++) { new appendLayerElem(i) }

layerAdd.onclick = function () {
  new appendLayerElem(layers.length);
  layers.push(new AddLayer());
}

uiColors = [];

uiColors.push([0, 0, 0, 255]); //Black
uiColors.push([255, 0, 0, 255]); //Red
uiColors.push([255, 153, 0, 255]); //Orange
uiColors.push([255, 255, 0, 255]); //Yellow
uiColors.push([0, 255, 0, 255]); //Green
uiColors.push([0, 255, 255, 255]); //Light Blue
uiColors.push([0, 0, 255, 255]); //Blue
uiColors.push([153, 0, 255, 255]); //Purple
uiColors.push([255, 255, 255, 255]); //White

uiColors.push([0, 0, 0, 0]); //Erase

function RGBA(r, g, b, a) { return "rgba(" + r + "," + g + "," + b + "," + a + ")" }

function addColor(rgba) {
  let colorRow = document.getElementById("colors");
  let colorButton = document.createElement("BUTTON");

  colorButton.style.backgroundColor = RGBA(rgba[0], rgba[1], rgba[2], rgba[3]);
  colorButton.style.width = canvas.width / uiColors.length + "px";
  colorButton.style.height = canvas.width / uiColors.length + "px";

  colorButton.onclick = function () {
    universalColor = rgba;
  }

  colorRow.appendChild(colorButton);
}

for (let i = 0; i < uiColors.length; i++) { new addColor(uiColors[i]) }