
// let ros  = new ROSLIB.Ros({
//    url : 'ws://localhost:9090'  // ws://localhost:9090 default, will change later
//      // url : 'ws://' + config.ros.rosbridge_ip + ':' + config.ros.rosbridge_port
//   });
let ros  = new ROSLIB.Ros();
ros.on('connection', function() {
    console.log('Connected to websocket server.');
})
ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
})
ros.on('close', function() {
    console.log('Connection to websocket server closed.');
})

let gcode_pose_topic = new ROSLIB.Topic({
  ros : ros,
  name : '/gcode_pose',
  messageType : 'geometry_msgs/Point'
})


class EndEffector {
  constructor() {
    // this.alto = alto;
    this.x = 50
    this.y = 50
    this.dragging = false
  }
  
  update(){
    if (this.dragging){
           endEffector.x = mouseX
     endEffector.y = mouseY
    }
    this.show()
  }
  
  show(){
    circle(this.x, this.y, 30)
  }
  
  send(){
    let msg =`${this.x}, ${this.y}`
    console.log(msg)
    publicar_gcode(this.x, this.y, 0)
  }

    startDrag(){
      if (dist(mouseX, mouseY, this.x, this.y) < 30)
        this.dragging = true
    }
    
    endDrag(){
      this.dragging = false  
      this.send()
    }
}

let endEffector


function setup() {
  createCanvas(640, 200).parent("#canvas_holder")
  // frameRate(1)
  angleMode(DEGREES)

  // ros.close();
  ros.connect('ws://' + ws_ip + ':' + "9090")

  // se suscribe a los topics y crea callback que rellenan valores
  // de interes en rosvalues
  /*
    let bateria_topic = new ROSLIB.Topic({
        ros : ros,
        name : '/others_raw',
        messageType : 'std_msgs/Int32MultiArray'
    })
    bateria_topic.subscribe(function(message) {
        // Object { data: (2) […], layout: {…} }
        // console.log(message.data[0])
        bateria_raw = message.data[0]
    })
*/
  endEffector = new EndEffector()

}



function draw() {
  background(220)
  // if (debug_mode) text(mouseX + ", " + mouseY, 0, 10)  // DEBUG
  // let battery_percentage = map(battery_voltage, 9, 12.3, 0, 100)
  // text(`bateria_porcentaje ${bateria_raw}`, 0, 25)
  if (ros.isConnected || debug_mode){
    endEffector.update()
  }
  else{
    mensajenoconectado()
  }

}

function mensajenoconectado(){
  text("No se ha podido conectar al websocket", 30, height/2)
}



function publicar_gcode(x, y, z){
  let msg = new ROSLIB.Message({
    x : x,
    y : y,
    z : z
  })
  gcode_pose_topic.publish(msg);
}


function mousePressed(){
  endEffector.startDrag()
}

function mouseReleased(){
  endEffector.endDrag()
}