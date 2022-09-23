// Code to remake CHAOS_theory from JSON file

// Basic variables that other stuff needs
let allShapes = [];
let jsonNFT;

class myShape {
    constructor(useFill, fillColor, strokeWeight, strokeColor, coSine, rectSize) {
        this.UseFill = useFill;
        this.FillColor = fillColor;
        this.StrokeWeight = strokeWeight;
        this.StrokeColor = strokeColor;
        this.Cosine = coSine;
        this.RectSize = rectSize;
    }
}

function setup() {
    // double check for empty json box
    if (document.getElementById("theJSON").value == "") {
        noLoop();
        return;
    }

    // Get the JSON
    jsonNFT = JSON.parse(document.getElementById('theJSON').value);

    // Update the DOM
    // titles
    document.getElementById('theName').innerHTML = jsonNFT["Basic Data"]["Title"];
    document.getElementById('theColorScheme').innerHTML =
        `<b>${jsonNFT["Basic Data"]["Color Scheme"]["Name"]}` +
        `</b > color scheme used in <b>${jsonNFT["Basic Data"]["Mode"]}</b> mode.`;

    // Set canvas
    // size
    createCanvas(jsonNFT["Basic Data"]["Width"], jsonNFT["Basic Data"]["Height"]);
    // color
    redraw();
}

function draw() {

    push(); //

    clear();
    rectMode(CENTER);
    background(jsonNFT["Basic Data"]["Color Scheme"]["Background Color"]);
    CreateShapes();
    let h = Number(jsonNFT["Basic Data"]["Height"]);
    let w = Number(jsonNFT["Basic Data"]["Width"]);

    // draw shapes
    console.log('Drawing shapes...');
    for (var i = 0; i < allShapes.length; i++) {
        allShapes[i];
        if (allShapes[i].UseFill == true) {
            fill(allShapes[i].FillColor);
        } else {
            noFill();
        }
        stroke(allShapes[i].StrokeColor);
        strokeWeight(allShapes[i].StrokeWeight);
        translate(w / 2, h / 2);
        rotate(allShapes[i].Cosine)
        rect(0, 0, allShapes[i].RectSize, allShapes[i].RectSize);
    }

    pop();
    push();

    console.log('Art rendered');
    noLoop();
}

function CreateShapes() {

    let count = Object.keys(jsonNFT["Shape Data"]).length
    for (var i = 0; i < count; i++) {
        let s = new myShape(
            jsonNFT["Shape Data"]["Shape " + i]["Use Fill"] == 'true',
            jsonNFT["Shape Data"]["Shape " + i]["Fill Color"],
            jsonNFT["Shape Data"]["Shape " + i]["Stroke Weight"],
            jsonNFT["Shape Data"]["Shape " + i]["Stroke Color"],
            jsonNFT["Shape Data"]["Shape " + i]["Cosine"],
            jsonNFT["Shape Data"]["Shape " + i]["Size"]
        );
        allShapes.push(s);
    }
}

//function mouseClicked() {
//    // Save PNG
//    console.log('Saving shapes');
//    saveCanvas(jsonNFT["Basic Data"]["Title"], 'png');
//}