// @ts-nocheck
import { setPackageAddress } from "../_framework/env";

export function setAddress(address: string, pkgV1?: string): void {
  setPackageAddress("cctp-bridge", address, pkgV1);
}
