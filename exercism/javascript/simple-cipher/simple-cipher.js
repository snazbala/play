const Cipher = function (key) {
    this.key = key;
};

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const alphabetToIndexMapping = () => {
    const alphabetMapping = {};
    let index = 0;

    ALPHABET.split('').forEach((alphaChar) => {
        alphabetMapping[alphaChar] = index;
        index += 1;
    });
    return alphabetMapping;
};

/**
 * Returns the alphaIndex of the character as defined by the alphabetMapping.
 * For instance, for the regular alphabet:
 * char = a returns 0
 * char = z returns 25
 * @param  {str} char     a single character to find the index of
 * @param  {str} alphabetMapping an alphabet object to match the character against to find the index
 * @return {int}          an integer representing the index of the character
 */
const charToAlphaIndex = (char, alphabetMapping) => alphabetMapping[char];

/**
 * Takes in a character index and an alphabet string. Returns the character at
 * the given index using the alphabet string. For instance, for the regular alphabet:
 * index = 0 returns 'a'
 * index = 25 returns 'z'
 * index = 26 returns 'a'
 * We use % to convert the index to its corresponding index when wrapped around the alphabet.
 * For instance, an index of 40 % 26 = 14, so we use the new index of 14 to find the correct
 * character.
 * @param  {int} index    integer representing the index of the character
 * @param  {str} alphabet an alphabet string to match the index of the character against
 * @return {str}          a single character at that position in the alphabet
 */
const indexToChar = (index) => {
    // If we're given a negative index, convert it to its positive value
    if (index < 0) {
        index = index + ALPHABET.length;
    }
    const convertedIndex = index % ALPHABET.length;

    return ALPHABET.charAt(convertedIndex);
};

/**
 * Validates a given key to ensure that the key is long enough to be able to
 * properly encode or decode the strToConvert. If the key is not long enough,
 * this method will repeat the key characters until the key becomes long enough.
 * For instance, given a key of 'ab' and a strToConvert of 'sahar', the key will
 * return as 'ababa'.
 * TODO: Add more validation for non-alpha keys
 * @param  {str} key            the key provided by the user
 * @param  {str} strToConvert the string we're taking action on to convert later
 * @return {str}                the validated key
 */
const validateKey = (key, strToConvert) => {
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
 * Takes in a string and returns an encoded string. Uses the provided key
 * to encode each individual character according to the matching key character
 * (by index). For instance, given a key of 'bbbb': string = 'abcd' returns 'bcde'
 * @param  {str} strToEncode user inputted string to encode
 * @return {str}                encoded string
 */
Cipher.prototype.encode = function (strToEncode) {
    let charStrIndex = 0;
    const key = validateKey(this.key, strToEncode);
    const alphabetMapping = alphabetToIndexMapping();

    const encodedArray = strToEncode.split('').map((char) => {
        // get the alphaIndex of the current character
        const charAlphaIndex = charToAlphaIndex(char, alphabetMapping);
        // get the alphaIndex of the key character at the current character's position
        const keyCharAlphaIndex = charToAlphaIndex(key.toLowerCase().charAt(charStrIndex), alphabetMapping);

        const encodedIndex = charAlphaIndex + keyCharAlphaIndex;
        const encodedChar = indexToChar(encodedIndex);

        charStrIndex += 1;
        return encodedChar;
    });

    return encodedArray.join('');
};

/**
 * Takes in an encoded string and returns a decoded string. Uses the provided key
 *to decode each individual character according to the matching key character
 *(by index). For instance, given a key of 'bbbb:
 *encoded = 'bcde' returns the decoded string, 'abcd'
 * @param  {str} encodedStr user inputted encoded string to decode
 * @return {str}               decoded string
 */
Cipher.prototype.decode = function (encodedStr) {
    let charStrIndex = 0;
    const key = validateKey(this.key, encodedStr);
    const alphabetMapping = alphabetToIndexMapping();

    const decodedArray = encodedStr.split('').map((char) => {
        // get the alphaIndex of the current character
        const charAlphaIndex = charToAlphaIndex(char, alphabetMapping);
        // get the alphaIndex of the key character at the current character's position
        const keyCharAlphaIndex = charToAlphaIndex(key.toLowerCase().charAt(charStrIndex), alphabetMapping);

        const decodedIndex = charAlphaIndex - keyCharAlphaIndex;
        const decodedChar = indexToChar(decodedIndex);

        charStrIndex += 1;
        return decodedChar;
    });

    return decodedArray.join('');
};

module.exports = Cipher;
