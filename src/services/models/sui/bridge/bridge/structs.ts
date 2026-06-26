// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64, fromHex, toHex } from "@mysten/sui/utils";
import { ObjectBag } from "../../_dependencies/sui/object-bag/structs";
import { UID } from "../../_dependencies/sui/object/structs";
import { Table } from "../../_dependencies/sui/table/structs";
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
import { FeeCollector } from "../../utils/fee-collector/structs";
import { Message } from "../../utils/message/structs";
import { Set } from "../../utils/set/structs";
import { AnotherBridge } from "../another-bridge/structs";

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "bridge::AdminCap")}::bridge::AdminCap`;
}

export interface AdminCapFields {
  id: ToField<UID>;
}

export type AdminCapReified = Reified<AdminCap, AdminCapFields>;

export type AdminCapJSONField = {
  id: string;
};

export type AdminCapJSON = {
  $typeName: typeof AdminCap.$typeName;
  $typeArgs: [];
} & AdminCapJSONField;

/** Structure for admin privileges */
export class AdminCap implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::bridge::AdminCap` {
    return `${getTypeOrigin("bridge", "bridge::AdminCap")}::bridge::AdminCap` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof AdminCap.$typeName = AdminCap.$typeName;
  readonly $fullTypeName: `${string}::bridge::AdminCap`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof AdminCap.$isPhantom = AdminCap.$isPhantom;

  readonly id: ToField<UID>;

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(AdminCap.$typeName, ...typeArgs) as `${string}::bridge::AdminCap`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
  }

  static reified(): AdminCapReified {
    const reifiedBcs = AdminCap.bcs;
    return {
      get typeName() {
        return AdminCap.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(AdminCap.$typeName, ...[]) as `${string}::bridge::AdminCap`;
      },
      typeArgs: [] as [],
      isPhantom: AdminCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AdminCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AdminCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AdminCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AdminCap.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => AdminCap.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AdminCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AdminCap.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AdminCap.fetch(client, id),
      new: (fields: AdminCapFields) => {
        return new AdminCap([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): AdminCapReified {
    return AdminCap.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<AdminCap>> {
    return phantom(AdminCap.reified());
  }

  static get p(): PhantomReified<ToTypeStr<AdminCap>> {
    return AdminCap.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("AdminCap", {
      id: UID.bcs,
    });
  }

  private static cachedBcs: ReturnType<typeof AdminCap.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof AdminCap.instantiateBcs> {
    if (!AdminCap.cachedBcs) {
      AdminCap.cachedBcs = AdminCap.instantiateBcs();
    }
    return AdminCap.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AdminCap {
    if (!isAdminCap(item.type)) {
      throw new Error("not a AdminCap type");
    }

    return AdminCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    });
  }

  static fromBcs(data: Uint8Array): AdminCap {
    return AdminCap.fromFields(AdminCap.bcs.parse(data));
  }

  toJSONField(): AdminCapJSONField {
    return {
      id: this.id,
    };
  }

  toJSON(): AdminCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    });
  }

  static fromJSON(json: Record<string, any>): AdminCap {
    if (json.$typeName !== AdminCap.$typeName) {
      throw new Error(`not a AdminCap json object: expected '${AdminCap.$typeName}' but got '${json.$typeName}'`);
    }

    return AdminCap.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AdminCap {
    if (!isAdminCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AdminCap object`);
    }
    return AdminCap.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AdminCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AdminCap {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isAdminCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AdminCap object`);
    }
    return AdminCap.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AdminCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AdminCap {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isAdminCap(data.bcs.type)) {
        throw new Error(`object at is not a AdminCap object`);
      }

      return AdminCap.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return AdminCap.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AdminCap> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isAdminCap(object.type)) {
      throw new Error(`object at id ${id} is not a AdminCap object`);
    }
    return AdminCap.fromBcs(object.content);
  }
}

/* ============================== FeeCollectorCap =============================== */

export function isFeeCollectorCap(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "bridge::FeeCollectorCap")}::bridge::FeeCollectorCap`;
}

export interface FeeCollectorCapFields {
  dummyField: ToField<"bool">;
}

export type FeeCollectorCapReified = Reified<FeeCollectorCap, FeeCollectorCapFields>;

export type FeeCollectorCapJSONField = {
  dummyField: boolean;
};

export type FeeCollectorCapJSON = {
  $typeName: typeof FeeCollectorCap.$typeName;
  $typeArgs: [];
} & FeeCollectorCapJSONField;

export class FeeCollectorCap implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::bridge::FeeCollectorCap` {
    return `${getTypeOrigin("bridge", "bridge::FeeCollectorCap")}::bridge::FeeCollectorCap` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof FeeCollectorCap.$typeName = FeeCollectorCap.$typeName;
  readonly $fullTypeName: `${string}::bridge::FeeCollectorCap`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof FeeCollectorCap.$isPhantom = FeeCollectorCap.$isPhantom;

  readonly dummyField: ToField<"bool">;

  private constructor(typeArgs: [], fields: FeeCollectorCapFields) {
    this.$fullTypeName = composeSuiType(FeeCollectorCap.$typeName, ...typeArgs) as `${string}::bridge::FeeCollectorCap`;
    this.$typeArgs = typeArgs;

    this.dummyField = fields.dummyField;
  }

  static reified(): FeeCollectorCapReified {
    const reifiedBcs = FeeCollectorCap.bcs;
    return {
      get typeName() {
        return FeeCollectorCap.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(FeeCollectorCap.$typeName, ...[]) as `${string}::bridge::FeeCollectorCap`;
      },
      typeArgs: [] as [],
      isPhantom: FeeCollectorCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FeeCollectorCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FeeCollectorCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FeeCollectorCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FeeCollectorCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FeeCollectorCap.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => FeeCollectorCap.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => FeeCollectorCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => FeeCollectorCap.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => FeeCollectorCap.fetch(client, id),
      new: (fields: FeeCollectorCapFields) => {
        return new FeeCollectorCap([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): FeeCollectorCapReified {
    return FeeCollectorCap.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<FeeCollectorCap>> {
    return phantom(FeeCollectorCap.reified());
  }

  static get p(): PhantomReified<ToTypeStr<FeeCollectorCap>> {
    return FeeCollectorCap.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("FeeCollectorCap", {
      dummy_field: bcs.bool(),
    });
  }

  private static cachedBcs: ReturnType<typeof FeeCollectorCap.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof FeeCollectorCap.instantiateBcs> {
    if (!FeeCollectorCap.cachedBcs) {
      FeeCollectorCap.cachedBcs = FeeCollectorCap.instantiateBcs();
    }
    return FeeCollectorCap.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): FeeCollectorCap {
    return FeeCollectorCap.reified().new({
      dummyField: decodeFromFields("bool", fields.dummy_field),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FeeCollectorCap {
    if (!isFeeCollectorCap(item.type)) {
      throw new Error("not a FeeCollectorCap type");
    }

    return FeeCollectorCap.reified().new({
      dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field),
    });
  }

  static fromBcs(data: Uint8Array): FeeCollectorCap {
    return FeeCollectorCap.fromFields(FeeCollectorCap.bcs.parse(data));
  }

  toJSONField(): FeeCollectorCapJSONField {
    return {
      dummyField: this.dummyField,
    };
  }

  toJSON(): FeeCollectorCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): FeeCollectorCap {
    return FeeCollectorCap.reified().new({
      dummyField: decodeFromJSONField("bool", field.dummyField),
    });
  }

  static fromJSON(json: Record<string, any>): FeeCollectorCap {
    if (json.$typeName !== FeeCollectorCap.$typeName) {
      throw new Error(
        `not a FeeCollectorCap json object: expected '${FeeCollectorCap.$typeName}' but got '${json.$typeName}'`
      );
    }

    return FeeCollectorCap.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): FeeCollectorCap {
    if (!isFeeCollectorCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a FeeCollectorCap object`);
    }
    return FeeCollectorCap.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FeeCollectorCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): FeeCollectorCap {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isFeeCollectorCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FeeCollectorCap object`);
    }
    return FeeCollectorCap.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FeeCollectorCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): FeeCollectorCap {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isFeeCollectorCap(data.bcs.type)) {
        throw new Error(`object at is not a FeeCollectorCap object`);
      }

      return FeeCollectorCap.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return FeeCollectorCap.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<FeeCollectorCap> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isFeeCollectorCap(object.type)) {
      throw new Error(`object at id ${id} is not a FeeCollectorCap object`);
    }
    return FeeCollectorCap.fromBcs(object.content);
  }
}

/* ============================== StopSwapCap =============================== */

export function isStopSwapCap(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "bridge::StopSwapCap")}::bridge::StopSwapCap`;
}

export interface StopSwapCapFields {
  id: ToField<UID>;
}

export type StopSwapCapReified = Reified<StopSwapCap, StopSwapCapFields>;

export type StopSwapCapJSONField = {
  id: string;
};

export type StopSwapCapJSON = {
  $typeName: typeof StopSwapCap.$typeName;
  $typeArgs: [];
} & StopSwapCapJSONField;

/** Structure for admin privileges */
export class StopSwapCap implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::bridge::StopSwapCap` {
    return `${getTypeOrigin("bridge", "bridge::StopSwapCap")}::bridge::StopSwapCap` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof StopSwapCap.$typeName = StopSwapCap.$typeName;
  readonly $fullTypeName: `${string}::bridge::StopSwapCap`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof StopSwapCap.$isPhantom = StopSwapCap.$isPhantom;

  readonly id: ToField<UID>;

  private constructor(typeArgs: [], fields: StopSwapCapFields) {
    this.$fullTypeName = composeSuiType(StopSwapCap.$typeName, ...typeArgs) as `${string}::bridge::StopSwapCap`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
  }

  static reified(): StopSwapCapReified {
    const reifiedBcs = StopSwapCap.bcs;
    return {
      get typeName() {
        return StopSwapCap.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(StopSwapCap.$typeName, ...[]) as `${string}::bridge::StopSwapCap`;
      },
      typeArgs: [] as [],
      isPhantom: StopSwapCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => StopSwapCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => StopSwapCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => StopSwapCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => StopSwapCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => StopSwapCap.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => StopSwapCap.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => StopSwapCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => StopSwapCap.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => StopSwapCap.fetch(client, id),
      new: (fields: StopSwapCapFields) => {
        return new StopSwapCap([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): StopSwapCapReified {
    return StopSwapCap.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<StopSwapCap>> {
    return phantom(StopSwapCap.reified());
  }

  static get p(): PhantomReified<ToTypeStr<StopSwapCap>> {
    return StopSwapCap.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("StopSwapCap", {
      id: UID.bcs,
    });
  }

  private static cachedBcs: ReturnType<typeof StopSwapCap.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof StopSwapCap.instantiateBcs> {
    if (!StopSwapCap.cachedBcs) {
      StopSwapCap.cachedBcs = StopSwapCap.instantiateBcs();
    }
    return StopSwapCap.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): StopSwapCap {
    return StopSwapCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): StopSwapCap {
    if (!isStopSwapCap(item.type)) {
      throw new Error("not a StopSwapCap type");
    }

    return StopSwapCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    });
  }

  static fromBcs(data: Uint8Array): StopSwapCap {
    return StopSwapCap.fromFields(StopSwapCap.bcs.parse(data));
  }

  toJSONField(): StopSwapCapJSONField {
    return {
      id: this.id,
    };
  }

  toJSON(): StopSwapCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): StopSwapCap {
    return StopSwapCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    });
  }

  static fromJSON(json: Record<string, any>): StopSwapCap {
    if (json.$typeName !== StopSwapCap.$typeName) {
      throw new Error(`not a StopSwapCap json object: expected '${StopSwapCap.$typeName}' but got '${json.$typeName}'`);
    }

    return StopSwapCap.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): StopSwapCap {
    if (!isStopSwapCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a StopSwapCap object`);
    }
    return StopSwapCap.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link StopSwapCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): StopSwapCap {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isStopSwapCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a StopSwapCap object`);
    }
    return StopSwapCap.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link StopSwapCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): StopSwapCap {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isStopSwapCap(data.bcs.type)) {
        throw new Error(`object at is not a StopSwapCap object`);
      }

      return StopSwapCap.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return StopSwapCap.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<StopSwapCap> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isStopSwapCap(object.type)) {
      throw new Error(`object at id ${id} is not a StopSwapCap object`);
    }
    return StopSwapCap.fromBcs(object.content);
  }
}

/* ============================== Bridge =============================== */

export function isBridge(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "bridge::Bridge")}::bridge::Bridge`;
}

export interface BridgeFields {
  id: ToField<UID>;
  /** TypeName => Pool<T> */
  pools: ToField<ObjectBag>;
  otherBridges: ToField<Table<"u8", ToPhantom<AnotherBridge>>>;
  processedMessages: ToField<Set<ToPhantom<Message>>>;
  sentMessages: ToField<Set<ToPhantom<Message>>>;
  feeCollector: ToField<FeeCollector<ToPhantom<FeeCollectorCap>>>;
  feeCollectorCap: ToField<FeeCollectorCap>;
  rebalancer: ToField<"address">;
  canSwap: ToField<"bool">;
}

export type BridgeReified = Reified<Bridge, BridgeFields>;

export type BridgeJSONField = {
  id: string;
  pools: ToJSON<ObjectBag>;
  otherBridges: ToJSON<Table<"u8", ToPhantom<AnotherBridge>>>;
  processedMessages: ToJSON<Set<ToPhantom<Message>>>;
  sentMessages: ToJSON<Set<ToPhantom<Message>>>;
  feeCollector: ToJSON<FeeCollector<ToPhantom<FeeCollectorCap>>>;
  feeCollectorCap: ToJSON<FeeCollectorCap>;
  rebalancer: string;
  canSwap: boolean;
};

export type BridgeJSON = {
  $typeName: typeof Bridge.$typeName;
  $typeArgs: [];
} & BridgeJSONField;

export class Bridge implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::bridge::Bridge` {
    return `${getTypeOrigin("bridge", "bridge::Bridge")}::bridge::Bridge` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof Bridge.$typeName = Bridge.$typeName;
  readonly $fullTypeName: `${string}::bridge::Bridge`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof Bridge.$isPhantom = Bridge.$isPhantom;

  readonly id: ToField<UID>;
  /** TypeName => Pool<T> */
  readonly pools: ToField<ObjectBag>;
  readonly otherBridges: ToField<Table<"u8", ToPhantom<AnotherBridge>>>;
  readonly processedMessages: ToField<Set<ToPhantom<Message>>>;
  readonly sentMessages: ToField<Set<ToPhantom<Message>>>;
  readonly feeCollector: ToField<FeeCollector<ToPhantom<FeeCollectorCap>>>;
  readonly feeCollectorCap: ToField<FeeCollectorCap>;
  readonly rebalancer: ToField<"address">;
  readonly canSwap: ToField<"bool">;

  private constructor(typeArgs: [], fields: BridgeFields) {
    this.$fullTypeName = composeSuiType(Bridge.$typeName, ...typeArgs) as `${string}::bridge::Bridge`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.pools = fields.pools;
    this.otherBridges = fields.otherBridges;
    this.processedMessages = fields.processedMessages;
    this.sentMessages = fields.sentMessages;
    this.feeCollector = fields.feeCollector;
    this.feeCollectorCap = fields.feeCollectorCap;
    this.rebalancer = fields.rebalancer;
    this.canSwap = fields.canSwap;
  }

  static reified(): BridgeReified {
    const reifiedBcs = Bridge.bcs;
    return {
      get typeName() {
        return Bridge.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(Bridge.$typeName, ...[]) as `${string}::bridge::Bridge`;
      },
      typeArgs: [] as [],
      isPhantom: Bridge.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Bridge.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Bridge.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Bridge.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Bridge.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Bridge.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Bridge.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Bridge.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Bridge.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Bridge.fetch(client, id),
      new: (fields: BridgeFields) => {
        return new Bridge([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): BridgeReified {
    return Bridge.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<Bridge>> {
    return phantom(Bridge.reified());
  }

  static get p(): PhantomReified<ToTypeStr<Bridge>> {
    return Bridge.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("Bridge", {
      id: UID.bcs,
      pools: ObjectBag.bcs,
      other_bridges: Table.bcs,
      processed_messages: Set.bcs,
      sent_messages: Set.bcs,
      fee_collector: FeeCollector.bcs,
      fee_collector_cap: FeeCollectorCap.bcs,
      rebalancer: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      can_swap: bcs.bool(),
    });
  }

  private static cachedBcs: ReturnType<typeof Bridge.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof Bridge.instantiateBcs> {
    if (!Bridge.cachedBcs) {
      Bridge.cachedBcs = Bridge.instantiateBcs();
    }
    return Bridge.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): Bridge {
    return Bridge.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      pools: decodeFromFields(ObjectBag.reified(), fields.pools),
      otherBridges: decodeFromFields(
        Table.reified(phantom("u8"), phantom(AnotherBridge.reified())),
        fields.other_bridges
      ),
      processedMessages: decodeFromFields(Set.reified(phantom(Message.reified())), fields.processed_messages),
      sentMessages: decodeFromFields(Set.reified(phantom(Message.reified())), fields.sent_messages),
      feeCollector: decodeFromFields(FeeCollector.reified(phantom(FeeCollectorCap.reified())), fields.fee_collector),
      feeCollectorCap: decodeFromFields(FeeCollectorCap.reified(), fields.fee_collector_cap),
      rebalancer: decodeFromFields("address", fields.rebalancer),
      canSwap: decodeFromFields("bool", fields.can_swap),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Bridge {
    if (!isBridge(item.type)) {
      throw new Error("not a Bridge type");
    }

    return Bridge.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      pools: decodeFromFieldsWithTypes(ObjectBag.reified(), item.fields.pools),
      otherBridges: decodeFromFieldsWithTypes(
        Table.reified(phantom("u8"), phantom(AnotherBridge.reified())),
        item.fields.other_bridges
      ),
      processedMessages: decodeFromFieldsWithTypes(
        Set.reified(phantom(Message.reified())),
        item.fields.processed_messages
      ),
      sentMessages: decodeFromFieldsWithTypes(Set.reified(phantom(Message.reified())), item.fields.sent_messages),
      feeCollector: decodeFromFieldsWithTypes(
        FeeCollector.reified(phantom(FeeCollectorCap.reified())),
        item.fields.fee_collector
      ),
      feeCollectorCap: decodeFromFieldsWithTypes(FeeCollectorCap.reified(), item.fields.fee_collector_cap),
      rebalancer: decodeFromFieldsWithTypes("address", item.fields.rebalancer),
      canSwap: decodeFromFieldsWithTypes("bool", item.fields.can_swap),
    });
  }

  static fromBcs(data: Uint8Array): Bridge {
    return Bridge.fromFields(Bridge.bcs.parse(data));
  }

  toJSONField(): BridgeJSONField {
    return {
      id: this.id,
      pools: this.pools.toJSONField(),
      otherBridges: this.otherBridges.toJSONField(),
      processedMessages: this.processedMessages.toJSONField(),
      sentMessages: this.sentMessages.toJSONField(),
      feeCollector: this.feeCollector.toJSONField(),
      feeCollectorCap: this.feeCollectorCap.toJSONField(),
      rebalancer: this.rebalancer,
      canSwap: this.canSwap,
    };
  }

  toJSON(): BridgeJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): Bridge {
    return Bridge.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      pools: decodeFromJSONField(ObjectBag.reified(), field.pools),
      otherBridges: decodeFromJSONField(
        Table.reified(phantom("u8"), phantom(AnotherBridge.reified())),
        field.otherBridges
      ),
      processedMessages: decodeFromJSONField(Set.reified(phantom(Message.reified())), field.processedMessages),
      sentMessages: decodeFromJSONField(Set.reified(phantom(Message.reified())), field.sentMessages),
      feeCollector: decodeFromJSONField(FeeCollector.reified(phantom(FeeCollectorCap.reified())), field.feeCollector),
      feeCollectorCap: decodeFromJSONField(FeeCollectorCap.reified(), field.feeCollectorCap),
      rebalancer: decodeFromJSONField("address", field.rebalancer),
      canSwap: decodeFromJSONField("bool", field.canSwap),
    });
  }

  static fromJSON(json: Record<string, any>): Bridge {
    if (json.$typeName !== Bridge.$typeName) {
      throw new Error(`not a Bridge json object: expected '${Bridge.$typeName}' but got '${json.$typeName}'`);
    }

    return Bridge.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Bridge {
    if (!isBridge(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Bridge object`);
    }
    return Bridge.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Bridge.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Bridge {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isBridge(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Bridge object`);
    }
    return Bridge.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Bridge.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Bridge {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isBridge(data.bcs.type)) {
        throw new Error(`object at is not a Bridge object`);
      }

      return Bridge.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return Bridge.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Bridge> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isBridge(object.type)) {
      throw new Error(`object at id ${id} is not a Bridge object`);
    }
    return Bridge.fromBcs(object.content);
  }
}
