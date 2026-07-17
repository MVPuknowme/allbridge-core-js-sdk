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

/* ============================== MessageTransmitterAuthenticator =============================== */

export function isMessageTransmitterAuthenticator(type: string): boolean {
  type = compressSuiType(type);
  return (
    type ===
    `${getTypeOrigin(
      "cctp-bridge",
      "message_transmitter_authenticator::MessageTransmitterAuthenticator"
    )}::message_transmitter_authenticator::MessageTransmitterAuthenticator`
  );
}

export interface MessageTransmitterAuthenticatorFields {
  dummyField: ToField<"bool">;
}

export type MessageTransmitterAuthenticatorReified = Reified<
  MessageTransmitterAuthenticator,
  MessageTransmitterAuthenticatorFields
>;

export type MessageTransmitterAuthenticatorJSONField = {
  dummyField: boolean;
};

export type MessageTransmitterAuthenticatorJSON = {
  $typeName: typeof MessageTransmitterAuthenticator.$typeName;
  $typeArgs: [];
} & MessageTransmitterAuthenticatorJSONField;

export class MessageTransmitterAuthenticator implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::message_transmitter_authenticator::MessageTransmitterAuthenticator` {
    return `${getTypeOrigin(
      "cctp-bridge",
      "message_transmitter_authenticator::MessageTransmitterAuthenticator"
    )}::message_transmitter_authenticator::MessageTransmitterAuthenticator` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof MessageTransmitterAuthenticator.$typeName = MessageTransmitterAuthenticator.$typeName;
  readonly $fullTypeName: `${string}::message_transmitter_authenticator::MessageTransmitterAuthenticator`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof MessageTransmitterAuthenticator.$isPhantom = MessageTransmitterAuthenticator.$isPhantom;

  readonly dummyField: ToField<"bool">;

  private constructor(typeArgs: [], fields: MessageTransmitterAuthenticatorFields) {
    this.$fullTypeName = composeSuiType(
      MessageTransmitterAuthenticator.$typeName,
      ...typeArgs
    ) as `${string}::message_transmitter_authenticator::MessageTransmitterAuthenticator`;
    this.$typeArgs = typeArgs;

    this.dummyField = fields.dummyField;
  }

  static reified(): MessageTransmitterAuthenticatorReified {
    const reifiedBcs = MessageTransmitterAuthenticator.bcs;
    return {
      get typeName() {
        return MessageTransmitterAuthenticator.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(
          MessageTransmitterAuthenticator.$typeName,
          ...[]
        ) as `${string}::message_transmitter_authenticator::MessageTransmitterAuthenticator`;
      },
      typeArgs: [] as [],
      isPhantom: MessageTransmitterAuthenticator.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => MessageTransmitterAuthenticator.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MessageTransmitterAuthenticator.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => MessageTransmitterAuthenticator.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MessageTransmitterAuthenticator.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => MessageTransmitterAuthenticator.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        MessageTransmitterAuthenticator.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => MessageTransmitterAuthenticator.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => MessageTransmitterAuthenticator.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => MessageTransmitterAuthenticator.fetch(client, id),
      new: (fields: MessageTransmitterAuthenticatorFields) => {
        return new MessageTransmitterAuthenticator([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): MessageTransmitterAuthenticatorReified {
    return MessageTransmitterAuthenticator.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<MessageTransmitterAuthenticator>> {
    return phantom(MessageTransmitterAuthenticator.reified());
  }

  static get p(): PhantomReified<ToTypeStr<MessageTransmitterAuthenticator>> {
    return MessageTransmitterAuthenticator.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("MessageTransmitterAuthenticator", {
      dummy_field: bcs.bool(),
    });
  }

  private static cachedBcs: ReturnType<typeof MessageTransmitterAuthenticator.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof MessageTransmitterAuthenticator.instantiateBcs> {
    if (!MessageTransmitterAuthenticator.cachedBcs) {
      MessageTransmitterAuthenticator.cachedBcs = MessageTransmitterAuthenticator.instantiateBcs();
    }
    return MessageTransmitterAuthenticator.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): MessageTransmitterAuthenticator {
    return MessageTransmitterAuthenticator.reified().new({
      dummyField: decodeFromFields("bool", fields.dummy_field),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): MessageTransmitterAuthenticator {
    if (!isMessageTransmitterAuthenticator(item.type)) {
      throw new Error("not a MessageTransmitterAuthenticator type");
    }

    return MessageTransmitterAuthenticator.reified().new({
      dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field),
    });
  }

  static fromBcs(data: Uint8Array): MessageTransmitterAuthenticator {
    return MessageTransmitterAuthenticator.fromFields(MessageTransmitterAuthenticator.bcs.parse(data));
  }

  toJSONField(): MessageTransmitterAuthenticatorJSONField {
    return {
      dummyField: this.dummyField,
    };
  }

  toJSON(): MessageTransmitterAuthenticatorJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): MessageTransmitterAuthenticator {
    return MessageTransmitterAuthenticator.reified().new({
      dummyField: decodeFromJSONField("bool", field.dummyField),
    });
  }

  static fromJSON(json: Record<string, any>): MessageTransmitterAuthenticator {
    if (json.$typeName !== MessageTransmitterAuthenticator.$typeName) {
      throw new Error(
        `not a MessageTransmitterAuthenticator json object: expected '${MessageTransmitterAuthenticator.$typeName}' but got '${json.$typeName}'`
      );
    }

    return MessageTransmitterAuthenticator.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): MessageTransmitterAuthenticator {
    if (!isMessageTransmitterAuthenticator(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a MessageTransmitterAuthenticator object`);
    }
    return MessageTransmitterAuthenticator.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MessageTransmitterAuthenticator.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): MessageTransmitterAuthenticator {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isMessageTransmitterAuthenticator(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MessageTransmitterAuthenticator object`);
    }
    return MessageTransmitterAuthenticator.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MessageTransmitterAuthenticator.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): MessageTransmitterAuthenticator {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isMessageTransmitterAuthenticator(data.bcs.type)) {
        throw new Error(`object at is not a MessageTransmitterAuthenticator object`);
      }

      return MessageTransmitterAuthenticator.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return MessageTransmitterAuthenticator.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<MessageTransmitterAuthenticator> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isMessageTransmitterAuthenticator(object.type)) {
      throw new Error(`object at id ${id} is not a MessageTransmitterAuthenticator object`);
    }
    return MessageTransmitterAuthenticator.fromBcs(object.content);
  }
}
