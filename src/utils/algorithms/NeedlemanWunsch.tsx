import type { AlignmentResult, Cell } from "../../types/types";


// Global Alignment
export const NeedlemanWunsch = (
  seq1: string,
  seq2: string,
  match: number,
  mismatch: number,
  gap: number
): AlignmentResult => {
  const n = seq1.length;
  const m = seq2.length;
  
  // Initialize Matrix
  const matrix: Cell[][] = Array(n + 1).fill(null).map(() => 
    Array(m + 1).fill(null).map(() => ({ score: 0, origin: 'NONE', isPath: false }))
  );

  // Initialization step (accumulating cost)
  for (let i = 0; i <= n; i++) {
    matrix[i][0] = { score: i * gap, origin: 'TOP', isPath: false };
  }

  for (let j = 0; j <= m; j++) {
    matrix[0][j] = { score: j * gap, origin: 'LEFT', isPath: false };
  }

  matrix[0][0].origin = 'NONE';

  // Matrix Filling Step
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const isMatch = seq1[i - 1] === seq2[j - 1];

      // Calculate cost for each move (Diagonal, Up, Left)
      const costDiag = matrix[i - 1][j - 1].score + (isMatch ? match : mismatch);
      const costUp = matrix[i - 1][j].score + gap;
      const costLeft = matrix[i][j - 1].score + gap;

      // Find the move with minimum cost
      const minCost = Math.min(costDiag, costUp, costLeft);
      
      matrix[i][j].score = minCost;
      
      // Determine origin (priority: Diagonal > Top > Left)
      if (minCost === costDiag) matrix[i][j].origin = 'DIAGONAL';
      else if (minCost === costUp) matrix[i][j].origin = 'TOP';
      else matrix[i][j].origin = 'LEFT';
    }
  }

  // Backtracking Step
  let align1 = "";
  let align2 = "";
  let i = n;
  let j = m;

  // Mark the path in the matrix
  matrix[i][j].isPath = true;

  while (i > 0 || j > 0) {
    if (i === 0) {
      align1 = '-' + align1;
      align2 = seq2[j - 1] + align2;
      j--;
    } else if (j === 0) {
      align1 = seq1[i - 1] + align1;
      align2 = '-' + align2;
      i--;
    } else {

      const cell = matrix[i][j];
      if (cell.origin === 'DIAGONAL') {
        align1 = seq1[i - 1] + align1;
        align2 = seq2[j - 1] + align2;
        i--;
        j--;

      } else if (cell.origin === 'TOP') {
        align1 = seq1[i - 1] + align1;
        align2 = '-' + align2;
        i--;

      } else {
        align1 = '-' + align1;
        align2 = seq2[j - 1] + align2;
        j--;

      }
    }

    matrix[i][j].isPath = true;
  }

  return {
    score: matrix[n][m].score,
    align1,
    align2,
    matrix
  };
};
