import axios from "axios";

const BASE_URL = 'https://youtube-v31.p.rapidapi.com'


const options = {
        params: {
          // maxResults: '50',
          regionCode: 'IN'
        },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
          'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
    }

export const fetchData = async (url) => {
    try{
        const {data} = await axios.get(`${BASE_URL}/${ url }`,options)
        return data
    }catch(error){
        console.log(error)
    }
}

