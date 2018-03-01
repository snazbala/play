/**
 * @param  {str} alphabet   alphabet string
 * @return {obj}            an alphabet to index mapping
 */
const alphabetToIndexMapping = (alphabet) => {
    const alphabetMapping = {};
    let index = 0;

    alphabet.split('').forEach((alphaChar) => {
        alphabetMapping[alphaChar] = index;
        index += 1;
    });
    return alphabetMapping;
};

this.ALPHABET_MAPPING = alphabetToIndexMapping('abcdefghijklmnopqrstuvwxyz');
this.ALPHABET_STRING = 'abcdefghijklmnopqrstuvwxyz';

/**
 * char = a returns 0
 * char = z returns 25
 * @param  {str} char     a single character to find the index of from this.ALPHABET
 * @return {int}          an integer representing the index of the character
 */
const charToAlphaIndex = char => (this.ALPHABET_MAPPING[char]);

/**
 * index = 0 returns 'a'
 * index = 25 returns 'z'
 * index = 26 returns 'a'
 * @param  {int} index    integer representing the index of the character
 * @param  {str} alphabet an alphabet string to match the index of the character against
 * @return {str}          a single character at that position in the alphabet
 */
const indexToChar = (index) => {
    // If we're given a negative index, convert it to its positive value
    if (index < 0) {
        index = index + this.ALPHABET_STRING.length;
    }
    const convertedIndex = index % this.ALPHABET_STRING.length;

    return this.ALPHABET_STRING.charAt(convertedIndex);
};

/**
 * Ensure that the key is long enough to be able to encode or decode the strToConvert.
 * For instance, given a key of 'ab' and a strToConvert of 'sahar', the key will
 * return as 'ababa'.
 * TODO: Add more validation for non-alpha keys
 * @param  {str} key            the key provided by the user
 * @param  {str} strToConvert the string we're taking action on to convert later
 * @return {str}                the validated key
 */
const validateKey = (key, strToConvert) => {
    if (key === '') {
        key = 'd';
    }
    if (key.length >= strToConvert.length) {
        return key;
    }

    const remainder = strToConvert.length % key.length;
    const repeatBy = Math.floor(strToConvert.length / key.length);

    if (remainder === 0) {
        return key.repeat(repeatBy);
    }

    const repeatedKey = key.repeat(repeatBy);
    const charsToAdd = key.substring(0, remainder);

    return `${repeatedKey + charsToAdd}`;
};

/**
 * Gets the message string and key from the form and returns an encoded string.
 * For instance, given a key of 'bbbb': string = 'abcd' returns 'bcde'.
 * @return {str}                encoded string
 */
const encode = function () {
    document.getElementById('encode').innerHTML = '';

    const strToEncode = document.getElementById('message').value;
    let key = document.getElementById('key').value;
    let charStrIndex = 0;
    key = validateKey(key, strToEncode);

    const encodedArray = strToEncode.split('').map((char) => {
        if (char === ' ') {
            return ' ';
        }
        // get the alphaIndex of the current character
        const charAlphaIndex = charToAlphaIndex(char);
        // get the alphaIndex of the key character at the current character's position
        const keyCharAlphaIndex = charToAlphaIndex(key.toLowerCase().charAt(charStrIndex));

        const encodedIndex = charAlphaIndex + keyCharAlphaIndex;
        const encodedChar = indexToChar(encodedIndex);

        charStrIndex += 1;
        return encodedChar;
    });

    const encodedStr = encodedArray.join('');

    const textToAdd = document.createTextNode(encodedStr);
    const encodedTextArea = document.getElementById('encode');

    encodedTextArea.appendChild(textToAdd);
};

/**
 * Gets the encoded message string and key from the form and returns an decoded string.
 * For instance, the encoded = 'bcde' returns the decoded string, 'abcd'
 * @return {str}               decoded string
 */
const decode = function () {
    document.getElementById('decode').innerHTML = '';

    const encodedStr = document.getElementById('message').value;
    let key = document.getElementById('key').value;
    let charStrIndex = 0;
    key = validateKey(key, encodedStr);

    const decodedArray = encodedStr.split('').map((char) => {
        if (char === ' ') {
            return ' ';
        }
        // get the alphaIndex of the current character
        const charAlphaIndex = charToAlphaIndex(char);
        // get the alphaIndex of the key character at the current character's position
        const keyCharAlphaIndex = charToAlphaIndex(key.toLowerCase().charAt(charStrIndex));

        const decodedIndex = charAlphaIndex - keyCharAlphaIndex;
        const decodedChar = indexToChar(decodedIndex);

        charStrIndex += 1;
        return decodedChar;
    });

    const decodedStr = decodedArray.join('');

    const textToAdd = document.createTextNode(decodedStr);
    const decodedTextArea = document.getElementById('decode');

    decodedTextArea.appendChild(textToAdd);
};

/**
 * Resets all fields to empty.
 */
const reset = function () {
    document.getElementById('decode').innerHTML = '';
    document.getElementById('encode').innerHTML = '';
    document.getElementById('key').value = '';
    document.getElementById('message').value = '';
};

