// @ts-nocheck
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";
import type { SuiObjectData, SuiParsedData } from "@mysten/sui/jsonRpc";
import { fromBase64 } from "@mysten/sui/utils";
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
import { StampReceiptTicket } from "../../message-transmitter/receive-message/structs";
import { BurnMessage } from "../burn-message/structs";
import { MessageTransmitterAuthenticator } from "../message-transmitter-authenticator/structs";

/* ============================== StampReceiptTicketWithBurnMessage =============================== */

export function isStampReceiptTicketWithBurnMessage(type: string): boolean {
  type = compressSuiType(type);
  return (
    type ===
    `${getTypeOrigin(
      "token-messenger-minter",
      "handle_receive_message::StampReceiptTicketWithBurnMessage"
    )}::handle_receive_message::StampReceiptTicketWithBurnMessage`
  );
}

export interface StampReceiptTicketWithBurnMessageFields {
  stampReceiptTicket: ToField<StampReceiptTicket<MessageTransmitterAuthenticator>>;
  burnMessage: ToField<BurnMessage>;
}

export type StampReceiptTicketWithBurnMessageReified = Reified<
  StampReceiptTicketWithBurnMessage,
  StampReceiptTicketWithBurnMessageFields
>;

export type StampReceiptTicketWithBurnMessageJSONField = {
  stampReceiptTicket: ToJSON<StampReceiptTicket<MessageTransmitterAuthenticator>>;
  burnMessage: ToJSON<BurnMessage>;
};

export type StampReceiptTicketWithBurnMessageJSON = {
  $typeName: typeof StampReceiptTicketWithBurnMessage.$typeName;
  $typeArgs: [];
} & StampReceiptTicketWithBurnMessageJSONField;

export class StampReceiptTicketWithBurnMessage implements StructClass {
  __StructClass = true as const;

  static get $typeName(): `${string}::handle_receive_message::StampReceiptTicketWithBurnMessage` {
    return `${getTypeOrigin(
      "token-messenger-minter",
      "handle_receive_message::StampReceiptTicketWithBurnMessage"
    )}::handle_receive_message::StampReceiptTicketWithBurnMessage` as const;
  }
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName: typeof StampReceiptTicketWithBurnMessage.$typeName = StampReceiptTicketWithBurnMessage.$typeName;
  readonly $fullTypeName: `${string}::handle_receive_message::StampReceiptTicketWithBurnMessage`;
  readonly $typeArgs: [];
  readonly $isPhantom: typeof StampReceiptTicketWithBurnMessage.$isPhantom =
    StampReceiptTicketWithBurnMessage.$isPhantom;

  readonly stampReceiptTicket: ToField<StampReceiptTicket<MessageTransmitterAuthenticator>>;
  readonly burnMessage: ToField<BurnMessage>;

  private constructor(typeArgs: [], fields: StampReceiptTicketWithBurnMessageFields) {
    this.$fullTypeName = composeSuiType(
      StampReceiptTicketWithBurnMessage.$typeName,
      ...typeArgs
    ) as `${string}::handle_receive_message::StampReceiptTicketWithBurnMessage`;
    this.$typeArgs = typeArgs;

    this.stampReceiptTicket = fields.stampReceiptTicket;
    this.burnMessage = fields.burnMessage;
  }

  static reified(): StampReceiptTicketWithBurnMessageReified {
    const reifiedBcs = StampReceiptTicketWithBurnMessage.bcs;
    return {
      get typeName() {
        return StampReceiptTicketWithBurnMessage.$typeName;
      },
      get fullTypeName() {
        return composeSuiType(
          StampReceiptTicketWithBurnMessage.$typeName,
          ...[]
        ) as `${string}::handle_receive_message::StampReceiptTicketWithBurnMessage`;
      },
      typeArgs: [] as [],
      isPhantom: StampReceiptTicketWithBurnMessage.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => StampReceiptTicketWithBurnMessage.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => StampReceiptTicketWithBurnMessage.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => StampReceiptTicketWithBurnMessage.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => StampReceiptTicketWithBurnMessage.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => StampReceiptTicketWithBurnMessage.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        StampReceiptTicketWithBurnMessage.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => StampReceiptTicketWithBurnMessage.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => StampReceiptTicketWithBurnMessage.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => StampReceiptTicketWithBurnMessage.fetch(client, id),
      new: (fields: StampReceiptTicketWithBurnMessageFields) => {
        return new StampReceiptTicketWithBurnMessage([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r(): StampReceiptTicketWithBurnMessageReified {
    return StampReceiptTicketWithBurnMessage.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<StampReceiptTicketWithBurnMessage>> {
    return phantom(StampReceiptTicketWithBurnMessage.reified());
  }

  static get p(): PhantomReified<ToTypeStr<StampReceiptTicketWithBurnMessage>> {
    return StampReceiptTicketWithBurnMessage.phantom();
  }

  private static instantiateBcs() {
    return bcs.struct("StampReceiptTicketWithBurnMessage", {
      stamp_receipt_ticket: StampReceiptTicket.bcs(MessageTransmitterAuthenticator.bcs),
      burn_message: BurnMessage.bcs,
    });
  }

  private static cachedBcs: ReturnType<typeof StampReceiptTicketWithBurnMessage.instantiateBcs> | null = null;

  static get bcs(): ReturnType<typeof StampReceiptTicketWithBurnMessage.instantiateBcs> {
    if (!StampReceiptTicketWithBurnMessage.cachedBcs) {
      StampReceiptTicketWithBurnMessage.cachedBcs = StampReceiptTicketWithBurnMessage.instantiateBcs();
    }
    return StampReceiptTicketWithBurnMessage.cachedBcs;
  }

  static fromFields(fields: Record<string, any>): StampReceiptTicketWithBurnMessage {
    return StampReceiptTicketWithBurnMessage.reified().new({
      stampReceiptTicket: decodeFromFields(
        StampReceiptTicket.reified(MessageTransmitterAuthenticator.reified()),
        fields.stamp_receipt_ticket
      ),
      burnMessage: decodeFromFields(BurnMessage.reified(), fields.burn_message),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): StampReceiptTicketWithBurnMessage {
    if (!isStampReceiptTicketWithBurnMessage(item.type)) {
      throw new Error("not a StampReceiptTicketWithBurnMessage type");
    }

    return StampReceiptTicketWithBurnMessage.reified().new({
      stampReceiptTicket: decodeFromFieldsWithTypes(
        StampReceiptTicket.reified(MessageTransmitterAuthenticator.reified()),
        item.fields.stamp_receipt_ticket
      ),
      burnMessage: decodeFromFieldsWithTypes(BurnMessage.reified(), item.fields.burn_message),
    });
  }

  static fromBcs(data: Uint8Array): StampReceiptTicketWithBurnMessage {
    return StampReceiptTicketWithBurnMessage.fromFields(StampReceiptTicketWithBurnMessage.bcs.parse(data));
  }

  toJSONField(): StampReceiptTicketWithBurnMessageJSONField {
    return {
      stampReceiptTicket: this.stampReceiptTicket.toJSONField(),
      burnMessage: this.burnMessage.toJSONField(),
    };
  }

  toJSON(): StampReceiptTicketWithBurnMessageJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): StampReceiptTicketWithBurnMessage {
    return StampReceiptTicketWithBurnMessage.reified().new({
      stampReceiptTicket: decodeFromJSONField(
        StampReceiptTicket.reified(MessageTransmitterAuthenticator.reified()),
        field.stampReceiptTicket
      ),
      burnMessage: decodeFromJSONField(BurnMessage.reified(), field.burnMessage),
    });
  }

  static fromJSON(json: Record<string, any>): StampReceiptTicketWithBurnMessage {
    if (json.$typeName !== StampReceiptTicketWithBurnMessage.$typeName) {
      throw new Error(
        `not a StampReceiptTicketWithBurnMessage json object: expected '${StampReceiptTicketWithBurnMessage.$typeName}' but got '${json.$typeName}'`
      );
    }

    return StampReceiptTicketWithBurnMessage.fromJSONField(json);
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): StampReceiptTicketWithBurnMessage {
    if (!isStampReceiptTicketWithBurnMessage(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a StampReceiptTicketWithBurnMessage object`);
    }
    return StampReceiptTicketWithBurnMessage.fromBcs(obj.content);
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link StampReceiptTicketWithBurnMessage.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): StampReceiptTicketWithBurnMessage {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isStampReceiptTicketWithBurnMessage(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a StampReceiptTicketWithBurnMessage object`);
    }
    return StampReceiptTicketWithBurnMessage.fromFieldsWithTypes(content);
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link StampReceiptTicketWithBurnMessage.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): StampReceiptTicketWithBurnMessage {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isStampReceiptTicketWithBurnMessage(data.bcs.type)) {
        throw new Error(`object at is not a StampReceiptTicketWithBurnMessage object`);
      }

      return StampReceiptTicketWithBurnMessage.fromBcs(fromBase64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return StampReceiptTicketWithBurnMessage.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<StampReceiptTicketWithBurnMessage> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    });
    if (!isStampReceiptTicketWithBurnMessage(object.type)) {
      throw new Error(`object at id ${id} is not a StampReceiptTicketWithBurnMessage object`);
    }
    return StampReceiptTicketWithBurnMessage.fromBcs(object.content);
  }
}
