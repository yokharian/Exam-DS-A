"use strict";
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
function convertToRoman(num) {
    // 0 < num <= 3999
    const romanianNotation = new Map([
        [1, 'I'],
        [2, 'II'],
        [3, 'III'],
        [4, 'IV'],
        [5, 'V'],
        [6, 'VI'],
        [7, 'VII'],
        [8, 'VIII'],
        [9, 'IX'],
        [10, 'X'],
        [50, 'L'],
        [100, 'C'],
        [500, 'D'],
        [1000, 'M'],
    ]);
    const magnitudes = num
        .toString()
        .split('')
        .map(v => parseInt(v))
        .reduce((acc, value, index, arr) => acc.concat(value * 10 ** (arr.length - index - 1)), [])
        .reverse();
    // sum operations
    var output = magnitudes
        .reduce(function (romaNumbers, magnitud) {
        let _accOutput = '';
        let _counter = 0;
        while (_counter < magnitud) {
            let found = [...romanianNotation.keys()].reverse().find(function (v) {
                return v <= magnitud - _counter;
            }) || 0;
            _counter += found;
            _accOutput += romanianNotation.get(found);
        }
        return romaNumbers.concat(_accOutput);
    }, [])
        .reverse()
        .join('');
    // minus operations
    return output;
}
// 666: DCLXVI
let output = convertToRoman(97);
console.log(output);
//# sourceMappingURL=romanian.js.map