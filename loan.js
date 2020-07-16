const calcBtn = document.getElementById("calcBtn");

function loadEventListeners() {
  calcBtn.addEventListener('click', calculateResults);
}

// Calculate Results
function calculateResults(){

  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  if (amount.value === "" || interest.value === "" || years.value === "") {
    alert("Please enter valid inputs");
  } else {

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    mP = monthly.toFixed(2);
    tP = (monthly * calculatedPayments).toFixed(2);
    tI = ((monthly * calculatedPayments)-principal).toFixed(2);

    document.getElementById("monthly-payment").value = mP;
    document.getElementById("total-payment").value = tP;
    document.getElementById("total-interest").value = tI;
    document.getElementById('results').style.display = 'block';

  }
}

loadEventListeners();