import React, { useContext, useEffect } from 'react'
import LeftNav from './LeftNav'
import { Context } from '../context/ContextApi'
import VideoCard from './VideoCard'

const Feed = () => {

  const {loading, searchResult} = useContext(Context)

  useEffect(()=>{
    document.getElementById('root').classList.remove('custom-h')
  },[])

  return (
    <div className='flex flex-row h-[calc(100%_-_56px)] '>
        <LeftNav/>
        <div className='grow w-[calc(100%-240px)] h-full overflow-y-auto bg-white dark:bg-black'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-5'>
              {!loading && searchResult && searchResult?.map((video)=>{
                if(video?.id?.kind !== "youtube#video") return false
                return (
                  <VideoCard 
                    key={video?.id?.videoId-video?.snippet?.title}
                    video={video}
                  />
                )
              })}
          </div>
        </div>
    </div>
  )
}

export default Feed