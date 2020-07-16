const w = document.getElementById('word');
const go = document.getElementById('goBtn');
const rand = document.getElementById('randBtn');
const rVal = document.getElementById('randVal');
const sol = document.getElementById('solution');

function loadEventListeners() {
  go.addEventListener('click', step);
  rand.addEventListener('click', rando);
}

function rando() {
  w.value = randWord(Math.ceil(Math.random() * rVal.value) + 1).toUpperCase();
}

function step() {
  if (w.value === '') {
    alert("Please enter a valid input string");
  } else {
    var change = w.value.replace(/[^a-z]/gi, '');
    w.value = change.toUpperCase();

    goBtn.disabled = true;
    randBtn.disabled = true;
    rVal.readOnly = true;
    w.readOnly = true;


    var arr = [];

    if (w.value.length > 2) {

      recur(w.value, arr);


      var max = '';
      var maxL = 0;
      var output = '';

      for (var i = 0; i < arr.length; i++) {
        if (arr[i].length > maxL) {
          max = arr[i];
          maxL = arr[i].length;
        }
        output += arr[i] + " ";
      }

      var ind = w.value.indexOf(max);
      var rev = max.split("").reverse().join("");
      var lind = w.value.lastIndexOf(rev);

      var pretty = `${w.value.substring(0,ind)}<font color="red">${max}</font>${w.value.substring(ind+maxL, lind)}<font color="red">${rev}</font>${w.value.substring(lind+maxL, w.value.length)}`;

    } else {
      var maxL = 0;
      var output = 'none';
      var pretty = `${w.value}`;
    }
    
    output.length < 1 ? output = 'none' : output = output;
    
    sol.innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">
          <div>Input String = ${w.value}</div>
          <hr>
          <div>Solution = ${maxL}</div>
          <div>Metapalindromes = ${output}</div><br>
          <div>${pretty}</div>
        </li>
      </ul>
      <button class="resetBtn btn-block" width=100>Reset</button>
    `;

    document.querySelector('.resetBtn').addEventListener('click', function reset() {
      goBtn.disabled = !true;
      randBtn.disabled = !true;
      rVal.readOnly = !true;
      w.readOnly = !true;
      sol.innerHTML = '';
    });
  }
}

function recur(str, arr) {
  if (str.length < 2) {
    return;
  } else {
    curr = str.charAt(0);
    var comp = str.substring(1, str.length+1);

    if (comp.lastIndexOf(curr) > -1) {
      var spot = comp.lastIndexOf(curr);
      var check = true;
      var add = '';
      while (check) {
        if (spot > 0 && curr === comp.charAt(spot)) {
          add += curr;
          curr = comp.charAt(0);
          comp = comp.substring(1, comp.length);
          spot--;
          spot--;
        } else {
          check = false;
        }
      }
      if (!arr.includes(add)) arr.push(add);
    }
    recur(str.substring(1, str.length+1), arr);
  }
}

function grab(x) {
  return x.charAt(Math.floor(Math.random() * x.length));
}


function randWord(length) {

  const all = 'bcdfghjklmnpqrstvwxyzaeiou';
  var test = [length];

  test[0] = grab(all).toUpperCase();

  for ( var i = 1; i < length; i++ ) {
    test[i] = grab(all);
  }

  return test.join('');
}

loadEventListeners();