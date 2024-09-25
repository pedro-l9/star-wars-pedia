import './resultsCard.css'

interface Props {
  results?: string[]
}

export function ResultsCard({ results }: Props) {
  return (
    <section id="results-box" className="card">
      <h2>Results</h2>
      <div className="results">
        {results && results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="result">
              <p>{result}</p>
              <button>SEE DETAILS</button>
            </div>
          ))
        ) : (
          <p className="placeholder">
            {results ? (
              <p className="placeholder">
                There are zero matches. <br />
                Use the form to search for People or Movies
              </p>
            ) : (
              <p className="placeholder"> Loading...</p>
            )}
          </p>
        )}
      </div>
    </section>
  )
}
