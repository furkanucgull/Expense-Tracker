const category = document.getElementById('categories');
const btnAdd = document.querySelector('.btn-add');
const date = document.querySelector('.date');
const amountInput = document.querySelector('.amount');
const total = document.getElementById('total');
const table = document.querySelector('.table-list tbody');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

displayExpenses();
sumExpenses();

function addExpense() {
  btnAdd.addEventListener('click', e => {
    e.preventDefault();

    let categoryValue = category.value;
    let amountValue = Number(amountInput.value);
    let dateValue = date.value;

    if (dateValue === '' || isNaN(amountValue) || amountValue <= 0) {
      alert('Please fill the required sections with valid values!');
      return;
    }

    expenses.push({ categoryValue, amountValue, dateValue });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    amountInput.value = '';

    const html = `
      <tr>
        <td>${categoryValue}</td>
        <td>${amountValue}</td>
        <td>${dateValue}</td>
        <td><button onclick="deleteExpense(${expenses.length - 1});" class="delete-btn">Delete</button></td>
      </tr>`;
    table.innerHTML += html;

    sumExpenses();
  });
}

function displayExpenses() {
  table.innerHTML = ` 
  <table class="table-list">
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td id="td-delete"></td>
          </tr>
        </table>`;
  expenses.forEach((expense, index) => {
    const { categoryValue, amountValue, dateValue } = expense;
    const html = `
      <tr>
        <td>${categoryValue}</td>
        <td>${amountValue}</td>
        <td>${dateValue}</td>
        <td><button onclick="deleteExpense(${index});" class="delete-btn">Delete</button></td>
      </tr>`;
    table.innerHTML += html;
  });
  sumExpenses();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  displayExpenses();
}

function sumExpenses() {
  let totalSum = 0;
  expenses.forEach(expense => {
    totalSum += expense.amountValue;
  });
  total.textContent = `Total : ${totalSum} $`;
}

addExpense();
