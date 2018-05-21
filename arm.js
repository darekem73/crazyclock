function Arm(segments, init_x, init_y, init_len, color) {
  this.segments = [];
  this.color = color;
  this.segments[0] = new Segment(init_x, init_y, init_len, 0.5, this.color);
  for (var i = 1; i < segments; i++) {
    var prev = this.segments[i - 1];
    this.segments[i] = new Segment(prev.b.x, prev.b.y, init_len,
      map(i, 1, segments, 1, 20), this.color);
  }
  this.pilot = new Vehicle(this.segments[segments - 1].b.x, this.segments[
    segments - 1].b.y);
  this.attachBase = function(pos) {
    this.segments[0].setA(pos);
    for (var i = 1; i < segments; i++) {
      var prev = this.segments[i - 1];
      this.segments[i].setA(prev.b);
    }
  }
  this.follow = function(target) {
    this.pilot.setTarget(target);
  }
  this.update = function() {
    this.pilot.behaviour();
    this.pilot.update();
    // for (var i = 0; i < cyferblat.digits.length; i++) {
    //   cyferblat.digits[i].collide(this.pilot);
    // }
    // cyferblat.update();
    var len = this.segments.length;
    this.segments[len - 1].follow(this.pilot.pos);
    for (var i = len - 2; i >= 0; i--) {
      var prev = this.segments[i + 1];
      this.segments[i].follow(prev.a);
    }
  }
  this.show = function() {
    for (var i = this.segments.length - 1; i >= 0; i--) {
      this.segments[i].show();
    }
    this.pilot.draw();
  }
}
