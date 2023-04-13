import useSWR from 'swr'

const useNetwork = () => {
    const { mutate, ...rest } = useSWR(() =>
    web3 ? "web3/network" : null,
    async () => {
      const netId = await web3.eth.net.getId()
      return netId
    }
  )

  useEffect(() => {
    provider &&
    provider.on("chainChanged", netId => mutate(netId))
  }, [web3])
}

export default useNetwork