function forEach(data, callback) {
  var i, len;
  if (Array.isArray(data)) {
    data.forEach(function(item) {
      callback(item);
    })
  } else {
    for (i in data) {
      callback(data[i]);
    }
  }
}
module.exports = {
  each: forEach
};