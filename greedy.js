const upBtn = document.querySelector('.upBtn');
const downBtn = document.querySelector('.downBtn');
const denoms = document.getElementById('denoms');
const makeBtn = document.querySelector('.makeBtn');
const changeVal = document.getElementById('changeVal');
const solution = document.querySelector('.solution');

const usd = [1, 2, 5, 10, 20, 50, 100];
var bills = [1];

function loadEventListeners() {
  upBtn.addEventListener('click', add);
  downBtn.addEventListener('click', remove);
  makeBtn.addEventListener('click', make);
}

function make() {
  if (changeVal.value === '') {
    alert("Please enter a target amount");
  } else {

    update0();

    makeBtn.disabled = true;
    upBtn.disabled = true;
    downBtn.disabled = true;
    changeVal.readOnly = true;
    for (var x = 0; x < bills.length; x++) {
      document.getElementById(`totVal${x}`).readOnly = true;
    }

    var curr = [];
    
    for (var x = 0; x < bills.length; ++x) {
      curr.push(0);
    }

    curr.push(0);
    curr[curr.length-1] = parseInt(changeVal.value);

    bills.sort((a, b) => a - b);
    bills.reverse();

    for (var x = 0; x < bills.length; x++) {
      curr[x] = Math.floor(curr[curr.length-1] / bills[x]);
      curr[curr.length-1] -= curr[x] * bills[x];
    }

    var stringy = `
    <ul class="list-group">
      <li class="list-group-item">
    `;

    for (var y = 0; y < bills.length; y++) {
      if (curr[y] > 0) {
        stringy += `<div>$${bills[y]} bills . . . ${curr[y]}</div>`;
      }
    }

    if (curr[curr.length-1] > 0) {
      stringy += `
        <br>
        Cannot make exact change ( $${curr[curr.length-1]} remaining )
      `;
    }

    stringy += `
      </li>
    </ul>
    `;

    solution.innerHTML = stringy;

    solution.innerHTML += `
      <br>
      <button class="resetBtn btn-block" width=100>Reset</button>
      <br>
    `;

    const resetBtn = document.querySelector('.resetBtn');
    resetBtn.addEventListener('click', reset);
  }
}

function reset() {

  makeBtn.disabled = !true;
  upBtn.disabled = !true;
  downBtn.disabled = !true;
  changeVal.readOnly = !true;
  for (var x = 0; x < bills.length; x++) {
    document.getElementById(`totVal${x}`).readOnly = !true;
  }

  solution.innerHTML = '';
}

function add() {

  for (var x = 0; x < bills.length; x++) {
    bills[x] = parseInt(document.getElementById(`totVal${x}`).value);
  }

  var i = bills.length;
  var val;

  if (i < usd.length) {
    val = usd[i];
  } else {
    val = (2 + i - usd.length) * 100;
  }
  bills.push(val);
  update();
}

function remove() {
  if (bills.length > 1) {
    bills.pop();
  }
  update();
}


function update() {
  denoms.innerHTML = '';
  for (var x = 0; x < bills.length; x++) {
    denoms.innerHTML += `
      <div class="thing${x} text-center">
        <input type="text" class="text-center" id="totVal" style="width: 20px;" value="$" readonly>
        <input type="number" class="text-center" id="totVal${x}" style="width: 100px;" value=${bills[x]}>
      </div>
    `;
  }
}

function update0() {
  for (var x = 0; x < bills.length; x++) {
    bills[x] = parseInt(document.getElementById(`totVal${x}`).value);
  }
}



loadEventListeners();