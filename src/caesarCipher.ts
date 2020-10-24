//#region test
// rot13("SERR PBQR PNZC") should decode to FREE CODE CAMP
// rot13("SERR CVMMN!") should decode to FREE PIZZA!
// rot13("SERR YBIR?") should decode to FREE LOVE?
// rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.") should decode to THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
//#endregion

function rot13(input: string): string {
	input = input.toUpperCase();
	const cipher = 13;
	const abecedario = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
	return input
		.split(' ')
		.map(word =>
			word.split('').reduce((a, c) => {
				let newChar =
					abecedario.indexOf(c) - cipher < 0
						? abecedario.length + (abecedario.indexOf(c) - cipher)
						: abecedario.indexOf(c) - cipher;

				return a + (c.search(/\w/i) ? c : abecedario.charAt(newChar));
			}, ''),
		)
		.join(' ');
}
