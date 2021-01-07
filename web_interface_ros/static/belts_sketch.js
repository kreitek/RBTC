// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
let outputDiv
let sldA, sldB, sldC, sldD

function setup() {
//   createCanvas(500, 100); // windowWidth, windowHeight
  noCanvas();
  noLoop();
  // Instantiate our SerialPort object
  serial = new JsSerial();
  serial.open();
  serial.on('data', gotData);
  serial.on('connect', serialConnected);
  outputDiv = select("#holderConsole");

  sldA = createSlider(0, 255, 0, 1).parent("#holderSliderA").changed(function() {
    let msg = JSON.stringify({"motor_a": this.value()})
    serial.write(msg);
    console.log(msg);
    select("#holderValueA").html(this.value());
  });

  sldB = createSlider(0, 255, 0, 1).parent("#holderSliderB").changed(function() {
    let msg = JSON.stringify({"motor_b": this.value()})
    serial.write(msg);
    console.log(msg);
    select("#holderValueB").html(this.value());
  });

  sldC = createSlider(0, 255, 0, 1).parent("#holderSliderC").changed(function() {
    let msg = JSON.stringify({"motor_c": this.value()})
    serial.write(msg);
    console.log(msg);
    select("#holderValueC").html(this.value());
  });

  sldD = createSlider(0, 255, 0, 1).parent("#holderSliderD").changed(function() {
    let msg = JSON.stringify({"motor_d": this.value()})
    serial.write(msg);
    console.log(msg);
    select("#holderValueD").html(this.value());
  });
  
  createButton("Save").parent("#holderSaveBtn").mouseClicked(function (){
    serial.write({"command": "save"});  // request initial values
  })
}

function updatePwmValues(){
    select("#holderValueA").html(sldA.value());
    select("#holderValueB").html(sldB.value());
    select("#holderValueC").html(sldC.value());
    select("#holderValueD").html(sldD.value());
}

function gotData(data) {
    console.log(data);
    outputDiv.html(data);
    // we expect messages in json format
    try {
        var dataObj = JSON.parse(data);
    } catch(e) {
        console.warn(e);
        return;
    }
    if ('motor_a' in dataObj){
        sldA.value(dataObj['motor_a']);
    }
    if ('motor_b' in dataObj){
        sldB.value(dataObj['motor_b']);
    }
    if ('motor_c' in dataObj){
        sldC.value(dataObj['motor_c']);
    }
    if ('motor_d' in dataObj){
        sldD.value(dataObj['motor_d']);
    }
    updatePwmValues();
}

function serialConnected(){
    serial.write({"command": "feedback"});  // request initial values
}

function draw(){
    background(230)
}
