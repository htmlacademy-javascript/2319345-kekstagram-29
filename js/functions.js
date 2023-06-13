const isMaxLength = (string, maxlength) => string.length <= maxlength;

isMaxLength('hello JS', 5);

const isPalindrome = (string) => {
	const newString = string.replaceAll(' ', '').toLowerCase();
	let reverseString = '';
	for (let i = newString.length - 1; i >= 0; i--) {
		reverseString += newString[i];
	}
	return newString === reverseString;
};

isPalindrome('А роза упала на лапу Азора');

const getNumber = (string) => {
	if (typeof string === 'number') {
		string = string.toString();
	}
	let newString = '';
	for (let i = 0; i <= string.length - 1; i++) {
		if (!Number.isNaN(parseInt(string[i], 10))) {
			newString += string[i];
		}
	}
	return +newString || NaN;
};

getNumber('skndslf');
