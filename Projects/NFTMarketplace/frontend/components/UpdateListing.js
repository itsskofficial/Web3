import {useState, useEffect} from "react";
import {useWriteContract} from "wagmi";
import nftMarketplaceAbi from "../constants/NftMarketplace.json";
import {ethers} from "ethers";
import Notification from "./Notification";
import Modal from "./Modal";
import Input from "./Input";

const UpdateListing = ({
    nftAddress,
    tokenId,
    isVisible,
    onClose,
    marketplaceAddress,
}) => {
    const [priceToUpdateListingWith, setPriceToUpdateListingWith] =
        useState("0");
    const [notificationDetails, setNotificationDetails] = useState(null);

    const {writeContract, data, isSuccess, isError, error} =
        useWriteContract();

    useEffect(() => {
        if (isSuccess) {
            handleUpdateListingSuccess(data);
        }
    }, [isSuccess, data]);

    const handleUpdateListingSuccess = async (transaction) => {
        await transaction.wait(1);
        setNotificationDetails({
            type: "success",
            message: "Listing updated - please refresh (and move blocks)",
            title: "Listing Updated",
        });
        onClose && onClose();
        setPriceToUpdateListingWith("0");
    };

    const handleUpdateListing = () => {
        writeContract({
            abi: nftMarketplaceAbi,
            address: marketplaceAddress,
            functionName: "updateListing",
            args: [
                nftAddress,
                tokenId,
                ethers.parseEther(priceToUpdateListingWith),
            ],
        });
    };

    return (
        <>
            <Modal
                isVisible={isVisible}
                onCancel={onClose}
                onCloseButtonPressed={onClose}
                onOk={handleUpdateListing}
            >
                <Input
                    label="Update listing price in L1 Currency (ETH)"
                    name="New listing price"
                    type="number"
                    value={priceToUpdateListingWith}
                    onChange={(event) =>
                        setPriceToUpdateListingWith(event.target.value)
                    }
                />
            </Modal>
            {notificationDetails && (
                <Notification
                    details={notificationDetails}
                    onClose={() => setNotificationDetails(null)}
                />
            )}
            {isError && (
                <Notification
                    details={{
                        type: "error",
                        message: error?.message,
                        title: "Transaction Error",
                    }}
                    onClose={() => setNotificationDetails(null)}
                />
            )}
        </>
    );
};

export default UpdateListing;