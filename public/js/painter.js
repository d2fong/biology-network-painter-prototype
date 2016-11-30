var painter = {};


// testing functions

painter.getRandomNum = function (min, max) {
  return Math.random() * (max - min) + min;
};

painter.generateRandomWellFormedData = function () {
  var cy = painter.getCy();

  return cy.nodes().map(function (ele) {
    var id = ele.id();
    return {
      id : id,
      val: painter.getRandomNum(-100, 100)
    }
  });
};

painter.getColorVal = function (val) {
  var r = (255 * val) / 100;
  var g = (255 * (100 - val)) / 100;
  var b = 0;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

// id, val -> id, color
painter.mapColors = function (data) {
  return data.map(function (dataPoint) {
    return {
      'id': dataPoint.id,
      'color': painter.getColorVal(dataPoint.val)
    }
  });
};

painter.getCy = function () {
  return window.cy;
};

// accepts text data that represents the data it needs to
// map
painter.visualizeData = function (file) {
  var reader = new FileReader();

  reader.onload = function (e) {
    var colorValMap = painter.mapColors(this.result);
    painter.applyColors(colorValMap);
  };

  reader.readAsText(file);
};

// set the two colors you need want as ranges
painter.colorChooser = function () {};

// apply the color to the nodes in the graph
painter.applyColors = function (colorMap) {
  var cy = painter.getCy();
  // console.log(cy);
  colorMap.map(function (entry) {
    cy.nodes('#' + entry.id).style({'background-color': entry.color});
  });

  // cy.style(colorMap);
};

module.exports = painter;
