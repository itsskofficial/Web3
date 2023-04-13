import { useSWRConfig } from "swr"

const useNetwork = () => {
    const {mutate,...rest} = useSWRConfig()
}

export default useNetwork