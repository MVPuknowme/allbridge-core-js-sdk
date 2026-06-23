// @ts-nocheck
import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { ID } from "../../_dependencies/sui/object/structs";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";
import { obj, pure } from "../../_framework/util";

export function new_(
  tx: Transaction,
  message: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::message::new`,
    arguments: [obj(tx, message)],
  });
}

export function fromBytes(
  tx: Transaction,
  message: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::message::from_bytes`,
    arguments: [pure(tx, message, `vector<u8>`)],
  });
}

export interface FromArgsArgs {
  amount: bigint | TransactionArgument;
  recipient: TransactionObjectInput;
  sourceChainId: number | TransactionArgument;
  destinationChainId: number | TransactionArgument;
  receiveToken: TransactionObjectInput;
  nonce: bigint | TransactionArgument;
  messenger: TransactionObjectInput;
}

export function fromArgs(tx: Transaction, args: FromArgsArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::message::from_args`,
    arguments: [
      pure(tx, args.amount, `u64`),
      obj(tx, args.recipient),
      pure(tx, args.sourceChainId, `u8`),
      pure(tx, args.destinationChainId, `u8`),
      obj(tx, args.receiveToken),
      pure(tx, args.nonce, `u256`),
      obj(tx, args.messenger),
    ],
  });
}

export interface AddSenderArgs {
  message: TransactionObjectInput;
  sender: string | TransactionArgument;
}

export function addSender(tx: Transaction, args: AddSenderArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::message::add_sender`,
    arguments: [obj(tx, args.message), pure(tx, args.sender, `${ID.$typeName}`)],
  });
}

export interface FromArgsWithSenderArgs {
  amount: bigint | TransactionArgument;
  recipient: TransactionObjectInput;
  sourceChainId: number | TransactionArgument;
  destinationChainId: number | TransactionArgument;
  receiveToken: TransactionObjectInput;
  nonce: bigint | TransactionArgument;
  messenger: TransactionObjectInput;
  sender: string | TransactionArgument;
}

export function fromArgsWithSender(
  tx: Transaction,
  args: FromArgsWithSenderArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::message::from_args_with_sender`,
    arguments: [
      pure(tx, args.amount, `u64`),
      obj(tx, args.recipient),
      pure(tx, args.sourceChainId, `u8`),
      pure(tx, args.destinationChainId, `u8`),
      obj(tx, args.receiveToken),
      pure(tx, args.nonce, `u256`),
      obj(tx, args.messenger),
      pure(tx, args.sender, `${ID.$typeName}`),
    ],
  });
}

export function data(
  tx: Transaction,
  message: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::message::data`,
    arguments: [obj(tx, message)],
  });
}

export function toHex(
  tx: Transaction,
  message: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::message::to_hex`,
    arguments: [obj(tx, message)],
  });
}

export function chainFrom(
  tx: Transaction,
  message: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::message::chain_from`,
    arguments: [obj(tx, message)],
  });
}

export function chainTo(
  tx: Transaction,
  message: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::message::chain_to`,
    arguments: [obj(tx, message)],
  });
}
