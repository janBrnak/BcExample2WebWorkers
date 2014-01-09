onmessage = function (event) {
  // start
  var resultData = resultData = {pending: true, error : false, html : ""};
  postMessage(resultData);

  var inputData = event.data;
  var resultData = process(inputData)

  postMessage(resultData);
}

function process(data){
  var xMax = data.xMax;
  var xStep = data.xStep;
  var xMin = data.xMin;
  var yMax = data.yMax;
  var yStep = data.yStep;
  var yMin = data.yMin;
  var maxColumn = data.maxColumn;
  var maxRow = data.maxRow;

  var countMax = xMax * yMax;
  var countInc = 0;
  var countSent = 0;
  var countPrecent = 0;
  var xComper = 0;
  var yComper = 0;
  var errorMessage = false;
  var htmlMessage = "";
  var resultData = resultData = {pending: true, error : false, html : ""};
  var i = 0;
  var j = 0;
  var inc = 0;

  // skontrolujem hodnoty v inputoch xStep a yStep, ci neobsahuju nulu
  if(xStep < 1 || yStep < 1){
    errorMessage = "Nesprávne vyplnené hodnoty.";

    resultData.pending = false;
    resultData.error = errorMessage;
    resultData.html = false;

    return resultData;
  }

  xComper = comperValue(xMin, xMax, xStep);
  yComper = comperValue(yMin, yMax, yStep);

  // skontrolujem hodnoty v inputoch
  if(xComper == false || yComper == false ){
    errorMessage = "Nesprávne vyplnené hodnoty.<br />Maximálny počet stĺpcov je 20 a riadkov je 30.";

    resultData.pending = false;
    resultData.error = errorMessage;
    resultData.html = false;

    return resultData;
  }

  // skontrolujem maxmimalny pocet riadkov a stlpcov
  if(checkInterval(xComper, maxColumn) == false || checkInterval(yComper, maxRow) == false ){
    errorMessage = "Nesprávne vyplnené hodnoty.<br />Maximálny počet stĺpcov je 20 a riadkov je 30.";

    resultData.pending = false;
    resultData.error = errorMessage;
    resultData.html = false;

    return resultData;
  }

  htmlMessage += "<table class='margin-auto'>";

  // vygenerujem prvy riadok
  htmlMessage += "<thead>";
    htmlMessage += "<tr>";
      htmlMessage += "<th></th>";
      for(i = xMin; i <= xMax; i += xStep){
        htmlMessage += "<th> " + i + " </th>";
      }

    htmlMessage += "</tr>";
  htmlMessage += "</thead>";

  htmlMessage += "<tbody>";
  for(i = yMin; i <= yMax; i += yStep){
    htmlMessage += "<tr class='" + ( ++inc % 2 == 0 ? "even" : "odd") + "'>";
      htmlMessage += "<th>" + i + "</th>";
      for(j = xMin; j <= xMax; j += xStep){
        htmlMessage += "<td> " + gcd(j, i) + " </td>";
      }
    htmlMessage += "</tr>";
  }
  htmlMessage += "</tbody>";
  htmlMessage += "</table>";

  // return
  resultData.pending = false;
  resultData.error = errorMessage;
  resultData.html = htmlMessage;

  return resultData;
}

function gcd(u, v){
  if(v == 0)
     return u;
  else
     return gcd(v, u % v);
}

function checkInterval(maxInput, maxValue){
  var result = false;

  result = (maxInput > maxValue ? false : maxInput);

  return result;
}

function comperValue(startVal, endVal, stepVal){
  var result = false;
  var inc = 0;
  var i = 0;

  if(startVal <= endVal && endVal >= stepVal){
    for(i = startVal; i <= endVal; i += stepVal)
      inc++;

    result = inc;
  }

  return result;
}