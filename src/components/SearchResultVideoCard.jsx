import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '../utils/api'
import { Context } from '../context/ContextApi'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import {formatDistance, subDays} from 'date-fns'


const SearchResultVideoCard = ({resultId}) => {

    const [video, setVideo] = useState()
    const {setLoading} = useContext(Context)

    useEffect(()=>{
        fetchVideoData()
    },[resultId])

    const fetchVideoData = () => {
        setLoading(true);
    fetchData(`videos?part=contentDetails%2Csnippet%2Cstatistics&id=${resultId}`)
        .then(({ items }) => {
            console.log(items[0]);
            setVideo(items[0]);
            setLoading(false);
        });
    }
    

  return (
    <div className='text-white'>
        <Link to={`/video/${video?.id}`}>
       <div className="flex flex-col md:flex-row mb-8 md:mb-3 lg:hover:bg-white/[0.1] rounded-xl md:p-4">
                <div className="relative flex shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80 rounded-xl bg-slate-800 overflow-hidden">
                    <img
                        className="h-full w-full object-cover"
                        src={video?.snippet?.thumbnails?.high?.url}
                    />
                    {/* {video?.lengthSeconds && (
                        <VideoLength time={video?.lengthSeconds} />
                    )} */}
                </div>
                <div className="flex flex-col ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
                    <span className="text-lg md:text-2xl font-semibold line-clamp-2 text-white">
                      {video?.snippet?.title}
                    </span>
                    <span className="text-sm font-semibold mt-2 text-white/[0.7] flex items-center">
                      {video?.snippet?.channelTitle}
                      <BsFillCheckCircleFill className='text-white/[0.5] text-[12px] lg:text-[10px] xl:text-[12px] ml-1'/>
                    </span>
                    <div className="flex text-lg font-semibold text-white/[0.7] truncate overflow-hidden">
                        {/* <span>Views</span>
                        <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                            .
                        </span> */}
                        <span className="truncate">
                          {/* {formatDistance(subDays(video?.snippet?.publishTime, 3), new Date(), { addSuffix: true})} */}
                        </span>
                    </div>
                    <div className='truncate text-white/[0.7] mt-3'>
                        {video?.snippet?.description}
                    </div>
                </div>
            </div>
    </Link>
    </div>
  )
}

export default SearchResultVideoCard