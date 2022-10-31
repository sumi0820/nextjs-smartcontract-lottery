/* eslint-disable no-void */
// import { FC, useEffect } from 'react'
// import { useMoralis } from 'react-moralis'

// const Header: FC = () => {
//   const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
//     useMoralis()

//   useEffect(() => {
//     if (typeof window !== 'undefined' && window.localStorage.getItem('connected')) {
//       enableWeb3()
//     }
//   }, [isWeb3Enabled])

//   useEffect(() => {
//     Moralis.onAccountChanged((account) => {
//       console.log('Acount changed to ', account)
//       if (account == null) {
//         window.localStorage.removeItem('connected')
//         deactivateWeb3()
//         console.log('Account got disconnected')
//       }
//     })
//   }, [])

//   const trimAddress = (address: string): string =>
//     `${address.slice(0, 6)}...${address.slice(address.length - 4)}`

//   const connectWeb3 = () => {
//     void enableWeb3()
//     if (typeof window !== 'undefined') {
//       window.localStorage.setItem('connected', 'injected')
//     }
//   }

//   return (
//     <div>
//       {account ? (
//         <p>Connected to {trimAddress(account)}</p>
//       ) : (
//         <button type='button' onClick={connectWeb3} disabled={isWeb3EnableLoading}>
//           Connect
//         </button>
//       )}
//     </div>
//   )
// }

import { FC } from 'react'
import { ConnectButton } from 'web3uikit'

const Header: FC = () => (
  <header className='border-b-2 p-2 my-4 flex flex-row align-center'>
    <h2 className='font-sans text-3xl'>Decentralized Lottery</h2>
    <div className='ml-auto '>
      <ConnectButton moralisAuth={false} />
    </div>
  </header>
)

export default Header
