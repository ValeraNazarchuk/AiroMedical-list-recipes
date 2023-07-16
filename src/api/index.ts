import axios from 'axios'

const url = 'https://api.punkapi.com/v2/beers?page='

export const getRecipesReq = async (params: number) => {
  try {
    const response = await axios.get(`${url}${params}`)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
