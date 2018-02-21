let Year = function (input) {
	this.year = input;
};

Year.prototype.isLeap = function () {
	const isDivisibleBy = (numerator, divider) => {
		const isDivisibleByHelper = (divider) => ( numerator % divider === 0 );

		return !divider ? isDivisibleByHelper : isDivisibleByHelper(divider);
	};

	const isYearDivisibleBy = isDivisibleBy(this.year);

	return isYearDivisibleBy(4) && (!isYearDivisibleBy(100) || isYearDivisibleBy(400));

};

module.exports = Year;