function createLayer() {
    let layerData = new Array((canvas.width * canvas.height) * 4).fill(255);
    return layerData
}

function addLayer(c1, c2, c3, a) {

    this.layerData = createLayer();

    for(let i = 0; i < (this.layerData.length/4); i++) {
        this.layerData[(i*4)+0] = c1;
        this.layerData[(i*4)+1] = c2;
        this.layerData[(i*4)+2] = c3;
        this.layerData[(i*4)+3] = a;
    }

    this.convert = function() {
        let editedData = ctx.createImageData(canvas.width, canvas.height);
        editedData.data.set(this.layerData);

        return editedData;
    }
}