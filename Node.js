export default class Node {
  constructor(key, val, next = null) {
    this.key = key;
    this.val = val;
    this.next = next;
  }
}
