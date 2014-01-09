var errorMessage = null;
var resultBox = null;
var overlay = null;
var maxColumn = 20;
var maxRow = 30;
var status = null;
var worker;
var submit = null;

function startTimeOutGenerate(){
  overlay = document.getElementById("loader")

  startGenerate()
  // overlay.style.display = "block";
  // setTimeout("startGenerate()", 500);
  // alert("SUCCESS: Submit form");
}

function startGenerate(){
  errorMessage = document.getElementById("errorMessage");
  resultBox = document.getElementById("table-result");

  var inputData = {
        xMax        : parseInt(document.getElementById("x-max").value),
        xStep       : parseInt(document.getElementById("x-step").value),
        xMin        : parseInt(document.getElementById("x-min").value),
        yMax        : parseInt(document.getElementById("y-max").value),
        yStep       : parseInt(document.getElementById("y-step").value),
        yMin        : parseInt(document.getElementById("y-min").value),
        maxColumn   : maxColumn,
        maxRow      : maxRow,
      };

  errorMessage.innerHTML = "";

  // spustim worker
  if(typeof(Worker)!=="undefined"){

    if(typeof(worker)=="undefined")
      worker = new Worker("./js/gcd-worker.js");

    worker.postMessage(inputData);
    worker.onmessage = workerOnMessage;
  }
  else{
    // overlay.style.display = "none";
    errorMessage.innerHTML = "Váš prehliadač nepodporuje prácu s web workermi.";
    // alert("ERROR: Unsupported");
  }
  // aby neodoslalo formular
  return false;
}

function workerOnMessage(event){
  var data = event.data;

  if(data.error == false){
    switch(data.pending){
      case true:
        //overlay.style.display = "block";
        break;

      case false:
        // zmazem stare data
        resultBox.innerHTML = "";

        // overlay.style.display = "none";
        resultBox.innerHTML = data.html;
        break;
    }

    // alert("SUCCESS: Worker return message");
  }
  else{
    // zmazem stare data
    resultBox.innerHTML = "";
    errorMessage.innerHTML = data.error;

    // alert("ERROR: Worker return message");
  }
}