import React from 'react'
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import {formatDistance, subDays} from 'date-fns'


const SuggesstionVideoCard = ({video}) => {
  return (
    <Link to={`/video/${video?.id?.videoId}`}>
       <div className="flex mb-3">
                <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
                    <img
                        className="h-full w-full object-cover"
                        src={video?.snippet?.thumbnails?.high?.url}
                    />
                    {/* {video?.lengthSeconds && (
                        <VideoLength time={video?.lengthSeconds} />
                    )} */}
                </div>
                <div className="flex flex-col ml-3 overflow-hidden">
                    <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 text-white">
                      {video?.snippet?.title}
                    </span>
                    <span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
                      {video?.snippet?.channelTitle}
                      <BsFillCheckCircleFill className='text-white/[0.5] text-[12px] ml-1'/>
                    </span>
                    <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
                        {/* <span>Views</span>
                        <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                            .
                        </span> */}
                        <span className="truncate">
                          {formatDistance(subDays(video?.snippet?.publishTime, 3), new Date(), { addSuffix: true})}
                        </span>
                    </div>
                </div>
            </div>
    </Link>
  )
}

export default SuggesstionVideoCard