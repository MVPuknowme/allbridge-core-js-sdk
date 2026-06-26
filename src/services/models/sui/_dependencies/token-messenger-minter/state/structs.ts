// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64, fromHex, toHex } from "@mysten/sui/utils";
import { getTypeOrigin } from "../../../_envs";
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
} from "../../../_framework/reified";
import { composeSuiType, compressSuiType, FieldsWithTypes } from "../../../_framework/util";
import { Bag } from "../../sui/bag/structs";
import { UID } from "../../sui/object/structs";
import { Table } from "../../sui/table/structs";
import { VecSet } from "../../sui/vec-set/structs";

/* ============================== State =============================== */

export function isState(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("token-messenger-minter", "state::State")}::state::State`;
}

export interface StateFields {
  id: ToField<UID>;
  messageBodyVersion: ToField<"u32">;
  remoteTokenMessengers: ToField<Table<"u32", "address">>;
  burnLimitsPerMessage: ToField<Table<"address", "u64">>;
  remoteTokensToLocalTokens: ToField<Table<"address", "address">>;
  mintCaps: ToField<Bag>;
  paused: ToField<"bool">;
  compatibleVersions: ToField<VecSet<"u64">>;
}

export type StateReified = Reified<State, StateFields>;

export type StateJSONField = {
  id: string;
  messageBodyVersion: number;
  remoteTokenMessengers: ToJSON<Table<"u32", "address">>;
  burnLimitsPerMessage: ToJSON<Table<"address", "u64">>;
  remoteTokensToLocalTokens: ToJSON<Table<"address", "address">>;
  mintCaps: ToJSON<Bag>;
  paused: boolean;
  compatibleVersions: ToJSON<VecSet<"u64">>;
};

export type StateJSON = {
  $typeName: typeof State.$typeName;
  $typeArgs: [];
} & StateJSONField;

export class State implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::state::State` {
    return `${getTypeOrigin("token-messenger-minter", "state::State")}::state::State` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof State.$typeName = State.$typeName;
  readonly $fullTypeName: `${string}::state::State`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof State.$isPhantom = State.$isPhantom;

  readonly id: ToField<UID>;
  readonly messageBodyVersion: ToField<"u32">;
  readonly remoteTokenMessengers: ToField<Table<"u32", "address">>;
  readonly burnLimitsPerMessage: ToField<Table<"address", "u64">>;
  readonly remoteTokensToLocalTokens: ToField<Table<"address", "address">>;
  readonly mintCaps: ToField<Bag>;
  readonly paused: ToField<"bool">;
  readonly compatibleVersions: ToField<VecSet<"u64">>;

  private constructor(typeArgs: [], fields: StateFields) {
    this.$fullTypeName = composeSuiType(State.$typeName, ...typeArgs) as `${string}::state::State`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.messageBodyVersion = fields.messageBodyVersion;
    this.remoteTokenMessengers = fields.remoteTokenMessengers;
    this.burnLimitsPerMessage = fields.burnLimitsPerMessage;
    this.remoteTokensToLocalTokens = fields.remoteTokensToLocalTokens;
    this.mintCaps = fields.mintCaps;
    this.paused = fields.paused;
    this.compatibleVersions = fields.compatibleVersions;
  }

  static reified(): StateReified {
    const reifiedBcs = State.bcs;
    return {
      get typeName() {
        return State.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(State.$typeName, ...[]) as `${string}::state::State`;
      },
      typeArgs: [] as [],
      isPhantom: State.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => State.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => State.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => State.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => State.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => State.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => State.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => State.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => State.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => State.fetch(client, id),
      new: (fields: StateFields) => {
        return new State([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): StateReified {
    return State.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<State>> {
    return phantom(State.reified());
  }

  static get p(): PhantomReified<ToTypeStr<State>> {
    return State.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("State", {
      id: UID.bcs,
      message_body_version: bcs.u32(),
      remote_token_messengers: Table.bcs,
      burn_limits_per_message: Table.bcs,
      remote_tokens_to_local_tokens: Table.bcs,
      mint_caps: Bag.bcs,
      paused: bcs.bool(),
      compatible_versions: VecSet.bcs(bcs.u64()),
    });
  }

  private static cachedBcs: ReturnType<typeof State.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof State.instantiateBcs> {
    if (!State.cachedBcs) {
      State.cachedBcs = State.instantiateBcs();
    }
    return State.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): State {
    return State.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      messageBodyVersion: decodeFromFields("u32", fields.message_body_version),
      remoteTokenMessengers: decodeFromFields(
        Table.reified(phantom("u32"), phantom("address")),
        fields.remote_token_messengers
      ),
      burnLimitsPerMessage: decodeFromFields(
        Table.reified(phantom("address"), phantom("u64")),
        fields.burn_limits_per_message
      ),
      remoteTokensToLocalTokens: decodeFromFields(
        Table.reified(phantom("address"), phantom("address")),
        fields.remote_tokens_to_local_tokens
      ),
      mintCaps: decodeFromFields(Bag.reified(), fields.mint_caps),
      paused: decodeFromFields("bool", fields.paused),
      compatibleVersions: decodeFromFields(VecSet.reified("u64"), fields.compatible_versions),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): State {
    if (!isState(item.type)) {
      throw new Error("not a State type");
    }

    return State.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      messageBodyVersion: decodeFromFieldsWithTypes("u32", item.fields.message_body_version),
      remoteTokenMessengers: decodeFromFieldsWithTypes(
        Table.reified(phantom("u32"), phantom("address")),
        item.fields.remote_token_messengers
      ),
      burnLimitsPerMessage: decodeFromFieldsWithTypes(
        Table.reified(phantom("address"), phantom("u64")),
        item.fields.burn_limits_per_message
      ),
      remoteTokensToLocalTokens: decodeFromFieldsWithTypes(
        Table.reified(phantom("address"), phantom("address")),
        item.fields.remote_tokens_to_local_tokens
      ),
      mintCaps: decodeFromFieldsWithTypes(Bag.reified(), item.fields.mint_caps),
      paused: decodeFromFieldsWithTypes("bool", item.fields.paused),
      compatibleVersions: decodeFromFieldsWithTypes(VecSet.reified("u64"), item.fields.compatible_versions),
    });
  }

  static fromBcs(data: Uint8Array): State {
    return State.fromFields(State.bcs.parse(data));
  }

  toJSONField(): StateJSONField {
    return {
      id: this.id,
      messageBodyVersion: this.messageBodyVersion,
      remoteTokenMessengers: this.remoteTokenMessengers.toJSONField(),
      burnLimitsPerMessage: this.burnLimitsPerMessage.toJSONField(),
      remoteTokensToLocalTokens: this.remoteTokensToLocalTokens.toJSONField(),
      mintCaps: this.mintCaps.toJSONField(),
      paused: this.paused,
      compatibleVersions: this.compatibleVersions.toJSONField(),
    };
  }

  toJSON(): StateJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): State {
    return State.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      messageBodyVersion: decodeFromJSONField("u32", field.messageBodyVersion),
      remoteTokenMessengers: decodeFromJSONField(
        Table.reified(phantom("u32"), phantom("address")),
        field.remoteTokenMessengers
      ),
      burnLimitsPerMessage: decodeFromJSONField(
        Table.reified(phantom("address"), phantom("u64")),
        field.burnLimitsPerMessage
      ),
      remoteTokensToLocalTokens: decodeFromJSONField(
        Table.reified(phantom("address"), phantom("address")),
        field.remoteTokensToLocalTokens
      ),
      mintCaps: decodeFromJSONField(Bag.reified(), field.mintCaps),
      paused: decodeFromJSONField("bool", field.paused),
      compatibleVersions: decodeFromJSONField(VecSet.reified("u64"), field.compatibleVersions),
    });
  }

  static fromJSON(json: Record<string, any>): State {
    if (json.$typeName !== State.$typeName) {
      throw new Error(`not a State json object: expected '${State.$typeName}' but got '${json.$typeName}'`);
    }

    return State.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): State {
    if (!isState(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a State object`);
    }
    return State.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link State.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): State {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isState(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a State object`);
    }
    return State.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link State.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): State {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isState(data.bcs.type)) {
        throw new Error(`object at is not a State object`);
      }

      return State.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return State.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<State> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isState(object.type)) {
      throw new Error(`object at id ${id} is not a State object`);
    }
    return State.fromBcs(object.content);
  }
}
