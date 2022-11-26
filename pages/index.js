import { useContext } from 'react'
import { SpotifyContext } from '../context/context'
import Login from '../components/login'
import Head from 'next/head'

export default function Home() {
  const { updateProgress, updateVolume } = useContext(SpotifyContext)
  return (
    <div>
      <Head>
        <title>Alpha Audio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <audio
        id='audio-element'
        hidden
        playsInline
        onVolumeChange={e => updateVolume(e)}
        onTimeUpdate={e => updateProgress(e)}
      />
      <Login />
    </div>
  )
}
