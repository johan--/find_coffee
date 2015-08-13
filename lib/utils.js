function Filter(offerings) {
  if (typeof window === 'undefined') {
    // If rendering on server, offerings will be database
    // objects, and need to be converted before use.
    this.offerings = offerings.map(function(o) { return o.toJSON(); }) || [];
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
      .filter('directTrade', inputs.direct)
      .filter('organic', inputs.organic)
      .filter('origin', inputs.origin)
      .filter('process', inputs.process)
      .filter('roastery', inputs.roaster);

  return this.offerings;
};

// Returns true if offering contains search term.
function containsValue(object, key, value) {
  var property = key === 'roastery' ?  object.roastery.name : object[key],
      RE = new RegExp(value, 'i'),
      name = object.name;

  return matchesAnyValue(value) || isValue(property, value) ||
         matchesCheckbox(value) || matchesString(property, RE) ||
         matchesOfferingName(name, RE) ||
         matchesArray(property, RE);
}

// True if offering name contains search term.
function matchesOfferingName(name, regex) {
  return name.match(regex);
}

// True if user wants any value.
function matchesAnyValue(value) {
  return value === 'Any';
}

// True if property is value.
function isValue(property, value) {
  return property === value;
}

// True if checkbox wasn't checked.
function matchesCheckbox(value) {
  return typeof value === 'boolean' && !value;
}

// True if property matches search string.
function matchesString(property, regex) {
  return typeof property === 'string' && property.match(regex);
}

// True if anything in array matches search string.
function matchesArray(property, regex) {
  return Array.isArray(property) &&
    property.some(function(item) { return item.match(regex); });
}

module.exports.Filter = Filter;
