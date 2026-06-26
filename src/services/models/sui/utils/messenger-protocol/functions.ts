// @ts-nocheck
import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";
import { obj } from "../../_framework/util";

export function allbridge(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::messenger_protocol::allbridge`,
    arguments: [],
  });
}

export function wormhole(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::messenger_protocol::wormhole`,
    arguments: [],
  });
}

export function id(
  tx: Transaction,
  messengerProtocol: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::messenger_protocol::id`,
    arguments: [obj(tx, messengerProtocol)],
  });
}
