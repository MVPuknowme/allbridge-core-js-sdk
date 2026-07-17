// @ts-nocheck
import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import type { EnvConfig } from "../../_envs";
import { getPublishedAt } from "../../_envs";
import { obj, pure } from "../../_framework/util";

export function init(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::init`,
    arguments: [],
  });
}

export interface DepositArgs {
  pool: TransactionObjectInput;
  userDeposit: TransactionObjectInput;
  coin: TransactionObjectInput;
}

export function deposit(
  tx: Transaction,
  typeArg: string,
  args: DepositArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::deposit`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.pool), obj(tx, args.userDeposit), obj(tx, args.coin)],
  });
}

export interface WithdrawArgs {
  pool: TransactionObjectInput;
  userDeposit: TransactionObjectInput;
  amountLp: bigint | TransactionArgument;
}

export function withdraw(
  tx: Transaction,
  typeArg: string,
  args: WithdrawArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::withdraw`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.pool), obj(tx, args.userDeposit), pure(tx, args.amountLp, `u64`)],
  });
}

export interface ClaimRewardArgs {
  pool: TransactionObjectInput;
  userDeposit: TransactionObjectInput;
}

export function claimReward(
  tx: Transaction,
  typeArg: string,
  args: ClaimRewardArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::claim_reward`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.pool), obj(tx, args.userDeposit)],
  });
}

export function state(
  tx: Transaction,
  typeArg: string,
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::state`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pool)],
  });
}

export function rewards(
  tx: Transaction,
  typeArg: string,
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::rewards`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pool)],
  });
}

export interface SwapToVusdArgs {
  pool: TransactionObjectInput;
  coin: TransactionObjectInput;
  zeroFee: boolean | TransactionArgument;
}

export function swapToVusd(
  tx: Transaction,
  typeArg: string,
  args: SwapToVusdArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::swap_to_vusd`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.pool), obj(tx, args.coin), pure(tx, args.zeroFee, `bool`)],
  });
}

export interface SwapFromVusdArgs {
  pool: TransactionObjectInput;
  vusdAmount: bigint | TransactionArgument;
  receiveAmountMin: bigint | TransactionArgument;
  zeroFee: boolean | TransactionArgument;
}

export function swapFromVusd(
  tx: Transaction,
  typeArg: string,
  args: SwapFromVusdArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::swap_from_vusd`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.vusdAmount, `u64`),
      pure(tx, args.receiveAmountMin, `u64`),
      pure(tx, args.zeroFee, `bool`),
    ],
  });
}

export interface GetFeeArgs {
  pool: TransactionObjectInput;
  coin: TransactionObjectInput;
  zeroFee: boolean | TransactionArgument;
}

export function getFee(
  tx: Transaction,
  typeArg: string,
  args: GetFeeArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::get_fee`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.pool), obj(tx, args.coin), pure(tx, args.zeroFee, `bool`)],
  });
}

export interface NewArgs {
  coinMetadata: TransactionObjectInput;
  a: bigint | TransactionArgument;
  feeShareBp: bigint | TransactionArgument;
}

export function new_(
  tx: Transaction,
  typeArg: string,
  args: NewArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::new`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.coinMetadata), pure(tx, args.a, `u64`), pure(tx, args.feeShareBp, `u64`)],
  });
}

export interface SetFeeShareArgs {
  pool: TransactionObjectInput;
  feeShareBp: bigint | TransactionArgument;
}

export function setFeeShare(
  tx: Transaction,
  typeArg: string,
  args: SetFeeShareArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::set_fee_share`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.pool), pure(tx, args.feeShareBp, `u64`)],
  });
}

export interface SetBalanceRatioMinBpArgs {
  pool: TransactionObjectInput;
  balanceRatioMinBp: bigint | TransactionArgument;
}

export function setBalanceRatioMinBp(
  tx: Transaction,
  typeArg: string,
  args: SetBalanceRatioMinBpArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::set_balance_ratio_min_bp`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.pool), pure(tx, args.balanceRatioMinBp, `u64`)],
  });
}

export interface SetAdminFeeShareBpArgs {
  pool: TransactionObjectInput;
  adminFeeShareBp: bigint | TransactionArgument;
}

export function setAdminFeeShareBp(
  tx: Transaction,
  typeArg: string,
  args: SetAdminFeeShareBpArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::set_admin_fee_share_bp`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.pool), pure(tx, args.adminFeeShareBp, `u64`)],
  });
}

export function claimAdminFee(
  tx: Transaction,
  typeArg: string,
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::claim_admin_fee`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pool)],
  });
}

export function stopDeposit(
  tx: Transaction,
  typeArg: string,
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::stop_deposit`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pool)],
  });
}

export function startDeposit(
  tx: Transaction,
  typeArg: string,
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::start_deposit`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pool)],
  });
}

export function stopWithdraw(
  tx: Transaction,
  typeArg: string,
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::stop_withdraw`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pool)],
  });
}

export function startWithdraw(
  tx: Transaction,
  typeArg: string,
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::start_withdraw`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pool)],
  });
}

export interface ToSystemPrecisionArgs {
  pool: TransactionObjectInput;
  amount: bigint | TransactionArgument;
}

export function toSystemPrecision(
  tx: Transaction,
  typeArg: string,
  args: ToSystemPrecisionArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::to_system_precision`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.pool), pure(tx, args.amount, `u64`)],
  });
}

export interface FromSystemPrecisionArgs {
  pool: TransactionObjectInput;
  amount: bigint | TransactionArgument;
}

export function fromSystemPrecision(
  tx: Transaction,
  typeArg: string,
  args: FromSystemPrecisionArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::from_system_precision`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.pool), pure(tx, args.amount, `u64`)],
  });
}

export function balance(
  tx: Transaction,
  typeArg: string,
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::balance`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pool)],
  });
}

export function decimals(
  tx: Transaction,
  typeArg: string,
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::decimals`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pool)],
  });
}

export function feeShare(
  tx: Transaction,
  typeArg: string,
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::fee_share`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pool)],
  });
}

export function canWithdraw(
  tx: Transaction,
  typeArg: string,
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::can_withdraw`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pool)],
  });
}

export function canDeposit(
  tx: Transaction,
  typeArg: string,
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::can_deposit`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pool)],
  });
}

export interface AdjustTotalLpAmountArgs {
  pool: TransactionObjectInput;
  userDeposit: TransactionObjectInput;
}

export function adjustTotalLpAmount(
  tx: Transaction,
  typeArg: string,
  args: AdjustTotalLpAmountArgs,
  options?: { env?: EnvConfig }
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt("bridge", options?.env)}::pool::adjust_total_lp_amount`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.pool), obj(tx, args.userDeposit)],
  });
}
