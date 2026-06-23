// @ts-nocheck
import { StructClassLoader } from "../_framework/loader";
import * as events from "./events/structs";
import * as messenger from "./messenger/structs";

export function registerClasses(loader: StructClassLoader): void {
  loader.register(events.MessageSentEvent);
  loader.register(events.MessageReceivedEvent);
  loader.register(messenger.AdminCap);
  loader.register(messenger.Messenger);
}
