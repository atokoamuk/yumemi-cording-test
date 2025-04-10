export default function handleApiError(status: number) {
  const messages: { [key: number]: string } = {
    400: 'Bad Request: 必須パラメータが正しく設定されていません。',
    403: 'Forbidden: API キーが正しく設定されていないか無効です。',
    404: 'Not Found: 指定された URL に対応する API が存在しません。',
    500: 'Internal Server Error: API サーバーに問題が発生しました。しばらく時間をおいて再度お試しください。',
  }

  const message = messages[status] || `Unexpected Error: HTTP ${status}`
  throw new Error(`${status} ${message}`)
}

const yumemiBaseUrl = 'https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1'
const yumemiApiKey = process.env.YUMEMI_API_KEY

export async function fetchYumemiApi(endpoint: string, params?: URLSearchParams) {
  const url = new URL(`${yumemiBaseUrl}/${endpoint}`)
  if (params) {
    url.search = params.toString()
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': yumemiApiKey || '',
    },
  })

  if (!res.ok) {
    handleApiError(res.status)
  }

  return res.json()
}
