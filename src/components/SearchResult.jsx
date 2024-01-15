import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../context/ContextApi'
import { fetchData } from '../utils/api'
import LeftNav from './LeftNav'
import SearchResultVideoCard from './SearchResultVideoCard'

const SearchResult = () => {

  const [results, setResults] = useState()
  const {searchQuery} = useParams()
  const {loading, setLoading} = useContext(Context)

  useEffect(()=>{
    document.getElementById("root").classList.remove("custom-h");
    fetchResult()
  },[searchQuery])

  const fetchResult = () => {
    setLoading(true)
    fetchData(`search?q=${searchQuery}&maxResults=10`).then(res=>{
      setResults(res.items)
      console.log(results)
    })
    setLoading(false)
  }

  return (
    <div className='flex flex-row h-[calc(100%-56px)]'>
      <LeftNav/>
      <div className='grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black'>
          <div className='grid grid-cols-1 gap-2 p-5'>
            {
              results && results?.map((result,idx)=>{
                if(result?.id?.kind !== "youtube#video") return false
                return (
                  <SearchResultVideoCard
                   key={idx}
                   resultId = {result?.id?.videoId}
                  />
                 
                )
              })
            }
          </div>
      </div>
    </div>
  )
}

export default SearchResult