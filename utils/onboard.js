import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import fortmaticModule from '@web3-onboard/fortmatic'

const RPC_URL = `${process.env.NEXT_PUBLIC_INFURA_RPC_URL}`

const fortmatic = fortmaticModule({
  apiKey: process.env.NEXT_PUBLIC_FORTMATIC_KEY
})

const injected = injectedModule()
const walletConnect = walletConnectModule()
const coinbaseWallet = coinbaseModule()

const initOnboard = init({
  wallets: [walletConnect, coinbaseWallet, injected, fortmatic],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: RPC_URL
    }
  ]
})

export { initOnboard }
