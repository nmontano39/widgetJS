const stepBtn = document.querySelector('.solveBtn');
const randBtn = document.querySelector('.randBtn');

const bagDisplay = document.getElementById('bagDisplay');
const stepText = document.getElementById('stepText');

const factor = document.getElementById('factVal');

var put1 = document.getElementById('1');
var put2 = document.getElementById('2');
var put3 = document.getElementById('3');

var stepCount = 0;
var one;
var two;

const colors = ["red", "blue", "yellow"];

function loadEventListeners() {
  stepBtn.addEventListener('click', step);
  randBtn.addEventListener('click', randomize);
}

function update() {
  put1 = document.getElementById('1');
  put2 = document.getElementById('2');
  put3 = document.getElementById('3');
  put1.value = Math.abs(put1.value);
  put2.value = Math.abs(put2.value);
  put3.value = Math.abs(put3.value);
}

function randomize() {

  stepBtn.disabled = false;
  stepText.innerHTML = "";
  stepCount = 0;
  myBag.fill();

  bagDisplay.innerHTML = `
    <ul class="list-group">
      <li class="list-group-item">
        <div id="red">
          Red: ${myBag.contents[0]}
        </div>
        <div id="blue">
          Blue: ${myBag.contents[1]}
        </div>
        <div id="yellow">
          Yellow: ${myBag.contents[2]}
        </div>
      </li>
    </ul>
  `;
}


function step() {
  var size = myBag.contents[0] + myBag.contents[1] + myBag.contents[2];
  update();

  if (size > 1) {
    if (stepCount === 0) {
      one = myBag.take();
      two = myBag.take();

      if (one === two) {
        stepText.innerHTML += `
          <font color="red">You remove 2 ${colors[one]} chips</font>
        `
        document.getElementById(colors[one]).innerHTML += '<font color="red"> (-2)</font>';
      } else {
        stepText.innerHTML += `
          <font color="red">You remove 1 ${colors[one]} chip and 1 ${colors[two]} chip</font>
        `
        document.getElementById(colors[one]).innerHTML += '<font color="red"> (-1)</font>';
        document.getElementById(colors[two]).innerHTML += '<font color="red"> (-1)</font>';
      }
      stepCount++;

    } else if (stepCount === 1) {
      if (colors[one] === "red" || colors[two] === "red") {

        stepText.innerHTML += `<br>
          <font color="green">You put in 0 chips</font>
          <br><br>
        `

      } else if (colors[one] === "yellow" && colors[two] === "yellow") {

        document.getElementById("yellow").innerHTML += `<font color="green"> (+${put1.value})</font>`;
        document.getElementById("blue").innerHTML += `<font color="green"> (+${put2.value})</font>`;
        myBag.put(2, parseInt(put1.value));
        myBag.put(1, parseInt(put2.value));
        stepText.innerHTML += `<br>
          <font color="green">You put in ${put1.value} yellow chip(s) and ${put2.value} blue chip(s)</font><br><br>
        `

      } else if (colors[one] === "blue" || colors[two] === "blue") {

        document.getElementById("red").innerHTML += `<font color="green"> (+${put3.value})</font>`;
        myBag.put(0, parseInt(put3.value));

        stepText.innerHTML += `<br>
          <font color="green">You put in ${put3.value} red chip(s)</font><br><br>
        `

      }
      stepCount++;

    } else if (stepCount === 2) {

      bagDisplay.innerHTML = `
        <ul class="list-group">
          <li class="list-group-item">
            <div id="red">
              Red: ${myBag.contents[0]}
            </div>
            <div id="blue">
              Blue: ${myBag.contents[1]}
            </div>
            <div id="yellow">
              Yellow: ${myBag.contents[2]}
            </div>
          </li>
        </ul>
      `;
      stepText.innerHTML = "";
      stepCount = 0;
    }
  } else if (size === 1) {
    if (stepCount === 0) {
      one = myBag.take();

      stepText.innerHTML += `
        <font color="red">You remove 1 ${colors[one]} chip</font>
        
      `
      document.getElementById(colors[one]).innerHTML += '<font color="red"> (-1)</font>';
      
      stepCount++;

      size = 1;

    } else if (stepCount === 1) {
      stepText.innerHTML += `<br>
        <font color="green">You put in 0 chips</font>
      `;

      stepCount++;
      size = 1;

    } else if (stepCount === 2) {

      bagDisplay.innerHTML = `
        <ul class="list-group">
          <li class="list-group-item">
            <div id="red">
              Red: ${myBag.contents[0]}
            </div>
            <div id="blue">
              Blue: ${myBag.contents[1]}
            </div>
            <div id="yellow">
              Yellow: ${myBag.contents[2]}
            </div>
          </li>
        </ul>
      `;
      stepText.innerHTML = "";
      stepCount = 0;
    }
  } else if (size === 0) {
    stepBtn.disabled = true;
    bagDisplay.innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">
          <div id="red">
            Red: 0
          </div>
          <div id="blue">
            Blue: 0
          </div>
          <div id="yellow">
            Yellow: 0
          </div>
        </li>
      </ul>
    `;
    stepText.innerHTML = `<div class="text-center">THE PROCESS HAS HALTED</div><br>`;
  }
}

function Bag () {
  this.contents = [0, 0, 0];
};


Bag.prototype = {
  take: function () {
    var rand = Math.floor(Math.random() * 3);
    while (this.contents[rand] < 1) {
      rand = Math.floor(Math.random() * 3);
    }
    this.contents[rand]--;
    return rand;
  },

  put: function (idx, num) {
    this.contents[idx] += num;
  },

  fill: function () {
    this.contents[0] = 0;
    this.contents[1] = 0;
    this.contents[2] = 0;
    this.put(0, Math.floor(1 + Math.random() * factor.value));
    this.put(1, Math.floor(1 + Math.random() * factor.value));
    this.put(2, Math.floor(1 + Math.random() * factor.value));
  }
}

var myBag = new Bag();
loadEventListeners();
randomize();