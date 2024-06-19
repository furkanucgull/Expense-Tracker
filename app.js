const category = document.getElementById('categories');
const btnAdd = document.querySelector('.btn-add');
const date = document.querySelector('.date');
const amount = document.querySelector('.amount');
const table = document.querySelector('.table-list');
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalAmount = 0;
displayExpenses();
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
    let amountValue = amount.value;
    let dateValue = date.value;
    if (dateValue === '' || amountValue === '') {
      alert('Please fill the requirement sections!');
      return;
    }
    expenses.push({ categoryValue, amountValue, dateValue });
    totalAmount += amountValue;
    localStorage.setItem('expenses', JSON.stringify(expenses));

    console.log(expenses[0]);
    const html = `  <tr>
            <th class="table-info">${categoryValue}</th>
            <th class="table-info">${amountValue}</th>
            <th class="table-info">${dateValue}</th>
            <td id="td-delete"><button class="delete-btn">Delete</button></td>
          </tr>`;
    table.innerHTML += html;
  });
}
function displayExpenses() {
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const html = `<td>${expense}</td>`;
  }
  expenses.forEach((expense, index) => {
    const html = `
      <tr>
        <td>${expense.categoryValue}</td>
        <td>${expense.amountValue}</td>
        <td>${expense.dateValue}</td>
        <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
      </tr>`;
    table.innerHTML += html;
  });
}
addExpense();
