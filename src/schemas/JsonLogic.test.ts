//NOTE: json-logic-js has no typing, so forcing import via require for now
//      The maintainers don't seem to care about ts: https://github.com/jwadhams/json-logic-js/pull/50
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsonLogic = require('json-logic-js');
import testScenarios from './TestScenarios';

// import testScenarios from './TestScenarios';
describe('JsonLogic Tests', (): void => {
  it('0: Compare value > hard-coded amount e.g. > 50', async (): Promise<void> => {
    const data = testScenarios[0];
    const rule = { '>': [{ var: 'value' }, 50] };
    const result = jsonLogic.apply(rule, data);
    expect(result).toBe(true);
  });

  it('1: Compare value > threshold', async (): Promise<void> => {
    const data = testScenarios[1];
    const rule = { '>': [{ var: 'value' }, { var: 'threshold' }] };
    const result = jsonLogic.apply(rule, data);
    expect(result).toBe(true);
  });

  it('2: Simple nesting selection value > threshold', async (): Promise<void> => {
    const data = testScenarios[2];
    const rule = { '>': [{ var: 'portfolio.value' }, { var: 'portfolio.threshold' }] };
    const result = jsonLogic.apply(rule, data);
    expect(result).toBe(true);
  });

  it('3: Check all items in array value > threshold', async (): Promise<void> => {
    const data = testScenarios[3];
    const rule = { map: [{ var: 'portfolios' }, { '>': [{ var: 'value' }, { var: 'threshold' }] }] };
    const result = jsonLogic.apply(rule, data);
    expect(result).toStrictEqual([true, true, false]);
  });

  it('4: Array Filter matching (id=1) value > threshold', async (): Promise<void> => {
    // I can't find a way to achieve this in a single rule. A workaround is to manually chain filters into maps, but it feels yucky
    const data = testScenarios[4];
    const rule = {
      map: [
        // Filter for specific portfolio id.
        {
          filter: [{ var: 'portfolios' }, { '==': [{ var: 'id' }, 1] }],
        },
        // and map account(s) to true/false by evaluating rule.
        { '>': [{ var: 'value' }, { var: 'threshold' }] },
      ],
    };
    const result = jsonLogic.apply(rule, data);
    expect(result).toStrictEqual([true]); //TODO: Figure out whether we are happy with this array-in-array thing here
  });

  it('5: Array-in-Array with filters', async (): Promise<void> => {
    const data = testScenarios[5];
    const rule = {
      map: [
        {
          filter: [{ var: 'portfolios' }, { '==': [{ var: 'id' }, 1] }],
        },
        {
          map: [
            // Filter for specific account id.
            {
              filter: [{ var: 'accounts' }, { '==': [{ var: 'id' }, 11] }],
            },
            // and map account(s) to true/false by evaluating rule.
            { '>': [{ var: 'value' }, { var: 'threshold' }] },
          ],
        },
      ],
    };
    const result = jsonLogic.apply(rule, data);
    expect(result).toStrictEqual([[true]]);
  });

  it('6: Compare two account values', async (): Promise<void> => {
    const data = testScenarios[6];
    const accountOneValue = {
      reduce: [
        {
          reduce: [
            {
              map: [
                {
                  filter: [{ var: 'portfolios' }, { '==': [{ var: 'id' }, 1] }],
                },
                {
                  filter: [{ var: 'accounts' }, { '==': [{ var: 'id' }, 11] }],
                },
              ],
            },
            { var: 'current' },
          ],
        },
        { var: 'current.value' },
      ],
    };
    const accountTwoValue = {
      reduce: [
        {
          reduce: [
            {
              map: [
                {
                  filter: [{ var: 'portfolios' }, { '==': [{ var: 'id' }, 1] }],
                },
                {
                  filter: [{ var: 'accounts' }, { '==': [{ var: 'id' }, 22] }],
                },
              ],
            },
            { var: 'current' },
          ],
        },
        { var: 'current.value' },
      ],
    };
    const oneLargerThanTwoRule = {
      '>': [accountOneValue, accountTwoValue],
    };

    const result = jsonLogic.apply(oneLargerThanTwoRule, data);
    expect(result).toStrictEqual(true);
  });
});
