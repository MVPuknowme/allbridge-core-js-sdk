// @ts-nocheck
import { StructClassLoader } from "../../_framework/loader";
import * as bytes20 from "./bytes20/structs";
import * as bytes32 from "./bytes32/structs";
import * as consumedVaas from "./consumed-vaas/structs";
import * as cursor from "./cursor/structs";
import * as emitter from "./emitter/structs";
import * as externalAddress from "./external-address/structs";
import * as feeCollector from "./fee-collector/structs";
import * as guardianSet from "./guardian-set/structs";
import * as guardian from "./guardian/structs";
import * as publishMessage from "./publish-message/structs";
import * as set from "./set/structs";
import * as state from "./state/structs";
import * as vaa from "./vaa/structs";

export function registerClasses(loader: StructClassLoader): void {
  loader.register(bytes20.Bytes20);
  loader.register(bytes32.Bytes32);
  loader.register(consumedVaas.ConsumedVAAs);
  loader.register(cursor.Cursor);
  loader.register(emitter.EmitterCreated);
  loader.register(emitter.EmitterCap);
  loader.register(externalAddress.ExternalAddress);
  loader.register(feeCollector.FeeCollector);
  loader.register(guardian.Guardian);
  loader.register(guardianSet.GuardianSet);
  loader.register(publishMessage.WormholeMessage);
  loader.register(publishMessage.MessageTicket);
  loader.register(set.Empty);
  loader.register(set.Set);
  loader.register(state.State);
  loader.register(vaa.VAA);
}
