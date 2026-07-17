// @ts-nocheck
import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";
import { obj, pure } from "../../_framework/util";

export interface MigrateArgs {
  adminCap: TransactionObjectInput;
  gasOracle: TransactionObjectInput;
}

export function migrate(tx: Transaction, args: MigrateArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("gas-oracle", options?.env)}::gas_oracle_interface::migrate`,
    arguments: [obj(tx, args.adminCap), obj(tx, args.gasOracle)],
  });
}

export interface SetChainDataArgs {
  adminCap: TransactionObjectInput;
  oracle: TransactionObjectInput;
  chainId: number | TransactionArgument;
  gasPrice: bigint | TransactionArgument;
  price: bigint | TransactionArgument;
}

/** Data update (only with AdminCap) */
export function setChainData(
  tx: Transaction,
  args: SetChainDataArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("gas-oracle", options?.env)}::gas_oracle_interface::set_chain_data`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.oracle),
      pure(tx, args.chainId, `u8`),
      pure(tx, args.gasPrice, `u128`),
      pure(tx, args.price, `u128`),
    ],
  });
}

export interface SetGasPriceArgs {
  adminCap: TransactionObjectInput;
  oracle: TransactionObjectInput;
  chainId: number | TransactionArgument;
  gasPrice: bigint | TransactionArgument;
}

/** Sets only the gas price for a given chain ID. */
export function setGasPrice(tx: Transaction, args: SetGasPriceArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("gas-oracle", options?.env)}::gas_oracle_interface::set_gas_price`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.oracle),
      pure(tx, args.chainId, `u8`),
      pure(tx, args.gasPrice, `u128`),
    ],
  });
}

export interface SetPriceArgs {
  adminCap: TransactionObjectInput;
  oracle: TransactionObjectInput;
  chainId: number | TransactionArgument;
  price: bigint | TransactionArgument;
}

/** Sets only the price for a given chain ID. */
export function setPrice(tx: Transaction, args: SetPriceArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("gas-oracle", options?.env)}::gas_oracle_interface::set_price`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.oracle),
      pure(tx, args.chainId, `u8`),
      pure(tx, args.price, `u128`),
    ],
  });
}

/** Get the price of a given chain's native token in USD. */
export function chainDataPrice(
  tx: Transaction,
  chainData: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("gas-oracle", options?.env)}::gas_oracle_interface::chain_data_price`,
    arguments: [obj(tx, chainData)],
  });
}

export function chainDataGasPrice(
  tx: Transaction,
  chainData: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("gas-oracle", options?.env)}::gas_oracle_interface::chain_data_gas_price`,
    arguments: [obj(tx, chainData)],
  });
}

export interface PriceArgs {
  gasOracle: TransactionObjectInput;
  chainId: number | TransactionArgument;
}

export function price(tx: Transaction, args: PriceArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("gas-oracle", options?.env)}::gas_oracle_interface::price`,
    arguments: [obj(tx, args.gasOracle), pure(tx, args.chainId, `u8`)],
  });
}

export interface GasPriceArgs {
  gasOracle: TransactionObjectInput;
  chainId: number | TransactionArgument;
}

export function gasPrice(tx: Transaction, args: GasPriceArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("gas-oracle", options?.env)}::gas_oracle_interface::gas_price`,
    arguments: [obj(tx, args.gasOracle), pure(tx, args.chainId, `u8`)],
  });
}

export interface GetChainDataArgs {
  oracle: TransactionObjectInput;
  chainId: number | TransactionArgument;
}

/** Getting information by chainId */
export function getChainData(
  tx: Transaction,
  args: GetChainDataArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("gas-oracle", options?.env)}::gas_oracle_interface::get_chain_data`,
    arguments: [obj(tx, args.oracle), pure(tx, args.chainId, `u8`)],
  });
}

export interface GetTransactionGasCostInNativeTokenArgs {
  oracle: TransactionObjectInput;
  otherChainId: number | TransactionArgument;
  gasAmount: bigint | TransactionArgument;
}

/** Calculates the gas cost of a transaction on another chain in the current chain's native token. */
export function getTransactionGasCostInNativeToken(
  tx: Transaction,
  args: GetTransactionGasCostInNativeTokenArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt(
      "gas-oracle",
      options?.env
    )}::gas_oracle_interface::get_transaction_gas_cost_in_native_token`,
    arguments: [obj(tx, args.oracle), pure(tx, args.otherChainId, `u8`), pure(tx, args.gasAmount, `u64`)],
  });
}

export interface GetTransactionGasCostInStableArgs {
  oracle: TransactionObjectInput;
  otherChainId: number | TransactionArgument;
  gasAmount: bigint | TransactionArgument;
  stableTokenDecimals: number | TransactionArgument;
}

/** Calculates the gas cost of a transaction on another chain in USD. */
export function getTransactionGasCostInStable(
  tx: Transaction,
  args: GetTransactionGasCostInStableArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("gas-oracle", options?.env)}::gas_oracle_interface::get_transaction_gas_cost_in_stable`,
    arguments: [
      obj(tx, args.oracle),
      pure(tx, args.otherChainId, `u8`),
      pure(tx, args.gasAmount, `u64`),
      pure(tx, args.stableTokenDecimals, `u8`),
    ],
  });
}

export interface CrossRateArgs {
  oracle: TransactionObjectInput;
  otherChainId: number | TransactionArgument;
}

/** Get the cross-rate between the two chains' native tokens. */
export function crossRate(tx: Transaction, args: CrossRateArgs, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("gas-oracle", options?.env)}::gas_oracle_interface::cross_rate`,
    arguments: [obj(tx, args.oracle), pure(tx, args.otherChainId, `u8`)],
  });
}

export interface StableToSuiAmountArgs {
  gasOracle: TransactionObjectInput;
  amount: bigint | TransactionArgument;
  stableTokenDecimals: number | TransactionArgument;
}

export function stableToSuiAmount(
  tx: Transaction,
  args: StableToSuiAmountArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("gas-oracle", options?.env)}::gas_oracle_interface::stable_to_sui_amount`,
    arguments: [obj(tx, args.gasOracle), pure(tx, args.amount, `u64`), pure(tx, args.stableTokenDecimals, `u8`)],
  });
}
