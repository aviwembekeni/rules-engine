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
});
