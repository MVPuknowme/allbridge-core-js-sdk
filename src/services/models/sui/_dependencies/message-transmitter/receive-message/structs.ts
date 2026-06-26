// @ts-nocheck
import { bcs, BcsType } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64, fromHex, toHex } from "@mysten/sui/utils";
import { getTypeOrigin } from "../../../_envs";
import {
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  toBcs,
  ToField,
  ToJSON,
  ToTypeArgument,
  ToTypeStr,
  TypeArgument,
  vector,
} from "../../../_framework/reified";
import { composeSuiType, compressSuiType, FieldsWithTypes, parseTypeName } from "../../../_framework/util";
import { Vector } from "../../../_framework/vector";
import { VecSet } from "../../sui/vec-set/structs";

/* ============================== Receipt =============================== */

export function isReceipt(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("message-transmitter", "receive_message::Receipt")}::receive_message::Receipt`;
}

export interface ReceiptFields {
  caller: ToField<"address">;
  recipient: ToField<"address">;
  sourceDomain: ToField<"u32">;
  sender: ToField<"address">;
  nonce: ToField<"u64">;
  messageBody: ToField<Vector<"u8">>;
  currentVersion: ToField<VecSet<"u64">>;
}

export type ReceiptReified = Reified<Receipt, ReceiptFields>;

export type ReceiptJSONField = {
  caller: string;
  recipient: string;
  sourceDomain: number;
  sender: string;
  nonce: string;
  messageBody: number[];
  currentVersion: ToJSON<VecSet<"u64">>;
};

export type ReceiptJSON = {
  $typeName: typeof Receipt.$typeName;
  $typeArgs: [];
} & ReceiptJSONField;

export class Receipt implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::receive_message::Receipt` {
    return `${getTypeOrigin("message-transmitter", "receive_message::Receipt")}::receive_message::Receipt` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof Receipt.$typeName = Receipt.$typeName;
  readonly $fullTypeName: `${string}::receive_message::Receipt`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof Receipt.$isPhantom = Receipt.$isPhantom;

  readonly caller: ToField<"address">;
  readonly recipient: ToField<"address">;
  readonly sourceDomain: ToField<"u32">;
  readonly sender: ToField<"address">;
  readonly nonce: ToField<"u64">;
  readonly messageBody: ToField<Vector<"u8">>;
  readonly currentVersion: ToField<VecSet<"u64">>;

  private constructor(typeArgs: [], fields: ReceiptFields) {
    this.$fullTypeName = composeSuiType(Receipt.$typeName, ...typeArgs) as `${string}::receive_message::Receipt`;
    this.$typeArgs = typeArgs;

    this.caller = fields.caller;
    this.recipient = fields.recipient;
    this.sourceDomain = fields.sourceDomain;
    this.sender = fields.sender;
    this.nonce = fields.nonce;
    this.messageBody = fields.messageBody;
    this.currentVersion = fields.currentVersion;
  }

  static reified(): ReceiptReified {
    const reifiedBcs = Receipt.bcs;
    return {
      get typeName() {
        return Receipt.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(Receipt.$typeName, ...[]) as `${string}::receive_message::Receipt`;
      },
      typeArgs: [] as [],
      isPhantom: Receipt.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Receipt.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Receipt.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Receipt.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Receipt.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Receipt.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Receipt.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Receipt.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Receipt.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Receipt.fetch(client, id),
      new: (fields: ReceiptFields) => {
        return new Receipt([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): ReceiptReified {
    return Receipt.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<Receipt>> {
    return phantom(Receipt.reified());
  }

  static get p(): PhantomReified<ToTypeStr<Receipt>> {
    return Receipt.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("Receipt", {
      caller: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      recipient: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      source_domain: bcs.u32(),
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      nonce: bcs.u64(),
      message_body: bcs.vector(bcs.u8()),
      current_version: VecSet.bcs(bcs.u64()),
    });
  }

  private static cachedBcs: ReturnType<typeof Receipt.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof Receipt.instantiateBcs> {
    if (!Receipt.cachedBcs) {
      Receipt.cachedBcs = Receipt.instantiateBcs();
    }
    return Receipt.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): Receipt {
    return Receipt.reified().new({
      caller: decodeFromFields("address", fields.caller),
      recipient: decodeFromFields("address", fields.recipient),
      sourceDomain: decodeFromFields("u32", fields.source_domain),
      sender: decodeFromFields("address", fields.sender),
      nonce: decodeFromFields("u64", fields.nonce),
      messageBody: decodeFromFields(vector("u8"), fields.message_body),
      currentVersion: decodeFromFields(VecSet.reified("u64"), fields.current_version),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Receipt {
    if (!isReceipt(item.type)) {
      throw new Error("not a Receipt type");
    }

    return Receipt.reified().new({
      caller: decodeFromFieldsWithTypes("address", item.fields.caller),
      recipient: decodeFromFieldsWithTypes("address", item.fields.recipient),
      sourceDomain: decodeFromFieldsWithTypes("u32", item.fields.source_domain),
      sender: decodeFromFieldsWithTypes("address", item.fields.sender),
      nonce: decodeFromFieldsWithTypes("u64", item.fields.nonce),
      messageBody: decodeFromFieldsWithTypes(vector("u8"), item.fields.message_body),
      currentVersion: decodeFromFieldsWithTypes(VecSet.reified("u64"), item.fields.current_version),
    });
  }

  static fromBcs(data: Uint8Array): Receipt {
    return Receipt.fromFields(Receipt.bcs.parse(data));
  }

  toJSONField(): ReceiptJSONField {
    return {
      caller: this.caller,
      recipient: this.recipient,
      sourceDomain: this.sourceDomain,
      sender: this.sender,
      nonce: this.nonce.toString(),
      messageBody: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.messageBody),
      currentVersion: this.currentVersion.toJSONField(),
    };
  }

  toJSON(): ReceiptJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): Receipt {
    return Receipt.reified().new({
      caller: decodeFromJSONField("address", field.caller),
      recipient: decodeFromJSONField("address", field.recipient),
      sourceDomain: decodeFromJSONField("u32", field.sourceDomain),
      sender: decodeFromJSONField("address", field.sender),
      nonce: decodeFromJSONField("u64", field.nonce),
      messageBody: decodeFromJSONField(vector("u8"), field.messageBody),
      currentVersion: decodeFromJSONField(VecSet.reified("u64"), field.currentVersion),
    });
  }

  static fromJSON(json: Record<string, any>): Receipt {
    if (json.$typeName !== Receipt.$typeName) {
      throw new Error(`not a Receipt json object: expected '${Receipt.$typeName}' but got '${json.$typeName}'`);
    }

    return Receipt.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Receipt {
    if (!isReceipt(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Receipt object`);
    }
    return Receipt.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Receipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Receipt {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Receipt object`);
    }
    return Receipt.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Receipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Receipt {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isReceipt(data.bcs.type)) {
        throw new Error(`object at is not a Receipt object`);
      }

      return Receipt.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return Receipt.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Receipt> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isReceipt(object.type)) {
      throw new Error(`object at id ${id} is not a Receipt object`);
    }
    return Receipt.fromBcs(object.content);
  }
}

/* ============================== StampedReceipt =============================== */

export function isStampedReceipt(type: string): boolean {
  type = compressSuiType(type);
  return (
    type ===
    `${getTypeOrigin("message-transmitter", "receive_message::StampedReceipt")}::receive_message::StampedReceipt`
  );
}

export interface StampedReceiptFields {
  receipt: ToField<Receipt>;
}

export type StampedReceiptReified = Reified<StampedReceipt, StampedReceiptFields>;

export type StampedReceiptJSONField = {
  receipt: ToJSON<Receipt>;
};

export type StampedReceiptJSON = {
  $typeName: typeof StampedReceipt.$typeName;
  $typeArgs: [];
} & StampedReceiptJSONField;

export class StampedReceipt implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::receive_message::StampedReceipt` {
    return `${getTypeOrigin(
      "message-transmitter",
      "receive_message::StampedReceipt"
    )}::receive_message::StampedReceipt` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof StampedReceipt.$typeName = StampedReceipt.$typeName;
  readonly $fullTypeName: `${string}::receive_message::StampedReceipt`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof StampedReceipt.$isPhantom = StampedReceipt.$isPhantom;

  readonly receipt: ToField<Receipt>;

  private constructor(typeArgs: [], fields: StampedReceiptFields) {
    this.$fullTypeName = composeSuiType(
      StampedReceipt.$typeName,
      ...typeArgs
    ) as `${string}::receive_message::StampedReceipt`;
    this.$typeArgs = typeArgs;

    this.receipt = fields.receipt;
  }

  static reified(): StampedReceiptReified {
    const reifiedBcs = StampedReceipt.bcs;
    return {
      get typeName() {
        return StampedReceipt.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(StampedReceipt.$typeName, ...[]) as `${string}::receive_message::StampedReceipt`;
      },
      typeArgs: [] as [],
      isPhantom: StampedReceipt.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => StampedReceipt.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => StampedReceipt.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => StampedReceipt.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => StampedReceipt.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => StampedReceipt.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => StampedReceipt.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => StampedReceipt.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => StampedReceipt.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => StampedReceipt.fetch(client, id),
      new: (fields: StampedReceiptFields) => {
        return new StampedReceipt([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): StampedReceiptReified {
    return StampedReceipt.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<StampedReceipt>> {
    return phantom(StampedReceipt.reified());
  }

  static get p(): PhantomReified<ToTypeStr<StampedReceipt>> {
    return StampedReceipt.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("StampedReceipt", {
      receipt: Receipt.bcs,
    });
  }

  private static cachedBcs: ReturnType<typeof StampedReceipt.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof StampedReceipt.instantiateBcs> {
    if (!StampedReceipt.cachedBcs) {
      StampedReceipt.cachedBcs = StampedReceipt.instantiateBcs();
    }
    return StampedReceipt.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): StampedReceipt {
    return StampedReceipt.reified().new({
      receipt: decodeFromFields(Receipt.reified(), fields.receipt),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): StampedReceipt {
    if (!isStampedReceipt(item.type)) {
      throw new Error("not a StampedReceipt type");
    }

    return StampedReceipt.reified().new({
      receipt: decodeFromFieldsWithTypes(Receipt.reified(), item.fields.receipt),
    });
  }

  static fromBcs(data: Uint8Array): StampedReceipt {
    return StampedReceipt.fromFields(StampedReceipt.bcs.parse(data));
  }

  toJSONField(): StampedReceiptJSONField {
    return {
      receipt: this.receipt.toJSONField(),
    };
  }

  toJSON(): StampedReceiptJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): StampedReceipt {
    return StampedReceipt.reified().new({
      receipt: decodeFromJSONField(Receipt.reified(), field.receipt),
    });
  }

  static fromJSON(json: Record<string, any>): StampedReceipt {
    if (json.$typeName !== StampedReceipt.$typeName) {
      throw new Error(
        `not a StampedReceipt json object: expected '${StampedReceipt.$typeName}' but got '${json.$typeName}'`
      );
    }

    return StampedReceipt.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): StampedReceipt {
    if (!isStampedReceipt(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a StampedReceipt object`);
    }
    return StampedReceipt.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link StampedReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): StampedReceipt {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isStampedReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a StampedReceipt object`);
    }
    return StampedReceipt.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link StampedReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): StampedReceipt {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isStampedReceipt(data.bcs.type)) {
        throw new Error(`object at is not a StampedReceipt object`);
      }

      return StampedReceipt.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return StampedReceipt.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<StampedReceipt> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isStampedReceipt(object.type)) {
      throw new Error(`object at id ${id} is not a StampedReceipt object`);
    }
    return StampedReceipt.fromBcs(object.content);
  }
}

/* ============================== StampReceiptTicket =============================== */

export function isStampReceiptTicket(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(
    `${getTypeOrigin(
      "message-transmitter",
      "receive_message::StampReceiptTicket"
    )}::receive_message::StampReceiptTicket` + "<"
  );
}

export interface StampReceiptTicketFields<Auth extends TypeArgument> {
  auth: ToField<Auth>;
  receipt: ToField<Receipt>;
}

export type StampReceiptTicketReified<Auth extends TypeArgument> = Reified<
  StampReceiptTicket<Auth>,
  StampReceiptTicketFields<Auth>
>;

export type StampReceiptTicketJSONField<Auth extends TypeArgument> = {
  auth: ToJSON<Auth>;
  receipt: ToJSON<Receipt>;
};

export type StampReceiptTicketJSON<Auth extends TypeArgument> = {
  $typeName: typeof StampReceiptTicket.$typeName;
  $typeArgs: [ToTypeStr<Auth>];
} & StampReceiptTicketJSONField<Auth>;

export class StampReceiptTicket<Auth extends TypeArgument> implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::receive_message::StampReceiptTicket` {
    return `${getTypeOrigin(
      "message-transmitter",
      "receive_message::StampReceiptTicket"
    )}::receive_message::StampReceiptTicket` as const;
  }
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [false] as const;

  readonly $typeName: typeof StampReceiptTicket.$typeName = StampReceiptTicket.$typeName;
  readonly $fullTypeName: `${string}::receive_message::StampReceiptTicket<${ToTypeStr<Auth>}>`;
  readonly $typeArgs: [ToTypeStr<Auth>];
  readonly $isPhantom: typeof StampReceiptTicket.$isPhantom = StampReceiptTicket.$isPhantom;

  readonly auth: ToField<Auth>;
  readonly receipt: ToField<Receipt>;

  private constructor(typeArgs: [ToTypeStr<Auth>], fields: StampReceiptTicketFields<Auth>) {
    this.$fullTypeName = composeSuiType(
      StampReceiptTicket.$typeName,
      ...typeArgs
    ) as `${string}::receive_message::StampReceiptTicket<${ToTypeStr<Auth>}>`;
    this.$typeArgs = typeArgs;

    this.auth = fields.auth;
    this.receipt = fields.receipt;
  }

  static reified<Auth extends Reified<TypeArgument, any>>(Auth: Auth): StampReceiptTicketReified<ToTypeArgument<Auth>> {
    const reifiedBcs = StampReceiptTicket.bcs(toBcs(Auth));
    return {
      get typeName() {
        return StampReceiptTicket.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(
          StampReceiptTicket.$typeName,
          ...[extractType(Auth)]
        ) as `${string}::receive_message::StampReceiptTicket<${ToTypeStr<ToTypeArgument<Auth>>}>`;
      },
      get typeArgs() {
        return [extractType(Auth)] as [ToTypeStr<ToTypeArgument<Auth>>];
      },
      isPhantom: StampReceiptTicket.$isPhantom,
      reifiedTypeArgs: [Auth],
      fromFields: (fields: Record<string, any>) => StampReceiptTicket.fromFields(Auth, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => StampReceiptTicket.fromFieldsWithTypes(Auth, item),
      fromBcs: (data: Uint8Array) => StampReceiptTicket.fromFields(Auth, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => StampReceiptTicket.fromJSONField(Auth, field),
      fromJSON: (json: Record<string, any>) => StampReceiptTicket.fromJSON(Auth, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => StampReceiptTicket.fromCoreObject(Auth, obj),
      fromSuiParsedData: (content: SuiParsedData) => StampReceiptTicket.fromSuiParsedData(Auth, content),
      fromSuiObjectData: (content: SuiObjectData) => StampReceiptTicket.fromSuiObjectData(Auth, content),
      fetch: async (client: ClientWithCoreApi, id: string) => StampReceiptTicket.fetch(client, Auth, id),
      new: (fields: StampReceiptTicketFields<ToTypeArgument<Auth>>) => {
        return new StampReceiptTicket([extractType(Auth)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): typeof StampReceiptTicket.reified {
    return StampReceiptTicket.reified;
  }

  static phantom<Auth extends Reified<TypeArgument, any>>(
    Auth: Auth
  ): PhantomReified<ToTypeStr<StampReceiptTicket<ToTypeArgument<Auth>>>> {
    return phantom(StampReceiptTicket.reified(Auth));
  }

  static get p(): typeof StampReceiptTicket.phantom {
    return StampReceiptTicket.phantom;
  }

  private static instantiateBcs() {
    return <Auth extends BcsType<any>>(Auth: Auth) =>
      bcs.struct(`StampReceiptTicket<${Auth.name}>`, {
        auth: Auth,
        receipt: Receipt.bcs,
      });
  }

  private static cachedBcs: ReturnType<typeof StampReceiptTicket.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof StampReceiptTicket.instantiateBcs> {
    if (!StampReceiptTicket.cachedBcs) {
      StampReceiptTicket.cachedBcs = StampReceiptTicket.instantiateBcs();
    }
    return StampReceiptTicket.cachedBcs;
  }

  static fromFields<Auth extends Reified<TypeArgument, any>>(
    typeArg: Auth,
    fields: Record<string, any>
  ): StampReceiptTicket<ToTypeArgument<Auth>> {
    return StampReceiptTicket.reified(typeArg).new({
      auth: decodeFromFields(typeArg, fields.auth),
      receipt: decodeFromFields(Receipt.reified(), fields.receipt),
    });
  }

  static fromFieldsWithTypes<Auth extends Reified<TypeArgument, any>>(
    typeArg: Auth,
    item: FieldsWithTypes
  ): StampReceiptTicket<ToTypeArgument<Auth>> {
    if (!isStampReceiptTicket(item.type)) {
      throw new Error("not a StampReceiptTicket type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return StampReceiptTicket.reified(typeArg).new({
      auth: decodeFromFieldsWithTypes(typeArg, item.fields.auth),
      receipt: decodeFromFieldsWithTypes(Receipt.reified(), item.fields.receipt),
    });
  }

  static fromBcs<Auth extends Reified<TypeArgument, any>>(
    typeArg: Auth,
    data: Uint8Array
  ): StampReceiptTicket<ToTypeArgument<Auth>> {
    const typeArgs = [typeArg];
    return StampReceiptTicket.fromFields(typeArg, StampReceiptTicket.bcs(toBcs(typeArg)).parse(data));
  }

  toJSONField(): StampReceiptTicketJSONField<Auth> {
    return {
      auth: fieldToJSON<Auth>(`${this.$typeArgs[0]}`, this.auth),
      receipt: this.receipt.toJSONField(),
    };
  }

  toJSON(): StampReceiptTicketJSON<Auth> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField<Auth extends Reified<TypeArgument, any>>(
    typeArg: Auth,
    field: any
  ): StampReceiptTicket<ToTypeArgument<Auth>> {
    return StampReceiptTicket.reified(typeArg).new({
      auth: decodeFromJSONField(typeArg, field.auth),
      receipt: decodeFromJSONField(Receipt.reified(), field.receipt),
    });
  }

  static fromJSON<Auth extends Reified<TypeArgument, any>>(
    typeArg: Auth,
    json: Record<string, any>
  ): StampReceiptTicket<ToTypeArgument<Auth>> {
    if (json.$typeName !== StampReceiptTicket.$typeName) {
      throw new Error(
        `not a StampReceiptTicket json object: expected '${StampReceiptTicket.$typeName}' but got '${json.$typeName}'`
      );
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(StampReceiptTicket.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg]
    );

    return StampReceiptTicket.fromJSONField(typeArg, json);
  }

  static fromCoreObject<Auth extends Reified<TypeArgument, any>>(
    typeArg: Auth,
    obj: SuiClientTypes.Object<{ content: true }>
  ): StampReceiptTicket<ToTypeArgument<Auth>> {
    if (!isStampReceiptTicket(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a StampReceiptTicket object`);
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs;
    if (gotTypeArgs.length !== 1) {
      throw new Error(`type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`);
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i]);
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]));
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        );
      }
    }

    return StampReceiptTicket.fromBcs(typeArg, obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link StampReceiptTicket.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<Auth extends Reified<TypeArgument, any>>(
    typeArg: Auth,
    content: SuiParsedData
  ): StampReceiptTicket<ToTypeArgument<Auth>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isStampReceiptTicket(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a StampReceiptTicket object`);
    }
    return StampReceiptTicket.fromFieldsWithTypes(typeArg, content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link StampReceiptTicket.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<Auth extends Reified<TypeArgument, any>>(
    typeArg: Auth,
    data: SuiObjectData
  ): StampReceiptTicket<ToTypeArgument<Auth>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isStampReceiptTicket(data.bcs.type)) {
        throw new Error(`object at is not a StampReceiptTicket object`);
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs;
      if (gotTypeArgs.length !== 1) {
        throw new Error(`type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`);
      }
      for (let i = 0; i < 1; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i]);
        const expectedTypeArg = compressSuiType(extractType([typeArg][i]));
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
          );
        }
      }

      return StampReceiptTicket.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return StampReceiptTicket.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch<Auth extends Reified<TypeArgument, any>>(
    client: ClientWithCoreApi,
    typeArg: Auth,
    id: string
  ): Promise<StampReceiptTicket<ToTypeArgument<Auth>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isStampReceiptTicket(object.type)) {
      throw new Error(`object at id ${id} is not a StampReceiptTicket object`);
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs;
    if (gotTypeArgs.length !== 1) {
      throw new Error(`type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`);
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i]);
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]));
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        );
      }
    }

    return StampReceiptTicket.fromBcs(typeArg, object.content);
  }
}
