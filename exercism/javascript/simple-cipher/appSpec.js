console.log('here1');
console.log('after');
// var Cipher = require('./test');
var Cipher = require('./simpleCipher');
console.log(Cipher);
console.log('after after');
// describe('Random key cipher', function () {
//   var cipher = new Cipher();

//   it('has a key made of letters', function () {
//     expect(cipher.key).toMatch(/^[a-z]+$/);
//   });

//   // Here we take advantage of the fact that plaintext of "aaa..."
//   // outputs the key. This is a critical problem with shift ciphers, some
//   // characters will always output the key verbatim.
//   it('can encode', function () {
//     expect(cipher.encode('aaaaaaaaaa')).toEqual(cipher.key.substr(0, 10));
//   });

//   it('can decode', function () {
//     expect(cipher.decode(cipher.key.substr(0, 10))).toEqual('aaaaaaaaaa');
//   });

//   it('is reversible', function () {
//     var plaintext = 'abcdefghij';
//     expect(cipher.decode(cipher.encode(plaintext))).toEqual(plaintext);
//   });
// });

// describe('Incorrect key cipher', function () {
//   xit('throws an error with an all caps key', function () {
//     expect( function () {
//       new Cipher('ABCDEF');
//     }).toThrow(new Error('Bad key'));
//   });

//   xit('throws an error with a numeric key', function () {
//     expect( function () {
//       new Cipher('12345');
//     }).toThrow(new Error('Bad key'));
//   });

//   xit('throws an error with an empty key', function () {
//     expect( function () {
//       new Cipher('');
//     }).toThrow(new Error('Bad key'));
//   });
// });

console.log('outside');
describe('Substitution cipher', function () {
  var key = 'abcdefghij';
  var cipher = new Cipher(key);
  console.log('running');
  it('keeps the submitted key', function () {
    expect(cipher.key).toEqual(key);
  });

  it('can encode', function () {
    expect(cipher.encode('aaaaaaaaaa')).toEqual('abcdefghij');
  });

  it('can decode', function () {
    expect(cipher.decode('abcdefghij')).toEqual('aaaaaaaaaa');
  });

  it('is reversible', function () {
    expect(cipher.decode(cipher.encode('abcdefghij'))).toEqual('abcdefghij');
  });

  it(': double shift encode', function () {
    expect(new Cipher('iamapandabear').encode('iamapandabear'))
      .toEqual('qayaeaagaciai');
  });

  it('can wrap on encode', function () {
    expect(cipher.encode('zzzzzzzzzz')).toEqual('zabcdefghi');
  });

  it('can wrap on decode', () => {
    expect(cipher.decode('zabcdefghi')).toEqual('zzzzzzzzzz');
  });

  it('can handle messages longer than the key', function () {
    expect(new Cipher('abc').encode('iamapandabear'))
      .toEqual('iboaqcnecbfcr');
  });
});