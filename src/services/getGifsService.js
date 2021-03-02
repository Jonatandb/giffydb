import { API_KEY, API_URL, DEFAULT_AMOUNT_GIFS_TO_GET } from "./settings"

const fromApiResponseToGifs = apiResponse => {
  const { data = [] } = apiResponse
  if (Array.isArray(data)) {
    const gifs = data.map(gif => {
      const { images, title, id } = gif
      const { url } = images.downsized_medium
      return { id, title, url }
    })
    return gifs
  }
  return []
}


export default function getGifs({ page = 0, limit, keyword = 'scarlett johansson redhead', rating = 'g', language = 'en' } = {}) {
  const limitToUse = limit || DEFAULT_AMOUNT_GIFS_TO_GET || 5
  const apiURL =
    `${API_URL}/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${limitToUse}&offset=${page * limitToUse}&rating=${rating}&lang=${language}`

  return fetch(apiURL)
    .then(res => res.json())
    .then(fromApiResponseToGifs)
}
