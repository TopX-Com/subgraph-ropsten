import { LootBox, LootBoxItem, Token, Order, OrderReceipt, Transfer, Account } from '../generated/schema';
import { addLootBox, addLootBoxItem, mintLootBox, mintItem, TransferSingle, TransferBatch, EthTopxTransfer } from '../generated/Topx/Topx';
import { OrderBought, OrderCreated, OrderCanceled, MarketplaceEthTransfer } from '../generated/Marketplace/Marketplace';
import { BigInt } from "@graphprotocol/graph-ts";

let BI_ONE = BigInt.fromI32(1)

export function handleAddLootBox(event: addLootBox): void {
    let lootBox = new LootBox(event.params._packid.toHex())
    lootBox.boxId = event.params._packid
    lootBox.fromId = event.params._from
    let creator = getAccount(event.params._creator.toHex(), event.block.timestamp)
    creator.created = creator.created.plus(BI_ONE)
    creator.save()
    lootBox.creator = creator.id
    lootBox.price = event.params._price
    lootBox.supply = event.params._supply
    lootBox.count = BigInt.fromI32(0)
    lootBox.items = new Array<string>(0)
    lootBox.save()
}

export function handleAddLootBoxItem(event: addLootBoxItem): void {
    let lootBoxItem = new LootBoxItem(event.params._itemid.toHex())
    lootBoxItem.itemId = event.params._itemid
    let lootBox = LootBox.load(event.params._packid.toHex())
    lootBoxItem.lootbox = lootBox.id
    lootBoxItem.fromId = event.params._from
    let artist = getAccount(event.params._artist.toHex(), event.block.timestamp)
    lootBoxItem.artist = artist.id
    lootBoxItem.supply = event.params._supply
    lootBoxItem.count = BigInt.fromI32(0)
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
  let to = getAccount(event.params.to.toHex(), event.block.timestamp)
  to.owns = to.owns.plus(BI_ONE)
  let toTokens = to.tokens
  toTokens.push(token.id)
  to.tokens = toTokens
  to.save()
  let from = getAccount(event.params.from.toHex(), event.block.timestamp)
  from.owns = from.owns.minus(BI_ONE)
  let fromTokens = from.tokens
  let index = fromTokens.indexOf(token.id)
  if (index > -1) {
    fromTokens.splice(index, 1)
  }
  from.tokens = fromTokens
  from.save()
  token.owner = to.id
  token.save()
}

export function handleTransferBatch(event: TransferBatch): void {
  let ids = event.params.ids
  for (let i=0; i<ids.length; i++) {
    let token = Token.load(ids[i].toHex())
    let to = getAccount(event.params.to.toHex(), event.block.timestamp)
    to.owns = to.owns.plus(BI_ONE)
    let toTokens = to.tokens
    toTokens.push(token.id)
    to.tokens = toTokens
    to.save()
    let from = getAccount(event.params.from.toHex(), event.block.timestamp)
    from.owns = from.owns.minus(BI_ONE)
    let fromTokens = from.tokens
    let index = fromTokens.indexOf(token.id)
    if (index > -1) {
      fromTokens.splice(index, 1)
    }
    from.tokens = fromTokens
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
  let seller = getAccount(event.params.seller.toHex(), event.block.timestamp)
  seller.selling = seller.selling.plus(BI_ONE)
  seller.save()
  order.seller = seller.id
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
  let buyer = getAccount(event.params.account.toHex(), event.block.timestamp)
  buyer.bought = buyer.bought.plus(BI_ONE)
  buyer.save()
  let seller = getAccount(order.seller, event.block.timestamp)
  seller.sold = seller.sold.plus(BI_ONE)
  seller.selling = seller.selling.minus(BI_ONE)
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
  let seller = getAccount(order.seller, event.block.timestamp)
  seller.selling = seller.selling.minus(BI_ONE)
  seller.save()
  order.closed = true
  order.save()
}

export function handleEthTopxTransfer(event: EthTopxTransfer): void {
  let transfer = new Transfer(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  transfer.amount = event.params._amount
  transfer.from = getAccount(event.params._from.toHex(), event.block.timestamp).id
  transfer.to = getAccount(event.params._to.toHex(), event.block.timestamp).id
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
  transfer.from = getAccount(event.params._from.toHex(), event.block.timestamp).id
  transfer.to = getAccount(event.params._to.toHex(), event.block.timestamp).id
  let token = Token.load(event.params._tokenId.toHex())
  transfer.token = token.id
  transfer.type = 1
  transfer.action = event.params._action
  transfer.timestamp = event.block.timestamp
  transfer.save()
}

export function getAccount(ethAddress: string, timestamp: BigInt): Account {
  let account = Account.load(ethAddress)
  if (account === null) {
    account = new Account(ethAddress)
    account.bought = BigInt.fromI32(0)
    account.sold = BigInt.fromI32(0)
    account.selling = BigInt.fromI32(0)
    account.created = BigInt.fromI32(0)
    account.owns = BigInt.fromI32(0)
    account.joined = timestamp
    account.tokens = []
    account.save()
  }
  return account!
}