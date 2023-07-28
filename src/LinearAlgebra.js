// LinearAlgebra.js
import React, { useState } from 'react';
import axios from 'axios';

const LinearAlgebra = () => {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your API key
      const apiKey = 'YOUR_API_KEY';

      // API endpoint
      const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

      // Send request to the API
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      };

      const response = await axios.post(apiUrl, {
        prompt: problem,
        max_tokens: 100,
        temperature: 0.7,
        stop: '\n',
      }, { headers });

      // Extract and set the solution from the API response
      const result = response.data;
      setSolution(result.choices[0].text.trim());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Linear Algebra Solver</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="problem">Enter your linear algebra problem:</label><br />
        <textarea
          id="problem"
          rows="4"
          cols="50"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        ></textarea><br />
        <button type="submit">Solve</button>
      </form>
      {solution && (
        <div>
          <h3>Solution:</h3>
          <p>{solution}</p>
        </div>
      )}
    </div>
  );
};

export default LinearAlgebra;
