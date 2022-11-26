import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Payment } from './payment'
// import "./globals.css"

const Login = () => {
  const wallet = useWallet()

  const [show, setShow] = useState(true);

  /** show payment UI if wallet is connected */
  // console.log("The wallets are", wallet)
  if (wallet.connected) return <Payment />

  setTimeout(() => {
    setShow(false)
  }, 10000);

  return (
    <div className='login'>
      {/* <video autoPlay muted loop className='videob'>
        <source src="https://drive.google.com/uc?export=download&id=1RGg_hG72HssC-f3kbwWFIocxVaKK1OUa" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video> */}

      <div style={{display: show ? "block" : "none", backgroundColor: "black", height: "100vh", width: "100vw", textAlign: "center"}}>
        <video autoPlay muted loop style={{marginLeft: "auto", marginRight: "auto"}}>
          <source src="https://drive.google.com/uc?export=download&id=1kPeJk5JRnAETo5k8Hg4f3nHtsfZGprXI" />
          
        </video>
      </div>

      <div style={{display: show ? "none" : "flex", position: "fixed", alignItems: "center", justifyContent: "center", backgroundColor: "black", height: "100vh", width: "100vw", paddingRight: "10%" }}>
        <video autoPlay muted loop>
          <source src="https://drive.google.com/uc?export=download&id=1KeFMZkTDPBHY1R6dc6V9AeJArAk8zXlF" />
        </video>
        <div>
          <p style={{ color: "#00c4cc", fontSize: "1.5rem", margin: "1rem 0.5rem", fontWeight: "bold" }}>Login with wallet to access</p>
          <WalletMultiButton style={{ backgroundColor: "#00c4cc", marginLeft: "auto", marginRight: "auto", fontSize: "1.5rem" }} />
        </div>
      </div>
    </div>
  )
}

export default Login

// const styles = {
//   loginPage: `w-screen h-screen bg-white flex justify-center flex-col items-center`,
//   text: `text-4xl text-black mb-10`,
// }
