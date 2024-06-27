"use client"

import Header from "@components/Header";
import { useMoralis } from "react-moralis";
import addresses from "../constants/addresses.json";
import NFTCard from "@components/NFTCard";

const Home = () => {
  const {chainId, isWeb3Enabled} = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : null;
  const marketplaceAddress = chainId
        ? addresses[chainString].NFTMarketplace[0]
        : null;
  
  return (
      <div>
          <Header />
          <div className="container mx-auto">
              <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
              <div className="flex flex-wrap">
                  {isWeb3Enabled && chainId ? (
                      loading || !listedNfts ? (
                          <div>Loading...</div>
                      ) : (
                          listedNfts.activeItems.map((nft) => {
                              const {price, nftAddress, tokenId, seller} = nft;
                              return marketplaceAddress ? (
                                  <NFTCard
                                      price={price}
                                      nftAddress={nftAddress}
                                      tokenId={tokenId}
                                      marketplaceAddress={marketplaceAddress}
                                      seller={seller}
                                      key={`${nftAddress}${tokenId}`}
                                  />
                              ) : (
                                  <div>
                                      Network error, please switch to a
                                      supported network.{" "}
                                  </div>
                              );
                          })
                      )
                  ) : (
                      <div>Web3 Currently Not Enabled</div>
                  )}
              </div>
          </div>
      </div>
  );
}

export default Home