// @ts-nocheck
import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";
import { obj, pure } from "../../_framework/util";

export interface MessageSentEventArgs {
  message: TransactionObjectInput;
  sequence: bigint | TransactionArgument;
}

export function messageSentEvent(
  tx: Transaction,
  args: MessageSentEventArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("wormhole-messenger", options?.env)}::events::message_sent_event`,
    arguments: [obj(tx, args.message), pure(tx, args.sequence, `u64`)],
  });
}

export interface MessageReceivedEventArgs {
  message: TransactionObjectInput;
  sequence: bigint | TransactionArgument;
}

export function messageReceivedEvent(
  tx: Transaction,
  args: MessageReceivedEventArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("wormhole-messenger", options?.env)}::events::message_received_event`,
    arguments: [obj(tx, args.message), pure(tx, args.sequence, `u64`)],
  });
}
