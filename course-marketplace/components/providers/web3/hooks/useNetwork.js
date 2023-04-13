import useSWR from 'swr'

const useNetwork = () => {
    const { mutate, ...rest } = useSWR(
        web3 ? 'web3/network' : null,
        async () => {
            const netId = 
        }
    )
}

export default useNetwork