function floodFill(layerData, x, y, fillC){

    let startPos = x + (y * canvas.width);
    let currentColor = [layerData[(startPos*4)], layerData[(startPos*4)+1], layerData[(startPos*4)+2], layerData[(startPos*4)+3]];
    
    let startTest0 = currentColor[0] == fillC[0] ? 1 : 0;
    let startTest1 = currentColor[1] == fillC[1] ? 1 : 0;
    let startTest2 = currentColor[2] == fillC[2] ? 1 : 0;
    let startTest3 = currentColor[3] == fillC[3] ? 1 : 0;
  
    if (startTest0 + startTest1 + startTest2 + startTest3 === 4) {
      return;
    }
    
  
    const pQueue = [];
    pQueue.push((startPos*4));
    
    while(pQueue.length > 0){
  
      let currentPixel = pQueue.shift();
      let checkColor = [layerData[currentPixel], layerData[currentPixel+1], layerData[currentPixel+2], layerData[currentPixel+3]];
      
      let test0 = checkColor[0] == currentColor[0] ? 1 : 0;
      let test1 = checkColor[1] == currentColor[1] ? 1 : 0;
      let test2 = checkColor[2] == currentColor[2] ? 1 : 0;
      let test3 = checkColor[3] == currentColor[3] ? 1 : 0;
      
      let newX = Math.floor((currentPixel/4) % (canvas.width));
      let newY = Math.floor((currentPixel/4) / (canvas.height));
      
      let wallTest0 = newX + 1 < canvas.width;
      let wallTest1 = newY + 1 < canvas.height;
      let wallTest2 = newX > 0;
      let wallTest3 = newY > 0;
      
      if(test0 + test1 + test2 + test3 == 4){
        
        addPixel(newX, newY);
        
        if(wallTest0){
          pQueue.push(currentPixel+4);
        }
        if(wallTest1){
            pQueue.push(currentPixel+(canvas.width*4));
        }
        if(wallTest2){
            pQueue.push(currentPixel-4);
        }
        if(wallTest3){
            pQueue.push(currentPixel-(canvas.width*4));
        }
      }
    }
  }