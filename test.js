import assert from 'node:assert/strict';

const encoder = new TextEncoder();
const { fromBase64, prototype: { toBase64 } } = Uint8Array;

const text = 'Hello, world!';
const uint8Array = encoder.encode(text);
const base64 = uint8Array.toBase64();

delete Uint8Array.fromBase64;
delete Uint8Array.prototype.toBase64;

await import('./index.js');

assert.notEqual(fromBase64, Uint8Array.fromBase64, 'fromBase64 is not polyfilled');
assert.notEqual(toBase64, Uint8Array.prototype.toBase64, 'toBase64 is not polyfilled');

assert.equal(encoder.encode(text).toBase64(), base64, 'toBase64 not working');
assert.equal(
  Uint8Array.fromBase64(base64).toString(),
  uint8Array.toString(),
  'fromBase64 not working',
);

const binary = new Uint8Array([0xfb, 0xff, 0xfe, 0xfd]);
const padded = binary.toBase64();
const unpadded = binary.toBase64({ omitPadding: true });

assert.ok(padded.endsWith('='), 'default encoding keeps padding');
assert.ok(!unpadded.endsWith('='), 'omitPadding removes padding');
assert.equal(
  Uint8Array.fromBase64(unpadded).toString(),
  binary.toString(),
  'fromBase64 decodes unpadded input',
);

const standard = binary.toBase64({ alphabet: 'base64' });
const urlSafe = binary.toBase64({ alphabet: 'base64url' });

assert.match(standard, /[+/]/, 'standard alphabet uses + and /');
assert.doesNotMatch(urlSafe, /[+/]/, 'base64url alphabet avoids + and /');
assert.equal(
  Uint8Array.fromBase64(urlSafe, { alphabet: 'base64url' }).toString(),
  binary.toString(),
  'fromBase64 decodes base64url',
);

assert.throws(
  () => Uint8Array.fromBase64('QQ==', { lastChunkHandling: 'strict' }),
  { message: 'lastChunkHandling not supported' },
  'fromBase64 rejects unsupported lastChunkHandling',
);

const large = new Uint8Array(2500);
for (let i = 0; i < large.length; i++) large[i] = i & 0xff;

const largeBase64 = large.toBase64();
assert.equal(
  Uint8Array.fromBase64(largeBase64).toString(),
  large.toString(),
  'toBase64 handles inputs longer than 2000 bytes',
);

console.log('OK');
