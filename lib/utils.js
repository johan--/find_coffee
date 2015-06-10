function Available(offerings) {
  this.offerings = offerings || [];
}

Available.prototype.filter = function(cat, val) {

  // Save prop for method chaining.
  var result = [],
      match  = new RegExp(val, 'i');

  this.offerings.forEach(function(i) {

    // Check for strict equality.
    if (i[cat] === val) {
      result.push(i);
    }

    // Check regexp match.
    if (typeof i[cat] === 'string' && i[cat].match(match)) {
      result.push(i);
    }

    // If array, check for match inside.
    if (Array.isArray(i[cat])) {
      if (i[cat].some(function(item) { return item.match(match) })) {
        result.push(i);
      }
    }
  });

  this.offerings = result;
  return this;
};

module.exports.Available = Available;
