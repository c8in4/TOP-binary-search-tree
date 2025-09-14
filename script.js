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

// TOP test data:
const testData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const randomNumbers = createArrayOfRandomNumbers(15);

function createArrayOfRandomNumbers(numberOfElements) {
  const arr = [];

  for (let i = 0; i < numberOfElements; i++) {
    arr.push(Math.round(Math.random() * 100));
  }
  return arr;
}

const randomNumberBST = new Tree(randomNumbers);

console.log("original tree:");
prettyPrint(randomNumberBST.root);
console.log("tree is balanced?", randomNumberBST.isBalanced());

console.log("random numbers in level order:");
randomNumberBST.levelOrderForEach((node) => console.log(node.data));

console.log("random numbers in pre order:");
randomNumberBST.preOrderForEach((node) => console.log(node.data));

console.log("random numbers in post order:");
randomNumberBST.postOrderForEach((node) => console.log(node.data));

console.log("random numbers in order:");
randomNumberBST.inOrderForEach((node) => console.log(node.data));

const newNumbers = createArrayOfRandomNumbers(5);
newNumbers.forEach((number) => {
  randomNumberBST.insert(number);
});

console.log("tree with added numbers:");
prettyPrint(randomNumberBST.root);
console.log("tree is balanced?", randomNumberBST.isBalanced());

randomNumberBST.rebalance();

console.log("rebalanced tree:");
prettyPrint(randomNumberBST.root);
console.log("tree is balanced?", randomNumberBST.isBalanced());

console.log("random numbers in level order:");
randomNumberBST.levelOrderForEach((node) => console.log(node.data));

console.log("random numbers in pre order:");
randomNumberBST.preOrderForEach((node) => console.log(node.data));

console.log("random numbers in post order:");
randomNumberBST.postOrderForEach((node) => console.log(node.data));

console.log("random numbers in order:");
randomNumberBST.inOrderForEach((node) => console.log(node.data));
