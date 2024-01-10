import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {formatDistance, subDays} from 'date-fns'
import { BsFillCheckCircleFill } from "react-icons/bs";
import { fetchData } from '../utils/api';



const VideoCard = ({video}) => {

    // const {channelDetail, setChannelDetail} = useState()

    // const {id:{videoId}, snippet: { thumbnails: { high:{url}}, channelTitle, channelId, title, publishTime} } = video

    // useEffect(()=>{
    //     fetchData(`channels?part=snippet%2Cstatistics&id=${channelId}`).then(({items})=>{
    //     setChannelDetail(items)
    //     }) 
    // },[])

    // const channelThumbnail = channelDetail.snippet.thumbnails.default.url


  return (
    <Link to={`/video/${video?.id?.videoId}` }>
        <div className='flex flex-col mb-8 '>
        <div className='relative h-48 md:h-40 md:rounded-xl overflow-hidden'>
            <img 
                className='h-full w-full object-cover'
                src={video?.snippet?.thumbnails?.high?.url} alt="" />
        </div>
        <div className="flex mt-3">
            <div className="flex items-start">
                <div className="flex h-9 w-9 rounded-full overflow-hidden">
                    <img className='h-full w-full object-cover bg-white' src='' alt="" />
                </div>
            </div>
            <div className="flex flex-col ml-3 overflow-hidden dark:text-white">
                <span className='text-sm font-medium line-clamp-2'>
                    {video?.snippet?.title}
                </span>
                <span className='flex items-center text-[12px] text-white/[0.7] truncate overflow-hidden'>
                    {video?.snippet?.channelTitle}
                    <BsFillCheckCircleFill className='text-white/[0.5] text-[12px] ml-1'/>
                </span>
                <div className="flex text-[12px] text-white/[0.7] truncate overflow-hidden">
                    <span>Views</span>
                    <span className='lassName="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1'>
                        .
                    </span>
                    <span className='truncate'>
                       {formatDistance(subDays(video?.snippet?.publishTime, 3), new Date(), { addSuffix: true})}
                    </span>
                </div>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default VideoCard