document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmount = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total");

  let expense = JSON.parse(localStorage.getItem("expenses")) || [];

  let totalAmount = calculateTotal();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //Every input from form will be into the string format
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());

    //Valid name and input
    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name, //Same Key-value simple write name
        amount: amount,
      };

      expense.push(newExpense);
      saveExpensesToLocal();
      renderExpense();
      updateTotal();

      //Clear the input
      expenseNameInput.value = "";
      expenseAmount.value = "";
    }
  });

  function calculateTotal() {
    return expense.reduce(
      //itemprice is a object itself
      (initalAmount, itemPrice) => initalAmount + itemPrice.amount,
      0
    );
  }

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expense));
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  function renderExpense() {
    expenseList.innerHTML = "";

    expense.forEach((expenses) => {
      const li = document.createElement("li");
      li.innerHTML = `
      ${expenses.name} - $${expenses.amount}
      <button data-id=${expenses.id}>Delete</button>`;

      expenseList.appendChild(li);
    });
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const deleteEleId = parseInt(e.target.getAttribute("data-id"));

      expense = expense.filter((exp) => exp.id !== deleteEleId);

      saveExpensesToLocal();
      renderExpense();
      updateTotal();
    }
  });
});
