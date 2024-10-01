import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import './AutoSolveAIUI.css';

const AutoSolveAIUI = () => {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSolve = async () => {
    if (!problem.trim()) {
      setError('Please enter a problem description.');
      return;
    }
    setLoading(true);
    setSolution(null);
    setError(null);

    try {
      const response = await fetch('/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: problem }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setSolution(result);
      setHistory((prev) => [...prev, { problem, solution: result }]);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Word limit check (150 words)
  const handleProblemChange = (e) => {
    const inputText = e.target.value;
    const words = inputText.split(/\s+/).filter(Boolean);
    if (words.length <= 150) {
      setProblem(inputText);
      setError(null);
    } else {
      setError('Problem description cannot exceed 150 words.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">AutoSolve AI</h1>
        <div class="background-text">AutoSolve AI AutoSolve AI AutoSolve AI AutoSolve AI AutoSolve AI</div> 
        
        

        <div className="input-group">
          <h2 className="label">Problem Description</h2>
          <textarea
            className="input"
            value={problem}
            onChange={handleProblemChange}
            placeholder="Describe your problem (max 150 words)"
            aria-label="Problem description" // Accessibility improvement
            rows={5} // Control the height of the textarea
          />
          {error && <p className="error-text">{error}</p>}
        </div>

        <button
          onClick={handleSolve}
          className="button"
          disabled={loading}
        >
          {loading ? 'Solving...' : 'Solve Problem'}
        </button>

        {solution && (
          <div className={`solution ${solution ? 'fade-in' : ''}`}>
            <h2 className="solution-title">Solution</h2>
            <p className="solution-text">{solution.solution}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="history">
            <h2 className="history-title">History</h2>
            <ul className="history-list">
              {history.map((item, index) => (
                <li key={index} className="history-item">
                  <CheckCircle className="history-icon" />
                  <strong>Problem:</strong> {item.problem}
                  <br />
                  <strong>Solution:</strong> {item.solution.solution}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoSolveAIUI;