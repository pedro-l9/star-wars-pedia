import { useState } from 'react'

import { ResultsCard } from '@/App/components/resultsCard/resultsCard'
import { Inputs, SearchCard } from '@/App/components/searchCard/searchCard'

import './App.css'

const App = () => {
  const [, setSearch] = useState<Inputs>()
  const [results] = useState<string[] | undefined>([])

  // useEffect(() => {
  //   if (search) {
  //     setResults(undefined)
  //     fetchResults(search).then((response) => {
  //       if (response) setResults(response)
  //     })
  //   }
  // }, [search])

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

export interface Search {
  type: string
  query: string
}

export { App }
