const addExpenseButton = document.getElementById("add-expense-button");

const descriptionInput = document.getElementById("description");
const valueInput = document.getElementById("value");
const selectInput = document.getElementById("type");

const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const totalBudget = document.getElementById("total-budget");

function formatMoney(value) {
  return Math.abs(Number(value)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}

function calculateIncome() {
  let sum = 0;
  for (let item of incomeList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    console.log(parseFloat(valueString));
    sum += parseFloat(valueString);
  }
  totalIncome.innerHTML = formatMoney(sum);
}

let sum = 0;
  if (incomeList.children.length === 0) {
    totalIncome.innerHTML = formatMoney(0);
  } else {
    for (let item of incomeList.children) {
      const valueString = item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");
      sum += parseFloat(valueString);
    }
    totalIncome.innerHTML = formatMoney(sum);
  }
calculateIncome();

/**
 * Task 1: Calculate total expense
 */

function calculateExpense() {
  let sum = 0;
  for (let item of expenseList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    console.log(parseFloat(valueString));
    sum += parseFloat(valueString);
  }
  totalExpense.innerHTML = formatMoney(sum);
}
calculateExpense();

/**
 * Task 2: Calculate the budget
 */

function calculateBudget() {
    //let Income , Expense, Budget;
    let Income = parseFloat(totalIncome.innerHTML.replace(/,/g, "")) || 0;
    let Expense = parseFloat(totalExpense.innerHTML.replace(/,/g, "")) || 0;
    let Budget = Income - Expense;
     if (Income === 0 && Expense > 0) {
     Budget = 0;}

    totalBudget.innerHTML = formatMoney(Budget);
}
calculateBudget();

/**
 * Task 3: Delete Entry
 */


document.body.addEventListener("click", function(event) {
  if (event.target.matches("#income-list .text-blue-500, #expense-list .text-red-500")) {
    deleteEntry.call(event.target);
  }
});

function deleteEntry() {
  const listItem = this.closest("li");
  const list = listItem.parentElement;
  const valueString = listItem.querySelector(".text-blue-600, .text-red-600").innerHTML.replace(/,/g, "");
  const value = parseFloat(valueString);


  list.removeChild(listItem);

  
  if (list.id === "income-list") {
    calculateIncome();
  } else if (list.id === "expense-list") {
    calculateExpense();
  }

  // Recalculate the budget after deleting an item
  calculateBudget();
  
}
const existingDeleteButtons = document.querySelectorAll("#income-list .text-red-500, #expense-list .text-red-500");
existingDeleteButtons.forEach(button => {
  button.addEventListener("click", deleteEntry);
});

function addEntry() {
  const type = selectInput.value;
  const description = descriptionInput.value;
  const value = valueInput.value;

  // data validation
  const errors = [];
  if (description.length === 0) {
    errors.push("Please enter the description");
  }
  if (value.length === 0) {
    errors.push("Please enter the value");
  }
  if (errors.length > 0) {
    alert(errors);
    return;
  }

  // insert entry
  const list = type === "income" ? incomeList : expenseList;
  const sign = type === "income" ? "+" : "-";
  const colorClass = type === "income" ? "text-green-600" : "text-red-600";

  const newEntryHtml = `
    <li class="py-2.5">
      <div class="group flex justify-between gap-2 text-sm">
        <span>${description}</span>
        <div>
          <span class="${colorClass}">${sign}${formatMoney(value)}</span>
          <span
            class="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
          >
            Delete
          </span>
        </div>
      </div>
    </li>
    `;

  // Approach 1:
  list.innerHTML += newEntryHtml;

  // update total income value
  calculateIncome();
  calculateExpense();
  calculateBudget();
}

addExpenseButton.addEventListener("click", addEntry);
