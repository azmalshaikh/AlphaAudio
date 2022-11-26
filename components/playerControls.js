import { useContext, useEffect, useState } from "react"
import { SpotifyContext } from "../context/context"
import Image from "next/image"
import next from "../assets/next.svg"
import heart from "../assets/heart.svg"
import previous from "../assets/previous.svg"
import speaker from "../assets/speaker.svg"
import download from "../assets/download.svg"
import playRounded from "../assets/playRounded.svg"
import pauseIcon from "../assets/pause.svg"
import { ref, set, onValue } from "firebase/database";
import { db } from "../components/firebase"

const PlayerControls = ({songs}) => {
  const { currentSong, isPlaying, volume, onVolumeChange, timestamp, progress, playNext, playPrevious, isPaused, play, pause, onProgressChange } = useContext(SpotifyContext)

  if (!isPlaying) return null

  console.log(timestamp)

  let data;
  const viewsCountRef = ref(db, 'songsviews/' + songs.title);
  onValue(viewsCountRef, (snapshot) => {
    data = snapshot.val();
    // if (data == undefined) data = { views: 0, length: "0:00" };
  });

  const getdownload = () => {
    // console.log(currentSong.musicUrl)
    window.open(currentSong.musicUrl, "_blank");
  }

  const [isLiked, setIsLiked] = useState(false);

  const onClickLiked = () => {
    setIsLiked(!isLiked)
    set(ref(db, 'songsliked/' + currentSong.title), {
      liked: !isLiked
    });
  }

  /** Show component if song is playing */
  return (
    <div className={styles.mainControl}>
      <div className={styles.flexCenter}>
        <div className={styles.albumCoverContainer}>
          <Image
            src='https://urlzs.com/Hoc2k'
            className={styles.coverPhoto}
            height={200}
            width={200}
            alt=''
          />
        </div>
        <div>
          <p>{currentSong.title}</p>
          <p className='opacity-50'>{'artist'}</p>
          {/* <p className='opacity-50'>{currentSong.artiste}</p> */}
        </div>
      </div>
      <div>
        <div className={styles.controlIconsContainer}>
          <div className={styles.controlIcon} onClick={getdownload}>
            <Image src={download} alt=""/>
          </div>
          <div onClick={e => playPrevious(songs)} className={styles.controlIcon}>
            <Image src={previous} alt='' />
          </div>

        {isPaused ? <div className={styles.playIcon} onClick={play}><Image src={playRounded} alt="" /></div>
          : <div className={styles.pauseIconStyle} onClick={pause}><Image src={pauseIcon} alt="" /></div>}

          <div onClick={e => playNext(songs)} className={styles.controlIcon}>
            <Image src={next} alt='' />
          </div>
          {!isLiked ? <div onClick={onClickLiked} className={styles.controlIcon}><Image src={heart} alt="" height="30" /></div>
          : <div onClick={onClickLiked} className={styles.controlIcon} style={{opacity: "100"}}><Image src={heart} alt="" height="30" /></div>}
          
        </div>
        <div className={styles.flexCenter}>
          <small>{timestamp}</small>
          <input
            value={progress}
            onChange={e => onProgressChange(e)}
            type='range'
            className={styles.range}
          />
          {/* <small>{data?.length}</small> */}
          {/* <small>{currentSong.songLength}</small> */}
        </div>
      </div>
      <div>
        <div className={styles.flexCenter}>
          <Image src={speaker} alt="" />
          <input value={volume} onChange={e => onVolumeChange(e)} type='range' id='volume-range' />
        </div>
      </div>
    </div >
  )
}

export default PlayerControls

const styles = {
  albumCoverContainer: `w-20 h-20 mr-3`,
  coverPhoto: `object-cover`,
  mainControl: `fixed bottom-0 left-0 p-5 py-3 pr-10 w-screen bg-[#242424] z-40 flex items-center justify-between`,
  // range: `appearance-none mx-3 hover:bg-[#000] h-1 hover:bg-[#22C55E] bg-[#fff] w-[500px]`,
  // volumeRange: `mx-3 -hue-rotate-90 h-1`,
  flexCenter: `flex items-center`,
  controlIcon: `mr-5 cursor-pointer hover:opacity-100 opacity-50`,
  playIcon: `mr-5 w-10 h-10 cursor-pointer hover:opacity-50`,
  pauseIconStyle: `mt-3 w-10 h-10 cursor-pointer hover:opacity-50`,
  controlIconsContainer: `flex items-center justify-center mb-2`,
}