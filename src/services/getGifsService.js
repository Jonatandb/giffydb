import { API_KEY, API_URL } from "./settings"

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


export default function getGifs({ limit = 20, keyword = 'panda' } = {}) {
  const apiURL = `${API_URL}/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${limit}&offset=0&rating=g&lang=es`
  return fetch(apiURL)
    .then(res => res.json())
    .then(fromApiResponseToGifs)
}
