// @ts-nocheck
import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";
import { obj, pure } from "../../_framework/util";

export interface SwappedToVusdEventArgs {
  amount: bigint | TransactionArgument;
  vusdAmount: bigint | TransactionArgument;
  fee: bigint | TransactionArgument;
}

export function swappedToVusdEvent(
  tx: Transaction,
  typeArg: string,
  args: SwappedToVusdEventArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::events::swapped_to_vusd_event`,
    typeArguments: [typeArg],
    arguments: [pure(tx, args.amount, `u64`), pure(tx, args.vusdAmount, `u64`), pure(tx, args.fee, `u64`)],
  });
}

export interface SwappedFromVusdEventArgs {
  amount: bigint | TransactionArgument;
  vusdAmount: bigint | TransactionArgument;
  fee: bigint | TransactionArgument;
}

export function swappedFromVusdEvent(
  tx: Transaction,
  typeArg: string,
  args: SwappedFromVusdEventArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::events::swapped_from_vusd_event`,
    typeArguments: [typeArg],
    arguments: [pure(tx, args.amount, `u64`), pure(tx, args.vusdAmount, `u64`), pure(tx, args.fee, `u64`)],
  });
}

export interface TokensSentEventArgs {
  vusdAmount: bigint | TransactionArgument;
  sender: string | TransactionArgument;
  recipient: TransactionObjectInput;
  destinationChainId: number | TransactionArgument;
  receiveToken: TransactionObjectInput;
  nonce: bigint | TransactionArgument;
  messenger: TransactionObjectInput;
}

export function tokensSentEvent(
  tx: Transaction,
  typeArg: string,
  args: TokensSentEventArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::events::tokens_sent_event`,
    typeArguments: [typeArg],
    arguments: [
      pure(tx, args.vusdAmount, `u64`),
      pure(tx, args.sender, `address`),
      obj(tx, args.recipient),
      pure(tx, args.destinationChainId, `u8`),
      obj(tx, args.receiveToken),
      pure(tx, args.nonce, `u256`),
      obj(tx, args.messenger),
    ],
  });
}

export interface TokensReceivedEventArgs {
  amount: bigint | TransactionArgument;
  extraGasAmount: bigint | TransactionArgument;
  recipient: string | TransactionArgument;
  nonce: bigint | TransactionArgument;
  messenger: TransactionObjectInput;
  message: TransactionObjectInput;
}

export function tokensReceivedEvent(
  tx: Transaction,
  typeArg: string,
  args: TokensReceivedEventArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::events::tokens_received_event`,
    typeArguments: [typeArg],
    arguments: [
      pure(tx, args.amount, `u64`),
      pure(tx, args.extraGasAmount, `u64`),
      pure(tx, args.recipient, `address`),
      pure(tx, args.nonce, `u256`),
      obj(tx, args.messenger),
      obj(tx, args.message),
    ],
  });
}

export interface ReceiveFeeEventArgs {
  userPaySui: bigint | TransactionArgument;
  userPayStable: bigint | TransactionArgument;
  totalPaySui: bigint | TransactionArgument;
  bridgeFeeSui: bigint | TransactionArgument;
  messengerFeeSui: bigint | TransactionArgument;
  totalFeeSui: bigint | TransactionArgument;
}

export function receiveFeeEvent(
  tx: Transaction,
  args: ReceiveFeeEventArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::events::receive_fee_event`,
    arguments: [
      pure(tx, args.userPaySui, `u64`),
      pure(tx, args.userPayStable, `u64`),
      pure(tx, args.totalPaySui, `u64`),
      pure(tx, args.bridgeFeeSui, `u64`),
      pure(tx, args.messengerFeeSui, `u64`),
      pure(tx, args.totalFeeSui, `u64`),
    ],
  });
}

export interface SwappedEventArgs {
  sentAmount: bigint | TransactionArgument;
  receivedAmount: bigint | TransactionArgument;
  sender: string | TransactionArgument;
}

export function swappedEvent(
  tx: Transaction,
  typeArgs: [string, string],
  args: SwappedEventArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::events::swapped_event`,
    typeArguments: typeArgs,
    arguments: [
      pure(tx, args.sentAmount, `u64`),
      pure(tx, args.receivedAmount, `u64`),
      pure(tx, args.sender, `address`),
    ],
  });
}

export interface DepositEventArgs {
  amount: bigint | TransactionArgument;
  lpAmount: bigint | TransactionArgument;
}

export function depositEvent(
  tx: Transaction,
  typeArg: string,
  args: DepositEventArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::events::deposit_event`,
    typeArguments: [typeArg],
    arguments: [pure(tx, args.amount, `u64`), pure(tx, args.lpAmount, `u64`)],
  });
}

export interface WithdrawEventArgs {
  amount: bigint | TransactionArgument;
  lpAmount: bigint | TransactionArgument;
}

export function withdrawEvent(
  tx: Transaction,
  typeArg: string,
  args: WithdrawEventArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::events::withdraw_event`,
    typeArguments: [typeArg],
    arguments: [pure(tx, args.amount, `u64`), pure(tx, args.lpAmount, `u64`)],
  });
}

export function rewardsClaimedEvent(
  tx: Transaction,
  typeArg: string,
  amount: bigint | TransactionArgument,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::events::rewards_claimed_event`,
    typeArguments: [typeArg],
    arguments: [pure(tx, amount, `u64`)],
  });
}
