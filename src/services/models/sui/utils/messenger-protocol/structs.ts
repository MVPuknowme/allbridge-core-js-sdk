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

/* ============================== MessengerProtocol =============================== */

export function isMessengerProtocol(type: string): boolean {
  type = compressSuiType(type);
  return (
    type === `${getTypeOrigin("utils", "messenger_protocol::MessengerProtocol")}::messenger_protocol::MessengerProtocol`
  );
}

export interface MessengerProtocolFields {
  id: ToField<"u8">;
}

export type MessengerProtocolReified = Reified<MessengerProtocol, MessengerProtocolFields>;

export type MessengerProtocolJSONField = {
  id: number;
};

export type MessengerProtocolJSON = {
  $typeName: typeof MessengerProtocol.$typeName;
  $typeArgs: [];
} & MessengerProtocolJSONField;

export class MessengerProtocol implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::messenger_protocol::MessengerProtocol` {
    return `${getTypeOrigin(
      "utils",
      "messenger_protocol::MessengerProtocol"
    )}::messenger_protocol::MessengerProtocol` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof MessengerProtocol.$typeName = MessengerProtocol.$typeName;
  readonly $fullTypeName: `${string}::messenger_protocol::MessengerProtocol`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof MessengerProtocol.$isPhantom = MessengerProtocol.$isPhantom;

  readonly id: ToField<"u8">;

  private constructor(typeArgs: [], fields: MessengerProtocolFields) {
    this.$fullTypeName = composeSuiType(
      MessengerProtocol.$typeName,
      ...typeArgs
    ) as `${string}::messenger_protocol::MessengerProtocol`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
  }

  static reified(): MessengerProtocolReified {
    const reifiedBcs = MessengerProtocol.bcs;
    return {
      get typeName() {
        return MessengerProtocol.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(MessengerProtocol.$typeName, ...[]) as `${string}::messenger_protocol::MessengerProtocol`;
      },
      typeArgs: [] as [],
      isPhantom: MessengerProtocol.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => MessengerProtocol.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MessengerProtocol.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => MessengerProtocol.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MessengerProtocol.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => MessengerProtocol.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => MessengerProtocol.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => MessengerProtocol.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => MessengerProtocol.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => MessengerProtocol.fetch(client, id),
      new: (fields: MessengerProtocolFields) => {
        return new MessengerProtocol([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): MessengerProtocolReified {
    return MessengerProtocol.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<MessengerProtocol>> {
    return phantom(MessengerProtocol.reified());
  }

  static get p(): PhantomReified<ToTypeStr<MessengerProtocol>> {
    return MessengerProtocol.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("MessengerProtocol", {
      id: bcs.u8(),
    });
  }

  private static cachedBcs: ReturnType<typeof MessengerProtocol.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof MessengerProtocol.instantiateBcs> {
    if (!MessengerProtocol.cachedBcs) {
      MessengerProtocol.cachedBcs = MessengerProtocol.instantiateBcs();
    }
    return MessengerProtocol.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): MessengerProtocol {
    return MessengerProtocol.reified().new({
      id: decodeFromFields("u8", fields.id),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): MessengerProtocol {
    if (!isMessengerProtocol(item.type)) {
      throw new Error("not a MessengerProtocol type");
    }

    return MessengerProtocol.reified().new({
      id: decodeFromFieldsWithTypes("u8", item.fields.id),
    });
  }

  static fromBcs(data: Uint8Array): MessengerProtocol {
    return MessengerProtocol.fromFields(MessengerProtocol.bcs.parse(data));
  }

  toJSONField(): MessengerProtocolJSONField {
    return {
      id: this.id,
    };
  }

  toJSON(): MessengerProtocolJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): MessengerProtocol {
    return MessengerProtocol.reified().new({
      id: decodeFromJSONField("u8", field.id),
    });
  }

  static fromJSON(json: Record<string, any>): MessengerProtocol {
    if (json.$typeName !== MessengerProtocol.$typeName) {
      throw new Error(
        `not a MessengerProtocol json object: expected '${MessengerProtocol.$typeName}' but got '${json.$typeName}'`
      );
    }

    return MessengerProtocol.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): MessengerProtocol {
    if (!isMessengerProtocol(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a MessengerProtocol object`);
    }
    return MessengerProtocol.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MessengerProtocol.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): MessengerProtocol {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isMessengerProtocol(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MessengerProtocol object`);
    }
    return MessengerProtocol.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MessengerProtocol.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): MessengerProtocol {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isMessengerProtocol(data.bcs.type)) {
        throw new Error(`object at is not a MessengerProtocol object`);
      }

      return MessengerProtocol.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return MessengerProtocol.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<MessengerProtocol> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isMessengerProtocol(object.type)) {
      throw new Error(`object at id ${id} is not a MessengerProtocol object`);
    }
    return MessengerProtocol.fromBcs(object.content);
  }
}
