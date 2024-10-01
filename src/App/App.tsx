/* eslint-disable import/group-exports */
import { useEffect, useState } from 'react'

import { Offer, RiskRequest, fetchOffers } from '@/App/api/api'
import { ResultsCard } from '@/App/components/resultsCard/resultsCard'
import { Inputs, SearchCard } from '@/App/components/searchCard/searchCard'

import './App.css'

function getPayloadFromSearch(search: Inputs): RiskRequest {
  const payload: RiskRequest = {
    age: search.age,
    dependents: search.dependents ? 1 : 0,
    income: search.income,
    marital_status: search.maritalStatus,
    risk_questions: [search.carAccident, search.chronicDisease, search.debt].map((value) =>
      value === 'true' ? 1 : 0,
    ),
  }

  if (search.ownsCar === 'true' && search.carYear) {
    payload.vehicle = { year: search.carYear }
  }

  if (search.ownsHouse === 'true') {
    payload.house = { ownership_status: search.houseStatus === 'true' ? 'mortgaged' : 'owned' }
  }

  return payload
}

const App = () => {
  const [search, setSearch] = useState<Inputs>()
  const [results, setResults] = useState<Offer[] | null>([])

  useEffect(() => {
    if (search) {
      setResults(null)

      const riskRequest = getPayloadFromSearch(search)
      fetchOffers(riskRequest).then((offers) => {
        setResults(offers)
      })
    }
  }, [search])

  return (
    <div id="app">
      <div id="header">
        <h1>SWStarter</h1>
      </div>
      <main>
        <SearchCard setSearch={setSearch} />
        <ResultsCard results={results} />
      </main>
    </div>
  )
}

export { App }
