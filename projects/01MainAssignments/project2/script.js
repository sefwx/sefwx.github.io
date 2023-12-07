let columns = 12;
let maxColumns = columns*columns;

let letters = [];

let pColumnsX = 0;
let pColumnsY = 0;

let maxChars = 30;

var font;

function preload() {
	font = loadFont("assets/helvetica.otf");
}


function setup() {
  createCanvas(1000, 1000);
	textFont(font);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(1);

  //let columnsX = floor(map(mouseX, 0, width, 2, columns));
  //let columnsY = floor(map(mouseY, 0, height, 2, columns));
  
  let columnsX = letters.length+2;
  let columnsY = letters.length+2;
 
  // grande / numero di linee
  let ecartW = width / columnsX;
  let ecartH = height / columnsY;

  // linee verticali
  if (mouseIsPressed) {
    for (i = 1; i < columnsX; i++) {
      line(i * ecartW, 0, i * ecartW, height);
    }
    // linee orizzontali 
    for (i = 1; i < columnsY; i++) {
      line(0, i * ecartH, width, i * ecartH);
    }
  }

  let count = 0;
  
  for (i = 1; i <columnsY ; i++) {
    for (j = 1; j < columnsX; j++) {
			if( letters.length>0){
      letter(count % letters.length, j * ecartW, i * ecartH);
			
      count++;
			}
    }
  }
  
  pColumnsX = columnsX;
  pColumnsY = columnsY;
}

function letter(index, posX, posY) {
  push();
  // trasformazioni
  translate(posX, posY);
  
  let x = mouseX - posX;
  let y = mouseY - posY;
  
  let angle = atan2(y, x);
  
  rotate(angle);
  fill(255);
  
  if(index % 2 == 0) {
    noFill();
    stroke(255);
    strokeWeight(1);
  }
  

  textSize(map(letters.length, 1, maxChars, 128, 20));
  textAlign(CENTER, CENTER);
  text(letters[index], 0,0)
  
  pop(); 
}

function keyTyped() {
 
  if (key.length <= 1 && letters.length < maxChars) {
    letters.push(key);
  }
}

function keyPressed(){
  if(keyCode == BACKSPACE){
    letters.pop();
  }
  
}
