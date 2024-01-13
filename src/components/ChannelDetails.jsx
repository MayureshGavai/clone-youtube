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
        setChannel(items);
        setLoading(false);
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
  // <div className="flex flex-col">
  //     <div className="m-auto w-3/4 h-[5px] md:h-[5px] lg:h-[25px] xl:h-[275px]">
  //         <img className="h-full w-full object-cover"
  //             src='https://yt3.googleusercontent.com/JAjvs05GQkK0RwQwQFw0DQ6GmxVfb1T9Ua-rTPZ9T1n845otE3RTsaCLKdV889YPSmUY_A4OVV8' alt="" />
  //     </div>
  //     <div className="text-white mt-16">
  //         {channel?.snippet?.title}
  //     </div>

  return (
    <div className="flex flex-row h-[calc(100%_-_56px)] ">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="dark:text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
          {channel?.snippet?.title}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-5">
          {!loading &&
            channelVideos?.map((video, idx) => {
              // if(video?.id?.kind !== "youtube#video") return false
              return (
                <VideoCard
                  key={video?.id?.videoId - video?.snippet?.title}
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
