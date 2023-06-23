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

// Проверка, укладывается ли встреча в рабочий день - 1 вариант

const getDurationInMinutes = (string) => {
	const timeMassive = string.split(':');
	return Number(timeMassive[0]) * 60 + Number(timeMassive[1]);
};

const isMatched = (dayBegin, dayEnd, meetBegin, meetDuration) => {
	const meetEnd = getDurationInMinutes(meetBegin) + meetDuration;
	return ((getDurationInMinutes(dayBegin) <= getDurationInMinutes(meetBegin))) && (meetEnd <= getDurationInMinutes(dayEnd));
};

// 2 вариант

const getTimestamp = (time, currentDate) => {
	const timeMassive = time.split(':');
	const hours = timeMassive[0];
	const minutes = timeMassive[1];
	currentDate.setHours(hours);
	currentDate.setMinutes(minutes);
	return currentDate.getTime();
};

const isMatchedTime = (dayBegin, dayEnd, meetBegin, meetDuration) => {
	const currentDate = new Date();
	const meetBeginTimestamp = getTimestamp(meetBegin, currentDate);
	const meetEndTimestamp = meetBeginTimestamp + (meetDuration * 60000);
	const dayBeginTimestamp = getTimestamp(dayBegin, currentDate);
	const dayEndTimestamp = getTimestamp(dayEnd, currentDate);
	return (meetBeginTimestamp >= dayBeginTimestamp) && (meetEndTimestamp <= dayEndTimestamp);
};

export {isMaxLength, isPalindrome, getNumber, isMatched, isMatchedTime};
