// @ts-nocheck
import { StructClassLoader } from "../_framework/loader";
import * as gasOracle from "./gas-oracle/structs";

export function registerClasses(loader: StructClassLoader): void {
  loader.register(gasOracle.ChainData);
  loader.register(gasOracle.GasOracle);
  loader.register(gasOracle.AdminCap);
}
