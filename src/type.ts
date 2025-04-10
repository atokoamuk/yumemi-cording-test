export type Prefecture = {
  prefCode: number
  prefName: string
}

export type PrefecturesResponse = {
  message: string | null
  result: Prefecture[]
}

export type Poplation = {
  boundaryYear: number
  data: {
    label: string
    data: {
      year: number
      value: number
      rate: number
    }[]
  }[]
}

export type PopulationResponse = {
  message: string | null
  result: Poplation
}

export type PopulationLabel = '総人口' | '年少人口' | '生産年齢人口' | '老年人口'
