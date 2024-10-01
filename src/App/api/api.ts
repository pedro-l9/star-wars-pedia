/* eslint-disable import/group-exports */

interface RiskResponse {
  auto: RiskLevel
  disability: RiskLevel
  home: RiskLevel
  life: RiskLevel
  renters: RiskLevel
  umbrella: RiskLevel
}

export interface RiskRequest {
  age: number
  dependents: number
  income: number
  marital_status: 'married' | 'single'
  risk_questions: (0 | 1)[]
  vehicle?: { year: number }
  house?: { ownership_status: 'owned' | 'mortgaged' }
}

export type RiskLevel = 'economic' | 'regular' | 'responsible' | 'ineligible'

export interface Offer {
  key: string
  level: RiskLevel
}

export async function fetchOffers(payload: RiskRequest): Promise<Offer[]> {
  const response: RiskResponse = await fetch('http://localhost:3030/api/risk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())

  return Object.entries(response).reduce<Offer[]>(
    (offers, [key, value]) =>
      value !== 'ineligible' ? [...offers, { key, level: value }] : offers,
    [],
  )
}
