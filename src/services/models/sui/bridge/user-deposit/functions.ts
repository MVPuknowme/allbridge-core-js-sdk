// @ts-nocheck
import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";
import { obj, pure } from "../../_framework/util";

export function new_(tx: Transaction, typeArg: string, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::user_deposit::new`,
    typeArguments: [typeArg],
    arguments: [],
  });
}

export function destroyEmpty(
  tx: Transaction,
  typeArg: string,
  userDeposit: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::user_deposit::destroy_empty`,
    typeArguments: [typeArg],
    arguments: [obj(tx, userDeposit)],
  });
}

export function lpAmount(
  tx: Transaction,
  typeArg: string,
  userDeposit: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::user_deposit::lp_amount`,
    typeArguments: [typeArg],
    arguments: [obj(tx, userDeposit)],
  });
}

export function rewardDebt(
  tx: Transaction,
  typeArg: string,
  userDeposit: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::user_deposit::reward_debt`,
    typeArguments: [typeArg],
    arguments: [obj(tx, userDeposit)],
  });
}

export interface AddArgs {
  userDeposit: TransactionObjectInput;
  lpAmount: bigint | TransactionArgument;
  accRewardPerShareP: bigint | TransactionArgument;
}

export function add(tx: Transaction, typeArg: string, args: AddArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::user_deposit::add`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.userDeposit), pure(tx, args.lpAmount, `u64`), pure(tx, args.accRewardPerShareP, `u128`)],
  });
}

export interface RemoveArgs {
  userDeposit: TransactionObjectInput;
  lpAmount: bigint | TransactionArgument;
  accRewardPerShareP: bigint | TransactionArgument;
}

export function remove(
  tx: Transaction,
  typeArg: string,
  args: RemoveArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::user_deposit::remove`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.userDeposit), pure(tx, args.lpAmount, `u64`), pure(tx, args.accRewardPerShareP, `u128`)],
  });
}

export interface UpdateRewardDebtArgs {
  userDeposit: TransactionObjectInput;
  accRewardPerShareP: bigint | TransactionArgument;
}

export function updateRewardDebt(
  tx: Transaction,
  typeArg: string,
  args: UpdateRewardDebtArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::user_deposit::update_reward_debt`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.userDeposit), pure(tx, args.accRewardPerShareP, `u128`)],
  });
}
