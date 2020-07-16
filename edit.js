const stepBtn = document.querySelector('.stepBtn');
const randBtn = document.querySelector('.randBtn');
const solution = document.getElementById('solutionDisplay');
const resetNew = document.getElementById('resetDisplay');
var input1 = document.getElementById('strVal1');
var input2 = document.getElementById('strVal2');
var randVal = document.getElementById('randVal');

function loadEventListeners() {
  stepBtn.addEventListener('click', start);
  randBtn.addEventListener('click', randomize);
}

function start() {
  step();
}


function randomize() {

  input1.value = randWord(Math.ceil(Math.random() * (randVal.value-1)) + 1);
  input2.value = randWord(Math.ceil(Math.random() * (randVal.value-1)) + 1);

}


function randWord(length) {

  const all = 'bcdfghjklmnpqrstvwxyzaeiou';
  const conso = 'bcdfghjklmnpqrstvwxyz';
  const vowel = 'aeiou';
  var test = [length];

  test[0] = grab(all).toUpperCase();

  for ( var i = 1; i < length; i++ ) {
    if (conso.includes(test[i-1].toLowerCase())) {
      //vowel if conso before
      test[i] = grab(vowel);
    } else {
      test[i] = grab(all);
    }
  }

  return test.join('');
}


function grab(x) {
  return x.charAt(Math.floor(Math.random() * x.length));
}


function step() {

  input1.value = input1.value.replace(/[^a-z]/gi, '');
  input2.value = input2.value.replace(/[^a-z]/gi, '');

  input1.readOnly = true;
  input2.readOnly = true;

  if (input1.value === '' || input2.value === '') {
    alert("Please enter two valid input strings");
  } else {
    randBtn.disabled = true;
    stepBtn.disabled = true;
    randVal.readOnly = true;
    makeDisplay();
  }
}



function getDistance(a, b) {
  var cost;
  var m = a.length;
  var n = b.length;

  if (m < n) {
    var c = a; a = b; b = c;
    var o = m; m = n; n = o;
  }

  var r = []; r[0] = [];
  for (var c = 0; c < n + 1; ++c){
    r[0][c] = c;
  }

  for (var i = 1; i < m + 1; ++i) {
    r[i] = []; r[i][0] = i;
    for (var j = 1; j < n + 1; ++j) {
      cost = a.charAt(i-1) === b.charAt(j-1) ? 0 : 1;
      r[i][j] = mini(r[i-1][j] + 1, r[i][j-1] + 1, r[i-1][j-1] + cost);
    }
  }
  return r;
}

function mini(x, y, z) {
  if (x <= y && x <= z) return x;
  if (y <= x && y <= z) return y;
  return z;
}


function makeDisplay() {

  var leven = getDistance(input1.value, input2.value);
  var output = "";
  var iX, iY;

  if (input1.value.length > input2.value.length) {
    iX = input1;
    iY = input2;
  } else {
    iX = input2;
    iY = input1;
  }

  output += "| . | . |";
  for (var x = 0; x < iY.value.length; ++x) {  
    var add = iY.value.substring(x, x+1);
    output += ` ${add} `;
    output += "|";
  }

  for (var row = 0; row < leven.length; ++row) {
    output += `<div>`;
    for (var col = 0; col < leven[row].length; ++col) { 
      if (col === 0) {
        output += `| `;
        
        if (row < 1) {
          output += `. | `;
        } else {
          var stuff = iX.value.substring(row - 1, row);
          output += `${stuff} | `;
        }
      }
      var thing = leven[row][col];
      output += `${thing}`;

      if (thing > 9) {
        output += `| `;
      } else {
        output += ` | `;
      }
    }
    output += '</div>';
  }
  output += `<br>`;

  var editScore = parseInt(leven[iX.value.length][iY.value.length]);



  solution.innerHTML += `
  <p class="fancy">
    <ul class="list-group">
      <li class="list-group-item">
        <div>
          ${input1.value}
        </div>
        <div>
          ${input2.value}
        </div>
        <br>
        ${output}
        Edit Distance = ${editScore}
      </li>
    </ul>
  </p>`;

  if (editScore === Math.max(input1.value.length, input2.value.length)) {
    solution.innerHTML += `<li class="list-group-item"><div>
      There is no optimal edit sequence for '${input1.value}' and '${input2.value}'
    </div></li><br>`;
  } else {
    recur(0, 0, iX.value.replace(" ", "_"), iY.value.replace(" ", "_"), leven, "", "", editScore);
  }


  resetNew.innerHTML = `
    <button class="resetBtn btn-block" width=100>Reset</button>
    <br>
  `;
  
  const resetBtn = document.querySelector('.resetBtn');
  resetBtn.addEventListener('click', reset);
}

function recur(rowX, colY, x, y, mat, strX, strY, eS) {

  if (rowX === x.length && colY === y.length) {
    if (score(strX, strY) === eS ) {
      solution.innerHTML += makePretty(strX, strY);
    }
    return;
  } else if (rowX === x.length) {
    if (mat[rowX][colY+1] <= eS) {
      var vert = recur(rowX, colY+1, x, y, mat, strX + "_", strY + y.substring(colY, colY+1), eS);
    }
  } else if (colY === y.length) {
    if (mat[rowX+1][colY] <= eS) {
      var hori = recur(rowX+1, colY, x, y, mat, strX + x.substring(rowX, rowX+1), strY + "_", eS);
    }
  } else {
    if (mat[rowX+1][colY] <= eS) {
      var hori = recur(rowX+1, colY, x, y, mat, strX + x.substring(rowX, rowX+1), strY + "_", eS);
    }
    if(mat[rowX][colY+1] <= eS) {
      var vert = recur(rowX, colY+1, x, y, mat, strX + "_", strY + y.substring(colY, colY+1), eS);
    }
    if(mat[rowX+1][colY+1] <= eS) {
      var diag = recur(rowX+1, colY+1, x, y, mat, strX + x.substring(rowX, rowX+1), strY + y.substring(colY, colY+1), eS);
    }
  }
}


function makePretty(s1, s2) {
  var ugly1 = `<li class="list-group-item"><div>`;
  var ugly2 = `<div>`;
  var pretty = ``;

  for (var i = 0; i < s1.length; ++i) {    
    var s1i = s1.substring(i, i+1);
    var s2i = s2.substring(i, i+1);

    if (s1i === s2i) {
      ugly1 += `<font color="red">${s1i}</font>`;
      ugly2 += `<font color="red">${s2i}</font>`;
    } else {
      ugly1 += `${s1i}`;
      ugly2 += `${s2i}`;
    }
  }
  ugly1 += `</div>`;
  ugly2 += `</div>`;

  pretty += ugly1 + ugly2 + `</li><br>`;
  return pretty;
}


function score(a, b) {
  var j, k;

  if (a.length > b.length) {
    j = a;
    k = b;
  } else {
    j = b;
    k = a;
  }

  var count = 0;
  for (var x = 0; x <j.length; ++x) {
    if (j.substring(x, x+1) !== k.substring(x, x+1)) {
      count++;
    }
  }
  return count;
}


function reset() {
  solution.innerHTML = '';
  resetNew.innerHTML = '';
  randBtn.disabled = false;
  stepBtn.disabled = false;
  randVal.readOnly = false;
  input1.readOnly = false;
  input2.readOnly = false;
}


loadEventListeners();

