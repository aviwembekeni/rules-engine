import Rules from './Rules';

describe('Test rules', (): void => {

  it('return the appropritse messsage when account value surpasses threshold (with library)', (): void => {
    const rules = new Rules();
    const results = rules.accountSurpassedThresholdLib({name: "acc1", value: 200}, 200);
    expect(results).resolves.toBe('Threshold reached!');
  });

  it('return the appropritse messsage when account value hasnt surpassed threshold (with library)', (): void => {
    const rules = new Rules();
    const results = rules.accountSurpassedThresholdLib({ name: 'acc1', value: 199 }, 200);
    expect(results).resolves.toBe('Threshold not reached');
  });

  it('return the appropritse messsage when account value surpasses threshold (without library)', (): void => {
    const rules = new Rules();
    const results = rules.accountSurpassedThreshold({ name: 'acc1', value: 201 }, 200);
    expect(results).resolves.toBe('Threshold reached!');
  });

  it('return the appropritse messsage when account value hasnt surpassed threshold (without library)', (): void => {
    const rules = new Rules();
    const results = rules.accountSurpassedThreshold({ name: 'acc1', value: 199 }, 200);
    expect(results).resolves.toBe('Threshold not reached');
  });

  it('return the appropritse messsage when asset price surpasses threshold (with library)', (): void => {
    const rules = new Rules();
    const results = rules.assetSurpassedThresholdLib({ name: 'asset', price: 200 }, 199);
    expect(results).resolves.toBe('Threshold reached!');
  });

  it('return the appropritse messsage when asset price hasnt surpassed threshold (with library)', (): void => {
    const rules = new Rules();
    const results = rules.assetSurpassedThresholdLib({ name: 'asset', price: 199 }, 200);
    expect(results).resolves.toBe('Threshold not reached');
  });

  it('return the appropritse messsage when asset price surpasses threshold (without library)', (): void => {
    const rules = new Rules();
    const results = rules.assetSurpassedThreshold({ name: 'asset', price: 200 }, 199);
    expect(results).resolves.toBe('Threshold reached!');
  });

  it('return the appropritse messsage when asset price hasnt surpassed threshold (without library)', (): void => {
    const rules = new Rules();
    const results = rules.assetSurpassedThreshold({ name: 'asset', price: 199 }, 200);
    expect(results).resolves.toBe('Threshold not reached');
  });

  it('return the appropritse messsage when account1 value surpasses account2 value', (): void => {
    const rules = new Rules();
    const results = rules.compareAccountsLib({ name: 'account1', value: 200 }, { name: 'account2', value: 188 });
    expect(results).resolves.toBe('account account1 is greater than account2');
  });

  it('return the appropritse messsage when account1 value surpasses account2 value (with library)', (): void => {
    const rules = new Rules();
    const results = rules.compareAccountsLib({ name: 'account1', value: 200 }, { name: 'account2', value: 188 });
    expect(results).resolves.toBe('account account1 is greater than account2');
  });

   it('return the appropritse messsage when account1 value is less than account2 value (with library)', (): void => {
     const rules = new Rules();
     const results = rules.compareAccountsLib({ name: 'account1', value: 177 }, { name: 'account2', value: 188 });
     expect(results).resolves.toBe('account account1 is less than account2');
   });

   it('return the appropritse messsage when account1 value surpasses account2 value (without library)', (): void => {
    const rules = new Rules();
    const results = rules.compareAccounts({ name: 'account1', value: 200 }, { name: 'account2', value: 188 });
    expect(results).resolves.toBe('account account1 is greater than account2');
  });

   it('return the appropritse messsage when account1 value is less than account2 value (without library)', (): void => {
     const rules = new Rules();
     const results = rules.compareAccounts({ name: 'account1', value: 177 }, { name: 'account2', value: 188 });
     expect(results).resolves.toBe('account account1 is less than account2');
   });

   it('return the appropritse messsage when account percentage is greater than portfolio percentage value (without library)', (): void => {
     const rules = new Rules();
     const results = rules.accountSurpassedPortPerc('701cf7d0-c74c-11ea-9630-03995659219b', 'f7dba960-c11a-11ea-883c-d912cc75c7e9', 0.9);
     expect(results).resolves.toBe("account Emergency Fund's percentage is greater than portfolio percentage [0.9]");
   });

   it('return the appropritse messsage when account percentage is less than portfolio percentage value (without library)', (): void => {
     const rules = new Rules();
     const results = rules.accountSurpassedPortPerc('701cf7d0-c74c-11ea-9630-03995659219b', 'f7dba960-c11a-11ea-883c-d912cc75c7e9', 20);
     expect(results).resolves.toBe("account Emergency Fund's percentage is smaller than portfolio percentage [20]");
   });

   it('return the appropritse messsage when account percentage is greater than portfolio percentage value (without library)', (): void => {
     const rules = new Rules();
     const results = rules.sumOfTagSurpassedPortPerc('stocks', 'f7dba960-c11a-11ea-883c-d912cc75c7e9', 0.9);
     expect(results).resolves.toBe("Tag stocks's percentage is greater than portfolio percentage [0.9]");
   });

   it('return the appropritse messsage when account percentage is less than portfolio percentage value (without library)', (): void => {
     const rules = new Rules();
     const results = rules.sumOfTagSurpassedPortPerc('stocks', 'f7dba960-c11a-11ea-883c-d912cc75c7e9', 99);
     expect(results).resolves.toBe("Tag stocks's percentage is smaller than portfolio percentage [99]");
   });
});
