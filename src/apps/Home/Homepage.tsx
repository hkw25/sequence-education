import React, { useState, useMemo } from 'react';
import { 
  Dna, 
  Settings, 
  PlayCircle, 
  RotateCcw, 
  GraduationCap, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  HelpCircle
} from 'lucide-react';
import { NeedlemanWunsch } from '../../utils/algorithms/NeedlemanWunsch';



 function Homepage() {
  const [seq1, setSeq1] = useState("GATTACA");
  const [seq2, setSeq2] = useState("GCATGCU");
  const [matchCost, setMatchCost] = useState(0);
  const [mismatchCost, setMismatchCost] = useState(1);
  const [gapCost, setGapCost] = useState(1);
  const [quizMode, setQuizMode] = useState(false);
  const [showQuizAnswer, setShowQuizAnswer] = useState(true);

  // Computed Result
  const result = useMemo(() => {
    return NeedlemanWunsch(
      seq1.toUpperCase(), 
      seq2.toUpperCase(), 
      matchCost, 
      mismatchCost, 
      gapCost
    );
  }, [seq1, seq2, matchCost, mismatchCost, gapCost]);

  // Randomize sequences
  const handleRandomize = () => {
    const bases = "ACGT";
    const r1 = Array(Math.floor(Math.random() * 5) + 4).fill(null).map(() => bases[Math.floor(Math.random() * 4)]).join('');
    const r2 = Array(Math.floor(Math.random() * 5) + 4).fill(null).map(() => bases[Math.floor(Math.random() * 4)]).join('');
    setSeq1(r1);
    setSeq2(r2);
    if(quizMode) setShowQuizAnswer(false);
  };

  const handleQuizMode = () => {
    setQuizMode(!quizMode);
    setShowQuizAnswer(!showQuizAnswer);
  }

  return (
   <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="bg-white/10 p-2 rounded-full">
              <Dna size={32} className="text-indigo-200" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Sequence Education</h1>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-indigo-800/50 px-4 py-2 rounded-lg border border-indigo-600">
             <div className="flex items-center gap-2">
                <GraduationCap size={18} className={quizMode ? "text-yellow-400" : "text-indigo-300"} />
                <span className="text-sm font-medium">Quiz Mode</span>
             </div>
             <button 
                onClick={handleQuizMode}
                className={`w-12 h-6 rounded-full transition-colors relative ${quizMode ? 'bg-yellow-500' : 'bg-slate-600'}`}
             >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${quizMode ? 'left-7' : 'left-1'}`} />
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Configuration */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Input Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-semibold text-slate-700 flex items-center gap-2">
                <Settings size={18} /> Configuration
              </h2>
              <button 
                onClick={handleRandomize}
                className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                <RotateCcw size={14} /> Randomize
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Sequences */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Sequence 1 (Top)</label>
                  <input 
                    value={seq1}
                    onChange={(e) => setSeq1(e.target.value.toUpperCase())}
                    className="w-full font-mono uppercase bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="e.g. GATTACA"
                    maxLength={15}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Sequence 2 (Left)</label>
                  <input 
                    value={seq2}
                    onChange={(e) => setSeq2(e.target.value.toUpperCase())}
                    className="w-full font-mono uppercase bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="e.g. GCATGCU"
                    maxLength={15}
                  />
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Parameters */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-600">Match Cost</span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">{matchCost}</span>
                  </div>
                  <input 
                    type="range" min="0" max="5" 
                    value={matchCost}
                    onChange={(e) => setMatchCost(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-600">Mismatch Cost</span>
                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold">{mismatchCost}</span>
                  </div>
                  <input 
                    type="range" min="0" max="5" 
                    value={mismatchCost}
                    onChange={(e) => setMismatchCost(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-600">Gap Cost</span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold">{gapCost}</span>
                  </div>
                  <input 
                    type="range" min="0" max="5" 
                    value={gapCost}
                    onChange={(e) => setGapCost(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Educational Note */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="flex gap-3">
                    {/* <HelpCircle className="text-blue-600 flex-shrink-0" size={20} /> */}
                    <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Global Sequence Alignment</p>
                    <p className="leading-relaxed">
                        The goal is to find the path through the matrix that results in the lowest total cost (distance), representing the fewest edits (insertions, deletions, substitutions)
                    </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: Dynamic programming visualization */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Result Card */}
          <div className={`bg-white rounded-xl shadow-md border overflow-hidden transition-all ${quizMode && !showQuizAnswer ? 'border-yellow-400 ring-2 ring-yellow-100' : 'border-slate-200'}`}>
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-semibold text-slate-700 flex items-center gap-2">
                <PlayCircle size={18} /> Alignment Result
              </h2>
              {quizMode && (
                <div className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded border border-yellow-200">
                  QUIZ MODE ACTIVE
                </div>
              )}
            </div>
            
            <div className="p-8 relative min-h-[160px] flex flex-col justify-center items-center">
              
              {quizMode && !showQuizAnswer ? (
                <div className="text-center space-y-4">
                   <p className="text-slate-600 max-w-md mx-auto">
                     It's your turn to calculate the minimum cost (edit distance) for these sequences.
                   </p>
                   <button 
                    onClick={handleQuizMode}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2 mx-auto"
                   >
                     <Eye size={18} /> Reveal Answer
                   </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2 w-full max-w-2xl overflow-x-auto pb-2">
                    {/* Seq 1 */}
                    <div className="flex">
                       <span className="w-20 text-xs font-bold text-slate-400 uppercase tracking-wider self-center">Seq 1</span>
                       <div className="flex font-mono text-xl tracking-[0.2em]">
                          {result.align1.split('').map((char, i) => (
                            <span key={i} className="w-8 h-10 flex items-center justify-center bg-slate-100 rounded-sm mx-[1px] border border-slate-200">
                              {char}
                            </span>
                          ))}
                       </div>
                    </div>
                    
                    {/* Match Lines */}
                    <div className="flex">
                        <span className="w-20"></span>
                        <div className="flex font-mono text-xl tracking-[0.2em]">
                          {result.align1.split('').map((char, i) => {
                            const match = char === result.align2[i] && char !== '-';
                            const mismatch = char !== result.align2[i] && char !== '-' && result.align2[i] !== '-';
                            return (
                                <span key={i} className="w-8 h-6 flex items-center justify-center mx-[1px]">
                                    {match && <div className="w-1 h-4 bg-green-500 rounded-full"></div>}
                                    {mismatch && <div className="w-1 h-1 bg-red-400 rounded-full"></div>}
                                </span>
                            )
                          })}
                        </div>
                    </div>

                    {/* Seq 2 */}
                    <div className="flex">
                       <span className="w-20 text-xs font-bold text-slate-400 uppercase tracking-wider self-center">Seq 2</span>
                       <div className="flex font-mono text-xl tracking-[0.2em]">
                          {result.align2.split('').map((char, i) => (
                            <span key={i} className="w-8 h-10 flex items-center justify-center bg-slate-100 rounded-sm mx-[1px] border border-slate-200">
                              {char}
                            </span>
                          ))}
                       </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-8 border-t border-slate-100 pt-6 w-full justify-center">
                     <div className="text-center">
                        <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider">Total Cost</span>
                        <span className="text-3xl font-bold text-indigo-700">{result.score}</span>
                     </div>
                     <div className="text-center">
                        <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider">Length</span>
                        <span className="text-3xl font-bold text-slate-700">{result.align1.length}</span>
                     </div>
                     <div className="text-center">
                        <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider">Matches</span>
                        <span className="text-3xl font-bold text-green-600">
                          {result.align1.split('').filter((c, i) => c === result.align2[i] && c !== '-').length}
                        </span>
                     </div>
                  </div>

                  {quizMode && (
                    <button 
                      onClick={() => setShowQuizAnswer(false)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                      title="Hide answer"
                    >
                      <EyeOff size={18} />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Matrix Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-semibold text-slate-700">Dynamic Programming Matrix (Min Cost)</h2>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-100 border border-green-300 rounded-sm"></div>
                  <span className="text-slate-500">Optimal Path</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-white border border-slate-200 rounded-sm"></div>
                  <span className="text-slate-500">Cost Cell</span>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-x-auto">
               <div className="inline-block min-w-full">
                  <div className="grid gap-[1px] bg-slate-200 border border-slate-200"
                       style={{ 
                         gridTemplateColumns: `40px 40px repeat(${seq2.length}, 40px)`,
                       }}>
                     
                     {/* Header Row */}
                     <div className="bg-slate-100 h-10 flex items-center justify-center font-bold text-slate-400 text-xs"></div>
                     <div className="bg-slate-100 h-10 flex items-center justify-center font-bold text-slate-400 text-xs">ε</div>
                     {seq2.split('').map((char, i) => (
                       <div key={i} className="bg-indigo-50 h-10 flex items-center justify-center font-bold text-indigo-700">
                         {char}
                       </div>
                     ))}

                     {/* Matrix Rows */}
                     {result.matrix.map((row, i) => (
                       <React.Fragment key={i}>
                         {/* Row Label */}
                         <div className={`h-10 flex items-center justify-center font-bold ${i === 0 ? 'text-slate-400 text-xs bg-slate-100' : 'text-indigo-700 bg-indigo-50'}`}>
                            {i === 0 ? 'ε' : seq1[i-1]}
                         </div>

                         {/* Matrix Cells */}
                         {row.map((cell, j) => (
                           <div 
                             key={`${i}-${j}`}
                             className={`h-10 flex items-center justify-center text-sm transition-all duration-300
                               ${quizMode && !showQuizAnswer ? 'blur-sm select-none' : ''}
                               ${cell.isPath 
                                 ? 'bg-green-100 text-green-800 font-bold ring-inset ring-2 ring-green-300 z-10' 
                                 : 'bg-white text-slate-500 hover:bg-slate-50'}
                             `}
                           >
                             {cell.score}
                           </div>
                         ))}
                       </React.Fragment>
                     ))}
                  </div>
               </div>
            </div>
            
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-start gap-2">
              <CheckCircle2 size={14} className="mt-0.5 text-green-600" />
              <p>The matrix minimizes total cost. Matches reduce cost; gaps/mismatches increase it. Path traced back from bottom-right.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Homepage;