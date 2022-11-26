import Header from '../components/header'
import Nav from '../components/nav'
import Playlist from '../components/playlist'
import PlayerControls from '../components/playerControls'
import Activity from '../components/activity'
import { useState, useEffect } from 'react'
import UploadModal from '../components/UploadModal'
import useSpotify from '../hooks/useSpotify'

const HomePage = () => {

  const [showUploadMusic, setShowUploadMusic] = useState(false)
  const [title, setTitle] = useState('')
  const [musicUrl, setMusicUrl] = useState('')

  const { newMusic, getSongs } = useSpotify(
    musicUrl,
    title,
    setTitle,
    setMusicUrl,
    setShowUploadMusic,
  )

  const [songs, setSongs] = useState([])
  const [likedcheck, setLikedcheck] = useState(false);

  const [mostplayed, setMostplayed] = useState(false);
  const [leastplayed, setLeastplayed] = useState(false);

  useEffect(() => {
    getSongs().then(songs => {
      setSongs(songs)
    })
  }, [])

  return (
    <div className='flex'>
      <video autoPlay muted loop className='videob'>
        <source src="https://drive.google.com/uc?export=download&id=1RGg_hG72HssC-f3kbwWFIocxVaKK1OUa" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      <Nav likedcheck={likedcheck} setLikedcheck={setLikedcheck} mostplayed={mostplayed} setMostplayed={setMostplayed}/>
      <div className='w-full'>
        <Header setShowUploadMusic={setShowUploadMusic} />
        <Playlist songs={songs} likedcheck={likedcheck} setLikedcheck={setLikedcheck}  mostplayed={mostplayed}/>
        <PlayerControls songs={songs} />
        {showUploadMusic && (
          <UploadModal
            title={title}
            setTitle={setTitle}
            setShowUploadMusic={setShowUploadMusic}
            musicUrl={musicUrl}
            setMusicUrl={setMusicUrl}
            newMusic={newMusic}
            songs={songs}
          />
        )}
      </div>
      <Activity />
    </div>
  )
}

export default HomePage
