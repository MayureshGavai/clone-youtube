import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Feed from './components/Feed'
import SearchResult from './components/SearchResult'
import VideoDetails from './components/VideoDetails'
import ChannelDetails from './components/ChannelDetails'

const App = () => {
  return (
      <BrowserRouter>
        <div className='flex flex-col h-full overflow-y-hidden '>
          <Header/>
          <Routes>
            <Route path="/" exact element={<Feed/>}/>
            <Route path='/searchResult/:searchQuery' element={<SearchResult/>} />
            <Route path='/video/:id' element={<VideoDetails/>} />
            <Route path='/channel/:id' element={<ChannelDetails/>} />
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App