// @ts-nocheck
import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";
import { obj, pure } from "../../_framework/util";

/** Contract initialization. */
export function init(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::init`,
    arguments: [],
  });
}

export interface MigrateArgs {
  admin: TransactionObjectInput;
  messenger: TransactionObjectInput;
}

export function migrate(tx: Transaction, args: MigrateArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::migrate`,
    arguments: [obj(tx, args.admin), obj(tx, args.messenger)],
  });
}

export interface SendMessageArgs {
  messenger: TransactionObjectInput;
  gasOracle: TransactionObjectInput;
  coin: TransactionObjectInput;
  message: TransactionObjectInput;
  sender: TransactionObjectInput;
}

export function sendMessage(tx: Transaction, args: SendMessageArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::send_message`,
    arguments: [
      obj(tx, args.messenger),
      obj(tx, args.gasOracle),
      obj(tx, args.coin),
      obj(tx, args.message),
      obj(tx, args.sender),
    ],
  });
}

export interface ReceiveMessageArgs {
  messenger: TransactionObjectInput;
  message: TransactionObjectInput;
  signaturePrimary: Array<number | TransactionArgument> | TransactionArgument;
  signatureSecondary: Array<number | TransactionArgument> | TransactionArgument;
}

export function receiveMessage(
  tx: Transaction,
  args: ReceiveMessageArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::receive_message`,
    arguments: [
      obj(tx, args.messenger),
      obj(tx, args.message),
      pure(tx, args.signaturePrimary, `vector<u8>`),
      pure(tx, args.signatureSecondary, `vector<u8>`),
    ],
  });
}

export function getId(
  tx: Transaction,
  messenger: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::get_id`,
    arguments: [obj(tx, messenger)],
  });
}

export interface SetOtherChainsArgs {
  messenger: TransactionObjectInput;
  otherChainIds: Array<boolean | TransactionArgument> | TransactionArgument;
}

export function setOtherChains(
  tx: Transaction,
  args: SetOtherChainsArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::set_other_chains`,
    arguments: [obj(tx, args.messenger), pure(tx, args.otherChainIds, `vector<bool>`)],
  });
}

export interface SetPrimaryValidatorArgs {
  messenger: TransactionObjectInput;
  primaryValidator: Array<number | TransactionArgument> | TransactionArgument;
}

export function setPrimaryValidator(
  tx: Transaction,
  args: SetPrimaryValidatorArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::set_primary_validator`,
    arguments: [obj(tx, args.messenger), pure(tx, args.primaryValidator, `vector<u8>`)],
  });
}

export interface AddSecondaryValidatorArgs {
  messenger: TransactionObjectInput;
  secondaryValidator: Array<number | TransactionArgument> | TransactionArgument;
}

export function addSecondaryValidator(
  tx: Transaction,
  args: AddSecondaryValidatorArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::add_secondary_validator`,
    arguments: [obj(tx, args.messenger), pure(tx, args.secondaryValidator, `vector<u8>`)],
  });
}

export interface RemoveSecondaryValidatorArgs {
  messenger: TransactionObjectInput;
  secondaryValidator: Array<number | TransactionArgument> | TransactionArgument;
}

export function removeSecondaryValidator(
  tx: Transaction,
  args: RemoveSecondaryValidatorArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::remove_secondary_validator`,
    arguments: [obj(tx, args.messenger), pure(tx, args.secondaryValidator, `vector<u8>`)],
  });
}

export interface WithdrawFeeArgs {
  messenger: TransactionObjectInput;
  amount: bigint | TransactionArgument;
}

export function withdrawFee(tx: Transaction, args: WithdrawFeeArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::withdraw_fee`,
    arguments: [obj(tx, args.messenger), pure(tx, args.amount, `u64`)],
  });
}

export interface SetGasUsageArgs {
  messenger: TransactionObjectInput;
  chainId: number | TransactionArgument;
  gasAmount: bigint | TransactionArgument;
}

export function setGasUsage(tx: Transaction, args: SetGasUsageArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::set_gas_usage`,
    arguments: [obj(tx, args.messenger), pure(tx, args.chainId, `u8`), pure(tx, args.gasAmount, `u64`)],
  });
}

export function getVersion(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::get_version`,
    arguments: [],
  });
}

export interface GetTransactionCostArgs {
  messenger: TransactionObjectInput;
  gasOracle: TransactionObjectInput;
  chainId: number | TransactionArgument;
}

export function getTransactionCost(
  tx: Transaction,
  args: GetTransactionCostArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::get_transaction_cost`,
    arguments: [obj(tx, args.messenger), obj(tx, args.gasOracle), pure(tx, args.chainId, `u8`)],
  });
}

export function getSentMessages(
  tx: Transaction,
  messenger: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::get_sent_messages`,
    arguments: [obj(tx, messenger)],
  });
}

export function getReceivedMessages(
  tx: Transaction,
  messenger: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::get_received_messages`,
    arguments: [obj(tx, messenger)],
  });
}

export function gasBalanceValue(
  tx: Transaction,
  messenger: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::gas_balance_value`,
    arguments: [obj(tx, messenger)],
  });
}

export function getGasUsage(
  tx: Transaction,
  messenger: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::get_gas_usage`,
    arguments: [obj(tx, messenger)],
  });
}

export function getOtherChainIds(
  tx: Transaction,
  messenger: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger::get_other_chain_ids`,
    arguments: [obj(tx, messenger)],
  });
}
