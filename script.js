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

tree.find(16);
// tree.deleteItem(8);
// tree.deleteItem(4);

// console.log("altered tree:");
// prettyPrint(tree.root);
