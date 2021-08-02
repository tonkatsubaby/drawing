function lineTo(x1, y1, x2, y2, color) {
  let points = [];
  let amountP = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));

  let t;
  let angle = Math.abs(Math.atan2(y1 - y2, x2 - x1) * (180 / Math.PI) - 90);

  for (let i = 0; i <= amountP; i++) {
    t = amountP == 0 ? 0 : i / amountP;
    points.push(Math.round(x1 + t * (x2 - x1)));
    points.push(Math.round(y1 + t * (y2 - y1)));
  }

  addPixel(points[0], points[(0) + 1], color);
  
  while (points.length > 0){
    addPixel(points[0], points[(0) + 1], color);

    if(!(x1 == x2 && y1 == y2)){

      if ((angle <= 315 && angle >= 225) || (angle >= 45 && angle <= 135)){
        addPixel(points[0], points[(0) + 1] - 1, color);
        addPixel(points[0], points[(0) + 1] + 1, color);
      }else{
        addPixel(points[0] - 1, points[(0) + 1], color);
        addPixel(points[0] + 1, points[(0) + 1], color);
      }

      points.splice(0, 2);

    }else{
      points.splice(0, 2);
    }

  }

  if(points.length <= 0){
    addPixel(x2, y2, color);
  }
}
