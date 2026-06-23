// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64, fromHex, toHex } from "@mysten/sui/utils";
import { String } from "../../_dependencies/std/ascii/structs";
import { getTypeOrigin } from "../../_envs";
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
} from "../../_framework/reified";
import { composeSuiType, compressSuiType, FieldsWithTypes } from "../../_framework/util";

/* ============================== SwappedToVUsdEvent =============================== */

export function isSwappedToVUsdEvent(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "events::SwappedToVUsdEvent")}::events::SwappedToVUsdEvent`;
}

export interface SwappedToVUsdEventFields {
  token: ToField<String>;
  amount: ToField<"u64">;
  vusdAmount: ToField<"u64">;
  fee: ToField<"u64">;
}

export type SwappedToVUsdEventReified = Reified<SwappedToVUsdEvent, SwappedToVUsdEventFields>;

export type SwappedToVUsdEventJSONField = {
  token: string;
  amount: string;
  vusdAmount: string;
  fee: string;
};

export type SwappedToVUsdEventJSON = {
  $typeName: typeof SwappedToVUsdEvent.$typeName;
  $typeArgs: [];
} & SwappedToVUsdEventJSONField;

export class SwappedToVUsdEvent implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::events::SwappedToVUsdEvent` {
    return `${getTypeOrigin("bridge", "events::SwappedToVUsdEvent")}::events::SwappedToVUsdEvent` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof SwappedToVUsdEvent.$typeName = SwappedToVUsdEvent.$typeName;
  readonly $fullTypeName: `${string}::events::SwappedToVUsdEvent`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof SwappedToVUsdEvent.$isPhantom = SwappedToVUsdEvent.$isPhantom;

  readonly token: ToField<String>;
  readonly amount: ToField<"u64">;
  readonly vusdAmount: ToField<"u64">;
  readonly fee: ToField<"u64">;

  private constructor(typeArgs: [], fields: SwappedToVUsdEventFields) {
    this.$fullTypeName = composeSuiType(
      SwappedToVUsdEvent.$typeName,
      ...typeArgs
    ) as `${string}::events::SwappedToVUsdEvent`;
    this.$typeArgs = typeArgs;

    this.token = fields.token;
    this.amount = fields.amount;
    this.vusdAmount = fields.vusdAmount;
    this.fee = fields.fee;
  }

  static reified(): SwappedToVUsdEventReified {
    const reifiedBcs = SwappedToVUsdEvent.bcs;
    return {
      get typeName() {
        return SwappedToVUsdEvent.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(SwappedToVUsdEvent.$typeName, ...[]) as `${string}::events::SwappedToVUsdEvent`;
      },
      typeArgs: [] as [],
      isPhantom: SwappedToVUsdEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SwappedToVUsdEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SwappedToVUsdEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SwappedToVUsdEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SwappedToVUsdEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SwappedToVUsdEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => SwappedToVUsdEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => SwappedToVUsdEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SwappedToVUsdEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => SwappedToVUsdEvent.fetch(client, id),
      new: (fields: SwappedToVUsdEventFields) => {
        return new SwappedToVUsdEvent([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): SwappedToVUsdEventReified {
    return SwappedToVUsdEvent.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<SwappedToVUsdEvent>> {
    return phantom(SwappedToVUsdEvent.reified());
  }

  static get p(): PhantomReified<ToTypeStr<SwappedToVUsdEvent>> {
    return SwappedToVUsdEvent.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("SwappedToVUsdEvent", {
      token: String.bcs,
      amount: bcs.u64(),
      vusd_amount: bcs.u64(),
      fee: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof SwappedToVUsdEvent.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof SwappedToVUsdEvent.instantiateBcs> {
    if (!SwappedToVUsdEvent.cachedBcs) {
      SwappedToVUsdEvent.cachedBcs = SwappedToVUsdEvent.instantiateBcs();
    }
    return SwappedToVUsdEvent.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): SwappedToVUsdEvent {
    return SwappedToVUsdEvent.reified().new({
      token: decodeFromFields(String.reified(), fields.token),
      amount: decodeFromFields("u64", fields.amount),
      vusdAmount: decodeFromFields("u64", fields.vusd_amount),
      fee: decodeFromFields("u64", fields.fee),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SwappedToVUsdEvent {
    if (!isSwappedToVUsdEvent(item.type)) {
      throw new Error("not a SwappedToVUsdEvent type");
    }

    return SwappedToVUsdEvent.reified().new({
      token: decodeFromFieldsWithTypes(String.reified(), item.fields.token),
      amount: decodeFromFieldsWithTypes("u64", item.fields.amount),
      vusdAmount: decodeFromFieldsWithTypes("u64", item.fields.vusd_amount),
      fee: decodeFromFieldsWithTypes("u64", item.fields.fee),
    });
  }

  static fromBcs(data: Uint8Array): SwappedToVUsdEvent {
    return SwappedToVUsdEvent.fromFields(SwappedToVUsdEvent.bcs.parse(data));
  }

  toJSONField(): SwappedToVUsdEventJSONField {
    return {
      token: this.token,
      amount: this.amount.toString(),
      vusdAmount: this.vusdAmount.toString(),
      fee: this.fee.toString(),
    };
  }

  toJSON(): SwappedToVUsdEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): SwappedToVUsdEvent {
    return SwappedToVUsdEvent.reified().new({
      token: decodeFromJSONField(String.reified(), field.token),
      amount: decodeFromJSONField("u64", field.amount),
      vusdAmount: decodeFromJSONField("u64", field.vusdAmount),
      fee: decodeFromJSONField("u64", field.fee),
    });
  }

  static fromJSON(json: Record<string, any>): SwappedToVUsdEvent {
    if (json.$typeName !== SwappedToVUsdEvent.$typeName) {
      throw new Error(
        `not a SwappedToVUsdEvent json object: expected '${SwappedToVUsdEvent.$typeName}' but got '${json.$typeName}'`
      );
    }

    return SwappedToVUsdEvent.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): SwappedToVUsdEvent {
    if (!isSwappedToVUsdEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SwappedToVUsdEvent object`);
    }
    return SwappedToVUsdEvent.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SwappedToVUsdEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SwappedToVUsdEvent {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isSwappedToVUsdEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SwappedToVUsdEvent object`);
    }
    return SwappedToVUsdEvent.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SwappedToVUsdEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SwappedToVUsdEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isSwappedToVUsdEvent(data.bcs.type)) {
        throw new Error(`object at is not a SwappedToVUsdEvent object`);
      }

      return SwappedToVUsdEvent.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return SwappedToVUsdEvent.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<SwappedToVUsdEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isSwappedToVUsdEvent(object.type)) {
      throw new Error(`object at id ${id} is not a SwappedToVUsdEvent object`);
    }
    return SwappedToVUsdEvent.fromBcs(object.content);
  }
}

/* ============================== SwappedFromVUsdEvent =============================== */

export function isSwappedFromVUsdEvent(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "events::SwappedFromVUsdEvent")}::events::SwappedFromVUsdEvent`;
}

export interface SwappedFromVUsdEventFields {
  token: ToField<String>;
  amount: ToField<"u64">;
  vusdAmount: ToField<"u64">;
  fee: ToField<"u64">;
}

export type SwappedFromVUsdEventReified = Reified<SwappedFromVUsdEvent, SwappedFromVUsdEventFields>;

export type SwappedFromVUsdEventJSONField = {
  token: string;
  amount: string;
  vusdAmount: string;
  fee: string;
};

export type SwappedFromVUsdEventJSON = {
  $typeName: typeof SwappedFromVUsdEvent.$typeName;
  $typeArgs: [];
} & SwappedFromVUsdEventJSONField;

export class SwappedFromVUsdEvent implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::events::SwappedFromVUsdEvent` {
    return `${getTypeOrigin("bridge", "events::SwappedFromVUsdEvent")}::events::SwappedFromVUsdEvent` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof SwappedFromVUsdEvent.$typeName = SwappedFromVUsdEvent.$typeName;
  readonly $fullTypeName: `${string}::events::SwappedFromVUsdEvent`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof SwappedFromVUsdEvent.$isPhantom = SwappedFromVUsdEvent.$isPhantom;

  readonly token: ToField<String>;
  readonly amount: ToField<"u64">;
  readonly vusdAmount: ToField<"u64">;
  readonly fee: ToField<"u64">;

  private constructor(typeArgs: [], fields: SwappedFromVUsdEventFields) {
    this.$fullTypeName = composeSuiType(
      SwappedFromVUsdEvent.$typeName,
      ...typeArgs
    ) as `${string}::events::SwappedFromVUsdEvent`;
    this.$typeArgs = typeArgs;

    this.token = fields.token;
    this.amount = fields.amount;
    this.vusdAmount = fields.vusdAmount;
    this.fee = fields.fee;
  }

  static reified(): SwappedFromVUsdEventReified {
    const reifiedBcs = SwappedFromVUsdEvent.bcs;
    return {
      get typeName() {
        return SwappedFromVUsdEvent.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(SwappedFromVUsdEvent.$typeName, ...[]) as `${string}::events::SwappedFromVUsdEvent`;
      },
      typeArgs: [] as [],
      isPhantom: SwappedFromVUsdEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SwappedFromVUsdEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SwappedFromVUsdEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SwappedFromVUsdEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SwappedFromVUsdEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SwappedFromVUsdEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => SwappedFromVUsdEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => SwappedFromVUsdEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SwappedFromVUsdEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => SwappedFromVUsdEvent.fetch(client, id),
      new: (fields: SwappedFromVUsdEventFields) => {
        return new SwappedFromVUsdEvent([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): SwappedFromVUsdEventReified {
    return SwappedFromVUsdEvent.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<SwappedFromVUsdEvent>> {
    return phantom(SwappedFromVUsdEvent.reified());
  }

  static get p(): PhantomReified<ToTypeStr<SwappedFromVUsdEvent>> {
    return SwappedFromVUsdEvent.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("SwappedFromVUsdEvent", {
      token: String.bcs,
      amount: bcs.u64(),
      vusd_amount: bcs.u64(),
      fee: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof SwappedFromVUsdEvent.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof SwappedFromVUsdEvent.instantiateBcs> {
    if (!SwappedFromVUsdEvent.cachedBcs) {
      SwappedFromVUsdEvent.cachedBcs = SwappedFromVUsdEvent.instantiateBcs();
    }
    return SwappedFromVUsdEvent.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): SwappedFromVUsdEvent {
    return SwappedFromVUsdEvent.reified().new({
      token: decodeFromFields(String.reified(), fields.token),
      amount: decodeFromFields("u64", fields.amount),
      vusdAmount: decodeFromFields("u64", fields.vusd_amount),
      fee: decodeFromFields("u64", fields.fee),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SwappedFromVUsdEvent {
    if (!isSwappedFromVUsdEvent(item.type)) {
      throw new Error("not a SwappedFromVUsdEvent type");
    }

    return SwappedFromVUsdEvent.reified().new({
      token: decodeFromFieldsWithTypes(String.reified(), item.fields.token),
      amount: decodeFromFieldsWithTypes("u64", item.fields.amount),
      vusdAmount: decodeFromFieldsWithTypes("u64", item.fields.vusd_amount),
      fee: decodeFromFieldsWithTypes("u64", item.fields.fee),
    });
  }

  static fromBcs(data: Uint8Array): SwappedFromVUsdEvent {
    return SwappedFromVUsdEvent.fromFields(SwappedFromVUsdEvent.bcs.parse(data));
  }

  toJSONField(): SwappedFromVUsdEventJSONField {
    return {
      token: this.token,
      amount: this.amount.toString(),
      vusdAmount: this.vusdAmount.toString(),
      fee: this.fee.toString(),
    };
  }

  toJSON(): SwappedFromVUsdEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): SwappedFromVUsdEvent {
    return SwappedFromVUsdEvent.reified().new({
      token: decodeFromJSONField(String.reified(), field.token),
      amount: decodeFromJSONField("u64", field.amount),
      vusdAmount: decodeFromJSONField("u64", field.vusdAmount),
      fee: decodeFromJSONField("u64", field.fee),
    });
  }

  static fromJSON(json: Record<string, any>): SwappedFromVUsdEvent {
    if (json.$typeName !== SwappedFromVUsdEvent.$typeName) {
      throw new Error(
        `not a SwappedFromVUsdEvent json object: expected '${SwappedFromVUsdEvent.$typeName}' but got '${json.$typeName}'`
      );
    }

    return SwappedFromVUsdEvent.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): SwappedFromVUsdEvent {
    if (!isSwappedFromVUsdEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SwappedFromVUsdEvent object`);
    }
    return SwappedFromVUsdEvent.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SwappedFromVUsdEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SwappedFromVUsdEvent {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isSwappedFromVUsdEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SwappedFromVUsdEvent object`);
    }
    return SwappedFromVUsdEvent.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SwappedFromVUsdEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SwappedFromVUsdEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isSwappedFromVUsdEvent(data.bcs.type)) {
        throw new Error(`object at is not a SwappedFromVUsdEvent object`);
      }

      return SwappedFromVUsdEvent.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return SwappedFromVUsdEvent.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<SwappedFromVUsdEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isSwappedFromVUsdEvent(object.type)) {
      throw new Error(`object at id ${id} is not a SwappedFromVUsdEvent object`);
    }
    return SwappedFromVUsdEvent.fromBcs(object.content);
  }
}

/* ============================== TokensSentEvent =============================== */

export function isTokensSentEvent(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "events::TokensSentEvent")}::events::TokensSentEvent`;
}

export interface TokensSentEventFields {
  token: ToField<String>;
  vusdAmount: ToField<"u64">;
  sender: ToField<"address">;
  recipient: ToField<String>;
  destinationChainId: ToField<"u8">;
  receiveToken: ToField<String>;
  nonce: ToField<"u256">;
  messenger: ToField<"u8">;
}

export type TokensSentEventReified = Reified<TokensSentEvent, TokensSentEventFields>;

export type TokensSentEventJSONField = {
  token: string;
  vusdAmount: string;
  sender: string;
  recipient: string;
  destinationChainId: number;
  receiveToken: string;
  nonce: string;
  messenger: number;
};

export type TokensSentEventJSON = {
  $typeName: typeof TokensSentEvent.$typeName;
  $typeArgs: [];
} & TokensSentEventJSONField;

export class TokensSentEvent implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::events::TokensSentEvent` {
    return `${getTypeOrigin("bridge", "events::TokensSentEvent")}::events::TokensSentEvent` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof TokensSentEvent.$typeName = TokensSentEvent.$typeName;
  readonly $fullTypeName: `${string}::events::TokensSentEvent`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof TokensSentEvent.$isPhantom = TokensSentEvent.$isPhantom;

  readonly token: ToField<String>;
  readonly vusdAmount: ToField<"u64">;
  readonly sender: ToField<"address">;
  readonly recipient: ToField<String>;
  readonly destinationChainId: ToField<"u8">;
  readonly receiveToken: ToField<String>;
  readonly nonce: ToField<"u256">;
  readonly messenger: ToField<"u8">;

  private constructor(typeArgs: [], fields: TokensSentEventFields) {
    this.$fullTypeName = composeSuiType(TokensSentEvent.$typeName, ...typeArgs) as `${string}::events::TokensSentEvent`;
    this.$typeArgs = typeArgs;

    this.token = fields.token;
    this.vusdAmount = fields.vusdAmount;
    this.sender = fields.sender;
    this.recipient = fields.recipient;
    this.destinationChainId = fields.destinationChainId;
    this.receiveToken = fields.receiveToken;
    this.nonce = fields.nonce;
    this.messenger = fields.messenger;
  }

  static reified(): TokensSentEventReified {
    const reifiedBcs = TokensSentEvent.bcs;
    return {
      get typeName() {
        return TokensSentEvent.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(TokensSentEvent.$typeName, ...[]) as `${string}::events::TokensSentEvent`;
      },
      typeArgs: [] as [],
      isPhantom: TokensSentEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TokensSentEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TokensSentEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TokensSentEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TokensSentEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TokensSentEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => TokensSentEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => TokensSentEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TokensSentEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => TokensSentEvent.fetch(client, id),
      new: (fields: TokensSentEventFields) => {
        return new TokensSentEvent([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): TokensSentEventReified {
    return TokensSentEvent.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<TokensSentEvent>> {
    return phantom(TokensSentEvent.reified());
  }

  static get p(): PhantomReified<ToTypeStr<TokensSentEvent>> {
    return TokensSentEvent.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("TokensSentEvent", {
      token: String.bcs,
      vusd_amount: bcs.u64(),
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      recipient: String.bcs,
      destination_chain_id: bcs.u8(),
      receive_token: String.bcs,
      nonce: bcs.u256(),
      messenger: bcs.u8(),
    });
  }

  private static cachedBcs: ReturnType<typeof TokensSentEvent.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof TokensSentEvent.instantiateBcs> {
    if (!TokensSentEvent.cachedBcs) {
      TokensSentEvent.cachedBcs = TokensSentEvent.instantiateBcs();
    }
    return TokensSentEvent.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): TokensSentEvent {
    return TokensSentEvent.reified().new({
      token: decodeFromFields(String.reified(), fields.token),
      vusdAmount: decodeFromFields("u64", fields.vusd_amount),
      sender: decodeFromFields("address", fields.sender),
      recipient: decodeFromFields(String.reified(), fields.recipient),
      destinationChainId: decodeFromFields("u8", fields.destination_chain_id),
      receiveToken: decodeFromFields(String.reified(), fields.receive_token),
      nonce: decodeFromFields("u256", fields.nonce),
      messenger: decodeFromFields("u8", fields.messenger),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TokensSentEvent {
    if (!isTokensSentEvent(item.type)) {
      throw new Error("not a TokensSentEvent type");
    }

    return TokensSentEvent.reified().new({
      token: decodeFromFieldsWithTypes(String.reified(), item.fields.token),
      vusdAmount: decodeFromFieldsWithTypes("u64", item.fields.vusd_amount),
      sender: decodeFromFieldsWithTypes("address", item.fields.sender),
      recipient: decodeFromFieldsWithTypes(String.reified(), item.fields.recipient),
      destinationChainId: decodeFromFieldsWithTypes("u8", item.fields.destination_chain_id),
      receiveToken: decodeFromFieldsWithTypes(String.reified(), item.fields.receive_token),
      nonce: decodeFromFieldsWithTypes("u256", item.fields.nonce),
      messenger: decodeFromFieldsWithTypes("u8", item.fields.messenger),
    });
  }

  static fromBcs(data: Uint8Array): TokensSentEvent {
    return TokensSentEvent.fromFields(TokensSentEvent.bcs.parse(data));
  }

  toJSONField(): TokensSentEventJSONField {
    return {
      token: this.token,
      vusdAmount: this.vusdAmount.toString(),
      sender: this.sender,
      recipient: this.recipient,
      destinationChainId: this.destinationChainId,
      receiveToken: this.receiveToken,
      nonce: this.nonce.toString(),
      messenger: this.messenger,
    };
  }

  toJSON(): TokensSentEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): TokensSentEvent {
    return TokensSentEvent.reified().new({
      token: decodeFromJSONField(String.reified(), field.token),
      vusdAmount: decodeFromJSONField("u64", field.vusdAmount),
      sender: decodeFromJSONField("address", field.sender),
      recipient: decodeFromJSONField(String.reified(), field.recipient),
      destinationChainId: decodeFromJSONField("u8", field.destinationChainId),
      receiveToken: decodeFromJSONField(String.reified(), field.receiveToken),
      nonce: decodeFromJSONField("u256", field.nonce),
      messenger: decodeFromJSONField("u8", field.messenger),
    });
  }

  static fromJSON(json: Record<string, any>): TokensSentEvent {
    if (json.$typeName !== TokensSentEvent.$typeName) {
      throw new Error(
        `not a TokensSentEvent json object: expected '${TokensSentEvent.$typeName}' but got '${json.$typeName}'`
      );
    }

    return TokensSentEvent.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): TokensSentEvent {
    if (!isTokensSentEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a TokensSentEvent object`);
    }
    return TokensSentEvent.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link TokensSentEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): TokensSentEvent {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isTokensSentEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TokensSentEvent object`);
    }
    return TokensSentEvent.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link TokensSentEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): TokensSentEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isTokensSentEvent(data.bcs.type)) {
        throw new Error(`object at is not a TokensSentEvent object`);
      }

      return TokensSentEvent.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return TokensSentEvent.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<TokensSentEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isTokensSentEvent(object.type)) {
      throw new Error(`object at id ${id} is not a TokensSentEvent object`);
    }
    return TokensSentEvent.fromBcs(object.content);
  }
}

/* ============================== TokensReceivedEvent =============================== */

export function isTokensReceivedEvent(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "events::TokensReceivedEvent")}::events::TokensReceivedEvent`;
}

export interface TokensReceivedEventFields {
  token: ToField<String>;
  amount: ToField<"u64">;
  extraGasAmount: ToField<"u64">;
  recipient: ToField<"address">;
  nonce: ToField<"u256">;
  messenger: ToField<"u8">;
  message: ToField<String>;
}

export type TokensReceivedEventReified = Reified<TokensReceivedEvent, TokensReceivedEventFields>;

export type TokensReceivedEventJSONField = {
  token: string;
  amount: string;
  extraGasAmount: string;
  recipient: string;
  nonce: string;
  messenger: number;
  message: string;
};

export type TokensReceivedEventJSON = {
  $typeName: typeof TokensReceivedEvent.$typeName;
  $typeArgs: [];
} & TokensReceivedEventJSONField;

export class TokensReceivedEvent implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::events::TokensReceivedEvent` {
    return `${getTypeOrigin("bridge", "events::TokensReceivedEvent")}::events::TokensReceivedEvent` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof TokensReceivedEvent.$typeName = TokensReceivedEvent.$typeName;
  readonly $fullTypeName: `${string}::events::TokensReceivedEvent`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof TokensReceivedEvent.$isPhantom = TokensReceivedEvent.$isPhantom;

  readonly token: ToField<String>;
  readonly amount: ToField<"u64">;
  readonly extraGasAmount: ToField<"u64">;
  readonly recipient: ToField<"address">;
  readonly nonce: ToField<"u256">;
  readonly messenger: ToField<"u8">;
  readonly message: ToField<String>;

  private constructor(typeArgs: [], fields: TokensReceivedEventFields) {
    this.$fullTypeName = composeSuiType(
      TokensReceivedEvent.$typeName,
      ...typeArgs
    ) as `${string}::events::TokensReceivedEvent`;
    this.$typeArgs = typeArgs;

    this.token = fields.token;
    this.amount = fields.amount;
    this.extraGasAmount = fields.extraGasAmount;
    this.recipient = fields.recipient;
    this.nonce = fields.nonce;
    this.messenger = fields.messenger;
    this.message = fields.message;
  }

  static reified(): TokensReceivedEventReified {
    const reifiedBcs = TokensReceivedEvent.bcs;
    return {
      get typeName() {
        return TokensReceivedEvent.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(TokensReceivedEvent.$typeName, ...[]) as `${string}::events::TokensReceivedEvent`;
      },
      typeArgs: [] as [],
      isPhantom: TokensReceivedEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TokensReceivedEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TokensReceivedEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TokensReceivedEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TokensReceivedEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TokensReceivedEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => TokensReceivedEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => TokensReceivedEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TokensReceivedEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => TokensReceivedEvent.fetch(client, id),
      new: (fields: TokensReceivedEventFields) => {
        return new TokensReceivedEvent([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): TokensReceivedEventReified {
    return TokensReceivedEvent.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<TokensReceivedEvent>> {
    return phantom(TokensReceivedEvent.reified());
  }

  static get p(): PhantomReified<ToTypeStr<TokensReceivedEvent>> {
    return TokensReceivedEvent.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("TokensReceivedEvent", {
      token: String.bcs,
      amount: bcs.u64(),
      extra_gas_amount: bcs.u64(),
      recipient: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      nonce: bcs.u256(),
      messenger: bcs.u8(),
      message: String.bcs,
    });
  }

  private static cachedBcs: ReturnType<typeof TokensReceivedEvent.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof TokensReceivedEvent.instantiateBcs> {
    if (!TokensReceivedEvent.cachedBcs) {
      TokensReceivedEvent.cachedBcs = TokensReceivedEvent.instantiateBcs();
    }
    return TokensReceivedEvent.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): TokensReceivedEvent {
    return TokensReceivedEvent.reified().new({
      token: decodeFromFields(String.reified(), fields.token),
      amount: decodeFromFields("u64", fields.amount),
      extraGasAmount: decodeFromFields("u64", fields.extra_gas_amount),
      recipient: decodeFromFields("address", fields.recipient),
      nonce: decodeFromFields("u256", fields.nonce),
      messenger: decodeFromFields("u8", fields.messenger),
      message: decodeFromFields(String.reified(), fields.message),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TokensReceivedEvent {
    if (!isTokensReceivedEvent(item.type)) {
      throw new Error("not a TokensReceivedEvent type");
    }

    return TokensReceivedEvent.reified().new({
      token: decodeFromFieldsWithTypes(String.reified(), item.fields.token),
      amount: decodeFromFieldsWithTypes("u64", item.fields.amount),
      extraGasAmount: decodeFromFieldsWithTypes("u64", item.fields.extra_gas_amount),
      recipient: decodeFromFieldsWithTypes("address", item.fields.recipient),
      nonce: decodeFromFieldsWithTypes("u256", item.fields.nonce),
      messenger: decodeFromFieldsWithTypes("u8", item.fields.messenger),
      message: decodeFromFieldsWithTypes(String.reified(), item.fields.message),
    });
  }

  static fromBcs(data: Uint8Array): TokensReceivedEvent {
    return TokensReceivedEvent.fromFields(TokensReceivedEvent.bcs.parse(data));
  }

  toJSONField(): TokensReceivedEventJSONField {
    return {
      token: this.token,
      amount: this.amount.toString(),
      extraGasAmount: this.extraGasAmount.toString(),
      recipient: this.recipient,
      nonce: this.nonce.toString(),
      messenger: this.messenger,
      message: this.message,
    };
  }

  toJSON(): TokensReceivedEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): TokensReceivedEvent {
    return TokensReceivedEvent.reified().new({
      token: decodeFromJSONField(String.reified(), field.token),
      amount: decodeFromJSONField("u64", field.amount),
      extraGasAmount: decodeFromJSONField("u64", field.extraGasAmount),
      recipient: decodeFromJSONField("address", field.recipient),
      nonce: decodeFromJSONField("u256", field.nonce),
      messenger: decodeFromJSONField("u8", field.messenger),
      message: decodeFromJSONField(String.reified(), field.message),
    });
  }

  static fromJSON(json: Record<string, any>): TokensReceivedEvent {
    if (json.$typeName !== TokensReceivedEvent.$typeName) {
      throw new Error(
        `not a TokensReceivedEvent json object: expected '${TokensReceivedEvent.$typeName}' but got '${json.$typeName}'`
      );
    }

    return TokensReceivedEvent.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): TokensReceivedEvent {
    if (!isTokensReceivedEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a TokensReceivedEvent object`);
    }
    return TokensReceivedEvent.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link TokensReceivedEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): TokensReceivedEvent {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isTokensReceivedEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TokensReceivedEvent object`);
    }
    return TokensReceivedEvent.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link TokensReceivedEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): TokensReceivedEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isTokensReceivedEvent(data.bcs.type)) {
        throw new Error(`object at is not a TokensReceivedEvent object`);
      }

      return TokensReceivedEvent.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return TokensReceivedEvent.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<TokensReceivedEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isTokensReceivedEvent(object.type)) {
      throw new Error(`object at id ${id} is not a TokensReceivedEvent object`);
    }
    return TokensReceivedEvent.fromBcs(object.content);
  }
}

/* ============================== ReceiveFeeEvent =============================== */

export function isReceiveFeeEvent(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "events::ReceiveFeeEvent")}::events::ReceiveFeeEvent`;
}

export interface ReceiveFeeEventFields {
  userPaySui: ToField<"u64">;
  userPayStable: ToField<"u64">;
  totalPaySui: ToField<"u64">;
  bridgeFeeSui: ToField<"u64">;
  messengerFeeSui: ToField<"u64">;
  totalFeeSui: ToField<"u64">;
}

export type ReceiveFeeEventReified = Reified<ReceiveFeeEvent, ReceiveFeeEventFields>;

export type ReceiveFeeEventJSONField = {
  userPaySui: string;
  userPayStable: string;
  totalPaySui: string;
  bridgeFeeSui: string;
  messengerFeeSui: string;
  totalFeeSui: string;
};

export type ReceiveFeeEventJSON = {
  $typeName: typeof ReceiveFeeEvent.$typeName;
  $typeArgs: [];
} & ReceiveFeeEventJSONField;

export class ReceiveFeeEvent implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::events::ReceiveFeeEvent` {
    return `${getTypeOrigin("bridge", "events::ReceiveFeeEvent")}::events::ReceiveFeeEvent` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof ReceiveFeeEvent.$typeName = ReceiveFeeEvent.$typeName;
  readonly $fullTypeName: `${string}::events::ReceiveFeeEvent`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof ReceiveFeeEvent.$isPhantom = ReceiveFeeEvent.$isPhantom;

  readonly userPaySui: ToField<"u64">;
  readonly userPayStable: ToField<"u64">;
  readonly totalPaySui: ToField<"u64">;
  readonly bridgeFeeSui: ToField<"u64">;
  readonly messengerFeeSui: ToField<"u64">;
  readonly totalFeeSui: ToField<"u64">;

  private constructor(typeArgs: [], fields: ReceiveFeeEventFields) {
    this.$fullTypeName = composeSuiType(ReceiveFeeEvent.$typeName, ...typeArgs) as `${string}::events::ReceiveFeeEvent`;
    this.$typeArgs = typeArgs;

    this.userPaySui = fields.userPaySui;
    this.userPayStable = fields.userPayStable;
    this.totalPaySui = fields.totalPaySui;
    this.bridgeFeeSui = fields.bridgeFeeSui;
    this.messengerFeeSui = fields.messengerFeeSui;
    this.totalFeeSui = fields.totalFeeSui;
  }

  static reified(): ReceiveFeeEventReified {
    const reifiedBcs = ReceiveFeeEvent.bcs;
    return {
      get typeName() {
        return ReceiveFeeEvent.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(ReceiveFeeEvent.$typeName, ...[]) as `${string}::events::ReceiveFeeEvent`;
      },
      typeArgs: [] as [],
      isPhantom: ReceiveFeeEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ReceiveFeeEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ReceiveFeeEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ReceiveFeeEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ReceiveFeeEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ReceiveFeeEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => ReceiveFeeEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ReceiveFeeEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ReceiveFeeEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ReceiveFeeEvent.fetch(client, id),
      new: (fields: ReceiveFeeEventFields) => {
        return new ReceiveFeeEvent([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): ReceiveFeeEventReified {
    return ReceiveFeeEvent.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<ReceiveFeeEvent>> {
    return phantom(ReceiveFeeEvent.reified());
  }

  static get p(): PhantomReified<ToTypeStr<ReceiveFeeEvent>> {
    return ReceiveFeeEvent.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("ReceiveFeeEvent", {
      user_pay_sui: bcs.u64(),
      user_pay_stable: bcs.u64(),
      total_pay_sui: bcs.u64(),
      bridge_fee_sui: bcs.u64(),
      messenger_fee_sui: bcs.u64(),
      total_fee_sui: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof ReceiveFeeEvent.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof ReceiveFeeEvent.instantiateBcs> {
    if (!ReceiveFeeEvent.cachedBcs) {
      ReceiveFeeEvent.cachedBcs = ReceiveFeeEvent.instantiateBcs();
    }
    return ReceiveFeeEvent.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): ReceiveFeeEvent {
    return ReceiveFeeEvent.reified().new({
      userPaySui: decodeFromFields("u64", fields.user_pay_sui),
      userPayStable: decodeFromFields("u64", fields.user_pay_stable),
      totalPaySui: decodeFromFields("u64", fields.total_pay_sui),
      bridgeFeeSui: decodeFromFields("u64", fields.bridge_fee_sui),
      messengerFeeSui: decodeFromFields("u64", fields.messenger_fee_sui),
      totalFeeSui: decodeFromFields("u64", fields.total_fee_sui),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ReceiveFeeEvent {
    if (!isReceiveFeeEvent(item.type)) {
      throw new Error("not a ReceiveFeeEvent type");
    }

    return ReceiveFeeEvent.reified().new({
      userPaySui: decodeFromFieldsWithTypes("u64", item.fields.user_pay_sui),
      userPayStable: decodeFromFieldsWithTypes("u64", item.fields.user_pay_stable),
      totalPaySui: decodeFromFieldsWithTypes("u64", item.fields.total_pay_sui),
      bridgeFeeSui: decodeFromFieldsWithTypes("u64", item.fields.bridge_fee_sui),
      messengerFeeSui: decodeFromFieldsWithTypes("u64", item.fields.messenger_fee_sui),
      totalFeeSui: decodeFromFieldsWithTypes("u64", item.fields.total_fee_sui),
    });
  }

  static fromBcs(data: Uint8Array): ReceiveFeeEvent {
    return ReceiveFeeEvent.fromFields(ReceiveFeeEvent.bcs.parse(data));
  }

  toJSONField(): ReceiveFeeEventJSONField {
    return {
      userPaySui: this.userPaySui.toString(),
      userPayStable: this.userPayStable.toString(),
      totalPaySui: this.totalPaySui.toString(),
      bridgeFeeSui: this.bridgeFeeSui.toString(),
      messengerFeeSui: this.messengerFeeSui.toString(),
      totalFeeSui: this.totalFeeSui.toString(),
    };
  }

  toJSON(): ReceiveFeeEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): ReceiveFeeEvent {
    return ReceiveFeeEvent.reified().new({
      userPaySui: decodeFromJSONField("u64", field.userPaySui),
      userPayStable: decodeFromJSONField("u64", field.userPayStable),
      totalPaySui: decodeFromJSONField("u64", field.totalPaySui),
      bridgeFeeSui: decodeFromJSONField("u64", field.bridgeFeeSui),
      messengerFeeSui: decodeFromJSONField("u64", field.messengerFeeSui),
      totalFeeSui: decodeFromJSONField("u64", field.totalFeeSui),
    });
  }

  static fromJSON(json: Record<string, any>): ReceiveFeeEvent {
    if (json.$typeName !== ReceiveFeeEvent.$typeName) {
      throw new Error(
        `not a ReceiveFeeEvent json object: expected '${ReceiveFeeEvent.$typeName}' but got '${json.$typeName}'`
      );
    }

    return ReceiveFeeEvent.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ReceiveFeeEvent {
    if (!isReceiveFeeEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ReceiveFeeEvent object`);
    }
    return ReceiveFeeEvent.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ReceiveFeeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ReceiveFeeEvent {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isReceiveFeeEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ReceiveFeeEvent object`);
    }
    return ReceiveFeeEvent.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ReceiveFeeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ReceiveFeeEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isReceiveFeeEvent(data.bcs.type)) {
        throw new Error(`object at is not a ReceiveFeeEvent object`);
      }

      return ReceiveFeeEvent.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return ReceiveFeeEvent.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ReceiveFeeEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isReceiveFeeEvent(object.type)) {
      throw new Error(`object at id ${id} is not a ReceiveFeeEvent object`);
    }
    return ReceiveFeeEvent.fromBcs(object.content);
  }
}

/* ============================== SwappedEvent =============================== */

export function isSwappedEvent(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "events::SwappedEvent")}::events::SwappedEvent`;
}

export interface SwappedEventFields {
  tokenFrom: ToField<String>;
  tokenTo: ToField<String>;
  sentAmount: ToField<"u64">;
  receivedAmount: ToField<"u64">;
  sender: ToField<"address">;
}

export type SwappedEventReified = Reified<SwappedEvent, SwappedEventFields>;

export type SwappedEventJSONField = {
  tokenFrom: string;
  tokenTo: string;
  sentAmount: string;
  receivedAmount: string;
  sender: string;
};

export type SwappedEventJSON = {
  $typeName: typeof SwappedEvent.$typeName;
  $typeArgs: [];
} & SwappedEventJSONField;

export class SwappedEvent implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::events::SwappedEvent` {
    return `${getTypeOrigin("bridge", "events::SwappedEvent")}::events::SwappedEvent` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof SwappedEvent.$typeName = SwappedEvent.$typeName;
  readonly $fullTypeName: `${string}::events::SwappedEvent`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof SwappedEvent.$isPhantom = SwappedEvent.$isPhantom;

  readonly tokenFrom: ToField<String>;
  readonly tokenTo: ToField<String>;
  readonly sentAmount: ToField<"u64">;
  readonly receivedAmount: ToField<"u64">;
  readonly sender: ToField<"address">;

  private constructor(typeArgs: [], fields: SwappedEventFields) {
    this.$fullTypeName = composeSuiType(SwappedEvent.$typeName, ...typeArgs) as `${string}::events::SwappedEvent`;
    this.$typeArgs = typeArgs;

    this.tokenFrom = fields.tokenFrom;
    this.tokenTo = fields.tokenTo;
    this.sentAmount = fields.sentAmount;
    this.receivedAmount = fields.receivedAmount;
    this.sender = fields.sender;
  }

  static reified(): SwappedEventReified {
    const reifiedBcs = SwappedEvent.bcs;
    return {
      get typeName() {
        return SwappedEvent.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(SwappedEvent.$typeName, ...[]) as `${string}::events::SwappedEvent`;
      },
      typeArgs: [] as [],
      isPhantom: SwappedEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SwappedEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SwappedEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SwappedEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SwappedEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SwappedEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => SwappedEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => SwappedEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SwappedEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => SwappedEvent.fetch(client, id),
      new: (fields: SwappedEventFields) => {
        return new SwappedEvent([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): SwappedEventReified {
    return SwappedEvent.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<SwappedEvent>> {
    return phantom(SwappedEvent.reified());
  }

  static get p(): PhantomReified<ToTypeStr<SwappedEvent>> {
    return SwappedEvent.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("SwappedEvent", {
      token_from: String.bcs,
      token_to: String.bcs,
      sent_amount: bcs.u64(),
      received_amount: bcs.u64(),
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
    });
  }

  private static cachedBcs: ReturnType<typeof SwappedEvent.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof SwappedEvent.instantiateBcs> {
    if (!SwappedEvent.cachedBcs) {
      SwappedEvent.cachedBcs = SwappedEvent.instantiateBcs();
    }
    return SwappedEvent.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): SwappedEvent {
    return SwappedEvent.reified().new({
      tokenFrom: decodeFromFields(String.reified(), fields.token_from),
      tokenTo: decodeFromFields(String.reified(), fields.token_to),
      sentAmount: decodeFromFields("u64", fields.sent_amount),
      receivedAmount: decodeFromFields("u64", fields.received_amount),
      sender: decodeFromFields("address", fields.sender),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SwappedEvent {
    if (!isSwappedEvent(item.type)) {
      throw new Error("not a SwappedEvent type");
    }

    return SwappedEvent.reified().new({
      tokenFrom: decodeFromFieldsWithTypes(String.reified(), item.fields.token_from),
      tokenTo: decodeFromFieldsWithTypes(String.reified(), item.fields.token_to),
      sentAmount: decodeFromFieldsWithTypes("u64", item.fields.sent_amount),
      receivedAmount: decodeFromFieldsWithTypes("u64", item.fields.received_amount),
      sender: decodeFromFieldsWithTypes("address", item.fields.sender),
    });
  }

  static fromBcs(data: Uint8Array): SwappedEvent {
    return SwappedEvent.fromFields(SwappedEvent.bcs.parse(data));
  }

  toJSONField(): SwappedEventJSONField {
    return {
      tokenFrom: this.tokenFrom,
      tokenTo: this.tokenTo,
      sentAmount: this.sentAmount.toString(),
      receivedAmount: this.receivedAmount.toString(),
      sender: this.sender,
    };
  }

  toJSON(): SwappedEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): SwappedEvent {
    return SwappedEvent.reified().new({
      tokenFrom: decodeFromJSONField(String.reified(), field.tokenFrom),
      tokenTo: decodeFromJSONField(String.reified(), field.tokenTo),
      sentAmount: decodeFromJSONField("u64", field.sentAmount),
      receivedAmount: decodeFromJSONField("u64", field.receivedAmount),
      sender: decodeFromJSONField("address", field.sender),
    });
  }

  static fromJSON(json: Record<string, any>): SwappedEvent {
    if (json.$typeName !== SwappedEvent.$typeName) {
      throw new Error(
        `not a SwappedEvent json object: expected '${SwappedEvent.$typeName}' but got '${json.$typeName}'`
      );
    }

    return SwappedEvent.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): SwappedEvent {
    if (!isSwappedEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SwappedEvent object`);
    }
    return SwappedEvent.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SwappedEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SwappedEvent {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isSwappedEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SwappedEvent object`);
    }
    return SwappedEvent.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SwappedEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SwappedEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isSwappedEvent(data.bcs.type)) {
        throw new Error(`object at is not a SwappedEvent object`);
      }

      return SwappedEvent.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return SwappedEvent.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<SwappedEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isSwappedEvent(object.type)) {
      throw new Error(`object at id ${id} is not a SwappedEvent object`);
    }
    return SwappedEvent.fromBcs(object.content);
  }
}

/* ============================== DepositEvent =============================== */

export function isDepositEvent(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "events::DepositEvent")}::events::DepositEvent`;
}

export interface DepositEventFields {
  token: ToField<String>;
  amount: ToField<"u64">;
  lpAmount: ToField<"u64">;
}

export type DepositEventReified = Reified<DepositEvent, DepositEventFields>;

export type DepositEventJSONField = {
  token: string;
  amount: string;
  lpAmount: string;
};

export type DepositEventJSON = {
  $typeName: typeof DepositEvent.$typeName;
  $typeArgs: [];
} & DepositEventJSONField;

export class DepositEvent implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::events::DepositEvent` {
    return `${getTypeOrigin("bridge", "events::DepositEvent")}::events::DepositEvent` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof DepositEvent.$typeName = DepositEvent.$typeName;
  readonly $fullTypeName: `${string}::events::DepositEvent`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof DepositEvent.$isPhantom = DepositEvent.$isPhantom;

  readonly token: ToField<String>;
  readonly amount: ToField<"u64">;
  readonly lpAmount: ToField<"u64">;

  private constructor(typeArgs: [], fields: DepositEventFields) {
    this.$fullTypeName = composeSuiType(DepositEvent.$typeName, ...typeArgs) as `${string}::events::DepositEvent`;
    this.$typeArgs = typeArgs;

    this.token = fields.token;
    this.amount = fields.amount;
    this.lpAmount = fields.lpAmount;
  }

  static reified(): DepositEventReified {
    const reifiedBcs = DepositEvent.bcs;
    return {
      get typeName() {
        return DepositEvent.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(DepositEvent.$typeName, ...[]) as `${string}::events::DepositEvent`;
      },
      typeArgs: [] as [],
      isPhantom: DepositEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DepositEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DepositEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DepositEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DepositEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DepositEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => DepositEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => DepositEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DepositEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => DepositEvent.fetch(client, id),
      new: (fields: DepositEventFields) => {
        return new DepositEvent([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): DepositEventReified {
    return DepositEvent.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<DepositEvent>> {
    return phantom(DepositEvent.reified());
  }

  static get p(): PhantomReified<ToTypeStr<DepositEvent>> {
    return DepositEvent.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("DepositEvent", {
      token: String.bcs,
      amount: bcs.u64(),
      lp_amount: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof DepositEvent.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof DepositEvent.instantiateBcs> {
    if (!DepositEvent.cachedBcs) {
      DepositEvent.cachedBcs = DepositEvent.instantiateBcs();
    }
    return DepositEvent.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): DepositEvent {
    return DepositEvent.reified().new({
      token: decodeFromFields(String.reified(), fields.token),
      amount: decodeFromFields("u64", fields.amount),
      lpAmount: decodeFromFields("u64", fields.lp_amount),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DepositEvent {
    if (!isDepositEvent(item.type)) {
      throw new Error("not a DepositEvent type");
    }

    return DepositEvent.reified().new({
      token: decodeFromFieldsWithTypes(String.reified(), item.fields.token),
      amount: decodeFromFieldsWithTypes("u64", item.fields.amount),
      lpAmount: decodeFromFieldsWithTypes("u64", item.fields.lp_amount),
    });
  }

  static fromBcs(data: Uint8Array): DepositEvent {
    return DepositEvent.fromFields(DepositEvent.bcs.parse(data));
  }

  toJSONField(): DepositEventJSONField {
    return {
      token: this.token,
      amount: this.amount.toString(),
      lpAmount: this.lpAmount.toString(),
    };
  }

  toJSON(): DepositEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): DepositEvent {
    return DepositEvent.reified().new({
      token: decodeFromJSONField(String.reified(), field.token),
      amount: decodeFromJSONField("u64", field.amount),
      lpAmount: decodeFromJSONField("u64", field.lpAmount),
    });
  }

  static fromJSON(json: Record<string, any>): DepositEvent {
    if (json.$typeName !== DepositEvent.$typeName) {
      throw new Error(
        `not a DepositEvent json object: expected '${DepositEvent.$typeName}' but got '${json.$typeName}'`
      );
    }

    return DepositEvent.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): DepositEvent {
    if (!isDepositEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DepositEvent object`);
    }
    return DepositEvent.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DepositEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): DepositEvent {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isDepositEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DepositEvent object`);
    }
    return DepositEvent.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DepositEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): DepositEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isDepositEvent(data.bcs.type)) {
        throw new Error(`object at is not a DepositEvent object`);
      }

      return DepositEvent.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return DepositEvent.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<DepositEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isDepositEvent(object.type)) {
      throw new Error(`object at id ${id} is not a DepositEvent object`);
    }
    return DepositEvent.fromBcs(object.content);
  }
}

/* ============================== WithdrawEvent =============================== */

export function isWithdrawEvent(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "events::WithdrawEvent")}::events::WithdrawEvent`;
}

export interface WithdrawEventFields {
  token: ToField<String>;
  amount: ToField<"u64">;
  lpAmount: ToField<"u64">;
}

export type WithdrawEventReified = Reified<WithdrawEvent, WithdrawEventFields>;

export type WithdrawEventJSONField = {
  token: string;
  amount: string;
  lpAmount: string;
};

export type WithdrawEventJSON = {
  $typeName: typeof WithdrawEvent.$typeName;
  $typeArgs: [];
} & WithdrawEventJSONField;

export class WithdrawEvent implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::events::WithdrawEvent` {
    return `${getTypeOrigin("bridge", "events::WithdrawEvent")}::events::WithdrawEvent` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof WithdrawEvent.$typeName = WithdrawEvent.$typeName;
  readonly $fullTypeName: `${string}::events::WithdrawEvent`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof WithdrawEvent.$isPhantom = WithdrawEvent.$isPhantom;

  readonly token: ToField<String>;
  readonly amount: ToField<"u64">;
  readonly lpAmount: ToField<"u64">;

  private constructor(typeArgs: [], fields: WithdrawEventFields) {
    this.$fullTypeName = composeSuiType(WithdrawEvent.$typeName, ...typeArgs) as `${string}::events::WithdrawEvent`;
    this.$typeArgs = typeArgs;

    this.token = fields.token;
    this.amount = fields.amount;
    this.lpAmount = fields.lpAmount;
  }

  static reified(): WithdrawEventReified {
    const reifiedBcs = WithdrawEvent.bcs;
    return {
      get typeName() {
        return WithdrawEvent.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(WithdrawEvent.$typeName, ...[]) as `${string}::events::WithdrawEvent`;
      },
      typeArgs: [] as [],
      isPhantom: WithdrawEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WithdrawEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WithdrawEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WithdrawEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WithdrawEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WithdrawEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => WithdrawEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => WithdrawEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => WithdrawEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => WithdrawEvent.fetch(client, id),
      new: (fields: WithdrawEventFields) => {
        return new WithdrawEvent([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): WithdrawEventReified {
    return WithdrawEvent.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<WithdrawEvent>> {
    return phantom(WithdrawEvent.reified());
  }

  static get p(): PhantomReified<ToTypeStr<WithdrawEvent>> {
    return WithdrawEvent.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("WithdrawEvent", {
      token: String.bcs,
      amount: bcs.u64(),
      lp_amount: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof WithdrawEvent.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof WithdrawEvent.instantiateBcs> {
    if (!WithdrawEvent.cachedBcs) {
      WithdrawEvent.cachedBcs = WithdrawEvent.instantiateBcs();
    }
    return WithdrawEvent.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): WithdrawEvent {
    return WithdrawEvent.reified().new({
      token: decodeFromFields(String.reified(), fields.token),
      amount: decodeFromFields("u64", fields.amount),
      lpAmount: decodeFromFields("u64", fields.lp_amount),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): WithdrawEvent {
    if (!isWithdrawEvent(item.type)) {
      throw new Error("not a WithdrawEvent type");
    }

    return WithdrawEvent.reified().new({
      token: decodeFromFieldsWithTypes(String.reified(), item.fields.token),
      amount: decodeFromFieldsWithTypes("u64", item.fields.amount),
      lpAmount: decodeFromFieldsWithTypes("u64", item.fields.lp_amount),
    });
  }

  static fromBcs(data: Uint8Array): WithdrawEvent {
    return WithdrawEvent.fromFields(WithdrawEvent.bcs.parse(data));
  }

  toJSONField(): WithdrawEventJSONField {
    return {
      token: this.token,
      amount: this.amount.toString(),
      lpAmount: this.lpAmount.toString(),
    };
  }

  toJSON(): WithdrawEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): WithdrawEvent {
    return WithdrawEvent.reified().new({
      token: decodeFromJSONField(String.reified(), field.token),
      amount: decodeFromJSONField("u64", field.amount),
      lpAmount: decodeFromJSONField("u64", field.lpAmount),
    });
  }

  static fromJSON(json: Record<string, any>): WithdrawEvent {
    if (json.$typeName !== WithdrawEvent.$typeName) {
      throw new Error(
        `not a WithdrawEvent json object: expected '${WithdrawEvent.$typeName}' but got '${json.$typeName}'`
      );
    }

    return WithdrawEvent.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): WithdrawEvent {
    if (!isWithdrawEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WithdrawEvent object`);
    }
    return WithdrawEvent.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WithdrawEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): WithdrawEvent {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isWithdrawEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WithdrawEvent object`);
    }
    return WithdrawEvent.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WithdrawEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): WithdrawEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isWithdrawEvent(data.bcs.type)) {
        throw new Error(`object at is not a WithdrawEvent object`);
      }

      return WithdrawEvent.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return WithdrawEvent.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<WithdrawEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isWithdrawEvent(object.type)) {
      throw new Error(`object at id ${id} is not a WithdrawEvent object`);
    }
    return WithdrawEvent.fromBcs(object.content);
  }
}

/* ============================== RewardsClaimedEvent =============================== */

export function isRewardsClaimedEvent(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "events::RewardsClaimedEvent")}::events::RewardsClaimedEvent`;
}

export interface RewardsClaimedEventFields {
  token: ToField<String>;
  amount: ToField<"u64">;
}

export type RewardsClaimedEventReified = Reified<RewardsClaimedEvent, RewardsClaimedEventFields>;

export type RewardsClaimedEventJSONField = {
  token: string;
  amount: string;
};

export type RewardsClaimedEventJSON = {
  $typeName: typeof RewardsClaimedEvent.$typeName;
  $typeArgs: [];
} & RewardsClaimedEventJSONField;

export class RewardsClaimedEvent implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::events::RewardsClaimedEvent` {
    return `${getTypeOrigin("bridge", "events::RewardsClaimedEvent")}::events::RewardsClaimedEvent` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof RewardsClaimedEvent.$typeName = RewardsClaimedEvent.$typeName;
  readonly $fullTypeName: `${string}::events::RewardsClaimedEvent`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof RewardsClaimedEvent.$isPhantom = RewardsClaimedEvent.$isPhantom;

  readonly token: ToField<String>;
  readonly amount: ToField<"u64">;

  private constructor(typeArgs: [], fields: RewardsClaimedEventFields) {
    this.$fullTypeName = composeSuiType(
      RewardsClaimedEvent.$typeName,
      ...typeArgs
    ) as `${string}::events::RewardsClaimedEvent`;
    this.$typeArgs = typeArgs;

    this.token = fields.token;
    this.amount = fields.amount;
  }

  static reified(): RewardsClaimedEventReified {
    const reifiedBcs = RewardsClaimedEvent.bcs;
    return {
      get typeName() {
        return RewardsClaimedEvent.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(RewardsClaimedEvent.$typeName, ...[]) as `${string}::events::RewardsClaimedEvent`;
      },
      typeArgs: [] as [],
      isPhantom: RewardsClaimedEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RewardsClaimedEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RewardsClaimedEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RewardsClaimedEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RewardsClaimedEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RewardsClaimedEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => RewardsClaimedEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => RewardsClaimedEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RewardsClaimedEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => RewardsClaimedEvent.fetch(client, id),
      new: (fields: RewardsClaimedEventFields) => {
        return new RewardsClaimedEvent([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): RewardsClaimedEventReified {
    return RewardsClaimedEvent.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<RewardsClaimedEvent>> {
    return phantom(RewardsClaimedEvent.reified());
  }

  static get p(): PhantomReified<ToTypeStr<RewardsClaimedEvent>> {
    return RewardsClaimedEvent.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("RewardsClaimedEvent", {
      token: String.bcs,
      amount: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof RewardsClaimedEvent.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof RewardsClaimedEvent.instantiateBcs> {
    if (!RewardsClaimedEvent.cachedBcs) {
      RewardsClaimedEvent.cachedBcs = RewardsClaimedEvent.instantiateBcs();
    }
    return RewardsClaimedEvent.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): RewardsClaimedEvent {
    return RewardsClaimedEvent.reified().new({
      token: decodeFromFields(String.reified(), fields.token),
      amount: decodeFromFields("u64", fields.amount),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RewardsClaimedEvent {
    if (!isRewardsClaimedEvent(item.type)) {
      throw new Error("not a RewardsClaimedEvent type");
    }

    return RewardsClaimedEvent.reified().new({
      token: decodeFromFieldsWithTypes(String.reified(), item.fields.token),
      amount: decodeFromFieldsWithTypes("u64", item.fields.amount),
    });
  }

  static fromBcs(data: Uint8Array): RewardsClaimedEvent {
    return RewardsClaimedEvent.fromFields(RewardsClaimedEvent.bcs.parse(data));
  }

  toJSONField(): RewardsClaimedEventJSONField {
    return {
      token: this.token,
      amount: this.amount.toString(),
    };
  }

  toJSON(): RewardsClaimedEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): RewardsClaimedEvent {
    return RewardsClaimedEvent.reified().new({
      token: decodeFromJSONField(String.reified(), field.token),
      amount: decodeFromJSONField("u64", field.amount),
    });
  }

  static fromJSON(json: Record<string, any>): RewardsClaimedEvent {
    if (json.$typeName !== RewardsClaimedEvent.$typeName) {
      throw new Error(
        `not a RewardsClaimedEvent json object: expected '${RewardsClaimedEvent.$typeName}' but got '${json.$typeName}'`
      );
    }

    return RewardsClaimedEvent.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RewardsClaimedEvent {
    if (!isRewardsClaimedEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RewardsClaimedEvent object`);
    }
    return RewardsClaimedEvent.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RewardsClaimedEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RewardsClaimedEvent {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isRewardsClaimedEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RewardsClaimedEvent object`);
    }
    return RewardsClaimedEvent.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RewardsClaimedEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RewardsClaimedEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isRewardsClaimedEvent(data.bcs.type)) {
        throw new Error(`object at is not a RewardsClaimedEvent object`);
      }

      return RewardsClaimedEvent.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return RewardsClaimedEvent.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RewardsClaimedEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isRewardsClaimedEvent(object.type)) {
      throw new Error(`object at id ${id} is not a RewardsClaimedEvent object`);
    }
    return RewardsClaimedEvent.fromBcs(object.content);
  }
}
