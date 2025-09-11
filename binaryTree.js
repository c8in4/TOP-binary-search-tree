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
    return this.buildTreeUtil(uniqueArr, 0, uniqueArr.length - 1);
  }

  buildTreeUtil(arr, start, end) {
    if (start > end) return null;

    const mid = start + Math.floor((end - start) / 2);
    const newNode = new Node(arr[mid]);
    newNode.left = this.buildTreeUtil(arr, start, mid - 1);
    newNode.right = this.buildTreeUtil(arr, mid + 1, end);
    return newNode;
  }

  insert(value) {
    this.findNewNodesPosition(this.root, value);
  }

  findNewNodesPosition(currentNode, value) {
    if (currentNode === null) return new Node(value);

    if (value < currentNode.data) {
      currentNode.left = this.findNewNodesPosition(currentNode.left, value);
    } else if (value > currentNode.data) {
      currentNode.right = this.findNewNodesPosition(currentNode.right, value);
    }
    return currentNode;
  }

  deleteItem(value) {
    this.deleteItemUtil(this.root, value);
  }

  deleteItemUtil(currentNode, value) {
    if (currentNode === null) return null;

    // find node with value
    if (value < currentNode.data) {
      currentNode.left = this.deleteItemUtil(currentNode.left, value);
      return currentNode;
    } else if (value > currentNode.data) {
      currentNode.right = this.deleteItemUtil(currentNode.right, value);
      return currentNode;
    } else {
      // case: node has one or no child nodes
      if (!currentNode.left) return currentNode.right;
      if (!currentNode.right) return currentNode.left;

      // case: node has 2 child nodes
      let successorParent = currentNode;
      let successor = currentNode.right;
      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      currentNode.data = successor.data;

      if (successorParent.left === successor) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
    }

    return currentNode;
  }
}
