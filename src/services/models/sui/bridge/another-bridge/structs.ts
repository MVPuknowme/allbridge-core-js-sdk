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
  ToTypeStr as ToPhantom,
} from "../../_framework/reified";
import { composeSuiType, compressSuiType, FieldsWithTypes } from "../../_framework/util";
import { Bytes32 } from "../../utils/bytes32/structs";
import { Set } from "../../utils/set/structs";

/* ============================== AnotherBridge =============================== */

export function isAnotherBridge(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "another_bridge::AnotherBridge")}::another_bridge::AnotherBridge`;
}

export interface AnotherBridgeFields {
  address: ToField<Bytes32>;
  tokens: ToField<Set<ToPhantom<Bytes32>>>;
  gasUsage: ToField<"u64">;
}

export type AnotherBridgeReified = Reified<AnotherBridge, AnotherBridgeFields>;

export type AnotherBridgeJSONField = {
  address: ToJSON<Bytes32>;
  tokens: ToJSON<Set<ToPhantom<Bytes32>>>;
  gasUsage: string;
};

export type AnotherBridgeJSON = {
  $typeName: typeof AnotherBridge.$typeName;
  $typeArgs: [];
} & AnotherBridgeJSONField;

export class AnotherBridge implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::another_bridge::AnotherBridge` {
    return `${getTypeOrigin("bridge", "another_bridge::AnotherBridge")}::another_bridge::AnotherBridge` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof AnotherBridge.$typeName = AnotherBridge.$typeName;
  readonly $fullTypeName: `${string}::another_bridge::AnotherBridge`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof AnotherBridge.$isPhantom = AnotherBridge.$isPhantom;

  readonly address: ToField<Bytes32>;
  readonly tokens: ToField<Set<ToPhantom<Bytes32>>>;
  readonly gasUsage: ToField<"u64">;

  private constructor(typeArgs: [], fields: AnotherBridgeFields) {
    this.$fullTypeName = composeSuiType(
      AnotherBridge.$typeName,
      ...typeArgs
    ) as `${string}::another_bridge::AnotherBridge`;
    this.$typeArgs = typeArgs;

    this.address = fields.address;
    this.tokens = fields.tokens;
    this.gasUsage = fields.gasUsage;
  }

  static reified(): AnotherBridgeReified {
    const reifiedBcs = AnotherBridge.bcs;
    return {
      get typeName() {
        return AnotherBridge.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(AnotherBridge.$typeName, ...[]) as `${string}::another_bridge::AnotherBridge`;
      },
      typeArgs: [] as [],
      isPhantom: AnotherBridge.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AnotherBridge.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AnotherBridge.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AnotherBridge.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AnotherBridge.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AnotherBridge.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => AnotherBridge.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AnotherBridge.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AnotherBridge.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AnotherBridge.fetch(client, id),
      new: (fields: AnotherBridgeFields) => {
        return new AnotherBridge([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): AnotherBridgeReified {
    return AnotherBridge.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<AnotherBridge>> {
    return phantom(AnotherBridge.reified());
  }

  static get p(): PhantomReified<ToTypeStr<AnotherBridge>> {
    return AnotherBridge.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("AnotherBridge", {
      address: Bytes32.bcs,
      tokens: Set.bcs,
      gas_usage: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof AnotherBridge.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof AnotherBridge.instantiateBcs> {
    if (!AnotherBridge.cachedBcs) {
      AnotherBridge.cachedBcs = AnotherBridge.instantiateBcs();
    }
    return AnotherBridge.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): AnotherBridge {
    return AnotherBridge.reified().new({
      address: decodeFromFields(Bytes32.reified(), fields.address),
      tokens: decodeFromFields(Set.reified(phantom(Bytes32.reified())), fields.tokens),
      gasUsage: decodeFromFields("u64", fields.gas_usage),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AnotherBridge {
    if (!isAnotherBridge(item.type)) {
      throw new Error("not a AnotherBridge type");
    }

    return AnotherBridge.reified().new({
      address: decodeFromFieldsWithTypes(Bytes32.reified(), item.fields.address),
      tokens: decodeFromFieldsWithTypes(Set.reified(phantom(Bytes32.reified())), item.fields.tokens),
      gasUsage: decodeFromFieldsWithTypes("u64", item.fields.gas_usage),
    });
  }

  static fromBcs(data: Uint8Array): AnotherBridge {
    return AnotherBridge.fromFields(AnotherBridge.bcs.parse(data));
  }

  toJSONField(): AnotherBridgeJSONField {
    return {
      address: this.address.toJSONField(),
      tokens: this.tokens.toJSONField(),
      gasUsage: this.gasUsage.toString(),
    };
  }

  toJSON(): AnotherBridgeJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): AnotherBridge {
    return AnotherBridge.reified().new({
      address: decodeFromJSONField(Bytes32.reified(), field.address),
      tokens: decodeFromJSONField(Set.reified(phantom(Bytes32.reified())), field.tokens),
      gasUsage: decodeFromJSONField("u64", field.gasUsage),
    });
  }

  static fromJSON(json: Record<string, any>): AnotherBridge {
    if (json.$typeName !== AnotherBridge.$typeName) {
      throw new Error(
        `not a AnotherBridge json object: expected '${AnotherBridge.$typeName}' but got '${json.$typeName}'`
      );
    }

    return AnotherBridge.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AnotherBridge {
    if (!isAnotherBridge(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AnotherBridge object`);
    }
    return AnotherBridge.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AnotherBridge.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AnotherBridge {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isAnotherBridge(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AnotherBridge object`);
    }
    return AnotherBridge.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AnotherBridge.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AnotherBridge {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isAnotherBridge(data.bcs.type)) {
        throw new Error(`object at is not a AnotherBridge object`);
      }

      return AnotherBridge.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return AnotherBridge.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AnotherBridge> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isAnotherBridge(object.type)) {
      throw new Error(`object at id ${id} is not a AnotherBridge object`);
    }
    return AnotherBridge.fromBcs(object.content);
  }
}
