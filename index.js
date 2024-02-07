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

  has(key) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      return false;
    }
    const bucket = this.buckets[index];
    for (const pair of bucket) {
      if (pair.key === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      return false;
    }
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      const pair = bucket[i];
      if (pair.key === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  length() {
    let keys = 0;
    for (let i = 0; i < this.buckets.length; i += 1) {
      const bucket = this.buckets[i];
      for (const pair of bucket) {
        if (pair.key) {
          keys += 1;
        }
      }
    }
    return keys;
  }

  clear() {
    this.buckets.splice(0, this.buckets.length);
  }

  keys() {
    const keys = [];
    for (let i = 0; i < this.buckets.length; i += 1) {
      const bucket = this.buckets[i];
      for (const pair of bucket) {
        if (pair.key) {
          keys.push(pair.key);
        }
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let i = 0; i < this.buckets.length; i += 1) {
      const bucket = this.buckets[i];
      for (const pair of bucket) {
        if (pair.value) {
          values.push(pair.value);
        }
      }
    }
    return values;
  }

  entries() {
    const keysValues = [];
    for (let i = 0; i < this.buckets.length; i += 1) {
      const bucket = this.buckets[i];
      for (const pair of bucket) {
        let tmp = [];
        tmp.push(pair.key);
        tmp.push(pair.value);
        keysValues.push(tmp);
      }
    }
    return keysValues;
  }
}
