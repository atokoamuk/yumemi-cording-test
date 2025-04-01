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
