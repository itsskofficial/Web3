import useSWR from 'swr'

const useNetwork = () => {
    const { mutate, ...rest } = useSWR(
        web3 ? 'web3/network' : null,
        
    )
}

export default useNetwork