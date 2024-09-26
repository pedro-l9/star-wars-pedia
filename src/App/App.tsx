import { useEffect, useState } from 'react'

import { Films, People } from 'swapi-ts'

import { ResultsCard } from '@/App/components/resultsCard/resultsCard'
import { SearchCard } from '@/App/components/searchCard/searchCard'

import './App.css'

async function fetchResults({ query, type }: Search) {
  switch (type) {
    case 'People': {
      const { resources } = await People.findBySearch([query])

      return resources.map(({ value }) => value.name)
    }
    case 'Movies': {
      const { resources } = await Films.findBySearch([query])

      return resources.map(({ value }) => value.title)
    }
  }

  return null
}

const App = () => {
  const [search, setSearch] = useState<Search | undefined>(undefined)
  const [results, setResults] = useState<string[] | undefined>([])

  useEffect(() => {
    if (search) {
      setResults(undefined)
      fetchResults(search).then((response) => {
        if (response) setResults(response)
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

export interface Search {
  type: string
  query: string
}

export { App }
