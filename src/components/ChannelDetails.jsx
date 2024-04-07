import React, { useContext, useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import { Context } from "../context/ContextApi";
import { useParams } from "react-router-dom";
import { abbreviateNumber } from "js-abbreviation-number";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { formatDistance, subDays } from "date-fns";
import { fetchData } from "../utils/api";
import VideoCard from "./VideoCard";

const ChannelDetails = () => {
  const [channel, setChannel] = useState();
  const [channelVideos, setChannelVideos] = useState();
  const { id } = useParams();
  const { loading, setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchChannelDetails();
    fetchChannelVideos();
  }, [id]);

  const fetchChannelDetails = () => {
    setLoading(true);
    fetchData(`channels?part=snippet%2Cstatistics&id=${id}`).then(
      ({ items }) => {
        setChannel(items[0]);
        setLoading(false);
        console.log(channel);
      }
    );
  };

  const fetchChannelVideos = () => {
    setLoading(true);
    fetchData(
      `search?channelId=${id}&part=snippet%2Cid&order=date&maxResults=50`
    ).then(({ items }) => {
      setChannelVideos(items);
      setLoading(false);
    });
  };

  //   {channel?.brandingSettings?.image?.bannerExternalUrl}

  return (
    <div className="flex flex-row h-[calc(100%_-_56px)] ">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="dark:text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
          <div className="flex flex-col m-auto w-3/4">
            <div className=" h-[75px] md:h-[100px] lg:h-[150px] xl:h-[150px]">
              <img
                className="h-full w-full object-cover rounded-lg"
                src={channel?.brandingSettings?.image?.bannerExternalUrl}
                alt=""
              />
            </div>
            <div className="flex mt-4">
            <div className="w-1/12">
            <div className="h-[50px] w-[50px] md:h-[60px] md:w-[60px] lg:h-[75px] lg:w-[75px] rounded-full overflow-hidden">
  <img className="h-full w-full object-cover" 
    src={channel?.snippet?.thumbnails?.high?.url} 
    alt="" />
</div>
            </div>
              <div className="w-11/12 flex flex-col ml-5">
                <span className="flex items-center text-2xl">
                  {channel?.snippet?.title}
                  <BsFillCheckCircleFill className='text-white/[0.5] text-[12px] ml-1'/>
                </span>
                <span className="font-normal text-white/[0.7]">
                  {channel?.snippet?.customUrl} . {"  "}
                  {`${abbreviateNumber(channel?.statistics?.subscriberCount)}`} subscribers . {"  "}
                  {`${abbreviateNumber(channel?.statistics?.videoCount)}`} videos
                </span>
                <span className="mt-1 text-sm font-normal text-white/[0.7] hidden md:block">
                  {channel?.brandingSettings?.channel?.description}
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className='my-5 border-white/[0.5]' />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-5">
          {!loading &&
            channelVideos?.map((video, idx) => {
              // if(video?.id?.kind !== "youtube#video") return false
              return (
                <VideoCard
                  key={idx - video?.id?.videoId - video?.snippet?.title}
                  video={video}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ChannelDetails;
