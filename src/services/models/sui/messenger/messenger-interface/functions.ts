// @ts-nocheck
import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";
import { obj, pure } from "../../_framework/util";

export interface SendMessageArgs {
  messenger: TransactionObjectInput;
  gasOracle: TransactionObjectInput;
  coin: TransactionObjectInput;
  message: TransactionObjectInput;
  sender: TransactionObjectInput;
}

export function sendMessage(tx: Transaction, args: SendMessageArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::send_message`,
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

/**
 * @param msg: The message that the signature is signed against, this is raw message without hashing.
 * @param signature: A 65-bytes signature in form (r, s, v) that is signed using (v is 0 or 1)
 */
export function receiveMessage(
  tx: Transaction,
  args: ReceiveMessageArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::receive_message`,
    arguments: [
      obj(tx, args.messenger),
      obj(tx, args.message),
      pure(tx, args.signaturePrimary, `vector<u8>`),
      pure(tx, args.signatureSecondary, `vector<u8>`),
    ],
  });
}

export interface MigrateArgs {
  admin: TransactionObjectInput;
  messenger: TransactionObjectInput;
}

export function migrate(tx: Transaction, args: MigrateArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::migrate`,
    arguments: [obj(tx, args.admin), obj(tx, args.messenger)],
  });
}

export interface SetOtherChainsArgs {
  adminCap: TransactionObjectInput;
  messenger: TransactionObjectInput;
  otherChainIds: Array<boolean | TransactionArgument> | TransactionArgument;
}

export function setOtherChains(
  tx: Transaction,
  args: SetOtherChainsArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::set_other_chains`,
    arguments: [obj(tx, args.adminCap), obj(tx, args.messenger), pure(tx, args.otherChainIds, `vector<bool>`)],
  });
}

export interface SetPrimaryValidatorArgs {
  adminCap: TransactionObjectInput;
  messenger: TransactionObjectInput;
  primaryValidator: Array<number | TransactionArgument> | TransactionArgument;
}

export function setPrimaryValidator(
  tx: Transaction,
  args: SetPrimaryValidatorArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::set_primary_validator`,
    arguments: [obj(tx, args.adminCap), obj(tx, args.messenger), pure(tx, args.primaryValidator, `vector<u8>`)],
  });
}

export interface AddSecondaryValidatorArgs {
  adminCap: TransactionObjectInput;
  messenger: TransactionObjectInput;
  secondaryValidator: Array<number | TransactionArgument> | TransactionArgument;
}

export function addSecondaryValidator(
  tx: Transaction,
  args: AddSecondaryValidatorArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::add_secondary_validator`,
    arguments: [obj(tx, args.adminCap), obj(tx, args.messenger), pure(tx, args.secondaryValidator, `vector<u8>`)],
  });
}

export interface RemoveSecondaryValidatorArgs {
  adminCap: TransactionObjectInput;
  messenger: TransactionObjectInput;
  secondaryValidator: Array<number | TransactionArgument> | TransactionArgument;
}

export function removeSecondaryValidator(
  tx: Transaction,
  args: RemoveSecondaryValidatorArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::remove_secondary_validator`,
    arguments: [obj(tx, args.adminCap), obj(tx, args.messenger), pure(tx, args.secondaryValidator, `vector<u8>`)],
  });
}

export interface WithdrawFeeArgs {
  adminCap: TransactionObjectInput;
  messenger: TransactionObjectInput;
  amount: bigint | TransactionArgument;
}

export function withdrawFee(tx: Transaction, args: WithdrawFeeArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::withdraw_fee`,
    arguments: [obj(tx, args.adminCap), obj(tx, args.messenger), pure(tx, args.amount, `u64`)],
  });
}

export interface SetGasUsageArgs {
  adminCap: TransactionObjectInput;
  messenger: TransactionObjectInput;
  chainId: number | TransactionArgument;
  gasAmount: bigint | TransactionArgument;
}

export function setGasUsage(tx: Transaction, args: SetGasUsageArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::set_gas_usage`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.messenger),
      pure(tx, args.chainId, `u8`),
      pure(tx, args.gasAmount, `u64`),
    ],
  });
}

export interface HasReceivedMessageArgs {
  messenger: TransactionObjectInput;
  message: TransactionObjectInput;
}

export function hasReceivedMessage(
  tx: Transaction,
  args: HasReceivedMessageArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::has_received_message`,
    arguments: [obj(tx, args.messenger), obj(tx, args.message)],
  });
}

export interface HasSentMessagesArgs {
  messenger: TransactionObjectInput;
  message: TransactionObjectInput;
}

export function hasSentMessages(
  tx: Transaction,
  args: HasSentMessagesArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::has_sent_messages`,
    arguments: [obj(tx, args.messenger), obj(tx, args.message)],
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
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::get_transaction_cost`,
    arguments: [obj(tx, args.messenger), obj(tx, args.gasOracle), pure(tx, args.chainId, `u8`)],
  });
}

export function gasBalanceValue(
  tx: Transaction,
  messenger: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::gas_balance_value`,
    arguments: [obj(tx, messenger)],
  });
}

export interface GetGasUsageArgs {
  messenger: TransactionObjectInput;
  chainId: number | TransactionArgument;
}

export function getGasUsage(tx: Transaction, args: GetGasUsageArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::get_gas_usage`,
    arguments: [obj(tx, args.messenger), pure(tx, args.chainId, `u8`)],
  });
}

export function getOtherChainIds(
  tx: Transaction,
  messenger: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("messenger", options?.env)}::messenger_interface::get_other_chain_ids`,
    arguments: [obj(tx, messenger)],
  });
}
