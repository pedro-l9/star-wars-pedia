import { useCallback, useState } from 'react'

import { Search } from '@/App/App'

import './searchCard.css'

const SEARCH_TYPES = ['People', 'Movies']

interface Props {
  setSearch: (search: Search) => void
}

export function SearchCard({ setSearch }: Props) {
  const [searchType, setSearchType] = useState<string>(SEARCH_TYPES[0])
  const [query, setQuery] = useState('')
  const PLACEHOLDER_TEXT =
    searchType === 'People'
      ? 'e.g. Chewbacca, Yoda, Boba Fett'
      : 'e.g. Return of the Jedi, Attack of the Clones'

  const handleRadio = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value

    setSearchType(value)
  }

  const handleTextInput = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value

    setQuery(value)
  }

  const buttonClick = useCallback(() => {
    setSearch({ query, type: searchType })
  }, [query, searchType, setSearch])

  return (
    <section id="search-box" className="card">
      <h3>What are you searching for?</h3>
      <div className="radio-selection">
        {SEARCH_TYPES.map((type) => (
          <label key={type}>
            <input
              type="radio"
              value={type}
              name="search-type"
              checked={searchType === type}
              onChange={handleRadio}
            />
            {type}
          </label>
        ))}
      </div>

      <input
        type="text"
        placeholder={PLACEHOLDER_TEXT}
        className="text-input"
        value={query}
        onChange={handleTextInput}
      />

      <button disabled={query === ''} id="search-btn" onClick={buttonClick}>
        Search
      </button>
    </section>
  )
}
