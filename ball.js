function Ball(x, y, vx, vy) {
  this.r = 10;
  this.pos = new Vector(x, y);
  this.vel = new Vector(vx, vy);
  this.acc = new Vector(0, 0);
}

Ball.prototype.draw = function() {
  fill(63, 150, 63);
  noStroke();
  ellipse(this.pos.x, this.pos.y, this.r, this.r, this.angle);
}

Ball.prototype.thrust = function(f) {
  var newV = this.vel.copy();
  newV.magnitude(f);
  this.acc.add(newV);
}

Ball.prototype.accelerate = function(a) {
  this.acc.add(a);
}

Ball.prototype.update = function() {
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.acc.mult(0);
}

Ball.prototype.bounce = function() {
  if (this.pos.x < this.r || this.pos.x > width - this.r) {
    this.vel.x *= -1;
  }
  if (this.pos.y < this.r || this.pos.y > height - this.r) {
    this.vel.y *= -1;
  }
  this.pos.x = constrain(this.pos.x, this.r, width - this.r);
  this.pos.y = constrain(this.pos.y, this.r, height - this.r);
}
