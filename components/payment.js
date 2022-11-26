import { useEffect, useState } from 'react'
import { getProgramInstance } from '../utils/utils'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { SOLANA_HOST } from '../utils/const'
import { PublicKey } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import HomePage from '../pages/homepage'

const anchor = require('@project-serum/anchor')

const { web3 } = anchor
const { SystemProgram } = web3
const utf8 = anchor.utils.bytes.utf8

const defaultAccounts = {
  tokenProgram: TOKEN_PROGRAM_ID,
  clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: SystemProgram.programId,
}

export const Payment = () => {
  const wallet = useWallet()
  const connection = new anchor.web3.Connection(SOLANA_HOST)
  const program = getProgramInstance(connection, wallet)
  const [payers, setPayers] = useState([])
  const [isPaid, setPaid] = useState(false)

  useEffect(() => {
    if (wallet.connected) getAllWallets()
  }, [wallet.connected, isPaid])

  const getAllWallets = async () => {
    const payerList = await program.account.payerAccount.all()
    setPayers(payerList)

    payerList.forEach(payer => {
      if (payer.account.wallet.toBase58() == wallet.publicKey.toBase58())
        setPaid(true)
    })
  }

  const payClicked = async () => {
    let [payerSigner] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('payer'), wallet.publicKey.toBuffer()],
      program.programId,
    )

    let payerInfo

    try {
      payerInfo = await program.account.payerAccount.fetch(payerSigner)
    } catch (e) {
      try {
        await program.rpc.acceptPayment({
          accounts: {
            payerWallet: payerSigner,
            receiver: new PublicKey(
              'FdGbqLGZQgTpqXc1bKa41YsJTWHPxfwZKmTykjG6Jj1V',
            ),
            authority: wallet.publicKey,
            ...defaultAccounts,
          },
        })
        alert('Transaction proceed')
      } catch (e) {
        alert(e.message)
      }
    }
  }

  /** show homepage if user makes payment */
  if (isPaid) return <HomePage />

  /** Payment Component */
  return (
    <div className={styles.payment} style={{display: "flex", position: "fixed", alignItems: "center", justifyContent: "center", backgroundColor: "black", height: "100vh", width: "100vw", paddingRight: "10%" }}>
      <video autoPlay muted loop>
        <source src="https://drive.google.com/uc?export=download&id=1KeFMZkTDPBHY1R6dc6V9AeJArAk8zXlF" />
        Your browser does not support HTML5 video.
      </video>

      <div>
        <p style={{ textAlign: "center", color: "#00c4cc", fontSize: "1.5rem", fontWeight: "bold" }}>Make payment</p>
        <div className={styles.buttons} >
          <button
            style={{ backgroundColor: "#00c4cc", margin: "1rem", padding: "0.5rem 1rem", borderRadius: "4px", fontSize: "1.5rem" }}
            onClick={payClicked}
            disabled={isPaid}
          >
            Pay 0.1 Sol
          </button>
          <button style={{ backgroundColor: "#00c4cc", margin: "1rem", padding: "0.5rem 1rem", borderRadius: "4px",fontSize: "1.5rem" }} onClick={getAllWallets}>
            Verify Payment
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  main: `w-screen h-screen bg-white text-black flex flex-col justify-center items-center`,
  button: `bg-[#22C55E] m-3 text-white font-bold py-4 px-7 rounded-full hover:opacity-70 transition`,
  text: `text-4xl text-black mb-10`,
  buttons: `flex items-center`,
  payment: `bg-black`
}
