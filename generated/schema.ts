// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class LootBox extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save LootBox entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save LootBox entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("LootBox", id.toString(), this);
  }

  static load(id: string): LootBox | null {
    return store.get("LootBox", id) as LootBox | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get boxId(): BigInt | null {
    let value = this.get("boxId");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set boxId(value: BigInt | null) {
    if (value === null) {
      this.unset("boxId");
    } else {
      this.set("boxId", Value.fromBigInt(value as BigInt));
    }
  }

  get fromId(): BigInt | null {
    let value = this.get("fromId");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set fromId(value: BigInt | null) {
    if (value === null) {
      this.unset("fromId");
    } else {
      this.set("fromId", Value.fromBigInt(value as BigInt));
    }
  }

  get toId(): BigInt | null {
    let value = this.get("toId");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set toId(value: BigInt | null) {
    if (value === null) {
      this.unset("toId");
    } else {
      this.set("toId", Value.fromBigInt(value as BigInt));
    }
  }

  get price(): BigInt | null {
    let value = this.get("price");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set price(value: BigInt | null) {
    if (value === null) {
      this.unset("price");
    } else {
      this.set("price", Value.fromBigInt(value as BigInt));
    }
  }

  get supply(): BigInt | null {
    let value = this.get("supply");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set supply(value: BigInt | null) {
    if (value === null) {
      this.unset("supply");
    } else {
      this.set("supply", Value.fromBigInt(value as BigInt));
    }
  }

  get count(): BigInt | null {
    let value = this.get("count");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set count(value: BigInt | null) {
    if (value === null) {
      this.unset("count");
    } else {
      this.set("count", Value.fromBigInt(value as BigInt));
    }
  }

  get items(): Array<string | null> {
    let value = this.get("items");
    return value.toStringArray();
  }

  set items(value: Array<string | null>) {
    this.set("items", Value.fromStringArray(value));
  }
}

export class LootBoxItem extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save LootBoxItem entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save LootBoxItem entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("LootBoxItem", id.toString(), this);
  }

  static load(id: string): LootBoxItem | null {
    return store.get("LootBoxItem", id) as LootBoxItem | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get itemId(): BigInt | null {
    let value = this.get("itemId");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set itemId(value: BigInt | null) {
    if (value === null) {
      this.unset("itemId");
    } else {
      this.set("itemId", Value.fromBigInt(value as BigInt));
    }
  }

  get lootbox(): string | null {
    let value = this.get("lootbox");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set lootbox(value: string | null) {
    if (value === null) {
      this.unset("lootbox");
    } else {
      this.set("lootbox", Value.fromString(value as string));
    }
  }

  get fromId(): BigInt | null {
    let value = this.get("fromId");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set fromId(value: BigInt | null) {
    if (value === null) {
      this.unset("fromId");
    } else {
      this.set("fromId", Value.fromBigInt(value as BigInt));
    }
  }

  get toId(): BigInt | null {
    let value = this.get("toId");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set toId(value: BigInt | null) {
    if (value === null) {
      this.unset("toId");
    } else {
      this.set("toId", Value.fromBigInt(value as BigInt));
    }
  }

  get supply(): BigInt | null {
    let value = this.get("supply");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set supply(value: BigInt | null) {
    if (value === null) {
      this.unset("supply");
    } else {
      this.set("supply", Value.fromBigInt(value as BigInt));
    }
  }

  get count(): BigInt | null {
    let value = this.get("count");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set count(value: BigInt | null) {
    if (value === null) {
      this.unset("count");
    } else {
      this.set("count", Value.fromBigInt(value as BigInt));
    }
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Token entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Token entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Token", id.toString(), this);
  }

  static load(id: string): Token | null {
    return store.get("Token", id) as Token | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes | null {
    let value = this.get("owner");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set owner(value: Bytes | null) {
    if (value === null) {
      this.unset("owner");
    } else {
      this.set("owner", Value.fromBytes(value as Bytes));
    }
  }

  get type(): i32 {
    let value = this.get("type");
    return value.toI32();
  }

  set type(value: i32) {
    this.set("type", Value.fromI32(value));
  }

  get lootbox(): string | null {
    let value = this.get("lootbox");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set lootbox(value: string | null) {
    if (value === null) {
      this.unset("lootbox");
    } else {
      this.set("lootbox", Value.fromString(value as string));
    }
  }

  get item(): string | null {
    let value = this.get("item");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set item(value: string | null) {
    if (value === null) {
      this.unset("item");
    } else {
      this.set("item", Value.fromString(value as string));
    }
  }
}

export class Order extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Order entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Order entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Order", id.toString(), this);
  }

  static load(id: string): Order | null {
    return store.get("Order", id) as Order | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get seller(): Bytes {
    let value = this.get("seller");
    return value.toBytes();
  }

  set seller(value: Bytes) {
    this.set("seller", Value.fromBytes(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get price(): BigInt {
    let value = this.get("price");
    return value.toBigInt();
  }

  set price(value: BigInt) {
    this.set("price", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get closed(): boolean {
    let value = this.get("closed");
    return value.toBoolean();
  }

  set closed(value: boolean) {
    this.set("closed", Value.fromBoolean(value));
  }
}

export class OrderReceipt extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save OrderReceipt entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save OrderReceipt entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("OrderReceipt", id.toString(), this);
  }

  static load(id: string): OrderReceipt | null {
    return store.get("OrderReceipt", id) as OrderReceipt | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get seller(): Bytes {
    let value = this.get("seller");
    return value.toBytes();
  }

  set seller(value: Bytes) {
    this.set("seller", Value.fromBytes(value));
  }

  get buyer(): Bytes {
    let value = this.get("buyer");
    return value.toBytes();
  }

  set buyer(value: Bytes) {
    this.set("buyer", Value.fromBytes(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get price(): BigInt {
    let value = this.get("price");
    return value.toBigInt();
  }

  set price(value: BigInt) {
    this.set("price", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class Transfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Transfer entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Transfer entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Transfer", id.toString(), this);
  }

  static load(id: string): Transfer | null {
    return store.get("Transfer", id) as Transfer | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get type(): i32 {
    let value = this.get("type");
    return value.toI32();
  }

  set type(value: i32) {
    this.set("type", Value.fromI32(value));
  }

  get action(): i32 {
    let value = this.get("action");
    return value.toI32();
  }

  set action(value: i32) {
    this.set("action", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }
}
