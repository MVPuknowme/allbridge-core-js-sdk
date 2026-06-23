// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64 } from "@mysten/sui/utils";
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

/* ============================== UserDeposit =============================== */

export function isUserDeposit(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`${getTypeOrigin("bridge", "user_deposit::UserDeposit")}::user_deposit::UserDeposit` + "<");
}

export interface UserDepositFields<T extends PhantomTypeArgument> {
  id: ToField<UID>;
  lpAmount: ToField<"u64">;
  rewardDebt: ToField<"u64">;
}

export type UserDepositReified<T extends PhantomTypeArgument> = Reified<UserDeposit<T>, UserDepositFields<T>>;

export type UserDepositJSONField<T extends PhantomTypeArgument> = {
  id: string;
  lpAmount: string;
  rewardDebt: string;
};

export type UserDepositJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof UserDeposit.$typeName;
  $typeArgs: [PhantomToTypeStr<T>];
} & UserDepositJSONField<T>;

export class UserDeposit<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::user_deposit::UserDeposit` {
    return `${getTypeOrigin("bridge", "user_deposit::UserDeposit")}::user_deposit::UserDeposit` as const;
  }
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName: typeof UserDeposit.$typeName = UserDeposit.$typeName;
  readonly $fullTypeName: `${string}::user_deposit::UserDeposit<${PhantomToTypeStr<T>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T>];
  readonly $isPhantom: typeof UserDeposit.$isPhantom = UserDeposit.$isPhantom;

  readonly id: ToField<UID>;
  readonly lpAmount: ToField<"u64">;
  readonly rewardDebt: ToField<"u64">;

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: UserDepositFields<T>) {
    this.$fullTypeName = composeSuiType(
      UserDeposit.$typeName,
      ...typeArgs
    ) as `${string}::user_deposit::UserDeposit<${PhantomToTypeStr<T>}>`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.lpAmount = fields.lpAmount;
    this.rewardDebt = fields.rewardDebt;
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(T: T): UserDepositReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = UserDeposit.bcs;
    return {
      get typeName() {
        return UserDeposit.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(
          UserDeposit.$typeName,
          ...[extractType(T)]
        ) as `${string}::user_deposit::UserDeposit<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`;
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>];
      },
      isPhantom: UserDeposit.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => UserDeposit.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UserDeposit.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => UserDeposit.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UserDeposit.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => UserDeposit.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => UserDeposit.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => UserDeposit.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => UserDeposit.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => UserDeposit.fetch(client, T, id),
      new: (fields: UserDepositFields<ToPhantomTypeArgument<T>>) => {
        return new UserDeposit([extractType(T)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): typeof UserDeposit.reified {
    return UserDeposit.reified;
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<UserDeposit<ToPhantomTypeArgument<T>>>> {
    return phantom(UserDeposit.reified(T));
  }

  static get p(): typeof UserDeposit.phantom {
    return UserDeposit.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("UserDeposit", {
      id: UID.bcs,
      lp_amount: bcs.u64(),
      reward_debt: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof UserDeposit.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof UserDeposit.instantiateBcs> {
    if (!UserDeposit.cachedBcs) {
      UserDeposit.cachedBcs = UserDeposit.instantiateBcs();
    }
    return UserDeposit.cachedBcs;
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): UserDeposit<ToPhantomTypeArgument<T>> {
    return UserDeposit.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      lpAmount: decodeFromFields("u64", fields.lp_amount),
      rewardDebt: decodeFromFields("u64", fields.reward_debt),
    });
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): UserDeposit<ToPhantomTypeArgument<T>> {
    if (!isUserDeposit(item.type)) {
      throw new Error("not a UserDeposit type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return UserDeposit.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      lpAmount: decodeFromFieldsWithTypes("u64", item.fields.lp_amount),
      rewardDebt: decodeFromFieldsWithTypes("u64", item.fields.reward_debt),
    });
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): UserDeposit<ToPhantomTypeArgument<T>> {
    return UserDeposit.fromFields(typeArg, UserDeposit.bcs.parse(data));
  }

  toJSONField(): UserDepositJSONField<T> {
    return {
      id: this.id,
      lpAmount: this.lpAmount.toString(),
      rewardDebt: this.rewardDebt.toString(),
    };
  }

  toJSON(): UserDepositJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): UserDeposit<ToPhantomTypeArgument<T>> {
    return UserDeposit.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      lpAmount: decodeFromJSONField("u64", field.lpAmount),
      rewardDebt: decodeFromJSONField("u64", field.rewardDebt),
    });
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): UserDeposit<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== UserDeposit.$typeName) {
      throw new Error(`not a UserDeposit json object: expected '${UserDeposit.$typeName}' but got '${json.$typeName}'`);
    }
    assertReifiedTypeArgsMatch(composeSuiType(UserDeposit.$typeName, ...[extractType(typeArg)]), json.$typeArgs, [
      typeArg,
    ]);

    return UserDeposit.fromJSONField(typeArg, json);
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>
  ): UserDeposit<ToPhantomTypeArgument<T>> {
    if (!isUserDeposit(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a UserDeposit object`);
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

    return UserDeposit.fromBcs(typeArg, obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UserDeposit.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): UserDeposit<ToPhantomTypeArgument<T>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isUserDeposit(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UserDeposit object`);
    }
    return UserDeposit.fromFieldsWithTypes(typeArg, content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UserDeposit.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): UserDeposit<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isUserDeposit(data.bcs.type)) {
        throw new Error(`object at is not a UserDeposit object`);
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

      return UserDeposit.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return UserDeposit.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string
  ): Promise<UserDeposit<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isUserDeposit(object.type)) {
      throw new Error(`object at id ${id} is not a UserDeposit object`);
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

    return UserDeposit.fromBcs(typeArg, object.content);
  }
}
