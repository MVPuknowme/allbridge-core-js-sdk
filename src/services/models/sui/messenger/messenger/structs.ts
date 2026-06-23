// @ts-nocheck
/** Module: messenger */

import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64 } from "@mysten/sui/utils";
import { Balance } from "../../_dependencies/sui/balance/structs";
import { UID } from "../../_dependencies/sui/object/structs";
import { SUI } from "../../_dependencies/sui/sui/structs";
import { Table } from "../../_dependencies/sui/table/structs";
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
import { Message } from "../../utils/message/structs";
import { Set } from "../../utils/set/structs";

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("messenger", "messenger::AdminCap")}::messenger::AdminCap`;
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

  static get $typeName(): `${string}::messenger::AdminCap` {
    return `${getTypeOrigin("messenger", "messenger::AdminCap")}::messenger::AdminCap` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof AdminCap.$typeName = AdminCap.$typeName;
  readonly $fullTypeName: `${string}::messenger::AdminCap`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof AdminCap.$isPhantom = AdminCap.$isPhantom;

  readonly id: ToField<UID>;

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(AdminCap.$typeName, ...typeArgs) as `${string}::messenger::AdminCap`;
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
        return composeSuiType(AdminCap.$typeName, ...[]) as `${string}::messenger::AdminCap`;
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

/* ============================== Messenger =============================== */

export function isMessenger(type: string): boolean {
  type = compressSuiType(type);
  return type === `${getTypeOrigin("messenger", "messenger::Messenger")}::messenger::Messenger`;
}

export interface MessengerFields {
  id: ToField<UID>;
  primaryValidator: ToField<Vector<"u8">>;
  secondaryValidators: ToField<Set<ToPhantom<Vector<"u8">>>>;
  receivedMessages: ToField<Set<ToPhantom<Message>>>;
  sentMessages: ToField<Set<ToPhantom<Message>>>;
  otherChainIds: ToField<Vector<"bool">>;
  gasUsage: ToField<Table<"u8", "u64">>;
  gasBalance: ToField<Balance<ToPhantom<SUI>>>;
}

export type MessengerReified = Reified<Messenger, MessengerFields>;

export type MessengerJSONField = {
  id: string;
  primaryValidator: number[];
  secondaryValidators: ToJSON<Set<ToPhantom<Vector<"u8">>>>;
  receivedMessages: ToJSON<Set<ToPhantom<Message>>>;
  sentMessages: ToJSON<Set<ToPhantom<Message>>>;
  otherChainIds: boolean[];
  gasUsage: ToJSON<Table<"u8", "u64">>;
  gasBalance: ToJSON<Balance<ToPhantom<SUI>>>;
};

export type MessengerJSON = {
  $typeName: typeof Messenger.$typeName;
  $typeArgs: [];
} & MessengerJSONField;

export class Messenger implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::messenger::Messenger` {
    return `${getTypeOrigin("messenger", "messenger::Messenger")}::messenger::Messenger` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof Messenger.$typeName = Messenger.$typeName;
  readonly $fullTypeName: `${string}::messenger::Messenger`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof Messenger.$isPhantom = Messenger.$isPhantom;

  readonly id: ToField<UID>;
  readonly primaryValidator: ToField<Vector<"u8">>;
  readonly secondaryValidators: ToField<Set<ToPhantom<Vector<"u8">>>>;
  readonly receivedMessages: ToField<Set<ToPhantom<Message>>>;
  readonly sentMessages: ToField<Set<ToPhantom<Message>>>;
  readonly otherChainIds: ToField<Vector<"bool">>;
  readonly gasUsage: ToField<Table<"u8", "u64">>;
  readonly gasBalance: ToField<Balance<ToPhantom<SUI>>>;

  private constructor(typeArgs: [], fields: MessengerFields) {
    this.$fullTypeName = composeSuiType(Messenger.$typeName, ...typeArgs) as `${string}::messenger::Messenger`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.primaryValidator = fields.primaryValidator;
    this.secondaryValidators = fields.secondaryValidators;
    this.receivedMessages = fields.receivedMessages;
    this.sentMessages = fields.sentMessages;
    this.otherChainIds = fields.otherChainIds;
    this.gasUsage = fields.gasUsage;
    this.gasBalance = fields.gasBalance;
  }

  static reified(): MessengerReified {
    const reifiedBcs = Messenger.bcs;
    return {
      get typeName() {
        return Messenger.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(Messenger.$typeName, ...[]) as `${string}::messenger::Messenger`;
      },
      typeArgs: [] as [],
      isPhantom: Messenger.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Messenger.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Messenger.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Messenger.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Messenger.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Messenger.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Messenger.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Messenger.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Messenger.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Messenger.fetch(client, id),
      new: (fields: MessengerFields) => {
        return new Messenger([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): MessengerReified {
    return Messenger.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<Messenger>> {
    return phantom(Messenger.reified());
  }

  static get p(): PhantomReified<ToTypeStr<Messenger>> {
    return Messenger.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("Messenger", {
      id: UID.bcs,
      primary_validator: bcs.vector(bcs.u8()),
      secondary_validators: Set.bcs,
      received_messages: Set.bcs,
      sent_messages: Set.bcs,
      other_chain_ids: bcs.vector(bcs.bool()),
      gas_usage: Table.bcs,
      gas_balance: Balance.bcs,
    });
  }

  private static cachedBcs: ReturnType<typeof Messenger.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof Messenger.instantiateBcs> {
    if (!Messenger.cachedBcs) {
      Messenger.cachedBcs = Messenger.instantiateBcs();
    }
    return Messenger.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): Messenger {
    return Messenger.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      primaryValidator: decodeFromFields(vector("u8"), fields.primary_validator),
      secondaryValidators: decodeFromFields(Set.reified(phantom(vector("u8"))), fields.secondary_validators),
      receivedMessages: decodeFromFields(Set.reified(phantom(Message.reified())), fields.received_messages),
      sentMessages: decodeFromFields(Set.reified(phantom(Message.reified())), fields.sent_messages),
      otherChainIds: decodeFromFields(vector("bool"), fields.other_chain_ids),
      gasUsage: decodeFromFields(Table.reified(phantom("u8"), phantom("u64")), fields.gas_usage),
      gasBalance: decodeFromFields(Balance.reified(phantom(SUI.reified())), fields.gas_balance),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Messenger {
    if (!isMessenger(item.type)) {
      throw new Error("not a Messenger type");
    }

    return Messenger.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      primaryValidator: decodeFromFieldsWithTypes(vector("u8"), item.fields.primary_validator),
      secondaryValidators: decodeFromFieldsWithTypes(
        Set.reified(phantom(vector("u8"))),
        item.fields.secondary_validators
      ),
      receivedMessages: decodeFromFieldsWithTypes(
        Set.reified(phantom(Message.reified())),
        item.fields.received_messages
      ),
      sentMessages: decodeFromFieldsWithTypes(Set.reified(phantom(Message.reified())), item.fields.sent_messages),
      otherChainIds: decodeFromFieldsWithTypes(vector("bool"), item.fields.other_chain_ids),
      gasUsage: decodeFromFieldsWithTypes(Table.reified(phantom("u8"), phantom("u64")), item.fields.gas_usage),
      gasBalance: decodeFromFieldsWithTypes(Balance.reified(phantom(SUI.reified())), item.fields.gas_balance),
    });
  }

  static fromBcs(data: Uint8Array): Messenger {
    return Messenger.fromFields(Messenger.bcs.parse(data));
  }

  toJSONField(): MessengerJSONField {
    return {
      id: this.id,
      primaryValidator: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.primaryValidator),
      secondaryValidators: this.secondaryValidators.toJSONField(),
      receivedMessages: this.receivedMessages.toJSONField(),
      sentMessages: this.sentMessages.toJSONField(),
      otherChainIds: fieldToJSON<Vector<"bool">>(`vector<bool>`, this.otherChainIds),
      gasUsage: this.gasUsage.toJSONField(),
      gasBalance: this.gasBalance.toJSONField(),
    };
  }

  toJSON(): MessengerJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): Messenger {
    return Messenger.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      primaryValidator: decodeFromJSONField(vector("u8"), field.primaryValidator),
      secondaryValidators: decodeFromJSONField(Set.reified(phantom(vector("u8"))), field.secondaryValidators),
      receivedMessages: decodeFromJSONField(Set.reified(phantom(Message.reified())), field.receivedMessages),
      sentMessages: decodeFromJSONField(Set.reified(phantom(Message.reified())), field.sentMessages),
      otherChainIds: decodeFromJSONField(vector("bool"), field.otherChainIds),
      gasUsage: decodeFromJSONField(Table.reified(phantom("u8"), phantom("u64")), field.gasUsage),
      gasBalance: decodeFromJSONField(Balance.reified(phantom(SUI.reified())), field.gasBalance),
    });
  }

  static fromJSON(json: Record<string, any>): Messenger {
    if (json.$typeName !== Messenger.$typeName) {
      throw new Error(`not a Messenger json object: expected '${Messenger.$typeName}' but got '${json.$typeName}'`);
    }

    return Messenger.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Messenger {
    if (!isMessenger(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Messenger object`);
    }
    return Messenger.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Messenger.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Messenger {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isMessenger(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Messenger object`);
    }
    return Messenger.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Messenger.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Messenger {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isMessenger(data.bcs.type)) {
        throw new Error(`object at is not a Messenger object`);
      }

      return Messenger.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return Messenger.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Messenger> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isMessenger(object.type)) {
      throw new Error(`object at id ${id} is not a Messenger object`);
    }
    return Messenger.fromBcs(object.content);
  }
}
