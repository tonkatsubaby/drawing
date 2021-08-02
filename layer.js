class AddLayer {

    constructor() {
        this.layerData = this.createLayer();
    }

    createLayer() {
        let newArray = new Array((canvas.width * canvas.height) * 4).fill(0);
        return newArray;
    }

    convert() {
        let editedData = document.getElementById("canvas").getContext("2d").createImageData(canvas.width, canvas.height);

        editedData.data.set(this.layerData);

        return editedData;
    }

}