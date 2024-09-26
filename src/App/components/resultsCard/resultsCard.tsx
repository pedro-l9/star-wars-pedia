import './resultsCard.css'

interface Props {
  results?: string[]
}

function ResultItem(result: string) {
  return (
    <div key={result} className="result">
      <p>{result}</p>
      <button className="button">SEE DETAILS</button>
    </div>
  )
}

export function ResultsCard({ results }: Props) {
  return (
    <section id="results-card" className="card">
      <h2>Results</h2>
      <div id="results-container">
        {results ? (
          results.length > 0 ? (
            results.map(ResultItem)
          ) : (
            <p className="placeholder">
              There are zero matches. <br />
              Use the form to search for People or Movies
            </p>
          )
        ) : (
          <p className="placeholder"> Loading...</p>
        )}
      </div>
    </section>
  )
}
