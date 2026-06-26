// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64 } from "@mysten/sui/utils";
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
} from "../../../_framework/reified";
import { composeSuiType, compressSuiType, FieldsWithTypes, parseTypeName } from "../../../_framework/util";

/* ============================== MintAllowance =============================== */

export function isMintAllowance(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(
    `${getTypeOrigin("stablecoin", "mint_allowance::MintAllowance")}::mint_allowance::MintAllowance` + "<"
  );
}

export interface MintAllowanceFields<T extends PhantomTypeArgument> {
  value: ToField<"u64">;
}

export type MintAllowanceReified<T extends PhantomTypeArgument> = Reified<MintAllowance<T>, MintAllowanceFields<T>>;

export type MintAllowanceJSONField<T extends PhantomTypeArgument> = {
  value: string;
};

export type MintAllowanceJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof MintAllowance.$typeName;
  $typeArgs: [PhantomToTypeStr<T>];
} & MintAllowanceJSONField<T>;

export class MintAllowance<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::mint_allowance::MintAllowance` {
    return `${getTypeOrigin("stablecoin", "mint_allowance::MintAllowance")}::mint_allowance::MintAllowance` as const;
  }
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName: typeof MintAllowance.$typeName = MintAllowance.$typeName;
  readonly $fullTypeName: `${string}::mint_allowance::MintAllowance<${PhantomToTypeStr<T>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T>];
  readonly $isPhantom: typeof MintAllowance.$isPhantom = MintAllowance.$isPhantom;

  readonly value: ToField<"u64">;

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: MintAllowanceFields<T>) {
    this.$fullTypeName = composeSuiType(
      MintAllowance.$typeName,
      ...typeArgs
    ) as `${string}::mint_allowance::MintAllowance<${PhantomToTypeStr<T>}>`;
    this.$typeArgs = typeArgs;

    this.value = fields.value;
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(T: T): MintAllowanceReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = MintAllowance.bcs;
    return {
      get typeName() {
        return MintAllowance.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(
          MintAllowance.$typeName,
          ...[extractType(T)]
        ) as `${string}::mint_allowance::MintAllowance<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`;
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>];
      },
      isPhantom: MintAllowance.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => MintAllowance.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MintAllowance.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => MintAllowance.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MintAllowance.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => MintAllowance.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => MintAllowance.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => MintAllowance.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => MintAllowance.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => MintAllowance.fetch(client, T, id),
      new: (fields: MintAllowanceFields<ToPhantomTypeArgument<T>>) => {
        return new MintAllowance([extractType(T)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): typeof MintAllowance.reified {
    return MintAllowance.reified;
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<MintAllowance<ToPhantomTypeArgument<T>>>> {
    return phantom(MintAllowance.reified(T));
  }

  static get p(): typeof MintAllowance.phantom {
    return MintAllowance.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("MintAllowance", {
      value: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof MintAllowance.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof MintAllowance.instantiateBcs> {
    if (!MintAllowance.cachedBcs) {
      MintAllowance.cachedBcs = MintAllowance.instantiateBcs();
    }
    return MintAllowance.cachedBcs;
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): MintAllowance<ToPhantomTypeArgument<T>> {
    return MintAllowance.reified(typeArg).new({
      value: decodeFromFields("u64", fields.value),
    });
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): MintAllowance<ToPhantomTypeArgument<T>> {
    if (!isMintAllowance(item.type)) {
      throw new Error("not a MintAllowance type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return MintAllowance.reified(typeArg).new({
      value: decodeFromFieldsWithTypes("u64", item.fields.value),
    });
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): MintAllowance<ToPhantomTypeArgument<T>> {
    return MintAllowance.fromFields(typeArg, MintAllowance.bcs.parse(data));
  }

  toJSONField(): MintAllowanceJSONField<T> {
    return {
      value: this.value.toString(),
    };
  }

  toJSON(): MintAllowanceJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): MintAllowance<ToPhantomTypeArgument<T>> {
    return MintAllowance.reified(typeArg).new({
      value: decodeFromJSONField("u64", field.value),
    });
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): MintAllowance<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== MintAllowance.$typeName) {
      throw new Error(
        `not a MintAllowance json object: expected '${MintAllowance.$typeName}' but got '${json.$typeName}'`
      );
    }
    assertReifiedTypeArgsMatch(composeSuiType(MintAllowance.$typeName, ...[extractType(typeArg)]), json.$typeArgs, [
      typeArg,
    ]);

    return MintAllowance.fromJSONField(typeArg, json);
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>
  ): MintAllowance<ToPhantomTypeArgument<T>> {
    if (!isMintAllowance(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a MintAllowance object`);
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

    return MintAllowance.fromBcs(typeArg, obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MintAllowance.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): MintAllowance<ToPhantomTypeArgument<T>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isMintAllowance(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MintAllowance object`);
    }
    return MintAllowance.fromFieldsWithTypes(typeArg, content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MintAllowance.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): MintAllowance<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isMintAllowance(data.bcs.type)) {
        throw new Error(`object at is not a MintAllowance object`);
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

      return MintAllowance.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return MintAllowance.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string
  ): Promise<MintAllowance<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isMintAllowance(object.type)) {
      throw new Error(`object at id ${id} is not a MintAllowance object`);
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

    return MintAllowance.fromBcs(typeArg, object.content);
  }
}
