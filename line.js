function lineTo(x1, y1, x2, y2){
    let points = [];
    let amountP = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
  
    let t;
    for(let i = 0; i <= amountP; i++){
      t = amountP == 0 ? 0 : i/amountP;
      points.push(Math.round(x1 + t * (x2 - x1)));
      points.push(Math.round(y1 + t * (y2 - y1)));
    }
  
    for(let i = 0; i < points.length/2; i++){
      // addPixel(points[(i*2)]+1, points[(i*2+1)]);
      // addPixel(points[(i*2)]-1, points[(i*2+1)]);
      // addPixel(points[(i*2)], points[(i*2)+1]+1);
      // addPixel(points[(i*2)], points[(i*2)+1]-1);
      
      addPixel(points[i*2], points[(i*2)+1]);
    }
}
