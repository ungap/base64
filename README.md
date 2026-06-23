# @ungap/base64

A polyfill for [Uint8Array.fromBase64](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/fromBase64) and [Uint8Array.prototype.toBase64](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/toBase64).

In modern browsers and Node.js >= 25, this module is a no-op. Otherwise, it patches both the constructor and the prototype once.

This implementation relies on [atob](https://developer.mozilla.org/en-US/docs/Web/API/Window/atob) and [btoa](https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa). On Node.js < 16, polyfill those globals before importing this module.

```js
import 'https://esm.run/@ungap/base64';

const asBase64 = new TextEncoder().encode('hello base64!').toBase64();
// aGVsbG8gYmFzZTY0IQ==

const fromBase64 = new TextDecoder().decode(Uint8Array.fromBase64(asBase64));
// 'hello base64!'
```

### API

  * `Uint8Array.prototype.toBase64(options)` — fully supports the optional [options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/toBase64#parameters)
  * `Uint8Array.fromBase64(string, options)` — supports only `alphabet` and `lastChunkHandling: 'loose'`; throws if `lastChunkHandling` is provided with any other value ([options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/fromBase64#options))
