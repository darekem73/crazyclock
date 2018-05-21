function Vehicle(x, y) {
  this.r = 2;
  this.maxSpeed = 20;
  this.maxForce = 2;
  this.attractionDist = 100;
  this.repelDist = 50;
  this.tooFar = 100;
  this.tooClose = 50;
  this.target = new Vector(0, 0);
  this.pos = new Vector(x, y);
  this.vel = new Vector(0, 0);
  this.acc = new Vector(0, 0);
  this.setTarget = function(pos) {
    this.target = pos.copy();
  }
  this.applyForce = function(f) {
    this.acc.add(f);
  }
  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.multiply(0);
  }

  this.behaviour = function() {
    var arrive = this.arrive(this.target);
    // var mouse = new Vector(mouseX, mouseY);

    // var flee = this.flee(mouse);

    arrive.multiply(1);
    // flee.multiply(5);

    this.applyForce(arrive);
    // this.applyForce(flee);
  }
  this.arrive = function(t) {
    var desired = vectorSubtract(t, this.pos);
    var dist = desired.value();
    var speed = this.maxSpeed;
    if (dist < this.attractionDist) {
      var speed = map(dist, 0, this.attractionDist, 0, this.maxSpeed);
    }
    desired.magnitude(speed);
    var steer = vectorSubtract(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }
  this.flee = function(t) {
    var desired = vectorSubtract(t, this.pos);
    var dist = desired.value();
    if (dist < this.repelDist) {
      desired.magnitude(this.maxSpeed);
      desired.multiply(-1);
      var steer = vectorSubtract(desired, this.vel);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return new Vector(0, 0);
    }
  }

  this.draw = function() {
    ctx.fillStyle = 'rgb(200,100,200)';
    ctx.strokeStyle = 'rgb(33,69,233)';
    ctx.lineWidth = 0.1;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
