class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const sortedArr = arr.sort((a, b) => a - b);
    const uniqueArr = [...new Set(sortedArr)];
    return this._buildTreeUtil(uniqueArr, 0, uniqueArr.length - 1);
  }

  _buildTreeUtil(arr, start, end) {
    if (start > end) return null;

    const mid = start + Math.floor((end - start) / 2);
    const root = new Node(arr[mid]);
    root.left = this._buildTreeUtil(arr, start, mid - 1);
    root.right = this._buildTreeUtil(arr, mid + 1, end);
    return root;
  }

  insert(value) {
    this._insertUtil(this.root, value);
  }

  _insertUtil(root, value) {
    if (root === null) return new Node(value);
    if (value <= root.data) {
      root.left = this._insertUtil(root.left, value);
    } else if (value > root.data) {
      root.right = this._insertUtil(root.right, value);
    }
    return root;
  }

  deleteItem(value) {}
}
