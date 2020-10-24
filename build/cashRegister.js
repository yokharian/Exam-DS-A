"use strict";
function checkCashRegister(price, cash, cid) {
    const moneyValue = new Map([
        [0.01, 'Penny'],
        [0.05, 'Nickel'],
        [0.1, 'Dime'],
        [0.25, 'Quarter'],
        [1, 'Dollar'],
        [5, 'Five Dollars'],
        [10, 'Ten Dollars'],
        [20, 'Twenty Dollars'],
        [100, 'One-hundred Dollars'],
    ]);
    var change;
    return change;
}
checkCashRegister(19.5, 20, [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100],
]);
//# sourceMappingURL=cashRegister.js.map