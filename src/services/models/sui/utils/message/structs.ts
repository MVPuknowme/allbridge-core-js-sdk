// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64 } from "@mysten/sui/utils";
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
import { Bytes32 } from "../bytes32/structs";

/* ============================== Message =============================== */

export function isMessage(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("utils", "message::Message")}::message::Message`;
}

export interface MessageFields {
  message: ToField<Bytes32>;
}

export type MessageReified = Reified<Message, MessageFields>;

export type MessageJSONField = {
  message: ToJSON<Bytes32>;
};

export type MessageJSON = {
  $typeName: typeof Message.$typeName;
  $typeArgs: [];
} & MessageJSONField;

export class Message implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::message::Message` {
    return `${getTypeOrigin("utils", "message::Message")}::message::Message` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof Message.$typeName = Message.$typeName;
  readonly $fullTypeName: `${string}::message::Message`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof Message.$isPhantom = Message.$isPhantom;

  readonly message: ToField<Bytes32>;

  private constructor(typeArgs: [], fields: MessageFields) {
    this.$fullTypeName = composeSuiType(Message.$typeName, ...typeArgs) as `${string}::message::Message`;
    this.$typeArgs = typeArgs;

    this.message = fields.message;
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
      message: Bytes32.bcs,
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
      message: decodeFromFields(Bytes32.reified(), fields.message),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Message {
    if (!isMessage(item.type)) {
      throw new Error("not a Message type");
    }

    return Message.reified().new({
      message: decodeFromFieldsWithTypes(Bytes32.reified(), item.fields.message),
    });
  }

  static fromBcs(data: Uint8Array): Message {
    return Message.fromFields(Message.bcs.parse(data));
  }

  toJSONField(): MessageJSONField {
    return {
      message: this.message.toJSONField(),
    };
  }

  toJSON(): MessageJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): Message {
    return Message.reified().new({
      message: decodeFromJSONField(Bytes32.reified(), field.message),
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
