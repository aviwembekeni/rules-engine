import Rules from './Rules';

describe('Test rules', (): void => {

  it('return the appropritse messsage when account value surpasses threshold', (): void => {
    const rules = new Rules();
    const results = rules.accountSurpassedThreshold({name: "acc1", value: 200}, 200);
    expect(results).resolves.toBe('Threshold reached!');
  });

  it('return the appropritse messsage when account value hasnt surpassed threshold', (): void => {
    const rules = new Rules();
    const results = rules.accountSurpassedThreshold({ name: 'acc1', value: 199 }, 200);
    expect(results).resolves.toBe('Threshold not reached');
  });

  it('return the appropritse messsage when asset price surpasses threshold', (): void => {
    const rules = new Rules();
    const results = rules.assetSurpassedThreshold({ name: 'asset', price: 200 }, 199);
    expect(results).resolves.toBe('Threshold reached!');
  });

  it('return the appropritse messsage when asset price hasnt surpassed threshold', (): void => {
    const rules = new Rules();
    const results = rules.assetSurpassedThreshold({ name: 'asset', price: 199 }, 200);
    expect(results).resolves.toBe('Threshold not reached');
  });

  it('return the appropritse messsage when account1 value surpasses account2 value', (): void => {
    const rules = new Rules();
    const results = rules.compareAccounts({ name: 'account1', value: 200 }, { name: 'account2', value: 188 });
    expect(results).resolves.toBe('account account1 is greater than account2');
  });

  it('return the appropritse messsage when account1 value surpasses account2 value', (): void => {
    const rules = new Rules();
    const results = rules.compareAccounts({ name: 'account1', value: 200 }, { name: 'account2', value: 188 });
    expect(results).resolves.toBe('account account1 is greater than account2');
  });

   it('return the appropritse messsage when account1 value is less than account2 value', (): void => {
     const rules = new Rules();
     const results = rules.compareAccounts({ name: 'account1', value: 177 }, { name: 'account2', value: 188 });
     expect(results).resolves.toBe('account account1 is less than account2');
   });
});
