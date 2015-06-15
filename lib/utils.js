function Filter(offerings) {
  if (typeof window === 'undefined') {
    // If rendering on server, offerings will be database
    // objects, and need to be converted before use.
    this.offerings = offerings.map(function(o) { return o.toJSON() }) || [];
  } else {
    this.offerings = offerings || [];
  }
}

// Filter offerings to include only those that contain a matching value.
Filter.prototype.filter = function(cat, val) {

  this.offerings = this.offerings.filter(function(offering) {

    // Search all categories within offering for a match.
    if (cat === 'ALL') {
      var keys = Object.keys(offering);

      for (var i = 0, len = keys.length; i < len; i++) {
        if (containsValue(offering, keys[i], val)) {
          return true;
        }
      }
      return false;

    // Search given category within offering for a match.
    } else {
      return containsValue(offering, cat, val);
    }
  });

  return this;
};

// Apply the filter function to all inputs in form.
Filter.prototype.processForm = function(inputs) {
  this.filter('ALL', inputs.search)
      .filter('blend', inputs.blend)
      .filter('decaf', inputs.decaf)
      .filter('direct', inputs.direct)
      .filter('organic', inputs.organic)
      .filter('origin', inputs.origin)
      .filter('process', inputs.process)
      .filter('roaster', inputs.roaster);

  return this.offerings;
};

// Helper that returns true if object contains value.
function containsValue(object, key, value) {
  var match = new RegExp(value, 'i');

  // True if user wants any value or checkbox wasn't checked.
  if (value === 'Any' || (typeof value === 'boolean' && !value)) { 
    return true;
  }

  // Check strict equality.
  if (object[key] === value) {
    return true;
  }

  // Check regexp match.
  if (typeof object[key] === 'string' && object[key].match(match)) {
    return true;
  }

  // If array, check for match inside.
  if (Array.isArray(object[key]) &&
      object[key].some(function(item) { return item.match(match); })) {
    return true;
  }

  return false;
}

module.exports.Filter = Filter;
