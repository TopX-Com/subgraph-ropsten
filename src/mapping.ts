import { LootBox, LootBoxItem, Token, Order, OrderReceipt } from '../generated/schema';
import { addLootBox, addLootBoxItem, mintLootBox, mintItem, TransferSingle, TransferBatch } from '../generated/Topx/Topx';
import { OrderBought, OrderCreated, OrderCanceled } from '../generated/Marketplace/Marketplace';
import { BigInt } from "@graphprotocol/graph-ts";

export function handleAddLootBox(event: addLootBox): void {
    let lootBox = new LootBox(event.params._packid.toHex())
    lootBox.boxId = event.params._packid
    lootBox.fromId = event.params._from
    lootBox.toId = event.params._to
    lootBox.price = event.params._price
    lootBox.supply = event.params._supply
    lootBox.count = new BigInt(0)
    lootBox.items = new Array<string>(0)
    lootBox.save()
}

export function handleAddLootBoxItem(event: addLootBoxItem): void {
    let lootBoxItem = new LootBoxItem(event.params._itemid.toHex())
    lootBoxItem.itemId = event.params._itemid
    let lootBox = LootBox.load(event.params._packid.toHex())
    lootBoxItem.lootbox = lootBox.id
    lootBoxItem.fromId = event.params._from
    lootBoxItem.toId = event.params._to
    lootBoxItem.supply = event.params._supply
    lootBoxItem.count = new BigInt(0)
    lootBoxItem.save()
    // lootbox array update
    let items = lootBox.items
    items.push(lootBoxItem.id)
    lootBox.items = items
    // save
    lootBox.save()
}

export function handleMintLootBox(event: mintLootBox): void {
  let lootBox = LootBox.load(event.params._id.toHex())
  lootBox.count = event.params._count
  lootBox.save()
  let token = new Token(event.params._tokenId.toHex())
  token.type = 1
  token.lootbox = lootBox.id
  token.save()
}

export function handleMintItem(event: mintItem): void {
  let token = new Token(event.params._tokenId.toHex())
  token.type = 2
  let lootBoxItem = LootBoxItem.load(event.params._id.toHex())
  token.item = lootBoxItem.id
  token.save()
}

export function handleTransferSingle(event: TransferSingle): void {
  let token = Token.load(event.params.id.toHex())
  token.owner = event.params.to
  token.save()
}

export function handleTransferBatch(event: TransferBatch): void {
  let ids = event.params.ids
  for (let i=0; i<ids.length; i++) {
    let token = Token.load(ids[i].toHex())
    token.owner = event.params.to
    token.save()
  }
}

export function handleOrderCreated(event: OrderCreated): void {
  let order = Order.load(event.params.tokenId.toHex())
  if (order == null) {
    order = new Order(event.params.tokenId.toHex())
  }
  let token = Token.load(event.params.tokenId.toHex())
  order.seller = event.params.seller
  order.token = token.id
  order.price = event.params.price
  order.timestamp = event.block.timestamp
  order.closed = false
  order.save()
}

export function handleOrderBought(event: OrderBought): void {
  let order = Order.load(event.params.tokenId.toHex())
  order.closed = true
  order.save()
  let token = Token.load(event.params.tokenId.toHex())
  let orderReceipt = new OrderReceipt(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  
  orderReceipt.seller = order.seller
  orderReceipt.buyer = event.params.account
  orderReceipt.price = order.price
  orderReceipt.token = token.id
  orderReceipt.timestamp = event.block.timestamp
  orderReceipt.save()
}

export function handleOrderCanceled(event: OrderCanceled): void {
  let order = Order.load(event.params.tokenId.toHex())
  order.closed = true
  order.save()
}
