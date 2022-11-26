import { useState } from 'react'
import NavLink from './navLink'

const styles = {
  nav: ` h-screen w-96 p-5 py-10 `,
  link: `hover:text-[#fff]`,
  playlistName: `text-[#b3b3b3] cursor-pointer text-sm hover:text-[#fff]`
}
                             
const Nav = ({likedcheck, setLikedcheck, mostplayed, setMostplayed}) => {
  
  const getLikedSongs = () => {
    // console.log("Liked is", likedcheck)
    setLikedcheck(!likedcheck)
  }

  const changeplayed = () => {
    setMostplayed(!mostplayed)
  }

  return (
    <div className={styles.nav} style={{ position: "sticky", top: "0" }}>
      <div className='mb-10'>
        <NavLink icon='assets/playlist.svg' title='Your library' className={styles.link}  likedcheck={false}/>
      </div>

      <div className='mb-5 border-b border-gray-100/10' onClick={getLikedSongs}>
        {/* <NavLink icon='assets/add.svg' title='Create Playlist' className={styles.link}/> */}
        <NavLink icon='assets/heart.svg' title='Liked Songs' className={styles.link} likedcheck={likedcheck}/>
      </div>

      <div className='mt-5 leading-8 flex flex-col gap-[10px]'>
        <p className='text-sm'>2022 SONGS</p>
        {/* <p className={styles.playlistName} onClick={changeplayed}>
          Most Played
        </p>
        <p className={styles.playlistName}>
          Least Played
        </p> */}
      </div>
    </div>
  )
}

export default Nav