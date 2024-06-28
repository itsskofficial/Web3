import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ItemBought as ItemBoughtEvent,
  ItemListed as ItemListedEvent,
  ItemUpdated as ItemUpdatedEvent,
  ListingCanceled as ListingCanceledEvent,
} from "../generated/NFTMarketplace/NFTMarketplace"
import {
  ItemBought,
  ItemListed,
  ItemUpdated,
  ListingCanceled,
  ActiveItem
} from "../generated/schema"

export function handleItemBought(event: ItemBoughtEvent): void {
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  )

  let entity = ItemBought.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  )

  if (!entity) {
		entity = new ItemBought(
			getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
		);
  }

  entity.buyer = event.params.buyer
  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  activeItem!.buyer = event.params.buyer

  activeItem!.save()
  entity.save()
}

export function handleItemListed(event: ItemListedEvent): void {
  let activeItem = ActiveItem.load(
		getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  let entity = ItemListed.load(
		getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

   if (!activeItem) {
		activeItem = new ActiveItem(
			getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
		);
   }
  
  if (!entity) {
		entity = new ItemListed(
			getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
		);
  }

  entity.seller = event.params.seller
  activeItem.seller = event.params.seller
  entity.nftAddress = event.params.nftAddress
  activeItem.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  activeItem.tokenId = event.params.tokenId
  entity.price = event.params.price
  activeItem.price = event.params.price
  activeItem.buyer = Address.fromString(
		"0x0000000000000000000000000000000000000000"
  );


  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  activeItem.save()
}

export function handleItemUpdated(event: ItemUpdatedEvent): void {
  let activeItem = ActiveItem.load(
		getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  let entity = ItemUpdated.load(
		getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!entity) {
		entity = new ItemUpdated(
			getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
		);
  }

  entity.seller = event.params.seller
  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  entity.newPrice = event.params.newPrice
  
  activeItem!.price = event.params.newPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  activeItem!.save()
}

export function handleListingCanceled(event: ListingCanceledEvent): void {
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  )

  let entity = ListingCanceled.load(
		getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!entity) {
		entity = new ListingCanceled(
			getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
		);
  }

  entity.seller = event.params.seller
  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId

  activeItem!.buyer = Address.fromString("0x000000000000000000000000000000000000dEaD")

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString()
}