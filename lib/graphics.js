/* 2017.06.12 v7.0*/
/* 2017.04.17 v6.0*/
var canvas;
var width;
var height;
var ctx;
var origins = [];
var origin = {
  x: 0,
  y: 0
}
var pixels, _pixels;

var _STROKE = true;
var _FILL = true;

function _render() {
  if (_FILL) {
    ctx.fill();
  }
  if (_STROKE) {
    ctx.stroke();
  }
}

function point(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  _render();
}

function circle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  _render();
}

function line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  _render();
}

function ellipse(x, y, r1, r2, a) {
  ctx.beginPath();
  ctx.ellipse(x, y, r1, r2, a || 0, 0, 2 * Math.PI);
  _render();
}

function rectangle(x, y, w, h) {
  //ctx.beginPath();
  if (_FILL) {
    ctx.fillRect(x, y, w, h);
  }
  if (_STROKE) {
    ctx.strokeRect(x, y, w, h);
  }
}

function fill(r, g, b, a) {
  if (arguments.length == 1) {
    ctx.fillStyle = 'rgb(' + r + ',' + r + ',' + r + ')';
  } else if (arguments.length == 3) {
    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
  } else {
    ctx.globalAlpha = a;
    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  _FILL = true;
}

function noFill() {
  _FILL = false;
}

function alpha(a) {
  ctx.globalAlpha = a;
}

function lineWidth(lw) {
  ctx.lineWidth = lw;
}

function stroke(r, g, b, a) {
  if (arguments.length == 1) {
    ctx.strokeStyle = 'rgb(' + r + ',' + r + ',' + r + ')';
  } else if (arguments.length == 3) {
    ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
  } else {
    ctx.globalAlpha = a;
    ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  _STROKE = true;
}

function noStroke() {
  _STROKE = false;
}

function createCanvas(w, h) {
  canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  width = canvas.width;
  height = canvas.height;
  canvas.style.border = '7px solid #0063ff';
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');

  canvas.onmousemove = function(event) {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
  }
}

function resizeCanvas() {
  canvas.width = width;
  canvas.height = height;
}

function push() {
  var o = {
    x: origin.x,
    y: origin.y
  };
  origins.push(o);
  ctx.save();
}

function pop() {
  ctx.restore();
  origin = origins.pop();
}

function translate(x, y) {
  origin.x = -x;
  origin.y = -y;
  ctx.translate(x, y);
}

function rotate(a) {
  ctx.rotate(a);
}

function clear() {
  ctx.clearRect(origin.x, origin.y, width, height);
}

function background(r, g, b, a) {
  ctx.clearRect(origin.x, origin.y, width, height);
  if (arguments.length == 1) {
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(' + r + ',' + r + ',' + r + ')';
  } else if (arguments.length == 3) {
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
  } else {
    ctx.globalAlpha = a;
    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  ctx.fillRect(origin.x, origin.y, width, height);
}

function loadPixels() {
  _pixels = ctx.getImageData(origin.x, origin.y, width, height);
  pixels = _pixels.data;
}

function putPixels() {
  _pixels.data = pixels;
  ctx.putImageData(_pixels, origin.x, origin.y);
}

function slider(min, max, step, value) {
  var g = document.createElement('input');
  g.type = 'range';
  g.style.display = 'block';
  g.min = min;
  g.max = max;
  g.step = step;
  g.value = value;
  document.body.appendChild(g);
  return g;
}

function checkbox(checked) {
  var g = document.createElement('input');
  g.type = 'checkbox';
  g.style.display = 'block';
  g.checked = checked;
  document.body.appendChild(g);
  return g;
}
