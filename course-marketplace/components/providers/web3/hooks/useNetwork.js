import useSWR from 'swr'

const useNetwork = (web3) => {
    const { mutate, ...rest } = useSWR(() =>
    web3 ? "web3/network" : null,
    async () => {
      const netId = await web3.eth.net.getId()
      return netId
    }
  )

  useEffect(() => {
    web3.provider &&
    provider.on("chainChanged", netId => mutate(netId))
  }, [web3])
}

export default useNetwork