encDecHelper = function (string, encodeDecodeSwitcher) {
    let encodedArray = [];
    let charStringIndex = -1;

    validateKey(this.key, stringToEncode);

    stringToEncode.split('').forEach((char) => {
        charStringIndex += 1;
        // get the alphaIndex of the current character
        const charAlphaIndex = charToAlphaIndex(char, this.alphabet);
        // get the alphaIndex of the key character at the current character's position
        const keyCharAlphaIndex = charToAlphaIndex(this.key.toLowerCase().charAt(charStringIndex), this.alphabet);
        const encodedIndex = encodeDecodeSwitcher(charAlphaIndex, keyCharAlphaIndex);
        const encodedChar = indexToChar(encodedIndex, this.alphabet);

        return encodedArray.push(encodedChar);
    });
 
    return encodedArray.join('');
};


Cipher.prototype.encode = function(strToEncode) {
    return encDecHelper(
        strToEncode,
        (charAlphaIndex, keyCharAlphaIndex) => {
            return charAlphaIndex + keyCharAlphaIndex;
        }
    );
};

Cipher.prototype.decode = function(strToDecode) {
    return encDecHelper(
        strToDecode,
        (charAlphaIndex, keyCharAlphaIndex) => {
            return charAlphaIndex - keyCharAlphaIndex;
        }
    );
};