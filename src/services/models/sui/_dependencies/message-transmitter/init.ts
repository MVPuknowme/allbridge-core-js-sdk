// @ts-nocheck
import { StructClassLoader } from "../../_framework/loader";
import * as message from "./message/structs";
import * as receiveMessage from "./receive-message/structs";
import * as state from "./state/structs";

export function registerClasses(loader: StructClassLoader): void {
  loader.register(message.Message);
  loader.register(receiveMessage.Receipt);
  loader.register(receiveMessage.StampedReceipt);
  loader.register(receiveMessage.StampReceiptTicket);
  loader.register(state.State);
}
