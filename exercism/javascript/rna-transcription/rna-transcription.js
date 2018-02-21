const DnaTranscriber = function () {};

DnaTranscriber.prototype.toRna = function (input) {
	let string = '';
	let inputArray = input.trim().split('');

	const dnaToRna = {
		'G': 'C',
		'C': 'G',
		'T': 'A',
		'A': 'U'
	};

// Next: create a solution using .map

	inputArray.forEach((element) => {
		// This is ugly. Need a better way to validate the input.
		if (element == 'G' || element == 'C' || element == 'T' || element == 'A') {
			Object.keys(dnaToRna).forEach((key) => { 
			    if (element === key) {
			    	string+=dnaToRna[key];
			    }
			});
		} else {
			throw new Error('Invalid input');
		}
 	});
	return string;
};

module.exports = DnaTranscriber;

/////// First solution (simple)
// DnaTranscriber.prototype.toRna1 = function (input) {
// 	string = '';
// 	inputArray = input.trim().split('');
// 	inputArray.forEach((element) => {
// 		if (element === 'G') {
// 			string+='C';
// 		} else if (element === 'C') {
// 			string+='G';
// 		} else if (element === 'T') {
// 			string+='A';
// 		} else if (element === 'A') {
// 			string+='U';
// 		} else {
//     		throw new Error('Invalid input');
// 		}
// 	});
// 	return string;
// };