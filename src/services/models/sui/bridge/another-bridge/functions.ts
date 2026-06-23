// @ts-nocheck
import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";
import { obj, pure } from "../../_framework/util";

export function new_(
  tx: Transaction,
  address: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::another_bridge::new`,
    arguments: [obj(tx, address)],
  });
}

export interface SetAddressArgs {
  anotherBridge: TransactionObjectInput;
  address: TransactionObjectInput;
}

export function setAddress(tx: Transaction, args: SetAddressArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::another_bridge::set_address`,
    arguments: [obj(tx, args.anotherBridge), obj(tx, args.address)],
  });
}

export interface AddTokenArgs {
  anotherBridge: TransactionObjectInput;
  address: TransactionObjectInput;
}

export function addToken(tx: Transaction, args: AddTokenArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::another_bridge::add_token`,
    arguments: [obj(tx, args.anotherBridge), obj(tx, args.address)],
  });
}

export interface RemoveTokenArgs {
  anotherBridge: TransactionObjectInput;
  address: TransactionObjectInput;
}

export function removeToken(tx: Transaction, args: RemoveTokenArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::another_bridge::remove_token`,
    arguments: [obj(tx, args.anotherBridge), obj(tx, args.address)],
  });
}

export interface HasTokenArgs {
  anotherBridge: TransactionObjectInput;
  address: TransactionObjectInput;
}

export function hasToken(tx: Transaction, args: HasTokenArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::another_bridge::has_token`,
    arguments: [obj(tx, args.anotherBridge), obj(tx, args.address)],
  });
}

export interface SetGasUsageArgs {
  anotherBridge: TransactionObjectInput;
  gasUsage: bigint | TransactionArgument;
}

export function setGasUsage(tx: Transaction, args: SetGasUsageArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::another_bridge::set_gas_usage`,
    arguments: [obj(tx, args.anotherBridge), pure(tx, args.gasUsage, `u64`)],
  });
}

export function bridgeAddress(
  tx: Transaction,
  anotherBridge: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::another_bridge::bridge_address`,
    arguments: [obj(tx, anotherBridge)],
  });
}

export function gasUsage(
  tx: Transaction,
  anotherBridge: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::another_bridge::gas_usage`,
    arguments: [obj(tx, anotherBridge)],
  });
}

export function destroyEmpty(
  tx: Transaction,
  userDeposit: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::another_bridge::destroy_empty`,
    arguments: [obj(tx, userDeposit)],
  });
}
