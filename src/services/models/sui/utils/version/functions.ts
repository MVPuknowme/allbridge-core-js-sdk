// @ts-nocheck
import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";
import { generic, GenericArg, obj, pure } from "../../_framework/util";

export interface AssertVersionArgs {
  id: TransactionObjectInput;
  version: bigint | TransactionArgument;
}

export function assertVersion(
  tx: Transaction,
  typeArg: string,
  args: AssertVersionArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::version::assert_version`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.id), pure(tx, args.version, `u64`)],
  });
}

export interface InitVersionArgs {
  cap: GenericArg;
  id: TransactionObjectInput;
  version: bigint | TransactionArgument;
}

export function initVersion(
  tx: Transaction,
  typeArg: string,
  args: InitVersionArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::version::init_version`,
    typeArguments: [typeArg],
    arguments: [generic(tx, `${typeArg}`, args.cap), obj(tx, args.id), pure(tx, args.version, `u64`)],
  });
}

export interface MigrateVersionArgs {
  cap: GenericArg;
  id: TransactionObjectInput;
  newVersion: bigint | TransactionArgument;
}

export function migrateVersion(
  tx: Transaction,
  typeArg: string,
  args: MigrateVersionArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::version::migrate_version`,
    typeArguments: [typeArg],
    arguments: [generic(tx, `${typeArg}`, args.cap), obj(tx, args.id), pure(tx, args.newVersion, `u64`)],
  });
}
