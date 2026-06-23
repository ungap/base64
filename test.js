const encoder = new TextEncoder();
const decoder = new TextDecoder();

const { fromBase64, prototype: { toBase64 } } = Uint8Array;

const text = 'Hello, world!';
const uint8Array = encoder.encode(text);
const base64 = uint8Array.toBase64();

const decoded = Uint8Array.fromBase64(base64);

delete Uint8Array.fromBase64;
delete Uint8Array.prototype.toBase64;

import('./index.js').then(() => {
  console.assert(fromBase64 !== Uint8Array.fromBase64, 'fromBase64 is not polyfilled');
  console.assert(toBase64 !== Uint8Array.prototype.toBase64, 'toBase64 is not polyfilled');

  const base64_2 = encoder.encode(text).toBase64();
  console.assert(base64_2 === base64, 'toBase64 not working');
  const decoded_2 = Uint8Array.fromBase64(base64_2);
  console.assert(decoded_2.toString() === uint8Array.toString(), 'fromBase64 not working');

  console.log('OK');
});
