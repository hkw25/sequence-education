
export type Cell = {
  score: number;
  origin: 'DIAGONAL' | 'TOP' | 'LEFT' | 'NONE';
  isPath: boolean;
};

export type AlignmentResult = {
  score: number;
  align1: string;
  align2: string;
  matrix: Cell[][];
};