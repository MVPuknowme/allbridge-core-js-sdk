// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64, fromHex, toHex } from "@mysten/sui/utils";
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

/* ============================== FeeCollectorCap =============================== */

export function isFeeCollectorCap(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("cctp-bridge", "cctp_bridge::FeeCollectorCap")}::cctp_bridge::FeeCollectorCap`;
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

  static get $typeName(): `${string}::cctp_bridge::FeeCollectorCap` {
    return `${getTypeOrigin("cctp-bridge", "cctp_bridge::FeeCollectorCap")}::cctp_bridge::FeeCollectorCap` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof FeeCollectorCap.$typeName = FeeCollectorCap.$typeName;
  readonly $fullTypeName: `${string}::cctp_bridge::FeeCollectorCap`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof FeeCollectorCap.$isPhantom = FeeCollectorCap.$isPhantom;

  readonly dummyField: ToField<"bool">;

  private constructor(typeArgs: [], fields: FeeCollectorCapFields) {
    this.$fullTypeName = composeSuiType(
      FeeCollectorCap.$typeName,
      ...typeArgs
    ) as `${string}::cctp_bridge::FeeCollectorCap`;
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
        return composeSuiType(FeeCollectorCap.$typeName, ...[]) as `${string}::cctp_bridge::FeeCollectorCap`;
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

/* ============================== CctpBridge =============================== */

export function isCctpBridge(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("cctp-bridge", "cctp_bridge::CctpBridge")}::cctp_bridge::CctpBridge`;
}

export interface CctpBridgeFields {
  id: ToField<UID>;
  /** chainId => domainNumber */
  chainIdDomainMap: ToField<Table<"u8", "u32">>;
  senders: ToField<Table<"u64", "address">>;
  feeCollector: ToField<FeeCollector<ToPhantom<FeeCollectorCap>>>;
  feeCollectorCap: ToField<FeeCollectorCap>;
  adminFeeShareBp: ToField<"u64">;
  gasUsage: ToField<Table<"u8", "u64">>;
}

export type CctpBridgeReified = Reified<CctpBridge, CctpBridgeFields>;

export type CctpBridgeJSONField = {
  id: string;
  chainIdDomainMap: ToJSON<Table<"u8", "u32">>;
  senders: ToJSON<Table<"u64", "address">>;
  feeCollector: ToJSON<FeeCollector<ToPhantom<FeeCollectorCap>>>;
  feeCollectorCap: ToJSON<FeeCollectorCap>;
  adminFeeShareBp: string;
  gasUsage: ToJSON<Table<"u8", "u64">>;
};

export type CctpBridgeJSON = {
  $typeName: typeof CctpBridge.$typeName;
  $typeArgs: [];
} & CctpBridgeJSONField;

export class CctpBridge implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::cctp_bridge::CctpBridge` {
    return `${getTypeOrigin("cctp-bridge", "cctp_bridge::CctpBridge")}::cctp_bridge::CctpBridge` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof CctpBridge.$typeName = CctpBridge.$typeName;
  readonly $fullTypeName: `${string}::cctp_bridge::CctpBridge`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof CctpBridge.$isPhantom = CctpBridge.$isPhantom;

  readonly id: ToField<UID>;
  /** chainId => domainNumber */
  readonly chainIdDomainMap: ToField<Table<"u8", "u32">>;
  readonly senders: ToField<Table<"u64", "address">>;
  readonly feeCollector: ToField<FeeCollector<ToPhantom<FeeCollectorCap>>>;
  readonly feeCollectorCap: ToField<FeeCollectorCap>;
  readonly adminFeeShareBp: ToField<"u64">;
  readonly gasUsage: ToField<Table<"u8", "u64">>;

  private constructor(typeArgs: [], fields: CctpBridgeFields) {
    this.$fullTypeName = composeSuiType(CctpBridge.$typeName, ...typeArgs) as `${string}::cctp_bridge::CctpBridge`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.chainIdDomainMap = fields.chainIdDomainMap;
    this.senders = fields.senders;
    this.feeCollector = fields.feeCollector;
    this.feeCollectorCap = fields.feeCollectorCap;
    this.adminFeeShareBp = fields.adminFeeShareBp;
    this.gasUsage = fields.gasUsage;
  }

  static reified(): CctpBridgeReified {
    const reifiedBcs = CctpBridge.bcs;
    return {
      get typeName() {
        return CctpBridge.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(CctpBridge.$typeName, ...[]) as `${string}::cctp_bridge::CctpBridge`;
      },
      typeArgs: [] as [],
      isPhantom: CctpBridge.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CctpBridge.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CctpBridge.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CctpBridge.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CctpBridge.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CctpBridge.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => CctpBridge.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => CctpBridge.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CctpBridge.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => CctpBridge.fetch(client, id),
      new: (fields: CctpBridgeFields) => {
        return new CctpBridge([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): CctpBridgeReified {
    return CctpBridge.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<CctpBridge>> {
    return phantom(CctpBridge.reified());
  }

  static get p(): PhantomReified<ToTypeStr<CctpBridge>> {
    return CctpBridge.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("CctpBridge", {
      id: UID.bcs,
      chain_id_domain_map: Table.bcs,
      senders: Table.bcs,
      fee_collector: FeeCollector.bcs,
      fee_collector_cap: FeeCollectorCap.bcs,
      admin_fee_share_bp: bcs.u64(),
      gas_usage: Table.bcs,
    });
  }

  private static cachedBcs: ReturnType<typeof CctpBridge.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof CctpBridge.instantiateBcs> {
    if (!CctpBridge.cachedBcs) {
      CctpBridge.cachedBcs = CctpBridge.instantiateBcs();
    }
    return CctpBridge.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): CctpBridge {
    return CctpBridge.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      chainIdDomainMap: decodeFromFields(Table.reified(phantom("u8"), phantom("u32")), fields.chain_id_domain_map),
      senders: decodeFromFields(Table.reified(phantom("u64"), phantom("address")), fields.senders),
      feeCollector: decodeFromFields(FeeCollector.reified(phantom(FeeCollectorCap.reified())), fields.fee_collector),
      feeCollectorCap: decodeFromFields(FeeCollectorCap.reified(), fields.fee_collector_cap),
      adminFeeShareBp: decodeFromFields("u64", fields.admin_fee_share_bp),
      gasUsage: decodeFromFields(Table.reified(phantom("u8"), phantom("u64")), fields.gas_usage),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CctpBridge {
    if (!isCctpBridge(item.type)) {
      throw new Error("not a CctpBridge type");
    }

    return CctpBridge.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      chainIdDomainMap: decodeFromFieldsWithTypes(
        Table.reified(phantom("u8"), phantom("u32")),
        item.fields.chain_id_domain_map
      ),
      senders: decodeFromFieldsWithTypes(Table.reified(phantom("u64"), phantom("address")), item.fields.senders),
      feeCollector: decodeFromFieldsWithTypes(
        FeeCollector.reified(phantom(FeeCollectorCap.reified())),
        item.fields.fee_collector
      ),
      feeCollectorCap: decodeFromFieldsWithTypes(FeeCollectorCap.reified(), item.fields.fee_collector_cap),
      adminFeeShareBp: decodeFromFieldsWithTypes("u64", item.fields.admin_fee_share_bp),
      gasUsage: decodeFromFieldsWithTypes(Table.reified(phantom("u8"), phantom("u64")), item.fields.gas_usage),
    });
  }

  static fromBcs(data: Uint8Array): CctpBridge {
    return CctpBridge.fromFields(CctpBridge.bcs.parse(data));
  }

  toJSONField(): CctpBridgeJSONField {
    return {
      id: this.id,
      chainIdDomainMap: this.chainIdDomainMap.toJSONField(),
      senders: this.senders.toJSONField(),
      feeCollector: this.feeCollector.toJSONField(),
      feeCollectorCap: this.feeCollectorCap.toJSONField(),
      adminFeeShareBp: this.adminFeeShareBp.toString(),
      gasUsage: this.gasUsage.toJSONField(),
    };
  }

  toJSON(): CctpBridgeJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): CctpBridge {
    return CctpBridge.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      chainIdDomainMap: decodeFromJSONField(Table.reified(phantom("u8"), phantom("u32")), field.chainIdDomainMap),
      senders: decodeFromJSONField(Table.reified(phantom("u64"), phantom("address")), field.senders),
      feeCollector: decodeFromJSONField(FeeCollector.reified(phantom(FeeCollectorCap.reified())), field.feeCollector),
      feeCollectorCap: decodeFromJSONField(FeeCollectorCap.reified(), field.feeCollectorCap),
      adminFeeShareBp: decodeFromJSONField("u64", field.adminFeeShareBp),
      gasUsage: decodeFromJSONField(Table.reified(phantom("u8"), phantom("u64")), field.gasUsage),
    });
  }

  static fromJSON(json: Record<string, any>): CctpBridge {
    if (json.$typeName !== CctpBridge.$typeName) {
      throw new Error(`not a CctpBridge json object: expected '${CctpBridge.$typeName}' but got '${json.$typeName}'`);
    }

    return CctpBridge.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CctpBridge {
    if (!isCctpBridge(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CctpBridge object`);
    }
    return CctpBridge.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CctpBridge.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CctpBridge {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isCctpBridge(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CctpBridge object`);
    }
    return CctpBridge.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CctpBridge.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CctpBridge {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isCctpBridge(data.bcs.type)) {
        throw new Error(`object at is not a CctpBridge object`);
      }

      return CctpBridge.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return CctpBridge.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CctpBridge> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isCctpBridge(object.type)) {
      throw new Error(`object at id ${id} is not a CctpBridge object`);
    }
    return CctpBridge.fromBcs(object.content);
  }
}

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("cctp-bridge", "cctp_bridge::AdminCap")}::cctp_bridge::AdminCap`;
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

  static get $typeName(): `${string}::cctp_bridge::AdminCap` {
    return `${getTypeOrigin("cctp-bridge", "cctp_bridge::AdminCap")}::cctp_bridge::AdminCap` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof AdminCap.$typeName = AdminCap.$typeName;
  readonly $fullTypeName: `${string}::cctp_bridge::AdminCap`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof AdminCap.$isPhantom = AdminCap.$isPhantom;

  readonly id: ToField<UID>;

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(AdminCap.$typeName, ...typeArgs) as `${string}::cctp_bridge::AdminCap`;
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
        return composeSuiType(AdminCap.$typeName, ...[]) as `${string}::cctp_bridge::AdminCap`;
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
