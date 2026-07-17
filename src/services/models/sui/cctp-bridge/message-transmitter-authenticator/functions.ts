// @ts-nocheck
import { Transaction, TransactionArgument, TransactionResult } from "@mysten/sui/transactions";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";

export function new_(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("cctp-bridge", options?.env)}::message_transmitter_authenticator::new`,
    arguments: [],
  });
}
