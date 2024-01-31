const { stringify } = require('json5');

class hashMap {
  constructor() {
    this.bucketSize = 16;
  }

  hash(key) {
    if (typeof key !== 'string') {
      throw new Error('Strings only');
    }
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }
}
