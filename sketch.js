var arms = [];
var bases = [];
var cyferblat;
var frameCounter = 0;
var animate;
var mouseX, mouseY;

function getTime() {
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var time = {
    h: h,
    m: m,
    s: s
  }
  return time;
}

function setup() {
  createCanvas(500, 500);
  animate = checkbox(false);
  ctx.lineCap = 'round';
  arms.push(new Arm(40, random(width), random(height), 10, 'yellow'));
  arms.push(new Arm(40, random(width), random(height), 10, 'red'));
  arms.push(new Arm(40, random(width), random(height), 10, 'green'));
  bases.push(new Vector(width / 2, height / 2));
  bases.push(new Vector(width / 2, height / 2));
  bases.push(new Vector(width / 2, height / 2));
  cyferblat = new Cyferblat(60);
}

function draw() {
  background(0);
  if (frameCounter % 50 === 0) {
    time = getTime();
  }
  arms[0].follow(cyferblat.posOf(time.h));
  arms[1].follow(cyferblat.posOf(time.m));
  arms[2].follow(cyferblat.posOf(time.s));
  for (var i = 0; i < arms.length; i++) {
    arms[i].attachBase(bases[i]);
  }
  for (var i = 0; i < arms.length; i++) {
    arms[i].update();
  }
  ctx.strokeStyle = 'brown';
  lineWidth(2);
  circle(250, 250, 200);
  circle(250, 250, 50);
  if (animate.checked) {
    cyferblat.update();
  }
  for (var i = 0; i < arms.length; i++) {
    arms[i].show();
  }

  cyferblat.draw();

  frameCounter++;
}

setup();
setInterval(draw, 20);
