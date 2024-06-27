import { useEffect, useState } from "react"
import { useWeb3Contract } from "react-moralis"
import nftMarketPlaceAbi from "@constants/NFTMarketplace.json"
import nftAbi from "@constants/BasicNFT.json"
import Image from "next/image"
import ethers from "ethers"

const NFTCard = ({ price, nftAddress, marketplaceAddress, tokenId, seller }) => {
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        address: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId
        }
    })

    const updateInfo = async () => {
        const tokenURI = await getTokenURI()
        if (tokenURI) {
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            const tokenResponse = await fetch(requestURL)
            const metadata = await tokenResponse.json()
            const imageURI = metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")
            setTokenName(metadata.name)
            setTokenDescription(metadata.description)
            setImageURI(imageURI)
        }
    }
    
    useEffect(() => {
        updateInfo()
    }, [isWeb3Enabled])

    return (
        <div>
            <div>
                {imageURI ? (
                    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
                        <div className="relative">
                            <Image src={imageURI} width={200} height={200} className="w-full h-48 object-cover" alt={tokenName} />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full">
                                {tokenName}
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="text-gray-900 text-xl mb-2">{tokenName}</div>
                            <div className="text-gray-700 text-base mb-4">{tokenDescription}</div>
                            <div className="text-lg font-bold">
                                {ethers.formatUnits(price, "ether")} ETH
                            </div>
                            <div className="text-gray-600 text-sm mt-2">Token ID: {tokenId}</div>
                            <div className="text-gray-600 text-sm">Seller: {seller}</div>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )
}

export default NFTCard