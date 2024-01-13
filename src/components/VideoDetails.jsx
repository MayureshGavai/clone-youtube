import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BiLike, BiDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { LiaDownloadSolid } from "react-icons/lia";
import { abbreviateNumber } from "js-abbreviation-number";
import { fetchData } from "../utils/api";
import { Context } from "../context/ContextApi";
import SuggesstionVideoCard from "./SuggesstionVideoCard";

import {formatDistance, subDays} from 'date-fns'

const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [relatedVideos, setReleatedVideos] = useState();
  // const [channel, setChannel] = useState();
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
    // fetchChanelDetails()
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchData(
      `videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`
    ).then(({ items }) => {
      console.log(items[0]);
      setVideo(items[0]);
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchData(
      `search?relatedToVideoId=${id}&part=id%2Csnippet&type=video`
    ).then(({ items }) => {
      console.log(items);
      setReleatedVideos(items);
      setLoading(false);
    });
  };

  // const fetchChanelDetails = () => {
  //   setLoading(true);
  //   fetchChanelDetails(
  //     `channels?part=snippet%2Cstatistics&id=${video?.snippet?.channelId}`
  //   ).then(({ items }) => {
  //     setChannel(items)
  //     setLoading(false);
  //   })
  // }

  // const {snippet:{localized:{title}}  } = video

  return (
    <div className="flex flex-row justify-center pt-4 h-[calc(100%-56px)] bg-white dark:bg-black">
      <div className="w-full  flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[425px] lg:h-[425px] xl:h-[525px] ml-[-25px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}&rel=0`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000" }}
              playing
            />
          </div>
          <div className="dark:text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.snippet?.localized?.title}
          </div>
          <div className="flex justify-between flex-col text-sm md:text-xl md:flex-row mt-4  items-start">
            <div className="flex items-center">
              {/* <div className="flex h-11 w-11 rounded-full overflow-hidden">
                <img className="bg-white h-full w-full object-cover" 
                  src= {channel?.snippet?.thumbnails?.default?.url} 
                />
              </div> */}
              <div className="flex flex-col ml-3">
                <Link to={`/channel/${video?.snippet?.channelId}`}>
                    <div className="text-white text-md font-semibold flex items-center hover:underline cursor-pointer">
                      {video?.snippet?.channelTitle}
                      <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                    </div>
                </Link>
                <div className="text-white/[0.7] text-sm">
                  {/* {channel?.statistics?.subscriberCount}  subscribers */}
                </div>
              </div>
              <button className="px-4 py-2 ml-6 rounded-full font-medium bg-black text-white dark:bg-white dark:text-black">
                Subscribe
              </button>
            </div>
            <div className="hidden md:block">
              <div className="flex text-sm text-white mt-4 md:mt-0 ">
                <div className="flex items-center justify-center h-11 px-3 rounded-full bg-white/[0.15]">
                  <span className="flex items-center justify-center mr-1">
                    <BiLike className="text-lg text-white mr-2" />
                    <span className="font-semibold">
                      {" "}
                      {`${abbreviateNumber(video?.statistics?.likeCount)}`}{" "}
                    </span>
                  </span>
                  <span className="mx-2">|</span>
                  <BiDislike className="text-lg text-white ml-1" />
                </div>
                <div className="flex items-center justify-center h-11 px-3 rounded-full bg-white/[0.15] ml-4">
                  <RiShareForwardLine className="text-lg text-white mr-2" />
                  <span className="mr-2">Share</span>
                </div>
                <div className="flex items-center justify-center h-11 px-3 rounded-full bg-white/[0.15] ml-4">
                  <LiaDownloadSolid className="text-lg text-white mr-2" />
                  <span className="mr-2">Download</span>
                </div>
              </div>
            </div>
          </div>

          {/* description section */}
          {/* <div className="rounded-lg p-2 dark:bg-white/[0.15] mt-4 dark:text-white">
            <div className="flex">
              <span>{abbreviateNumber(video?.statistics?.viewCount)} views</span>
              <span>{formatDistance(subDays(video?.snippet?.publishedAt, 3), new Date(), { addSuffix: true})}</span>
            </div>
            <div className="hidden md:block">
              {video?.snippet?.description}
            </div>
          </div> */}
        </div>

        {/* related videos */}
        <div className="flex flex-col w-full md:w-1/3 py-6 px-4 overflow-y-auto">
          {relatedVideos?.map((video, idx) => {
            if (video?.id?.kind !== "youtube#video") return false;
            return (
              <SuggesstionVideoCard
                key={idx - video?.id?.videoId}
                video={video}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
