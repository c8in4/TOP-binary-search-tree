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
    // this.delIterative(this.root, value);
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

  deleteItemUtil(currentNode, value) {
    if (currentNode === null) return null;

    // find node with value
    if (value < currentNode.data) {
      currentNode.left = this.deleteItemUtil(currentNode.left, value);
    } else if (value > currentNode.data) {
      currentNode.right = this.deleteItemUtil(currentNode.right, value);
    } else if (value == currentNode.data) {
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

  find(value) {
    let currentNode = this.root;
    // iterate tree until value or null is found
    while (currentNode !== null && currentNode.data !== value) {
      if (value < currentNode.data) currentNode = currentNode.left;
      else if (value > currentNode.data) currentNode = currentNode.right;
    }

    if (currentNode === null) return;
    // console.log(`${value} does not exist in BST`);

    // console.log(`found node with value of ${value}:`, currentNode);
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

      recurse([this.root]);
    } catch (error) {
      console.error(error);
    }

    function recurse(list) {
      if (list.length < 1) return;

      const children = [];

      list.forEach((item) => {
        callback(item);
        if (item.left) children.push(item.left);
        if (item.right) children.push(item.right);
      });
      recurse(children);
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

    return recurse(this.find(value)) - 1;

    function recurse(node) {
      if (node === null) return 0;

      const leftHeight = recurse(node.left);
      const rightHeight = recurse(node.right);

      return (leftHeight > rightHeight ? leftHeight : rightHeight) + 1;
    }
    // return height;
  }
}
