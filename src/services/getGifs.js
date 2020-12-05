const API_KEY = 'LXEbqW233ZnlA6bFDYONpw0LvLaYcyeH'

const fromApiResponseToGifs = apiResponse => {
  const { data = [] } = apiResponse
  if (Array.isArray(data)) {
    const gifs = data.map(image => {
      const { images, title, id } = image
      const { url } = images.downsized_medium
      return { title, id, url }
    })
    return gifs
  }
  return []
}


export default function getGifs({ limit = 25, keyword = 'panda' } = {}) {
  const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${limit}&offset=0&rating=g&lang=es`

  return fetch(API_URL)
    .then(res => res.json())
    .then(fromApiResponseToGifs)
}
