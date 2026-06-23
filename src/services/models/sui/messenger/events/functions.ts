// @ts-nocheck
import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";
import { obj } from "../../_framework/util";

export function messageSentEvent(
  tx: Transaction,
  message: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::events::message_sent_event`,
    arguments: [obj(tx, message)],
  });
}

export function messageReceivedEvent(
  tx: Transaction,
  message: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::events::message_received_event`,
    arguments: [obj(tx, message)],
  });
}
