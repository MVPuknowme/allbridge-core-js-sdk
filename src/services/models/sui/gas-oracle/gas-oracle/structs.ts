// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64 } from "@mysten/sui/utils";
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

/* ============================== ChainData =============================== */

export function isChainData(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("gas-oracle", "gas_oracle::ChainData")}::gas_oracle::ChainData`;
}

export interface ChainDataFields {
  gasPrice: ToField<"u128">;
  price: ToField<"u128">;
}

export type ChainDataReified = Reified<ChainData, ChainDataFields>;

export type ChainDataJSONField = {
  gasPrice: string;
  price: string;
};

export type ChainDataJSON = {
  $typeName: typeof ChainData.$typeName;
  $typeArgs: [];
} & ChainDataJSONField;

/** Structure for storing gas price and token price */
export class ChainData implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::gas_oracle::ChainData` {
    return `${getTypeOrigin("gas-oracle", "gas_oracle::ChainData")}::gas_oracle::ChainData` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof ChainData.$typeName = ChainData.$typeName;
  readonly $fullTypeName: `${string}::gas_oracle::ChainData`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof ChainData.$isPhantom = ChainData.$isPhantom;

  readonly gasPrice: ToField<"u128">;
  readonly price: ToField<"u128">;

  private constructor(typeArgs: [], fields: ChainDataFields) {
    this.$fullTypeName = composeSuiType(ChainData.$typeName, ...typeArgs) as `${string}::gas_oracle::ChainData`;
    this.$typeArgs = typeArgs;

    this.gasPrice = fields.gasPrice;
    this.price = fields.price;
  }

  static reified(): ChainDataReified {
    const reifiedBcs = ChainData.bcs;
    return {
      get typeName() {
        return ChainData.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(ChainData.$typeName, ...[]) as `${string}::gas_oracle::ChainData`;
      },
      typeArgs: [] as [],
      isPhantom: ChainData.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ChainData.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ChainData.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ChainData.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ChainData.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ChainData.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => ChainData.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ChainData.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ChainData.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ChainData.fetch(client, id),
      new: (fields: ChainDataFields) => {
        return new ChainData([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): ChainDataReified {
    return ChainData.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<ChainData>> {
    return phantom(ChainData.reified());
  }

  static get p(): PhantomReified<ToTypeStr<ChainData>> {
    return ChainData.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("ChainData", {
      gas_price: bcs.u128(),
      price: bcs.u128(),
    });
  }

  private static cachedBcs: ReturnType<typeof ChainData.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof ChainData.instantiateBcs> {
    if (!ChainData.cachedBcs) {
      ChainData.cachedBcs = ChainData.instantiateBcs();
    }
    return ChainData.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): ChainData {
    return ChainData.reified().new({
      gasPrice: decodeFromFields("u128", fields.gas_price),
      price: decodeFromFields("u128", fields.price),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ChainData {
    if (!isChainData(item.type)) {
      throw new Error("not a ChainData type");
    }

    return ChainData.reified().new({
      gasPrice: decodeFromFieldsWithTypes("u128", item.fields.gas_price),
      price: decodeFromFieldsWithTypes("u128", item.fields.price),
    });
  }

  static fromBcs(data: Uint8Array): ChainData {
    return ChainData.fromFields(ChainData.bcs.parse(data));
  }

  toJSONField(): ChainDataJSONField {
    return {
      gasPrice: this.gasPrice.toString(),
      price: this.price.toString(),
    };
  }

  toJSON(): ChainDataJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): ChainData {
    return ChainData.reified().new({
      gasPrice: decodeFromJSONField("u128", field.gasPrice),
      price: decodeFromJSONField("u128", field.price),
    });
  }

  static fromJSON(json: Record<string, any>): ChainData {
    if (json.$typeName !== ChainData.$typeName) {
      throw new Error(`not a ChainData json object: expected '${ChainData.$typeName}' but got '${json.$typeName}'`);
    }

    return ChainData.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ChainData {
    if (!isChainData(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ChainData object`);
    }
    return ChainData.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ChainData.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ChainData {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isChainData(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ChainData object`);
    }
    return ChainData.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ChainData.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ChainData {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isChainData(data.bcs.type)) {
        throw new Error(`object at is not a ChainData object`);
      }

      return ChainData.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return ChainData.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ChainData> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isChainData(object.type)) {
      throw new Error(`object at id ${id} is not a ChainData object`);
    }
    return ChainData.fromBcs(object.content);
  }
}

/* ============================== GasOracle =============================== */

export function isGasOracle(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("gas-oracle", "gas_oracle::GasOracle")}::gas_oracle::GasOracle`;
}

export interface GasOracleFields {
  id: ToField<UID>;
  data: ToField<Table<"u8", ToPhantom<ChainData>>>;
}

export type GasOracleReified = Reified<GasOracle, GasOracleFields>;

export type GasOracleJSONField = {
  id: string;
  data: ToJSON<Table<"u8", ToPhantom<ChainData>>>;
};

export type GasOracleJSON = {
  $typeName: typeof GasOracle.$typeName;
  $typeArgs: [];
} & GasOracleJSONField;

/** Structure for storing a map (chainId -> GasInfo) */
export class GasOracle implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::gas_oracle::GasOracle` {
    return `${getTypeOrigin("gas-oracle", "gas_oracle::GasOracle")}::gas_oracle::GasOracle` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof GasOracle.$typeName = GasOracle.$typeName;
  readonly $fullTypeName: `${string}::gas_oracle::GasOracle`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof GasOracle.$isPhantom = GasOracle.$isPhantom;

  readonly id: ToField<UID>;
  readonly data: ToField<Table<"u8", ToPhantom<ChainData>>>;

  private constructor(typeArgs: [], fields: GasOracleFields) {
    this.$fullTypeName = composeSuiType(GasOracle.$typeName, ...typeArgs) as `${string}::gas_oracle::GasOracle`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.data = fields.data;
  }

  static reified(): GasOracleReified {
    const reifiedBcs = GasOracle.bcs;
    return {
      get typeName() {
        return GasOracle.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(GasOracle.$typeName, ...[]) as `${string}::gas_oracle::GasOracle`;
      },
      typeArgs: [] as [],
      isPhantom: GasOracle.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => GasOracle.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => GasOracle.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => GasOracle.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => GasOracle.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => GasOracle.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => GasOracle.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => GasOracle.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => GasOracle.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => GasOracle.fetch(client, id),
      new: (fields: GasOracleFields) => {
        return new GasOracle([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): GasOracleReified {
    return GasOracle.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<GasOracle>> {
    return phantom(GasOracle.reified());
  }

  static get p(): PhantomReified<ToTypeStr<GasOracle>> {
    return GasOracle.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("GasOracle", {
      id: UID.bcs,
      data: Table.bcs,
    });
  }

  private static cachedBcs: ReturnType<typeof GasOracle.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof GasOracle.instantiateBcs> {
    if (!GasOracle.cachedBcs) {
      GasOracle.cachedBcs = GasOracle.instantiateBcs();
    }
    return GasOracle.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): GasOracle {
    return GasOracle.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      data: decodeFromFields(Table.reified(phantom("u8"), phantom(ChainData.reified())), fields.data),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): GasOracle {
    if (!isGasOracle(item.type)) {
      throw new Error("not a GasOracle type");
    }

    return GasOracle.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      data: decodeFromFieldsWithTypes(Table.reified(phantom("u8"), phantom(ChainData.reified())), item.fields.data),
    });
  }

  static fromBcs(data: Uint8Array): GasOracle {
    return GasOracle.fromFields(GasOracle.bcs.parse(data));
  }

  toJSONField(): GasOracleJSONField {
    return {
      id: this.id,
      data: this.data.toJSONField(),
    };
  }

  toJSON(): GasOracleJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): GasOracle {
    return GasOracle.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      data: decodeFromJSONField(Table.reified(phantom("u8"), phantom(ChainData.reified())), field.data),
    });
  }

  static fromJSON(json: Record<string, any>): GasOracle {
    if (json.$typeName !== GasOracle.$typeName) {
      throw new Error(`not a GasOracle json object: expected '${GasOracle.$typeName}' but got '${json.$typeName}'`);
    }

    return GasOracle.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): GasOracle {
    if (!isGasOracle(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a GasOracle object`);
    }
    return GasOracle.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GasOracle.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): GasOracle {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isGasOracle(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a GasOracle object`);
    }
    return GasOracle.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GasOracle.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): GasOracle {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isGasOracle(data.bcs.type)) {
        throw new Error(`object at is not a GasOracle object`);
      }

      return GasOracle.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return GasOracle.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<GasOracle> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isGasOracle(object.type)) {
      throw new Error(`object at id ${id} is not a GasOracle object`);
    }
    return GasOracle.fromBcs(object.content);
  }
}

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("gas-oracle", "gas_oracle::AdminCap")}::gas_oracle::AdminCap`;
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

  static get $typeName(): `${string}::gas_oracle::AdminCap` {
    return `${getTypeOrigin("gas-oracle", "gas_oracle::AdminCap")}::gas_oracle::AdminCap` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof AdminCap.$typeName = AdminCap.$typeName;
  readonly $fullTypeName: `${string}::gas_oracle::AdminCap`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof AdminCap.$isPhantom = AdminCap.$isPhantom;

  readonly id: ToField<UID>;

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(AdminCap.$typeName, ...typeArgs) as `${string}::gas_oracle::AdminCap`;
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
        return composeSuiType(AdminCap.$typeName, ...[]) as `${string}::gas_oracle::AdminCap`;
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
