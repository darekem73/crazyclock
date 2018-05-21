/* 2017.06.04 v9.0*/
/* 2017.05.27 v8.0*/
/* 2017.05.13 v7.0*/
/* 2017.05.08 v6.0*/
/* 2017.03.21 v5.0*/
/* 2017.03.20 v4.0*/
/* 2017.03.16 v3.0*/
/* 2017.02.23 v2.0*/
/* 2017.02.22 */

function Vector3D(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.value = function() {
    return (Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z));
  };
  this.mag = this.value;
  this.length = this.value;
  this.magSq = function() {
    return (this.x * this.x + this.y * this.y + this.z * this.z);
  }
  this.dot = function(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  };
  this.limit = function(l) {
    var len = this.value();
    if (len > l) {
      this.magnitude(l);
    }
    return this;
  }
  this.normalize = function() {
    var l = this.value();
    if (l > 0) {
      var s = 1 / this.value();
      this.x *= s;
      this.y *= s;
      this.z *= s;
    }
    return this;
  };
  this.magnitude = function(s) {
    if (this.value() > 0) {
      this.normalize();
    } else {
      this.x = 1;
      this.y = 0;
      this.z = 0;
    }
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  };
  this.setMag = this.magnitude;
  this.multiply = function(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  };
  this.mult = this.multiply;
  this.divide = function(s) {
    this.x /= s;
    this.y /= s;
    this.z /= s;
    return this;
  };
  this.div = this.divide;
  this.tx = function(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  };
  this.add = this.tx;
  this.subtract = function(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  };
  this.sub = this.subtract;
  this.copy = function() {
    return (new Vector3D(this.x, this.y, this.z));
  }
}

function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
  this.value = function() {
    return (Math.sqrt(this.x * this.x + this.y * this.y));
  };
  this.mag = this.value;
  this.length = this.value;
  this.magSq = function() {
    return (this.x * this.x + this.y * this.y);
  }
  this.dot = function(v) {
    return this.x * v.x + this.y * v.y;
  };
  this.limit = function(l) {
    var len = this.value();
    if (len > l) {
      this.magnitude(l);
    }
    return this;
  }
  this.normalize = function() {
    var l = this.value();
    if (l > 0) {
      var s = 1 / this.value();
      this.x *= s;
      this.y *= s;
    }
    return this;
  };
  this.magnitude = function(s) {
    if (this.value() > 0) {
      this.normalize();
    } else {
      this.x = 1;
      this.y = 0;
    }
    this.x *= s;
    this.y *= s;
    return this;
  };
  this.setMag = this.magnitude;
  this.multiply = function(s) {
    this.x *= s;
    this.y *= s;
    return this;
  };
  this.mult = this.multiply;
  this.divide = function(s) {
    this.x /= s;
    this.y /= s;
    return this;
  };
  this.div = this.divide;
  this.tx = function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  };
  this.add = this.tx;
  this.subtract = function(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  };
  this.sub = this.subtract;
  this.angle = function() {
    var a;
    if ((this.x > 0) && (this.y > 0)) {
      a = Math.round(360 - Math.atan(this.y / this.x) * 180 / Math.PI);
    } else if ((this.x > 0) && (this.y < 0)) {
      a = Math.round(-Math.atan(this.y / this.x) * 180 / Math.PI);
    } else if ((this.x < 0) && (this.y > 0)) {
      a = Math.round(180 - Math.atan(this.y / this.x) * 180 / Math.PI);
    } else if ((this.x < 0) && (this.y < 0)) {
      a = Math.round(180 - Math.atan(this.y / this.x) * 180 / Math.PI);
    } else {
      a = 0;
    }
    return (a);
  };
  this.heading = function() {
    var h = Math.atan2(this.y, this.x);
    return h; //RADIANS
  }
  this.setAngle = function(angle) { //RADIANS
    var l = this.value();
    var v = new Vector(Math.cos(angle), Math.sin(angle));
    v.magnitude(l);
    this.x = v.x;
    this.y = v.y;
  }
  this.copy = function() {
    return (new Vector(this.x, this.y));
  }
}

function random(a, b) {
  if (arguments.length === 0) {
    a = 0;
    b = 1;
  } else if (arguments.length === 1) {
    b = a;
    a = 0;
  }
  if (seed > 0) {
    return pseudoRandom() * Math.abs(b - a) + a;
  } else {
    return Math.random() * Math.abs(b - a) + a;
  }
}

function constrain(v, min, max) {
  if (v < min) return min
  else if (v > max) return max
  else return v;
}

function objDistance(a, b) { //zaklada że obiekt ma właściwość pos
  return (Math.sqrt((a.pos.x - b.pos.x) * (a.pos.x - b.pos.x) + (a.pos.y - b.pos
    .y) * (a.pos.y - b.pos.y)));
}

function vectorDistance(a, b) {
  return (Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)));
}

function vectorDistanceSq(a, b) {
  return ((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

function vectorSubtract(a, b) {
  return new Vector(a.x - b.x, a.y - b.y);
}

function vectorAdd(a, b) {
  return new Vector(a.x + b.x, a.y + b.y);
}

function vectorFromAngle(a, l) {
  if (!l) {
    l = 1;
  }
  var v = new Vector(1, 0);
  v.setMag(l);
  v.setAngle(a);
  return (v);
}

function distance(x1, y1, x2, y2) {
  return (Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
}

function distSq(x1, y1, x2, y2) {
  return ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function map(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};


function lerp(start, stop, amt) {
  return amt * (stop - start) + start;
};

var seed = 0;

function pseudoRandom() {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

Math.seed = function(s) {
  return function() {
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
  };
};

// usage:
//var random1 = Math.seed(42);
//var random2 = Math.seed(random1());
//Math.random = Math.seed(random2());

function matrixMult(a, b) {
  var aM = a.length; //columns
  var aN = a[0].length; //rows
  var bP = b.length; //columns
  var bM = b[0].length; //rows
  if (aM != bM) {
    return undefined;
  }

  var out = [];
  for (var x = 0; x < bP; x++) {
    out[x] = [];
    for (var y = 0; y < aN; y++) {
      out[x][y] = 0;
      for (i = 0; i < aM; i++) {
        out[x][y] += a[i][y] * b[x][i];
      }
    }
  }
  return out;
}

function rotationMatrix(angle) {
  var rm = [
    [Math.cos(angle), Math.sin(angle)],
    [-Math.sin(angle), Math.cos(angle)]
  ]
  return rm;
}
