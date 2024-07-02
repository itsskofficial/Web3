"use client"

import Header from "@components/Header";
import { useAccount } from "wagmi";
import addresses from "@constants/addresses.json";
import NFTCard from "@components/NFTCard";
import { GET_ACTIVE_ITEMS } from "@utils/graph";
import { useQuery } from "@apollo/client";

const Home = () => {
    const { chainId, isConnected } = useAccount();
    const chainString = chainId ? chainId.toString() : null;
    const marketplaceAddress = chainId
            ? addresses[chainString].NFTMarketplace[0]
        : null;

    const {loading, data: listedNfts} = useQuery(GET_ACTIVE_ITEMS);
  
  return (
      <div>
          <Header />
          <div className="container mx-auto">
              <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
              <div className="flex flex-wrap">
                  {isConnected && chainId ? (
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