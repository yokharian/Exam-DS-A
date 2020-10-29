//#region testCase
// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return an object.
// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
// checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
// checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
// checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
// checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
//#endregion testCase
console.clear();

const values = {
	'PENNY': 0.01,
	'NICKEL': 0.05,
	'DIME': 0.1,
	'QUARTER': 0.25,
	'ONE': 1,
	'FIVE': 5,
	'TEN': 10,
	'TWENTY': 20,
	'ONE HUNDRED': 100,
};

function checkCashRegister(price, cash, cid) {
	var _cid = cid.reduce((accum, [k, v]) => {
		accum[k] = v;
		return accum;
	}, {});

	const normalize = numero => Math.round(numero * 100) / 100;
	var changeLeft = cash - price;
	var output = { status: null, change: [] };

	// Transform CID array into drawer object
	var register = cid.reduce(
		function (acc, curr) {
			acc.total += curr[1];
			acc[curr[0]] = curr[1];
			return acc;
		},
		{ total: 0 },
	);

	// Handle exact change
	if (register.total === changeLeft) {
		output.status = 'CLOSED';
		output.change = cid;
		return output;
	}

	// Handle obvious insufficient funds
	if (register.total < changeLeft) {
		output.status = 'INSUFFICIENT_FUNDS';
		return output;
	}
	var changeDict = {};
	while (changeLeft >= 0.001) {
		let coinMatch = Object.entries(values)
			.reverse()
			.filter(coinType => coinType[1] <= changeLeft)
			//check availability
			.find(coinType => _cid[coinType[0]] != 0);
		if (coinMatch) {
			var foundName = coinMatch[0];
			var foundValue = coinMatch[1];
		} else {
			return { status: 'INSUFFICIENT_FUNDS', change: [] };
		}
		if (changeDict[foundName]) {
			changeDict[foundName] = normalize(
				changeDict[foundName] + foundValue,
			);
		} else {
			changeDict[foundName] = normalize(foundValue);
		}

		_cid[foundName] -= normalize(foundValue);
		changeLeft = normalize(changeLeft - foundValue);
	}

	output.status = 'OPEN';
	output.change = Object.entries(changeDict);
	return output;
}
