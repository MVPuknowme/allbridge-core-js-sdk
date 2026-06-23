// @ts-nocheck
import { StructClassLoader } from "../_framework/loader";
import * as events from "./events/structs";
import * as wormholeMessenger from "./wormhole-messenger/structs";

export function registerClasses(loader: StructClassLoader): void {
  loader.register(events.MessageSentEvent);
  loader.register(events.MessageReceivedEvent);
  loader.register(wormholeMessenger.WormholeMessenger);
  loader.register(wormholeMessenger.AdminCap);
}
