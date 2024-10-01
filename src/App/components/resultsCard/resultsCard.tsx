/* eslint-disable import/group-exports */
import { Offer } from '@/App/api/api'

import './resultsCard.css'

function ResultItem(offer: Offer) {
  return (
    <div key={offer.key} className="result">
      <p>{offer.key + ' | ' + offer.level}</p>
      <button className="button">SEE DETAILS</button>
    </div>
  )
}

export function ResultsCard({ results }: { results: Offer[] | null }) {
  return (
    <section id="results-card" className="card">
      <h2>Available offers</h2>
      <div id="results-container">
        {results ? (
          results.length > 0 ? (
            results.map(ResultItem)
          ) : (
            <p className="placeholder">
              There are zero matches. <br />
              Use the form to search for insurance products that best suit you
            </p>
          )
        ) : (
          <p className="placeholder"> Loading...</p>
        )}
      </div>
    </section>
  )
}
