import { LootBox, LootBoxItem, Token, Order, OrderReceipt, Transfer, Account } from '../generated/schema';
import { addLootBox, addLootBoxItem, mintLootBox, mintItem, TransferSingle, TransferBatch, EthTopxTransfer } from '../generated/Topx/Topx';
import { OrderBought, OrderCreated, OrderCanceled, MarketplaceEthTransfer } from '../generated/Marketplace/Marketplace';
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
    let items = lootBox.items
    items.push(lootBoxItem.id)
    lootBox.items = items
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
  let to = getAccount(event.params.to.toHex())
  to.owns = to.owns.plus(new BigInt(1))
  to.save()
  let from = getAccount(event.params.from.toHex())
  from.owns = from.owns.minus(new BigInt(1))
  from.save()
  token.owner = to.id
  token.save()
}

export function handleTransferBatch(event: TransferBatch): void {
  let ids = event.params.ids
  for (let i=0; i<ids.length; i++) {
    let token = Token.load(ids[i].toHex())
    let to = getAccount(event.params.to.toHex())
    to.owns = to.owns.plus(new BigInt(1))
    to.save()
    let from = getAccount(event.params.from.toHex())
    from.owns = from.owns.minus(new BigInt(1))
    from.save()
    token.owner = to.id
    token.save()
  }
}

export function handleOrderCreated(event: OrderCreated): void {
  let order = Order.load(event.params.tokenId.toHex())
  if (order == null) {
    order = new Order(event.params.tokenId.toHex())
  }
  let token = Token.load(event.params.tokenId.toHex())
  order.seller = getAccount(event.params.seller.toHex()).id
  order.token = token.id
  order.lootbox = token.lootbox
  order.item = token.item
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
  let buyer = getAccount(event.params.account.toHex())
  buyer.bought = buyer.bought.plus(new BigInt(1))
  buyer.save()
  let seller = getAccount(order.seller)
  seller.sold = seller.sold.minus(new BigInt(1))
  seller.save()
  orderReceipt.seller = seller.id
  orderReceipt.buyer = buyer.id
  orderReceipt.lootbox = order.lootbox
  orderReceipt.item = order.item
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

export function handleEthTopxTransfer(event: EthTopxTransfer): void {
  let transfer = new Transfer(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  transfer.amount = event.params._amount
  transfer.address = getAccount(event.params._account.toHex()).id
  let token = Token.load(event.params._tokenId.toHex())
  transfer.token = token.id
  transfer.type = 0
  transfer.action = event.params._action
  transfer.timestamp = event.block.timestamp
  transfer.save()
}

export function handleMarketplaceEthTransfer(event: MarketplaceEthTransfer): void {
  let transfer = new Transfer(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  transfer.amount = event.params._amount
  transfer.address = getAccount(event.params._account.toHex()).id
  let token = Token.load(event.params._tokenId.toHex())
  transfer.token = token.id
  transfer.type = 1
  transfer.action = event.params._action
  transfer.timestamp = event.block.timestamp
  transfer.save()
}

export function getAccount(ethAddress: string): (Account | null) {
  let account = Account.load(ethAddress)
  if (account == null) {
    account = new Account(ethAddress)
    account.bought = new BigInt(0)
    account.sold = new BigInt(0)
    account.owns = new BigInt(0)
    account.save()
  }
  return account
}