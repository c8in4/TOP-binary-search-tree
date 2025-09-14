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
    return buildTreeRec(uniqueArr, 0, uniqueArr.length - 1);

    function buildTreeRec(arr, start, end) {
      if (start > end) return null;

      const mid = start + Math.floor((end - start) / 2);
      const newNode = new Node(arr[mid]);
      newNode.left = buildTreeRec(arr, start, mid - 1);
      newNode.right = buildTreeRec(arr, mid + 1, end);
      return newNode;
    }
  }

  insert(value) {
    insertRec(this.root, value);

    function insertRec(currentNode, value) {
      if (currentNode === null) return new Node(value);

      if (value < currentNode.data) {
        currentNode.left = insertRec(currentNode.left, value);
      } else if (value > currentNode.data) {
        currentNode.right = insertRec(currentNode.right, value);
      }
      return currentNode;
    }
  }

  deleteItem(value) {
    let previousNode = null;
    let currentNode = this.root;

    // find value or null
    while (currentNode !== null && currentNode.data !== value) {
      previousNode = currentNode;
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    // value does not exist in BST
    if (currentNode === null) {
      return console.log("value is not in BST");
    }
    // check if value has max 1 child
    if (currentNode.left === null || currentNode.right === null) {
      let newcurrentNode =
        currentNode.left === null ? currentNode.right : currentNode.left;

      if (previousNode === null) {
        this.root = newcurrentNode;
      }
      if (currentNode === previousNode.left) {
        previousNode.left = newcurrentNode;
      } else {
        previousNode.right = newcurrentNode;
      }
    } else {
      // case two child nodes
      let prev = currentNode;
      let curr = currentNode.right;

      while (curr.left) {
        prev = curr;
        curr = curr.left;
      }

      currentNode.data = curr.data;

      if (curr == prev.left) {
        prev.left = curr.right;
      } else {
        prev.right = curr.right;
      }
    }
  }

  find(value) {
    let currentNode = this.root;
    // iterate tree until value or null is found
    while (currentNode !== null && currentNode.data !== value) {
      if (value < currentNode.data) currentNode = currentNode.left;
      else if (value > currentNode.data) currentNode = currentNode.right;
    }

    if (currentNode === null) return;
    return currentNode;
  }

  levelOrderForEach(callback) {
    try {
      if (!callback) throw new Error("callback required");

      const queue = [this.root];

      while (queue.length > 0) {
        let currentNode = queue[0];
        callback(currentNode);
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
        queue.shift();
      }
    } catch (error) {
      console.error(error);
    }
  }

  levelOrderRecursive(callback) {
    try {
      if (!callback) throw new Error("callback required");

      levelOrderRec([this.root]);
    } catch (error) {
      console.error(error);
    }

    function levelOrderRec(list) {
      if (list.length < 1) return;

      const children = [];

      list.forEach((item) => {
        callback(item);
        if (item.left) children.push(item.left);
        if (item.right) children.push(item.right);
      });
      levelOrderRec(children);
    }
  }

  inOrderForEach(callback) {
    try {
      if (!callback) throw new Error("callback required");
      inOrderRecursion(this.root);
    } catch (error) {
      console.error(error);
    }

    function inOrderRecursion(node) {
      if (node === null) return;

      inOrderRecursion(node.left);
      callback(node);
      inOrderRecursion(node.right);
    }
  }

  preOrderForEach(callback) {
    try {
      if (!callback) throw new Error("callback required");
      preOrderRecursion(this.root);
    } catch (error) {
      console.error(error);
    }

    function preOrderRecursion(node) {
      if (node === null) return;

      callback(node);
      preOrderRecursion(node.left);
      preOrderRecursion(node.right);
    }
  }

  postOrderForEach(callback) {
    try {
      if (!callback) throw new Error("callback required");
      postOrderRecursion(this.root);
    } catch (error) {
      console.error(error);
    }

    function postOrderRecursion(node) {
      if (node === null) return;

      postOrderRecursion(node.left);
      postOrderRecursion(node.right);
      callback(node);
    }
  }

  height(value) {
    if (!this.find(value)) return null;

    return heightRec(this.find(value));

    function heightRec(node) {
      if (!node) return -1;

      const leftHeight = heightRec(node.left);
      const rightHeight = heightRec(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  depth(value) {
    if (!this.find(value)) return null;

    return depthRec(this.root);

    function depthRec(node) {
      if (!node) return -1;

      let depth = -1;

      if (
        node.data == value ||
        (depth = depthRec(node.left)) >= 0 ||
        (depth = depthRec(node.right)) >= 0
      ) {
        return depth + 1;
      }

      return depth;
    }
  }

  isBalanced() {
    return isBalancedRec(this.root) > 0;

    function isBalancedRec(node) {
      if (!node) return 0;

      let leftHeight = isBalancedRec(node.left);
      let rightHeight = isBalancedRec(node.right);

      if (
        leftHeight === -1 ||
        rightHeight === -1 ||
        Math.abs(leftHeight - rightHeight) > 1
      ) {
        return -1;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  rebalance() {
    const data = [];
    this.inOrderForEach((node) => data.push(node.data));
    this.root = this.buildTree(data);
  }
}
