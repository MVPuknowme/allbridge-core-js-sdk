// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64 } from "@mysten/sui/utils";
import { Bag } from "../../_dependencies/sui/bag/structs";
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

/* ============================== FeeCollector =============================== */

export function isFeeCollector(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`${getTypeOrigin("utils", "fee_collector::FeeCollector")}::fee_collector::FeeCollector` + "<");
}

export interface FeeCollectorFields<Cap extends PhantomTypeArgument> {
  balances: ToField<Bag>;
}

export type FeeCollectorReified<Cap extends PhantomTypeArgument> = Reified<FeeCollector<Cap>, FeeCollectorFields<Cap>>;

export type FeeCollectorJSONField<Cap extends PhantomTypeArgument> = {
  balances: ToJSON<Bag>;
};

export type FeeCollectorJSON<Cap extends PhantomTypeArgument> = {
  $typeName: typeof FeeCollector.$typeName;
  $typeArgs: [PhantomToTypeStr<Cap>];
} & FeeCollectorJSONField<Cap>;

export class FeeCollector<Cap extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::fee_collector::FeeCollector` {
    return `${getTypeOrigin("utils", "fee_collector::FeeCollector")}::fee_collector::FeeCollector` as const;
  }
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName: typeof FeeCollector.$typeName = FeeCollector.$typeName;
  readonly $fullTypeName: `${string}::fee_collector::FeeCollector<${PhantomToTypeStr<Cap>}>`;
  readonly $typeArgs: [PhantomToTypeStr<Cap>];
  readonly $isPhantom: typeof FeeCollector.$isPhantom = FeeCollector.$isPhantom;

  readonly balances: ToField<Bag>;

  private constructor(typeArgs: [PhantomToTypeStr<Cap>], fields: FeeCollectorFields<Cap>) {
    this.$fullTypeName = composeSuiType(
      FeeCollector.$typeName,
      ...typeArgs
    ) as `${string}::fee_collector::FeeCollector<${PhantomToTypeStr<Cap>}>`;
    this.$typeArgs = typeArgs;

    this.balances = fields.balances;
  }

  static reified<Cap extends PhantomReified<PhantomTypeArgument>>(
    Cap: Cap
  ): FeeCollectorReified<ToPhantomTypeArgument<Cap>> {
    const reifiedBcs = FeeCollector.bcs;
    return {
      get typeName() {
        return FeeCollector.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(
          FeeCollector.$typeName,
          ...[extractType(Cap)]
        ) as `${string}::fee_collector::FeeCollector<${PhantomToTypeStr<ToPhantomTypeArgument<Cap>>}>`;
      },
      get typeArgs() {
        return [extractType(Cap)] as [PhantomToTypeStr<ToPhantomTypeArgument<Cap>>];
      },
      isPhantom: FeeCollector.$isPhantom,
      reifiedTypeArgs: [Cap],
      fromFields: (fields: Record<string, any>) => FeeCollector.fromFields(Cap, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FeeCollector.fromFieldsWithTypes(Cap, item),
      fromBcs: (data: Uint8Array) => FeeCollector.fromFields(Cap, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FeeCollector.fromJSONField(Cap, field),
      fromJSON: (json: Record<string, any>) => FeeCollector.fromJSON(Cap, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => FeeCollector.fromCoreObject(Cap, obj),
      fromSuiParsedData: (content: SuiParsedData) => FeeCollector.fromSuiParsedData(Cap, content),
      fromSuiObjectData: (content: SuiObjectData) => FeeCollector.fromSuiObjectData(Cap, content),
      fetch: async (client: ClientWithCoreApi, id: string) => FeeCollector.fetch(client, Cap, id),
      new: (fields: FeeCollectorFields<ToPhantomTypeArgument<Cap>>) => {
        return new FeeCollector([extractType(Cap)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): typeof FeeCollector.reified {
    return FeeCollector.reified;
  }

  static phantom<Cap extends PhantomReified<PhantomTypeArgument>>(
    Cap: Cap
  ): PhantomReified<ToTypeStr<FeeCollector<ToPhantomTypeArgument<Cap>>>> {
    return phantom(FeeCollector.reified(Cap));
  }

  static get p(): typeof FeeCollector.phantom {
    return FeeCollector.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("FeeCollector", {
      balances: Bag.bcs,
    });
  }

  private static cachedBcs: ReturnType<typeof FeeCollector.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof FeeCollector.instantiateBcs> {
    if (!FeeCollector.cachedBcs) {
      FeeCollector.cachedBcs = FeeCollector.instantiateBcs();
    }
    return FeeCollector.cachedBcs;
  }

  static fromFields<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    fields: Record<string, any>
  ): FeeCollector<ToPhantomTypeArgument<Cap>> {
    return FeeCollector.reified(typeArg).new({
      balances: decodeFromFields(Bag.reified(), fields.balances),
    });
  }

  static fromFieldsWithTypes<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    item: FieldsWithTypes
  ): FeeCollector<ToPhantomTypeArgument<Cap>> {
    if (!isFeeCollector(item.type)) {
      throw new Error("not a FeeCollector type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return FeeCollector.reified(typeArg).new({
      balances: decodeFromFieldsWithTypes(Bag.reified(), item.fields.balances),
    });
  }

  static fromBcs<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    data: Uint8Array
  ): FeeCollector<ToPhantomTypeArgument<Cap>> {
    return FeeCollector.fromFields(typeArg, FeeCollector.bcs.parse(data));
  }

  toJSONField(): FeeCollectorJSONField<Cap> {
    return {
      balances: this.balances.toJSONField(),
    };
  }

  toJSON(): FeeCollectorJSON<Cap> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    field: any
  ): FeeCollector<ToPhantomTypeArgument<Cap>> {
    return FeeCollector.reified(typeArg).new({
      balances: decodeFromJSONField(Bag.reified(), field.balances),
    });
  }

  static fromJSON<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    json: Record<string, any>
  ): FeeCollector<ToPhantomTypeArgument<Cap>> {
    if (json.$typeName !== FeeCollector.$typeName) {
      throw new Error(
        `not a FeeCollector json object: expected '${FeeCollector.$typeName}' but got '${json.$typeName}'`
      );
    }
    assertReifiedTypeArgsMatch(composeSuiType(FeeCollector.$typeName, ...[extractType(typeArg)]), json.$typeArgs, [
      typeArg,
    ]);

    return FeeCollector.fromJSONField(typeArg, json);
  }

  static fromCoreObject<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    obj: SuiClientTypes.Object<{ content: true }>
  ): FeeCollector<ToPhantomTypeArgument<Cap>> {
    if (!isFeeCollector(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a FeeCollector object`);
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

    return FeeCollector.fromBcs(typeArg, obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FeeCollector.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    content: SuiParsedData
  ): FeeCollector<ToPhantomTypeArgument<Cap>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isFeeCollector(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FeeCollector object`);
    }
    return FeeCollector.fromFieldsWithTypes(typeArg, content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FeeCollector.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    data: SuiObjectData
  ): FeeCollector<ToPhantomTypeArgument<Cap>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isFeeCollector(data.bcs.type)) {
        throw new Error(`object at is not a FeeCollector object`);
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

      return FeeCollector.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return FeeCollector.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch<Cap extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: Cap,
    id: string
  ): Promise<FeeCollector<ToPhantomTypeArgument<Cap>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isFeeCollector(object.type)) {
      throw new Error(`object at id ${id} is not a FeeCollector object`);
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

    return FeeCollector.fromBcs(typeArg, object.content);
  }
}
