import Tree from "./binaryTree.js";

// TOP BST visualizer
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const testData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const data = [0, 1, 2, 3, 4, 5, 6];

const tree = new Tree(testData);

tree.insert(2);
tree.insert(45);
tree.insert(20);
tree.insert(6);

console.log("original tree:");
prettyPrint(tree.root);
console.log("tree is balanced?", tree.isBalanced());

// tree.find(3);
// tree.deleteItem(8);
// tree.deleteItem(4);

// console.log("leverOrder traversal:");
// tree.levelOrderRecursive(console.log);

// console.log("inOrder traversal:");
// tree.inOrderForEach(console.log);

// console.log("preOrder traversal:");
// tree.preOrderForEach(console.log);

// console.log("postOrder traversal:");
// tree.postOrderForEach(console.log);

// console.log(tree.height(4));

tree.rebalance();
tree.deleteItem(2);
tree.deleteItem(7);
tree.deleteItem(45)

console.log("altered tree:");
prettyPrint(tree.root);
console.log("tree is balanced?", tree.isBalanced());
// console.log(tree.height(4));
// console.log(tree.depth(6));
