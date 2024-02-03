const { stringify } = require('json5');

class HashMap {
  constructor() {
    this.bucketSize = 16;
    this.buckets = new Array(this.bucketSize).fill(null).map(() => []);
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
    return hashCode % this.bucketSize;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (const pair of bucket) {
      if (pair.key === key) {
        pair.value = value;
        return;
      }
    }
    bucket.push({ key, value });
  }

  get(key) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      return null;
    }

    const bucket = this.buckets[index];
    for (const pair of bucket) {
      console.log(pair.value);
    }
  }
}
