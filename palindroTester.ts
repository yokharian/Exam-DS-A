function palindrome(str: string): boolean {
	let finalStr = str.toLowerCase().replace(/[\W_]/g, '');
	let output = true;

	for (let i = 0; i < Math.trunc(finalStr.length / 2); i++) {
		let first = finalStr.charAt(i);
		let last = finalStr.charAt(finalStr.length - i - 1);
		if (!(first === last)) {
			output = false;
		}
	}
	return output;
}
