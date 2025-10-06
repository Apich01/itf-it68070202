// === Simple Bank System ===

let accountBalance = 0;
let cashBalance = 0;
let step = 1; // ตัวนับลำดับเหตุการณ์
const logBox = document.getElementById("transaction-log");

// อ้างอิงปุ่มและช่องข้อมูล
const accountInput = document.getElementById("account-balance");
const cashInput = document.getElementById("cash-balance");
const btnProceed = document.getElementById("btn-proceed");
const btnChange = document.getElementById("btn-change-balance");
const operationType = document.getElementById("operation-type");
const operationAmount = document.getElementById("operation-amount");

// Converter
const inputBalance = document.getElementById("input-balance");
const outputBalance = document.getElementById("output-balance");
const inputCurrency = document.getElementById("input-currency");
const btnConvert = document.getElementById("btn-convert");

// === ฟังก์ชันเพิ่ม log ===
function addLog(text) {
    logBox.textContent = `${step++}, ${text}\n` + logBox.textContent;
    logBox.scrollTop = 0;
}

// === อัปเดตปุ่ม Change เมื่อมีการกรอกข้อมูล ===
accountInput.addEventListener("input", enableChangeButton);
cashInput.addEventListener("input", enableChangeButton);

function enableChangeButton() {
    btnChange.disabled = false;
}

// === เมื่อกดปุ่ม Change ===
btnChange.addEventListener("click", function () {
    const newAccount = parseFloat(accountInput.value);
    const newCash = parseFloat(cashInput.value);

    if (isNaN(newAccount) || newAccount < 0 || isNaN(newCash) || newCash < 0) {
        alert("Please enter valid positive numbers!");
        return;
    }

    accountBalance = newAccount;
    cashBalance = newCash;
    addLog(`Current account balance: ${accountBalance}, Current cash balance: ${cashBalance}`);
    btnChange.disabled = true; // ปิดปุ่มหลังจากเปลี่ยนแล้ว
});

// === ดำเนินการ Withdraw / Deposit ===
btnProceed.addEventListener("click", function () {
    const type = operationType.value;
    const amount = parseFloat(operationAmount.value);

    if (type === "Withdraw") {
        if (accountBalance >= amount) {
            accountBalance -= amount;
            cashBalance += amount;
            addLog(`Current account balance: ${accountBalance}, Current cash balance: ${cashBalance}`);
        } else {
            addLog("Couldn't deposit entered balance. (Insufficient cash balance)");
        }
    } else if (type === "Deposit") {
        if (cashBalance >= amount) {
            cashBalance -= amount;
            accountBalance += amount;
            addLog(`Current account balance: ${accountBalance}, Current cash balance: ${cashBalance}`);
        } else {
            addLog("Couldn't deposit entered balance. (Insufficient cash balance)");
        }
    }

    updateBalances();
});


function updateBalances() {
    accountInput.value = accountBalance;
    cashInput.value = cashBalance;
}

updateBalances();
