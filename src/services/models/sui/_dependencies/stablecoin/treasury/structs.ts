// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64, fromHex, toHex } from "@mysten/sui/utils";
import { getTypeOrigin } from "../../../_envs";
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
  ToTypeStr as ToPhantom,
} from "../../../_framework/reified";
import { composeSuiType, compressSuiType, FieldsWithTypes, parseTypeName } from "../../../_framework/util";
import { ID, UID } from "../../sui/object/structs";
import { Table } from "../../sui/table/structs";
import { VecSet } from "../../sui/vec-set/structs";
import { MintAllowance } from "../mint-allowance/structs";

/* ============================== Treasury =============================== */

export function isTreasury(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`${getTypeOrigin("stablecoin", "treasury::Treasury")}::treasury::Treasury` + "<");
}

export interface TreasuryFields<T extends PhantomTypeArgument> {
  id: ToField<UID>;
  controllers: ToField<Table<"address", ToPhantom<ID>>>;
  mintAllowances: ToField<Table<ToPhantom<ID>, ToPhantom<MintAllowance<T>>>>;
  compatibleVersions: ToField<VecSet<"u64">>;
}

export type TreasuryReified<T extends PhantomTypeArgument> = Reified<Treasury<T>, TreasuryFields<T>>;

export type TreasuryJSONField<T extends PhantomTypeArgument> = {
  id: string;
  controllers: ToJSON<Table<"address", ToPhantom<ID>>>;
  mintAllowances: ToJSON<Table<ToPhantom<ID>, ToPhantom<MintAllowance<T>>>>;
  compatibleVersions: ToJSON<VecSet<"u64">>;
};

export type TreasuryJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof Treasury.$typeName;
  $typeArgs: [PhantomToTypeStr<T>];
} & TreasuryJSONField<T>;

export class Treasury<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::treasury::Treasury` {
    return `${getTypeOrigin("stablecoin", "treasury::Treasury")}::treasury::Treasury` as const;
  }
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName: typeof Treasury.$typeName = Treasury.$typeName;
  readonly $fullTypeName: `${string}::treasury::Treasury<${PhantomToTypeStr<T>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T>];
  readonly $isPhantom: typeof Treasury.$isPhantom = Treasury.$isPhantom;

  readonly id: ToField<UID>;
  readonly controllers: ToField<Table<"address", ToPhantom<ID>>>;
  readonly mintAllowances: ToField<Table<ToPhantom<ID>, ToPhantom<MintAllowance<T>>>>;
  readonly compatibleVersions: ToField<VecSet<"u64">>;

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: TreasuryFields<T>) {
    this.$fullTypeName = composeSuiType(
      Treasury.$typeName,
      ...typeArgs
    ) as `${string}::treasury::Treasury<${PhantomToTypeStr<T>}>`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.controllers = fields.controllers;
    this.mintAllowances = fields.mintAllowances;
    this.compatibleVersions = fields.compatibleVersions;
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(T: T): TreasuryReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = Treasury.bcs;
    return {
      get typeName() {
        return Treasury.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(
          Treasury.$typeName,
          ...[extractType(T)]
        ) as `${string}::treasury::Treasury<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`;
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>];
      },
      isPhantom: Treasury.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => Treasury.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Treasury.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => Treasury.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Treasury.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => Treasury.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Treasury.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => Treasury.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => Treasury.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => Treasury.fetch(client, T, id),
      new: (fields: TreasuryFields<ToPhantomTypeArgument<T>>) => {
        return new Treasury([extractType(T)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): typeof Treasury.reified {
    return Treasury.reified;
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<Treasury<ToPhantomTypeArgument<T>>>> {
    return phantom(Treasury.reified(T));
  }

  static get p(): typeof Treasury.phantom {
    return Treasury.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("Treasury", {
      id: UID.bcs,
      controllers: Table.bcs,
      mint_allowances: Table.bcs,
      compatible_versions: VecSet.bcs(bcs.u64()),
    });
  }

  private static cachedBcs: ReturnType<typeof Treasury.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof Treasury.instantiateBcs> {
    if (!Treasury.cachedBcs) {
      Treasury.cachedBcs = Treasury.instantiateBcs();
    }
    return Treasury.cachedBcs;
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): Treasury<ToPhantomTypeArgument<T>> {
    return Treasury.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      controllers: decodeFromFields(Table.reified(phantom("address"), phantom(ID.reified())), fields.controllers),
      mintAllowances: decodeFromFields(
        Table.reified(phantom(ID.reified()), phantom(MintAllowance.reified(typeArg))),
        fields.mint_allowances
      ),
      compatibleVersions: decodeFromFields(VecSet.reified("u64"), fields.compatible_versions),
    });
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): Treasury<ToPhantomTypeArgument<T>> {
    if (!isTreasury(item.type)) {
      throw new Error("not a Treasury type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return Treasury.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      controllers: decodeFromFieldsWithTypes(
        Table.reified(phantom("address"), phantom(ID.reified())),
        item.fields.controllers
      ),
      mintAllowances: decodeFromFieldsWithTypes(
        Table.reified(phantom(ID.reified()), phantom(MintAllowance.reified(typeArg))),
        item.fields.mint_allowances
      ),
      compatibleVersions: decodeFromFieldsWithTypes(VecSet.reified("u64"), item.fields.compatible_versions),
    });
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): Treasury<ToPhantomTypeArgument<T>> {
    return Treasury.fromFields(typeArg, Treasury.bcs.parse(data));
  }

  toJSONField(): TreasuryJSONField<T> {
    return {
      id: this.id,
      controllers: this.controllers.toJSONField(),
      mintAllowances: this.mintAllowances.toJSONField(),
      compatibleVersions: this.compatibleVersions.toJSONField(),
    };
  }

  toJSON(): TreasuryJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): Treasury<ToPhantomTypeArgument<T>> {
    return Treasury.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      controllers: decodeFromJSONField(Table.reified(phantom("address"), phantom(ID.reified())), field.controllers),
      mintAllowances: decodeFromJSONField(
        Table.reified(phantom(ID.reified()), phantom(MintAllowance.reified(typeArg))),
        field.mintAllowances
      ),
      compatibleVersions: decodeFromJSONField(VecSet.reified("u64"), field.compatibleVersions),
    });
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): Treasury<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== Treasury.$typeName) {
      throw new Error(`not a Treasury json object: expected '${Treasury.$typeName}' but got '${json.$typeName}'`);
    }
    assertReifiedTypeArgsMatch(composeSuiType(Treasury.$typeName, ...[extractType(typeArg)]), json.$typeArgs, [
      typeArg,
    ]);

    return Treasury.fromJSONField(typeArg, json);
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>
  ): Treasury<ToPhantomTypeArgument<T>> {
    if (!isTreasury(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Treasury object`);
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

    return Treasury.fromBcs(typeArg, obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Treasury.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): Treasury<ToPhantomTypeArgument<T>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isTreasury(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Treasury object`);
    }
    return Treasury.fromFieldsWithTypes(typeArg, content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Treasury.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): Treasury<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isTreasury(data.bcs.type)) {
        throw new Error(`object at is not a Treasury object`);
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

      return Treasury.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return Treasury.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string
  ): Promise<Treasury<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isTreasury(object.type)) {
      throw new Error(`object at id ${id} is not a Treasury object`);
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

    return Treasury.fromBcs(typeArg, object.content);
  }
}

/* ============================== MintCap =============================== */

export function isMintCap(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`${getTypeOrigin("stablecoin", "treasury::MintCap")}::treasury::MintCap` + "<");
}

export interface MintCapFields<T extends PhantomTypeArgument> {
  id: ToField<UID>;
}

export type MintCapReified<T extends PhantomTypeArgument> = Reified<MintCap<T>, MintCapFields<T>>;

export type MintCapJSONField<T extends PhantomTypeArgument> = {
  id: string;
};

export type MintCapJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof MintCap.$typeName;
  $typeArgs: [PhantomToTypeStr<T>];
} & MintCapJSONField<T>;

export class MintCap<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::treasury::MintCap` {
    return `${getTypeOrigin("stablecoin", "treasury::MintCap")}::treasury::MintCap` as const;
  }
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName: typeof MintCap.$typeName = MintCap.$typeName;
  readonly $fullTypeName: `${string}::treasury::MintCap<${PhantomToTypeStr<T>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T>];
  readonly $isPhantom: typeof MintCap.$isPhantom = MintCap.$isPhantom;

  readonly id: ToField<UID>;

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: MintCapFields<T>) {
    this.$fullTypeName = composeSuiType(
      MintCap.$typeName,
      ...typeArgs
    ) as `${string}::treasury::MintCap<${PhantomToTypeStr<T>}>`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(T: T): MintCapReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = MintCap.bcs;
    return {
      get typeName() {
        return MintCap.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(
          MintCap.$typeName,
          ...[extractType(T)]
        ) as `${string}::treasury::MintCap<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`;
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>];
      },
      isPhantom: MintCap.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => MintCap.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MintCap.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => MintCap.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MintCap.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => MintCap.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => MintCap.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => MintCap.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => MintCap.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => MintCap.fetch(client, T, id),
      new: (fields: MintCapFields<ToPhantomTypeArgument<T>>) => {
        return new MintCap([extractType(T)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): typeof MintCap.reified {
    return MintCap.reified;
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<MintCap<ToPhantomTypeArgument<T>>>> {
    return phantom(MintCap.reified(T));
  }

  static get p(): typeof MintCap.phantom {
    return MintCap.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("MintCap", {
      id: UID.bcs,
    });
  }

  private static cachedBcs: ReturnType<typeof MintCap.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof MintCap.instantiateBcs> {
    if (!MintCap.cachedBcs) {
      MintCap.cachedBcs = MintCap.instantiateBcs();
    }
    return MintCap.cachedBcs;
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): MintCap<ToPhantomTypeArgument<T>> {
    return MintCap.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
    });
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): MintCap<ToPhantomTypeArgument<T>> {
    if (!isMintCap(item.type)) {
      throw new Error("not a MintCap type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return MintCap.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    });
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): MintCap<ToPhantomTypeArgument<T>> {
    return MintCap.fromFields(typeArg, MintCap.bcs.parse(data));
  }

  toJSONField(): MintCapJSONField<T> {
    return {
      id: this.id,
    };
  }

  toJSON(): MintCapJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): MintCap<ToPhantomTypeArgument<T>> {
    return MintCap.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
    });
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): MintCap<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== MintCap.$typeName) {
      throw new Error(`not a MintCap json object: expected '${MintCap.$typeName}' but got '${json.$typeName}'`);
    }
    assertReifiedTypeArgsMatch(composeSuiType(MintCap.$typeName, ...[extractType(typeArg)]), json.$typeArgs, [typeArg]);

    return MintCap.fromJSONField(typeArg, json);
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>
  ): MintCap<ToPhantomTypeArgument<T>> {
    if (!isMintCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a MintCap object`);
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

    return MintCap.fromBcs(typeArg, obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MintCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): MintCap<ToPhantomTypeArgument<T>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isMintCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MintCap object`);
    }
    return MintCap.fromFieldsWithTypes(typeArg, content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MintCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): MintCap<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isMintCap(data.bcs.type)) {
        throw new Error(`object at is not a MintCap object`);
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

      return MintCap.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return MintCap.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string
  ): Promise<MintCap<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isMintCap(object.type)) {
      throw new Error(`object at id ${id} is not a MintCap object`);
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

    return MintCap.fromBcs(typeArg, object.content);
  }
}

/* ============================== TreasuryCapKey =============================== */

export function isTreasuryCapKey(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("stablecoin", "treasury::TreasuryCapKey")}::treasury::TreasuryCapKey`;
}

export interface TreasuryCapKeyFields {
  dummyField: ToField<"bool">;
}

export type TreasuryCapKeyReified = Reified<TreasuryCapKey, TreasuryCapKeyFields>;

export type TreasuryCapKeyJSONField = {
  dummyField: boolean;
};

export type TreasuryCapKeyJSON = {
  $typeName: typeof TreasuryCapKey.$typeName;
  $typeArgs: [];
} & TreasuryCapKeyJSONField;

export class TreasuryCapKey implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::treasury::TreasuryCapKey` {
    return `${getTypeOrigin("stablecoin", "treasury::TreasuryCapKey")}::treasury::TreasuryCapKey` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof TreasuryCapKey.$typeName = TreasuryCapKey.$typeName;
  readonly $fullTypeName: `${string}::treasury::TreasuryCapKey`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof TreasuryCapKey.$isPhantom = TreasuryCapKey.$isPhantom;

  readonly dummyField: ToField<"bool">;

  private constructor(typeArgs: [], fields: TreasuryCapKeyFields) {
    this.$fullTypeName = composeSuiType(TreasuryCapKey.$typeName, ...typeArgs) as `${string}::treasury::TreasuryCapKey`;
    this.$typeArgs = typeArgs;

    this.dummyField = fields.dummyField;
  }

  static reified(): TreasuryCapKeyReified {
    const reifiedBcs = TreasuryCapKey.bcs;
    return {
      get typeName() {
        return TreasuryCapKey.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(TreasuryCapKey.$typeName, ...[]) as `${string}::treasury::TreasuryCapKey`;
      },
      typeArgs: [] as [],
      isPhantom: TreasuryCapKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TreasuryCapKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TreasuryCapKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TreasuryCapKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TreasuryCapKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TreasuryCapKey.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => TreasuryCapKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => TreasuryCapKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TreasuryCapKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => TreasuryCapKey.fetch(client, id),
      new: (fields: TreasuryCapKeyFields) => {
        return new TreasuryCapKey([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): TreasuryCapKeyReified {
    return TreasuryCapKey.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<TreasuryCapKey>> {
    return phantom(TreasuryCapKey.reified());
  }

  static get p(): PhantomReified<ToTypeStr<TreasuryCapKey>> {
    return TreasuryCapKey.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("TreasuryCapKey", {
      dummy_field: bcs.bool(),
    });
  }

  private static cachedBcs: ReturnType<typeof TreasuryCapKey.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof TreasuryCapKey.instantiateBcs> {
    if (!TreasuryCapKey.cachedBcs) {
      TreasuryCapKey.cachedBcs = TreasuryCapKey.instantiateBcs();
    }
    return TreasuryCapKey.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): TreasuryCapKey {
    return TreasuryCapKey.reified().new({
      dummyField: decodeFromFields("bool", fields.dummy_field),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TreasuryCapKey {
    if (!isTreasuryCapKey(item.type)) {
      throw new Error("not a TreasuryCapKey type");
    }

    return TreasuryCapKey.reified().new({
      dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field),
    });
  }

  static fromBcs(data: Uint8Array): TreasuryCapKey {
    return TreasuryCapKey.fromFields(TreasuryCapKey.bcs.parse(data));
  }

  toJSONField(): TreasuryCapKeyJSONField {
    return {
      dummyField: this.dummyField,
    };
  }

  toJSON(): TreasuryCapKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): TreasuryCapKey {
    return TreasuryCapKey.reified().new({
      dummyField: decodeFromJSONField("bool", field.dummyField),
    });
  }

  static fromJSON(json: Record<string, any>): TreasuryCapKey {
    if (json.$typeName !== TreasuryCapKey.$typeName) {
      throw new Error(
        `not a TreasuryCapKey json object: expected '${TreasuryCapKey.$typeName}' but got '${json.$typeName}'`
      );
    }

    return TreasuryCapKey.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): TreasuryCapKey {
    if (!isTreasuryCapKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a TreasuryCapKey object`);
    }
    return TreasuryCapKey.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link TreasuryCapKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): TreasuryCapKey {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isTreasuryCapKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TreasuryCapKey object`);
    }
    return TreasuryCapKey.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link TreasuryCapKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): TreasuryCapKey {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isTreasuryCapKey(data.bcs.type)) {
        throw new Error(`object at is not a TreasuryCapKey object`);
      }

      return TreasuryCapKey.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return TreasuryCapKey.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<TreasuryCapKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isTreasuryCapKey(object.type)) {
      throw new Error(`object at id ${id} is not a TreasuryCapKey object`);
    }
    return TreasuryCapKey.fromBcs(object.content);
  }
}

/* ============================== Burn =============================== */

export function isBurn(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`${getTypeOrigin("stablecoin", "treasury::Burn")}::treasury::Burn` + "<");
}

export interface BurnFields<T extends PhantomTypeArgument> {
  mintCap: ToField<ID>;
  amount: ToField<"u64">;
}

export type BurnReified<T extends PhantomTypeArgument> = Reified<Burn<T>, BurnFields<T>>;

export type BurnJSONField<T extends PhantomTypeArgument> = {
  mintCap: string;
  amount: string;
};

export type BurnJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof Burn.$typeName;
  $typeArgs: [PhantomToTypeStr<T>];
} & BurnJSONField<T>;

export class Burn<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::treasury::Burn` {
    return `${getTypeOrigin("stablecoin", "treasury::Burn")}::treasury::Burn` as const;
  }
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName: typeof Burn.$typeName = Burn.$typeName;
  readonly $fullTypeName: `${string}::treasury::Burn<${PhantomToTypeStr<T>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T>];
  readonly $isPhantom: typeof Burn.$isPhantom = Burn.$isPhantom;

  readonly mintCap: ToField<ID>;
  readonly amount: ToField<"u64">;

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: BurnFields<T>) {
    this.$fullTypeName = composeSuiType(
      Burn.$typeName,
      ...typeArgs
    ) as `${string}::treasury::Burn<${PhantomToTypeStr<T>}>`;
    this.$typeArgs = typeArgs;

    this.mintCap = fields.mintCap;
    this.amount = fields.amount;
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(T: T): BurnReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = Burn.bcs;
    return {
      get typeName() {
        return Burn.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(
          Burn.$typeName,
          ...[extractType(T)]
        ) as `${string}::treasury::Burn<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`;
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>];
      },
      isPhantom: Burn.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => Burn.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Burn.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => Burn.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Burn.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => Burn.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Burn.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => Burn.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => Burn.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => Burn.fetch(client, T, id),
      new: (fields: BurnFields<ToPhantomTypeArgument<T>>) => {
        return new Burn([extractType(T)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): typeof Burn.reified {
    return Burn.reified;
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<Burn<ToPhantomTypeArgument<T>>>> {
    return phantom(Burn.reified(T));
  }

  static get p(): typeof Burn.phantom {
    return Burn.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("Burn", {
      mint_cap: ID.bcs,
      amount: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof Burn.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof Burn.instantiateBcs> {
    if (!Burn.cachedBcs) {
      Burn.cachedBcs = Burn.instantiateBcs();
    }
    return Burn.cachedBcs;
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): Burn<ToPhantomTypeArgument<T>> {
    return Burn.reified(typeArg).new({
      mintCap: decodeFromFields(ID.reified(), fields.mint_cap),
      amount: decodeFromFields("u64", fields.amount),
    });
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): Burn<ToPhantomTypeArgument<T>> {
    if (!isBurn(item.type)) {
      throw new Error("not a Burn type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return Burn.reified(typeArg).new({
      mintCap: decodeFromFieldsWithTypes(ID.reified(), item.fields.mint_cap),
      amount: decodeFromFieldsWithTypes("u64", item.fields.amount),
    });
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): Burn<ToPhantomTypeArgument<T>> {
    return Burn.fromFields(typeArg, Burn.bcs.parse(data));
  }

  toJSONField(): BurnJSONField<T> {
    return {
      mintCap: this.mintCap,
      amount: this.amount.toString(),
    };
  }

  toJSON(): BurnJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): Burn<ToPhantomTypeArgument<T>> {
    return Burn.reified(typeArg).new({
      mintCap: decodeFromJSONField(ID.reified(), field.mintCap),
      amount: decodeFromJSONField("u64", field.amount),
    });
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): Burn<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== Burn.$typeName) {
      throw new Error(`not a Burn json object: expected '${Burn.$typeName}' but got '${json.$typeName}'`);
    }
    assertReifiedTypeArgsMatch(composeSuiType(Burn.$typeName, ...[extractType(typeArg)]), json.$typeArgs, [typeArg]);

    return Burn.fromJSONField(typeArg, json);
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>
  ): Burn<ToPhantomTypeArgument<T>> {
    if (!isBurn(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Burn object`);
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

    return Burn.fromBcs(typeArg, obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Burn.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): Burn<ToPhantomTypeArgument<T>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isBurn(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Burn object`);
    }
    return Burn.fromFieldsWithTypes(typeArg, content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Burn.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): Burn<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isBurn(data.bcs.type)) {
        throw new Error(`object at is not a Burn object`);
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

      return Burn.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return Burn.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string
  ): Promise<Burn<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isBurn(object.type)) {
      throw new Error(`object at id ${id} is not a Burn object`);
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

    return Burn.fromBcs(typeArg, object.content);
  }
}
