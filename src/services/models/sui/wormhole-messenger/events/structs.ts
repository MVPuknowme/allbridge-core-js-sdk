// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64 } from "@mysten/sui/utils";
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

/* ============================== MessageSentEvent =============================== */

export function isMessageSentEvent(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("wormhole-messenger", "events::MessageSentEvent")}::events::MessageSentEvent`;
}

export interface MessageSentEventFields {
  message: ToField<String>;
  sequence: ToField<"u64">;
}

export type MessageSentEventReified = Reified<MessageSentEvent, MessageSentEventFields>;

export type MessageSentEventJSONField = {
  message: string;
  sequence: string;
};

export type MessageSentEventJSON = {
  $typeName: typeof MessageSentEvent.$typeName;
  $typeArgs: [];
} & MessageSentEventJSONField;

export class MessageSentEvent implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::events::MessageSentEvent` {
    return `${getTypeOrigin("wormhole-messenger", "events::MessageSentEvent")}::events::MessageSentEvent` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof MessageSentEvent.$typeName = MessageSentEvent.$typeName;
  readonly $fullTypeName: `${string}::events::MessageSentEvent`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof MessageSentEvent.$isPhantom = MessageSentEvent.$isPhantom;

  readonly message: ToField<String>;
  readonly sequence: ToField<"u64">;

  private constructor(typeArgs: [], fields: MessageSentEventFields) {
    this.$fullTypeName = composeSuiType(
      MessageSentEvent.$typeName,
      ...typeArgs
    ) as `${string}::events::MessageSentEvent`;
    this.$typeArgs = typeArgs;

    this.message = fields.message;
    this.sequence = fields.sequence;
  }

  static reified(): MessageSentEventReified {
    const reifiedBcs = MessageSentEvent.bcs;
    return {
      get typeName() {
        return MessageSentEvent.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(MessageSentEvent.$typeName, ...[]) as `${string}::events::MessageSentEvent`;
      },
      typeArgs: [] as [],
      isPhantom: MessageSentEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => MessageSentEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MessageSentEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => MessageSentEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MessageSentEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => MessageSentEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => MessageSentEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => MessageSentEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => MessageSentEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => MessageSentEvent.fetch(client, id),
      new: (fields: MessageSentEventFields) => {
        return new MessageSentEvent([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): MessageSentEventReified {
    return MessageSentEvent.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<MessageSentEvent>> {
    return phantom(MessageSentEvent.reified());
  }

  static get p(): PhantomReified<ToTypeStr<MessageSentEvent>> {
    return MessageSentEvent.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("MessageSentEvent", {
      message: String.bcs,
      sequence: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof MessageSentEvent.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof MessageSentEvent.instantiateBcs> {
    if (!MessageSentEvent.cachedBcs) {
      MessageSentEvent.cachedBcs = MessageSentEvent.instantiateBcs();
    }
    return MessageSentEvent.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): MessageSentEvent {
    return MessageSentEvent.reified().new({
      message: decodeFromFields(String.reified(), fields.message),
      sequence: decodeFromFields("u64", fields.sequence),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): MessageSentEvent {
    if (!isMessageSentEvent(item.type)) {
      throw new Error("not a MessageSentEvent type");
    }

    return MessageSentEvent.reified().new({
      message: decodeFromFieldsWithTypes(String.reified(), item.fields.message),
      sequence: decodeFromFieldsWithTypes("u64", item.fields.sequence),
    });
  }

  static fromBcs(data: Uint8Array): MessageSentEvent {
    return MessageSentEvent.fromFields(MessageSentEvent.bcs.parse(data));
  }

  toJSONField(): MessageSentEventJSONField {
    return {
      message: this.message,
      sequence: this.sequence.toString(),
    };
  }

  toJSON(): MessageSentEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): MessageSentEvent {
    return MessageSentEvent.reified().new({
      message: decodeFromJSONField(String.reified(), field.message),
      sequence: decodeFromJSONField("u64", field.sequence),
    });
  }

  static fromJSON(json: Record<string, any>): MessageSentEvent {
    if (json.$typeName !== MessageSentEvent.$typeName) {
      throw new Error(
        `not a MessageSentEvent json object: expected '${MessageSentEvent.$typeName}' but got '${json.$typeName}'`
      );
    }

    return MessageSentEvent.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): MessageSentEvent {
    if (!isMessageSentEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a MessageSentEvent object`);
    }
    return MessageSentEvent.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MessageSentEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): MessageSentEvent {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isMessageSentEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MessageSentEvent object`);
    }
    return MessageSentEvent.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MessageSentEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): MessageSentEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isMessageSentEvent(data.bcs.type)) {
        throw new Error(`object at is not a MessageSentEvent object`);
      }

      return MessageSentEvent.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return MessageSentEvent.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<MessageSentEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isMessageSentEvent(object.type)) {
      throw new Error(`object at id ${id} is not a MessageSentEvent object`);
    }
    return MessageSentEvent.fromBcs(object.content);
  }
}

/* ============================== MessageReceivedEvent =============================== */

export function isMessageReceivedEvent(type: string): boolean {
  type = compressSuiType(type);
  return (
    type === `${getTypeOrigin("wormhole-messenger", "events::MessageReceivedEvent")}::events::MessageReceivedEvent`
  );
}

export interface MessageReceivedEventFields {
  message: ToField<String>;
  sequence: ToField<"u64">;
}

export type MessageReceivedEventReified = Reified<MessageReceivedEvent, MessageReceivedEventFields>;

export type MessageReceivedEventJSONField = {
  message: string;
  sequence: string;
};

export type MessageReceivedEventJSON = {
  $typeName: typeof MessageReceivedEvent.$typeName;
  $typeArgs: [];
} & MessageReceivedEventJSONField;

export class MessageReceivedEvent implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::events::MessageReceivedEvent` {
    return `${getTypeOrigin(
      "wormhole-messenger",
      "events::MessageReceivedEvent"
    )}::events::MessageReceivedEvent` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof MessageReceivedEvent.$typeName = MessageReceivedEvent.$typeName;
  readonly $fullTypeName: `${string}::events::MessageReceivedEvent`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof MessageReceivedEvent.$isPhantom = MessageReceivedEvent.$isPhantom;

  readonly message: ToField<String>;
  readonly sequence: ToField<"u64">;

  private constructor(typeArgs: [], fields: MessageReceivedEventFields) {
    this.$fullTypeName = composeSuiType(
      MessageReceivedEvent.$typeName,
      ...typeArgs
    ) as `${string}::events::MessageReceivedEvent`;
    this.$typeArgs = typeArgs;

    this.message = fields.message;
    this.sequence = fields.sequence;
  }

  static reified(): MessageReceivedEventReified {
    const reifiedBcs = MessageReceivedEvent.bcs;
    return {
      get typeName() {
        return MessageReceivedEvent.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(MessageReceivedEvent.$typeName, ...[]) as `${string}::events::MessageReceivedEvent`;
      },
      typeArgs: [] as [],
      isPhantom: MessageReceivedEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => MessageReceivedEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MessageReceivedEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => MessageReceivedEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MessageReceivedEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => MessageReceivedEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => MessageReceivedEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => MessageReceivedEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => MessageReceivedEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => MessageReceivedEvent.fetch(client, id),
      new: (fields: MessageReceivedEventFields) => {
        return new MessageReceivedEvent([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): MessageReceivedEventReified {
    return MessageReceivedEvent.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<MessageReceivedEvent>> {
    return phantom(MessageReceivedEvent.reified());
  }

  static get p(): PhantomReified<ToTypeStr<MessageReceivedEvent>> {
    return MessageReceivedEvent.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("MessageReceivedEvent", {
      message: String.bcs,
      sequence: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof MessageReceivedEvent.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof MessageReceivedEvent.instantiateBcs> {
    if (!MessageReceivedEvent.cachedBcs) {
      MessageReceivedEvent.cachedBcs = MessageReceivedEvent.instantiateBcs();
    }
    return MessageReceivedEvent.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): MessageReceivedEvent {
    return MessageReceivedEvent.reified().new({
      message: decodeFromFields(String.reified(), fields.message),
      sequence: decodeFromFields("u64", fields.sequence),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): MessageReceivedEvent {
    if (!isMessageReceivedEvent(item.type)) {
      throw new Error("not a MessageReceivedEvent type");
    }

    return MessageReceivedEvent.reified().new({
      message: decodeFromFieldsWithTypes(String.reified(), item.fields.message),
      sequence: decodeFromFieldsWithTypes("u64", item.fields.sequence),
    });
  }

  static fromBcs(data: Uint8Array): MessageReceivedEvent {
    return MessageReceivedEvent.fromFields(MessageReceivedEvent.bcs.parse(data));
  }

  toJSONField(): MessageReceivedEventJSONField {
    return {
      message: this.message,
      sequence: this.sequence.toString(),
    };
  }

  toJSON(): MessageReceivedEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): MessageReceivedEvent {
    return MessageReceivedEvent.reified().new({
      message: decodeFromJSONField(String.reified(), field.message),
      sequence: decodeFromJSONField("u64", field.sequence),
    });
  }

  static fromJSON(json: Record<string, any>): MessageReceivedEvent {
    if (json.$typeName !== MessageReceivedEvent.$typeName) {
      throw new Error(
        `not a MessageReceivedEvent json object: expected '${MessageReceivedEvent.$typeName}' but got '${json.$typeName}'`
      );
    }

    return MessageReceivedEvent.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): MessageReceivedEvent {
    if (!isMessageReceivedEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a MessageReceivedEvent object`);
    }
    return MessageReceivedEvent.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MessageReceivedEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): MessageReceivedEvent {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isMessageReceivedEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MessageReceivedEvent object`);
    }
    return MessageReceivedEvent.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MessageReceivedEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): MessageReceivedEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isMessageReceivedEvent(data.bcs.type)) {
        throw new Error(`object at is not a MessageReceivedEvent object`);
      }

      return MessageReceivedEvent.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return MessageReceivedEvent.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<MessageReceivedEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isMessageReceivedEvent(object.type)) {
      throw new Error(`object at id ${id} is not a MessageReceivedEvent object`);
    }
    return MessageReceivedEvent.fromBcs(object.content);
  }
}
