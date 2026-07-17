// @ts-nocheck
import { StructClassLoader } from "../_framework/loader";
import * as bytes32 from "./bytes32/structs";
import * as feeCollector from "./fee-collector/structs";
import * as message from "./message/structs";
import * as messengerProtocol from "./messenger-protocol/structs";
import * as set from "./set/structs";
import * as version from "./version/structs";

export function registerClasses(loader: StructClassLoader): void {
  loader.register(bytes32.Bytes32);
  loader.register(feeCollector.FeeCollector);
  loader.register(message.Message);
  loader.register(messengerProtocol.MessengerProtocol);
  loader.register(set.Empty);
  loader.register(set.Set);
  loader.register(version.CurrentVersion);
}
