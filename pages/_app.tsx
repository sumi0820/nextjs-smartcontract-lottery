import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import type { AppProps } from 'next/app'
import { NotificationProvider } from 'web3uikit'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <MoralisProvider initializeOnMount={false} appId='xxx' serverUrl='xxx'>
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  </MoralisProvider>
)

export default MyApp
