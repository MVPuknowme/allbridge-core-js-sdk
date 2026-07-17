// @ts-nocheck
import { StructClassLoader } from "../../_framework/loader";
import * as burnMessage from "./burn-message/structs";
import * as depositForBurn from "./deposit-for-burn/structs";
import * as handleReceiveMessage from "./handle-receive-message/structs";
import * as messageTransmitterAuthenticator from "./message-transmitter-authenticator/structs";
import * as state from "./state/structs";

export function registerClasses(loader: StructClassLoader): void {
  loader.register(burnMessage.BurnMessage);
  loader.register(depositForBurn.ReplaceDepositForBurnTicket);
  loader.register(depositForBurn.DepositForBurnTicket);
  loader.register(handleReceiveMessage.StampReceiptTicketWithBurnMessage);
  loader.register(messageTransmitterAuthenticator.MessageTransmitterAuthenticator);
  loader.register(state.State);
}
