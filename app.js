const category = document.getElementById('categories');
const btnAdd = document.querySelector('.btn-add');
const date = document.querySelector('.date');
const amountInput = document.querySelector('.amount');
const total = document.getElementById('total');
const table = document.querySelector('.table-list');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalAmount = 0;
displayExpenses();
sumExpenses();
//let totalAmount = expenses.reduce((sum, expense) => sum + expense.amountValue, 0);
if (expenses === null) {
  expenses = {
    categoryValue: 0,
    amountValue: 0,
    dateValue: 0,
  };
}
function addExpense() {
  btnAdd.addEventListener('click', () => {
    let categoryValue = category.value;
    const amountValue = Number(amountInput.value);
    let dateValue = date.value;
    if (dateValue === '' || amountValue === '') {
      alert('Please fill the requirement sections!');
      return;
    }
    expenses.push({ categoryValue, amountValue, dateValue });
    totalAmount += amountValue;

    localStorage.setItem('expenses', JSON.stringify(expenses));

    const html = `  <tr>
    <th class="table-info">${categoryValue}</th>
    <th class="table-info">${amountValue}</th>
    <th class="table-info">${dateValue}</th>
    <td id="td-delete"><button class="delete-btn">Delete</button></td>
    </tr>`;
    total.textContent = `Total : ${totalAmount} $`;
    table.innerHTML += html;
    sumExpenses();
  });
}
function displayExpenses() {
  expenses.forEach((expense, index) => {
    const { categoryValue, amountValue, dateValue } = expense;
    const html = `
    
      <tr>
        <td>${categoryValue}</td>
        <td>${amountValue}</td>
        <td>${dateValue}</td>
        <td><button onclick="deleteExpense(${index});  location.reload();" class="delete-btn">Delete</button></td>
      </tr>`;
    table.querySelector('tbody').innerHTML += html;
    total.textContent = `Total : ${totalAmount} $`;
  });
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  displayExpenses();
}
function sumExpenses() {
  let totalSum = 0;
  for (let i = 0; i < expenses.length; i++) {
    totalSum += expenses[i].amountValue;
  }

  total.textContent = `Total : ${totalSum} $`;
}

addExpense();
