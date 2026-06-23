// @ts-nocheck
/** Module: pool */

import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64 } from "@mysten/sui/utils";
import { Balance } from "../../_dependencies/sui/balance/structs";
import { UID } from "../../_dependencies/sui/object/structs";
import { getTypeOrigin } from "../../_envs";
import {
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  phantom,
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToPhantomTypeArgument,
  ToTypeStr,
} from "../../_framework/reified";
import { composeSuiType, compressSuiType, FieldsWithTypes, parseTypeName } from "../../_framework/util";
import { PoolRewards } from "../pool-rewards/structs";
import { PoolState } from "../pool-state/structs";

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "pool::AdminCap")}::pool::AdminCap`;
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

  static get $typeName(): `${string}::pool::AdminCap` {
    return `${getTypeOrigin("bridge", "pool::AdminCap")}::pool::AdminCap` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof AdminCap.$typeName = AdminCap.$typeName;
  readonly $fullTypeName: `${string}::pool::AdminCap`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof AdminCap.$isPhantom = AdminCap.$isPhantom;

  readonly id: ToField<UID>;

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(AdminCap.$typeName, ...typeArgs) as `${string}::pool::AdminCap`;
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
        return composeSuiType(AdminCap.$typeName, ...[]) as `${string}::pool::AdminCap`;
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

/* ============================== StopCap =============================== */

export function isStopCap(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("bridge", "pool::StopCap")}::pool::StopCap`;
}

export interface StopCapFields {
  id: ToField<UID>;
}

export type StopCapReified = Reified<StopCap, StopCapFields>;

export type StopCapJSONField = {
  id: string;
};

export type StopCapJSON = {
  $typeName: typeof StopCap.$typeName;
  $typeArgs: [];
} & StopCapJSONField;

/** Structure for admin privileges */
export class StopCap implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::pool::StopCap` {
    return `${getTypeOrigin("bridge", "pool::StopCap")}::pool::StopCap` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof StopCap.$typeName = StopCap.$typeName;
  readonly $fullTypeName: `${string}::pool::StopCap`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof StopCap.$isPhantom = StopCap.$isPhantom;

  readonly id: ToField<UID>;

  private constructor(typeArgs: [], fields: StopCapFields) {
    this.$fullTypeName = composeSuiType(StopCap.$typeName, ...typeArgs) as `${string}::pool::StopCap`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
  }

  static reified(): StopCapReified {
    const reifiedBcs = StopCap.bcs;
    return {
      get typeName() {
        return StopCap.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(StopCap.$typeName, ...[]) as `${string}::pool::StopCap`;
      },
      typeArgs: [] as [],
      isPhantom: StopCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => StopCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => StopCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => StopCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => StopCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => StopCap.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => StopCap.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => StopCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => StopCap.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => StopCap.fetch(client, id),
      new: (fields: StopCapFields) => {
        return new StopCap([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): StopCapReified {
    return StopCap.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<StopCap>> {
    return phantom(StopCap.reified());
  }

  static get p(): PhantomReified<ToTypeStr<StopCap>> {
    return StopCap.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("StopCap", {
      id: UID.bcs,
    });
  }

  private static cachedBcs: ReturnType<typeof StopCap.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof StopCap.instantiateBcs> {
    if (!StopCap.cachedBcs) {
      StopCap.cachedBcs = StopCap.instantiateBcs();
    }
    return StopCap.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): StopCap {
    return StopCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): StopCap {
    if (!isStopCap(item.type)) {
      throw new Error("not a StopCap type");
    }

    return StopCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    });
  }

  static fromBcs(data: Uint8Array): StopCap {
    return StopCap.fromFields(StopCap.bcs.parse(data));
  }

  toJSONField(): StopCapJSONField {
    return {
      id: this.id,
    };
  }

  toJSON(): StopCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): StopCap {
    return StopCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    });
  }

  static fromJSON(json: Record<string, any>): StopCap {
    if (json.$typeName !== StopCap.$typeName) {
      throw new Error(`not a StopCap json object: expected '${StopCap.$typeName}' but got '${json.$typeName}'`);
    }

    return StopCap.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): StopCap {
    if (!isStopCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a StopCap object`);
    }
    return StopCap.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link StopCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): StopCap {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isStopCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a StopCap object`);
    }
    return StopCap.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link StopCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): StopCap {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isStopCap(data.bcs.type)) {
        throw new Error(`object at is not a StopCap object`);
      }

      return StopCap.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return StopCap.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<StopCap> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isStopCap(object.type)) {
      throw new Error(`object at id ${id} is not a StopCap object`);
    }
    return StopCap.fromBcs(object.content);
  }
}

/* ============================== Pool =============================== */

export function isPool(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`${getTypeOrigin("bridge", "pool::Pool")}::pool::Pool` + "<");
}

export interface PoolFields<T extends PhantomTypeArgument> {
  id: ToField<UID>;
  state: ToField<PoolState<T>>;
  rewards: ToField<PoolRewards<T>>;
  feeShareBp: ToField<"u64">;
  canDeposit: ToField<"bool">;
  canWithdraw: ToField<"bool">;
  decimals: ToField<"u8">;
  balance: ToField<Balance<T>>;
}

export type PoolReified<T extends PhantomTypeArgument> = Reified<Pool<T>, PoolFields<T>>;

export type PoolJSONField<T extends PhantomTypeArgument> = {
  id: string;
  state: ToJSON<PoolState<T>>;
  rewards: ToJSON<PoolRewards<T>>;
  feeShareBp: string;
  canDeposit: boolean;
  canWithdraw: boolean;
  decimals: number;
  balance: ToJSON<Balance<T>>;
};

export type PoolJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof Pool.$typeName;
  $typeArgs: [PhantomToTypeStr<T>];
} & PoolJSONField<T>;

export class Pool<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::pool::Pool` {
    return `${getTypeOrigin("bridge", "pool::Pool")}::pool::Pool` as const;
  }
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName: typeof Pool.$typeName = Pool.$typeName;
  readonly $fullTypeName: `${string}::pool::Pool<${PhantomToTypeStr<T>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T>];
  readonly $isPhantom: typeof Pool.$isPhantom = Pool.$isPhantom;

  readonly id: ToField<UID>;
  readonly state: ToField<PoolState<T>>;
  readonly rewards: ToField<PoolRewards<T>>;
  readonly feeShareBp: ToField<"u64">;
  readonly canDeposit: ToField<"bool">;
  readonly canWithdraw: ToField<"bool">;
  readonly decimals: ToField<"u8">;
  readonly balance: ToField<Balance<T>>;

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: PoolFields<T>) {
    this.$fullTypeName = composeSuiType(Pool.$typeName, ...typeArgs) as `${string}::pool::Pool<${PhantomToTypeStr<T>}>`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.state = fields.state;
    this.rewards = fields.rewards;
    this.feeShareBp = fields.feeShareBp;
    this.canDeposit = fields.canDeposit;
    this.canWithdraw = fields.canWithdraw;
    this.decimals = fields.decimals;
    this.balance = fields.balance;
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(T: T): PoolReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = Pool.bcs;
    return {
      get typeName() {
        return Pool.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(
          Pool.$typeName,
          ...[extractType(T)]
        ) as `${string}::pool::Pool<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`;
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>];
      },
      isPhantom: Pool.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => Pool.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Pool.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => Pool.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Pool.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => Pool.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Pool.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => Pool.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => Pool.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => Pool.fetch(client, T, id),
      new: (fields: PoolFields<ToPhantomTypeArgument<T>>) => {
        return new Pool([extractType(T)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): typeof Pool.reified {
    return Pool.reified;
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<Pool<ToPhantomTypeArgument<T>>>> {
    return phantom(Pool.reified(T));
  }

  static get p(): typeof Pool.phantom {
    return Pool.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("Pool", {
      id: UID.bcs,
      state: PoolState.bcs,
      rewards: PoolRewards.bcs,
      fee_share_bp: bcs.u64(),
      can_deposit: bcs.bool(),
      can_withdraw: bcs.bool(),
      decimals: bcs.u8(),
      balance: Balance.bcs,
    });
  }

  private static cachedBcs: ReturnType<typeof Pool.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof Pool.instantiateBcs> {
    if (!Pool.cachedBcs) {
      Pool.cachedBcs = Pool.instantiateBcs();
    }
    return Pool.cachedBcs;
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): Pool<ToPhantomTypeArgument<T>> {
    return Pool.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      state: decodeFromFields(PoolState.reified(typeArg), fields.state),
      rewards: decodeFromFields(PoolRewards.reified(typeArg), fields.rewards),
      feeShareBp: decodeFromFields("u64", fields.fee_share_bp),
      canDeposit: decodeFromFields("bool", fields.can_deposit),
      canWithdraw: decodeFromFields("bool", fields.can_withdraw),
      decimals: decodeFromFields("u8", fields.decimals),
      balance: decodeFromFields(Balance.reified(typeArg), fields.balance),
    });
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): Pool<ToPhantomTypeArgument<T>> {
    if (!isPool(item.type)) {
      throw new Error("not a Pool type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return Pool.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      state: decodeFromFieldsWithTypes(PoolState.reified(typeArg), item.fields.state),
      rewards: decodeFromFieldsWithTypes(PoolRewards.reified(typeArg), item.fields.rewards),
      feeShareBp: decodeFromFieldsWithTypes("u64", item.fields.fee_share_bp),
      canDeposit: decodeFromFieldsWithTypes("bool", item.fields.can_deposit),
      canWithdraw: decodeFromFieldsWithTypes("bool", item.fields.can_withdraw),
      decimals: decodeFromFieldsWithTypes("u8", item.fields.decimals),
      balance: decodeFromFieldsWithTypes(Balance.reified(typeArg), item.fields.balance),
    });
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): Pool<ToPhantomTypeArgument<T>> {
    return Pool.fromFields(typeArg, Pool.bcs.parse(data));
  }

  toJSONField(): PoolJSONField<T> {
    return {
      id: this.id,
      state: this.state.toJSONField(),
      rewards: this.rewards.toJSONField(),
      feeShareBp: this.feeShareBp.toString(),
      canDeposit: this.canDeposit,
      canWithdraw: this.canWithdraw,
      decimals: this.decimals,
      balance: this.balance.toJSONField(),
    };
  }

  toJSON(): PoolJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): Pool<ToPhantomTypeArgument<T>> {
    return Pool.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      state: decodeFromJSONField(PoolState.reified(typeArg), field.state),
      rewards: decodeFromJSONField(PoolRewards.reified(typeArg), field.rewards),
      feeShareBp: decodeFromJSONField("u64", field.feeShareBp),
      canDeposit: decodeFromJSONField("bool", field.canDeposit),
      canWithdraw: decodeFromJSONField("bool", field.canWithdraw),
      decimals: decodeFromJSONField("u8", field.decimals),
      balance: decodeFromJSONField(Balance.reified(typeArg), field.balance),
    });
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): Pool<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== Pool.$typeName) {
      throw new Error(`not a Pool json object: expected '${Pool.$typeName}' but got '${json.$typeName}'`);
    }
    assertReifiedTypeArgsMatch(composeSuiType(Pool.$typeName, ...[extractType(typeArg)]), json.$typeArgs, [typeArg]);

    return Pool.fromJSONField(typeArg, json);
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>
  ): Pool<ToPhantomTypeArgument<T>> {
    if (!isPool(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Pool object`);
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs;
    if (gotTypeArgs.length !== 1) {
      throw new Error(`type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`);
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i]);
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]));
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        );
      }
    }

    return Pool.fromBcs(typeArg, obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Pool.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): Pool<ToPhantomTypeArgument<T>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isPool(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Pool object`);
    }
    return Pool.fromFieldsWithTypes(typeArg, content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Pool.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): Pool<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isPool(data.bcs.type)) {
        throw new Error(`object at is not a Pool object`);
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs;
      if (gotTypeArgs.length !== 1) {
        throw new Error(`type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`);
      }
      for (let i = 0; i < 1; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i]);
        const expectedTypeArg = compressSuiType(extractType([typeArg][i]));
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
          );
        }
      }

      return Pool.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return Pool.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string
  ): Promise<Pool<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isPool(object.type)) {
      throw new Error(`object at id ${id} is not a Pool object`);
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs;
    if (gotTypeArgs.length !== 1) {
      throw new Error(`type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`);
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i]);
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]));
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        );
      }
    }

    return Pool.fromBcs(typeArg, object.content);
  }
}
