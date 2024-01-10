import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '../utils/api'
import { Context } from '../context/ContextApi'

const SearchResultVideoCard = ({videoId}) => {

    // const [video, setVideo] = useState()
    // const {setLoading} = useContext(Context)

    // useEffect(()=>{
    //     fetchVideoData()
    // },[videoId])

    // const fetchVideoData = () => {
    //     setLoading(true);
    // fetchData(`videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}`)
    //     .then(({ items }) => {
    //         console.log(items[0]);
    //         setVideo(items[0]);
    //         setLoading(false);
    //     });
    // }
    

  return (
    <div className='text-white'>
        {videoId}
    </div>
  )
}

export default SearchResultVideoCard