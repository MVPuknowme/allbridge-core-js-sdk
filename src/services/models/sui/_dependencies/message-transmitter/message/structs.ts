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
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  vector,
} from "../../../_framework/reified";
import { composeSuiType, compressSuiType, FieldsWithTypes } from "../../../_framework/util";
import { Vector } from "../../../_framework/vector";

/* ============================== Message =============================== */

export function isMessage(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("message-transmitter", "message::Message")}::message::Message`;
}

export interface MessageFields {
  version: ToField<"u32">;
  sourceDomain: ToField<"u32">;
  destinationDomain: ToField<"u32">;
  nonce: ToField<"u64">;
  sender: ToField<"address">;
  recipient: ToField<"address">;
  destinationCaller: ToField<"address">;
  messageBody: ToField<Vector<"u8">>;
}

export type MessageReified = Reified<Message, MessageFields>;

export type MessageJSONField = {
  version: number;
  sourceDomain: number;
  destinationDomain: number;
  nonce: string;
  sender: string;
  recipient: string;
  destinationCaller: string;
  messageBody: number[];
};

export type MessageJSON = {
  $typeName: typeof Message.$typeName;
  $typeArgs: [];
} & MessageJSONField;

export class Message implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::message::Message` {
    return `${getTypeOrigin("message-transmitter", "message::Message")}::message::Message` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof Message.$typeName = Message.$typeName;
  readonly $fullTypeName: `${string}::message::Message`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof Message.$isPhantom = Message.$isPhantom;

  readonly version: ToField<"u32">;
  readonly sourceDomain: ToField<"u32">;
  readonly destinationDomain: ToField<"u32">;
  readonly nonce: ToField<"u64">;
  readonly sender: ToField<"address">;
  readonly recipient: ToField<"address">;
  readonly destinationCaller: ToField<"address">;
  readonly messageBody: ToField<Vector<"u8">>;

  private constructor(typeArgs: [], fields: MessageFields) {
    this.$fullTypeName = composeSuiType(Message.$typeName, ...typeArgs) as `${string}::message::Message`;
    this.$typeArgs = typeArgs;

    this.version = fields.version;
    this.sourceDomain = fields.sourceDomain;
    this.destinationDomain = fields.destinationDomain;
    this.nonce = fields.nonce;
    this.sender = fields.sender;
    this.recipient = fields.recipient;
    this.destinationCaller = fields.destinationCaller;
    this.messageBody = fields.messageBody;
  }

  static reified(): MessageReified {
    const reifiedBcs = Message.bcs;
    return {
      get typeName() {
        return Message.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(Message.$typeName, ...[]) as `${string}::message::Message`;
      },
      typeArgs: [] as [],
      isPhantom: Message.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Message.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Message.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Message.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Message.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Message.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Message.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Message.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Message.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Message.fetch(client, id),
      new: (fields: MessageFields) => {
        return new Message([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): MessageReified {
    return Message.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<Message>> {
    return phantom(Message.reified());
  }

  static get p(): PhantomReified<ToTypeStr<Message>> {
    return Message.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("Message", {
      version: bcs.u32(),
      source_domain: bcs.u32(),
      destination_domain: bcs.u32(),
      nonce: bcs.u64(),
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      recipient: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      destination_caller: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      message_body: bcs.vector(bcs.u8()),
    });
  }

  private static cachedBcs: ReturnType<typeof Message.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof Message.instantiateBcs> {
    if (!Message.cachedBcs) {
      Message.cachedBcs = Message.instantiateBcs();
    }
    return Message.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): Message {
    return Message.reified().new({
      version: decodeFromFields("u32", fields.version),
      sourceDomain: decodeFromFields("u32", fields.source_domain),
      destinationDomain: decodeFromFields("u32", fields.destination_domain),
      nonce: decodeFromFields("u64", fields.nonce),
      sender: decodeFromFields("address", fields.sender),
      recipient: decodeFromFields("address", fields.recipient),
      destinationCaller: decodeFromFields("address", fields.destination_caller),
      messageBody: decodeFromFields(vector("u8"), fields.message_body),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Message {
    if (!isMessage(item.type)) {
      throw new Error("not a Message type");
    }

    return Message.reified().new({
      version: decodeFromFieldsWithTypes("u32", item.fields.version),
      sourceDomain: decodeFromFieldsWithTypes("u32", item.fields.source_domain),
      destinationDomain: decodeFromFieldsWithTypes("u32", item.fields.destination_domain),
      nonce: decodeFromFieldsWithTypes("u64", item.fields.nonce),
      sender: decodeFromFieldsWithTypes("address", item.fields.sender),
      recipient: decodeFromFieldsWithTypes("address", item.fields.recipient),
      destinationCaller: decodeFromFieldsWithTypes("address", item.fields.destination_caller),
      messageBody: decodeFromFieldsWithTypes(vector("u8"), item.fields.message_body),
    });
  }

  static fromBcs(data: Uint8Array): Message {
    return Message.fromFields(Message.bcs.parse(data));
  }

  toJSONField(): MessageJSONField {
    return {
      version: this.version,
      sourceDomain: this.sourceDomain,
      destinationDomain: this.destinationDomain,
      nonce: this.nonce.toString(),
      sender: this.sender,
      recipient: this.recipient,
      destinationCaller: this.destinationCaller,
      messageBody: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.messageBody),
    };
  }

  toJSON(): MessageJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): Message {
    return Message.reified().new({
      version: decodeFromJSONField("u32", field.version),
      sourceDomain: decodeFromJSONField("u32", field.sourceDomain),
      destinationDomain: decodeFromJSONField("u32", field.destinationDomain),
      nonce: decodeFromJSONField("u64", field.nonce),
      sender: decodeFromJSONField("address", field.sender),
      recipient: decodeFromJSONField("address", field.recipient),
      destinationCaller: decodeFromJSONField("address", field.destinationCaller),
      messageBody: decodeFromJSONField(vector("u8"), field.messageBody),
    });
  }

  static fromJSON(json: Record<string, any>): Message {
    if (json.$typeName !== Message.$typeName) {
      throw new Error(`not a Message json object: expected '${Message.$typeName}' but got '${json.$typeName}'`);
    }

    return Message.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Message {
    if (!isMessage(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Message object`);
    }
    return Message.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Message.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Message {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isMessage(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Message object`);
    }
    return Message.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Message.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Message {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isMessage(data.bcs.type)) {
        throw new Error(`object at is not a Message object`);
      }

      return Message.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return Message.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Message> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isMessage(object.type)) {
      throw new Error(`object at id ${id} is not a Message object`);
    }
    return Message.fromBcs(object.content);
  }
}
