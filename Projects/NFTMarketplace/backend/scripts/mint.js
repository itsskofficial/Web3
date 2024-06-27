const main = async () => {
    const nftMarketplaceDeployment = await deployments.get("NFTMarketplace")
    const basicNFTDeployment = await deployments.get("BasicNFT")
    const nftMarketplace = await ethers.getContractAt(nftMarketplaceDeployment.abi, nftMarketplaceDeployment.address)
    const basicNFT = await ethers.getContractAt(basicNFTDeployment.abi, basicNFTDeployment.address)
    
    console.log("Minting...")
    const mintTx = await basicNFT.mint()
    const mintTxReceipt = await mintTx.wait(1)
    const tokenId = mintTxReceipt.logs[0].topics[0]
    console.log("Minted NFT with tokenId:", tokenId)

    console.log("Approving NFT...")
    const approveTx = await basicNFT.approve(nftMarketplace.target, tokenId)
    await approveTx.wait(1)
    console.log("Approved!")

    console.log("Listing NFT...")
    const tx = await nftMarketplace.listItem(basicNFT.target, tokenId, ethers.parseEther("0.1"))
    await tx.wait(1)
    console.log("Listed!")
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })