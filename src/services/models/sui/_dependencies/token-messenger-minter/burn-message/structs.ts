// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64, fromHex, toHex } from "@mysten/sui/utils";
import { getTypeOrigin } from "../../../_envs";
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
} from "../../../_framework/reified";
import { composeSuiType, compressSuiType, FieldsWithTypes } from "../../../_framework/util";

/* ============================== BurnMessage =============================== */

export function isBurnMessage(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("token-messenger-minter", "burn_message::BurnMessage")}::burn_message::BurnMessage`;
}

export interface BurnMessageFields {
  version: ToField<"u32">;
  burnToken: ToField<"address">;
  mintRecipient: ToField<"address">;
  amount: ToField<"u256">;
  messageSender: ToField<"address">;
}

export type BurnMessageReified = Reified<BurnMessage, BurnMessageFields>;

export type BurnMessageJSONField = {
  version: number;
  burnToken: string;
  mintRecipient: string;
  amount: string;
  messageSender: string;
};

export type BurnMessageJSON = {
  $typeName: typeof BurnMessage.$typeName;
  $typeArgs: [];
} & BurnMessageJSONField;

export class BurnMessage implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::burn_message::BurnMessage` {
    return `${getTypeOrigin(
      "token-messenger-minter",
      "burn_message::BurnMessage"
    )}::burn_message::BurnMessage` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof BurnMessage.$typeName = BurnMessage.$typeName;
  readonly $fullTypeName: `${string}::burn_message::BurnMessage`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof BurnMessage.$isPhantom = BurnMessage.$isPhantom;

  readonly version: ToField<"u32">;
  readonly burnToken: ToField<"address">;
  readonly mintRecipient: ToField<"address">;
  readonly amount: ToField<"u256">;
  readonly messageSender: ToField<"address">;

  private constructor(typeArgs: [], fields: BurnMessageFields) {
    this.$fullTypeName = composeSuiType(BurnMessage.$typeName, ...typeArgs) as `${string}::burn_message::BurnMessage`;
    this.$typeArgs = typeArgs;

    this.version = fields.version;
    this.burnToken = fields.burnToken;
    this.mintRecipient = fields.mintRecipient;
    this.amount = fields.amount;
    this.messageSender = fields.messageSender;
  }

  static reified(): BurnMessageReified {
    const reifiedBcs = BurnMessage.bcs;
    return {
      get typeName() {
        return BurnMessage.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(BurnMessage.$typeName, ...[]) as `${string}::burn_message::BurnMessage`;
      },
      typeArgs: [] as [],
      isPhantom: BurnMessage.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BurnMessage.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BurnMessage.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BurnMessage.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BurnMessage.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BurnMessage.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => BurnMessage.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => BurnMessage.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BurnMessage.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => BurnMessage.fetch(client, id),
      new: (fields: BurnMessageFields) => {
        return new BurnMessage([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): BurnMessageReified {
    return BurnMessage.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<BurnMessage>> {
    return phantom(BurnMessage.reified());
  }

  static get p(): PhantomReified<ToTypeStr<BurnMessage>> {
    return BurnMessage.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("BurnMessage", {
      version: bcs.u32(),
      burn_token: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      mint_recipient: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      amount: bcs.u256(),
      message_sender: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
    });
  }

  private static cachedBcs: ReturnType<typeof BurnMessage.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof BurnMessage.instantiateBcs> {
    if (!BurnMessage.cachedBcs) {
      BurnMessage.cachedBcs = BurnMessage.instantiateBcs();
    }
    return BurnMessage.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): BurnMessage {
    return BurnMessage.reified().new({
      version: decodeFromFields("u32", fields.version),
      burnToken: decodeFromFields("address", fields.burn_token),
      mintRecipient: decodeFromFields("address", fields.mint_recipient),
      amount: decodeFromFields("u256", fields.amount),
      messageSender: decodeFromFields("address", fields.message_sender),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BurnMessage {
    if (!isBurnMessage(item.type)) {
      throw new Error("not a BurnMessage type");
    }

    return BurnMessage.reified().new({
      version: decodeFromFieldsWithTypes("u32", item.fields.version),
      burnToken: decodeFromFieldsWithTypes("address", item.fields.burn_token),
      mintRecipient: decodeFromFieldsWithTypes("address", item.fields.mint_recipient),
      amount: decodeFromFieldsWithTypes("u256", item.fields.amount),
      messageSender: decodeFromFieldsWithTypes("address", item.fields.message_sender),
    });
  }

  static fromBcs(data: Uint8Array): BurnMessage {
    return BurnMessage.fromFields(BurnMessage.bcs.parse(data));
  }

  toJSONField(): BurnMessageJSONField {
    return {
      version: this.version,
      burnToken: this.burnToken,
      mintRecipient: this.mintRecipient,
      amount: this.amount.toString(),
      messageSender: this.messageSender,
    };
  }

  toJSON(): BurnMessageJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): BurnMessage {
    return BurnMessage.reified().new({
      version: decodeFromJSONField("u32", field.version),
      burnToken: decodeFromJSONField("address", field.burnToken),
      mintRecipient: decodeFromJSONField("address", field.mintRecipient),
      amount: decodeFromJSONField("u256", field.amount),
      messageSender: decodeFromJSONField("address", field.messageSender),
    });
  }

  static fromJSON(json: Record<string, any>): BurnMessage {
    if (json.$typeName !== BurnMessage.$typeName) {
      throw new Error(`not a BurnMessage json object: expected '${BurnMessage.$typeName}' but got '${json.$typeName}'`);
    }

    return BurnMessage.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): BurnMessage {
    if (!isBurnMessage(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BurnMessage object`);
    }
    return BurnMessage.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BurnMessage.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): BurnMessage {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isBurnMessage(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BurnMessage object`);
    }
    return BurnMessage.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BurnMessage.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): BurnMessage {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isBurnMessage(data.bcs.type)) {
        throw new Error(`object at is not a BurnMessage object`);
      }

      return BurnMessage.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return BurnMessage.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<BurnMessage> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isBurnMessage(object.type)) {
      throw new Error(`object at id ${id} is not a BurnMessage object`);
    }
    return BurnMessage.fromBcs(object.content);
  }
}
