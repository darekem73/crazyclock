function Segment(x, y, len, w, color) {
  this.a = new Vector(x, y);
  this.b = new Vector(x + len * Math.cos(0), y + len * Math.sin(0));
  this.len = len;
  this.selfAngle = 0;
  this.angle = 0;
  this.w = w;
  this.color = color;

  this.calculateB = function() {
    this.b.x = this.a.x + this.len * Math.cos(this.angle);
    this.b.y = this.a.y + this.len * Math.sin(this.angle);
  }
  this.setA = function(a) {
    this.a = a.copy();
    this.calculateB();
  }
  this.follow = function(target) {
    var delta = target.copy();
    delta.sub(this.a);
    if (delta.value() != 0) {
      this.angle = delta.heading();
      delta.setMag(this.len);
      delta.mult(-1);
      delta.add(target);
      this.a = delta;
      this.calculateB();
    }
  }

  this.show = function() {
    ctx.strokeStyle = this.color;
    lineWidth(this.w);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
