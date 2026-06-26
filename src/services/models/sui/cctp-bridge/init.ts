// @ts-nocheck
import { StructClassLoader } from "../_framework/loader";
import * as cctpBridge from "./cctp-bridge/structs";
import * as events from "./events/structs";
import * as messageTransmitterAuthenticator from "./message-transmitter-authenticator/structs";

export function registerClasses(loader: StructClassLoader): void {
  loader.register(cctpBridge.FeeCollectorCap);
  loader.register(cctpBridge.CctpBridge);
  loader.register(cctpBridge.AdminCap);
  loader.register(events.TokensSentEvent);
  loader.register(events.TokensReceivedEvent);
  loader.register(events.RecipientReplaced);
  loader.register(events.ReceiveFeeEvent);
  loader.register(messageTransmitterAuthenticator.MessageTransmitterAuthenticator);
}
