// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64 } from "@mysten/sui/utils";
import { Balance } from "../../_dependencies/sui/balance/structs";
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

/* ============================== PoolRewards =============================== */

export function isPoolRewards(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`${getTypeOrigin("bridge", "pool_rewards::PoolRewards")}::pool_rewards::PoolRewards` + "<");
}

export interface PoolRewardsFields<T extends PhantomTypeArgument> {
  accRewardPerShareP: ToField<"u128">;
  adminFeeShareBp: ToField<"u64">;
  adminFee: ToField<Balance<T>>;
  rewards: ToField<Balance<T>>;
  lpSupply: ToField<"u64">;
}

export type PoolRewardsReified<T extends PhantomTypeArgument> = Reified<PoolRewards<T>, PoolRewardsFields<T>>;

export type PoolRewardsJSONField<T extends PhantomTypeArgument> = {
  accRewardPerShareP: string;
  adminFeeShareBp: string;
  adminFee: ToJSON<Balance<T>>;
  rewards: ToJSON<Balance<T>>;
  lpSupply: string;
};

export type PoolRewardsJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof PoolRewards.$typeName;
  $typeArgs: [PhantomToTypeStr<T>];
} & PoolRewardsJSONField<T>;

export class PoolRewards<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::pool_rewards::PoolRewards` {
    return `${getTypeOrigin("bridge", "pool_rewards::PoolRewards")}::pool_rewards::PoolRewards` as const;
  }
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName: typeof PoolRewards.$typeName = PoolRewards.$typeName;
  readonly $fullTypeName: `${string}::pool_rewards::PoolRewards<${PhantomToTypeStr<T>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T>];
  readonly $isPhantom: typeof PoolRewards.$isPhantom = PoolRewards.$isPhantom;

  readonly accRewardPerShareP: ToField<"u128">;
  readonly adminFeeShareBp: ToField<"u64">;
  readonly adminFee: ToField<Balance<T>>;
  readonly rewards: ToField<Balance<T>>;
  readonly lpSupply: ToField<"u64">;

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: PoolRewardsFields<T>) {
    this.$fullTypeName = composeSuiType(
      PoolRewards.$typeName,
      ...typeArgs
    ) as `${string}::pool_rewards::PoolRewards<${PhantomToTypeStr<T>}>`;
    this.$typeArgs = typeArgs;

    this.accRewardPerShareP = fields.accRewardPerShareP;
    this.adminFeeShareBp = fields.adminFeeShareBp;
    this.adminFee = fields.adminFee;
    this.rewards = fields.rewards;
    this.lpSupply = fields.lpSupply;
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(T: T): PoolRewardsReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = PoolRewards.bcs;
    return {
      get typeName() {
        return PoolRewards.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(
          PoolRewards.$typeName,
          ...[extractType(T)]
        ) as `${string}::pool_rewards::PoolRewards<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`;
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>];
      },
      isPhantom: PoolRewards.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => PoolRewards.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolRewards.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => PoolRewards.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PoolRewards.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => PoolRewards.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => PoolRewards.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => PoolRewards.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => PoolRewards.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => PoolRewards.fetch(client, T, id),
      new: (fields: PoolRewardsFields<ToPhantomTypeArgument<T>>) => {
        return new PoolRewards([extractType(T)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): typeof PoolRewards.reified {
    return PoolRewards.reified;
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<PoolRewards<ToPhantomTypeArgument<T>>>> {
    return phantom(PoolRewards.reified(T));
  }

  static get p(): typeof PoolRewards.phantom {
    return PoolRewards.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("PoolRewards", {
      acc_reward_per_share_p: bcs.u128(),
      admin_fee_share_bp: bcs.u64(),
      admin_fee: Balance.bcs,
      rewards: Balance.bcs,
      lp_supply: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof PoolRewards.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof PoolRewards.instantiateBcs> {
    if (!PoolRewards.cachedBcs) {
      PoolRewards.cachedBcs = PoolRewards.instantiateBcs();
    }
    return PoolRewards.cachedBcs;
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): PoolRewards<ToPhantomTypeArgument<T>> {
    return PoolRewards.reified(typeArg).new({
      accRewardPerShareP: decodeFromFields("u128", fields.acc_reward_per_share_p),
      adminFeeShareBp: decodeFromFields("u64", fields.admin_fee_share_bp),
      adminFee: decodeFromFields(Balance.reified(typeArg), fields.admin_fee),
      rewards: decodeFromFields(Balance.reified(typeArg), fields.rewards),
      lpSupply: decodeFromFields("u64", fields.lp_supply),
    });
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): PoolRewards<ToPhantomTypeArgument<T>> {
    if (!isPoolRewards(item.type)) {
      throw new Error("not a PoolRewards type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return PoolRewards.reified(typeArg).new({
      accRewardPerShareP: decodeFromFieldsWithTypes("u128", item.fields.acc_reward_per_share_p),
      adminFeeShareBp: decodeFromFieldsWithTypes("u64", item.fields.admin_fee_share_bp),
      adminFee: decodeFromFieldsWithTypes(Balance.reified(typeArg), item.fields.admin_fee),
      rewards: decodeFromFieldsWithTypes(Balance.reified(typeArg), item.fields.rewards),
      lpSupply: decodeFromFieldsWithTypes("u64", item.fields.lp_supply),
    });
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): PoolRewards<ToPhantomTypeArgument<T>> {
    return PoolRewards.fromFields(typeArg, PoolRewards.bcs.parse(data));
  }

  toJSONField(): PoolRewardsJSONField<T> {
    return {
      accRewardPerShareP: this.accRewardPerShareP.toString(),
      adminFeeShareBp: this.adminFeeShareBp.toString(),
      adminFee: this.adminFee.toJSONField(),
      rewards: this.rewards.toJSONField(),
      lpSupply: this.lpSupply.toString(),
    };
  }

  toJSON(): PoolRewardsJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): PoolRewards<ToPhantomTypeArgument<T>> {
    return PoolRewards.reified(typeArg).new({
      accRewardPerShareP: decodeFromJSONField("u128", field.accRewardPerShareP),
      adminFeeShareBp: decodeFromJSONField("u64", field.adminFeeShareBp),
      adminFee: decodeFromJSONField(Balance.reified(typeArg), field.adminFee),
      rewards: decodeFromJSONField(Balance.reified(typeArg), field.rewards),
      lpSupply: decodeFromJSONField("u64", field.lpSupply),
    });
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): PoolRewards<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== PoolRewards.$typeName) {
      throw new Error(`not a PoolRewards json object: expected '${PoolRewards.$typeName}' but got '${json.$typeName}'`);
    }
    assertReifiedTypeArgsMatch(composeSuiType(PoolRewards.$typeName, ...[extractType(typeArg)]), json.$typeArgs, [
      typeArg,
    ]);

    return PoolRewards.fromJSONField(typeArg, json);
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>
  ): PoolRewards<ToPhantomTypeArgument<T>> {
    if (!isPoolRewards(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PoolRewards object`);
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

    return PoolRewards.fromBcs(typeArg, obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PoolRewards.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): PoolRewards<ToPhantomTypeArgument<T>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isPoolRewards(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolRewards object`);
    }
    return PoolRewards.fromFieldsWithTypes(typeArg, content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PoolRewards.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): PoolRewards<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isPoolRewards(data.bcs.type)) {
        throw new Error(`object at is not a PoolRewards object`);
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

      return PoolRewards.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return PoolRewards.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string
  ): Promise<PoolRewards<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isPoolRewards(object.type)) {
      throw new Error(`object at id ${id} is not a PoolRewards object`);
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

    return PoolRewards.fromBcs(typeArg, object.content);
  }
}
