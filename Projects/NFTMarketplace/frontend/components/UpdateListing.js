import {useState} from "react";
import {useWeb3Contract} from "react-moralis";
import nftMarketplaceAbi from "../constants/NftMarketplace.json";
import {ethers} from "ethers";
import Notification from "./Notification";
import Modal from "./Modal";
import Input from "./Input";

const UpdateListing = ({ nftAddress, tokenId, isVisible }) => {
    const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0);
    const [notificationDetails, setNotificationDetails] = useState(null);

    const handleUpdateListingSuccess = async (transaction) => {
        await transaction.wait(1)
        setNotificationDetails({
            type: "success",
            message: "Listing updated - please refresh (and move blocks)",
            title: "Listing Updated",
        });
        onClose && onClose();
        setPriceToUpdateListingWith("0");
    }

    const {runContractFunction: updateListing} = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "updateListing",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
            newPrice: ethers.parseEther(priceToUpdateListingWith || "0"),
        },
    });

    return (
        <>
            <Modal
                isVisible={isVisible}
                onCancel={onClose}
                onCloseButtonPressed={onClose}
                onOk={() => {
                    updateListing({
                        onError: (error) => {
                            console.log(error);
                        },
                        onSuccess: handleUpdateListingSuccess,
                    });
                }}
            >
                <Input
                    label="Update listing price in L1 Currency (ETH)"
                    name="New listing price"
                    type="number"
                    onChange={(event) => {
                        setPriceToUpdateListingWith(event.target.value);
                    }}
                />
            </Modal>
            {notificationDetails && (
                <Notification
                    details={notificationDetails}
                    onClose={() => setNotificationDetails(null)}
                />
            )}
        </>
    );
};

export default UpdateListing