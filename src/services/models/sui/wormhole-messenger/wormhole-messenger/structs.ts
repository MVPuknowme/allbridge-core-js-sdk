// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64 } from "@mysten/sui/utils";
import { Option } from "../../_dependencies/std/option/structs";
import { Balance } from "../../_dependencies/sui/balance/structs";
import { UID } from "../../_dependencies/sui/object/structs";
import { SUI } from "../../_dependencies/sui/sui/structs";
import { Table } from "../../_dependencies/sui/table/structs";
import { EmitterCap } from "../../_dependencies/wormhole/emitter/structs";
import { getTypeOrigin } from "../../_envs";
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  ToTypeStr as ToPhantom,
  vector,
} from "../../_framework/reified";
import { composeSuiType, compressSuiType, FieldsWithTypes } from "../../_framework/util";
import { Vector } from "../../_framework/vector";
import { Bytes32 } from "../../utils/bytes32/structs";
import { Message } from "../../utils/message/structs";
import { Set } from "../../utils/set/structs";

/* ============================== WormholeMessenger =============================== */

export function isWormholeMessenger(type: string): boolean {
  type = compressSuiType(type);
  return (
    type ===
    `${getTypeOrigin(
      "wormhole-messenger",
      "wormhole_messenger::WormholeMessenger"
    )}::wormhole_messenger::WormholeMessenger`
  );
}

export interface WormholeMessengerFields {
  id: ToField<UID>;
  emitterCap: ToField<Option<EmitterCap>>;
  receivedMessages: ToField<Set<ToPhantom<Message>>>;
  sentMessages: ToField<Set<ToPhantom<Message>>>;
  otherWormholeMessengers: ToField<Table<"u16", ToPhantom<Bytes32>>>;
  otherChainIds: ToField<Vector<"bool">>;
  gasUsage: ToField<Table<"u8", "u64">>;
  gasBalance: ToField<Balance<ToPhantom<SUI>>>;
}

export type WormholeMessengerReified = Reified<WormholeMessenger, WormholeMessengerFields>;

export type WormholeMessengerJSONField = {
  id: string;
  emitterCap: ToJSON<EmitterCap> | null;
  receivedMessages: ToJSON<Set<ToPhantom<Message>>>;
  sentMessages: ToJSON<Set<ToPhantom<Message>>>;
  otherWormholeMessengers: ToJSON<Table<"u16", ToPhantom<Bytes32>>>;
  otherChainIds: boolean[];
  gasUsage: ToJSON<Table<"u8", "u64">>;
  gasBalance: ToJSON<Balance<ToPhantom<SUI>>>;
};

export type WormholeMessengerJSON = {
  $typeName: typeof WormholeMessenger.$typeName;
  $typeArgs: [];
} & WormholeMessengerJSONField;

export class WormholeMessenger implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::wormhole_messenger::WormholeMessenger` {
    return `${getTypeOrigin(
      "wormhole-messenger",
      "wormhole_messenger::WormholeMessenger"
    )}::wormhole_messenger::WormholeMessenger` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof WormholeMessenger.$typeName = WormholeMessenger.$typeName;
  readonly $fullTypeName: `${string}::wormhole_messenger::WormholeMessenger`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof WormholeMessenger.$isPhantom = WormholeMessenger.$isPhantom;

  readonly id: ToField<UID>;
  readonly emitterCap: ToField<Option<EmitterCap>>;
  readonly receivedMessages: ToField<Set<ToPhantom<Message>>>;
  readonly sentMessages: ToField<Set<ToPhantom<Message>>>;
  readonly otherWormholeMessengers: ToField<Table<"u16", ToPhantom<Bytes32>>>;
  readonly otherChainIds: ToField<Vector<"bool">>;
  readonly gasUsage: ToField<Table<"u8", "u64">>;
  readonly gasBalance: ToField<Balance<ToPhantom<SUI>>>;

  private constructor(typeArgs: [], fields: WormholeMessengerFields) {
    this.$fullTypeName = composeSuiType(
      WormholeMessenger.$typeName,
      ...typeArgs
    ) as `${string}::wormhole_messenger::WormholeMessenger`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.emitterCap = fields.emitterCap;
    this.receivedMessages = fields.receivedMessages;
    this.sentMessages = fields.sentMessages;
    this.otherWormholeMessengers = fields.otherWormholeMessengers;
    this.otherChainIds = fields.otherChainIds;
    this.gasUsage = fields.gasUsage;
    this.gasBalance = fields.gasBalance;
  }

  static reified(): WormholeMessengerReified {
    const reifiedBcs = WormholeMessenger.bcs;
    return {
      get typeName() {
        return WormholeMessenger.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(WormholeMessenger.$typeName, ...[]) as `${string}::wormhole_messenger::WormholeMessenger`;
      },
      typeArgs: [] as [],
      isPhantom: WormholeMessenger.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WormholeMessenger.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WormholeMessenger.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WormholeMessenger.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WormholeMessenger.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WormholeMessenger.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => WormholeMessenger.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => WormholeMessenger.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => WormholeMessenger.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => WormholeMessenger.fetch(client, id),
      new: (fields: WormholeMessengerFields) => {
        return new WormholeMessenger([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): WormholeMessengerReified {
    return WormholeMessenger.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<WormholeMessenger>> {
    return phantom(WormholeMessenger.reified());
  }

  static get p(): PhantomReified<ToTypeStr<WormholeMessenger>> {
    return WormholeMessenger.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("WormholeMessenger", {
      id: UID.bcs,
      emitter_cap: Option.bcs(EmitterCap.bcs),
      received_messages: Set.bcs,
      sent_messages: Set.bcs,
      other_wormhole_messengers: Table.bcs,
      other_chain_ids: bcs.vector(bcs.bool()),
      gas_usage: Table.bcs,
      gas_balance: Balance.bcs,
    });
  }

  private static cachedBcs: ReturnType<typeof WormholeMessenger.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof WormholeMessenger.instantiateBcs> {
    if (!WormholeMessenger.cachedBcs) {
      WormholeMessenger.cachedBcs = WormholeMessenger.instantiateBcs();
    }
    return WormholeMessenger.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): WormholeMessenger {
    return WormholeMessenger.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      emitterCap: decodeFromFields(Option.reified(EmitterCap.reified()), fields.emitter_cap),
      receivedMessages: decodeFromFields(Set.reified(phantom(Message.reified())), fields.received_messages),
      sentMessages: decodeFromFields(Set.reified(phantom(Message.reified())), fields.sent_messages),
      otherWormholeMessengers: decodeFromFields(
        Table.reified(phantom("u16"), phantom(Bytes32.reified())),
        fields.other_wormhole_messengers
      ),
      otherChainIds: decodeFromFields(vector("bool"), fields.other_chain_ids),
      gasUsage: decodeFromFields(Table.reified(phantom("u8"), phantom("u64")), fields.gas_usage),
      gasBalance: decodeFromFields(Balance.reified(phantom(SUI.reified())), fields.gas_balance),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): WormholeMessenger {
    if (!isWormholeMessenger(item.type)) {
      throw new Error("not a WormholeMessenger type");
    }

    return WormholeMessenger.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      emitterCap: decodeFromFieldsWithTypes(Option.reified(EmitterCap.reified()), item.fields.emitter_cap),
      receivedMessages: decodeFromFieldsWithTypes(
        Set.reified(phantom(Message.reified())),
        item.fields.received_messages
      ),
      sentMessages: decodeFromFieldsWithTypes(Set.reified(phantom(Message.reified())), item.fields.sent_messages),
      otherWormholeMessengers: decodeFromFieldsWithTypes(
        Table.reified(phantom("u16"), phantom(Bytes32.reified())),
        item.fields.other_wormhole_messengers
      ),
      otherChainIds: decodeFromFieldsWithTypes(vector("bool"), item.fields.other_chain_ids),
      gasUsage: decodeFromFieldsWithTypes(Table.reified(phantom("u8"), phantom("u64")), item.fields.gas_usage),
      gasBalance: decodeFromFieldsWithTypes(Balance.reified(phantom(SUI.reified())), item.fields.gas_balance),
    });
  }

  static fromBcs(data: Uint8Array): WormholeMessenger {
    return WormholeMessenger.fromFields(WormholeMessenger.bcs.parse(data));
  }

  toJSONField(): WormholeMessengerJSONField {
    return {
      id: this.id,
      emitterCap: fieldToJSON<Option<EmitterCap>>(`${Option.$typeName}<${EmitterCap.$typeName}>`, this.emitterCap),
      receivedMessages: this.receivedMessages.toJSONField(),
      sentMessages: this.sentMessages.toJSONField(),
      otherWormholeMessengers: this.otherWormholeMessengers.toJSONField(),
      otherChainIds: fieldToJSON<Vector<"bool">>(`vector<bool>`, this.otherChainIds),
      gasUsage: this.gasUsage.toJSONField(),
      gasBalance: this.gasBalance.toJSONField(),
    };
  }

  toJSON(): WormholeMessengerJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): WormholeMessenger {
    return WormholeMessenger.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      emitterCap: decodeFromJSONField(Option.reified(EmitterCap.reified()), field.emitterCap),
      receivedMessages: decodeFromJSONField(Set.reified(phantom(Message.reified())), field.receivedMessages),
      sentMessages: decodeFromJSONField(Set.reified(phantom(Message.reified())), field.sentMessages),
      otherWormholeMessengers: decodeFromJSONField(
        Table.reified(phantom("u16"), phantom(Bytes32.reified())),
        field.otherWormholeMessengers
      ),
      otherChainIds: decodeFromJSONField(vector("bool"), field.otherChainIds),
      gasUsage: decodeFromJSONField(Table.reified(phantom("u8"), phantom("u64")), field.gasUsage),
      gasBalance: decodeFromJSONField(Balance.reified(phantom(SUI.reified())), field.gasBalance),
    });
  }

  static fromJSON(json: Record<string, any>): WormholeMessenger {
    if (json.$typeName !== WormholeMessenger.$typeName) {
      throw new Error(
        `not a WormholeMessenger json object: expected '${WormholeMessenger.$typeName}' but got '${json.$typeName}'`
      );
    }

    return WormholeMessenger.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): WormholeMessenger {
    if (!isWormholeMessenger(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WormholeMessenger object`);
    }
    return WormholeMessenger.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WormholeMessenger.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): WormholeMessenger {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isWormholeMessenger(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WormholeMessenger object`);
    }
    return WormholeMessenger.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WormholeMessenger.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): WormholeMessenger {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isWormholeMessenger(data.bcs.type)) {
        throw new Error(`object at is not a WormholeMessenger object`);
      }

      return WormholeMessenger.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return WormholeMessenger.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<WormholeMessenger> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isWormholeMessenger(object.type)) {
      throw new Error(`object at id ${id} is not a WormholeMessenger object`);
    }
    return WormholeMessenger.fromBcs(object.content);
  }
}

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type);
  return (
    type === `${getTypeOrigin("wormhole-messenger", "wormhole_messenger::AdminCap")}::wormhole_messenger::AdminCap`
  );
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

export class AdminCap implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::wormhole_messenger::AdminCap` {
    return `${getTypeOrigin(
      "wormhole-messenger",
      "wormhole_messenger::AdminCap"
    )}::wormhole_messenger::AdminCap` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof AdminCap.$typeName = AdminCap.$typeName;
  readonly $fullTypeName: `${string}::wormhole_messenger::AdminCap`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof AdminCap.$isPhantom = AdminCap.$isPhantom;

  readonly id: ToField<UID>;

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(AdminCap.$typeName, ...typeArgs) as `${string}::wormhole_messenger::AdminCap`;
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
        return composeSuiType(AdminCap.$typeName, ...[]) as `${string}::wormhole_messenger::AdminCap`;
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
