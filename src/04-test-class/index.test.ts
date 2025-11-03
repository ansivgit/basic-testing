import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  let bankAccount: BankAccount;
  const initialBalance = 600;

  beforeEach((): void => {
    bankAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount.withdraw(initialBalance + 1);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const newAccount = getBankAccount(200);
    expect(() => {
      bankAccount.transfer(initialBalance + 1, newAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount.transfer(100, bankAccount);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const deposit = 100;
    const newAccount = bankAccount.deposit(deposit);

    expect(newAccount).toBeInstanceOf(BankAccount);
    expect(newAccount.getBalance()).toBe(initialBalance + deposit);
  });

  test('should withdraw money', () => {
    const withdraw = 100;
    const newAccount = bankAccount.withdraw(withdraw);

    expect(newAccount).toBeInstanceOf(BankAccount);
    expect(newAccount.getBalance()).toBe(initialBalance - withdraw);
  });

  test('should transfer money', () => {
    const transfer = 100;
    const newBalance = 200;
    const newAccount = getBankAccount(newBalance);

    expect(newAccount).toBeInstanceOf(BankAccount);

    bankAccount.transfer(transfer, newAccount);
    expect(bankAccount.getBalance()).toBe(initialBalance - transfer);
    expect(newAccount.getBalance()).toBe(newBalance + transfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    bankAccount.fetchBalance = jest.fn().mockImplementationOnce(() => 100);
    expect(await bankAccount.fetchBalance()).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const oldBalance = bankAccount.getBalance();
    bankAccount.fetchBalance = jest.fn().mockImplementationOnce(() => 100);
    await bankAccount.synchronizeBalance();

    expect(bankAccount.fetchBalance).toBeCalledTimes(1);
    expect(bankAccount.getBalance()).not.toBe(oldBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    bankAccount.fetchBalance = jest.fn().mockImplementationOnce(() => null);

    return expect(async () => {
      await bankAccount.synchronizeBalance();
    }).rejects.toThrow(SynchronizationFailedError);
  });
});
