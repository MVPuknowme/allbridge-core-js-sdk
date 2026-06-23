// @ts-nocheck
import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { String as String1 } from "../../_dependencies/std/ascii/structs";
import { String } from "../../_dependencies/std/string/structs";
import { ID } from "../../_dependencies/sui/object/structs";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";
import { obj, pure } from "../../_framework/util";

export function new_(
  tx: Transaction,
  data: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::bytes32::new`,
    arguments: [pure(tx, data, `vector<u8>`)],
  });
}

export function newFromPartial(
  tx: Transaction,
  partialData: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::bytes32::new_from_partial`,
    arguments: [pure(tx, partialData, `vector<u8>`)],
  });
}

export function empty(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::bytes32::empty`,
    arguments: [],
  });
}

export function data(tx: Transaction, bytes: TransactionObjectInput, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::bytes32::data`,
    arguments: [obj(tx, bytes)],
  });
}

export function fromHex(
  tx: Transaction,
  value: string | TransactionArgument,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::bytes32::from_hex`,
    arguments: [pure(tx, value, `${String.$typeName}`)],
  });
}

export function toHex(
  tx: Transaction,
  bytes: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::bytes32::to_hex`,
    arguments: [obj(tx, bytes)],
  });
}

export function fromAsciiHex(
  tx: Transaction,
  value: string | TransactionArgument,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::bytes32::from_ascii_hex`,
    arguments: [pure(tx, value, `${String1.$typeName}`)],
  });
}

export function toAsciiHex(
  tx: Transaction,
  bytes: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::bytes32::to_ascii_hex`,
    arguments: [obj(tx, bytes)],
  });
}

export function fromId(
  tx: Transaction,
  id: string | TransactionArgument,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::bytes32::from_id`,
    arguments: [pure(tx, id, `${ID.$typeName}`)],
  });
}

export function toId(tx: Transaction, bytes: TransactionObjectInput, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::bytes32::to_id`,
    arguments: [obj(tx, bytes)],
  });
}

export function fromAddress(
  tx: Transaction,
  a: string | TransactionArgument,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::bytes32::from_address`,
    arguments: [pure(tx, a, `address`)],
  });
}

export function toAddress(
  tx: Transaction,
  bytes: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::bytes32::to_address`,
    arguments: [obj(tx, bytes)],
  });
}

export function fromUid(tx: Transaction, id: TransactionObjectInput, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::bytes32::from_uid`,
    arguments: [obj(tx, id)],
  });
}

export function isZero(
  tx: Transaction,
  bytes: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("utils", options?.env)}::bytes32::is_zero`,
    arguments: [obj(tx, bytes)],
  });
}
