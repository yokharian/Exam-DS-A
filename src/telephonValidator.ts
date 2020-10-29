function telephoneCheck(str) {
	return (
		str.match(/^(1 ?)?(\d{3}|\({1}\d{3}\){1})[ \-]?\d{3}[ \-]?\d{4}$/) !=
		null
	);
}

telephoneCheck('555-555-5555');
