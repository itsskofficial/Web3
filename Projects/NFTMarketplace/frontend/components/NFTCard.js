import {useEffect, useState} from "react";
import {useAccount, useReadContract, useWriteContract} from "wagmi";
import nftMarketPlaceAbi from "@constants/NFTMarketplace.json";
import nftAbi from "@constants/BasicNFT.json";
import Image from "next/image";
import {ethers} from "ethers";
import truncateString from "@utils/truncateString";
import UpdateListing from "@components/UpdateListing";
import Notification from "@components/Notification";

const NFTCard = ({price, nftAddress, marketplaceAddress, tokenId, seller}) => {
    const {address: account, isConnected} = useAccount();
    const [imageURI, setImageURI] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [tokenDescription, setTokenDescription] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [notificationDetails, setNotificationDetails] = useState(null);
    const [tokenURI, setTokenURI] = useState(null);

    const {data: tokenURIData, refetch: refetchTokenURI} = useReadContract({
        abi: nftAbi,
        address: nftAddress,
        functionName: "tokenURI",
        args: [tokenId],
    });

    const { writeContract } = useWriteContract();

    const updateInfo = async () => {
        await Promise.all([
            refetchTokenURI(),
        ]);
    };

    useEffect(() => {
        updateInfo();
    }, [isConnected]);

    useEffect(() => {
        if (tokenURIData) setTokenURI(tokenURIData.toString());
    }, [tokenURIData]);

    useEffect(() => {
      const fetchMetadata = async () => {
          if (tokenURI) {
              const requestURL = tokenURI.replace(
                  "ipfs://",
                  "https://ipfs.io/ipfs/"
              );

              const proxyURL = process.env.NODE_ENV == "development" ? `https://cors-anywhere.herokuapp.com/${requestURL}` : requestURL;

              try {
                  const response = await fetch(proxyURL);
                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const metadata = await response.json();
                  const image = metadata.image.replace(
                      "ipfs://",
                      "https://ipfs.io/ipfs/"
                  );

                  setTokenName(metadata.name);
                  setTokenDescription(metadata.description);
                  setImageURI(image);
              } catch (error) {
                  setNotificationDetails({
                        type: "error",
                        message: error.message || "Error fetching metadata",
                        title: "Metadata Error",
                    });
              }
          }
      };

        fetchMetadata();
    }, [tokenURI]);


    const isOwnedByUser = seller === account || seller === undefined;
    const formattedSeller = isOwnedByUser
        ? "You"
        : truncateString(seller || "", 15);

    const handleCardClick = () => {
        if (isOwnedByUser) {
            setShowModal(true);
        } else {
            buyItem();
        }
    };

    const buyItem = () => {
        writeContract({
            abi: nftMarketPlaceAbi,
            address: marketplaceAddress,
            functionName: "buyItem",
            args: [nftAddress, tokenId],
            overrides: {
                value: price,
            },
            onSuccess: handleSuccess,
            onError: handleError,
        });
    };

    const handleSuccess = async (transaction) => {
        await transaction.wait(1);
        setNotificationDetails({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Info",
        });
        setShowModal(false);
    };

    const handleError = (error) => {
        setNotificationDetails({
            type: "error",
            message: error.message || "Transaction Failed",
            title: "Transaction Error",
        });
        setShowModal(false);
    };

    const handleNotificationClose = () => {
        setNotificationDetails(null);
    };

    return (
        <div>
            <div>
                {imageURI ? (
                    <>
                        <UpdateListing
                            isVisible={showModal}
                            tokenId={tokenId}
                            nftAddress={nftAddress}
                            marketplaceAddress={marketplaceAddress}
                            onClose={() => setShowModal(false)}
                        />
                        <div
                            className="max-w-xs rounded overflow-hidden shadow-lg bg-white"
                            onClick={handleCardClick}
                        >
                            <div className="relative">
                                <Image
                                    src={imageURI}
                                    width={200}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                    alt={tokenName}
                                />
                                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full">
                                    {tokenName}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="text-gray-900 text-xl mb-2">
                                    {tokenName}
                                </div>
                                <div className="text-gray-700 text-base mb-4">
                                    {tokenDescription}
                                </div>
                                <div className="text-lg font-bold">
                                    {ethers.formatUnits(price, "ether")}{" "}
                                    ETH
                                </div>
                                <div className="text-gray-600 text-sm mt-2">
                                    #{tokenId}
                                </div>
                                <div className="text-gray-600 text-sm">
                                    Owned By {formattedSeller}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            {notificationDetails && (
                <Notification
                    details={notificationDetails}
                    onClose={handleNotificationClose}
                />
            )}
        </div>
    );
};

export default NFTCard;