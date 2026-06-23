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

/* ============================== CurrentVersion =============================== */

export function isCurrentVersion(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`${getTypeOrigin("utils", "version::CurrentVersion")}::version::CurrentVersion` + "<");
}

export interface CurrentVersionFields<Cap extends PhantomTypeArgument> {
  version: ToField<"u64">;
}

export type CurrentVersionReified<Cap extends PhantomTypeArgument> = Reified<
  CurrentVersion<Cap>,
  CurrentVersionFields<Cap>
>;

export type CurrentVersionJSONField<Cap extends PhantomTypeArgument> = {
  version: string;
};

export type CurrentVersionJSON<Cap extends PhantomTypeArgument> = {
  $typeName: typeof CurrentVersion.$typeName;
  $typeArgs: [PhantomToTypeStr<Cap>];
} & CurrentVersionJSONField<Cap>;

export class CurrentVersion<Cap extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::version::CurrentVersion` {
    return `${getTypeOrigin("utils", "version::CurrentVersion")}::version::CurrentVersion` as const;
  }
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName: typeof CurrentVersion.$typeName = CurrentVersion.$typeName;
  readonly $fullTypeName: `${string}::version::CurrentVersion<${PhantomToTypeStr<Cap>}>`;
  readonly $typeArgs: [PhantomToTypeStr<Cap>];
  readonly $isPhantom: typeof CurrentVersion.$isPhantom = CurrentVersion.$isPhantom;

  readonly version: ToField<"u64">;

  private constructor(typeArgs: [PhantomToTypeStr<Cap>], fields: CurrentVersionFields<Cap>) {
    this.$fullTypeName = composeSuiType(
      CurrentVersion.$typeName,
      ...typeArgs
    ) as `${string}::version::CurrentVersion<${PhantomToTypeStr<Cap>}>`;
    this.$typeArgs = typeArgs;

    this.version = fields.version;
  }

  static reified<Cap extends PhantomReified<PhantomTypeArgument>>(
    Cap: Cap
  ): CurrentVersionReified<ToPhantomTypeArgument<Cap>> {
    const reifiedBcs = CurrentVersion.bcs;
    return {
      get typeName() {
        return CurrentVersion.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(
          CurrentVersion.$typeName,
          ...[extractType(Cap)]
        ) as `${string}::version::CurrentVersion<${PhantomToTypeStr<ToPhantomTypeArgument<Cap>>}>`;
      },
      get typeArgs() {
        return [extractType(Cap)] as [PhantomToTypeStr<ToPhantomTypeArgument<Cap>>];
      },
      isPhantom: CurrentVersion.$isPhantom,
      reifiedTypeArgs: [Cap],
      fromFields: (fields: Record<string, any>) => CurrentVersion.fromFields(Cap, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CurrentVersion.fromFieldsWithTypes(Cap, item),
      fromBcs: (data: Uint8Array) => CurrentVersion.fromFields(Cap, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CurrentVersion.fromJSONField(Cap, field),
      fromJSON: (json: Record<string, any>) => CurrentVersion.fromJSON(Cap, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => CurrentVersion.fromCoreObject(Cap, obj),
      fromSuiParsedData: (content: SuiParsedData) => CurrentVersion.fromSuiParsedData(Cap, content),
      fromSuiObjectData: (content: SuiObjectData) => CurrentVersion.fromSuiObjectData(Cap, content),
      fetch: async (client: ClientWithCoreApi, id: string) => CurrentVersion.fetch(client, Cap, id),
      new: (fields: CurrentVersionFields<ToPhantomTypeArgument<Cap>>) => {
        return new CurrentVersion([extractType(Cap)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): typeof CurrentVersion.reified {
    return CurrentVersion.reified;
  }

  static phantom<Cap extends PhantomReified<PhantomTypeArgument>>(
    Cap: Cap
  ): PhantomReified<ToTypeStr<CurrentVersion<ToPhantomTypeArgument<Cap>>>> {
    return phantom(CurrentVersion.reified(Cap));
  }

  static get p(): typeof CurrentVersion.phantom {
    return CurrentVersion.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("CurrentVersion", {
      version: bcs.u64(),
    });
  }

  private static cachedBcs: ReturnType<typeof CurrentVersion.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof CurrentVersion.instantiateBcs> {
    if (!CurrentVersion.cachedBcs) {
      CurrentVersion.cachedBcs = CurrentVersion.instantiateBcs();
    }
    return CurrentVersion.cachedBcs;
  }

  static fromFields<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    fields: Record<string, any>
  ): CurrentVersion<ToPhantomTypeArgument<Cap>> {
    return CurrentVersion.reified(typeArg).new({
      version: decodeFromFields("u64", fields.version),
    });
  }

  static fromFieldsWithTypes<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    item: FieldsWithTypes
  ): CurrentVersion<ToPhantomTypeArgument<Cap>> {
    if (!isCurrentVersion(item.type)) {
      throw new Error("not a CurrentVersion type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return CurrentVersion.reified(typeArg).new({
      version: decodeFromFieldsWithTypes("u64", item.fields.version),
    });
  }

  static fromBcs<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    data: Uint8Array
  ): CurrentVersion<ToPhantomTypeArgument<Cap>> {
    return CurrentVersion.fromFields(typeArg, CurrentVersion.bcs.parse(data));
  }

  toJSONField(): CurrentVersionJSONField<Cap> {
    return {
      version: this.version.toString(),
    };
  }

  toJSON(): CurrentVersionJSON<Cap> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    field: any
  ): CurrentVersion<ToPhantomTypeArgument<Cap>> {
    return CurrentVersion.reified(typeArg).new({
      version: decodeFromJSONField("u64", field.version),
    });
  }

  static fromJSON<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    json: Record<string, any>
  ): CurrentVersion<ToPhantomTypeArgument<Cap>> {
    if (json.$typeName !== CurrentVersion.$typeName) {
      throw new Error(
        `not a CurrentVersion json object: expected '${CurrentVersion.$typeName}' but got '${json.$typeName}'`
      );
    }
    assertReifiedTypeArgsMatch(composeSuiType(CurrentVersion.$typeName, ...[extractType(typeArg)]), json.$typeArgs, [
      typeArg,
    ]);

    return CurrentVersion.fromJSONField(typeArg, json);
  }

  static fromCoreObject<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    obj: SuiClientTypes.Object<{ content: true }>
  ): CurrentVersion<ToPhantomTypeArgument<Cap>> {
    if (!isCurrentVersion(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CurrentVersion object`);
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

    return CurrentVersion.fromBcs(typeArg, obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CurrentVersion.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    content: SuiParsedData
  ): CurrentVersion<ToPhantomTypeArgument<Cap>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isCurrentVersion(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CurrentVersion object`);
    }
    return CurrentVersion.fromFieldsWithTypes(typeArg, content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CurrentVersion.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<Cap extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cap,
    data: SuiObjectData
  ): CurrentVersion<ToPhantomTypeArgument<Cap>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isCurrentVersion(data.bcs.type)) {
        throw new Error(`object at is not a CurrentVersion object`);
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

      return CurrentVersion.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return CurrentVersion.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch<Cap extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: Cap,
    id: string
  ): Promise<CurrentVersion<ToPhantomTypeArgument<Cap>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isCurrentVersion(object.type)) {
      throw new Error(`object at id ${id} is not a CurrentVersion object`);
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

    return CurrentVersion.fromBcs(typeArg, object.content);
  }
}
