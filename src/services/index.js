const API_KEY = 'LXEbqW233ZnlA6bFDYONpw0LvLaYcyeH'

export default function getGifs({ keyword = 'panda' } = {}) {
  const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=25&offset=0&rating=g&lang=es`

  return fetch(API_URL)
    .then(response => response.json())
    .then(jsonResult => {
      const gifs = jsonResult.data.map(image => {
        const { images, id, title } = image
        const { url } = images.downsized_medium
        return { id, url, title }
      })
      return gifs
    })
    .catch(err => {
      console.error(`getGifs(): Error obteniendo los gifs:`, err)
      return []
    })
}
