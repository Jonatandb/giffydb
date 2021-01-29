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


export default function getGifs({ page = 0, limit = 6, keyword = 'panda' } = {}) {
  const apiURL = `${API_URL}/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${limit}&offset=${page * limit}&rating=g&lang=en`

  return fetch(apiURL)
    .then(res => res.json())
    .then(fromApiResponseToGifs)
}
