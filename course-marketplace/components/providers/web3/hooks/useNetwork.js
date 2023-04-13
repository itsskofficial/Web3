import useSWR from 'swr'

const useNetwork = () => {
    const {mutate,...rest} = useSWR()
}

export default useNetwork