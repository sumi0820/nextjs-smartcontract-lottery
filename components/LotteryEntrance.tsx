import { FC, useEffect, useState } from 'react'
import { useWeb3Contract, useMoralis } from 'react-moralis'
import { contractAddresses, abi } from '../constants'
import { ethers, ContractTransaction } from 'ethers'
import { useNotification } from 'web3uikit'
import { Bell } from '@web3uikit/icons'

type ContractAddress = {
  [key: string]: string[]
}

const LotteryEntrance: FC = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const chainId = chainIdHex !== null ? parseInt(chainIdHex, 16).toString() : null
  const addresses: ContractAddress = contractAddresses
  const contractAddress = chainId !== null && chainId in addresses ? addresses[chainId][0] : null
  const bell = <Bell fontSize='50px' />

  const [rowEntranceFee, setRowEntranceFee] = useState<string>('Initial value')
  const [entranceFee, setEntranceFee] = useState<string>('Initial value')
  const [numPlayers, setNumPlayers] = useState<string>('0')
  const [recentWinner, setRecentWinner] = useState<string>('0')

  const dispatch = useNotification()

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI()
    }
  }, [isWeb3Enabled])

  const updateUI = async () => {
    try {
      const currentEntranceFee = (await getEntranceFee()) as string
      setRowEntranceFee(currentEntranceFee)
      setEntranceFee(ethers.utils.formatUnits(currentEntranceFee, 'ether'))

      const currentNumPlayers = (await getNumberOfPlayers()) as string
      setNumPlayers(currentNumPlayers.toString())

      const currentRecentWinner = (await getRecentWinner()) as string
      setRecentWinner(currentRecentWinner.toString())
    } catch (error) {
      throw error
    }
  }

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi !== null ? JSON.parse(abi) : null,
    contractAddress: contractAddress !== null ? contractAddress : undefined,
    functionName: 'getEntranceFee',
    params: {},
  })

  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi !== null ? JSON.parse(abi) : null,
    contractAddress: contractAddress !== null ? contractAddress : undefined,
    functionName: 'enterRaffle',
    params: {},
    msgValue: rowEntranceFee,
  })

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi !== null ? JSON.parse(abi) : null,
    contractAddress: contractAddress !== null ? contractAddress : undefined,
    functionName: 'getNumberOfPlayers',
    params: {},
  })

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi !== null ? JSON.parse(abi) : null,
    contractAddress: contractAddress !== null ? contractAddress : undefined,
    functionName: 'getRecentWinner',
    params: {},
  })

  const handleEnter = () => {
    const callEnterRaffle = async () => {
      await enterRaffle({
        onSuccess: (tx) => {
          handleSuccess(tx as ContractTransaction)
        },
        onError: (error) => {
          throw new Error(error.toString())
        },
      })
    }
    callEnterRaffle()
  }

  const handleSuccess = async (tx: ContractTransaction) => {
    await tx.wait(1)
    handleNewNotification()
    updateUI()
  }

  const handleNewNotification = () => {
    dispatch({
      type: 'info',
      message: 'Transaction complete',
      title: 'Tx Notification',
      position: 'topR',
      icon: bell,
    })
  }

  return (
    <div className='p-5'>
      <h2>Lottery entry</h2>
      {addresses && typeof entranceFee == 'string' ? (
        <>
          <p>Entrance fee: {entranceFee} ETH</p>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto'
            type='button'
            onClick={handleEnter}
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <div className='animate-spin spinner-border h-8 w-8 border-b-2 rounded-full'></div>
            ) : (
              <div>Enter Raffle</div>
            )}
          </button>
        </>
      ) : (
        <p>No raffle address detected</p>
      )}
      <p>Number of players: {numPlayers}</p>
      <p>Recent winner: {recentWinner}</p>
    </div>
  )
}

export default LotteryEntrance
