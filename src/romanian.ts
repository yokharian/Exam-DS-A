//#region testCase
// convertToRoman(2) should return "II"
// convertToRoman(3) should return "III"
// convertToRoman(4) should return "IV"
// convertToRoman(5) should return "V"
// convertToRoman(9) should return "IX"
// convertToRoman(12) should return "XII"
// convertToRoman(16) should return "XVI"
// convertToRoman(29) should return "XXIX"
// convertToRoman(44) should return "XLIV"
// convertToRoman(45) should return "XLV"
// convertToRoman(68) should return "LXVIII"
// convertToRoman(83) should return "LXXXIII"
// convertToRoman(97) should return "XCVII"
// convertToRoman(99) should return "XCIX"
// convertToRoman(400) should return "CD"
// convertToRoman(500) should return "D"
// convertToRoman(501) should return "DI"
// convertToRoman(649) should return "DCXLIX"
// convertToRoman(798) should return "DCCXCVIII"
// convertToRoman(891) should return "DCCCXCI"
// convertToRoman(1000) should return "M"
// convertToRoman(1004) should return "MIV"
// convertToRoman(1006) should return "MVI"
// convertToRoman(1023) should return "MXXIII"
// convertToRoman(2014) should return "MMXIV"
// convertToRoman(3999) should return "MMMCMXCIX"
// convertToRoman(666) should return "DCLXVI"
//#endregion
console.clear();

function convertToRoman(num: number): string {
	// 0 < num <= 9999
	//convert input
	const magnitudes: number[] = num
		.toString()
		.split('')
		.map(v => parseInt(v))
		.reduce(
			(acc: number[], value, index, arr) =>
				acc.concat(value * 10 ** (arr.length - index - 1)),
			[],
		)
		.reverse();

	const romanianNotation = new Map([
		[1, 'I'],
		[5, 'V'],
		[10, 'X'],
		[50, 'L'],
		[100, 'C'],
		[500, 'D'],
		[1000, 'M'],
	]);

	const romanianNotationFlipped = new Map([
		['I', 1],
		['V', 5],
		['X', 10],
		['L', 50],
		['C', 100],
		['D', 500],
		['M', 1000],
	]);

	const miniumDif = (suma = true, magnitud: number, _counter = 0) => {
		let archivo = [...romanianNotation.entries()].filter(v =>
			suma ? v[0] <= magnitud : v[0] >= magnitud,
		);
		return (
			archivo
				.map(function (actual) {
					let key = actual[1];
					let dif = Math.abs(actual[0] - magnitud + _counter);
					return [key, dif];
				})
				.sort((a: any[], b: any[]) => {
					return a[1] - b[1];
				})
				.shift() ?? [1000, 'M']
		);
	};

	const getZeros = num => Math.pow(10, Math.trunc(Math.log10(num)));

	const isRestable = (difWithMinus, difWithPlus) => {
		let difWithMinusZeros = difWithMinus[1] / getZeros(difWithMinus[1]);
		return difWithMinusZeros !== 2 && difWithMinus[1] < difWithPlus[1];
	};

	return magnitudes
		.reduce(function (output: string[], magnitud: number) {
			var _counter = 0;
			var _accOutput = '';

			while (_counter != magnitud) {
				let difWithMinus = miniumDif(false, magnitud, _counter);
				let difWithPlus = miniumDif(true, magnitud, _counter);

				if (isRestable(difWithMinus, difWithPlus)) {
					_accOutput +=
						romanianNotation.get(difWithMinus[1]) + difWithMinus[0];

					_counter += magnitud;
				} else {
					_accOutput += difWithPlus[0];
					_counter += romanianNotationFlipped.get(difWithPlus[0]);
				}
			}
			return output.concat(_accOutput);
		}, [])
		.reverse()
		.join('');
}

console.log(convertToRoman(4));
