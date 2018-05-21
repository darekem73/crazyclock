function Digit(n, x, y, r) {
  this.value = n;
  this.r = r;
  this.v = 1;
  this.pos = new Vector(x, y);
  this.vel = new Vector(random(-1, 1), random(-1, 1));
  this.vel.setMag(this.v);
  this.acc = new Vector(0, 0);
  this.thrust = function(f) {
    var newV = this.vel.copy();
    newV.magnitude(f);
    this.acc.add(newV);
  }
  this.accelerate = function(a) {
    this.acc.add(a);
  }
  this.update = function() {
    this.vel.add(this.acc);
    // this.vel.mult(0.99);
    this.vel.limit(this.v);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  this.bounce = function() {
    if (this.pos.x < this.r || this.pos.x > width - this.r) {
      this.vel.x *= -1;
    }
    if (this.pos.y < this.r || this.pos.y > height - this.r) {
      this.vel.y *= -1;
    }
    this.pos.x = constrain(this.pos.x, this.r, width - this.r);
    this.pos.y = constrain(this.pos.y, this.r, height - this.r);
  }
  this.collide = function(other) {
    //wektor nominalny
    var dn = new Vector(this.pos.x - other.pos.x, this.pos.y - other.pos.y);
    var dist = dn.length();
    var dr = this.r + other.r;

    //jesli odleglosc wskazuje ze sie co najmniej stykaja albo pokrywaja
    if (dist < dr) {
      dn.normalize();
      //wektor poprzeczny (tangential)
      var dt = new Vector(dn.y, -dn.x);
      dt.normalize();

      //rozsun nakladajace sie kulki (normalnie proporjonalnie do masy)
      //tutaj masa = promien
      var mT = dn.copy();
      mT.multiply(dr - dist);
      this.pos.add(mT.multiply(other.r / dr));
      other.pos.add(mT.multiply(-this.r / dr));

      //zeby kulki nie wypadaly nigdy poza plansze
      this.pos.x = constrain(this.pos.x, this.r, canvas.width - this.r);
      this.pos.y = constrain(this.pos.y, this.r, canvas.height - this.r);
      other.pos.x = constrain(other.pos.x, this.r, canvas.width - this.r);
      other.pos.y = constrain(other.pos.y, this.r, canvas.height - this.r);

      //rzut dotychczasowych predkosci na rownolegla i poprzeczna zderzenia
      var v1n = this.vel.dot(dn);
      var v1t = this.vel.dot(dt);
      var v2n = other.vel.dot(dn);
      var v2t = other.vel.dot(dt);

      //nowe wartosci skladowych predkosci
      //poprzeczna sie nie zmienia
      var newv1t = v1t;
      var newv2t = v2t;

      //rownolegla to zderzenie w jednym wymiarze
      //i z zasady zachowania pedu i energii dla zderzen sprezystych
      //nowa wartosc skladowych rownoleglych (tu r = m)
      var newv1n = (v1n * (this.r - other.r) + 2 * other.r * v2n) / (this.r +
        other.r);
      var newv2n = (v2n * (other.r - this.r) + 2 * this.r * v1n) / (this.r +
        other.r);

      //nowa skladowa rownolegla (jako wektor)
      var newv1vectorN = dn.copy();
      newv1vectorN.multiply(newv1n);
      //nowa skladowa poprzeczna (jako wektor)
      var newv1vectorT = dt.copy();
      newv1vectorT.multiply(newv1t);

      var newv2vectorN = dn.copy();
      newv2vectorN.multiply(newv2n);
      var newv2vectorT = dt.copy();
      newv2vectorT.multiply(newv2t);
      //ostatecznie nowe predkosci wektorowo to sumy skladowych (wektorow)
      //rownoleglej i poprzecznej
      this.vel = newv1vectorN.add(newv1vectorT);
      other.vel = newv2vectorN.add(newv2vectorT);
    }
  }
  this.draw = function() {
    function addZero(a) {
      return a > 9 ? "" + a : "0" + a;
    }
    push();
    translate(this.pos.x, this.pos.y);
    ctx.font = 'Bold 14px Arial';
    ctx.fillStyle = 'orange';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.2;
    ctx.globalAlpha = 0.9;
    circle(0, 0, this.r);
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';
    ctx.fillText(addZero(n), -this.r / 2, this.r / 3);
    pop();
  }
}
