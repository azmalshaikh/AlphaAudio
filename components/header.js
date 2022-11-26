import { useContext } from 'react'
import { SpotifyContext } from '../context/context'
import Image from 'next/image'
import UploadButton from './uploadButton'

const style = {
  arrowButton: `bg-black mr-2 w-10 h-10 flex items-center justify-center rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-75`,
  headerRight: `flex`,
  profile: `flex items-center bg-black rounded-full p-1 px-3 bg-opacity-50 cursor-pointer hover:bg-opacity-75`,
  iconContainer: `ml-10 cursor-pointer`,
  title: `text-6xl font-extrabold`,
  header: `max-w-7xl m-auto p-3`,
  headerWrapper: `flex items-center justify-between`,
  playlistTextContent: `flex items-end mt-10`,
  profileAvatarContainer: `w-7 h-7 rounded-full -ml-2 mr-3`,
  controlsContainer: `flex items-center mt-10`,
  playButton: `bg-green-500 w-16 h-16 flex pl-2 items-center justify-center rounded-full cursor-pointer`,
}

const Header = ({ setShowUploadMusic }) => {
  const { currentSong } = useContext(SpotifyContext)
  // console.log("the current song", currentSong)
  // const { playOnSelect } = useContext(SpotifyContext)

  const getdownload = () => {
    console.log(currentSong.musicUrl)
    window.open(currentSong.musicUrl, "_blank");
  }

  return (
    <div className={style.header}>
      <div className={style.headerWrapper}>
        <div className={style.headerRight} style={{marginLeft: "auto"}}>
          <UploadButton setShowUploadMusic={setShowUploadMusic} />

          <div className={style.profile}>
            <div className={style.profileAvatarContainer}>
              <img alt='' src='assets/avatar.jpg' className='rounded-full' />
            </div>
            <p>Alpha Audio</p>
          </div>
        </div>
      </div>

      <div className={style.playlistTextContent}>
        <Image
          alt=''
          src='https://urlzs.com/s52EF'
          // src='https://tinyurl.com/nh9pa96b'
          width={220}
          height={220}
        />

        <div className='ml-5'>
          <div>ALBUM</div>
          <div className={style.title}>AlPhA AuDiO</div>
          <div className='flex items-center mt-5'>
            <div className={style.profileAvatarContainer}>
              <img alt='' src='assets/avatar.jpg' className='rounded-full' />
            </div>
            <p>
              <span className='text-bold'>AGENTX</span> • 2022 • 10 songs
            </p>
          </div>
        </div>
      </div>

      {/* <div className={style.controlsContainer}>
        <div className={style.iconContainer} style={{zoom: "150%"}}>
          <img alt='' src='assets/heart.svg' width={30} height={30} />
        </div>
        <div className={style.iconContainer} onClick={getdownload}>
          <img alt='' src='assets/download.svg' width={30} height={30}/>
        </div>
        <div className={style.iconContainer}>
          <img alt='' src='assets/more.svg' width={30} height={30} />
        </div>
      </div> */}
    </div>
  )
}

export default Header
