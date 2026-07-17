// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64 } from "@mysten/sui/utils";
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

/* ============================== PoolState =============================== */

export function isPoolState(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`${getTypeOrigin("bridge", "pool_state::PoolState")}::pool_state::PoolState` + "<");
}

export interface PoolStateFields<T extends PhantomTypeArgument> {
  tokenBalance: ToField<"u64">;
  vusdBalance: ToField<"u64">;
  d: ToField<"u64">;
  a: ToField<"u64">;
  balanceRatioMinBp: ToField<"u64">;
}

export type PoolStateReified<T extends PhantomTypeArgument> = Reified<PoolState<T>, PoolStateFields<T>>;

export type PoolStateJSONField<T extends PhantomTypeArgument> = {
  tokenBalance: string;
  vusdBalance: string;
  d: string;
  a: string;
  balanceRatioMinBp: string;
};

export type PoolStateJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof PoolState.$typeName;
  $typeArgs: [PhantomToTypeStr<T>];
} & PoolStateJSONField<T>;

export class PoolState<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::pool_state::PoolState` {
    return `${getTypeOrigin("bridge", "pool_state::PoolState")}::pool_state::PoolState` as const;
  }
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName: typeof PoolState.$typeName = PoolState.$typeName;
  readonly $fullTypeName: `${string}::pool_state::PoolState<${PhantomToTypeStr<T>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T>];
  readonly $isPhantom: typeof PoolState.$isPhantom = PoolState.$isPhantom;

  readonly tokenBalance: ToField<"u64">;
  readonly vusdBalance: ToField<"u64">;
  readonly d: ToField<"u64">;
  readonly a: ToField<"u64">;
  readonly balanceRatioMinBp: ToField<"u64">;

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: PoolStateFields<T>) {
    this.$fullTypeName = composeSuiType(
      PoolState.$typeName,
      ...typeArgs
    ) as `${string}::pool_state::PoolState<${PhantomToTypeStr<T>}>`;
    this.$typeArgs = typeArgs;

    this.tokenBalance = fields.tokenBalance;
    this.vusdBalance = fields.vusdBalance;
    this.d = fields.d;
    this.a = fields.a;
    this.balanceRatioMinBp = fields.balanceRatioMinBp;
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(T: T): PoolStateReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = PoolState.bcs;
    return {
      get typeName() {
        return PoolState.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(
          PoolState.$typeName,
          ...[extractType(T)]
        ) as `${string}::pool_state::PoolState<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`;
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>];
      },
      isPhantom: PoolState.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => PoolState.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolState.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => PoolState.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PoolState.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => PoolState.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => PoolState.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => PoolState.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => PoolState.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => PoolState.fetch(client, T, id),
      new: (fields: PoolStateFields<ToPhantomTypeArgument<T>>) => {
        return new PoolState([extractType(T)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): typeof PoolState.reified {
    return PoolState.reified;
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<PoolState<ToPhantomTypeArgument<T>>>> {
    return phantom(PoolState.reified(T));
  }

  static get p(): typeof PoolState.phantom {
    return PoolState.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("PoolState", {
      token_balance: bcs.u64(),
      vusd_balance: bcs.u64(),
      d: bcs.u64(),
      a: bcs.u64(),
      balance_ratio_min_bp: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof PoolState.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof PoolState.instantiateBcs> {
    if (!PoolState.cachedBcs) {
      PoolState.cachedBcs = PoolState.instantiateBcs();
    }
    return PoolState.cachedBcs;
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): PoolState<ToPhantomTypeArgument<T>> {
    return PoolState.reified(typeArg).new({
      tokenBalance: decodeFromFields("u64", fields.token_balance),
      vusdBalance: decodeFromFields("u64", fields.vusd_balance),
      d: decodeFromFields("u64", fields.d),
      a: decodeFromFields("u64", fields.a),
      balanceRatioMinBp: decodeFromFields("u64", fields.balance_ratio_min_bp),
    });
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): PoolState<ToPhantomTypeArgument<T>> {
    if (!isPoolState(item.type)) {
      throw new Error("not a PoolState type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return PoolState.reified(typeArg).new({
      tokenBalance: decodeFromFieldsWithTypes("u64", item.fields.token_balance),
      vusdBalance: decodeFromFieldsWithTypes("u64", item.fields.vusd_balance),
      d: decodeFromFieldsWithTypes("u64", item.fields.d),
      a: decodeFromFieldsWithTypes("u64", item.fields.a),
      balanceRatioMinBp: decodeFromFieldsWithTypes("u64", item.fields.balance_ratio_min_bp),
    });
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): PoolState<ToPhantomTypeArgument<T>> {
    return PoolState.fromFields(typeArg, PoolState.bcs.parse(data));
  }

  toJSONField(): PoolStateJSONField<T> {
    return {
      tokenBalance: this.tokenBalance.toString(),
      vusdBalance: this.vusdBalance.toString(),
      d: this.d.toString(),
      a: this.a.toString(),
      balanceRatioMinBp: this.balanceRatioMinBp.toString(),
    };
  }

  toJSON(): PoolStateJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): PoolState<ToPhantomTypeArgument<T>> {
    return PoolState.reified(typeArg).new({
      tokenBalance: decodeFromJSONField("u64", field.tokenBalance),
      vusdBalance: decodeFromJSONField("u64", field.vusdBalance),
      d: decodeFromJSONField("u64", field.d),
      a: decodeFromJSONField("u64", field.a),
      balanceRatioMinBp: decodeFromJSONField("u64", field.balanceRatioMinBp),
    });
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): PoolState<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== PoolState.$typeName) {
      throw new Error(`not a PoolState json object: expected '${PoolState.$typeName}' but got '${json.$typeName}'`);
    }
    assertReifiedTypeArgsMatch(composeSuiType(PoolState.$typeName, ...[extractType(typeArg)]), json.$typeArgs, [
      typeArg,
    ]);

    return PoolState.fromJSONField(typeArg, json);
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>
  ): PoolState<ToPhantomTypeArgument<T>> {
    if (!isPoolState(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PoolState object`);
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

    return PoolState.fromBcs(typeArg, obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PoolState.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): PoolState<ToPhantomTypeArgument<T>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isPoolState(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolState object`);
    }
    return PoolState.fromFieldsWithTypes(typeArg, content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PoolState.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): PoolState<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isPoolState(data.bcs.type)) {
        throw new Error(`object at is not a PoolState object`);
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

      return PoolState.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return PoolState.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string
  ): Promise<PoolState<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isPoolState(object.type)) {
      throw new Error(`object at id ${id} is not a PoolState object`);
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

    return PoolState.fromBcs(typeArg, object.content);
  }
}
