import fs from "fs";

const calculateScore = (markdownContent) => {
  const checkboxRegex = /\- \[x\] \*\*(\+\d+)\*\*/g;
  let totalScore = 0;

  let match;
  while ((match = checkboxRegex.exec(markdownContent)) !== null) {
    const score = parseInt(match[1], 10);
    totalScore += score;
  }

  return totalScore;
};

const markdownContent = fs.readFileSync("cross-check.md", "utf8");
const score = calculateScore(markdownContent);
console.log(`Total Score: ${score}`);
