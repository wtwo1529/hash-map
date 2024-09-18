import LinkedList from "./LinkedList.js";
import Node from "./Node.js";

export default class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.arr = new Array(16);
    this.keyCount = 0;
  }
  rehash() {
    this.capacity = this.capacity * 2;
    let tmp = new Array(this.capacity);
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i]) {
        let currNode = this.arr[i].headNode;
        while (currNode) {
          let hash = this.hash(currNode.key);

          if (tmp[hash]) {
            tmp[hash].append(currNode.key, currNode.val);
          } else {
            tmp[hash] = new LinkedList(new Node(currNode.key, currNode.val));
          }
          currNode = currNode.next;
        }
      }
    }
    this.arr = tmp;
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }

    return hashCode;
  }

  set(key, val) {
    if (this.keyCount >= this.loadFactor * this.capacity) {
      this.rehash();
    }
    let hash = this.hash(key);
    console.log(`key: ${key} hash: ${hash} `);
    if (this.arr[hash]) {
      this.arr[hash].append(key, val);
    } else {
      this.arr[hash] = new LinkedList(new Node(key, val));
    }
    this.keyCount++;
  }
  get(key) {
    let hash = this.hash(key);
    if (this.arr[hash]) return this.arr[hash];
    return null;
  }
  has(key) {
    let hash = this.hash(key);
    if (this.arr[hash]) {
      return this.arr[hash].contains(key);
    }
    return false;
  }
  remove(key) {
    let hash = this.hash(key);
    if (this.arr[hash]) {
      if (this.arr[hash].contains(key)) {
        let currNode = this.arr[hash].headNode;
        let prevNode = null;

        while (currNode) {
          if (currNode.key == key) {
            if (prevNode) {
              prevNode.next = currNode.next;
            } else {
              this.arr[hash] = null;
            }
          }
          currNode = currNode.next;
        }
      }
    }
    return false;
  }
  length() {
    return this.keyCount;
  }
  clear() {
    this.capacity = 16;
    this.loadFactor = 0.8;
    this.arr = new Array(16);
  }
  keys() {
    let tmp = [];
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i]) {
        let currNode = this.arr[i].headNode;
        while (currNode) {
          tmp.push(currNode.key);
          currNode = currNode.next;
        }
      }
    }
    return tmp;
  }
  values() {
    let tmp = [];
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i]) {
        let currNode = this.arr[i].headNode;
        while (currNode) {
          tmp.push(currNode.val);
          currNode = currNode.next;
        }
      }
    }
    return tmp;
  }
  entries() {
    let entries = [];
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i]) {
        let currNode = this.arr[i].headNode;
        while (currNode) {
          let pair = [currNode.key, currNode.val];
          currNode = currNode.next;
          entries.push(pair);
        }
      }
    }
    return entries;
  }
}
