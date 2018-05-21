function Cyferblat(n) {
  this.digits = [];
  this.r = 15;
  this.edges = function(d) {
    return d.pos.x - this.r < 0 ||
      d.pos.x + this.r > width ||
      d.pos.y - this.r < 0 ||
      d.pos.y + this.r > height
  }
  this.touches = function(d) {
    for (var i = 0; i < this.digits.length; i++) {
      var distance = vectorDistance(this.digits[i].pos, d.pos);
      if (distance < 2 * this.r) {
        return true;
      }
    }
    return false;
  }
  this.posOf = function(n) {
    return this.digits[n].pos;
  }
  this.update = function() {
    for (var i = 0; i < this.digits.length; i++) {
      for (var j = i + 1; j < this.digits.length; j++) {
        this.digits[j].collide(this.digits[i]);
      }
      this.digits[i].update();
      this.digits[i].bounce();
    }
  }
  this.draw = function() {
    for (var i = 0; i < this.digits.length; i++) {
      this.digits[i].draw();
    }
  }
  for (var i = 0; i < n; i++) {
    var d;
    var center = new Vector(width / 2, height / 2);
    do {
      d = new Digit(i, random(width), random(height), this.r);
      dist = vectorDistance(center, d.pos);
      var pos_not_ok = this.edges(d) || this.touches(d) || (dist < 70) ||
        (dist > 200);
    } while (pos_not_ok);
    this.digits.push(d);
  }
}
