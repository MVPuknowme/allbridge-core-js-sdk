// @ts-nocheck
import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";
import { generic, GenericArg, obj, pure } from "../../_framework/util";

export function new_(tx: Transaction, typeArg: string, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::fee_collector::new`,
    typeArguments: [typeArg],
    arguments: [],
  });
}

export interface AddFeeArgs {
  feeCollector: TransactionObjectInput;
  coin: TransactionObjectInput;
}

export function addFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddFeeArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::fee_collector::add_fee`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.feeCollector), obj(tx, args.coin)],
  });
}

export interface WithdrawArgs {
  cap: GenericArg;
  feeCollector: TransactionObjectInput;
  amount: bigint | TransactionArgument;
}

export function withdraw(
  tx: Transaction,
  typeArgs: [string, string],
  args: WithdrawArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::fee_collector::withdraw`,
    typeArguments: typeArgs,
    arguments: [generic(tx, `${typeArgs[1]}`, args.cap), obj(tx, args.feeCollector), pure(tx, args.amount, `u64`)],
  });
}

export function balance(
  tx: Transaction,
  typeArgs: [string, string],
  feeCollector: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::fee_collector::balance`,
    typeArguments: typeArgs,
    arguments: [obj(tx, feeCollector)],
  });
}

export function key(tx: Transaction, typeArg: string, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::fee_collector::key`,
    typeArguments: [typeArg],
    arguments: [],
  });
}
