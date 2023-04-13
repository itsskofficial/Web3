import useSWR from 'swr'

const useNetwork = () => {
    const { mutate, ...rest } = useSWR(
        web3? '/'
    )
}

export default useNetwork