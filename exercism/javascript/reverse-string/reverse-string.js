let reverseString = (string) => (string.trim().split('').reverse().join(''));

module.exports = reverseString;

let reverseStringWithRecursion = (string) => {
	if (string === '') {
		return '';
	} else {
		return reverseStringWithRecursion(string.substr(1)) + string.charAt(0);
	}
};