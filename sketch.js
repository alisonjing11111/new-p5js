
let circleX = [];
let circleY = [];
let circleSize = [];

// leaves position
let leaves = [
  {x:170, y:180, s:230},
  {x:110, y:390, s:220},
  {x:520, y:130, s:160},
  {x:830, y:240, s:250},
  {x:350, y:480, s:280},
  {x:500, y:520, s:190},
  {x:750, y:520, s:180},
  {x:200, y:700, s:270},
  {x:510, y:840, s:230},
  {x:880, y:850, s:170},
  {x:700, y:100, s:190}
];

// leaves movement
let move1 = 0;
let move2 = 0;
let move3 = 0;

let speed1 = 0.05;
let speed2 = -0.03;
let speed3 = 0.04;

// flower position
let flowers = [
  {x:320, y:240},
  {x:290, y:790},
  {x:500, y:560},
  {x:650, y:350},
  {x:150, y:600}
];

// flowers movement
let flowerMove1 = 0;
let flowerMove2 = 0;
let flowerMove3 = 0;

let flowerSpeed1 = 0.03;
let flowerSpeed2 = -0.02;
let flowerSpeed3 = 0.01;

function setup() {
  createCanvas(900, 900);

  // 30 rain drops
  for (let i = 0; i < 30; i++) {
    circleX[i] = random(width);
    circleY[i] = random(height);
    circleSize[i] = random(10, 60);
  }
}

// draw leaves
function drawleaves(x, y, s) {

  // leaf shape
  fill(194, 223, 196, 100);
  noStroke();
  circle(x, y, s);

  // inner white lines
  stroke(255);
  strokeWeight(2);

  let r = s * 0.4;

  // inner horizontal line 
  line(x-r, y, x+r, y);

  // inner vertical line
  line(x, y-r, x, y+r);

  // 2 diagonal lines
  line(x-r*0.7, y-r*0.7,
       x+r*0.7, y+r*0.7);

  line(x-r*0.7, y+r*0.7,
       x+r*0.7, y-r*0.7);

  // center of leaves
  noStroke();
  fill(255);
  circle(x, y, 8);
}

// draw flowers
function drawFlower(x, y) {

  noStroke();

  // petals of flowers
  fill(237, 160, 187, 180);

  circle(x, y-25, 36);
  circle(x+22, y-10, 36);
  circle(x+22, y+10, 36);
  circle(x, y+25, 36);
  circle(x-22, y+10, 36);
  circle(x-22, y-10, 36);

  // center of flowers
  fill(255, 255, 255);
  circle(x, y, 18);
}

// draw boat
function drawBoat(x, y) {

  push();

  translate(x, y);
  rotate(-QUARTER_PI);

  // boat body
  fill(205, 170, 135);
  stroke(140, 105, 75);
  strokeWeight(3);

  ellipse(0, 0, 40, 120);

  // three wooden lines
  line(-14, -25, 14, -25);
  line(-16, 0, 16, 0);
  line(-14, 25, 14, 25);

  pop();
}

function draw() {

  background(236, 243, 236);

  // move leaves 
  move1 = move1 + speed1;
  move2 = move2 + speed2;
  move3 = move3 + speed3;

  // Change directions
  if (move1 > 5 || move1 < -5) {
    speed1 = -speed1;
  }

  if (move2 > 8 || move2 < -8) {
    speed2 = -speed2;
  }

  if (move3 > 6 || move3 < -6) {
    speed3 = -speed3;
  }

  // draw leaves
  for (let i = 0; i < leaves.length; i++) {

    let group = i + 1;

    // leaves 1, 4, 7, 10
    if (
      group == 1 || group == 4 ||
      group == 7 || group == 10
    ) {

      drawleaves(
        leaves[i].x + move1,
        leaves[i].y,
        leaves[i].s
      );

    }

    // leaves 2, 5, 8, 11
    else if (
      group == 2 || group == 5 ||
      group == 8 || group == 11
    ) {

      drawleaves(
        leaves[i].x,
        leaves[i].y + move2,
        leaves[i].s
      );

    }

    // leaves 3, 6, 9
    else {

      drawleaves(
        leaves[i].x + move3,
        leaves[i].y,
        leaves[i].s
      );

    }
  }

  // move flowers
  flowerMove1 = flowerMove1 + flowerSpeed1;
  flowerMove2 = flowerMove2 + flowerSpeed2;
  flowerMove3 = flowerMove3 + flowerSpeed3;

  // change directions
  if (flowerMove1 > 5 || flowerMove1 < -5) {
    flowerSpeed1 = -flowerSpeed1;
  }

  if (flowerMove2 > 8 || flowerMove2 < -8) {
    flowerSpeed2 = -flowerSpeed2;
  }

  if (flowerMove3 > 6 || flowerMove3 < -6) {
    flowerSpeed3 = -flowerSpeed3;
  }

  // draw flowers
  for (let i = 0; i < flowers.length; i++) {

    let group = i + 1;

    if (group == 1) {

      drawFlower(
        flowers[i].x + flowerMove1,
        flowers[i].y
      );

    }

    else if (group == 2) {

      drawFlower(
        flowers[i].x,
        flowers[i].y + flowerMove2
      );

    }

    else {

      drawFlower(
        flowers[i].x + flowerMove3,
        flowers[i].y
      );

    }
  }

  // boat move with mouse
  drawBoat(mouseX, mouseY);

  // draw rain drops
  push();

  noFill();
  stroke(255);
  strokeWeight(1);

  for (let i = 0; i < circleX.length; i++) {

    // Draw white circle
    circle(circleX[i], circleY[i], circleSize[i]);

    // Circle grows slowly
    circleSize[i] = circleSize[i] + 0.3;

    // Restart when too big
    if (circleSize[i] > 80) {
      circleSize[i] = random(10, 20);
      circleX[i] = random(width);
      circleY[i] = random(height);
    }
  }

  pop();

}
