let switchWidth = 100;
let switchHeight = 50;
let switchColorOn = "#8EE4AF";
let switchColorOff = "#F76D57";
let switchState = false;
let switchX, switchY;
let switchSpeedX, switchSpeedY;
let escapeRadius = 70;
let escapeSpeed = 0.3; // aggiustare x velocità di scappata

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetSwitch();
}

function draw() {
  background(255);

  // movimento dello switch
  switchX += switchSpeedX;
  switchY += switchSpeedY;

  // salto dagli spigoli della canvas
  if (switchX < 0 || switchX > width) {
    switchSpeedX *= -1;
  }
  if (switchY < 0 || switchY > height) {
    switchSpeedY *= -1;
  }

  // controlla la distanza dal mouse
  let distanceToMouse = dist(switchX, switchY, mouseX, mouseY);

  // scappa se il mouse è vicino
  if (distanceToMouse < escapeRadius) {
    let escapeDirection = createVector(switchX - mouseX, switchY - mouseY);
    escapeDirection.normalize();
    escapeDirection.mult(escapeSpeed); // velocità
    switchSpeedX += escapeDirection.x;
    switchSpeedY += escapeDirection.y;
  }

  // disegna toggle switch
  let switchColor = switchState ? switchColorOn : switchColorOff;
  fill(switchColor);
  rect(switchX - switchWidth / 2, switchY - switchHeight / 2, switchWidth, switchHeight, 10);

  // disegna switch handle
  fill(255);
  let handleX = switchState ? switchX + switchWidth / 4 : switchX - switchWidth / 4;
  ellipse(handleX, switchY, switchHeight * 1.2);

  // txt istruzioni
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Click to toggle the floating switch!", width / 2, height - 50);
}

function mouseClicked() {
  // controlla se l'utente ha schiacchiato il handle
  let handleX = switchState ? switchX + switchWidth / 4 : switchX - switchWidth / 4;
  let handleRadius = switchHeight * 0.6;
  let distance = dist(mouseX, mouseY, handleX, switchY);

  if (distance < handleRadius) {
    // stato toggle switch e cambio colore
    switchState = !switchState;
    resetSwitch(); // reset posizione dello switch
  }
}

function resetSwitch() {
  // posizione iniziale dello switch
  switchX = random(width);
  switchY = random(height);

  // velocità casuali
  switchSpeedX = random(1, 3) * (random() > 0.5 ? 1 : -1);
  switchSpeedY = random(1, 3) * (random() > 0.5 ? 1 : -1);
}

// chiama la funzione n sottofondo
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetSwitch(); 
}
