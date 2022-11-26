import { clusterApiUrl, PublicKey } from '@solana/web3.js'
import spotify from './alpha.json'

// export const SOLANA_HOST = clusterApiUrl('devnet')
export const SOLANA_HOST = "https://small-quaint-mound.solana-devnet.discover.quiknode.pro/3a7dea7926b8d196f7a372d27a157fc1c9d756e2/"

export const STABLE_POOL_PROGRAM_ID = new PublicKey(
  // '5wSMdEYxSW7iB3rdE7c8yB3bqBUrVtvggjDdY5viyDLk',
  'Fdmp6wKgDUEvssYxXDfga3jPx2iFkwWPhVjXG3QWA1MN',
  // 'B8J4NDK4jtqt89zZA8j7ysVk6YN6VMTRqNEBaHwuyhM1',

)

export const STABLE_POOL_IDL = spotify
