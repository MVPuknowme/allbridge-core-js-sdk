// @ts-nocheck
import { StructClassLoader } from "../../_framework/loader";
import * as mintAllowance from "./mint-allowance/structs";
import * as treasury from "./treasury/structs";

export function registerClasses(loader: StructClassLoader): void {
  loader.register(mintAllowance.MintAllowance);
  loader.register(treasury.Treasury);
  loader.register(treasury.MintCap);
  loader.register(treasury.TreasuryCapKey);
  loader.register(treasury.Burn);
}
