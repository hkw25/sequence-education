# Sequence Education

[**Live Demo**](https://hkw25.github.io/sequence-education/)

**Sequence Education** is an interactive web application designed to visualize the **Needleman-Wunsch Algorithm** for global sequence alignment. This educational platform focuses on **Cost Minimization (Edit Distance)**, allowing users to intuitively understand evolutionary distance.

## Key Features

* **Real-Time Visualization:** Watch the Dynamic Programming (DP) matrix populate instantly as you type sequences or adjust parameters.
* **Visual Backtracking:** The system highlights the "Optimal Path" in green, tracing the decision process from the bottom-right back to the origin.
* **Interactive Parameter Tuning:** Drag sliders to adjust **Match**, **Mismatch**, and **Gap** costs to see how biological assumptions change the alignment result.
* **Educational Quiz Mode:** Masks the results to force active recall, allowing users to calculate matrix values manually and self-verify.
* **Responsive Design:** Optimized for various screen sizes using Tailwind CSS.

## Technology Stack

* **Frontend:** React.js (Vite)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Icons:** Lucide React

## Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

* Node.js (v16 or higher)
* npm (v7 or higher)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/hkw25/sequence-education.git
    cd sequence-education
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`

## How It Works

This tool implements the **Global Alignment** algorithm:

1.  **Initialization:** The first row and column represent the cost of aligning entirely with gaps.
2.  **Recurrence:** Each cell $(i, j)$ calculates three costs:
    * $Diagonal = D[i-1][j-1] + Cost(Seq1[i], Seq2[j])$
    * $Up = D[i-1][j] + GapCost$
    * $Left = D[i][j-1] + GapCost$
    * **Result:** $D[i][j] = \min(Diagonal, Up, Left)$
3.  **Traceback:** The algorithm follows the path of minimums from $D[n][m]$ to $D[0][0]$.

## License

This project is open-source and available under the MIT License.